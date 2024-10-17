import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddGuitarModal from './components/AddGuitarModal';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

export default function App() {
    const [guitars, setGuitars] = useState<Schema["Guitar"]["type"][]>([]);  // Estado que mantiene la lista de guitarras
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado que controla si el modal está abierto

    const fetchGuitars = async () => {
        try {
            const { data: items } = await client.models.Guitar.list(); // Obtiene las guitarras de DynamoDB
            setGuitars(items); // Actualiza el estado de las guitarras
        } catch (error) {
            console.error("Error al obtener las guitarras:", error);
        }
    };

    useEffect(() => {
        fetchGuitars(); // Llama a fetchGuitars cuando se monta el componente por primera vez
    }, []);

    const handleOpenModal = () => setIsModalOpen(true); // Abre el modal
    const handleCloseModal = () => setIsModalOpen(false); // Cierra el modal

    return (
        <div>
            {/* Header es un componente hijo */}
            <Header
                cart={guitars}  // Pasa la lista de guitarras al componente Header
                removeFromCart={(id) => console.log("Eliminar guitarra con id:", id)}
                decreaseQuantity={(id) => console.log("Disminuir cantidad de guitarra con id:", id)}
                increaseQuantity={(id) => console.log("Aumentar cantidad de guitarra con id:", id)}
                clearCart={() => console.log("Vaciar carrito")}
                isEmpty={guitars.length === 0} // Pasa si el carrito está vacío
                cartTotal={guitars.reduce((total, guitar) => total + (guitar.price || 0), 0)} // Calcula el total del carrito
                fetchGuitars={fetchGuitars} // Pasa la función para actualizar guitarras
            />
            
            {/* Botón para abrir el modal */}
            <button onClick={handleOpenModal}>Añadir Guitarra</button>

            {/* AddGuitarModal es otro componente hijo */}
            <AddGuitarModal
                isOpen={isModalOpen}  // Estado del modal
                onClose={handleCloseModal} // Lógica para cerrar el modal
                onGuitarAdded={() => {
                    fetchGuitars(); // Asegúrate de que se pase una función válida para actualizar la lista de guitarras tras añadir una nueva
                }}
            />

            {/* Comprobación de errores y datos inválidos */}
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {guitars.length > 0 ? (
                        guitars.map((guitar) => (
                            <div key={guitar.id} className="col-md-4 mb-4">
                                <img
                                    className="img-fluid"
                                    src={`/img/${guitar.image ? guitar.image : 'default-image'}.jpg`}
                                    alt={guitar.name || "imagen guitarra"}
                                />
                                <h3>{guitar.name}</h3>
                                <p>{guitar.description}</p>
                                <p>Precio: ${guitar.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No hay guitarras disponibles en este momento.</p>
                    )}
                </div>
            </main>
        </div>
    );
}