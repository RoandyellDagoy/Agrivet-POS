// src/api/api.js
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API_BASE = 'http://192.168.1.100:5000/api'; // <- replace with your PC's LAN IP

const api = axios.create({ baseURL: API_BASE, timeout: 15000 });

// We cannot reliably read SecureStore synchronously inside interceptor,
// so set token on axios.defaults after login and on app load.
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export const saveToken = async (token) => {
  await SecureStore.setItemAsync('jwt', token);
  setAuthToken(token);
};

export const loadToken = async () => {
  const t = await SecureStore.getItemAsync('jwt');
  if (t) setAuthToken(t);
  return t;
};

export default api;
