
// Backend configuration
// Replace this URL with your actual backend endpoint
export const BACKEND_CONFIG = {
  baseUrl: "https://b91f-34-16-242-156.ngrok-free.app", // Replace with your backend URL
  endpoints: {
    chat: "/route"
  }
};

export const getBackendUrl = (endpoint: string) => {
  return `${BACKEND_CONFIG.baseUrl}${endpoint}`;
};
