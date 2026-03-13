import type { DashboardConfig } from '../types';

export interface ValidationIssue {
  level: 'error' | 'warning' | 'info';
  cardId?: string;
  field?: string;
  message: string;
  plainEnglish: string;
  suggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  info: ValidationIssue[];
}

const ENTITY_PATTERN = /^[a-z_]+\.[a-z0-9_]+$/;

const KNOWN_BUILTIN_TYPES = new Set([
  'entity', 'entities', 'button', 'gauge', 'glance', 'weather-forecast',
  'thermostat', 'media-control', 'picture', 'picture-entity', 'picture-glance',
  'markdown', 'history-graph', 'statistic', 'alarm-panel', 'logbook', 'map',
  'iframe', 'energy-distribution', 'conditional', 'vertical-stack',
  'horizontal-stack', 'grid', 'shopping-list',
]);

function validateEntity(entityId: string, cardId: string, field: string): ValidationIssue | null {
  if (!ENTITY_PATTERN.test(entityId)) {
    return {
      level: 'error',
      cardId,
      field,
      message: `Invalid entity ID: ${entityId}`,
      plainEnglish: `"${entityId}" is not a valid Home Assistant entity ID. Entity IDs must follow the format "domain.entity_name" using only lowercase letters, numbers, and underscores.`,
      suggestion: 'Example valid entity IDs: light.living_room, sensor.temperature, switch.coffee_maker',
    };
  }
  return null;
}

export function validateDashboard(dashboard: DashboardConfig): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const info: ValidationIssue[] = [];

  const seenPaths = new Set<string>();

  for (const view of dashboard.views) {
    // Duplicate paths
    if (view.path) {
      if (seenPaths.has(view.path)) {
        errors.push({
          level: 'error',
          message: `Duplicate view path: "${view.path}"`,
          plainEnglish: `Two views share the path "${view.path}". Home Assistant requires every view to have a unique path.`,
          suggestion: 'Give each view a different path (e.g. "home", "lights", "energy").',
        });
      }
      seenPaths.add(view.path);
    }

    for (const card of view.cards) {
      // Missing type
      if (!card.type) {
        errors.push({
          level: 'error',
          cardId: card.id,
          message: 'Card is missing a type',
          plainEnglish: 'One of your cards has no type set. Every card must have a type (e.g. "entity", "button", "gauge").',
          suggestion: 'Select a card type from the configuration panel on the right.',
        });
        continue;
      }

      // Custom / HACS cards
      if (card.type.startsWith('custom:')) {
        warnings.push({
          level: 'warning',
          cardId: card.id,
          message: `Custom card: ${card.type}`,
          plainEnglish: `"${card.type}" is a HACS custom card. It will only work in Home Assistant if you have that card installed via HACS.`,
          suggestion: `Search for "${card.type.replace('custom:', '')}" in HACS → Frontend to install it.`,
        });
      }

      // Unknown built-in type (not custom, not known)
      if (!card.type.startsWith('custom:') && !KNOWN_BUILTIN_TYPES.has(card.type)) {
        warnings.push({
          level: 'warning',
          cardId: card.id,
          message: `Unknown card type: ${card.type}`,
          plainEnglish: `"${card.type}" is not a standard Home Assistant card type recognised by this builder. It may still work in HA if it's a valid type.`,
          suggestion: 'Double-check the card type against the official HA Lovelace documentation.',
        });
      }

      // Entity field validation
      const entity = card.config?.entity as string | undefined;
      if (entity) {
        const issue = validateEntity(entity, card.id, 'entity');
        if (issue) errors.push(issue);
      }

      // Entities list validation
      const entities = card.config?.entities as Array<string | { entity: string }> | undefined;
      if (Array.isArray(entities)) {
        for (const e of entities) {
          const eid = typeof e === 'string' ? e : e?.entity;
          if (eid) {
            const issue = validateEntity(eid, card.id, 'entities');
            if (issue) errors.push(issue);
          }
        }
      }

      // Empty stack cards
      if (['vertical-stack', 'horizontal-stack', 'grid'].includes(card.type)) {
        if (!card.children || card.children.length === 0) {
          warnings.push({
            level: 'warning',
            cardId: card.id,
            message: `Empty ${card.type}`,
            plainEnglish: `This ${card.type} card contains no child cards. It will export as an empty stack, which serves no purpose in Home Assistant.`,
            suggestion: 'Add cards inside the stack, or delete it.',
          });
        }
      }

      // Conditional card missing conditions
      if (card.type === 'conditional') {
        const conditions = card.config?.conditions as unknown[] | undefined;
        if (!conditions || conditions.length === 0) {
          errors.push({
            level: 'error',
            cardId: card.id,
            message: 'Conditional card has no conditions',
            plainEnglish: 'This conditional card has no conditions defined. It will never show or hide correctly in Home Assistant.',
            suggestion: 'Add at least one condition (entity + state) in the card config panel.',
          });
        }
      }
    }
  }

  // No views at all
  if (dashboard.views.length === 0) {
    errors.push({
      level: 'error',
      message: 'Dashboard has no views',
      plainEnglish: 'Your dashboard has no views. Add at least one view before exporting.',
      suggestion: 'Click the "+" button in the view tabs to add a view.',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    info,
  };
}

// Alias for backward compatibility
export const validateCardConfig = validateDashboard;
