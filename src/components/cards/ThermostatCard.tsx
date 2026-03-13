import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function ThermostatCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Thermostat';
  const currentTemp = (entity?.attributes?.current_temperature as number) ?? 70;
  const targetTemp = (entity?.attributes?.temperature as number) ?? 72;
  const mode = entity?.state || 'heat';

  const modeColors: Record<string, string> = {
    heat: '#ff9800',
    cool: '#03a9f4',
    auto: '#4caf50',
    off: '#9e9e9e',
  };

  const color = modeColors[mode] || modeColors.heat;

  return (
    <div className="card-preview">
      <div className="text-sm text-ha-textSecondary mb-4">{name}</div>
      <div className="flex flex-col items-center">
        {/* Thermostat circle */}
        <div
          className="w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center mb-4"
          style={{ borderColor: color }}
        >
          <div className="text-3xl font-light text-ha-text">{targetTemp}°</div>
          <div className="text-xs text-ha-textSecondary">Target</div>
        </div>
        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <div className="text-ha-text font-medium">{currentTemp}°</div>
            <div className="text-[10px] text-ha-textSecondary">Current</div>
          </div>
          <div className="text-center">
            <div className="capitalize font-medium" style={{ color }}>{mode}</div>
            <div className="text-[10px] text-ha-textSecondary">Mode</div>
          </div>
        </div>
      </div>
    </div>
  );
}
