import { useUIStore } from '../../store/uiStore';
import { CardPicker } from './CardPicker';
import { EntityBrowser } from './EntityBrowser';
import { ModuleLibrary } from './ModuleLibrary';
import { CustomCardRegistryPanel } from './CustomCardRegistryPanel';
import { LayoutGrid, Database, BookMarked, Puzzle, PanelLeftClose, PanelLeft } from 'lucide-react';
import type { SidebarTab } from '../../types';

const tabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
  { id: 'cards', label: 'Cards', icon: <LayoutGrid size={16} /> },
  { id: 'entities', label: 'Entities', icon: <Database size={16} /> },
  { id: 'modules', label: 'Modules', icon: <BookMarked size={16} /> },
  { id: 'hacs', label: 'HACS', icon: <Puzzle size={16} /> },
];

export function Sidebar() {
  const { sidebarTab, setSidebarTab, sidebarOpen, toggleSidebar } = useUIStore();

  if (!sidebarOpen) {
    return (
      <div className="w-10 bg-ha-sidebar border-r border-ha-border flex flex-col items-center py-2 shrink-0">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-ha-textSecondary hover:text-ha-text hover:bg-ha-card transition-colors cursor-pointer"
        >
          <PanelLeft size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-72 bg-ha-sidebar border-r border-ha-border flex flex-col shrink-0">
      {/* Tab bar */}
      <div className="flex items-center border-b border-ha-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSidebarTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
              sidebarTab === tab.id
                ? 'text-ha-blue border-b-2 border-ha-blue'
                : 'text-ha-textSecondary hover:text-ha-text'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        <button
          onClick={toggleSidebar}
          className="px-2 py-2 text-ha-textSecondary hover:text-ha-text transition-colors cursor-pointer"
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {sidebarTab === 'cards' && <CardPicker />}
        {sidebarTab === 'entities' && <EntityBrowser />}
        {sidebarTab === 'modules' && <ModuleLibrary />}
        {sidebarTab === 'hacs' && <CustomCardRegistryPanel />}
      </div>
    </div>
  );
}
