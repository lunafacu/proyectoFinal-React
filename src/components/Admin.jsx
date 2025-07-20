import React, { useContext } from 'react';
import FormularioProducto from './FormularioProducto';
import { AuthContext } from '../contexts/AuthContext';

const Admin = () => {
  const { editId, setEditId } = useContext(AuthContext);

  return (
    <div>
      <FormularioProducto editId={editId} setEditId={setEditId} />
    </div>
  );
};

export default Admin;
