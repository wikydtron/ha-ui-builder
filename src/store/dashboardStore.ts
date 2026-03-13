import { create } from 'zustand';
import type { DashboardConfig, CardConfig, ViewConfig } from '../types';

// ============================================================
// localStorage helpers
// ============================================================

const STORAGE_KEY = 'ha-dashboard-builder';

function loadFromStorage(): DashboardConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DashboardConfig;
  } catch {
    // corrupt data – ignore
  }
  return null;
}

function saveToStorage(dashboard: DashboardConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboard));
  } catch {
    // storage full or unavailable – silently fail
  }
}

// ============================================================
// Default state
// ============================================================

const defaultViewId = crypto.randomUUID();

const defaultDashboard: DashboardConfig = {
  id: crypto.randomUUID(),
  title: 'My Dashboard',
  views: [
    {
      id: defaultViewId,
      title: 'Home',
      icon: 'mdi:home',
      path: 'home',
      cards: [],
      layout: 'masonry',
    },
  ],
};

// ============================================================
// Store
// ============================================================

interface DashboardState {
  dashboard: DashboardConfig;
  activeViewId: string;
  selectedCardId: string | null;

  // View actions
  addView: (view?: Partial<Omit<ViewConfig, 'id' | 'cards'>>) => void;
  removeView: (viewId: string) => void;
  updateView: (viewId: string, updates: Partial<Omit<ViewConfig, 'id'>>) => void;
  setActiveView: (viewId: string) => void;

  // Card actions
  addCard: (viewId: string, card: CardConfig) => void;
  removeCard: (viewId: string, cardId: string) => void;
  updateCard: (viewId: string, cardId: string, config: Record<string, unknown>) => void;
  moveCard: (viewId: string, fromIndex: number, toIndex: number) => void;
  duplicateCard: (viewId: string, cardId: string) => void;

  // Selection
  selectCard: (cardId: string | null) => void;
  clearSelection: () => void;

  // Bulk
  loadDashboard: (dashboard: DashboardConfig) => void;
}

/** Helper: return a new views array with one view patched. */
function mapView(
  views: ViewConfig[],
  viewId: string,
  fn: (view: ViewConfig) => ViewConfig,
): ViewConfig[] {
  return views.map((v) => (v.id === viewId ? fn(v) : v));
}

/** Deep-clone a card and assign new IDs to it and all children. */
function cloneCard(card: CardConfig): CardConfig {
  return {
    ...card,
    id: crypto.randomUUID(),
    config: { ...card.config },
    children: card.children?.map(cloneCard),
  };
}

const saved = loadFromStorage();
const initialDashboard = saved ?? defaultDashboard;
const initialActiveViewId = initialDashboard.views[0]?.id ?? defaultViewId;

export const useDashboardStore = create<DashboardState>()((set) => {
  // Auto-save: subscribe after creation
  // We set up the subscription via setTimeout so the store exists first.
  setTimeout(() => {
    useDashboardStore.subscribe((state) => {
      saveToStorage(state.dashboard);
    });
  }, 0);

  return {
    dashboard: initialDashboard,
    activeViewId: initialActiveViewId,
    selectedCardId: null,

    // ──── View actions ────────────────────────────────────────

    addView: (partial) => {
      const newView: ViewConfig = {
        id: crypto.randomUUID(),
        title: partial?.title ?? 'New View',
        icon: partial?.icon,
        path: partial?.path,
        cards: [],
        layout: partial?.layout ?? 'masonry',
      };
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: [...s.dashboard.views, newView],
        },
        activeViewId: newView.id,
      }));
    },

    removeView: (viewId) => {
      set((s) => {
        const views = s.dashboard.views.filter((v) => v.id !== viewId);
        if (views.length === 0) return s; // prevent removing the last view
        const activeViewId =
          s.activeViewId === viewId ? views[0].id : s.activeViewId;
        return {
          dashboard: { ...s.dashboard, views },
          activeViewId,
          selectedCardId:
            s.activeViewId === viewId ? null : s.selectedCardId,
        };
      });
    },

    updateView: (viewId, updates) => {
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => ({
            ...v,
            ...updates,
          })),
        },
      }));
    },

    setActiveView: (viewId) => {
      set({ activeViewId: viewId, selectedCardId: null });
    },

    // ──── Card actions ────────────────────────────────────────

    addCard: (viewId, card) => {
      const newCard: CardConfig = { ...card, id: card.id || crypto.randomUUID() };
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => ({
            ...v,
            cards: [...v.cards, newCard],
          })),
        },
        selectedCardId: newCard.id,
      }));
    },

    removeCard: (viewId, cardId) => {
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => ({
            ...v,
            cards: v.cards.filter((c) => c.id !== cardId),
          })),
        },
        selectedCardId:
          s.selectedCardId === cardId ? null : s.selectedCardId,
      }));
    },

    updateCard: (viewId, cardId, config) => {
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => ({
            ...v,
            cards: v.cards.map((c) =>
              c.id === cardId ? { ...c, config: { ...c.config, ...config } } : c,
            ),
          })),
        },
      }));
    },

    moveCard: (viewId, fromIndex, toIndex) => {
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => {
            const cards = [...v.cards];
            const [moved] = cards.splice(fromIndex, 1);
            if (!moved) return v;
            cards.splice(toIndex, 0, moved);
            return { ...v, cards };
          }),
        },
      }));
    },

    duplicateCard: (viewId, cardId) => {
      set((s) => ({
        dashboard: {
          ...s.dashboard,
          views: mapView(s.dashboard.views, viewId, (v) => {
            const idx = v.cards.findIndex((c) => c.id === cardId);
            if (idx === -1) return v;
            const copy = cloneCard(v.cards[idx]);
            const cards = [...v.cards];
            cards.splice(idx + 1, 0, copy);
            return { ...v, cards };
          }),
        },
      }));
    },

    // ──── Selection ───────────────────────────────────────────

    selectCard: (cardId) => set({ selectedCardId: cardId }),
    clearSelection: () => set({ selectedCardId: null }),

    // ──── Bulk ────────────────────────────────────────────────

    loadDashboard: (dashboard) =>
      set({
        dashboard,
        activeViewId: dashboard.views[0]?.id ?? '',
        selectedCardId: null,
      }),
  };
});
