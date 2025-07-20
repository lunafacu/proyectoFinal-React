import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CarritoContext } from '../contexts/CarritoContext';
import { AuthContext } from '../contexts/AuthContext';
import { FaCartPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario, setEditId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const fetchProductos = async () => {
    setCargando(true);
    try {
      const res = await axios.get('https://68797e1163f24f1fdca21e08.mockapi.io/apiv1/productos');
      setProductos(res.data);
    } catch (err) {
      toast.error("Error al cargar productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;
    setEliminandoId(productoAEliminar.id);
    try {
      await axios.delete(`https://68797e1163f24f1fdca21e08.mockapi.io/apiv1/productos/${productoAEliminar.id}`);
      toast.success("Producto eliminado");
      fetchProductos();
    } catch (err) {
      toast.error("Error al eliminar el producto");
    } finally {
      setEliminandoId(null);
      setShowModal(false);
    }
  };

  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (prod.categoria && prod.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const productosPorCategoria = {};
  productosFiltrados.forEach(prod => {
    const cat = prod.categoria && prod.categoria.trim() !== '' ? prod.categoria.trim() : 'General';
    if (!productosPorCategoria[cat]) productosPorCategoria[cat] = [];
    productosPorCategoria[cat].push(prod);
  });

  const categoriasOrdenadas = Object.keys(productosPorCategoria).sort((a, b) => {
    if (a === 'General') return 1;
    if (b === 'General') return -1;
    return a.localeCompare(b);
  });

  categoriasOrdenadas.forEach(cat => {
    productosPorCategoria[cat].sort((a, b) => a.nombre.localeCompare(b.nombre));
  });

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Lista de Productos</title>
        <meta name="description" content="Explorá nuestro catálogo de productos únicos." />
      </Helmet>

      <h2 className="mb-4">Productos</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o categoría"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
        aria-label="Buscar productos"
      />

      {cargando ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {categoriasOrdenadas.length === 0 && (
            <p>No se encontraron productos.</p>
          )}

          {categoriasOrdenadas.map((categoria) => (
            <div key={categoria} className="mb-4">
              <h3>{categoria}</h3>
              <div className="row">
                {productosPorCategoria[categoria].map((prod) => (
                  <div key={prod.id} className="col-md-4 mb-3">
                    <Card>
                      <h5>{prod.nombre}</h5>
                      <p>{prod.descripcion}</p>
                      <p><strong>${prod.precio}</strong></p>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => {
                          if (usuario) {
                            const productoNuevo = { ...prod, id: crypto.randomUUID() };
                            agregarAlCarrito(productoNuevo);
                          } else {
                            toast.error("Debes iniciar sesión");
                          }
                        }}
                        aria-label="Agregar al carrito"
                      >
                        <FaCartPlus />
                      </button>
                      {usuario?.esAdmin && (
                        <>
                          <button
                            className="btn btn-warning me-2"
                            aria-label="Editar producto"
                            onClick={() => {
                              setEditId(prod.id);
                              navigate('/admin');
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger"
                            aria-label="Eliminar producto"
                            onClick={() => confirmarEliminacion(prod)}
                            disabled={eliminandoId === prod.id}
                          >
                            {eliminandoId === prod.id ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <FaTrashAlt />
                            )}
                          </button>
                        </>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Modal de confirmación de eliminación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar el producto <strong>{productoAEliminar?.nombre}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminarProducto}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaProductos;
