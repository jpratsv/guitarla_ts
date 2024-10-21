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
        <>
            <div className="col-4">
                <img
                    src={guitar.imageUrl ? `/img/${guitar.imageUrl}` : '/img/defaultImage.jpg'}
                    alt={guitar.name}
                    onError={(e) => (e.currentTarget.src = '/img/defaultImage.jpg')}
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                <p>${guitar.description}</p>
                <p className="fw-black text-primary fs-3">
                    €{guitar.price.toFixed(2)}
                </p>
                <button 
                    type="button" 
                    className="btn btn-dark w-100"
                    onClick={addToCart}
                >
                    Agregar al Carrito
                </button>
            </div>
        </>
    );
};

export default GuitarCard;
