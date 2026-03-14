import { useState } from 'react';
import { Plus, X, Pencil, ChevronDown } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import type { ViewType } from '../../types';

const VIEW_TYPES: { label: string; value: ViewType }[] = [
  { label: 'Masonry', value: 'masonry' },
  { label: 'Sections', value: 'sections' },
  { label: 'Panel', value: 'panel' },
];

interface ViewEditorState {
  id: string;
  title: string;
  icon: string;
  viewType: ViewType;
}

export function ViewTabs() {
  const { dashboard, activeViewId, setActiveView, addView, removeView, updateView } = useDashboardStore();
  const [editingView, setEditingView] = useState<ViewEditorState | null>(null);

  const handleStartEdit = (viewId: string) => {
    const view = dashboard.views.find((v) => v.id === viewId);
    if (!view) return;
    setEditingView({
      id: viewId,
      title: view.title,
      icon: view.icon ?? '',
      viewType: view.viewType ?? 'masonry',
    });
  };

  const handleFinishEdit = () => {
    if (editingView && editingView.title.trim()) {
      updateView(editingView.id, {
        title: editingView.title.trim(),
        icon: editingView.icon || undefined,
        viewType: editingView.viewType,
      });
    }
    setEditingView(null);
  };

  return (
    <>
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
            <span>{view.icon || '🏠'}</span>
            <span>{view.title}</span>
            {view.viewType && view.viewType !== 'masonry' && (
              <span className="text-[9px] text-ha-blue opacity-80">({view.viewType})</span>
            )}
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:text-ha-blue"
              onClick={(e) => {
                e.stopPropagation();
                handleStartEdit(view.id);
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

      {/* View editor modal */}
      {editingView && (
        <ViewEditorModal
          state={editingView}
          onChange={setEditingView}
          onSave={handleFinishEdit}
          onCancel={() => setEditingView(null)}
        />
      )}
    </>
  );
}

function ViewEditorModal({
  state,
  onChange,
  onSave,
  onCancel,
}: {
  state: ViewEditorState;
  onChange: (s: ViewEditorState) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-ha-card border border-ha-border rounded-xl p-5 w-80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-ha-text text-sm font-semibold mb-4">Edit View</h3>

        <div className="space-y-3">
          <div>
            <label className="label-text">Title</label>
            <input
              className="input-field"
              value={state.title}
              onChange={(e) => onChange({ ...state, title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && onSave()}
              autoFocus
            />
          </div>

          <div>
            <label className="label-text">Icon (mdi:home, 🏠, etc.)</label>
            <input
              className="input-field"
              value={state.icon}
              onChange={(e) => onChange({ ...state, icon: e.target.value })}
              placeholder="mdi:home"
            />
          </div>

          <div>
            <label className="label-text flex items-center gap-1">
              View Type
              <ChevronDown size={10} className="text-ha-textSecondary" />
            </label>
            <select
              className="input-field"
              value={state.viewType}
              onChange={(e) => onChange({ ...state, viewType: e.target.value as ViewType })}
            >
              {VIEW_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-ha-textSecondary mt-1">
              {state.viewType === 'masonry' && 'Cards flow into columns automatically (default HA layout)'}
              {state.viewType === 'sections' && 'Cards organized into sections with headings'}
              {state.viewType === 'panel' && 'Single card fills the entire view'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="btn-primary flex-1 text-xs" onClick={onSave}>
            Save
          </button>
          <button className="btn-secondary text-xs" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
