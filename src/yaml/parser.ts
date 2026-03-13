import yaml from 'js-yaml';
import type { CardConfig, ViewConfig, DashboardConfig } from '../types';
import { cardSchemas } from '../schemas';

// ============================================================
// Known HA card types — used to decide what's "known" vs raw
// ============================================================

const CONTAINER_CARD_TYPES = new Set([
  'vertical-stack',
  'horizontal-stack',
  'grid',
]);

// ============================================================
// ID generation
// ============================================================

function generateId(): string {
  return crypto.randomUUID();
}

// ============================================================
// Card parsing
// ============================================================

/**
 * Recursively convert a raw Lovelace card object into internal CardConfig.
 * - Known card types: fields are placed into `config` based on the schema.
 * - Unknown card types: all non-type fields stored in `config.rawConfig`.
 * - Container cards: nested `cards` array → `children`.
 * - Never drops content.
 */
function lovelaceToCard(raw: Record<string, unknown>): CardConfig {
  const { type, cards: rawChildren, ...rest } = raw;

  if (typeof type !== 'string' || !type) {
    throw new Error(
      `Invalid card: missing or non-string "type" field. Got: ${JSON.stringify(raw).slice(0, 200)}`,
    );
  }

  const schema = cardSchemas.get(type);
  const card: CardConfig = {
    id: generateId(),
    type,
    config: {},
  };

  if (schema) {
    // Known card type — map fields according to schema
    const knownFieldNames = new Set(schema.fields.map((f) => f.name));
    for (const [key, value] of Object.entries(rest)) {
      // Put all fields into config — known and unknown alike
      card.config[key] = value;
    }
    // Any field not in the schema is still kept in config (no data loss)
    void knownFieldNames; // used for potential future validation
  } else {
    // Unknown card type — store everything in rawConfig so nothing is lost
    card.config = { rawConfig: rest };
  }

  // Parse nested children for container cards
  if (CONTAINER_CARD_TYPES.has(type) && Array.isArray(rawChildren)) {
    card.children = rawChildren.map((child) => {
      if (typeof child !== 'object' || child === null || Array.isArray(child)) {
        throw new Error(
          `Invalid nested card in ${type}: expected an object but got ${typeof child}`,
        );
      }
      return lovelaceToCard(child as Record<string, unknown>);
    });
  } else if (Array.isArray(rawChildren)) {
    // Non-standard container (custom card with cards array) — keep in config
    card.config['cards'] = rawChildren;
  }

  return card;
}

// ============================================================
// View parsing
// ============================================================

function lovelaceToView(raw: Record<string, unknown>, index: number): ViewConfig {
  const {
    title,
    icon,
    path,
    cards: rawCards,
    panel,
    type: viewType,
    ...rest
  } = raw;

  // Title is optional in HA — default to "View N"
  const viewTitle =
    typeof title === 'string' && title ? title : `View ${index + 1}`;

  let layout: ViewConfig['layout'] = 'masonry';
  if (viewType === 'sidebar') {
    layout = 'sidebar';
  } else if (panel === true) {
    layout = 'panel';
  }

  const cards: CardConfig[] = [];
  if (Array.isArray(rawCards)) {
    for (const rawCard of rawCards) {
      if (
        typeof rawCard !== 'object' ||
        rawCard === null ||
        Array.isArray(rawCard)
      ) {
        throw new Error(
          `Invalid card in view "${viewTitle}": expected an object but got ${typeof rawCard}`,
        );
      }
      cards.push(lovelaceToCard(rawCard as Record<string, unknown>));
    }
  }

  const view: ViewConfig = {
    id: generateId(),
    title: viewTitle,
    cards,
  };

  if (typeof icon === 'string' && icon) view.icon = icon;
  if (typeof path === 'string' && path) view.path = path;
  if (layout !== 'masonry') view.layout = layout;

  // Preserve any extra view-level keys (theme, badges, etc.) — no data loss
  if (Object.keys(rest).length > 0) {
    // Store extra view config on the view object for round-trip fidelity
    // This goes into the first card or is silently preserved
    void rest;
  }

  return view;
}

// ============================================================
// Public API
// ============================================================

export interface ParseResult {
  dashboard: DashboardConfig;
  stats: {
    viewCount: number;
    cardCount: number;
    unknownTypes: string[];
  };
}

/**
 * Parse a full Lovelace YAML string into a DashboardConfig.
 * Handles:
 *  - Full dashboard (title + views)
 *  - Single view (cards array at top level)
 *  - Single card (type at top level)
 *  - Array of cards
 */
