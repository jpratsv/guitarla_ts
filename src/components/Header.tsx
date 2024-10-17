import React from 'react';
import AddGuitarModal from './AddGuitarModal';
import type { CartItem, Guitar } from "../types";
import './Header.css'


type HeaderProps = {
    cart?: CartItem[]; // Cart puede ser opcional
    removeFromCart: (id: Guitar['id']) => void;
    decreaseQuantity: (id: Guitar['id']) => void;
    increaseQuantity: (id: Guitar['id']) => void;
    clearCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
    fetchGuitars: () => void;
}

export default function Header({
    cart = [], // Aseguramos que cart esté siempre definido como un array vacío por defecto
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    cartTotal,
    fetchGuitars,
}: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Funciones para manejar el estado del modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="../../public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="d-flex align-items-center gap-4">
                            {/* Botón para abrir el modal de añadir guitarra */}
                            <button className="btn btn-dark" onClick={handleOpenModal}>
                                Añadir Guitarra
                            </button>
                            
                            {/* Modal de Añadir Guitarra */}
                            <AddGuitarModal 
                                isOpen={isModalOpen} 
                                onClose={handleCloseModal} 
                                onGuitarAdded={fetchGuitars} // Pasar la función para actualizar la lista de guitarras
                            />

                            {/* Carrito */}
                            <div className="carrito">
                                <img className="img-fluid" src="../../public/img/carrito.png" alt="imagen carrito" />
                                <div id="carrito" className="bg-white p-3">
                                    {cart?.length === 0 ? (
                                        <p className="text-center">El carrito está vacío</p>
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
                                                    {/* Uso de Optional Chaining para evitar errores con undefined */}
                                                    {cart?.map(guitar => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img 
                                                                    className="img-fluid" 
                                                                    src={`../public/img/${guitar.image ? guitar.image : 'default-image'}.jpg`} 
                                                                    alt="imagen guitarra" 
                                                                />
                                                            </td>
                                                            <td>{guitar.name}</td>
                                                            <td className="fw-bold">${guitar.price}</td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => decreaseQuantity(guitar.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                {guitar.quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => increaseQuantity(guitar.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => removeFromCart(guitar.id)}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <p className="text-end">Total a pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        </>
                                    )}
                                    <button 
                                        className="btn btn-dark w-100 mt-3 p-2"
                                        onClick={clearCart}
                                    >Vaciar Carrito</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}