import { useState, useMemo } from 'react';
import { Search, Star, Clock, ChevronDown, ChevronRight, Plug } from 'lucide-react';
import { fakeEntities, getAllDomains, getEntitiesByDomain, searchEntities } from '../../data/fakeEntities';
import { useUIStore } from '../../store/uiStore';
import { useHAStore } from '../../store/haStore';
import type { HAEntity } from '../../types';

export function EntityBrowser() {
  const [search, setSearch] = useState('');
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [showMode, setShowMode] = useState<'all' | 'favorites' | 'recent'>('all');
  const { recentEntities, favoriteEntities, toggleFavoriteEntity } = useUIStore();
  const { connected, entities: liveEntities } = useHAStore();

  // Use live entities if connected, otherwise fall back to fakeEntities
  const allEntities: HAEntity[] = useMemo(() => {
    if (connected && liveEntities.length > 0) {
      return liveEntities.map((e) => ({
        entity_id: e.entity_id,
        friendly_name: (e.attributes.friendly_name as string) || e.entity_id,
        state: e.state,
        domain: e.entity_id.split('.')[0],
        attributes: e.attributes,
      }));
    }
    return fakeEntities;
  }, [connected, liveEntities]);

  const liveSearchFn = (q: string): HAEntity[] => {
    const lower = q.toLowerCase();
    return allEntities.filter(
      (e) =>
        e.entity_id.toLowerCase().includes(lower) ||
        e.friendly_name.toLowerCase().includes(lower)
    );
  };

  const domains = useMemo(() => {
    if (connected && liveEntities.length > 0) {
      return [...new Set(allEntities.map((e) => e.domain))].sort();
    }
    return getAllDomains();
  }, [connected, liveEntities, allEntities]);

  const getByDomain = (domain: string): HAEntity[] => {
    if (connected && liveEntities.length > 0) {
      return allEntities.filter((e) => e.domain === domain);
    }
    return getEntitiesByDomain(domain);
  };

  const filteredEntities = useMemo(() => {
    if (search.trim()) {
      return connected && liveEntities.length > 0
        ? liveSearchFn(search)
        : searchEntities(search);
    }
    if (showMode === 'favorites') {
      return allEntities.filter((e) => favoriteEntities.includes(e.entity_id));
    }
    if (showMode === 'recent') {
      return allEntities.filter((e) => recentEntities.includes(e.entity_id));
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, showMode, favoriteEntities, recentEntities, connected, liveEntities]);

  const handleEntityClick = (entity: HAEntity) => {
    navigator.clipboard.writeText(entity.entity_id);
    useUIStore.getState().addRecentEntity(entity.entity_id);
  };

  return (
    <div className="p-2">
      {/* Live connection indicator */}
      {connected && (
        <div className="flex items-center gap-1.5 mb-2 px-2 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
          <Plug size={11} className="text-green-400 shrink-0" />
          <span className="text-[10px] text-green-400">Live — {liveEntities.length} entities</span>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-2">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ha-textSecondary" />
        <input
          className="input-field pl-8 text-xs"
          placeholder="Search entities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 mb-2">
        {[
          { id: 'all' as const, label: 'All', icon: null },
          { id: 'favorites' as const, label: 'Favorites', icon: <Star size={10} /> },
          { id: 'recent' as const, label: 'Recent', icon: <Clock size={10} /> },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setShowMode(mode.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
              showMode === mode.id
                ? 'bg-ha-blue/20 text-ha-blue'
                : 'text-ha-textSecondary hover:text-ha-text'
            }`}
          >
            {mode.icon}
            {mode.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filteredEntities ? (
        <div className="space-y-0.5">
          {filteredEntities.map((entity) => (
            <EntityItem
              key={entity.entity_id}
              entity={entity}
              isFavorite={favoriteEntities.includes(entity.entity_id)}
              onToggleFavorite={() => toggleFavoriteEntity(entity.entity_id)}
              onClick={() => handleEntityClick(entity)}
            />
          ))}
          {filteredEntities.length === 0 && (
            <p className="text-ha-textSecondary text-xs text-center py-4">No entities found</p>
          )}
        </div>
      ) : (
        <div className="space-y-0.5">
          {domains.map((domain) => {
            const entities = getByDomain(domain);
            return (
              <div key={domain}>
                <button
                  onClick={() => setExpandedDomain(expandedDomain === domain ? null : domain)}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
                >
                  {expandedDomain === domain ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span className="font-medium">{domain}</span>
                  <span className="text-[10px] bg-ha-card px-1.5 py-0.5 rounded ml-auto">{entities.length}</span>
                </button>
                {expandedDomain === domain && (
                  <div className="ml-3 space-y-0.5">
                    {entities.map((entity) => (
                      <EntityItem
                        key={entity.entity_id}
                        entity={entity}
                        isFavorite={favoriteEntities.includes(entity.entity_id)}
                        onToggleFavorite={() => toggleFavoriteEntity(entity.entity_id)}
                        onClick={() => handleEntityClick(entity)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EntityItem({
  entity,
  isFavorite,
  onToggleFavorite,
  onClick,
}: {
  entity: HAEntity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ha-card transition-colors cursor-pointer group"
      onClick={onClick}
      title={`Click to copy: ${entity.entity_id}`}
    >
      <div className="flex-1 min-w-0">
        <div className="text-xs text-ha-text truncate">{entity.friendly_name}</div>
        <div className="text-[10px] text-ha-textSecondary truncate">{entity.entity_id}</div>
      </div>
      <span className="text-[10px] text-ha-textSecondary shrink-0">{entity.state}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`shrink-0 transition-colors cursor-pointer ${
          isFavorite ? 'text-yellow-400' : 'text-ha-border opacity-0 group-hover:opacity-100'
        }`}
      >
        <Star size={12} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
