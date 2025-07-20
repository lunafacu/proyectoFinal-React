import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { usuario, logout, setEditId } = useContext(AuthContext); // ✅ Asegurate de que setEditId está en el contexto
  const navigate = useNavigate();

  const irAAdmin = () => {
    setEditId(null); // ✅ Limpiar ID para que se entienda que vas a crear
    navigate('/admin');
  };

  return (
    <nav className="mb-4">
      <Link to="/" className="btn btn-outline-primary me-2">Inicio</Link>
      {usuario && <Link to="/carrito" className="btn btn-outline-primary me-2">Carrito</Link>}
      {usuario?.esAdmin && (
        <button onClick={irAAdmin} className="btn btn-outline-secondary me-2">
          Admin
        </button>
      )}
      {!usuario ? (
        <Link to="/login" className="btn btn-outline-success">Login</Link>
      ) : (
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout ({usuario.nombre})
        </button>
      )}
    </nav>
  );
};

export default Navbar;
