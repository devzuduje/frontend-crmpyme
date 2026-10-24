import { api } from './cliente';

export async function listarRoles() {
  const respuesta = await api.get('/roles');
  return respuesta.data.data;
}
