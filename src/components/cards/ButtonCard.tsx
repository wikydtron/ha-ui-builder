import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function ButtonCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Button';
  const showState = card.config.show_state !== false;
  const showIcon = card.config.show_icon !== false;
  const showName = card.config.show_name !== false;
  const isOn = entity?.state === 'on';

  return (
    <div className="card-preview flex flex-col items-center justify-center min-h-[120px] gap-2 cursor-pointer hover:bg-ha-border/30 transition-colors">
      {showIcon && (
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors ${
            isOn ? 'bg-ha-blue/20 text-ha-blue' : 'bg-ha-bg text-ha-textSecondary'
          }`}
        >
          {getButtonIcon(entityId)}
        </div>
      )}
      {showName && <div className="text-sm text-ha-text font-medium">{name}</div>}
      {showState && entity && (
        <div className={`text-xs ${isOn ? 'text-ha-blue' : 'text-ha-textSecondary'}`}>
          {entity.state}
        </div>
      )}
    </div>
  );
}

function getButtonIcon(entityId?: string): string {
  if (!entityId) return '⚡';
  const domain = entityId.split('.')[0];
  const icons: Record<string, string> = {
    light: '💡', switch: '🔌', script: '▶️', automation: '⚙️',
    scene: '🎬', fan: '🌀', lock: '🔒', cover: '🪟',
  };
  return icons[domain] || '⚡';
}
