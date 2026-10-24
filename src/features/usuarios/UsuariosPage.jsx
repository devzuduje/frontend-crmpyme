import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { listarUsuarios, cambiarEstadoUsuario } from '../../api/usuariosApi';
import { mensajeDeError } from '../../api/errores';
import { useAuth } from '../../context/useAuth';
import './UsuariosPage.css';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const { usuario: yo } = useAuth();
  const location = useLocation();
  const aviso = location.state?.aviso;

  useEffect(() => {
    let cancelado = false;
    listarUsuarios()
      .then((lista) => {
        if (!cancelado) setUsuarios(lista);
      })
      .catch((e) => setError(mensajeDeError(e, 'No se pudo cargar la lista de usuarios')))
      .finally(() => setCargando(false));
    return () => {
      cancelado = true;
    };
  }, []);

  const cambiarEstado = async (usuario) => {
    const pregunta = usuario.activo
      ? `¿Desactivar a ${usuario.nombre}?\n\nNo podrá iniciar sesión, pero su historial se conserva.`
      : `¿Activar de nuevo a ${usuario.nombre}?`;

    if (!window.confirm(pregunta)) {
      return;
    }

    try {
      const actualizado = await cambiarEstadoUsuario(usuario.id, !usuario.activo);
      setUsuarios((lista) => lista.map((u) => (u.id === actualizado.id ? actualizado : u)));
      setError('');
    } catch (e) {
      setError(mensajeDeError(e, 'No se pudo cambiar el estado del usuario'));
    }
  };

  if (cargando) {
    return <p className="pagina-subtitulo">Cargando usuarios…</p>;
  }

  return (
    <section>
      <header className="pagina-encabezado">
        <div>
          <h1 className="pagina-titulo">Usuarios</h1>
          <p className="pagina-subtitulo">{usuarios.length} usuarios registrados</p>
        </div>
        <Link to="/usuarios/nuevo" className="boton boton-primario">
          Nuevo usuario
        </Link>
      </header>

      {aviso && <p className="alerta alerta-exito">{aviso}</p>}
      {error && <p className="alerta alerta-error">{error}</p>}

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className={u.activo ? '' : 'fila-inactiva'}>
              <td>
                {u.nombre}
                {u.id === yo.id && <span className="tabla-yo"> (tú)</span>}
              </td>
              <td>{u.correo}</td>
              <td>
                <span className={`rol rol-${u.rol.nombre}`}>{u.rol.nombre}</span>
              </td>
              <td>
                <span className={u.activo ? 'estado estado-activo' : 'estado estado-inactivo'}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <div className="tabla-acciones">
                  <Link to={`/usuarios/${u.id}/editar`} className="boton boton-secundario">
                    Editar
                  </Link>
                  {u.id !== yo.id && (
                    <button
                      type="button"
                      className={u.activo ? 'boton boton-peligro' : 'boton boton-secundario'}
                      onClick={() => cambiarEstado(u)}
                    >
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UsuariosPage;