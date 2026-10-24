// Saca el texto del error que envía el backend: { success: false, error: { code, message } }
export function mensajeDeError(error, mensajePorDefecto) {
  return error.response?.data?.error?.message || mensajePorDefecto;
}
