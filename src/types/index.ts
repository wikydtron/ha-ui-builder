// ============================================================
// Core Types for HA Dashboard Builder
// ============================================================

export type FieldType =
  | 'text'
  | 'entity'
  | 'icon'
  | 'color'
  | 'boolean'
  | 'select'
  | 'number'
  | 'list'
  | 'nested'
  | 'entities-list'
  | 'yaml'
  | 'image-url'
  | 'action'
  | 'template';

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  default?: unknown;
  helpText?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  nestedFields?: FieldSchema[];
  isHAStandard?: boolean;
}

export interface CardSchema {
  type: string;
  label: string;
  description: string;
  icon: string;
  category: CardCategory;
  fields: FieldSchema[];
  isCustom?: boolean;
}

export type CardCategory =
  | 'basic'
  | 'sensor'
  | 'media'
  | 'layout'
  | 'advanced'
  | 'custom';

export interface CardConfig {
  id: string;
  type: string;
  config: Record<string, unknown>;
  children?: CardConfig[];
}

export interface ViewConfig {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  cards: CardConfig[];
  layout?: 'masonry' | 'panel' | 'sidebar';
}

export interface DashboardConfig {
  id: string;
  title: string;
  views: ViewConfig[];
}

export interface HAEntity {
  entity_id: string;
  friendly_name: string;
  state: string;
  domain: string;
  attributes: Record<string, unknown>;
}

export interface ModuleTemplate {
  id: string;
  name: string;
  description: string;
  cardConfig: CardConfig;
  createdAt: number;
  tags: string[];
}

export interface ProjectFile {
  version: string;
  dashboard: DashboardConfig;
  modules: ModuleTemplate[];
  exportedAt: number;
}

// UI State types
export type SidebarTab = 'cards' | 'entities' | 'modules' | 'hacs';
export type RightPanelTab = 'config' | 'yaml';

export interface DragItem {
  type: 'new-card' | 'existing-card';
  cardType?: string;
  cardId?: string;
  sourceViewId?: string;
}
