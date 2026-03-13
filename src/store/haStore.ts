// ============================================================
// HA Store — Zustand store for live Home Assistant connection
// ============================================================

import { create } from 'zustand';
import {
  saveConnection,
  loadConnection,
  clearConnection,
  fetchLovelaceResources,
  fetchEntityStates,
  fetchHACSFrontendRepos,
  classifyError,
} from '../data/haConnection';
import type { HAConnection, HAEntityState, HACSRepo } from '../data/haConnection';

interface HAState {
  connection: HAConnection | null;
  connected: boolean;
  entities: HAEntityState[];
  customCardUrls: string[];   // raw JS URLs from lovelace/resources
  hacsRepos: HACSRepo[];
  loading: boolean;
  error: string | null;

  connect: (conn: HAConnection) => Promise<void>;
  disconnect: () => void;
  refresh: () => Promise<void>;
}

export const useHAStore = create<HAState>()((set, get) => ({
  connection: loadConnection(),
  connected: false,
  entities: [],
  customCardUrls: [],
  hacsRepos: [],
  loading: false,
  error: null,

  connect: async (conn: HAConnection) => {
    set({ loading: true, error: null });
    try {
      saveConnection(conn);

      // Fetch in parallel
      const [entities, cardUrls, hacsRepos] = await Promise.all([
        fetchEntityStates(conn),
        fetchLovelaceResources(conn),
        fetchHACSFrontendRepos(conn),
      ]);

      set({
        connection: conn,
        connected: true,
        entities,
        customCardUrls: cardUrls,
        hacsRepos,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ loading: false, error: classifyError(err) });
    }
  },

  disconnect: () => {
    clearConnection();
    set({
      connection: null,
      connected: false,
      entities: [],
      customCardUrls: [],
      hacsRepos: [],
      loading: false,
      error: null,
    });
  },

  refresh: async () => {
    const { connection } = get();
    if (!connection) return;
    set({ loading: true, error: null });
    try {
      const [entities, cardUrls, hacsRepos] = await Promise.all([
        fetchEntityStates(connection),
        fetchLovelaceResources(connection),
        fetchHACSFrontendRepos(connection),
      ]);
      set({ entities, customCardUrls: cardUrls, hacsRepos, loading: false });
    } catch (err) {
      set({ loading: false, error: classifyError(err) });
    }
  },
}));
