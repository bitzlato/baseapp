type ChatMessageType = 'In' | 'Out';

export interface ChatMessage {
  id: number;
  type: ChatMessageType;
  created: number;
  message: string;
  file: {
    title: string;
    url: string;
    caption?: string;
  } | null;
}

export interface P2PChatResponse {
  data: ChatMessage[];
  total: number;
}
