import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8080/api' });

instance.interceptors.request.use(config => {
  const stored = localStorage.getItem('schoolUser');
  const user = stored ? JSON.parse(stored) : null;
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default instance;