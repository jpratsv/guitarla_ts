import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo de guitarra que usaremos en el carrito
interface Guitar {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity?: number;
}

// Definir los tipos de las funciones y el estado
interface CartContextProps {
    cart: Guitar[];
    addToCart: (guitar: Guitar) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;  // Añadimos cartTotal
}

// Crear el contexto con valores predeterminados
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Crear un hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser utilizado dentro de un CartProvider");
    }
    return context;
};

// Proveedor del carrito, que envuelve la aplicación y comparte el estado del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Guitar[]>([]);

    const addToCart = (guitar: Guitar) => {
     setCart((prevCart) => {
       const existingItem = prevCart.find(item => item.id === guitar.id);
       if (existingItem) {
         return prevCart.map(item =>
           item.id === guitar.id
             ? { ...item, quantity: (item.quantity ?? 0) + 1 }
             : item
         );
       }
       return [...prevCart, { ...guitar, quantity: 1 }];
     });
   };
   

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    const increaseQuantity = (id: string) => {
          setCart((prevCart) =>
          prevCart.map(item =>
          item.id === id
               ? { ...item, quantity: (item.quantity ?? 0) + 1 }
               : item
          )
          );
     };

     const decreaseQuantity = (id: string) => {
          setCart((prevCart) =>
               prevCart.map(item =>
               item.id === id && (item.quantity ?? 0) > 1
                    ? { ...item, quantity: (item.quantity ?? 0) - 1 }
                    : item
               )
          );
     };

    const clearCart = () => {
        setCart([]);
    };

    // Función para calcular el total del carrito
    const cartTotal = cart.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
