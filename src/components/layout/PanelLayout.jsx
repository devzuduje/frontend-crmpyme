import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { RUTA_POR_ROL } from '../../features/auth/rutasPorRol';
import './PanelLayout.css';

// Opciones del menú y qué roles pueden verlas. Cada historia nueva agrega aquí su opción.
const MENU = [
  { texto: 'Usuarios', ruta: '/usuarios', roles: ['administrador'] },
];

function PanelLayout() {
  const { usuario, cerrarSesion } = useAuth();

  const opciones = [
    { texto: 'Panel', ruta: RUTA_POR_ROL[usuario.rol] },
    ...MENU.filter((opcion) => opcion.roles.includes(usuario.rol)),
  ];

  return (
    <div className="panel">
      <aside className="panel-sidebar">
        <div className="panel-brand">
          CRM<span>Pyme</span>
        </div>

        <nav className="panel-nav">
          {opciones.map((opcion) => (
            <NavLink
              key={opcion.ruta}
              to={opcion.ruta}
              className={({ isActive }) => (isActive ? 'panel-link activo' : 'panel-link')}
            >
              <span className="panel-punto" />
              {opcion.texto}
            </NavLink>
          ))}
        </nav>

        <div className="panel-usuario">
          <strong>{usuario.nombre}</strong>
          <span>{usuario.rol}</span>
          <button type="button" className="panel-salir" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="panel-contenido">
        <Outlet />
      </main>
    </div>
  );
}

export default PanelLayout;