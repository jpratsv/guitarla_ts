import React, { useState, useEffect } from 'react';  // Importar desde React
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import GuitarCard from './GuitarCard';
import { useCart } from './useCart';
import './GuitarList.css';

// Inicializar el cliente para trabajar con Amplify
const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

export default function GuitarList() {
    const [guitars, setGuitars] = useState<GuitarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { dispatch } = useCart(); // Añadir interacción con el carrito

    // Función para obtener las guitarras
    const fetchGuitars = async () => {
        try {
            setLoading(true);
            const { data: items } = await client.models.Guitar.list();
            setGuitars(items || []);
        } catch (error) {
            console.error('Error obteniendo guitarras:', error);
            setError('No se pudieron obtener las guitarras.');
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar las guitarras al montar el componente
    useEffect(() => {
        fetchGuitars();
    }, []);

    // Función para añadir una guitarra al carrito
    const handleAddToCart = (guitar: GuitarType) => {
        // Asegurarse de que el tipo coincida con el esperado por el reducer
        const guitarToAdd = {
            id: guitar.id,
            name: guitar.name,
            price: guitar.price,
            imageUrl: guitar.imageUrl ?? 'default-image-url.jpg',
            quantity: 1, // Añadir el campo `quantity`
        };

        dispatch({ type: 'ADD_TO_CART', payload: guitarToAdd });
    };

    return (
        <div className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5 inherited-styles-for-exported-element">
                {loading && <p className="text-center">Cargando guitarras...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                {guitars.length === 0 && !loading && !error ? (
                    <p className="text-center">No hay guitarras disponibles en este momento.</p>
                ) : (
                    guitars.map((guitar) => (
                        <div key={guitar.id} className="col-md-6 col-lg-4 my-4 row align-items-center">
                            <GuitarCard
                                guitar={{
                                    id: guitar.id,
                                    name: guitar.name,
                                    description: guitar.description ?? 'Sin descripción',
                                    price: guitar.price,
                                    imageUrl: guitar.imageUrl ?? 'default-image-url.jpg',
                                }}
                            />
                            {/* Botón para añadir al carrito */}
                            <button 
                                className="btn btn-primary mt-3" 
                                onClick={() => handleAddToCart(guitar)}
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
