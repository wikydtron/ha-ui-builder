import type { FieldSchema } from '../../types';

interface FieldEditorProps {
  field: FieldSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function FieldEditor({ field, value, onChange }: FieldEditorProps) {
  return (
    <div>
      <label className="label-text">
        {field.label}
        {field.required && <span className="text-ha-error ml-1">*</span>}
      </label>
      {renderFieldInput(field, value, onChange)}
      {field.helpText && (
        <p className="text-[10px] text-ha-textSecondary mt-0.5">{field.helpText}</p>
      )}
    </div>
  );
}

function renderFieldInput(field: FieldSchema, value: unknown, onChange: (v: unknown) => void) {
  switch (field.type) {
    case 'text':
    case 'icon':
    case 'image-url':
    case 'template':
      return (
        <input
          type="text"
          className="input-field"
          value={(value as string) ?? field.default ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            field.type === 'icon'
              ? 'mdi:home'
              : field.type === 'image-url'
              ? 'https://...'
              : field.default
              ? String(field.default)
              : ''
          }
        />
      );

    case 'number':
      return (
        <input
          type="number"
          className="input-field"
          value={(value as number) ?? field.default ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
        />
      );

    case 'boolean':
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-ha-border text-ha-blue focus:ring-ha-blue bg-ha-bg cursor-pointer"
            checked={Boolean(value ?? field.default)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-xs text-ha-text">
            {Boolean(value ?? field.default) ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      );

    case 'select':
      return (
        <select
          className="input-field"
          value={(value as string) ?? field.default ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case 'color':
      return (
        <div className="flex gap-2 items-center">
          <input
            type="color"
            className="w-8 h-8 rounded border border-ha-border cursor-pointer bg-transparent"
            value={(value as string) || '#03a9f4'}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            type="text"
            className="input-field flex-1"
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#03a9f4"
          />
        </div>
      );

    case 'yaml':
      return (
        <textarea
          className="input-field font-mono text-xs min-h-[80px] resize-y"
          value={(value as string) ?? field.default ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="YAML content..."
        />
      );

    case 'action':
      return (
        <select
          className="input-field"
          value={(value as string) ?? 'more-info'}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="call-service">Call Service</option>
          <option value="navigate">Navigate</option>
          <option value="url">URL</option>
          <option value="none">None</option>
        </select>
      );

    case 'list':
      return <ListField value={(value as string[]) ?? []} onChange={onChange} />;

    default:
      return (
        <input
          type="text"
          className="input-field"
          value={typeof value === 'string' ? value : value ? JSON.stringify(value) : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function ListField({ value, onChange }: { value: string[]; onChange: (v: unknown) => void }) {
  const addItem = () => onChange([...value, '']);
  const removeItem = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const updateItem = (i: number, newVal: string) => {
    const updated = [...value];
    updated[i] = newVal;
    onChange(updated);
  };

  return (
    <div>
      <div className="space-y-1">
        {value.map((item, i) => (
          <div key={i} className="flex gap-1">
            <input
              type="text"
              className="input-field flex-1"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
            />
            <button
              onClick={() => removeItem(i)}
              className="px-2 text-ha-textSecondary hover:text-ha-error text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="text-xs text-ha-blue hover:underline mt-1 cursor-pointer">
        + Add item
      </button>
    </div>
  );
}
