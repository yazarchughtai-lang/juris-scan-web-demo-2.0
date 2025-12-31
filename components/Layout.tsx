import React from 'react';
import { LayoutGrid, FileText, Zap, BarChart2, BookOpen, Settings, Bell, Search, User, Moon, Sun, Globe } from 'lucide-react';
import { ViewState } from '../types';
import { translations } from '../data';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isUrdu: boolean;
  toggleLang: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onNavigate, 
  isDarkMode, 
  toggleTheme,
  isUrdu,
  toggleLang
}) => {
  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-navy-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-navy-800 flex-shrink-0 flex flex-col z-20 transition-colors duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-navy-800 h-20 flex items-center">
          {/* Logo Integration */}
          <div className="flex items-center gap-3">
             <img 
               src="/logo.png" 
               alt="JurisScan" 
               className="h-8 w-auto object-contain"
               onError={(e) => {
                 // Fallback if logo file is missing
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }}
             />
             <div className="hidden flex items-center gap-3">
               <div className="w-8 h-8 bg-navy-900 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                 <span className="text-white font-bold text-lg font-serif">J</span>
               </div>
               <span className="font-bold text-xl text-navy-900 dark:text-white tracking-tight">JurisScan</span>
             </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutGrid className="w-5 h-5" />} 
            label={t('Dashboard')} 
            isActive={activeView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
            isUrdu={isUrdu}
          />
          <NavItem 
            icon={<FileText className="w-5 h-5" />} 
            label={t('Recent Documents')} 
            isActive={activeView === 'history'} 
            onClick={() => onNavigate('history')} 
            isUrdu={isUrdu}
          />
          <NavItem 
            icon={<Zap className="w-5 h-5" />} 
            label={t('AI Tools')} 
            isActive={activeView === 'tools' || activeView === 'contract-analysis' || activeView === 'case-briefing'} 
            onClick={() => onNavigate('tools')} 
            isUrdu={isUrdu}
          />
          <NavItem 
            icon={<BarChart2 className="w-5 h-5" />} 
            label={t('Analytics')} 
            isActive={activeView === 'analytics'} 
            onClick={() => onNavigate('analytics')} 
            isUrdu={isUrdu}
          />
          <NavItem 
            icon={<BookOpen className="w-5 h-5" />} 
            label={t('Template Library')} 
            isActive={activeView === 'templates'} 
            onClick={() => onNavigate('templates')} 
            isUrdu={isUrdu}
          />
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-navy-800">
          <NavItem 
            icon={<Settings className="w-5 h-5" />} 
            label={t('Settings')} 
            isActive={activeView === 'settings'} 
            onClick={() => onNavigate('settings')} 
            isUrdu={isUrdu}
          />
          <div className="mt-6 flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="text-sm font-medium text-navy-900 dark:text-white truncate">Ahmed Khan</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Senior Associate</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F9FAFB] dark:bg-navy-950">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between px-8 flex-shrink-0 z-10 transition-colors duration-200">
           {/* Search */}
           <div className="w-96 relative">
              <input 
                type="text" 
                placeholder={isUrdu ? "کیسز، دستاویزات، یا قوانین تلاش کریں..." : "Search cases, documents, or laws..."} 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all font-sans dark:text-white"
                dir={isUrdu ? 'rtl' : 'ltr'}
              />
              <Search className={`w-4 h-4 text-slate-400 absolute top-2.5 ${isUrdu ? 'right-3' : 'left-3'}`} />
           </div>

           {/* Actions */}
           <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-800 rounded-full transition-colors"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={toggleLang}
                className={`flex items-center gap-2 text-sm font-medium text-navy-900 dark:text-slate-200 border border-slate-200 dark:border-navy-700 px-3 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors ${isUrdu ? 'font-urdu' : 'font-sans'}`}
              >
                 <Globe className="w-4 h-4" />
                 {isUrdu ? 'English' : 'اردو'}
              </button>
              
              <div className="h-8 w-px bg-slate-200 dark:bg-navy-700 mx-1"></div>
              
              <button className="text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-navy-900"></span>
              </button>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-0 dark:bg-navy-950 transition-colors duration-200 relative">
          <div className="h-full w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick, isUrdu }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, isUrdu: boolean }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive 
      ? 'bg-navy-900 dark:bg-blue-600 text-white shadow-md shadow-navy-900/10' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-800 hover:text-navy-900 dark:hover:text-white'
    } ${isUrdu ? 'font-urdu text-base' : 'font-sans'}`}
    dir={isUrdu ? 'rtl' : 'ltr'}
  >
    <span className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}>{icon}</span>
    {label}
  </button>
);
