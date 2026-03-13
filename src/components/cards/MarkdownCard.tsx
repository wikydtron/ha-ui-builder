import type { CardConfig } from '../../types';

export function MarkdownCard({ card }: { card: CardConfig }) {
  const title = card.config.title as string;
  const content = (card.config.content as string) || '*No content configured*';

  return (
    <div className="card-preview">
      {title && <div className="text-sm font-medium text-ha-text mb-2">{title}</div>}
      <div className="text-sm text-ha-textSecondary whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    </div>
  );
}
