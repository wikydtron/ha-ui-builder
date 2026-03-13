import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function GlanceCard({ card }: { card: CardConfig }) {
  const title = card.config.title as string || 'Glance';
  const entityIds = (card.config.entities as string[]) || [];

  const entities = entityIds
    .map((id) => (typeof id === 'string' ? fakeEntities.find((e) => e.entity_id === id) : null))
    .filter(Boolean);

  const displayEntities = entities.length > 0 ? entities : fakeEntities.slice(0, 5);

  return (
    <div className="card-preview">
      <div className="text-sm font-medium text-ha-text mb-3">{title}</div>
      <div className="flex justify-around">
        {displayEntities.slice(0, 6).map((entity) =>
          entity ? (
            <div key={entity.entity_id} className="flex flex-col items-center gap-1">
              <span className="text-xl">{getDomainIcon(entity.domain)}</span>
              <span className="text-[10px] text-ha-textSecondary truncate max-w-[60px]">
                {entity.friendly_name}
              </span>
              <span className="text-xs text-ha-text font-medium">{entity.state}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function getDomainIcon(domain: string): string {
  const icons: Record<string, string> = {
    light: '💡', switch: '🔌', sensor: '🌡️', binary_sensor: '👁️',
    climate: '❄️', media_player: '🎵', cover: '🪟', fan: '🌀',
    lock: '🔒', vacuum: '🤖', person: '👤', weather: '🌤️',
  };
  return icons[domain] || '📊';
}
