import type { CardConfig } from '../../types';
import { fakeEntities } from '../../data/fakeEntities';
import { SkipBack, Play, SkipForward, Volume2 } from 'lucide-react';

export function MediaControlCard({ card }: { card: CardConfig }) {
  const entityId = card.config.entity as string;
  const entity = fakeEntities.find((e) => e.entity_id === entityId);
  const name = (card.config.name as string) || entity?.friendly_name || 'Media Player';
  const mediaTitle = (entity?.attributes?.media_title as string) || 'No media playing';
  const mediaArtist = (entity?.attributes?.media_artist as string) || '';
  const source = (entity?.attributes?.source as string) || '';
  return (
    <div className="card-preview">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-ha-bg flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-ha-text font-medium truncate">{name}</div>
          <div className="text-xs text-ha-textSecondary truncate">{source}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm text-ha-text truncate">{mediaTitle}</div>
        {mediaArtist && (
          <div className="text-xs text-ha-textSecondary truncate">{mediaArtist}</div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-ha-border rounded-full mb-3">
        <div className="w-1/3 h-full bg-ha-blue rounded-full" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button className="text-ha-textSecondary hover:text-ha-text transition-colors">
          <SkipBack size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-ha-blue flex items-center justify-center text-white">
          <Play size={18} fill="white" />
        </button>
        <button className="text-ha-textSecondary hover:text-ha-text transition-colors">
          <SkipForward size={18} />
        </button>
        <button className="text-ha-textSecondary hover:text-ha-text transition-colors ml-2">
          <Volume2 size={18} />
        </button>
      </div>
    </div>
  );
}
