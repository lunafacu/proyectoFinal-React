import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarritoProvider } from './contexts/CarritoContext';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Admin from './components/Admin'; // Importamos Admin que contiene FormularioProducto con edición
import Navbar from './components/Navbar';
import RutasProtegidas from './components/RutasProtegidas';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <GlobalStyle />
          <Helmet>
            <title>Tienda React | Inicio</title>
            <meta name="description" content="Compra productos con facilidad en nuestra tienda online" />
          </Helmet>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<ListaProductos />} />
            <Route
              path="/carrito"
              element={
                <RutasProtegidas>
                  <Carrito />
                </RutasProtegidas>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RutasProtegidas>
                  <Admin />
                </RutasProtegidas>
              }
            />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;