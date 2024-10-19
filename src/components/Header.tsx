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
          <img  src="../public/img/carrito.png" alt="Carrito de compras" />
          {isCartOpen && (
            <div id="carrito" className="bg-white p-3 inherited-styles-for-exported-element">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>El carrito está vacío</p>
                </div>
              ) : (
                <>
                  <table className="w-100 table">
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
                          <td>
                            <img
                              className="img-fluid"
                              src={item.imageUrl ? `/img/${item.imageUrl}.jpg` : '/img/defaultImage.jpg'}
                              alt={item.name}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td className="fw-bold">${item.price}</td>
                          
                          <td className="flex align-items-start gap-4">
                            <button type="button" className="btn btn-dark  " onClick={() => decreaseQuantity(item.id)}>
                              -
                            </button>
                            1
                            <button type="button" className="btn btn-dark  " onClick={() => increaseQuantity(item.id)}>
                              +
                            </button>
                          </td>

                          <td>
                            <button className="btn btn-danger" type="button" onClick={() => removeFromCart(item.id)}>
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="text-end">Total pagar: 
                    <span className="fw-bold">${cartTotal}
                    </span>
                  </p>

                  <button 
                    className="btn btn-dark w-100 mt-3 p-2"
                    onClick={() => {
                        if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
                          clearCart();
                        }
                      }}
                  >
                    Vaciar carrito
                  </button>
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
