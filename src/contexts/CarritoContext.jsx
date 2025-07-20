import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const clave = `${producto.nombre}-${producto.precio}`; // Unico por nombre+precio
    const index = carrito.findIndex(item => `${item.nombre}-${item.precio}` === clave);

    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    toast.success(`${producto.nombre} agregado al carrito`);
  };

  const eliminarDelCarrito = (indexAEliminar) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(indexAEliminar, 1);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
