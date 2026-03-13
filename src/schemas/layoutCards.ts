import type { CardSchema } from '../types';

// ============================================================
// Layout Card Schemas
// ============================================================

export const verticalStackCardSchema: CardSchema = {
  type: 'vertical-stack',
  label: 'Vertical Stack',
  description: 'Stack multiple cards vertically in a single column.',
  icon: 'Rows3',
  category: 'layout',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Optional title for the stack.',
    },
    {
      name: 'cards',
      label: 'Cards (YAML)',
      type: 'yaml',
      required: true,
      helpText: 'List of card configurations to stack vertically. Cards can also be added by dragging into this container.',
    },
  ],
};

export const horizontalStackCardSchema: CardSchema = {
  type: 'horizontal-stack',
  label: 'Horizontal Stack',
  description: 'Place multiple cards side by side in a single row.',
  icon: 'Columns3',
  category: 'layout',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Optional title for the stack.',
    },
    {
      name: 'cards',
      label: 'Cards (YAML)',
      type: 'yaml',
      required: true,
      helpText: 'List of card configurations to stack horizontally. Cards can also be added by dragging into this container.',
    },
  ],
};

export const gridCardSchema: CardSchema = {
  type: 'grid',
  label: 'Grid',
  description: 'Arrange cards in a responsive grid layout with configurable columns.',
  icon: 'LayoutGrid',
  category: 'layout',
  fields: [
    {
      name: 'cards',
      label: 'Cards (YAML)',
      type: 'yaml',
      required: true,
      helpText: 'List of card configurations to arrange in the grid.',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Optional title for the grid.',
    },
    {
      name: 'columns',
      label: 'Columns',
      type: 'number',
      default: 3,
      min: 1,
      max: 10,
      helpText: 'Number of columns in the grid.',
    },
    {
      name: 'square',
      label: 'Square Cards',
      type: 'boolean',
      default: true,
      helpText: 'Force all cards to be square-shaped.',
    },
  ],
};

export const conditionalCardSchema: CardSchema = {
  type: 'conditional',
  label: 'Conditional',
  description: 'Show or hide a card based on entity state conditions.',
  icon: 'GitBranch',
  category: 'layout',
  fields: [
    {
      name: 'conditions',
      label: 'Conditions (YAML)',
      type: 'yaml',
      required: true,
      helpText:
        'List of conditions that must all be met. Each condition needs entity, state or state_not. Example:\n- entity: light.kitchen\n  state: "on"',
    },
    {
      name: 'card',
      label: 'Card (YAML)',
      type: 'yaml',
      required: true,
      helpText: 'Card configuration to show when all conditions are met.',
    },
  ],
};

export const layoutCardSchemas: CardSchema[] = [
  verticalStackCardSchema,
  horizontalStackCardSchema,
  gridCardSchema,
  conditionalCardSchema,
];
