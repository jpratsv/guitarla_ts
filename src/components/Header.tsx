import React from 'react';
import { useCart } from './CartContext';
import './Header.css';

const Header: React.FC = () => {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, cartTotal } = useCart();

  return (
    <header className="header">
      <div className="container-header">
        <div className="logo">
          <img src="../public/img/logo.svg" alt="GuitarLA Logo" className="logo-image" />
        </div>

        <div className="cart-icon">
          <div className="cart-details">
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </li>
                  ))}
                </ul>
                <p>Total: ${cartTotal}</p>
                <button onClick={clearCart}>Vaciar carrito</button>
              </>
            )}
          </div>
          <img src="../public/img/carrito.png" alt="Carrito de compras" />
        </div>
      </div>
    </header>
  );
};

export default Header;

