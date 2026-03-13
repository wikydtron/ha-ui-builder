import { useUIStore } from '../../store/uiStore';
import { ConfigPanel } from './ConfigPanel';
import { YAMLPanel } from './YAMLPanel';
import { Settings, Code, PanelRightClose, PanelRight } from 'lucide-react';

export function RightPanel() {
  const { rightPanelTab, setRightPanelTab, rightPanelOpen, toggleRightPanel } = useUIStore();

  if (!rightPanelOpen) {
    return (
      <div className="w-10 bg-ha-sidebar border-l border-ha-border flex flex-col items-center py-2 shrink-0">
        <button
          onClick={toggleRightPanel}
          className="p-2 rounded-md text-ha-textSecondary hover:text-ha-text hover:bg-ha-card transition-colors cursor-pointer"
        >
          <PanelRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-ha-sidebar border-l border-ha-border flex flex-col shrink-0">
      {/* Tabs */}
      <div className="flex items-center border-b border-ha-border">
        <TabButton
          active={rightPanelTab === 'config'}
          onClick={() => setRightPanelTab('config')}
          icon={<Settings size={14} />}
          label="Config"
        />
        <TabButton
          active={rightPanelTab === 'yaml'}
          onClick={() => setRightPanelTab('yaml')}
          icon={<Code size={14} />}
          label="YAML"
        />
        <div className="flex-1" />
        <button
          onClick={toggleRightPanel}
          className="px-2 py-2 text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
        >
          <PanelRightClose size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {rightPanelTab === 'config' ? <ConfigPanel /> : <YAMLPanel />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
        active
          ? 'text-ha-blue border-b-2 border-ha-blue'
          : 'text-ha-textSecondary hover:text-ha-text'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
