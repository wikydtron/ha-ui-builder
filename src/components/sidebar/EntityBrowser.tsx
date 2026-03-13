import { useState, useMemo } from 'react';
import { Search, Star, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { fakeEntities, getAllDomains, getEntitiesByDomain, searchEntities } from '../../data/fakeEntities';
import { useUIStore } from '../../store/uiStore';
import type { HAEntity } from '../../types';

export function EntityBrowser() {
  const [search, setSearch] = useState('');
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [showMode, setShowMode] = useState<'all' | 'favorites' | 'recent'>('all');
  const { recentEntities, favoriteEntities, toggleFavoriteEntity } = useUIStore();

  const domains = useMemo(() => getAllDomains(), []);

  const filteredEntities = useMemo(() => {
    if (search.trim()) {
      return searchEntities(search);
    }
    if (showMode === 'favorites') {
      return fakeEntities.filter((e) => favoriteEntities.includes(e.entity_id));
    }
    if (showMode === 'recent') {
      return fakeEntities.filter((e) => recentEntities.includes(e.entity_id));
    }
    return null;
  }, [search, showMode, favoriteEntities, recentEntities]);

  const handleEntityClick = (entity: HAEntity) => {
    navigator.clipboard.writeText(entity.entity_id);
    useUIStore.getState().addRecentEntity(entity.entity_id);
  };

  return (
    <div className="p-2">
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
            const entities = getEntitiesByDomain(domain);
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
