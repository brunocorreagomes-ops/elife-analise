export interface ScoreItem {
  dimension: string;
  score: number;
  status: string;
  severity: 'forte' | 'medio' | 'fraco' | 'critico' | 'inexistente' | 'invisivel';
  detail: string;
  recommendedAction: string;
}

export interface Competitor {
  rank: string;
  name: string;
  handle?: string;
  followers: string;
  site: string;
  gmn: string;
  threat: 'Alta' | 'Média' | 'Baixa' | 'Oportunidade';
  differential: string;
}

export interface StrategicPhase {
  id: number;
  title: string;
  duration: string;
  period: string;
  description: string;
  actions: string[];
}

export interface ProposalPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  type: string;
  badge?: string;
  isPopular?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
