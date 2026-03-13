import { useState } from 'react';
import { Plus, X, Pencil } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export function ViewTabs() {
  const { dashboard, activeViewId, setActiveView, addView, removeView, updateView } = useDashboardStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (viewId: string, title: string) => {
    setEditingId(viewId);
    setEditTitle(title);
  };

  const handleFinishEdit = () => {
    if (editingId && editTitle.trim()) {
      updateView(editingId, { title: editTitle.trim() });
    }
    setEditingId(null);
  };

  return (
    <div className="h-9 bg-ha-sidebar border-b border-ha-border flex items-center px-2 gap-1 shrink-0 overflow-x-auto">
      {dashboard.views.map((view) => (
        <div
          key={view.id}
          className={`group flex items-center gap-1 px-3 py-1 rounded-md text-xs cursor-pointer transition-colors shrink-0 ${
            view.id === activeViewId
              ? 'bg-ha-card text-ha-text border border-ha-border'
              : 'text-ha-textSecondary hover:text-ha-text hover:bg-ha-card/50'
          }`}
          onClick={() => setActiveView(view.id)}
        >
          {editingId === view.id ? (
            <input
              className="bg-transparent border-none outline-none text-xs text-ha-text w-20"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleFinishEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleFinishEdit()}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <span>{view.icon || '🏠'}</span>
              <span>{view.title}</span>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:text-ha-blue"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartEdit(view.id, view.title);
                }}
              >
                <Pencil size={10} />
              </button>
              {dashboard.views.length > 1 && (
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-ha-error"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeView(view.id);
                  }}
                >
                  <X size={10} />
                </button>
              )}
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => addView({ title: `View ${dashboard.views.length + 1}` })}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-ha-textSecondary hover:text-ha-text hover:bg-ha-card/50 transition-colors cursor-pointer shrink-0"
      >
        <Plus size={12} />
        <span>Add View</span>
      </button>
    </div>
  );
}
