import { v4 } from 'uuid';

export const createOptimisticChatMessage = (message: string, fileDataURL?: string | undefined) => ({
  id: v4(),
  created: Date.now(),
  file: fileDataURL
    ? {
        title: '',
        url: fileDataURL,
      }
    : null,
  message,
  type: 'Out',
});
