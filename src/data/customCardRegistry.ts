// ============================================================
// Custom Card Registry — HACS / community card definitions
// ============================================================

import type { FieldSchema } from '../types';

export interface CustomCardDefinition {
  type: string;
  label: string;
  description: string;
  icon: string;
  fields: FieldSchema[];
  supportLevel: 'full' | 'preview-only' | 'config-only';
  hacsRepo: string;
}

// ──────────────────────────────────────────────────────────
// Built-in HACS card definitions
// ──────────────────────────────────────────────────────────

export const builtinCustomCards: CustomCardDefinition[] = [
  // 1. custom:button-card
  {
    type: 'custom:button-card',
    label: 'Button Card',
    description: 'Highly customizable button card for entities, icons, and actions.',
    icon: 'RectangleHorizontal',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/custom-cards/button-card',
    fields: [
      { name: 'entity', label: 'Entity', type: 'entity', helpText: 'Entity to control.' },
      { name: 'name', label: 'Name', type: 'text', helpText: 'Custom name to display.' },
      { name: 'icon', label: 'Icon', type: 'icon', helpText: 'Icon override (e.g., mdi:lightbulb).' },
      { name: 'color', label: 'Color', type: 'color', helpText: 'Icon or card color.' },
      {
        name: 'color_type',
        label: 'Color Type',
        type: 'select',
        options: [
          { label: 'Icon', value: 'icon' },
          { label: 'Card', value: 'card' },
          { label: 'Label Card', value: 'label-card' },
        ],
        helpText: 'Where the color is applied.',
      },
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Icon + Name', value: 'icon_name' },
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ],
        helpText: 'Layout of icon and name.',
      },
      { name: 'size', label: 'Icon Size', type: 'text', default: '40%', helpText: 'Icon size (e.g., 40%).' },
      { name: 'show_icon', label: 'Show Icon', type: 'boolean', default: true, helpText: 'Display the icon.' },
      { name: 'show_name', label: 'Show Name', type: 'boolean', default: true, helpText: 'Display the name.' },
      { name: 'show_state', label: 'Show State', type: 'boolean', default: false, helpText: 'Display the entity state.' },
    ],
  },

  // 2. custom:mini-graph-card
  {
    type: 'custom:mini-graph-card',
    label: 'Mini Graph Card',
    description: 'Minimalistic graph card for sensor data with multiple entities.',
    icon: 'TrendingUp',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/kalkih/mini-graph-card',
    fields: [
      { name: 'entities', label: 'Entities', type: 'entities-list', required: true, helpText: 'Entities to graph.' },
      { name: 'name', label: 'Name', type: 'text', helpText: 'Card title.' },
      { name: 'icon', label: 'Icon', type: 'icon', helpText: 'Header icon.' },
      { name: 'hours_to_show', label: 'Hours to Show', type: 'number', default: 24, min: 1, max: 168, helpText: 'Number of hours of history to display.' },
      { name: 'line_width', label: 'Line Width', type: 'number', default: 2, min: 1, max: 10, helpText: 'Width of the graph line.' },
      { name: 'animate', label: 'Animate', type: 'boolean', default: false, helpText: 'Animate the graph on load.' },
    ],
  },

  // 3. custom:apexcharts-card
  {
    type: 'custom:apexcharts-card',
    label: 'ApexCharts Card',
    description: 'Advanced charting card powered by ApexCharts.js.',
    icon: 'BarChart3',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/RomRider/apexcharts-card',
    fields: [
      { name: 'graph_span', label: 'Graph Span', type: 'text', default: '24h', helpText: 'Time span for the graph (e.g., 24h, 7d).' },
      {
        name: 'chart_type',
        label: 'Chart Type',
        type: 'select',
        options: [
          { label: 'Line', value: 'line' },
          { label: 'Bar', value: 'bar' },
          { label: 'Area', value: 'area' },
          { label: 'Scatter', value: 'scatter' },
        ],
        helpText: 'Type of chart to render.',
      },
      { name: 'stacked', label: 'Stacked', type: 'boolean', default: false, helpText: 'Stack multiple series.' },
    ],
  },

  // 4. custom:mushroom-entity-card
  {
    type: 'custom:mushroom-entity-card',
    label: 'Mushroom Entity Card',
    description: 'Clean, modern entity card from the Mushroom collection.',
    icon: 'SquareFunction',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/piitaya/lovelace-mushroom',
    fields: [
      { name: 'entity', label: 'Entity', type: 'entity', required: true, helpText: 'Entity to display.' },
      { name: 'name', label: 'Name', type: 'text', helpText: 'Name override.' },
      { name: 'icon', label: 'Icon', type: 'icon', helpText: 'Icon override.' },
      { name: 'icon_color', label: 'Icon Color', type: 'color', helpText: 'Color of the icon.' },
      {
        name: 'primary_info',
        label: 'Primary Info',
        type: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Name', value: 'name' },
          { label: 'State', value: 'state' },
          { label: 'Last Changed', value: 'last-changed' },
          { label: 'None', value: 'none' },
        ],
        helpText: 'What to show as primary information.',
      },
      {
        name: 'secondary_info',
        label: 'Secondary Info',
        type: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Name', value: 'name' },
          { label: 'State', value: 'state' },
          { label: 'None', value: 'none' },
        ],
        helpText: 'What to show as secondary information.',
      },
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
        ],
        helpText: 'Card layout.',
      },
      { name: 'fill_container', label: 'Fill Container', type: 'boolean', default: false, helpText: 'Fill the entire card container.' },
    ],
  },

  // 5. custom:mushroom-light-card
  {
    type: 'custom:mushroom-light-card',
    label: 'Mushroom Light Card',
    description: 'Beautiful light control card with brightness and color sliders.',
    icon: 'Lightbulb',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/piitaya/lovelace-mushroom',
    fields: [
      { name: 'entity', label: 'Entity', type: 'entity', required: true, helpText: 'Light entity to control.' },
      { name: 'name', label: 'Name', type: 'text', helpText: 'Name override.' },
      { name: 'icon_color', label: 'Icon Color', type: 'color', helpText: 'Override icon color.' },
      { name: 'show_brightness_control', label: 'Brightness Control', type: 'boolean', default: false, helpText: 'Show brightness slider.' },
      { name: 'show_color_control', label: 'Color Control', type: 'boolean', default: false, helpText: 'Show color picker.' },
      { name: 'show_color_temp_control', label: 'Color Temp Control', type: 'boolean', default: false, helpText: 'Show color temperature slider.' },
      { name: 'collapsible_controls', label: 'Collapsible Controls', type: 'boolean', default: false, helpText: 'Collapse controls when off.' },
    ],
  },

  // 6. custom:mushroom-climate-card
  {
    type: 'custom:mushroom-climate-card',
    label: 'Mushroom Climate Card',
    description: 'Modern climate entity card with temperature controls.',
    icon: 'Thermometer',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/piitaya/lovelace-mushroom',
    fields: [
      { name: 'entity', label: 'Entity', type: 'entity', required: true, helpText: 'Climate entity to control.' },
      { name: 'name', label: 'Name', type: 'text', helpText: 'Name override.' },
      { name: 'show_temperature_control', label: 'Temperature Control', type: 'boolean', default: false, helpText: 'Show temperature adjustment buttons.' },
      { name: 'collapsible_controls', label: 'Collapsible Controls', type: 'boolean', default: false, helpText: 'Collapse controls when off.' },
    ],
  },

  // 7. custom:mushroom-chips-card
  {
    type: 'custom:mushroom-chips-card',
    label: 'Mushroom Chips Card',
    description: 'Compact chip-style cards for quick entity glances.',
    icon: 'LayoutGrid',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/piitaya/lovelace-mushroom',
    fields: [
      {
        name: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Start', value: 'start' },
          { label: 'End', value: 'end' },
          { label: 'Center', value: 'center' },
        ],
        helpText: 'Horizontal alignment of chips.',
      },
    ],
  },

  // 8. custom:auto-entities
  {
    type: 'custom:auto-entities',
    label: 'Auto Entities',
    description: 'Automatically populate a card with entities matching filters.',
    icon: 'Filter',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/thomasloven/lovelace-auto-entities',
    fields: [
      { name: 'show_empty', label: 'Show When Empty', type: 'boolean', default: true, helpText: 'Show the card even when no entities match.' },
      { name: 'unique', label: 'Unique', type: 'boolean', default: false, helpText: 'Remove duplicate entities.' },
    ],
  },

  // 9. custom:stack-in-card
  {
    type: 'custom:stack-in-card',
    label: 'Stack In Card',
    description: 'Group multiple cards into a single card without borders.',
    icon: 'Layers',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/custom-cards/stack-in-card',
    fields: [
      {
        name: 'mode',
        label: 'Mode',
        type: 'select',
        default: 'vertical',
        options: [
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ],
        helpText: 'Stack direction.',
      },
      { name: 'title', label: 'Title', type: 'text', helpText: 'Optional card title.' },
    ],
  },

  // 10. custom:swipe-card
  {
    type: 'custom:swipe-card',
    label: 'Swipe Card',
    description: 'Swipeable card container for cycling through multiple cards.',
    icon: 'ArrowLeftRight',
    supportLevel: 'preview-only',
    hacsRepo: 'https://github.com/nicufarmmern/lovelace-swipe-card',
    fields: [
      { name: 'reset_after', label: 'Reset After (seconds)', type: 'number', helpText: 'Seconds before returning to the start card.' },
      { name: 'start_card', label: 'Start Card Index', type: 'number', default: 0, min: 0, helpText: 'Index of the card to show first.' },
    ],
  },
];

// ──────────────────────────────────────────────────────────
// localStorage-backed user custom cards
// ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'ha-builder-custom-cards';

export function getUserCustomCards(): CustomCardDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomCardDefinition[]) : [];
  } catch {
    return [];
  }
}

export function saveUserCustomCard(def: CustomCardDefinition): void {
  const existing = getUserCustomCards();
  const idx = existing.findIndex((c) => c.type === def.type);
  if (idx >= 0) {
    existing[idx] = def;
  } else {
    existing.push(def);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getAllCustomCards(): CustomCardDefinition[] {
  return [...builtinCustomCards, ...getUserCustomCards()];
}

export function getCustomCardDef(type: string): CustomCardDefinition | undefined {
  return getAllCustomCards().find((c) => c.type === type);
}
