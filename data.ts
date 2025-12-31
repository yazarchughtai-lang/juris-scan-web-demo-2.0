import { Risk, ComplianceIssue, KeyClause, Document, Template, HistoryDocument } from './types';

export const translations: Record<string, string> = {
  // Navigation
  'Dashboard': 'ڈیش بورڈ',
  'Home': 'ہوم',
  'Recent Documents': 'حالیہ دستاویزات',
  'AI Tools': 'آئی ٹولز',
  'Analytics': 'تجزیات',
  'Template Library': 'ٹیمپلیٹ لائبریری',
  'Settings': 'ترتیبات',
  'Case History': 'کیس کی تاریخ',
  
  // Skill Tiles
  'Contract Analysis': 'معاہدے کا تجزیہ',
  'Case Briefing': 'کیس بریفنگ',
  'Compliance Checker': 'قانونی تعمیل',
  'Legal Templates': 'قانونی ٹیمپلیٹس',
  'Find Precedents': 'نظائر کی تلاش',
  'Smart Drafting': 'سمارٹ ڈرافٹنگ',
  
  // Subtitles
  'Scan for risks, compliance issues, and problematic clauses': 'خطرات، تعمیل کے مسائل، اور مشکوک شقوں کا تجزیہ کریں',
  'Auto-generate structured case briefs from judgments': 'فیصلوں سے خودکار طور پر کیس بریف تیار کریں',
  'Verify against Contract Act 1872, Companies Act 2017': 'معاہدہ ایکٹ 1872، کمپنیز ایکٹ 2017 کے مطابق تصدیق کریں',
  'Browse pre-built contract templates and clauses': 'پہلے سے تیار شدہ معاہدے کے ٹیمپلیٹس اور شقیں دیکھیں',
  'Search Pakistani Supreme Court & High Court judgments': 'پاکستانی سپریم کورٹ اور ہائی کورٹ کے فیصلے تلاش کریں',
  'Generate contract clauses with AI assistance': 'مصنوعی ذہانت کی مدد سے معاہدے کی شقیں تیار کریں',

  // Actions / Buttons
  'Upload Contract': 'معاہدہ اپ لوڈ کریں',
  'Upload Judgment': 'فیصلہ اپ لوڈ کریں',
  'Start Check': 'چیک شروع کریں',
  'Browse Templates': 'ٹیمپلیٹس دیکھیں',
  'Search Now': 'تلاش کریں',
  'Start Draft': 'مسودہ شروع کریں',
  'Upload': 'اپ لوڈ کریں',
  'Analyze': 'تجزیہ کریں',
  'Export': 'ایکسپورٹ',
  'Save': 'محفوظ کریں',
  'Share': 'شیئر کریں',
  'Switch to English': 'انگریزی میں',
  'Switch to اردو': 'اردو میں',
  'Start New Analysis': 'نیا تجزیہ شروع کریں',
  
  // Dashboard & Content
  'Welcome back, Ahmed': 'خوش آمدید، احمد',
  'Docs Analyzed': 'تجزیہ شدہ دستاویزات',
  'Time Saved': 'بچایا گیا وقت',
  'Compliance Issues': 'تعمیل کے مسائل',
  'Templates Used': 'استعمال شدہ ٹیمپلیٹس',
  'Risk Score': 'رسک سکور',
  'Issues Found': 'مسائل ملے',
  'Est. Correction': 'تخمینہ اصلاح',
  'Legal Tools': 'قانونی ٹولز',
  'Select a tool to begin your workflow.': 'اپنا کام شروع کرنے کے لیے ٹول منتخب کریں۔',
};

export const recentDocuments: Document[] = [
  { id: '1', name: 'Service_Agreement_Nishat_Mills_v2.pdf', type: 'Contract', date: 'Today, 10:23 AM', status: 'Analyzed', riskScore: 'High' },
  { id: '2', name: 'Systems_Supply_Contract_final.docx', type: 'Agreement', date: 'Yesterday, 4:15 PM', status: 'Analyzed', riskScore: 'Low' },
  { id: '3', name: 'Emp_Contract_Senior_Associate.pdf', type: 'Contract', date: 'Nov 12, 2024', status: 'Pending', riskScore: 'Medium' },
  { id: '4', name: 'Lease_Deed_Gulberg_HQ.docx', type: 'Deed', date: 'Nov 10, 2024', status: 'Analyzed', riskScore: 'Low' },
];

