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

  // Start with type — always present
  const obj: Record<string, unknown> = { type };

  // Spread config fields (skip internal ones)
  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (INTERNAL_FIELDS.has(key)) continue;
      if (key === 'rawConfig') continue; // handled separately below
      if (value === undefined || value === null) continue;
      if (typeof value === 'string' && value === '') continue;
      obj[key] = value;
    }
  }

  // If this card has rawConfig (unknown card type), merge it
  if (config?.rawConfig && typeof config.rawConfig === 'object') {
    const raw = config.rawConfig as Record<string, unknown>;
    for (const [key, value] of Object.entries(raw)) {
      if (key !== 'type' && !INTERNAL_FIELDS.has(key)) {
        obj[key] = value;
      }
    }
  }

  // Container cards: children[] → cards: in YAML output
  // Delete any config.cards that was spread above, then set from children
  if (CONTAINER_CARD_TYPES.has(type)) {
    delete obj['cards'];
    if (children && children.length > 0) {
      obj.cards = children.map(cardToLovelace);
    }
  }

  return cleanObject(obj);
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

  // Layout mapping
  if (view.layout && view.layout !== 'masonry') {
    if (view.layout === 'panel') {
      obj.panel = true;
    } else if (view.layout === 'sidebar') {
      obj.type = 'sidebar';
    }
  }

  obj.cards = view.cards.map(cardToLovelace);

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
