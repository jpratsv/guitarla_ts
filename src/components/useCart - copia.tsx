import { useContext } from 'react';
import CartContext from './CartContext';

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser utilizado dentro de un CartProvider");
    }
    return context;
};