export const historyDocuments: HistoryDocument[] = [
  { id: '1', name: 'Service_Agreement_Nishat_Mills_v2.docx', client: 'Nishat Mills Ltd', dateAnalyzed: 'Nov 15, 2024', riskScore: 'High', status: 'Review Pending' },
  { id: '2', name: 'Systems_Supply_Contract_final.docx', client: 'TechFlow Solutions', dateAnalyzed: 'Nov 14, 2024', riskScore: 'Low', status: 'Approved' },
  { id: '3', name: 'Emp_Contract_Senior_Associate.pdf', client: 'ABC Corp', dateAnalyzed: 'Nov 12, 2024', riskScore: 'Medium', status: 'Review Pending' },
  { id: '4', name: 'Lease_Deed_Gulberg_HQ.docx', client: 'Gulberg Real Estate', dateAnalyzed: 'Nov 10, 2024', riskScore: 'Low', status: 'Approved' },
  { id: '5', name: 'Vendor_Agreement_Q4.docx', client: 'XYZ Logistics', dateAnalyzed: 'Nov 08, 2024', riskScore: 'Medium', status: 'Rejected' },
  { id: '6', name: 'Software_Licensing_Terms.pdf', client: 'TechFlow Solutions', dateAnalyzed: 'Nov 05, 2024', riskScore: 'High', status: 'Review Pending' },
  { id: '7', name: 'NDA_Confidentiality_Alpha.docx', client: 'Alpha Innovations', dateAnalyzed: 'Nov 03, 2024', riskScore: 'Low', status: 'Approved' },
  { id: '8', name: 'Partnership_Deed_Draft_v1.docx', client: 'Hussain Brothers', dateAnalyzed: 'Oct 28, 2024', riskScore: 'Medium', status: 'Review Pending' },
];

export const sampleRisks: Risk[] = [
  {
    id: 'r1',
    type: 'High',
    title: 'Unlimited Liability Provision',
    description: 'Clause 7.3 creates unlimited liability for "all damages, direct or indirect," which exposes the client to excessive financial risk.',
    recommendation: 'Cap liability at 100% of the total contract value or a fixed amount (e.g., PKR 5 Million).',
    citation: 'Section 73, Contract Act 1872',
    relatedClauseId: 'clause-7.3'
  },
  {
    id: 'r2',
    type: 'Medium',
    title: 'Ambiguous Termination Clause',
    description: 'Clause 12.1 allows termination with "reasonable notice" without defining the timeframe.',
    recommendation: 'Specify a concrete notice period (e.g., 30 days written notice).',
    citation: 'Mahmood v. Hussain, PLD 2020 SC 234',
    relatedClauseId: 'clause-12.1'
  },
];

export const sampleCompliance: ComplianceIssue[] = [
  {
    id: 'c1',
    title: 'Missing Arbitration Clause',
    description: 'Commercial contracts of this value should include a clear dispute resolution mechanism via arbitration.',
    citation: 'Arbitration Act 1940, Section 3',
  },
  {
    id: 'c2',
    title: 'Force Majeure Definition',
    description: 'The current definition does not explicitly cover pandemics or government lockdowns.',
    citation: 'Standard Corporate Practice',
  },
];

export const sampleClauses: KeyClause[] = [
  {
    id: 'k1',
    category: 'Payment Terms',
    originalText: 'Invoices shall be paid within sixty (60) days of receipt.',
    explanation: 'Standard term is 30 days. This creates cash flow delay.',
  },
  {
    id: 'k2',
    category: 'Indemnification',
    originalText: 'Party B agrees to indemnify Party A against any and all claims...',
    explanation: 'Broad indemnification. Should be mutual.',
  },
];

