import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function EntityCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || entityId || 'Entity';
  const state = entity?.state || 'unknown';
  const icon = card.config.icon as string;
  const unit = entity?.attributes?.unit_of_measurement as string;

  return (
    <div className="card-preview">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ha-blue/20 flex items-center justify-center text-ha-blue text-lg">
            {icon ? '🔹' : getEntityIcon(entityId)}
          </div>
          <div>
            <div className="text-sm text-ha-text font-medium">{name}</div>
            <div className="text-xs text-ha-textSecondary">{entityId || 'No entity selected'}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light text-ha-text">
            {state}
            {unit && <span className="text-sm text-ha-textSecondary ml-1">{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function getEntityIcon(entityId?: string): string {
  if (!entityId) return '❓';
  const domain = entityId.split('.')[0];
  const icons: Record<string, string> = {
    light: '💡',
    switch: '🔌',
    sensor: '🌡️',
    binary_sensor: '👁️',
    climate: '🌡️',
    media_player: '🎵',
    cover: '🪟',
    fan: '🌀',
    lock: '🔒',
    vacuum: '🤖',
    camera: '📷',
    weather: '🌤️',
    automation: '⚙️',
    script: '📜',
    person: '👤',
  };
  return icons[domain] || '📊';
}
