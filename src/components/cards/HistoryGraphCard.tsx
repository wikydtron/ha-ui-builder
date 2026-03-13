import type { CardConfig } from '../../types';

export function HistoryGraphCard({ card }: { card: CardConfig }) {
  const title = (card.config.title as string) || 'History';
  const hours = (card.config.hours_to_show as number) || 24;

  // Generate fake chart points
  const points = Array.from({ length: 24 }, (_, i) => ({
    x: i,
    y: 60 + Math.sin(i * 0.5) * 15 + Math.random() * 5,
  }));

  const maxY = Math.max(...points.map((p) => p.y));
  const minY = Math.min(...points.map((p) => p.y));
  const range = maxY - minY || 1;

  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((p.y - minY) / range) * 80;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="card-preview">
      <div className="text-sm font-medium text-ha-text mb-3">{title}</div>
      <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#3a3a3a" strokeWidth="0.3" />
        ))}
        {/* Line */}
        <path d={pathData} fill="none" stroke="#03a9f4" strokeWidth="1.5" />
        {/* Fill */}
        <path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill="url(#gradient)"
          opacity="0.2"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#03a9f4" />
            <stop offset="100%" stopColor="#03a9f4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-[10px] text-ha-textSecondary mt-1">Last {hours} hours</div>
    </div>
  );
}
