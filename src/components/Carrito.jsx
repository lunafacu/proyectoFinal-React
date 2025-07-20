import React, { useContext } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((producto, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{producto.nombre}</strong> - ${producto.precio} x {producto.cantidad}
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${calcularTotal()}</h4>
          <button className="btn btn-warning" onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
};

export default Carrito;
