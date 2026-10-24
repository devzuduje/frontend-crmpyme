import { api } from './cliente';

export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios');
  return respuesta.data.data;
}

export async function obtenerUsuario(id) {
  const respuesta = await api.get(`/usuarios/${id}`);
  return respuesta.data.data;
}

export async function crearUsuario(datos) {
  const respuesta = await api.post('/usuarios', datos);
  return respuesta.data.data;
}

export async function actualizarUsuario(id, datos) {
  const respuesta = await api.put(`/usuarios/${id}`, datos);
  return respuesta.data.data;
}

export async function cambiarEstadoUsuario(id, activo) {
  const respuesta = await api.patch(`/usuarios/${id}/estado`, { activo });
  return respuesta.data.data;
}
