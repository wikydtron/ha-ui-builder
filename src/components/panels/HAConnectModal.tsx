// ============================================================
// HAConnectModal — Connect builder to a live HA instance
// ============================================================

import { useState, useEffect } from 'react';
import { X, Plug, CheckCircle, XCircle, Loader2, RefreshCw, Unplug } from 'lucide-react';
import { useHAStore } from '../../store/haStore';
import { testConnection } from '../../data/haConnection';
import type { HAConnection } from '../../data/haConnection';

interface HAConnectModalProps {
  onClose: () => void;
}

export function HAConnectModal({ onClose }: HAConnectModalProps) {
  const { connection, connected, entities, customCardUrls, loading, error, connect, disconnect, refresh } = useHAStore();

  const [url, setUrl] = useState(connection?.url ?? '');
  const [token, setToken] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'ok' | 'fail'>('idle');
  const [testError, setTestError] = useState('');
  const [connecting, setConnecting] = useState(false);

  // If already connected, show the connection status
  const isConnected = connected && connection;

  useEffect(() => {
    if (connection?.url) setUrl(connection.url);
  }, [connection]);

  const handleTest = async () => {
    if (!url.trim() || !token.trim()) return;
    setTestStatus('testing');
    setTestError('');
    try {
      const ok = await testConnection({ url: url.trim(), token: token.trim() });
      setTestStatus(ok ? 'ok' : 'fail');
      if (!ok) setTestError('HA responded but authentication failed.');
    } catch (err) {
      setTestStatus('fail');
      setTestError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleConnect = async () => {
    if (!url.trim() || !token.trim()) return;
    setConnecting(true);
    const conn: HAConnection = { url: url.trim(), token: token.trim() };
    await connect(conn);
    setConnecting(false);
    if (useHAStore.getState().connected) {
      setToken(''); // clear token from UI after connect
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setUrl('');
    setToken('');
    setTestStatus('idle');
    setTestError('');
  };

  const handleRefresh = async () => {
    await refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-ha-toolbar border border-ha-border rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ha-border">
          <div className="flex items-center gap-2">
            <Plug size={16} className="text-ha-blue" />
            <span className="font-semibold text-sm text-ha-text">Connect to Home Assistant</span>
          </div>
          <button
            onClick={onClose}
            className="text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Privacy note */}
          <div className="flex items-start gap-2 bg-ha-card border border-ha-border rounded-lg p-3">
            <span className="text-xs text-ha-textSecondary leading-relaxed">
              🔒 Your credentials are stored locally in your browser only and are never sent anywhere except your own Home Assistant instance.
            </span>
          </div>

          {/* Connected state */}
          {isConnected && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-400 shrink-0" />
                <span className="text-sm font-medium text-green-400">Connected</span>
              </div>
              <p className="text-xs text-ha-textSecondary truncate">{connection.url}</p>
              <div className="flex gap-3 text-xs text-ha-textSecondary">
                <span>{entities.length} entities</span>
                <span>·</span>
                <span>{customCardUrls.length} custom card resource{customCardUrls.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-ha-card border border-ha-border text-ha-textSecondary hover:text-ha-text transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  Refresh
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  <Unplug size={12} />
                  Disconnect
                </button>
              </div>
            </div>
          )}

          {/* Connection form */}
          {!isConnected && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-ha-textSecondary mb-1">Home Assistant URL</label>
                <input
                  type="url"
                  className="w-full bg-ha-bg border border-ha-border rounded-lg px-3 py-2 text-sm text-ha-text outline-none focus:border-ha-blue/50 transition-colors"
                  placeholder="http://homeassistant.local:8123"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setTestStatus('idle'); }}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-xs text-ha-textSecondary mb-1">
                  Long-Lived Access Token
                  <span className="ml-1 text-[10px] text-ha-blue">
                    (HA → Profile → Security → Long-Lived Access Tokens)
                  </span>
                </label>
                <input
                  type="password"
                  className="w-full bg-ha-bg border border-ha-border rounded-lg px-3 py-2 text-sm text-ha-text outline-none focus:border-ha-blue/50 transition-colors"
                  placeholder="Paste your token here"
                  value={token}
                  onChange={(e) => { setToken(e.target.value); setTestStatus('idle'); }}
                  autoComplete="off"
                />
              </div>

              {/* Test status */}
              {testStatus === 'ok' && (
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircle size={13} />
                  Connection test passed ✅
                </div>
              )}
              {testStatus === 'fail' && (
                <div className="flex items-start gap-2 text-xs text-red-400">
                  <XCircle size={13} className="shrink-0 mt-0.5" />
                  <span>{testError || 'Connection failed'}</span>
                </div>
              )}

              {/* Store error */}
              {error && (
                <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <XCircle size={13} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleTest}
                  disabled={!url.trim() || !token.trim() || testStatus === 'testing'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs bg-ha-card border border-ha-border text-ha-textSecondary hover:text-ha-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {testStatus === 'testing' ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <CheckCircle size={12} />
                  )}
                  Test Connection
                </button>
                <button
                  onClick={handleConnect}
                  disabled={!url.trim() || !token.trim() || connecting || loading}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-ha-blue text-white hover:bg-ha-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {connecting || loading ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Connecting…
                    </>
                  ) : (
                    <>
                      <Plug size={12} />
                      Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Help text */}
          <div className="text-[10px] text-ha-textSecondary space-y-1 pt-1 border-t border-ha-border">
            <p>
              <strong className="text-ha-text">CORS error?</strong> Add your builder URL to HA's allowed origins in Settings → System → Network → Trusted proxies.
            </p>
            <p>
              <strong className="text-ha-text">Token invalid?</strong> Go to HA → Profile → Security → Long-Lived Access Tokens and create a new one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
