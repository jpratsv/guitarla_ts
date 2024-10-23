import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { GuitarProvider } from './components/GuitarContext';
import GuitarList from './components/GuitarList';
import Header from './components/Header';
import GuitarDataTable from './components/GuitarDatatable';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <Router> {/* Envolver toda la aplicación dentro del BrowserRouter */}
        <GuitarProvider> {/* Proveedor para manejar el estado del inventario de guitarras */}
          <CartProvider> {/* Proveedor para manejar el estado del carrito */}
            <div className="App">
              {/* Cabecera de la aplicación */}
              <Header /> {/* El componente Header ahora está asegurado de estar dentro del Router */}

              {/* Configuración de rutas */}
              <Routes>
                {/* Ruta de inicio - muestra la lista de guitarras */}
                <Route path="/" element={<GuitarList />} />

                {/* Ruta protegida que muestra el inventario de guitarras después de la autenticación */}
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute>
                      <GuitarDataTable />
                    </ProtectedRoute>
                  }
                />

                {/* Ruta comodín para redirigir a "/" en caso de una ruta inválida */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              {/* Pie de página */}
              <footer className="footer mt-5 py-3 bg-light text-center">
                <div className="container">
                  <p>© 2024 GuitarLA - Todos los derechos reservados</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </GuitarProvider>
      </Router>
    </Authenticator.Provider>
  );
};

// Componente Ruta Protegida
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { route } = useAuthenticator((context: { route: string }) => [context.route]);

  if (route === 'authenticated') {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default App;
