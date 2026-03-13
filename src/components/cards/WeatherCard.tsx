import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';

export function WeatherCard({ card }: { card: CardConfig }) {
  const entityId = (card.config.entity as string) || 'weather.home';
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Weather';
  const temp = (entity?.attributes?.temperature as number) ?? 72;
  const humidity = (entity?.attributes?.humidity as number) ?? 45;
  const state = entity?.state || 'sunny';

  const weatherIcons: Record<string, string> = {
    sunny: '☀️', clear: '☀️', 'clear-night': '🌙', cloudy: '☁️',
    partlycloudy: '⛅', rainy: '🌧️', snowy: '❄️', fog: '🌫️',
    windy: '💨', lightning: '⛈️',
  };

  return (
    <div className="card-preview">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-ha-textSecondary mb-1">{name}</div>
          <div className="text-4xl font-light text-ha-text">
            {temp}°
          </div>
        </div>
        <div className="text-5xl">{weatherIcons[state] || '🌤️'}</div>
      </div>
      <div className="flex gap-4 text-xs text-ha-textSecondary">
        <span>💧 {humidity}%</span>
        <span className="capitalize">{state.replace(/-/g, ' ')}</span>
      </div>
      {/* Forecast */}
      <div className="flex justify-between mt-4 pt-3 border-t border-ha-border">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-ha-textSecondary">{day}</span>
            <span className="text-lg">{['☀️', '⛅', '🌧️', '☀️', '⛅'][i]}</span>
            <span className="text-[10px] text-ha-text">{70 + i * 2}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
