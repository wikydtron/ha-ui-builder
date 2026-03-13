import type { CardSchema } from '../types';

// ============================================================
// Basic Card Schemas
// ============================================================

export const entityCardSchema: CardSchema = {
  type: 'entity',
  label: 'Entity',
  description: 'Display the state and attributes of a single entity with optional action handling.',
  icon: 'SquareFunction',
  category: 'basic',
  fields: [
    {
      name: 'entity',
      label: 'Entity',
      type: 'entity',
      required: true,
      helpText: 'The entity ID to display (e.g., light.living_room).',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name to display instead of the entity friendly name.',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'icon',
      helpText: 'Override the default entity icon (e.g., mdi:lightbulb).',
    },
    {
      name: 'state_color',
      label: 'State Color',
      type: 'boolean',
      default: true,
      helpText: 'Color the icon based on the entity state.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
    {
      name: 'attribute',
      label: 'Attribute',
      type: 'text',
      helpText: 'Show a specific attribute instead of the entity state.',
    },
    {
      name: 'unit',
      label: 'Unit of Measurement',
      type: 'text',
      helpText: 'Override the unit of measurement.',
    },
    {
      name: 'tap_action',
      label: 'Tap Action',
      type: 'action',
      default: { action: 'more-info' },
      helpText: 'Action performed on tap.',
    },
    {
      name: 'hold_action',
      label: 'Hold Action',
      type: 'action',
      helpText: 'Action performed on hold.',
    },
    {
      name: 'footer',
      label: 'Footer (YAML)',
      type: 'yaml',
      helpText: 'Add a graph or buttons footer in YAML format.',
    },
  ],
};

export const entitiesCardSchema: CardSchema = {
  type: 'entities',
  label: 'Entities',
  description: 'Display a list of entities in rows with optional header and footer.',
  icon: 'List',
  category: 'basic',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      required: true,
      helpText: 'List of entity IDs or entity row configurations.',
      isHAStandard: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'icon',
      label: 'Header Icon',
      type: 'icon',
      helpText: 'Icon displayed next to the title.',
    },
    {
      name: 'show_header_toggle',
      label: 'Show Header Toggle',
      type: 'boolean',
      default: true,
      helpText: 'Show a toggle in the header to turn on/off all entities.',
    },
    {
      name: 'state_color',
      label: 'State Color',
      type: 'boolean',
      default: true,
      helpText: 'Color icons based on entity states.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
    {
      name: 'header',
      label: 'Header (YAML)',
      type: 'yaml',
      helpText: 'Custom header configuration in YAML format (e.g., picture header).',
    },
    {
      name: 'footer',
      label: 'Footer (YAML)',
      type: 'yaml',
      helpText: 'Custom footer configuration in YAML (e.g., graph, buttons).',
    },
  ],
};

