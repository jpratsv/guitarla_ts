import React from 'react';
import { useCart } from './useCart';  // Cambiar la importación a './useCart'
import './GuitarCard.css';

interface Guitar {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

interface GuitarCardProps {
    guitar: Guitar;
}

const GuitarCard: React.FC<GuitarCardProps> = ({ guitar }) => {
    const { dispatch } = useCart();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: { ...guitar, quantity: 1 } });
    };

    return (
        <div className="guitar-card">
            <img
                src={guitar.imageUrl ? `/img/${guitar.imageUrl}` : '/img/defaultImage.jpg'}
                alt={guitar.name}
                className="guitar-image"
                onError={(e) => (e.currentTarget.src = '/img/defaultImage.jpg')}
            />
            <h3>{guitar.name}</h3>
            <p>${guitar.price.toFixed(2)}</p>
            <button className="btn btn-dark" onClick={addToCart}>
                Añadir al carrito
            </button>
        </div>
    );
};

export default GuitarCard;
