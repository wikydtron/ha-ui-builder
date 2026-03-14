import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Copy, BookMarked } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { useModuleStore } from '../../store/moduleStore';
import { CardRenderer } from '../cards/CardRenderer';
import type { CardConfig } from '../../types';
import { useState, useRef, useCallback } from 'react';

interface SortableCardProps {
  card: CardConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export function SortableCard({ card, isSelected, onSelect }: SortableCardProps) {
  const { removeCard, duplicateCard, updateCardColSpan, activeViewId } = useDashboardStore();
  const { saveModule } = useModuleStore();
  const [showSaveModule, setShowSaveModule] = useState(false);
  const resizeStartX = useRef<number | null>(null);
  const resizeStartSpan = useRef<number>(card.colSpan ?? 4);
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Resize handle: drag right edge to adjust colSpan 1–12
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizeStartX.current = e.clientX;
      resizeStartSpan.current = card.colSpan ?? 4;

      const containerWidth = cardRef.current?.closest('.grid')?.clientWidth ?? 900;
      const colWidth = containerWidth / 12;

      const onMouseMove = (ev: MouseEvent) => {
        if (resizeStartX.current === null) return;
        const dx = ev.clientX - resizeStartX.current;
        const deltaCols = Math.round(dx / colWidth);
        const newSpan = Math.max(1, Math.min(12, resizeStartSpan.current + deltaCols));
        updateCardColSpan(activeViewId, card.id, newSpan);
      };

      const onMouseUp = () => {
        resizeStartX.current = null;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [card.id, card.colSpan, activeViewId, updateCardColSpan],
  );

  const currentSpan = card.colSpan ?? 4;

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={style}
      className="relative group h-full"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Selection ring */}
      <div
        className={`rounded-xl transition-all h-full ${
          isSelected ? 'ring-2 ring-ha-blue ring-offset-1 ring-offset-ha-bg' : ''
        }`}
      >
        <CardRenderer card={card} />
      </div>

      {/* Column count badge (visible when selected) */}
      {isSelected && (
        <div className="absolute top-1 left-1 bg-ha-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10 pointer-events-none">
          {currentSpan}/12
        </div>
      )}

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

      {/* Resize handle (right edge) */}
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center"
        onMouseDown={handleResizeMouseDown}
        title="Drag to resize"
      >
        <div className="w-1 h-8 bg-ha-blue rounded-full opacity-70" />
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
