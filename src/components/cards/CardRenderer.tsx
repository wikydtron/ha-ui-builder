import type { CardConfig } from '../../types';
import { EntityCard } from './EntityCard';
import { EntitiesCard } from './EntitiesCard';
import { ButtonCard } from './ButtonCard';
import { GaugeCard } from './GaugeCard';
import { GlanceCard } from './GlanceCard';
import { WeatherCard } from './WeatherCard';
import { ThermostatCard } from './ThermostatCard';
import { MediaControlCard } from './MediaControlCard';
import { MarkdownCard } from './MarkdownCard';
import { HistoryGraphCard } from './HistoryGraphCard';
import { AlarmPanelCard } from './AlarmPanelCard';
import { StackCard } from './StackCard';
import { GenericCard } from './GenericCard';
import { RawCardFallback } from './RawCardFallback';
import { getCustomCardDef } from '../../data/customCardRegistry';

interface CardRendererProps {
  card: CardConfig;
  isPreview?: boolean;
}

const cardComponents: Record<string, React.FC<{ card: CardConfig }>> = {
  entity: EntityCard,
  entities: EntitiesCard,
  button: ButtonCard,
  gauge: GaugeCard,
  glance: GlanceCard,
  'weather-forecast': WeatherCard,
  thermostat: ThermostatCard,
  'media-control': MediaControlCard,
  markdown: MarkdownCard,
  'history-graph': HistoryGraphCard,
  'alarm-panel': AlarmPanelCard,
  'vertical-stack': StackCard,
  'horizontal-stack': StackCard,
  grid: StackCard,
};

export function CardRenderer({ card, isPreview }: CardRendererProps) {
  const isKnownBuiltin = card.type in cardComponents;
  const isKnownCustom = card.type.startsWith('custom:') && !!getCustomCardDef(card.type);

  // Registered custom HACS cards → GenericCard preview
  if (!isKnownBuiltin && isKnownCustom) {
    return (
      <div className={isPreview ? 'pointer-events-none' : ''}>
        <GenericCard card={card} />
      </div>
    );
  }

  // Completely unknown type → RawCardFallback
  if (!isKnownBuiltin && !isKnownCustom) {
    return (
      <div className={isPreview ? 'pointer-events-none' : ''}>
        <RawCardFallback card={card} />
      </div>
    );
  }

  const Component = cardComponents[card.type];
  return (
    <div className={isPreview ? 'pointer-events-none' : ''}>
      <Component card={card} />
    </div>
  );
}
