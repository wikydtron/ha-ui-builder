import { useMemo, useState, lazy, Suspense } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { generateDashboardYAML, generateViewYAML, generateCardYAML } from '../../yaml/generator';
import { validateDashboard } from '../../yaml/validator';
import { Copy, Check, FileCode, AlertTriangle, Info, XCircle, ShieldCheck } from 'lucide-react';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

type PanelTab = 'card' | 'view' | 'full' | 'validate';

export function YAMLPanel() {
  const { dashboard, activeViewId, selectedCardId } = useDashboardStore();
  const [tab, setTab] = useState<PanelTab>('card');
  const [copied, setCopied] = useState(false);

  const activeView = dashboard.views.find((v) => v.id === activeViewId);
  const selectedCard = activeView?.cards.find((c) => c.id === selectedCardId);

  const yaml = useMemo(() => {
    try {
      if (tab === 'card' && selectedCard) return generateCardYAML(selectedCard);
      if (tab === 'view' && activeView) return generateViewYAML(activeView);
      if (tab === 'full') return generateDashboardYAML(dashboard);
      return '';
    } catch {
      return '# Error generating YAML';
    }
  }, [dashboard, activeView, selectedCard, tab]);

  const validation = useMemo(() => {
    if (tab !== 'validate') return null;
    return validateDashboard(dashboard);
  }, [dashboard, tab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: PanelTab; label: string }[] = [
    { id: 'card', label: 'Card' },
    { id: 'view', label: 'View' },
    { id: 'full', label: 'Dashboard' },
    { id: 'validate', label: 'Validate' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex items-center border-b border-ha-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-[10px] font-medium transition-colors cursor-pointer border-b-2 ${
              tab === t.id
                ? 'text-ha-blue border-ha-blue'
                : 'text-ha-textSecondary border-transparent hover:text-ha-text'
            }`}
          >
            {t.label}
          </button>
        ))}
        {tab !== 'validate' && (
          <>
            <div className="flex-1" />
            <button
              onClick={handleCopy}
              disabled={!yaml}
              className="flex items-center gap-1 px-2 py-1 mr-1 rounded text-[10px] text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer disabled:opacity-30"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {/* Validate tab */}
        {tab === 'validate' && validation && (
          <div className="p-3 space-y-3">
            {/* Summary */}
            <div className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium ${
              validation.valid ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {validation.valid
                ? <><ShieldCheck size={14} /> Dashboard looks good — ready to export</>
                : <><XCircle size={14} /> {validation.errors.length} error{validation.errors.length !== 1 ? 's' : ''} found</>
              }
            </div>

            {/* Errors */}
            {validation.errors.map((issue, i) => (
              <div key={i} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-red-400 font-medium mb-1">
                  <XCircle size={12} /> {issue.message}
                </div>
                <p className="text-ha-textSecondary">{issue.plainEnglish}</p>
                {issue.suggestion && <p className="text-ha-textSecondary mt-1 italic">💡 {issue.suggestion}</p>}
              </div>
            ))}

            {/* Warnings */}
            {validation.warnings.map((issue, i) => (
              <div key={i} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-yellow-400 font-medium mb-1">
                  <AlertTriangle size={12} /> {issue.message}
                </div>
                <p className="text-ha-textSecondary">{issue.plainEnglish}</p>
                {issue.suggestion && <p className="text-ha-textSecondary mt-1 italic">💡 {issue.suggestion}</p>}
              </div>
            ))}

            {/* Info */}
            {validation.info.map((issue, i) => (
              <div key={i} className="p-3 rounded-lg bg-ha-blue/10 border border-ha-blue/20 text-xs">
                <div className="flex items-center gap-1.5 text-ha-blue font-medium mb-1">
                  <Info size={12} /> {issue.message}
                </div>
                <p className="text-ha-textSecondary">{issue.plainEnglish}</p>
              </div>
            ))}

            {validation.valid && validation.warnings.length === 0 && (
              <p className="text-xs text-ha-textSecondary text-center py-4">No issues detected. Export away!</p>
            )}
          </div>
        )}

        {/* YAML tabs */}
        {tab !== 'validate' && (
          tab === 'card' && !selectedCard ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <FileCode size={32} className="text-ha-border mb-3" />
              <p className="text-ha-textSecondary text-sm">Select a card to see its YAML</p>
            </div>
          ) : (
            <Suspense fallback={
              <pre className="p-3 text-xs text-ha-textSecondary font-mono whitespace-pre-wrap overflow-auto h-full">{yaml}</pre>
            }>
              <MonacoEditor
                height="100%"
                language="yaml"
                value={yaml}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  renderWhitespace: 'none',
                  padding: { top: 8 },
                }}
              />
            </Suspense>
          )
        )}
      </div>
    </div>
  );
}
