import React, { useContext } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { AuthContext } from '../contexts/AuthContext';

const Producto = ({ producto }) => {
  const { agregarProducto } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);

  const handleAgregar = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    agregarProducto(producto);
  };

  return (
    <div className="card-body">
      <h5>{producto.nombre}</h5>
      <p>${producto.precio}</p>
      <button className="btn btn-primary" onClick={handleAgregar}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default Producto;

