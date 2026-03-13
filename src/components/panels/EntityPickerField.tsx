import { useState, useRef, useEffect, useMemo } from 'react';
import { searchEntities, fakeEntities } from '../../data/fakeEntities';
import { useUIStore } from '../../store/uiStore';

interface EntityPickerFieldProps {
  value: string;
  onChange: (value: unknown) => void;
}

export function EntityPickerField({ value, onChange }: EntityPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!search.trim()) return fakeEntities.slice(0, 20);
    return searchEntities(search).slice(0, 20);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (entityId: string) => {
    onChange(entityId);
    setSearch('');
    setIsOpen(false);
    useUIStore.getState().addRecentEntity(entityId);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        value={isOpen ? search : value}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setSearch(value);
        }}
        placeholder="entity_id..."
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-ha-toolbar border border-ha-border rounded-lg shadow-xl max-h-48 overflow-y-auto"
        >
          {results.map((entity) => (
            <button
              key={entity.entity_id}
              onClick={() => handleSelect(entity.entity_id)}
              className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-ha-card transition-colors text-left cursor-pointer"
            >
              <div className="min-w-0">
                <div className="text-xs text-ha-text truncate">{entity.friendly_name}</div>
                <div className="text-[10px] text-ha-textSecondary truncate">{entity.entity_id}</div>
              </div>
              <span className="text-[10px] text-ha-textSecondary ml-2 shrink-0">{entity.state}</span>
            </button>
          ))}
          {results.length === 0 && (
            <div className="px-3 py-2 text-xs text-ha-textSecondary">
              No entities found. You can type a custom entity_id.
            </div>
          )}
          {/* Allow custom entity */}
          {search.trim() && !results.find((e) => e.entity_id === search.trim()) && (
            <button
              onClick={() => handleSelect(search.trim())}
              className="w-full px-3 py-1.5 hover:bg-ha-card transition-colors text-left border-t border-ha-border cursor-pointer"
            >
              <div className="text-xs text-ha-blue">Use custom: {search.trim()}</div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
