import type { CardConfig } from '../../types';
import { cardSchemas } from '../../schemas';
import { Settings } from 'lucide-react';

export function GenericCard({ card }: { card: CardConfig }) {
  const schema = cardSchemas.get(card.type);
  const title = (card.config.title as string) || (card.config.name as string) || '';
  const entity = card.config.entity as string;
  const isCustom = card.type.startsWith('custom:');

  return (
    <div className="card-preview">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-ha-bg flex items-center justify-center">
          <Settings size={14} className="text-ha-textSecondary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ha-text font-medium truncate">
            {title || schema?.label || card.type}
          </div>
          <div className="text-[10px] text-ha-textSecondary">{card.type}</div>
        </div>
        {isCustom && (
          <span className="text-[9px] bg-ha-blue/20 text-ha-blue px-1.5 py-0.5 rounded">
            Custom
          </span>
        )}
      </div>
      {entity && (
        <div className="text-xs text-ha-textSecondary bg-ha-bg rounded px-2 py-1 truncate">
          {entity}
        </div>
      )}
      {schema?.description && !entity && (
        <div className="text-xs text-ha-textSecondary mt-1">{schema.description}</div>
      )}
      {/* Show configured fields */}
      {Object.keys(card.config).length > 0 && (
        <div className="mt-2 space-y-1">
          {Object.entries(card.config)
            .filter(([k, v]) => v !== undefined && v !== '' && k !== 'type')
            .slice(0, 4)
            .map(([key, value]) => (
              <div key={key} className="flex justify-between text-[10px]">
                <span className="text-ha-textSecondary">{key}</span>
                <span className="text-ha-text truncate max-w-[120px]">
                  {typeof value === 'object' ? JSON.stringify(value).slice(0, 30) : String(value)}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
