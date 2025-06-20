
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  file?: {
    name: string;
    type: string;
    url: string;
  };
}

export interface ChatResponse {
  result: string;
}
