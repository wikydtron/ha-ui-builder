import { useCallback, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Sidebar } from '../sidebar/Sidebar';
import { Canvas } from '../canvas/Canvas';
import { RightPanel } from '../panels/RightPanel';
import { Toolbar } from './Toolbar';
import { ViewTabs } from './ViewTabs';
import { CardRenderer } from '../cards/CardRenderer';
import { useDashboardStore } from '../../store/dashboardStore';
import { generateId } from '../../utils/ids';
import { cardSchemas } from '../../schemas';
import type { CardConfig } from '../../types';

export function AppShell() {
  const { dashboard, activeViewId, addCard, moveCard, selectCard } = useDashboardStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<Record<string, unknown> | null>(null);

  const activeView = dashboard.views.find((v) => v.id === activeViewId);
  const cards = activeView?.cards ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveDragData((event.active.data.current as Record<string, unknown>) ?? null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      setActiveDragData(null);
      const { active, over } = event;
      if (!activeViewId) return;

      // Handle new card dragged from sidebar
      const data = active.data.current as Record<string, unknown> | undefined;
      if (data?.type === 'new-card' && data.cardType) {
        const cardType = data.cardType as string;
        const schema = cardSchemas.get(cardType);
        const defaults: Record<string, unknown> = {};
        if (schema) {
          for (const field of schema.fields) {
            if (field.default !== undefined) {
              defaults[field.name] = field.default;
            }
          }
        }
        if (data.moduleConfig) {
          Object.assign(defaults, data.moduleConfig as object);
        }
        const newCard: CardConfig = {
          id: generateId(),
          type: cardType,
          config: defaults,
        };
        if (['vertical-stack', 'horizontal-stack', 'grid'].includes(cardType)) {
          newCard.children = [];
        }
        addCard(activeViewId, newCard);
        selectCard(newCard.id);
        return;
      }

      // Reorder existing cards on canvas
      if (!over || active.id === over.id) return;
      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveCard(activeViewId, oldIndex, newIndex);
      }
    },
    [activeViewId, cards, addCard, moveCard, selectCard]
  );

  // Determine what to show in the drag overlay
  const activeCard = activeId ? cards.find((c) => c.id === activeId) : null;
  const isDraggingNewCard = activeDragData?.type === 'new-card';

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-screen overflow-hidden">
        <Toolbar />
        <ViewTabs />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Canvas />
          <RightPanel />
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="opacity-80 rotate-2 scale-105 pointer-events-none">
            <CardRenderer card={activeCard} isPreview />
          </div>
        ) : isDraggingNewCard ? (
          <div className="bg-ha-card border border-ha-accent rounded-lg px-3 py-2 text-xs text-ha-text opacity-90 shadow-lg pointer-events-none">
            + {activeDragData?.cardType as string}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
