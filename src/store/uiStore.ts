import { create } from 'zustand';
import type { SidebarTab, RightPanelTab } from '../types';

// ============================================================
// UI Store – transient UI state (no persistence needed)
// ============================================================

interface UIState {
  sidebarTab: SidebarTab;
  rightPanelTab: RightPanelTab;
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  searchQuery: string;
  recentEntities: string[];
  favoriteEntities: string[];

  setSidebarTab: (tab: SidebarTab) => void;
  setRightPanelTab: (tab: RightPanelTab) => void;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setSearchQuery: (query: string) => void;
  addRecentEntity: (entityId: string) => void;
  toggleFavoriteEntity: (entityId: string) => void;
}

const MAX_RECENT = 20;

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem('ha-builder-favorites');
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    // ignore
  }
  return [];
}

function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem('ha-builder-favorites', JSON.stringify(favorites));
  } catch {
    // ignore
  }
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarTab: 'cards',
  rightPanelTab: 'config',
  sidebarOpen: true,
  rightPanelOpen: true,
  searchQuery: '',
  recentEntities: [],
  favoriteEntities: loadFavorites(),

  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addRecentEntity: (entityId) =>
    set((s) => {
      const filtered = s.recentEntities.filter((e) => e !== entityId);
      return { recentEntities: [entityId, ...filtered].slice(0, MAX_RECENT) };
    }),

  toggleFavoriteEntity: (entityId) =>
    set((s) => {
      const exists = s.favoriteEntities.includes(entityId);
      const favoriteEntities = exists
        ? s.favoriteEntities.filter((e) => e !== entityId)
        : [...s.favoriteEntities, entityId];
      saveFavorites(favoriteEntities);
      return { favoriteEntities };
    }),
}));
