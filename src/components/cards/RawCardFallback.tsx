import type { CardConfig } from '../../types';

export function RawCardFallback({ card }: { card: CardConfig }) {
  return (
    <div className="bg-ha-card rounded-lg p-3 border border-ha-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-ha-textSecondary uppercase tracking-wide">
          {card.type}
        </span>
        <span className="text-[9px] bg-ha-bg text-ha-textSecondary px-1.5 py-0.5 rounded">
          Raw
        </span>
      </div>
      <pre className="text-[10px] text-ha-textSecondary bg-ha-bg rounded p-2 overflow-auto max-h-40 whitespace-pre-wrap break-all">
        {JSON.stringify(card.config, null, 2)}
      </pre>
    </div>
  );
}
