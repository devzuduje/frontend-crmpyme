import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard/admin" element={<h1>Dashboard Admin</h1>} />
      <Route path="/dashboard/gerente" element={<h1>Dashboard Gerente</h1>} />
      <Route path="/dashboard/vendedor" element={<h1>Dashboard Vendedor</h1>} />
    </Routes>
  );
}

export default App;