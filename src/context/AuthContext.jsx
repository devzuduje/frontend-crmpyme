import { useState } from 'react';
import { AuthContext } from './useAuth';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  const iniciarSesion = (token, usuarioLogueado) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
    setUsuario(usuarioLogueado);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
