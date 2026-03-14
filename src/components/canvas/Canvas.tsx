import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { SortableCard } from './SortableCard';

// Tailwind col-span classes must be listed explicitly so the purger keeps them
const COL_SPAN_CLASSES: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

export function getColSpanClass(colSpan?: number): string {
  const n = colSpan ?? 4;
  return COL_SPAN_CLASSES[n] ?? 'col-span-4';
}

export function Canvas() {
  const { dashboard, activeViewId, selectCard, selectedCardId } = useDashboardStore();

  const activeView = dashboard.views.find((v) => v.id === activeViewId);
  const cards = activeView?.cards ?? [];

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectCard(null);
    }
  };

  return (
    <div
      className="flex-1 overflow-auto bg-ha-bg p-6"
      onClick={handleCanvasClick}
    >
      {cards.length === 0 ? (
        <EmptyCanvas />
      ) : (
        <SortableContext items={cards.map((c) => c.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                className={getColSpanClass(card.colSpan)}
              >
                <SortableCard
                  card={card}
                  isSelected={card.id === selectedCardId}
                  onSelect={() => selectCard(card.id)}
                />
              </div>
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
}

function EmptyCanvas() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
      <div className="w-16 h-16 rounded-2xl bg-ha-card border-2 border-dashed border-ha-border flex items-center justify-center mb-4">
        <Plus size={24} className="text-ha-textSecondary" />
      </div>
      <h3 className="text-ha-text text-lg font-medium mb-2">Start building your dashboard</h3>
      <p className="text-ha-textSecondary text-sm max-w-md">
        Drag cards from the sidebar onto this canvas, or click a card type to add it.
        You can rearrange cards by dragging them around.
      </p>
    </div>
  );
}
