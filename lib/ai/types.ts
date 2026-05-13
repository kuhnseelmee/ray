export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  pageContext?: string;
  serviceSlug?: string;
  portfolioSlug?: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
  recommendedServiceSlugs?: string[];
  shouldShowContactCta?: boolean;
  debug?: {
    path: 'full-prompt' | 'compact-retry' | 'ollama-fallback' | 'offline-fallback';
  };
}

export interface IntakeRequest {
  name?: string;
  email?: string;
  company?: string;
  message: string;
}

export interface IntakeResponse {
  summary: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  recommendedNextStep: string;
  suggestedServices: string[];
  confidence: number;
  followUpQuestions?: string[];
}

export interface PortfolioRequest {
  portfolioSlug: string;
  question: string;
}

export interface PortfolioResponse {
  answer: string;
  followUps?: string[];
}

export interface AiProvider {
  generate(input: {
    system: string;
    user: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string>;
}
