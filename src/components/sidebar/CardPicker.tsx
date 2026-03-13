import { useState, useMemo } from 'react';
import { Search, GripVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { allCardSchemas, getSchemasByCategory } from '../../schemas';
import type { CardCategory, CardSchema } from '../../types';

const categories: { id: CardCategory; label: string }[] = [
  { id: 'basic', label: 'Basic' },
  { id: 'sensor', label: 'Sensors & Data' },
  { id: 'media', label: 'Media' },
  { id: 'layout', label: 'Layout' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'custom', label: 'Custom / HACS' },
];

export function CardPicker() {
  const [search, setSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<CardCategory | null>('basic');

  const filteredSchemas = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allCardSchemas.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="p-2">
      {/* Search */}
      <div className="relative mb-2">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ha-textSecondary" />
        <input
          className="input-field pl-8 text-xs"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtered results or categories */}
      {filteredSchemas ? (
        <div className="space-y-1">
          {filteredSchemas.map((schema) => (
            <DraggableCardItem key={schema.type} schema={schema} />
          ))}
          {filteredSchemas.length === 0 && (
            <p className="text-ha-textSecondary text-xs text-center py-4">No cards found</p>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          {categories.map((cat) => {
            const schemas = getSchemasByCategory(cat.id);
            if (schemas.length === 0) return null;
            return (
              <div key={cat.id}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] bg-ha-card px-1.5 py-0.5 rounded">{schemas.length}</span>
                </button>
                {expandedCategory === cat.id && (
                  <div className="space-y-0.5 ml-1">
                    {schemas.map((schema) => (
                      <DraggableCardItem key={schema.type} schema={schema} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DraggableCardItem({ schema }: { schema: CardSchema }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-card-${schema.type}`,
    data: { type: 'new-card', cardType: schema.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-grab active:cursor-grabbing transition-colors hover:bg-ha-card group ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <GripVertical size={12} className="text-ha-border group-hover:text-ha-textSecondary shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-ha-text truncate">{schema.label}</div>
        <div className="text-[10px] text-ha-textSecondary truncate">{schema.type}</div>
      </div>
      {schema.isCustom && (
        <span className="text-[9px] bg-ha-blue/20 text-ha-blue px-1 py-0.5 rounded shrink-0">HACS</span>
      )}
    </div>
  );
}
