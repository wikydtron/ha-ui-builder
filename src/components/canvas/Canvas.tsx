import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { SortableCard } from './SortableCard';

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                isSelected={card.id === selectedCardId}
                onSelect={() => selectCard(card.id)}
              />
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
