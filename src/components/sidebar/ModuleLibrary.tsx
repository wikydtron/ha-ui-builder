import { useState } from 'react';
import { Search, Trash2, Plus } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useModuleStore } from '../../store/moduleStore';
import { useDashboardStore } from '../../store/dashboardStore';
import type { ModuleTemplate } from '../../types';

export function ModuleLibrary() {
  const { modules, deleteModule } = useModuleStore();
  const { addCard, activeViewId } = useDashboardStore();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? modules.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : modules;

  const handleAddToCanvas = (mod: ModuleTemplate) => {
    const newCard = {
      ...mod.cardConfig,
      id: crypto.randomUUID(),
      config: { ...mod.cardConfig.config },
    };
    addCard(activeViewId, newCard);
  };

  return (
    <div className="p-2">
      <div className="relative mb-2">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ha-textSecondary" />
        <input
          className="input-field pl-8 text-xs"
          placeholder="Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-ha-textSecondary text-xs mb-2">No saved modules yet</p>
          <p className="text-ha-textSecondary text-[10px]">
            Right-click any card on the canvas and select "Save as Module" to create reusable templates.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map((mod) => (
            <ModuleItem
              key={mod.id}
              module={mod}
              onAdd={() => handleAddToCanvas(mod)}
              onDelete={() => deleteModule(mod.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleItem({
  module: mod,
  onAdd,
  onDelete,
}: {
  module: ModuleTemplate;
  onAdd: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `module-${mod.id}`,
    data: { type: 'new-card', cardType: mod.cardConfig.type, moduleConfig: mod.cardConfig.config },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-2 rounded-md bg-ha-card border border-ha-border cursor-grab active:cursor-grabbing group ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-ha-text font-medium truncate">{mod.name}</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="p-1 rounded hover:bg-ha-bg transition-colors text-ha-textSecondary hover:text-ha-blue cursor-pointer"
            title="Add to canvas"
          >
            <Plus size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 rounded hover:bg-ha-bg transition-colors text-ha-textSecondary hover:text-ha-error cursor-pointer"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      {mod.description && (
        <p className="text-[10px] text-ha-textSecondary truncate">{mod.description}</p>
      )}
      {mod.tags.length > 0 && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {mod.tags.map((tag) => (
            <span key={tag} className="text-[9px] bg-ha-bg px-1.5 py-0.5 rounded text-ha-textSecondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
