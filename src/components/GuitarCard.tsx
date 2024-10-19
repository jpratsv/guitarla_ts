import React from 'react';
import { useCart } from './CartContext';
import './GuitarCard.css';


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
    <div className="row">
      <div className="col-4">
          <img className="img-fluid  guitar-card-image" 
            src={`../../public/img/${guitar.imageUrl ? guitar.imageUrl : 'default-image'}.jpg`}
            alt="imagen guitarra" 
          />
      </div>
      <div className="col-8 inherited-styles-for-exported-element">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
          <p>{guitar.description}</p>
          <p className="fw-black text-primary fs-3">${guitar.price}</p>
          <button 
              type="button"
              className=" add-to-cart-button btn btn-dark w-100"
              onClick={() => addToCart(guitar)}
          >Agregar al Carrito</button>
      </div>
    </div>
  





    // <div className="guitar-card">
    //   <img
    //     src={`../../public/img/${guitar.imageUrl ? guitar.imageUrl : 'default-image'}.jpg`}
    //     alt={guitar.name}
    //     className="guitar-card-image"
    //   />
    //   <h3>{guitar.name}</h3>
    //   <p>{guitar.description}</p>
    //   <p>Precio: ${guitar.price}</p>
    //   <button 
    //     className="add-to-cart-button"
    //     onClick={() => addToCart(guitar)}>Agregar al carrito
    //   </button>
    // </div>
  );
};

export default GuitarCard;
