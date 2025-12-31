import React from 'react';
import { Clock, CheckCircle, AlertTriangle, FileText, ArrowUpRight, ArrowRight } from 'lucide-react';
import { recentDocuments, translations } from '../data';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
  isUrdu: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isUrdu }) => {
  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-3xl font-bold text-navy-900 dark:text-white ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Welcome back, Ahmed')}</h1>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>Here's what's happening with your cases today.</p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Last login: Today, 9:14 AM
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('Docs Analyzed')} 
          value="47/200" 
          subtext="+12% from last month" 
          icon={<FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />} 
          isUrdu={isUrdu}
        />
        <StatCard 
          title={t('Time Saved')} 
          value="23.5 hrs" 
          subtext="~30 mins per doc" 
          icon={<Clock className="w-5 h-5 text-green-600 dark:text-green-400" />} 
          isUrdu={isUrdu}
        />
        <StatCard 
          title={t('Compliance Issues')} 
          value={`12 ${t('Issues Found')}`} 
          subtext="Across 4 documents" 
          icon={<AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />} 
          isUrdu={isUrdu}
        />
        <StatCard 
          title={t('Templates Used')} 
          value="8" 
          subtext="Most used: NDA" 
          icon={<CheckCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />} 
          isUrdu={isUrdu}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-navy-800 flex justify-between items-center">
            <h2 className={`text-lg font-semibold text-navy-900 dark:text-white ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Recent Documents')}</h2>
            <button className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {recentDocuments.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => onNavigate('contract-analysis')}
                className="p-4 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-700 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{doc.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                    ${doc.riskScore === 'High' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50' : 
                      doc.riskScore === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50' : 
                      'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/50'}`}>
                    {doc.riskScore} Risk
                  </span>
                  <button className="text-slate-400 dark:text-slate-500 hover:text-navy-900 dark:hover:text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Getting Started */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 dark:from-blue-700 dark:to-blue-900 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className={`text-xl font-bold mb-2 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Start New Analysis')}</h2>
            <p className="text-navy-100 dark:text-blue-100 text-sm mb-6">Upload a contract or judgment to get instant AI-powered insights tailored for Pakistani law.</p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('contract-analysis')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg flex items-center justify-between group transition-all"
            >
              <span className={`font-medium ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Contract Analysis')}</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </button>
            <button 
              onClick={() => onNavigate('case-briefing')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg flex items-center justify-between group transition-all"
            >
              <span className={`font-medium ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Case Briefing')}</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtext, icon, isUrdu }: { title: string; value: string; subtext: string; icon: React.ReactNode, isUrdu: boolean }) => (
  <div className="bg-white dark:bg-navy-900 p-6 rounded-xl border border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 dark:bg-navy-800 rounded-lg">{icon}</div>
    </div>
    <div className="text-2xl font-bold text-navy-900 dark:text-white mb-1">{value}</div>
    <div className={`text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{title}</div>
    <div className="text-xs text-slate-400 dark:text-slate-500">{subtext}</div>
  </div>
);
