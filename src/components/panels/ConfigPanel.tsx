import { useDashboardStore } from '../../store/dashboardStore';
import { cardSchemas } from '../../schemas';
import { FieldEditor } from './FieldEditor';
import { EntityPickerField } from './EntityPickerField';
import type { FieldSchema, CardConfig } from '../../types';
import { Settings } from 'lucide-react';

export function ConfigPanel() {
  const { dashboard, activeViewId, selectedCardId, updateCard } = useDashboardStore();
  const activeView = dashboard.views.find((v) => v.id === activeViewId);
  const selectedCard = activeView?.cards.find((c) => c.id === selectedCardId);

  if (!selectedCard) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Settings size={32} className="text-ha-border mb-3" />
        <p className="text-ha-textSecondary text-sm">Select a card to edit its configuration</p>
      </div>
    );
  }

  const schema = cardSchemas.get(selectedCard.type);
  const fields = schema?.fields || [];

  const handleFieldChange = (fieldName: string, value: unknown) => {
    updateCard(activeViewId, selectedCard.id, {
      ...selectedCard.config,
      [fieldName]: value,
    });
  };

  return (
    <div className="p-3">
      {/* Card type header */}
      <div className="mb-4 pb-3 border-b border-ha-border">
        <div className="text-sm font-medium text-ha-text">{schema?.label || selectedCard.type}</div>
        <div className="text-xs text-ha-textSecondary mt-0.5">{selectedCard.type}</div>
      </div>

      {/* Card type selector */}
      <div className="mb-3">
        <label className="label-text">Card Type</label>
        <select
          className="input-field"
          value={selectedCard.type}
          onChange={(e) => {
            const newType = e.target.value;
            const newSchema = cardSchemas.get(newType);
            const defaults: Record<string, unknown> = {};
            if (newSchema) {
              for (const field of newSchema.fields) {
                if (field.default !== undefined) defaults[field.name] = field.default;
              }
            }
            // Preserve entity if it exists
            if (selectedCard.config.entity) {
              defaults.entity = selectedCard.config.entity;
            }
            const updatedCard: CardConfig = {
              ...selectedCard,
              type: newType,
              config: defaults,
            };
            if (['vertical-stack', 'horizontal-stack', 'grid'].includes(newType)) {
              updatedCard.children = selectedCard.children || [];
            }
            // We need to remove and re-add to change the type
            const store = useDashboardStore.getState();
            store.removeCard(activeViewId, selectedCard.id);
            store.addCard(activeViewId, updatedCard);
            store.selectCard(updatedCard.id);
          }}
        >
          {Array.from(cardSchemas.entries()).map(([type, s]) => (
            <option key={type} value={type}>
              {s.label} ({type})
            </option>
          ))}
        </select>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {fields.map((field) => (
          <FieldEditorWrapper
            key={field.name}
            field={field}
            value={selectedCard.config[field.name]}
            onChange={(value) => handleFieldChange(field.name, value)}
          />
        ))}
      </div>

      {/* Raw config (for advanced users) */}
      <details className="mt-4">
        <summary className="text-xs text-ha-textSecondary cursor-pointer hover:text-ha-text">
          Raw Config JSON
        </summary>
        <pre className="text-[10px] text-ha-textSecondary bg-ha-bg rounded-lg p-2 mt-2 overflow-x-auto">
          {JSON.stringify(selectedCard.config, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function FieldEditorWrapper({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === 'entity') {
    return (
      <div>
        <label className="label-text">
          {field.label}
          {field.required && <span className="text-ha-error ml-1">*</span>}
        </label>
        <EntityPickerField value={(value as string) || ''} onChange={onChange} />
        {field.helpText && (
          <p className="text-[10px] text-ha-textSecondary mt-0.5">{field.helpText}</p>
        )}
      </div>
    );
  }

  if (field.type === 'entities-list') {
    return (
      <EntitiesListField field={field} value={(value as string[]) || []} onChange={onChange} />
    );
  }

  return <FieldEditor field={field} value={value} onChange={onChange} />;
}

function EntitiesListField({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string[];
  onChange: (value: unknown) => void;
}) {
  const addEntity = () => onChange([...value, '']);
  const removeEntity = (index: number) => onChange(value.filter((_, i) => i !== index));
  const updateEntity = (index: number, newVal: string) => {
    const updated = [...value];
    updated[index] = newVal;
    onChange(updated);
  };

  return (
    <div>
      <label className="label-text">
        {field.label}
        {field.required && <span className="text-ha-error ml-1">*</span>}
      </label>
      <div className="space-y-1.5">
        {value.map((entityId, i) => (
          <div key={i} className="flex gap-1">
            <EntityPickerField value={entityId} onChange={(v) => updateEntity(i, v as string)} />
            <button
              onClick={() => removeEntity(i)}
              className="px-2 text-ha-textSecondary hover:text-ha-error text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button onClick={addEntity} className="text-xs text-ha-blue hover:underline mt-1 cursor-pointer">
        + Add entity
      </button>
    </div>
  );
}
