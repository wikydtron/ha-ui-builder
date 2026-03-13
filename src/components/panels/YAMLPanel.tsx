import { useMemo, useState, lazy, Suspense } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { generateDashboardYAML, generateViewYAML, generateCardYAML } from '../../yaml/generator';
import { Copy, Check, FileCode } from 'lucide-react';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

export function YAMLPanel() {
  const { dashboard, activeViewId, selectedCardId } = useDashboardStore();
  const [viewMode, setViewMode] = useState<'card' | 'view' | 'full'>('card');
  const [copied, setCopied] = useState(false);

  const activeView = dashboard.views.find((v) => v.id === activeViewId);
  const selectedCard = activeView?.cards.find((c) => c.id === selectedCardId);

  const yaml = useMemo(() => {
    try {
      if (viewMode === 'card' && selectedCard) {
        return generateCardYAML(selectedCard);
      }
      if (viewMode === 'view' && activeView) {
        return generateViewYAML(activeView);
      }
      return generateDashboardYAML(dashboard);
    } catch {
      return '# Error generating YAML';
    }
  }, [dashboard, activeView, selectedCard, viewMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mode selector */}
      <div className="flex items-center gap-1 p-2 border-b border-ha-border">
        {(['card', 'view', 'full'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
              viewMode === mode
                ? 'bg-ha-blue/20 text-ha-blue'
                : 'text-ha-textSecondary hover:text-ha-text'
            }`}
          >
            {mode === 'card' ? 'Selected Card' : mode === 'view' ? 'Current View' : 'Full Dashboard'}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
        >
          {copied ? <Check size={12} className="text-ha-success" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        {viewMode === 'card' && !selectedCard ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <FileCode size={32} className="text-ha-border mb-3" />
            <p className="text-ha-textSecondary text-sm">Select a card to see its YAML</p>
          </div>
        ) : (
          <Suspense
            fallback={
              <pre className="p-3 text-xs text-ha-textSecondary font-mono whitespace-pre-wrap overflow-auto h-full">
                {yaml}
              </pre>
            }
          >
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
        )}
      </div>
    </div>
  );
}
