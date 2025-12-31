import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { translations } from '../data';

interface AnalyticsProps {
  isUrdu: boolean;
}

const documentData = [
  { name: 'Mon', docs: 4 },
  { name: 'Tue', docs: 7 },
  { name: 'Wed', docs: 5 },
  { name: 'Thu', docs: 12 },
  { name: 'Fri', docs: 8 },
  { name: 'Sat', docs: 2 },
  { name: 'Sun', docs: 1 },
];

const typeData = [
  { name: 'Contracts', value: 45, color: '#1e3a8a' },
  { name: 'Briefs', value: 25, color: '#0ea5e9' },
  { name: 'Compliance', value: 20, color: '#f59e0b' },
  { name: 'Others', value: 10, color: '#94a3b8' },
];

export const Analytics: React.FC<AnalyticsProps> = ({ isUrdu }) => {
  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">{t('Analytics')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your firm's efficiency and risk profile.</p>
        </div>
        <div className="flex bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-800 p-1">
          <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-navy-800 text-navy-900 dark:text-white rounded shadow-sm">Last 30 Days</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white">This Quarter</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white">Year</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 p-6 rounded-xl border border-slate-200 dark:border-navy-800 shadow-sm">
          <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-6">Documents Analyzed</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={documentData}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  itemStyle={{color: '#1e3a8a', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="docs" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorDocs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-navy-900 p-6 rounded-xl border border-slate-200 dark:border-navy-800 shadow-sm">
          <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-6">Workload Breakdown</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-navy-900 dark:text-white">200</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Docs</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            {typeData.map((type) => (
              <div key={type.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                  <span className="text-slate-600 dark:text-slate-300">{type.name}</span>
                </div>
                <span className="font-semibold text-navy-900 dark:text-white">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-navy-800 border border-blue-100 dark:border-navy-700 p-6 rounded-xl">
           <h4 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">Most Common Risk</h4>
           <p className="text-2xl font-bold text-navy-900 dark:text-white mb-1">Termination Clauses</p>
           <p className="text-sm text-slate-600 dark:text-slate-400">Ambiguity found in 45% of contracts</p>
        </div>
        <div className="bg-green-50 dark:bg-navy-800 border border-green-100 dark:border-navy-700 p-6 rounded-xl">
           <h4 className="text-green-800 dark:text-green-300 font-semibold mb-2">Efficiency Gain</h4>
           <p className="text-2xl font-bold text-navy-900 dark:text-white mb-1">47 Seconds</p>
           <p className="text-sm text-slate-600 dark:text-slate-400">Average analysis time per document</p>
        </div>
        <div className="bg-amber-50 dark:bg-navy-800 border border-amber-100 dark:border-navy-700 p-6 rounded-xl">
           <h4 className="text-amber-800 dark:text-amber-300 font-semibold mb-2">Compliance Rate</h4>
           <p className="text-2xl font-bold text-navy-900 dark:text-white mb-1">87%</p>
           <p className="text-sm text-slate-600 dark:text-slate-400">+5% improved from last month</p>
        </div>
      </div>
    </div>
  );
};
