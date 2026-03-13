import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function GaugeCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Gauge';
  const min = (card.config.min as number) ?? 0;
  const max = (card.config.max as number) ?? 100;
  const value = entity ? parseFloat(entity.state) || 50 : 50;
  const unit = (card.config.unit as string) || (entity?.attributes?.unit_of_measurement as string) || '';
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  // Determine color based on severity or value
  const getColor = () => {
    if (percentage > 80) return '#f44336';
    if (percentage > 60) return '#ff9800';
    return '#4caf50';
  };

  return (
    <div className="card-preview flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden mb-2">
        {/* Gauge background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 w-32 rounded-full border-[12px] border-ha-border" />
        {/* Gauge fill */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 w-32 rounded-full border-[12px] border-transparent"
          style={{
            borderBottomColor: getColor(),
            borderLeftColor: percentage > 25 ? getColor() : 'transparent',
            borderRightColor: percentage > 75 ? getColor() : 'transparent',
            borderTopColor: percentage > 50 ? getColor() : 'transparent',
            transform: `rotate(${45 + (percentage / 100) * 180}deg)`,
            transformOrigin: 'center center',
          }}
        />
        {/* Value display */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="text-xl font-bold text-ha-text">{value}</span>
          {unit && <span className="text-xs text-ha-textSecondary ml-1">{unit}</span>}
        </div>
      </div>
      <div className="text-sm text-ha-text">{name}</div>
    </div>
  );
}
