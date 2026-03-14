import yaml from 'js-yaml';
import type { CardConfig, ViewConfig, DashboardConfig } from '../types';

// ============================================================
// Internal fields to strip from exported YAML
// ============================================================

const INTERNAL_FIELDS = new Set([
  'id',
  '_meta',
  '_builderId',
  '_internal',
  '_order',
  '_parentId',
]);

const CONTAINER_CARD_TYPES = new Set([
  'vertical-stack',
  'horizontal-stack',
  'grid',
]);

const YAML_DUMP_OPTIONS: yaml.DumpOptions = {
  indent: 2,
  lineWidth: -1,
  noRefs: true,
  sortKeys: false,
  quotingType: "'",
  forceQuotes: false,
};

// ============================================================
// Helpers
// ============================================================

/**
 * Recursively strip internal builder fields, null/undefined values,
 * empty strings, and empty objects from an object tree.
 */
function cleanObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (INTERNAL_FIELDS.has(key)) continue;
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value === '') continue;

    if (Array.isArray(value)) {
      const cleaned = value
        .map((item) =>
          typeof item === 'object' && item !== null && !Array.isArray(item)
            ? cleanObject(item as Record<string, unknown>)
            : item,
        )
        .filter((item) => item !== undefined && item !== null);
      if (cleaned.length > 0) {
        result[key] = cleaned;
      }
    } else if (typeof value === 'object') {
      const cleaned = cleanObject(value as Record<string, unknown>);
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

// ============================================================
// Card → Lovelace
// ============================================================

function cardToLovelace(card: CardConfig): Record<string, unknown> {
  const { type, config, children } = card;

  // RawCardFallback: emit rawConfig directly
  if (type === 'raw' || (config?.rawConfig && typeof config.rawConfig === 'object' && !cardSchemaKnown(type))) {
    const raw = config.rawConfig as Record<string, unknown>;
    // Preserve original type from rawConfig, fall back to card.type
    const rawType = (raw['type'] as string) || type;
    const obj: Record<string, unknown> = { type: rawType };
    for (const [key, value] of Object.entries(raw)) {
      if (key !== 'type') obj[key] = value;
    }
    return cleanObject(obj);
  }

  // Start with type — always present
  const obj: Record<string, unknown> = { type };

  // Spread config fields (skip internal ones)
  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (INTERNAL_FIELDS.has(key)) continue;
      if (key === 'rawConfig') continue;
      if (value === undefined || value === null) continue;
      if (typeof value === 'string' && value === '') continue;
      obj[key] = value;
    }
  }

  // Container cards: children[] → cards: in YAML output
  if (CONTAINER_CARD_TYPES.has(type)) {
    delete obj['cards'];
    if (children && children.length > 0) {
      obj.cards = children.map(cardToLovelace);
    }
  }

  return cleanObject(obj);
}

/** Check if a card type is "known" (has a rawConfig) */
function cardSchemaKnown(type: string): boolean {
  // We do a simple check — unknown types stored via rawConfig
  // The parser stores unknown types with rawConfig in config
  return !type.startsWith('custom:') || false;
}

// ============================================================
// colSpan grouping: group consecutive cards into stacks
// ============================================================

interface CardGroup {
  span: number;
  cards: CardConfig[];
}

/**
 * Group consecutive cards with the same colSpan.
 * colSpan 12 = always standalone
 * Other equal spans are grouped together.
 */
function groupCardsBySpan(cards: CardConfig[]): CardGroup[] {
  const groups: CardGroup[] = [];

  for (const card of cards) {
    const span = card.colSpan ?? 4;

    if (span === 12) {
      // Full-width always standalone
      groups.push({ span: 12, cards: [card] });
    } else {
      const last = groups[groups.length - 1];
      if (last && last.span === span && last.span !== 12) {
        last.cards.push(card);
      } else {
        groups.push({ span, cards: [card] });
      }
    }
  }

  return groups;
}

/**
 * Convert a group of cards into a Lovelace output item.
 * - Single card with colSpan 12: emit directly
 * - Multiple same-span cards: wrap in horizontal-stack
 * - Mixed (shouldn't happen given grouping): wrap in grid
 */
function groupToLovelace(group: CardGroup): Record<string, unknown> | Record<string, unknown>[] {
  if (group.cards.length === 1) {
    return cardToLovelace(group.cards[0]);
  }

  // Multiple cards with same span → horizontal-stack
  return {
    type: 'horizontal-stack',
    cards: group.cards.map(cardToLovelace),
  };
}

/**
 * Convert view cards into Lovelace card array, applying colSpan grouping.
 */
function cardsToLovelace(cards: CardConfig[]): Record<string, unknown>[] {
  const groups = groupCardsBySpan(cards);
  const result: Record<string, unknown>[] = [];

  for (const group of groups) {
    const item = groupToLovelace(group);
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }

  return result;
}

// ============================================================
// View → Lovelace
// ============================================================

function viewToLovelace(view: ViewConfig): Record<string, unknown> {
  const obj: Record<string, unknown> = {};

  if (view.title) obj.title = view.title;
  if (view.icon) obj.icon = view.icon;

  // path is required for HA to navigate — default to slugified title
  obj.path = view.path || view.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // viewType → Lovelace type field
  const viewType = view.viewType ?? 'masonry';
  if (viewType === 'masonry') {
    // masonry is default, no type needed (but we emit it for clarity)
    obj.type = 'masonry';
  } else if (viewType === 'sections') {
    obj.type = 'sections';
  } else if (viewType === 'panel') {
    obj.type = 'panel';
    obj.panel = true;
  }

  // Fallback: legacy layout field
  if (!view.viewType && view.layout) {
    if (view.layout === 'panel') {
      obj.type = 'panel';
      obj.panel = true;
    } else if (view.layout === 'sidebar') {
      obj.type = 'sidebar';
    }
  }

  // Apply colSpan grouping when exporting
  obj.cards = cardsToLovelace(view.cards);

  return cleanObject(obj);
}

// ============================================================
// Public API — Export modes
// ============================================================

/**
 * Generate full dashboard YAML (all views).
 * Pasteable directly into HA raw YAML editor.
 */
export function generateDashboardYAML(dashboard: DashboardConfig): string {
  const lovelace: Record<string, unknown> = {
    title: dashboard.title,
    views: dashboard.views.map(viewToLovelace),
  };

  return yaml.dump(lovelace, YAML_DUMP_OPTIONS);
}

/**
 * Generate YAML for a single view.
 */
export function generateViewYAML(view: ViewConfig): string {
  const lovelace = viewToLovelace(view);
  return yaml.dump(lovelace, YAML_DUMP_OPTIONS);
}

/**
 * Generate YAML snippet for a single card.
 */
export function generateCardYAML(card: CardConfig): string {
  const lovelace = cardToLovelace(card);
  return yaml.dump(lovelace, YAML_DUMP_OPTIONS);
}
