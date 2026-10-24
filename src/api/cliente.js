import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// 1) Antes de enviar cada petición: si hay un token guardado, se agrega al encabezado.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2) Al recibir cada respuesta: si el backend dice 401 (sesión inválida), se cierra la sesión.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esElLogin = error.config?.url === '/auth/login';
    if (error.response?.status === 401 && !esElLogin) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.assign('/');
    }
    return Promise.reject(error);
  },
);