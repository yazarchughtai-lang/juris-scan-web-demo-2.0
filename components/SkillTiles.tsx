import React, { useState } from 'react';
import { FileSearch, Gavel, ShieldCheck, Library, Search, PenTool, Upload, X } from 'lucide-react';
import { ViewState } from '../types';
import { translations } from '../data';

interface SkillTilesProps {
  onNavigate: (view: ViewState) => void;
  isUrdu: boolean;
}

export const SkillTiles: React.FC<SkillTilesProps> = ({ onNavigate, isUrdu }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTool, setActiveTool] = useState<{title: string, action: string, type: ViewState} | null>(null);

  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  const tools = [
    {
      id: 'contract-analysis',
      title: 'Contract Analysis',
      subtitle: 'Scan for risks, compliance issues, and problematic clauses',
      icon: <FileSearch className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      action: 'Upload Contract',
      target: 'contract-analysis' as ViewState
    },
    {
      id: 'case-briefing',
      title: 'Case Briefing',
      subtitle: 'Auto-generate structured case briefs from judgments',
      icon: <Gavel className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      action: 'Upload Judgment',
      target: 'case-briefing' as ViewState
    },
    {
      id: 'compliance',
      title: 'Compliance Checker',
      subtitle: 'Cross-Refrence Clauses and Compliance Check',
      icon: <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />,
      action: 'Start Check',
      target: 'contract-analysis' as ViewState // Reuse flow for demo
    },
    {
      id: 'templates',
      title: 'Legal Templates',
      subtitle: 'Browse pre-built contract templates and clauses',
      icon: <Library className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      action: 'Browse Templates',
      target: 'templates' as ViewState
    },
    {
      id: 'precedents',
      title: 'Find Precedents',
      subtitle: 'Search Pakistani Supreme Court & High Court judgments',
      icon: <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      action: 'Search Now',
      target: 'dashboard' as ViewState // Placeholder
    },
    {
      id: 'drafting',
      title: 'Smart Drafting',
      subtitle: 'Generate contract clauses with AI assistance',
      icon: <PenTool className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      action: 'Start Draft',
      target: 'dashboard' as ViewState // Placeholder
    }
  ];

  const handleTileClick = (tool: any) => {
    if (tool.id === 'templates') {
      onNavigate('templates');
      return;
    }
    setActiveTool({ title: tool.title, action: tool.action, type: tool.target });
    setShowModal(true);
  };

  return (
    <div className="animate-fade-in relative">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold text-navy-900 dark:text-white ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Legal Tools')}</h1>
        <p className={`text-slate-500 dark:text-slate-400 mt-2 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Select a tool to begin your workflow.')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className="group bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-start"
            onClick={() => handleTileClick(tool)}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-navy-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {tool.icon}
            </div>
            <h3 className={`text-xl font-bold text-navy-900 dark:text-white mb-2 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t(tool.title)}</h3>
            <p className={`text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed ${isUrdu ? 'font-urdu text-base' : 'font-sans'}`}>{t(tool.subtitle)}</p>
            <button className={`text-sm font-semibold text-white bg-navy-900 dark:bg-blue-600 px-6 py-2.5 rounded-lg w-full group-hover:bg-blue-800 dark:group-hover:bg-blue-700 transition-colors shadow-sm ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
              {t(tool.action)}
            </button>
          </div>
        ))}
      </div>

      {/* Reusable File Upload Modal */}
      {showModal && activeTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 overflow-hidden">
             <div className="p-4 border-b border-slate-100 dark:border-navy-800 flex justify-between items-center">
                <h3 className={`text-lg font-bold text-navy-900 dark:text-white ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t(activeTool.action)}</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-navy-900 dark:hover:text-white">
                   <X className="w-5 h-5" />
                </button>
             </div>
             
             <div className="p-8">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-navy-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors group">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-navy-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                         <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">PDF, DOCX (MAX. 25MB)</p>
                   </div>
                   <input type="file" className="hidden" onChange={() => onNavigate(activeTool.type)} />
                </label>
                
                <div className="mt-6 flex justify-end gap-3">
                   <button 
                     onClick={() => setShowModal(false)}
                     className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
                   >
                     Cancel
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
