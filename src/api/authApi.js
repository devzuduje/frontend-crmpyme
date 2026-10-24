import { api } from './cliente';

export async function login(correo, password) {
  const respuesta = await api.post('/auth/login', { correo, password });
  return respuesta.data.data; // { token, usuario }
}
