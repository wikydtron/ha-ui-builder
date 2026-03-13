import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function EntitiesCard({ card }: { card: CardConfig }) {
  const title = card.config.title as string || 'Entities';
  const entityIds = (card.config.entities as string[]) || [];

  const entities = entityIds
    .map((id) => {
      if (typeof id === 'string') return fakeEntities.find((e) => e.entity_id === id);
      return null;
    })
    .filter(Boolean);

  // Show demo entities if none configured
  const displayEntities = entities.length > 0 ? entities : fakeEntities.slice(0, 4);

  return (
    <div className="card-preview">
      <div className="text-sm font-medium text-ha-text mb-3">{title}</div>
      <div className="divide-y divide-ha-border">
        {displayEntities.map((entity) =>
          entity ? (
            <div key={entity.entity_id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getDomainIcon(entity.domain)}</span>
                <span className="text-sm text-ha-text">{entity.friendly_name}</span>
              </div>
              <span className="text-sm text-ha-textSecondary">
                {entity.state}
                {entity.attributes.unit_of_measurement
                  ? ` ${entity.attributes.unit_of_measurement}`
                  : ''}
              </span>
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
    lock: '🔒', vacuum: '🤖', person: '👤',
  };
  return icons[domain] || '📊';
}
