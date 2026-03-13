import type { CardSchema } from '../types';

// ============================================================
// Media Card Schemas
// ============================================================

export const mediaControlCardSchema: CardSchema = {
  type: 'media-control',
  label: 'Media Control',
  description: 'Control a media player entity with playback controls and media info display.',
  icon: 'Music',
  category: 'media',
  fields: [
    {
      name: 'entity',
      label: 'Media Player Entity',
      type: 'entity',
      required: true,
      helpText: 'Media player entity to control (e.g., media_player.living_room).',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name displayed on the card.',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'icon',
      helpText: 'Override the default media player icon.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const mediaCardSchemas: CardSchema[] = [
  mediaControlCardSchema,
];
