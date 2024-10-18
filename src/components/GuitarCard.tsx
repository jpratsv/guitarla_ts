import React from 'react';
import { useCart } from './CartContext';

interface GuitarCardProps {
  guitar: {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
}

const GuitarCard: React.FC<GuitarCardProps> = ({ guitar }) => {
  const { addToCart } = useCart();  // Ya obtenemos addToCart desde el hook

  return (
    <div className="guitar-card">
      <img
        src={`../../public/img/${guitar.imageUrl ? guitar.imageUrl : 'default-image'}.jpg`}
        alt={guitar.name}
        className="guitar-card-image"
      />
      <h3>{guitar.name}</h3>
      <p>{guitar.description}</p>
      <p>Precio: ${guitar.price}</p>
      <button onClick={() => addToCart(guitar)}>Agregar al carrito</button>
    </div>
  );
};

export default GuitarCard;
