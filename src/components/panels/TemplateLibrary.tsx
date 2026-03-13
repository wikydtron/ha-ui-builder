import { useState } from 'react';
import { X, LayoutTemplate } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import type { DashboardConfig } from '../../types';

import modernSmartHome from '../../data/templates/modern-smart-home.json';
import energyDashboard from '../../data/templates/energy-dashboard.json';
import mediaJukebox from '../../data/templates/media-jukebox.json';
import securityPanel from '../../data/templates/security-panel.json';
import minimalTablet from '../../data/templates/minimal-tablet.json';
import mushroomModern from '../../data/templates/mushroom-modern.json';
import mobileFirst from '../../data/templates/mobile-first.json';
import desktopPoweruser from '../../data/templates/desktop-poweruser.json';

interface TemplateEntry {
  data: DashboardConfig;
  description: string;
  tags: string[];
}

const templates: TemplateEntry[] = [
  { data: modernSmartHome as unknown as DashboardConfig, description: 'Complete smart home with overview, lights, climate, security & media across 5 views.', tags: ['overview', 'lights', 'climate', 'security'] },
  { data: energyDashboard as unknown as DashboardConfig, description: 'Solar, consumption & appliance monitoring with history graphs across 4 views.', tags: ['energy', 'solar', 'sensors'] },
  { data: mediaJukebox as unknown as DashboardConfig, description: 'Media player controls for all rooms with scene shortcuts across 4 views.', tags: ['media', 'music', 'TV'] },
  { data: securityPanel as unknown as DashboardConfig, description: 'Alarm panel, locks, motion sensors and door access history across 3 views.', tags: ['security', 'alarm', 'locks'] },
  { data: minimalTablet as unknown as DashboardConfig, description: 'Clean minimal layout for tablets and wall panels with room controls across 4 views.', tags: ['tablet', 'minimal', 'wall'] },
  { data: mushroomModern as unknown as DashboardConfig, description: 'Modern Mushroom card look with lights, climate and device controls across 4 views.', tags: ['mushroom', 'HACS', 'modern'] },
  { data: mobileFirst as unknown as DashboardConfig, description: 'Large tap targets optimised for phone screens — lights, climate, security across 4 views.', tags: ['mobile', 'phone', 'minimal'] },
  { data: desktopPoweruser as unknown as DashboardConfig, description: 'Dense information layout for desktop browsers — command center, all devices, energy & system across 5 views.', tags: ['desktop', 'power', 'dense'] },
];

function countCards(dashboard: DashboardConfig): number {
  return dashboard.views.reduce((acc, v) => acc + v.cards.length, 0);
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateLibrary({ isOpen, onClose }: Props) {
  const { loadDashboard } = useDashboardStore();
  const [previewTemplate, setPreviewTemplate] = useState<TemplateEntry | null>(null);

  if (!isOpen) return null;

  const handleLoad = (entry: TemplateEntry) => {
    if (!confirm(`Load "${entry.data.title}"? Your current dashboard will be replaced.`)) return;
    loadDashboard(entry.data);
    onClose();
  };

  return (
    <>
      {/* Main overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-12 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-ha-card rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-ha-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-ha-border shrink-0">
            <div className="flex items-center gap-2">
              <LayoutTemplate size={18} className="text-ha-blue" />
              <h2 className="text-sm font-semibold text-ha-text">Dashboard Templates</h2>
              <span className="text-xs text-ha-textSecondary">— {templates.length} templates available</span>
            </div>
            <button onClick={onClose} className="p-1 rounded text-ha-textSecondary hover:text-ha-text hover:bg-ha-bg transition-colors cursor-pointer">
              <X size={16} />
            </button>
          </div>

          {/* Grid */}
          <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((entry) => (
              <div key={entry.data.id} className="bg-ha-bg border border-ha-border rounded-lg p-4 flex flex-col gap-3">
                <div>
                  <h3 className="text-sm font-medium text-ha-text">{entry.data.title}</h3>
                  <p className="text-xs text-ha-textSecondary mt-1">{entry.description}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] bg-ha-card text-ha-textSecondary px-2 py-0.5 rounded-full">
                    {entry.data.views.length} view{entry.data.views.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-[10px] bg-ha-card text-ha-textSecondary px-2 py-0.5 rounded-full">
                    {countCards(entry.data)} cards
                  </span>
                  {entry.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-ha-blue/10 text-ha-blue px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleLoad(entry)}
                    className="flex-1 py-1.5 rounded text-xs font-medium bg-ha-blue text-white hover:bg-ha-blue/90 transition-colors cursor-pointer"
                  >
                    Load Template
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(entry)}
                    className="px-3 py-1.5 rounded text-xs font-medium bg-ha-card border border-ha-border text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview overlay */}
      {previewTemplate && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setPreviewTemplate(null)}
        >
          <div className="bg-ha-card rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-ha-border shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-ha-border shrink-0">
              <span className="text-sm font-medium text-ha-text">{previewTemplate.data.title} — JSON structure</span>
              <button onClick={() => setPreviewTemplate(null)} className="p-1 rounded text-ha-textSecondary hover:text-ha-text cursor-pointer">
                <X size={15} />
              </button>
            </div>
            <pre className="overflow-auto p-5 text-[11px] text-ha-textSecondary font-mono leading-relaxed">
              {JSON.stringify(previewTemplate.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
