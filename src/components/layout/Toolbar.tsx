import { useState } from 'react';
import { Download, Upload, FileCode, Eye, Save, FolderOpen, FileInput, LayoutTemplate } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { useModuleStore } from '../../store/moduleStore';
import { generateDashboardYAML } from '../../yaml/generator';
import { ImportModal } from '../panels/ImportModal';
import { TemplateLibrary } from '../panels/TemplateLibrary';
import type { ProjectFile } from '../../types';

export function Toolbar() {
  const { dashboard } = useDashboardStore();
  const { modules } = useModuleStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleExportYAML = () => {
    const yaml = generateDashboardYAML(dashboard);
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dashboard.title.toLowerCase().replace(/\s+/g, '_')}_lovelace.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportProject = () => {
    const project: ProjectFile = {
      version: '1.0.0',
      dashboard,
      modules,
      exportedAt: Date.now(),
    };
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dashboard.title.toLowerCase().replace(/\s+/g, '_')}_project.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const project: ProjectFile = JSON.parse(text);
        if (project.version && project.dashboard) {
          useDashboardStore.getState().loadDashboard(project.dashboard);
          if (project.modules) {
            useModuleStore.getState().importModules(project.modules);
          }
        }
      } catch {
        alert('Invalid project file');
      }
    };
    input.click();
  };

  const handleCopyYAML = () => {
    const yaml = generateDashboardYAML(dashboard);
    navigator.clipboard.writeText(yaml);
  };

  return (
    <>
      <header className="h-12 bg-ha-toolbar border-b border-ha-border flex items-center px-4 gap-2 shrink-0">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 rounded-lg bg-ha-blue flex items-center justify-center">
            <FileCode size={16} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-ha-text">HA Dashboard Builder</span>
        </div>

        <div className="h-6 w-px bg-ha-border mx-1" />

        <ToolbarButton icon={<FolderOpen size={15} />} label="Import Project" onClick={handleImportProject} />
        <ToolbarButton icon={<Save size={15} />} label="Save Project" onClick={handleExportProject} />

        <div className="h-6 w-px bg-ha-border mx-1" />

        <ToolbarButton icon={<LayoutTemplate size={15} />} label="Templates" onClick={() => setShowTemplates(true)} />
        <ToolbarButton icon={<FileInput size={15} />} label="Import YAML" onClick={() => setShowImportModal(true)} />
        <ToolbarButton icon={<Download size={15} />} label="Export YAML" onClick={handleExportYAML} />
        <ToolbarButton icon={<Upload size={15} />} label="Copy YAML" onClick={handleCopyYAML} />

        <div className="flex-1" />

        <ToolbarButton
          icon={<Eye size={15} />}
          label={showPreview ? 'Edit Mode' : 'Preview'}
          onClick={() => setShowPreview(!showPreview)}
          active={showPreview}
        />
      </header>

      {showImportModal && (
        <ImportModal onClose={() => setShowImportModal(false)} />
      )}
      <TemplateLibrary isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
    </>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
        active
          ? 'bg-ha-blue/20 text-ha-blue'
          : 'text-ha-textSecondary hover:text-ha-text hover:bg-ha-card'
      }`}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
