import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Copy, BookMarked } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { useModuleStore } from '../../store/moduleStore';
import { CardRenderer } from '../cards/CardRenderer';
import type { CardConfig } from '../../types';
import { useState } from 'react';

interface SortableCardProps {
  card: CardConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export function SortableCard({ card, isSelected, onSelect }: SortableCardProps) {
  const { removeCard, duplicateCard, activeViewId } = useDashboardStore();
  const { saveModule } = useModuleStore();
  const [showSaveModule, setShowSaveModule] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeCard(activeViewId, card.id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateCard(activeViewId, card.id);
  };

  const handleSaveAsModule = (name: string) => {
    saveModule(name, '', card, [card.type]);
    setShowSaveModule(false);
  };

  // Determine column span for layout cards
  const isLayoutCard = ['vertical-stack', 'horizontal-stack', 'grid'].includes(card.type);
  const colSpanClass = isLayoutCard ? 'md:col-span-2 lg:col-span-2' : '';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${colSpanClass}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Selection ring */}
      <div
        className={`rounded-xl transition-all ${
          isSelected ? 'ring-2 ring-ha-blue ring-offset-1 ring-offset-ha-bg' : ''
        }`}
      >
        <CardRenderer card={card} />
      </div>

      {/* Hover toolbar */}
      <div className="absolute -top-3 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-ha-toolbar border border-ha-border rounded-md shadow-lg overflow-hidden z-10">
        <button
          className="p-1.5 text-ha-textSecondary hover:text-ha-text hover:bg-ha-card transition-colors cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={12} />
        </button>
        <button
          className="p-1.5 text-ha-textSecondary hover:text-ha-blue hover:bg-ha-card transition-colors cursor-pointer"
          onClick={handleDuplicate}
          title="Duplicate"
        >
          <Copy size={12} />
        </button>
        <button
          className="p-1.5 text-ha-textSecondary hover:text-ha-blue hover:bg-ha-card transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowSaveModule(true);
          }}
          title="Save as Module"
        >
          <BookMarked size={12} />
        </button>
        <button
          className="p-1.5 text-ha-textSecondary hover:text-ha-error hover:bg-ha-card transition-colors cursor-pointer"
          onClick={handleDelete}
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Save as module dialog */}
      {showSaveModule && (
        <SaveModuleDialog
          onSave={handleSaveAsModule}
          onCancel={() => setShowSaveModule(false)}
        />
      )}
    </div>
  );
}

function SaveModuleDialog({
  onSave,
  onCancel,
}: {
  onSave: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');

  return (
    <div
      className="absolute top-full left-0 right-0 mt-1 bg-ha-toolbar border border-ha-border rounded-lg p-3 shadow-xl z-20"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="label-text">Module Name</label>
      <input
        className="input-field mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="My custom card..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && name.trim()) onSave(name.trim());
          if (e.key === 'Escape') onCancel();
        }}
      />
      <div className="flex gap-2">
        <button
          className="btn-primary text-xs flex-1"
          onClick={() => name.trim() && onSave(name.trim())}
        >
          Save
        </button>
        <button className="btn-secondary text-xs" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
