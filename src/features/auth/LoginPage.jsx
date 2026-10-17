import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../context/useAuth';
import './LoginPage.css';

const RUTA_POR_ROL = {
  administrador: '/dashboard/admin',
  gerente: '/dashboard/gerente',
  vendedor: '/dashboard/vendedor',
};

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const { token, usuario } = await login(correo, password);
      iniciarSesion(token, usuario);
      navigate(RUTA_POR_ROL[usuario.rol] || '/');
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          CRM<span>Pyme</span>
        </div>

        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

        <form className="login-form" onSubmit={manejarEnvio}>
          <div>
            <label htmlFor="correo">Correo</label>
            <input
              className="login-input"
              id="correo"
              type="email"
              placeholder="Digite Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="Digite Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>

        {mensaje && <p className="login-message">{mensaje}</p>}
      </div>
    </div>
  );
}

export default LoginPage;