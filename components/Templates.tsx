import React, { useState, useMemo } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { templates, translations } from '../data';

interface TemplatesProps {
  isUrdu: boolean;
}

export const Templates: React.FC<TemplatesProps> = ({ isUrdu }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPractice, setSelectedPractice] = useState<string[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string[]>([]);

  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    value: string, 
    current: string[]
  ) => {
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPractice = selectedPractice.length === 0 || selectedPractice.includes(template.category);
      const matchesJurisdiction = selectedJurisdiction.length === 0 || selectedJurisdiction.includes(template.jurisdiction) || template.jurisdiction === 'All Pakistan';
      return matchesSearch && matchesPractice && matchesJurisdiction;
    });
  }, [searchTerm, selectedPractice, selectedJurisdiction]);

  return (
    <div className="animate-fade-in h-full flex flex-col">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">{t('Template Library')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Professional legal templates compliant with Pakistani law.</p>
        </div>
      </div>

      <div className="flex gap-6 h-full">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0 space-y-8">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Search templates..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400"
             />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
           </div>

           <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Practice Area</h3>
              <div className="space-y-2">
                 {['Corporate', 'Litigation', 'Real Estate', 'Commercial', 'HR', 'IP', 'General'].map(item => (
                   <label key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedPractice.includes(item)}
                        onChange={() => handleCheckboxChange(setSelectedPractice, item, selectedPractice)}
                        className="rounded border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-blue-600 focus:ring-blue-500" 
                      />
                      {item}
                   </label>
                 ))}
              </div>
           </div>

           <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Jurisdiction</h3>
              <div className="space-y-2">
                 {['Federal', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'All Pakistan'].map(item => (
                   <label key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedJurisdiction.includes(item)}
                        onChange={() => handleCheckboxChange(setSelectedJurisdiction, item, selectedJurisdiction)}
                        className="rounded border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-blue-600 focus:ring-blue-500" 
                      />
                      {item}
                   </label>
                 ))}
              </div>
           </div>
        </div>

        {/* Grid */}
        <div className="flex-grow">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                 <div key={template.id} className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-10 h-10 bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                       </div>
                       <span className="text-xs font-medium bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{template.type}</span>
                    </div>
                    <h3 className="font-bold text-navy-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3rem]">{template.name}</h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                       <span>{template.jurisdiction}</span>
                       <span>•</span>
                       <span>{template.usageCount} uses</span>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex gap-2">
                       <button className="flex-1 py-2 text-sm font-medium text-navy-900 dark:text-slate-200 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-800">Preview</button>
                       <button className="flex-1 py-2 text-sm font-medium text-white bg-navy-900 dark:bg-blue-600 rounded-lg hover:bg-navy-800 dark:hover:bg-blue-700 shadow-sm">Use</button>
                    </div>
                 </div>
              ))}
              {filteredTemplates.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
                  <Search className="w-10 h-10 mb-4 opacity-20" />
                  <p>No templates found matching your criteria.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
