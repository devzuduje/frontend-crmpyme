import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listarRoles } from '../../api/rolesApi';
import { obtenerUsuario, crearUsuario, actualizarUsuario } from '../../api/usuariosApi';
import { mensajeDeError } from '../../api/errores';
import { useAuth } from '../../context/useAuth';
import './UsuarioFormPage.css';

const FORMULARIO_VACIO = { nombre: '', correo: '', password: '', rolId: '' };

function UsuarioFormPage() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const { usuario: yo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(FORMULARIO_VACIO);
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Los roles para el selector se cargan una vez, al abrir la pantalla.
  useEffect(() => {
    let cancelado = false;
    listarRoles()
      .then((lista) => {
        if (!cancelado) setRoles(lista);
      })
      .catch((e) => setMensaje(mensajeDeError(e, 'No se pudieron cargar los roles')));
    return () => {
      cancelado = true;
    };
  }, []);

  // En modo edición, se cargan los datos actuales del usuario.
  useEffect(() => {
    if (!esEdicion) {
      return;
    }
    let cancelado = false;
    obtenerUsuario(id)
      .then((u) => {
        if (!cancelado) setForm({ nombre: u.nombre, correo: u.correo, password: '', rolId: String(u.rol.id) });
      })
      .catch((e) => setMensaje(mensajeDeError(e, 'No se pudo cargar el usuario')));
    return () => {
      cancelado = true;
    };
  }, [id, esEdicion]);

  const actualizarCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje('');

    try {
      if (esEdicion) {
        await actualizarUsuario(id, { nombre: form.nombre, correo: form.correo, rolId: Number(form.rolId) });
        navigate('/usuarios', { state: { aviso: `Se guardaron los cambios de ${form.nombre}.` } });
      } else {
        await crearUsuario({ ...form, rolId: Number(form.rolId) });
        navigate('/usuarios', { state: { aviso: `Se creó el usuario ${form.nombre}.` } });
      }
    } catch (error) {
      setMensaje(mensajeDeError(error, 'No se pudo guardar el usuario'));
      setGuardando(false);
    }
  };

  const editandoMiCuenta = esEdicion && Number(id) === yo.id;

  return (
    <section className="form-usuario">
      <h1 className="pagina-titulo">{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      <p className="pagina-subtitulo">
        {esEdicion
          ? 'La contraseña no se cambia desde aquí.'
          : 'El usuario podrá entrar con esta contraseña temporal.'}
      </p>

      <form className="tarjeta form-usuario-campos" onSubmit={guardar}>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" name="nombre" className="entrada"
            value={form.nombre} onChange={actualizarCampo} required />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" className="entrada"
            value={form.correo} onChange={actualizarCampo} required />
        </div>

        {!esEdicion && (
          <div className="campo">
            <label htmlFor="password">Contraseña temporal</label>
            <input id="password" name="password" type="password" className="entrada"
              value={form.password} onChange={actualizarCampo}
              required minLength={8} pattern="(?=.*\d).{8,}"
              title="Al menos 8 caracteres y 1 número" />
            <p className="campo-ayuda">Mínimo 8 caracteres y al menos 1 número.</p>
          </div>
        )}

        <div className="campo">
          <label htmlFor="rolId">Rol</label>
          <select id="rolId" name="rolId" className="entrada"
            value={form.rolId} onChange={actualizarCampo}
            required disabled={editandoMiCuenta}>
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
          {editandoMiCuenta && <p className="campo-ayuda">No puedes cambiar tu propio rol.</p>}
        </div>

        {mensaje && <p className="alerta alerta-error">{mensaje}</p>}

        <div className="form-usuario-botones">
          <Link to="/usuarios" className="boton boton-secundario">Cancelar</Link>
          <button type="submit" className="boton boton-primario" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UsuarioFormPage;
