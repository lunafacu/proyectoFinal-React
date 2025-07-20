import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  const login = (nombre) => {
    const esAdmin = nombre.toLowerCase() === 'admin';
    setUsuario({ nombre, esAdmin });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, editId, setEditId }}>
      {children}
    </AuthContext.Provider>
  );
};


