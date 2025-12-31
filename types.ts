export type ViewState = 'dashboard' | 'tools' | 'contract-analysis' | 'case-briefing' | 'analytics' | 'templates' | 'settings' | 'history';

export interface Risk {
  id: string;
  type: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  recommendation: string;
  citation: string;
  relatedClauseId?: string;
}

export interface ComplianceIssue {
  id: string;
  title: string;
  description: string;
  citation: string;
}

export interface KeyClause {
  id: string;
  category: string;
  originalText: string;
  explanation: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Analyzed' | 'Pending' | 'Draft';
  riskScore: 'Low' | 'Medium' | 'High';
}

export interface HistoryDocument {
  id: string;
  name: string;
  client: string;
  dateAnalyzed: string;
  riskScore: 'Low' | 'Medium' | 'High';
  status: 'Review Pending' | 'Approved' | 'Rejected';
}

export interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  jurisdiction: string;
  usageCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}
