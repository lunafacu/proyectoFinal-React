import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (nombre.trim() === '') {
      setError('El nombre no puede estar vacío');
      return;
    }
    setError('');
    login(nombre.trim());
    navigate('/');
  };

  return (
    <div className="container my-3">
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Iniciar Sesión</h5>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: facu123 o admin"
          />
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={!nombre.trim()}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;