export const templates: Template[] = [
  { id: 't1', name: 'Commercial Services Agreement', type: 'Contract', category: 'Corporate', jurisdiction: 'Federal', usageCount: 127 },
  { id: 't2', name: 'Non-Disclosure Agreement (NDA)', type: 'Agreement', category: 'IP', jurisdiction: 'All Pakistan', usageCount: 342 },
  { id: 't3', name: 'Employment Contract (Permanent)', type: 'Contract', category: 'HR', jurisdiction: 'Punjab', usageCount: 89 },
  { id: 't4', name: 'Office Lease Deed', type: 'Deed', category: 'Real Estate', jurisdiction: 'Sindh', usageCount: 56 },
  { id: 't5', name: 'Software Development Agreement', type: 'Contract', category: 'IT', jurisdiction: 'Federal', usageCount: 45 },
  { id: 't6', name: 'Power of Attorney', type: 'Instrument', category: 'General', jurisdiction: 'Islamabad', usageCount: 112 },
  { id: 't7', name: 'Partnership Deed', type: 'Deed', category: 'Corporate', jurisdiction: 'Punjab', usageCount: 78 },
  { id: 't8', name: 'Independent Contractor Agreement', type: 'Contract', category: 'HR', jurisdiction: 'Federal', usageCount: 65 },
  { id: 't9', name: 'Memorandum of Understanding', type: 'Agreement', category: 'Corporate', jurisdiction: 'All Pakistan', usageCount: 210 },
  { id: 't10', name: 'Sale of Goods Contract', type: 'Contract', category: 'Commercial', jurisdiction: 'Sindh', usageCount: 94 },
  // Litigation
  { id: 't11', name: 'Vakalatnama (High Court)', type: 'Legal Form', category: 'Litigation', jurisdiction: 'Federal', usageCount: 850 },
  { id: 't12', name: 'Stay Order Application (Civil)', type: 'Petition', category: 'Litigation', jurisdiction: 'Punjab', usageCount: 420 },
  { id: 't13', name: 'Bail Application (Pre-Arrest)', type: 'Petition', category: 'Litigation', jurisdiction: 'Sindh', usageCount: 310 },
  // Real Estate
  { id: 't14', name: 'Plot Sale Deed', type: 'Deed', category: 'Real Estate', jurisdiction: 'Sindh', usageCount: 310 },
  { id: 't15', name: 'Tenancy Agreement (Punjab)', type: 'Agreement', category: 'Real Estate', jurisdiction: 'Punjab', usageCount: 560 },
  { id: 't16', name: 'Transfer Letter Format (DHA)', type: 'Letter', category: 'Real Estate', jurisdiction: 'Lahore', usageCount: 480 },
];

export const contractSections = [
  { type: 'header', text: "SERVICES AGREEMENT" },
  { type: 'text', text: "THIS AGREEMENT is made on this 15th day of November, 2024" },
  { type: 'text', text: "BETWEEN:\nNishat Mills Ltd, a company incorporated under the Companies Act 2017, having its registered office at 7-Main Gulberg, Lahore (hereinafter referred to as the \"Client\");" },
  { type: 'text', text: "AND:\nTechFlow Solutions (Pvt) Ltd, a company incorporated under the Companies Act 2017, having its registered office at Arfa Software Park, Lahore (hereinafter referred to as the \"Service Provider\")." },
  { type: 'header', text: "1. RECITALS" },
  { type: 'text', text: "WHEREAS the Client desires to obtain software development services; and\nWHEREAS the Service Provider has the expertise and resources to provide such services." },
  { type: 'header', text: "2. TERM" },
  { type: 'text', text: "This Agreement shall commence on December 1, 2024 and shall continue for a period of twelve (12) months unless terminated earlier in accordance with the provisions of this Agreement." },
  { type: 'header', text: "7. LIMITATION OF LIABILITY" },
  { type: 'clause', id: 'clause-7.3', riskLevel: 'high', text: "7.3 LIMITATION OF LIABILITY. The Service Provider shall be liable for all damages, direct or indirect, arising out of any breach of this Agreement, without limitation. The Service Provider hereby waives any statutory caps on liability available under the Contract Act 1872." },
  { type: 'header', text: "12. TERMINATION" },
  { type: 'clause', id: 'clause-12.1', riskLevel: 'medium', text: "12.1 TERMINATION. Either party may terminate this agreement with reasonable notice to the other party, provided that any ongoing projects are brought to a logical conclusion." },
  { type: 'header', text: "15. GOVERNING LAW" },
  { type: 'text', text: "This Agreement shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan." }
];

export const realContractText = contractSections.map(s => s.text).join('\n\n');
