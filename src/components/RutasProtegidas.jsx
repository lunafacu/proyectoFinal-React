import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RutasProtegidas = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutasProtegidas;

