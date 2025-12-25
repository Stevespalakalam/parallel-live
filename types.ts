
export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  avatar: string;
}

export interface ViewerState {
  count: number;
  isFluctuating: boolean;
}
