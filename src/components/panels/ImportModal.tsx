import { useState, useRef, useCallback } from 'react';
import { X, Upload, FileCode, AlertCircle, CheckCircle2 } from 'lucide-react';
import { parseLovelaceYAML, type ParseResult } from '../../yaml/parser';
import { useDashboardStore } from '../../store/dashboardStore';

interface ImportModalProps {
  onClose: () => void;
}

export function ImportModal({ onClose }: ImportModalProps) {
  const [yamlText, setYamlText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadDashboard = useDashboardStore((s) => s.loadDashboard);

  const handleParse = useCallback(() => {
    setError(null);
    setParseResult(null);

    const trimmed = yamlText.trim();
    if (!trimmed) {
      setError('Please paste some YAML or upload a file first.');
      return;
    }

    try {
      const result = parseLovelaceYAML(trimmed);
      setParseResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [yamlText]);

  const handleImport = useCallback(() => {
    if (!parseResult) return;
    loadDashboard(parseResult.dashboard);
    onClose();
  }, [parseResult, loadDashboard, onClose]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setYamlText(text);
        setError(null);
        setParseResult(null);
      };
      reader.onerror = () => {
        setError('Failed to read file.');
      };
      reader.readAsText(file);

      // Reset input so the same file can be selected again
      e.target.value = '';
    },
    [],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div className="bg-ha-sidebar border border-ha-border rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ha-border">
          <div className="flex items-center gap-2">
            <FileCode size={18} className="text-ha-blue" />
            <h2 className="text-sm font-semibold text-ha-text">
              Import Lovelace YAML
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-ha-textSecondary hover:text-ha-text hover:bg-ha-card transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Textarea */}
          <div>
            <label className="block text-xs font-medium text-ha-textSecondary mb-1.5">
              Paste your Lovelace YAML below
            </label>
            <textarea
              value={yamlText}
              onChange={(e) => {
                setYamlText(e.target.value);
                setError(null);
                setParseResult(null);
              }}
              placeholder={`title: My Dashboard\nviews:\n  - title: Home\n    cards:\n      - type: entities\n        entities:\n          - light.living_room`}
              className="w-full h-48 bg-ha-bg border border-ha-border rounded-lg px-3 py-2 text-xs font-mono text-ha-text placeholder-ha-textSecondary/40 resize-y focus:outline-none focus:border-ha-blue/50"
              spellCheck={false}
            />
          </div>

          {/* File upload */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-ha-card border border-ha-border text-ha-textSecondary hover:text-ha-text hover:border-ha-blue/30 transition-colors cursor-pointer"
            >
              <Upload size={13} />
              Upload .yaml / .yml file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".yaml,.yml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-[10px] text-ha-textSecondary">
              or paste YAML above
            </span>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle
                size={14}
                className="text-red-400 mt-0.5 shrink-0"
              />
              <p className="text-xs text-red-300 break-words">{error}</p>
            </div>
          )}

          {/* Parse result summary */}
          {parseResult && (
            <div className="p-3 rounded-lg bg-ha-blue/10 border border-ha-blue/20 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-ha-blue" />
                <span className="text-xs font-medium text-ha-text">
                  Parsed successfully
                </span>
              </div>
              <div className="text-xs text-ha-textSecondary space-y-1 ml-5">
                <p>
                  <span className="text-ha-text font-medium">
                    {parseResult.stats.viewCount}
                  </span>{' '}
                  view{parseResult.stats.viewCount !== 1 ? 's' : ''},{' '}
                  <span className="text-ha-text font-medium">
                    {parseResult.stats.cardCount}
                  </span>{' '}
                  card{parseResult.stats.cardCount !== 1 ? 's' : ''}
                </p>
                {parseResult.dashboard.title && (
                  <p>
                    Title:{' '}
                    <span className="text-ha-text">
                      {parseResult.dashboard.title}
                    </span>
                  </p>
                )}
                {parseResult.stats.unknownTypes.length > 0 && (
                  <p className="text-yellow-400">
                    Unknown card types:{' '}
                    {parseResult.stats.unknownTypes.join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-ha-border">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {parseResult ? (
            <button
              onClick={handleImport}
              className="px-4 py-1.5 rounded-md text-xs font-medium bg-ha-blue text-white hover:bg-ha-blue/90 transition-colors cursor-pointer"
            >
              Import Dashboard
            </button>
          ) : (
            <button
              onClick={handleParse}
              disabled={!yamlText.trim()}
              className="px-4 py-1.5 rounded-md text-xs font-medium bg-ha-blue text-white hover:bg-ha-blue/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Parse YAML
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
