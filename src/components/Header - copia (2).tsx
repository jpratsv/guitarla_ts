import React, { useState } from 'react';
import { useCart } from './useCart'; // Importa desde el archivo donde está el hook
import GuitarAuth from './GuitarAuth';
import './Header.css';

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state: { cart }, dispatch } = useCart(); // Asegúrate de usar el hook correctamente
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Manejadores de evento para abrir/cerrar el carrito
  const handleMouseEnter = () => setIsCartOpen(true);
  const handleMouseLeave = () => setIsCartOpen(false);

  // Mostrar u ocultar el modal de autenticación
  const handleShowAuthModal = () => {
    setShowAuthModal(true);
  };
  
  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  // Funciones para manejar las acciones del carrito
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const increaseQuantity = (id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calcular el total del carrito
  const cartTotal: number = cart.reduce(
    (total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="py-5 header inherited-styles-for-exported-element">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="../../index.html">
              <img src="../../public/img/logo.svg" alt="GuitarLA Logo" className="logo-image" />
            </a>
          </div>
          <nav className="col-md-6 mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito"
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
              <img 
                className="img-fluid inherited-styles-for-exported-element" 
                src="../public/img/carrito.png" 
                alt="imagen carrito"
              />

              {isCartOpen && (
                <div id="carrito" className="bg-white p-3">
                  {cart.length === 0 ? (
                    <div>
                      <p className="text-center">
                        El carrito está vacío
                      </p>
                      <button 
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={clearCart}
                      >
                        Vaciar Carrito
                      </button>
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
                          {cart.map((item) => ( // Asegúrate de que `cart` siempre sea un array
                            <tr key={item.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={item.imageUrl ? `../../public/img/${item.imageUrl}` : '../../public/img/defaultImage.jpg'}
                                  alt={item.name}
                                  onError={(e) => (e.currentTarget.src = '../../public/img/defaultImage.jpg')}
                                />
                              </td>
                              <td>{item.name}</td>
                              <td className="fw-bold">${item.price}</td>
                              
                              <td className="d-flex align-items-center gap-2">
                                <button type="button" className="btn btn-dark" onClick={() => decreaseQuantity(item.id)}>
                                  -
                                </button>
                                {item.quantity}
                                <button type="button" className="btn btn-dark" onClick={() => increaseQuantity(item.id)}>
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

                      <p className="text-end">Total a pagar: 
                        <span className="fw-bold">${cartTotal.toFixed(2)}</span>
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

            <div className="user-auth">
              <button className="btn btn-link user-icon" onClick={handleShowAuthModal}>
                <img 
                  className="img-fluid inherited-styles-for-exported-element" 
                  src="../public/img/iniciosesion.jpg" 
                  alt="imagen inicio sesion"
                />
              </button>
            </div>
          </nav>
        </div>
      </div>
      {/* Componente de autenticación de usuario */}
      {showAuthModal && (
        <GuitarAuth show={showAuthModal} handleClose={handleCloseAuthModal} />
      )}
    </header>
  );
};

export default Header;