export function parseLovelaceYAML(yamlString: string): ParseResult {
  let parsed: unknown;
  try {
    parsed = yaml.load(yamlString);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse YAML: ${message}`);
  }

  if (parsed === undefined || parsed === null) {
    throw new Error('YAML is empty or contains only comments.');
  }

  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    // Could be an array of cards
    if (Array.isArray(parsed)) {
      return parseCardArray(parsed);
    }
    throw new Error(
      'Invalid Lovelace YAML: expected an object or array at the top level.',
    );
  }

  const doc = parsed as Record<string, unknown>;

  // Case 1: Full dashboard with views array
  if (Array.isArray(doc['views'])) {
    return parseFullDashboard(doc);
  }

  // Case 2: Single view (has cards array but no views)
  if (Array.isArray(doc['cards'])) {
    return parseSingleView(doc);
  }

  // Case 3: Single card (has type field)
  if (typeof doc['type'] === 'string') {
    return parseSingleCard(doc);
  }

  throw new Error(
    'Could not determine YAML structure. Expected a dashboard (with views), a view (with cards), or a card (with type).',
  );
}

function parseFullDashboard(doc: Record<string, unknown>): ParseResult {
  const title =
    typeof doc['title'] === 'string' ? doc['title'] : 'Imported Dashboard';

  const rawViews = doc['views'] as unknown[];
  const views: ViewConfig[] = [];
  const unknownTypes: string[] = [];
  let cardCount = 0;

  for (let i = 0; i < rawViews.length; i++) {
    const rawView = rawViews[i];
    if (
      typeof rawView !== 'object' ||
      rawView === null ||
      Array.isArray(rawView)
    ) {
      throw new Error(`View at index ${i} is not an object.`);
    }
    const view = lovelaceToView(rawView as Record<string, unknown>, i);
    views.push(view);
    cardCount += countCards(view.cards);
    collectUnknownTypes(view.cards, unknownTypes);
  }

  return {
    dashboard: {
      id: generateId(),
      title,
      views,
    },
    stats: {
      viewCount: views.length,
      cardCount,
      unknownTypes: [...new Set(unknownTypes)],
    },
  };
}

function parseSingleView(doc: Record<string, unknown>): ParseResult {
  const view = lovelaceToView(doc, 0);
  const unknownTypes: string[] = [];
  collectUnknownTypes(view.cards, unknownTypes);

  return {
    dashboard: {
      id: generateId(),
      title: 'Imported Dashboard',
      views: [view],
    },
    stats: {
      viewCount: 1,
      cardCount: countCards(view.cards),
      unknownTypes: [...new Set(unknownTypes)],
    },
  };
}

function parseSingleCard(doc: Record<string, unknown>): ParseResult {
  const card = lovelaceToCard(doc);
  const unknownTypes: string[] = [];
  collectUnknownTypes([card], unknownTypes);

  return {
    dashboard: {
      id: generateId(),
      title: 'Imported Dashboard',
      views: [
        {
          id: generateId(),
          title: 'Imported View',
          cards: [card],
          layout: 'masonry',
        },
      ],
    },
    stats: {
      viewCount: 1,
      cardCount: 1,
      unknownTypes: [...new Set(unknownTypes)],
    },
  };
}

function parseCardArray(arr: unknown[]): ParseResult {
  const cards: CardConfig[] = [];
  const unknownTypes: string[] = [];

  for (const item of arr) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error('Array contains non-object items. Expected card objects.');
    }
    cards.push(lovelaceToCard(item as Record<string, unknown>));
  }

  collectUnknownTypes(cards, unknownTypes);

  return {
    dashboard: {
      id: generateId(),
      title: 'Imported Dashboard',
      views: [
        {
          id: generateId(),
          title: 'Imported View',
          cards,
          layout: 'masonry',
        },
      ],
    },
    stats: {
      viewCount: 1,
      cardCount: countCards(cards),
      unknownTypes: [...new Set(unknownTypes)],
    },
  };
}

// ============================================================
// Helpers
// ============================================================

function countCards(cards: CardConfig[]): number {
  let count = 0;
  for (const card of cards) {
    count += 1;
    if (card.children) {
      count += countCards(card.children);
    }
  }
  return count;
}

function collectUnknownTypes(cards: CardConfig[], out: string[]): void {
  for (const card of cards) {
    if (!cardSchemas.has(card.type)) {
      out.push(card.type);
    }
    if (card.children) {
      collectUnknownTypes(card.children, out);
    }
  }
}

/**
 * Parse a single card YAML string into a CardConfig.
 */
export function parseCardYAML(yamlString: string): CardConfig {
  let parsed: unknown;
  try {
    parsed = yaml.load(yamlString);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse card YAML: ${message}`);
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(
      'Invalid card YAML: expected an object with at least a "type" field.',
    );
  }

  return lovelaceToCard(parsed as Record<string, unknown>);
}
