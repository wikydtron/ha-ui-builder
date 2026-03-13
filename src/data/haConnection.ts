// ============================================================
// HA Connection Service
// Handles connection to a live Home Assistant instance.
// All credentials are stored in localStorage only — never
// hardcoded, never sent anywhere except the user's own HA.
// ============================================================

const STORAGE_KEY = 'ha-builder-ha-connection';

export interface HAConnection {
  url: string;   // e.g. http://homeassistant.local:8123
  token: string; // long-lived access token
}

export interface HAEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HACSRepo {
  name: string;
  description: string;
  installed: boolean;
  category: string;
  authors: string[];
  full_name: string;
  stars: number;
}

// ── Persistence ──────────────────────────────────────────

export function saveConnection(conn: HAConnection): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conn));
  } catch {
    // ignore storage errors
  }
}

export function loadConnection(): HAConnection | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as HAConnection;
      if (parsed.url && parsed.token) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function clearConnection(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ── Helpers ───────────────────────────────────────────────

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function makeHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/** Translates fetch errors into human-readable messages */
export function classifyError(err: unknown): string {
  if (err instanceof TypeError && err.message.includes('fetch')) {
    return 'Cannot reach Home Assistant. Check the URL and make sure HA is running.';
  }
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('CORS') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
    return 'HA needs to allow cross-origin requests. Add your builder URL to HA\'s trusted_proxies or use the same origin.';
  }
  return msg || 'Unknown error';
}

// ── API Calls ─────────────────────────────────────────────

/**
 * Tests the connection by calling GET /api/
 * Returns true if HA responds with 200 and a valid HA response.
 */
export async function testConnection(conn: HAConnection): Promise<boolean> {
  const base = normalizeUrl(conn.url);
  try {
    const res = await fetch(`${base}/api/`, {
      headers: makeHeaders(conn.token),
    });
    if (res.status === 401) {
      throw new Error('Invalid token. Generate a new Long-Lived Access Token in HA → Profile → Security.');
    }
    if (!res.ok) {
      throw new Error(`HA returned ${res.status}`);
    }
    const data = (await res.json()) as { message?: string };
    return typeof data.message === 'string';
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Invalid token')) throw err;
    throw new Error(classifyError(err));
  }
}

/**
 * Fetches registered Lovelace JS resources (custom card files).
 * Returns array of resource URLs.
 */
export async function fetchLovelaceResources(conn: HAConnection): Promise<string[]> {
  const base = normalizeUrl(conn.url);
  try {
    const res = await fetch(`${base}/api/lovelace/resources`, {
      headers: makeHeaders(conn.token),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{ url?: string; type?: string }>;
    return data
      .filter((r) => r.type === 'module' || r.url?.endsWith('.js'))
      .map((r) => r.url ?? '')
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Fetches all HA entity states.
 */
export async function fetchEntityStates(conn: HAConnection): Promise<HAEntityState[]> {
  const base = normalizeUrl(conn.url);
  try {
    const res = await fetch(`${base}/api/states`, {
      headers: makeHeaders(conn.token),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      entity_id: string;
      state: string;
      attributes: Record<string, unknown>;
    }>;
    return data.map((e) => ({
      entity_id: e.entity_id,
      state: e.state,
      attributes: e.attributes ?? {},
    }));
  } catch {
    return [];
  }
}

/**
 * Fetches HACS frontend repositories via WebSocket-over-HTTP fallback.
 * Silently returns [] if HACS is not installed.
 */
export async function fetchHACSFrontendRepos(conn: HAConnection): Promise<HACSRepo[]> {
  const base = normalizeUrl(conn.url);
  try {
    // HACS exposes a REST endpoint for integrations that support it
    const res = await fetch(`${base}/api/hacs/repositories`, {
      headers: makeHeaders(conn.token),
    });
    if (!res.ok) return []; // HACS not installed or different version
    const data = (await res.json()) as Array<{
      name?: string;
      description?: string;
      installed?: boolean;
      category?: string;
      authors?: string[];
      full_name?: string;
      stars?: number;
    }>;
    return data
      .filter((r) => r.category === 'frontend' || r.category === 'plugin')
      .map((r) => ({
        name: r.name ?? '',
        description: r.description ?? '',
        installed: r.installed ?? false,
        category: r.category ?? 'frontend',
        authors: r.authors ?? [],
        full_name: r.full_name ?? '',
        stars: r.stars ?? 0,
      }));
  } catch {
    return []; // Silently ignore — HACS may not be installed
  }
}

/**
 * Given a Lovelace resource URL, tries to infer the custom card type name.
 * e.g. "/hacsfiles/mushroom/mushroom.js" → "custom:mushroom-*"
 */
export function inferCardTypeFromUrl(url: string): string | null {
  const filename = url.split('/').pop()?.replace('.js', '') ?? '';
  if (!filename) return null;

  const knownMappings: Record<string, string> = {
    mushroom: 'custom:mushroom-*',
    'button-card': 'custom:button-card',
    'mini-graph-card': 'custom:mini-graph-card',
    'mini-media-player': 'custom:mini-media-player',
    'apexcharts-card': 'custom:apexcharts-card',
    'lovelace-card-mod': 'custom:card-mod',
    'auto-entities': 'custom:auto-entities',
    'stack-in-card': 'custom:stack-in-card',
    'layout-card': 'custom:layout-card',
    'slider-entity-row': 'custom:slider-entity-row',
    'multiple-entity-row': 'custom:multiple-entity-row',
    'fold-entity-row': 'custom:fold-entity-row',
    'template-entity-row': 'custom:template-entity-row',
    'card-tools': 'custom:card-tools',
    'weather-card': 'custom:weather-card',
    'atomic-calendar-revive': 'custom:atomic-calendar-revive',
    'my-cards': 'custom:my-cards-*',
    'horizon-card': 'custom:horizon-card',
    'swipe-card': 'custom:swipe-card',
  };

  for (const [key, type] of Object.entries(knownMappings)) {
    if (filename.toLowerCase().includes(key)) return type;
  }

  // Return a generic label based on filename
  return null;
}
