import { useState } from 'react';
import { ExternalLink, Plus, X } from 'lucide-react';
import { getAllCustomCards, saveUserCustomCard } from '../../data/customCardRegistry';

export function CustomCardRegistryPanel() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [, forceUpdate] = useState(0);

  const cards = getAllCustomCards().filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.type.toLowerCase().includes(q);
  });

  const handleSave = () => {
    if (!newType.trim() || !newName.trim()) return;
    saveUserCustomCard({
      type: newType.trim(),
      name: newName.trim(),
      description: newDesc.trim(),
      supportLevel: 'preview-only',
      category: 'custom',
      schema: [],
      defaultConfig: {},
      renderHint: 'generic',
    });
    setNewType('');
    setNewName('');
    setNewDesc('');
    setShowForm(false);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="p-2">
      {/* Search + Add */}
      <div className="flex gap-1 mb-2">
        <input
          className="flex-1 bg-ha-bg border border-ha-border rounded px-2 py-1.5 text-xs text-ha-text outline-none focus:border-ha-blue/50"
          placeholder="Search custom cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-1.5 rounded bg-ha-card border border-ha-border text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
          title="Add custom card"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="mb-3 p-3 bg-ha-bg border border-ha-border rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ha-text">Add Custom Card</span>
            <button onClick={() => setShowForm(false)} className="text-ha-textSecondary hover:text-ha-text cursor-pointer">
              <X size={13} />
            </button>
          </div>
          <input
            className="w-full bg-ha-card border border-ha-border rounded px-2 py-1.5 text-xs text-ha-text outline-none focus:border-ha-blue/50"
            placeholder="custom:my-card"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <input
            className="w-full bg-ha-card border border-ha-border rounded px-2 py-1.5 text-xs text-ha-text outline-none focus:border-ha-blue/50"
            placeholder="Card name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="w-full bg-ha-card border border-ha-border rounded px-2 py-1.5 text-xs text-ha-text outline-none focus:border-ha-blue/50"
            placeholder="Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <button
            onClick={handleSave}
            disabled={!newType.trim() || !newName.trim()}
            className="w-full py-1.5 rounded text-xs font-medium bg-ha-blue text-white hover:bg-ha-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      )}

      {/* Card list */}
      <div className="space-y-0.5">
        {cards.map((card) => (
          <div key={card.type} className="flex items-start gap-2 py-2 border-b border-ha-border/40 last:border-0">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ha-text font-medium truncate">{card.name}</div>
              <code className="text-[10px] text-ha-textSecondary">{card.type}</code>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full">Preview</span>
              {card.docsUrl && (
                <a
                  href={card.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ha-textSecondary hover:text-ha-blue transition-colors"
                  title="Docs"
                >
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <p className="text-xs text-ha-textSecondary text-center py-4">No custom cards found</p>
        )}
      </div>
    </div>
  );
}
