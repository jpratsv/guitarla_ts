import { CartProvider } from './components/CartContext';  // Importar el CartProvider
import GuitarList from './components/GuitarList'; // Componente que muestra las guitarras
import Header from './components/Header'; // Ejemplo de un componente que podría mostrar el carrito

export default function App() {
    return (
        <CartProvider>
          <Header />  {/* Renderizar la cabecera */}
          <main>
            <GuitarList />
          </main>
        </CartProvider>
      );
}
