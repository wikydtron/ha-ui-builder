import type { CardCategory, CardSchema } from '../types';
import { basicCardSchemas } from './basicCards';
import { sensorCardSchemas } from './sensorCards';
import { mediaCardSchemas } from './mediaCards';
import { layoutCardSchemas } from './layoutCards';
import { customCardSchemas } from './customCards';

// ============================================================
// Aggregated Card Schema Registry
// ============================================================

/** Flat array of every card schema. */
export const allCardSchemas: CardSchema[] = [
  ...basicCardSchemas,
  ...sensorCardSchemas,
  ...mediaCardSchemas,
  ...layoutCardSchemas,
  ...customCardSchemas,
];

/** Map from card type string to its schema for O(1) lookups. */
export const cardSchemas: Map<string, CardSchema> = new Map(
  allCardSchemas.map((schema) => [schema.type, schema]),
);

/** Return all schemas belonging to a given category. */
export function getSchemasByCategory(category: CardCategory): CardSchema[] {
  return allCardSchemas.filter((schema) => schema.category === category);
}

// Re-export grouped arrays for convenience
export { basicCardSchemas } from './basicCards';
export { sensorCardSchemas } from './sensorCards';
export { mediaCardSchemas } from './mediaCards';
export { layoutCardSchemas } from './layoutCards';
export { customCardSchemas } from './customCards';
