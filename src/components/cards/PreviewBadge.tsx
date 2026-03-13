export type CardSupportLevel = 'full' | 'partial' | 'preview-only' | 'unknown';

export function PreviewBadge({ level }: { level: CardSupportLevel }) {
  if (level === 'full') return null;

  if (level === 'partial')
    return (
      <span className="text-[9px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">
        Partial
      </span>
    );

  if (level === 'preview-only')
    return (
      <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">
        Preview Only
      </span>
    );

  return (
    <span className="text-[9px] bg-ha-textSecondary/20 text-ha-textSecondary px-1.5 py-0.5 rounded">
      Unknown
    </span>
  );
}
