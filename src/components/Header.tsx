import React, { useState } from 'react';
import { useCart } from './CartContext';
import './Header.css';

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, cartTotal } = useCart();

  // Manejadores de evento para abrir/cerrar el carrito
  const handleMouseEnter = () => setIsCartOpen(true);
  const handleMouseLeave = () => setIsCartOpen(false);

  return (
    <header className="header">
      <div className="container-header">
        <div className="logo">
          <img src="../public/img/logo.svg" alt="GuitarLA Logo" className="logo-image" />
        </div>
        <nav className="main-nav">
          {/* Aquí puedes añadir elementos de navegación */}
        </nav>
        <div 
          className="cart-icon" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <img src="../public/img/carrito.png" alt="Carrito de compras" />
          {isCartOpen && (
            <div className="cart-details">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>El carrito está vacío</p>
                </div>
              ) : (
                <>
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td><img src={item.imageUrl} alt={item.name} className="cart-item-image" /></td>
                          <td>{item.name}</td>
                          <td>${item.price}</td>
                          <td>
                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            {item.quantity}
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                          </td>
                          <td>
                            <button onClick={() => removeFromCart(item.id)}>❌</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>Total a pagar: ${cartTotal}</p>
                  <button className="clear-cart-button" onClick={clearCart}>Vaciar carrito</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
