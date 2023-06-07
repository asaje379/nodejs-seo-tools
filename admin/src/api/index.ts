import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export function setApiToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
