import type { CardConfig } from '../../types';
import { CardRenderer } from './CardRenderer';
import { Layers } from 'lucide-react';

export function StackCard({ card }: { card: CardConfig }) {
  const isHorizontal = card.type === 'horizontal-stack';
  const isGrid = card.type === 'grid';
  const children = card.children || [];

  if (children.length === 0) {
    return (
      <div className="card-preview border-2 border-dashed border-ha-border bg-ha-bg/50">
        <div className="flex flex-col items-center justify-center py-6 text-ha-textSecondary">
          <Layers size={24} className="mb-2" />
          <div className="text-xs font-medium capitalize">
            {card.type.replace('-', ' ')}
          </div>
          <div className="text-[10px] mt-1">Drop cards here</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-preview p-2">
      <div className="text-[10px] text-ha-textSecondary mb-2 uppercase font-medium">
        {card.type.replace('-', ' ')}
      </div>
      <div
        className={
          isGrid
            ? 'grid grid-cols-2 gap-2'
            : isHorizontal
            ? 'flex gap-2'
            : 'flex flex-col gap-2'
        }
      >
        {children.map((child) => (
          <div key={child.id} className={isHorizontal ? 'flex-1' : ''}>
            <CardRenderer card={child} />
          </div>
        ))}
      </div>
    </div>
  );
}
