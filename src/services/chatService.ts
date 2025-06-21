import { getBackendUrl } from '@/config/backend';
import { ServiceResponse } from '@/types/chat';

export const sendMessage = async (prompt: string, file?: File): Promise<ServiceResponse> => {
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

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      // As per backend, response can be { "text": "..." } or { "message": "..." }
      const text = data.text || data.message || null;
      return { text, file: null };
    }

    if (contentType && contentType.includes('application/pdf')) {
      const fileBlob = await response.blob();
      const text = response.headers.get('X-Question-Text');
      return { text, file: fileBlob };
    }

    // Fallback for cases where content-type is not as expected or missing
    return { text: 'Received an unexpected response from the server.', file: null };
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message. Please check your backend configuration.');
  }
};
