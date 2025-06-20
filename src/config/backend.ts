
// Backend configuration
// Replace this URL with your actual backend endpoint
export const BACKEND_CONFIG = {
  baseUrl: "http://localhost:8000", // Replace with your backend URL
  endpoints: {
    chat: "/route"
  }
};

export const getBackendUrl = (endpoint: string) => {
  return `${BACKEND_CONFIG.baseUrl}${endpoint}`;
};
