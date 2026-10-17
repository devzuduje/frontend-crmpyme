import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export async function login(correo, password) {
  const respuesta = await api.post('/auth/login', { correo, password });
  return respuesta.data.data; 
}