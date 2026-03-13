import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function AlarmPanelCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Alarm Panel';
  const state = entity?.state || 'disarmed';

  const stateColors: Record<string, string> = {
    disarmed: '#4caf50',
    armed_home: '#ff9800',
    armed_away: '#f44336',
    armed_night: '#9c27b0',
    pending: '#ff9800',
    triggered: '#f44336',
  };

  const stateLabels: Record<string, string> = {
    disarmed: 'Disarmed',
    armed_home: 'Armed Home',
    armed_away: 'Armed Away',
    armed_night: 'Armed Night',
    pending: 'Pending',
    triggered: 'TRIGGERED',
  };

  return (
    <div className="card-preview">
      <div className="text-center mb-4">
        <div className="text-sm text-ha-textSecondary mb-1">{name}</div>
        <div
          className="text-lg font-bold"
          style={{ color: stateColors[state] || '#9e9e9e' }}
        >
          {stateLabels[state] || state}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto mb-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, i) => (
          <div
            key={i}
            className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
              key === ''
                ? ''
                : 'bg-ha-bg text-ha-text hover:bg-ha-border cursor-pointer transition-colors'
            }`}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-lg text-xs font-medium bg-green-500/20 text-green-400">
          Disarm
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-medium bg-orange-500/20 text-orange-400">
          Arm Home
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-medium bg-red-500/20 text-red-400">
          Arm Away
        </button>
      </div>
    </div>
  );
}
