import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormularioProducto = ({ editId, setEditId }) => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });

  useEffect(() => {
    if (editId) {
      axios.get(`https://68797e1163f24f1fdca21e08.mockapi.io/apiv1/productos/${editId}`)
        .then(res => setForm(res.data))
        .catch(() => toast.error("Error al obtener el producto"));
    } else {
      limpiarFormulario();
    }
  }, [editId]);

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!form.nombre || form.nombre.trim() === '') return 'El nombre es obligatorio';
    if (Number(form.precio) <= 0) return 'El precio debe ser mayor a 0';
    if (!form.descripcion || form.descripcion.length < 10) return 'La descripción debe tener al menos 10 caracteres';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validar();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      if (editId) {
        await axios.put(`https://68797e1163f24f1fdca21e08.mockapi.io/apiv1/productos/${editId}`, form);
        toast.success("Producto actualizado");
        setEditId(null);
      } else {
        await axios.post("https://68797e1163f24f1fdca21e08.mockapi.io/apiv1/productos", form);
        toast.success("Producto agregado");
        limpiarFormulario();
      }
    } catch {
      toast.error("Error al guardar el producto");
    }
  };

  const handleCancelarEdicion = () => {
    setEditId(null);
    limpiarFormulario();
  };

  return (
    <div className="container mt-4">
      <h2>{editId ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          autoFocus
        />
        <input
          className="form-control mb-2"
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          className="form-control mb-2"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
        />
        <textarea
          className="form-control mb-2"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            {editId ? 'Actualizar' : 'Agregar'}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelarEdicion}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;
