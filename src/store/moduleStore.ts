import { create } from 'zustand';
import type { ModuleTemplate, CardConfig } from '../types';

// ============================================================
// localStorage helpers
// ============================================================

const STORAGE_KEY = 'ha-builder-modules';

function loadFromStorage(): ModuleTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ModuleTemplate[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(modules: ModuleTemplate[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
  } catch {
    // ignore
  }
}

// ============================================================
// Store
// ============================================================

interface ModuleState {
  modules: ModuleTemplate[];

  saveModule: (
    name: string,
    description: string,
    cardConfig: CardConfig,
    tags: string[],
  ) => void;
  deleteModule: (moduleId: string) => void;
  updateModule: (moduleId: string, updates: Partial<Omit<ModuleTemplate, 'id'>>) => void;
  importModules: (modules: ModuleTemplate[]) => void;
  exportModules: () => ModuleTemplate[];
}

export const useModuleStore = create<ModuleState>()((set, get) => {
  // Auto-save on every change
  setTimeout(() => {
    useModuleStore.subscribe((state) => {
      saveToStorage(state.modules);
    });
  }, 0);

  return {
    modules: loadFromStorage(),

    saveModule: (name, description, cardConfig, tags) => {
      const newModule: ModuleTemplate = {
        id: crypto.randomUUID(),
        name,
        description,
        cardConfig,
        createdAt: Date.now(),
        tags,
      };
      set((s) => ({ modules: [...s.modules, newModule] }));
    },

    deleteModule: (moduleId) => {
      set((s) => ({
        modules: s.modules.filter((m) => m.id !== moduleId),
      }));
    },

    updateModule: (moduleId, updates) => {
      set((s) => ({
        modules: s.modules.map((m) =>
          m.id === moduleId ? { ...m, ...updates } : m,
        ),
      }));
    },

    importModules: (modules) => {
      set((s) => {
        const existingIds = new Set(s.modules.map((m) => m.id));
        const newModules = modules.filter((m) => !existingIds.has(m.id));
        return { modules: [...s.modules, ...newModules] };
      });
    },

    exportModules: () => {
      return get().modules;
    },
  };
});
