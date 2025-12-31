import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Share2, Save, ExternalLink, Library, MessageSquare, Send, Sparkles, User, Bot, Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { sampleRisks, sampleCompliance, contractSections, translations } from '../data';
import { ChatMessage } from '../types';

type AnalysisState = 'upload' | 'processing' | 'results';

export const ContractAnalysis: React.FC<{ isDarkMode: boolean, isUrdu: boolean }> = ({ isDarkMode, isUrdu }) => {
  const [state, setState] = useState<AnalysisState>('upload');
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const t = (key: string) => isUrdu && translations[key] ? translations[key] : key;

  const steps = [
    "Uploading document...",
    "Extracting text (OCR)...",
    "Retrieving Contract Act 1872 precedents...",
    "Analyzing clause risks...",
    "Generating co-counsel insights..."
  ];

  useEffect(() => {
    if (state === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState('results'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 40); // Fast but visible

      const stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [state]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setState('processing');
    }
  };

  if (state === 'upload') {
    return (
      <div className="h-full flex flex-col animate-fade-in justify-center items-center p-8">
        <div className="w-full max-w-4xl">
          <h1 className={`text-3xl font-bold text-navy-900 dark:text-white mb-2 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>{t('Contract Analysis')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Upload a PDF or DOCX to scan for risks and compliance issues.</p>
          
          <div className="flex-grow flex items-center justify-center">
            <label className="w-full aspect-[21/9] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-navy-700 rounded-2xl bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group relative overflow-hidden">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
              
              <div className="z-10 flex flex-col items-center p-8 text-center">
                <div className="w-20 h-20 bg-blue-50 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Drag contract here or click to browse</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">Support for PDF, DOCX, and TXT files. Max file size 25MB.</p>
                <span className="px-4 py-2 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Select File
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'processing') {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-fade-in max-w-3xl mx-auto w-full p-8">
        <div className="w-full bg-white dark:bg-navy-900 p-12 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-20 bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded flex items-center justify-center shadow-sm">
              <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white">Service_Agreement_Nishat_Mills_v2.docx</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">2.4 MB • Uploading...</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-2 bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-200 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-opacity duration-300 ${idx <= loadingStep ? 'opacity-100' : 'opacity-30'}`}>
                  {idx < loadingStep ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : idx === loadingStep ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-navy-700"></div>
                  )}
                  <span className={`text-sm font-medium ${idx === loadingStep ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-500'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-slate-400 dark:text-slate-500 text-sm">This may take up to 45 seconds</p>
      </div>
    );
  }

  return <SplitScreenWorkspace isUrdu={isUrdu} />;
};

const SplitScreenWorkspace = ({ isUrdu }: { isUrdu: boolean }) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'document' | 'analysis'>('analysis');
  const [highlightId, setHighlightId] = useState<string | null>(null);
  
  const handleRiskClick = (clauseId: string | undefined) => {
    if (clauseId) {
      setHighlightId(clauseId);
      const element = document.getElementById(clauseId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // On mobile, switch to document view when clicking a risk
      if (window.innerWidth < 1024) {
        setActiveMobileTab('document');
      }
    }
  };

  return (
    <div className="fixed inset-0 top-16 left-64 bg-slate-900 flex flex-col overflow-hidden">
      {/* Workspace Header */}
      <div className="h-14 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between px-6 flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400">
               <FileText className="w-4 h-4" />
             </div>
             <span className="font-semibold text-navy-900 dark:text-white text-sm">Service_Agreement_Nishat_Mills_v2.docx</span>
           </div>
           <div className="h-4 w-px bg-slate-200 dark:bg-navy-700"></div>
           <span className="text-xs text-slate-500 dark:text-slate-400">Last saved: Just now</span>
        </div>
        
        {/* Mobile Tabs */}
        <div className="lg:hidden flex bg-slate-100 dark:bg-navy-800 p-1 rounded-lg">
           <button 
             onClick={() => setActiveMobileTab('document')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeMobileTab === 'document' ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
           >
             Document
           </button>
           <button 
             onClick={() => setActiveMobileTab('analysis')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeMobileTab === 'analysis' ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
           >
             Analysis
           </button>
        </div>

        <div className="hidden lg:flex gap-3">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 dark:bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-navy-800 dark:hover:bg-blue-700 shadow-sm transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* LEFT PANE: DOCUMENT VIEWER */}
        <div className={`w-full lg:w-1/2 bg-slate-800 dark:bg-black/40 overflow-y-auto flex justify-center p-8 transition-all duration-300 ${activeMobileTab === 'document' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} absolute lg:relative inset-0`}>
           <div className="w-full max-w-[800px] bg-white min-h-[1000px] shadow-2xl p-16 text-slate-900 font-serif text-sm leading-relaxed">
              {contractSections.map((section, idx) => {
                const isHighlighted = section.id === highlightId;
                
                if (section.type === 'header') {
                  return <h3 key={idx} className="font-bold text-lg mb-4 mt-6 text-black uppercase">{section.text}</h3>;
                }
                
                if (section.type === 'clause') {
                  return (
                    <p 
                      key={idx} 
                      id={section.id}
                      className={`mb-4 transition-colors duration-500 p-1 rounded -mx-1 ${
                        isHighlighted 
                          ? section.riskLevel === 'high' 
                            ? 'bg-red-100 ring-2 ring-red-400' 
                            : 'bg-amber-100 ring-2 ring-amber-400'
                          : ''
                      }`}
                    >
                      {section.text}
                    </p>
                  );
                }
                
                return <p key={idx} className="mb-4">{section.text}</p>;
              })}
           </div>
        </div>

        {/* RIGHT PANE: ANALYSIS & CHAT */}
        <div className={`w-full lg:w-1/2 flex flex-col bg-white dark:bg-navy-950 border-l border-slate-200 dark:border-navy-800 transition-all duration-300 ${activeMobileTab === 'analysis' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} absolute lg:relative inset-0`}>
           {/* Top 60%: Analysis */}
           <div className="flex-grow overflow-y-auto border-b border-slate-200 dark:border-navy-800">
             <div className="p-4 bg-slate-50 dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 flex justify-between items-center sticky top-0 z-10">
                <h3 className="font-bold text-navy-900 dark:text-white">Risk Assessment</h3>
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold rounded-full">3 High Risks</span>
             </div>
             
             <div className="p-4 space-y-4">
                {sampleRisks.map((risk) => (
                  <div 
                    key={risk.id}
                    onClick={() => handleRiskClick(risk.relatedClauseId)}
                    className={`cursor-pointer group border rounded-xl p-4 transition-all hover:shadow-md ${
                      risk.type === 'High' 
                        ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50 hover:border-red-400' 
                        : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50 hover:border-amber-400'
                    }`}
                  >
                     <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-navy-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">{risk.title}</h4>
                       <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${risk.type === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                         {risk.type}
                       </span>
                     </div>
                     <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{risk.description}</p>
                     <div className="flex items-center gap-2 text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-white dark:bg-navy-900 w-fit px-2 py-1 rounded border border-blue-100 dark:border-blue-900">
                        <Library className="w-3 h-3" />
                        {risk.citation}
                     </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-800">
                  <h3 className="font-bold text-navy-900 dark:text-white mb-3 text-sm">Compliance Checklist</h3>
                  {sampleCompliance.map((issue) => (
                    <div key={issue.id} className="flex items-start gap-3 mb-3 p-3 rounded-lg border border-slate-100 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800/50">
                       <div className="mt-0.5 p-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                          <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                       </div>
                       <div>
                          <h4 className="font-semibold text-navy-900 dark:text-white text-xs mb-0.5">{issue.title}</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px]">{issue.description}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           </div>
           
           {/* Bottom Fixed: Chat */}
           <div className="h-[350px] flex-shrink-0 flex flex-col bg-slate-50 dark:bg-navy-900/30 border-t border-slate-200 dark:border-navy-800">
              <ChatInterface isUrdu={isUrdu} />
           </div>
        </div>
      </div>
    </div>
  );
};

const ChatInterface = ({ isUrdu }: { isUrdu: boolean }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      text: "I've analyzed the Service Agreement. The limitation of liability clause (7.3) poses a significant risk. How would you like to proceed?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "I can help with that. Based on precedents, a cap of 100% contract value is standard.";
      if (inputValue.toLowerCase().includes('draft') || inputValue.toLowerCase().includes('fix')) {
        aiResponseText = "Here is a suggested revision for Clause 7.3:\n\n'The Service Provider's total liability shall not exceed the total fees paid under this Agreement.'";
      }
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
         <Sparkles className="w-4 h-4 text-blue-600" />
         <span className="font-bold text-navy-900 dark:text-white text-xs uppercase tracking-wider">AI Co-Counsel</span>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
             <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'ai' ? 'bg-navy-900 dark:bg-blue-600 text-white' : 'bg-slate-200 dark:bg-navy-700 text-slate-600 dark:text-slate-300'}`}>
                {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
             </div>
             <div className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
               msg.role === 'ai' 
               ? 'bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-slate-100 rounded-tl-none shadow-sm' 
               : 'bg-blue-600 text-white rounded-tr-none shadow-md'
             }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
             </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-2 items-center text-xs text-slate-400 ml-9">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-800">
         <form onSubmit={handleSendMessage} className="relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AI to draft, explain, or summarize..."
              className="w-full pl-3 pr-10 py-2.5 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-navy-900 dark:text-white"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-1.5 top-1.5 p-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
               <Send className="w-3.5 h-3.5" />
            </button>
         </form>
      </div>
    </div>
  );
};
