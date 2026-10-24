import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { RUTA_POR_ROL } from '../features/auth/rutasPorRol';

function RutaProtegida({ roles }) {
  const { usuario } = useAuth();

  // 1) Sin sesión: al login.
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // 2) Con sesión, pero sin el rol que exige esta ruta: a su propio panel.
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to={RUTA_POR_ROL[usuario.rol] || '/'} replace />;
  }

  // 3) Todo en orden: se muestra la ruta hija.
  return <Outlet />;
}

export default RutaProtegida;