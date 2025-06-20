
import { getBackendUrl } from '@/config/backend';
import { ChatResponse } from '@/types/chat';

export const sendMessage = async (prompt: string, file?: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(getBackendUrl('/route'), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message. Please check your backend configuration.');
  }
};
