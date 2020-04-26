import axios from 'axios';

let APIClientInstance;

export const refreshClient = () => {
  const headers = {
    Accept: 'application/json',
  };
  const authToken = '222';// getTokenFromStorage();
  if (authToken) headers['Session-Token'] = authToken;

  APIClientInstance = axios.create({
    headers,
    baseURL: location.origin, // works for both local and prod
  });
  return APIClientInstance;
};

const APIClient = () => {
  if (APIClientInstance) {
    return APIClientInstance;
  }
  return refreshClient();
};

export default APIClient;
