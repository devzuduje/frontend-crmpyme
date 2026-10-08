import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RUTA_POR_ROL = {
  administrador: '/dashboard/admin',
  gerente: '/dashboard/gerente',
  vendedor: '/dashboard/vendedor',
};

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:3000/auth/login', {
        correo,
        password,
      });

      const { token, usuario } = respuesta.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      const ruta = RUTA_POR_ROL[usuario.rol] || '/';
      navigate(ruta);
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h1>CRM PYMES — Iniciar sesión</h1>
      <form onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard/admin" element={<h1>Dashboard Admin</h1>} />
      <Route path="/dashboard/gerente" element={<h1>Dashboard Gerente</h1>} />
      <Route path="/dashboard/vendedor" element={<h1>Dashboard Vendedor</h1>} />
    </Routes>
  );
}

export default App;