export const buttonCardSchema: CardSchema = {
  type: 'button',
  label: 'Button',
  description: 'A button card that can trigger an action or toggle an entity.',
  icon: 'RectangleHorizontal',
  category: 'basic',
  fields: [
    {
      name: 'entity',
      label: 'Entity',
      type: 'entity',
      helpText: 'Entity to control. Optional if using a custom tap action.',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      helpText: 'Text displayed on the button.',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'icon',
      helpText: 'Icon displayed on the button.',
    },
    {
      name: 'show_name',
      label: 'Show Name',
      type: 'boolean',
      default: true,
      helpText: 'Whether to display the name on the button.',
    },
    {
      name: 'show_icon',
      label: 'Show Icon',
      type: 'boolean',
      default: true,
      helpText: 'Whether to display the icon on the button.',
    },
    {
      name: 'show_state',
      label: 'Show State',
      type: 'boolean',
      default: false,
      helpText: 'Whether to display the entity state on the button.',
    },
    {
      name: 'icon_height',
      label: 'Icon Height (px)',
      type: 'text',
      default: '40px',
      helpText: 'Height of the icon in pixels (e.g., 40px).',
    },
    {
      name: 'state_color',
      label: 'State Color',
      type: 'boolean',
      default: true,
      helpText: 'Color the icon based on the entity state.',
    },
    {
      name: 'tap_action',
      label: 'Tap Action',
      type: 'action',
      default: { action: 'toggle' },
      helpText: 'Action performed on tap.',
    },
    {
      name: 'hold_action',
      label: 'Hold Action',
      type: 'action',
      default: { action: 'more-info' },
      helpText: 'Action performed on hold.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const glanceCardSchema: CardSchema = {
  type: 'glance',
  label: 'Glance',
  description: 'Show multiple entities at a glance in a compact layout.',
  icon: 'LayoutGrid',
  category: 'basic',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      required: true,
      helpText: 'List of entities to display.',
      isHAStandard: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'show_name',
      label: 'Show Name',
      type: 'boolean',
      default: true,
      helpText: 'Show entity names.',
    },
    {
      name: 'show_icon',
      label: 'Show Icon',
      type: 'boolean',
      default: true,
      helpText: 'Show entity icons.',
    },
    {
      name: 'show_state',
      label: 'Show State',
      type: 'boolean',
      default: true,
      helpText: 'Show entity states.',
    },
    {
      name: 'state_color',
      label: 'State Color',
      type: 'boolean',
      default: true,
      helpText: 'Color icons based on entity states.',
    },
    {
      name: 'columns',
      label: 'Columns',
      type: 'number',
      min: 1,
      max: 10,
      helpText: 'Number of columns in the glance layout.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const markdownCardSchema: CardSchema = {
  type: 'markdown',
  label: 'Markdown',
  description: 'Render Markdown content, optionally using Jinja2 templates with entity data.',
  icon: 'FileText',
  category: 'basic',
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'template',
      required: true,
      helpText: 'Markdown content to render. Supports Jinja2 templates.',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'card_size',
      label: 'Card Size',
      type: 'number',
      default: 1,
      min: 1,
      max: 10,
      helpText: 'The algorithm for placing cards uses a height for each card. Use this to manually tweak it.',
    },
    {
      name: 'entity_id',
      label: 'Entity Filter',
      type: 'entity',
      helpText: 'Only re-render when this entity changes. Improves performance for template cards.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const shoppingListCardSchema: CardSchema = {
  type: 'shopping-list',
  label: 'Shopping List',
  description: 'Display and manage the Home Assistant shopping list.',
  icon: 'ShoppingCart',
  category: 'basic',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      default: 'Shopping List',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const iframeCardSchema: CardSchema = {
  type: 'iframe',
  label: 'iFrame',
  description: 'Embed an external webpage inside your dashboard.',
  icon: 'Globe',
  category: 'basic',
  fields: [
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
      helpText: 'The URL of the page to embed.',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed above the iframe.',
    },
    {
      name: 'aspect_ratio',
      label: 'Aspect Ratio',
      type: 'text',
      default: '50%',
      helpText: 'Height as a percentage of width (e.g., 50%, 75%).',
    },
    {
      name: 'allow_open_top_navigation',
      label: 'Allow Top Navigation',
      type: 'boolean',
      default: false,
      helpText: 'Allow the iframe to open links in the parent window.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const pictureCardSchema: CardSchema = {
  type: 'picture',
  label: 'Picture',
  description: 'Display an image with optional tap action.',
  icon: 'Image',
  category: 'basic',
  fields: [
    {
      name: 'image',
      label: 'Image URL',
      type: 'image-url',
      required: true,
      helpText: 'URL of the image to display (local path or remote URL).',
    },
    {
      name: 'alt_text',
      label: 'Alt Text',
      type: 'text',
      helpText: 'Alternative text for accessibility.',
    },
    {
      name: 'tap_action',
      label: 'Tap Action',
      type: 'action',
      default: { action: 'none' },
      helpText: 'Action performed on tap.',
    },
    {
      name: 'hold_action',
      label: 'Hold Action',
      type: 'action',
      helpText: 'Action performed on hold.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const pictureEntityCardSchema: CardSchema = {
  type: 'picture-entity',
  label: 'Picture Entity',
  description: 'Display an entity with a background image that changes based on state.',
  icon: 'ImagePlus',
  category: 'basic',
  fields: [
    {
      name: 'entity',
      label: 'Entity',
      type: 'entity',
      required: true,
      helpText: 'Entity to display.',
      isHAStandard: true,
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'image-url',
      required: true,
      helpText: 'Default image URL.',
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Override the entity friendly name.',
    },
    {
      name: 'camera_image',
      label: 'Camera Entity',
      type: 'entity',
      helpText: 'Use a camera entity as the image source.',
    },
    {
      name: 'show_name',
      label: 'Show Name',
      type: 'boolean',
      default: true,
      helpText: 'Show the entity name overlay.',
    },
    {
      name: 'show_state',
      label: 'Show State',
      type: 'boolean',
      default: true,
      helpText: 'Show the entity state overlay.',
    },
    {
      name: 'state_image',
      label: 'State Images (YAML)',
      type: 'yaml',
      helpText: 'Map of state values to image URLs (e.g., on: /local/light_on.png).',
    },
    {
      name: 'tap_action',
      label: 'Tap Action',
      type: 'action',
      default: { action: 'more-info' },
      helpText: 'Action performed on tap.',
    },
    {
      name: 'hold_action',
      label: 'Hold Action',
      type: 'action',
      helpText: 'Action performed on hold.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const pictureGlanceCardSchema: CardSchema = {
  type: 'picture-glance',
  label: 'Picture Glance',
  description: 'Show entities overlaid on a picture with a glance-style layout.',
  icon: 'GalleryHorizontalEnd',
  category: 'basic',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      required: true,
      helpText: 'List of entities to display as icons over the image.',
      isHAStandard: true,
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'image-url',
      required: true,
      helpText: 'Background image URL.',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title overlaid on the image.',
    },
    {
      name: 'camera_image',
      label: 'Camera Entity',
      type: 'entity',
      helpText: 'Use a camera entity as the background image.',
    },
    {
      name: 'camera_view',
      label: 'Camera View',
      type: 'select',
      default: 'auto',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Live', value: 'live' },
      ],
      helpText: 'How to display the camera feed.',
    },
    {
      name: 'state_image',
      label: 'State Images (YAML)',
      type: 'yaml',
      helpText: 'Map of state values to image URLs.',
    },
    {
      name: 'entity',
      label: 'State Entity',
      type: 'entity',
      helpText: 'Entity whose state determines which state_image to show.',
    },
    {
      name: 'state_color',
      label: 'State Color',
      type: 'boolean',
      default: true,
      helpText: 'Color entity icons based on their state.',
    },
    {
      name: 'tap_action',
      label: 'Tap Action',
      type: 'action',
      default: { action: 'more-info' },
      helpText: 'Action performed when tapping the image.',
    },
    {
      name: 'hold_action',
      label: 'Hold Action',
      type: 'action',
      helpText: 'Action performed when holding the image.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const basicCardSchemas: CardSchema[] = [
  entityCardSchema,
  entitiesCardSchema,
  buttonCardSchema,
  glanceCardSchema,
  markdownCardSchema,
  shoppingListCardSchema,
  iframeCardSchema,
  pictureCardSchema,
  pictureEntityCardSchema,
  pictureGlanceCardSchema,
];
