import client from './client';

const notifyAuthChange = () => {
  window.dispatchEvent(new Event('authchange'));
};

export const register = async (name, email, password, phone) => {
  const { data } = await client.post('/auth/register', { name, email, password, phone });
  localStorage.setItem('utsavam_token', data.token);
  localStorage.setItem('utsavam_user', JSON.stringify(data));
  notifyAuthChange();
  return data;
};

export const registerAdmin = async (name, email, password, phone, secretKey) => {
  const { data } = await client.post('/auth/register-admin', { name, email, password, phone, secretKey });
  localStorage.setItem('utsavam_token', data.token);
  localStorage.setItem('utsavam_user', JSON.stringify(data));
  notifyAuthChange();
  return data;
};

export const login = async (email, password) => {
  const { data } = await client.post('/auth/login', { email, password });
  localStorage.setItem('utsavam_token', data.token);
  localStorage.setItem('utsavam_user', JSON.stringify(data));
  notifyAuthChange();
  return data;
};

export const logout = () => {
  localStorage.removeItem('utsavam_token');
  localStorage.removeItem('utsavam_user');
  notifyAuthChange();
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem('utsavam_user');
  return raw ? JSON.parse(raw) : null;
};