import React from 'react';
import { CartProvider } from './components/CartContext';  // Importar el CartProvider
import GuitarList from './components/GuitarList'; // Componente que muestra las guitarras
import Header from './components/Header'; // Componente de cabecera, que incluye el carrito
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Importar estilos generales de la aplicación

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        {/* Cabecera de la aplicación */}
        <Header />

        {/* Contenido principal */}
        <main className="container mt-4">
          <GuitarList />
        </main>

        {/* Ejemplo de un pie de página */}
        <footer className="footer mt-5 py-3 bg-light text-center">
          <div className="container">
            <p>© 2024 GuitarLA - Todos los derechos reservados</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
