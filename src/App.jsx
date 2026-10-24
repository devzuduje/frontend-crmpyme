import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RutaProtegida from './components/RutaProtegida';
import PanelLayout from './components/layout/PanelLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import UsuariosPage from './features/usuarios/UsuariosPage';
import UsuarioFormPage from './features/usuarios/UsuarioFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Todo lo de adentro exige haber iniciado sesión */}
      <Route element={<RutaProtegida />}>
        <Route element={<PanelLayout />}>

          <Route element={<RutaProtegida roles={['administrador']} />}>
            <Route path="/dashboard/admin" element={<DashboardPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/usuarios/nuevo" element={<UsuarioFormPage />} />
            <Route path="/usuarios/:id/editar" element={<UsuarioFormPage />} />
          </Route>

          <Route element={<RutaProtegida roles={['gerente']} />}>
            <Route path="/dashboard/gerente" element={<DashboardPage />} />
          </Route>

          <Route element={<RutaProtegida roles={['vendedor']} />}>
            <Route path="/dashboard/vendedor" element={<DashboardPage />} />
          </Route>

        </Route>
      </Route>

      {/* Cualquier otra URL: al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;