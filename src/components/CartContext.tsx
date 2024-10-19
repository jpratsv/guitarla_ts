import React, { createContext, useReducer, ReactNode, useEffect } from 'react';

// Definir el tipo de guitarra que usaremos en el carrito
interface Guitar {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;  // Hacemos que quantity siempre sea un valor definido
}

// Definir las acciones que se pueden realizar en el carrito
type CartAction = 
    | { type: 'ADD_TO_CART'; payload: Guitar }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'INCREASE_QUANTITY'; payload: string }
    | { type: 'DECREASE_QUANTITY'; payload: string }
    | { type: 'CLEAR_CART' };

// Definir el estado del carrito
interface CartState {
    cart: Guitar[];
}

// Reducer para manejar las acciones del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                return {
                    cart: state.cart.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                            : item
                    ),
                };
            } else {
                return {
                    cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
                };
            }
        }
        case 'REMOVE_FROM_CART':
            return {
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        case 'INCREASE_QUANTITY':
            return {
                cart: state.cart.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        case 'DECREASE_QUANTITY':
            return {
                cart: state.cart.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ).filter(item => item.quantity > 0),
            };
        case 'CLEAR_CART':
            return { cart: [] };
        default:
            return state;
    }
};

// Crear el contexto con valores predeterminados
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Proveedor del contexto del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] }, () => {
        const localData = localStorage.getItem("cart");
        return localData ? JSON.parse(localData) : { cart: [] };
    });

    // Efecto para guardar el carrito en localStorage cuando cambia el estado
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
