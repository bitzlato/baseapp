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
