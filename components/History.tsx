import React, { useState, useMemo } from 'react';
import { Search, FileText, Calendar, User, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { historyDocuments, translations } from '../data';
import { ViewState } from '../types';

interface HistoryProps {
  onNavigate: (view: ViewState) => void;
  isUrdu: boolean;
}

export const History: React.FC<HistoryProps> = ({ onNavigate, isUrdu }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  const filteredDocs = useMemo(() => {
    return historyDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-900/50"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'Rejected': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-100 dark:border-red-900/50"><XCircle className="w-3 h-3" /> Rejected</span>;
      default: return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50"><Clock className="w-3 h-3" /> Review Pending</span>;
    }
  };

  const getRiskBadge = (score: string) => {
    switch(score) {
      case 'High': return <span className="w-2 h-2 rounded-full bg-red-500"></span>;
      case 'Medium': return <span className="w-2 h-2 rounded-full bg-amber-500"></span>;
      default: return <span className="w-2 h-2 rounded-full bg-green-500"></span>;
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className={`text-3xl font-bold text-navy-900 dark:text-white ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Case History')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Archive of all analyzed documents and client matters.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-navy-800 flex justify-between items-center bg-slate-50 dark:bg-navy-800/50">
           <div className="relative w-96">
             <input 
               type="text" 
               placeholder="Search by client, file name, or risk tag..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 dark:text-white placeholder-slate-400"
             />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
           </div>
           
           <div className="flex gap-2">
             <button className="px-3 py-2 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-700">Filter</button>
             <button className="px-3 py-2 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-700">Export CSV</button>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Date Analyzed</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {filteredDocs.map((doc) => (
                <tr 
                  key={doc.id} 
                  onClick={() => onNavigate('contract-analysis')}
                  className="hover:bg-slate-50 dark:hover:bg-navy-800/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-navy-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {doc.client}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {doc.dateAnalyzed}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRiskBadge(doc.riskScore)}
                      <span>{doc.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-navy-900 dark:hover:text-white font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Search className="w-8 h-8 mb-3 opacity-20" />
              <p>No documents found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
