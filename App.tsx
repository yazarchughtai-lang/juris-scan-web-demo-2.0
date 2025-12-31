import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SkillTiles } from './components/SkillTiles';
import { ContractAnalysis } from './components/ContractAnalysis';
import { Analytics } from './components/Analytics';
import { Templates } from './components/Templates';
import { History } from './components/History';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  // Correctly toggle the class on the HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isUrdu) {
      document.body.classList.add('urdu-active');
    } else {
      document.body.classList.remove('urdu-active');
    }
  }, [isUrdu]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLang = () => setIsUrdu(!isUrdu);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} isUrdu={isUrdu} />;
      case 'tools':
        return <SkillTiles onNavigate={setCurrentView} isUrdu={isUrdu} />;
      case 'contract-analysis':
        return <ContractAnalysis isDarkMode={isDarkMode} isUrdu={isUrdu} />;
      case 'case-briefing':
        return <SkillTiles onNavigate={setCurrentView} isUrdu={isUrdu} />; // Fallback for demo
      case 'analytics':
        return <Analytics isUrdu={isUrdu} />;
      case 'templates':
        return <Templates isUrdu={isUrdu} />;
      case 'history':
        return <History onNavigate={setCurrentView} isUrdu={isUrdu} />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
            Settings Demo Placeholder
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentView} isUrdu={isUrdu} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-navy-950 transition-colors duration-200">
      <Layout 
        activeView={currentView} 
        onNavigate={setCurrentView} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isUrdu={isUrdu}
        toggleLang={toggleLang}
      >
        <div className="p-8 h-full">
          {renderContent()}
        </div>
      </Layout>
    </div>
  );
}

export default App;
