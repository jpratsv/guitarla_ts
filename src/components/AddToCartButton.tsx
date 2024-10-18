import React from 'react';
// O tu tipo de guitarra

interface AddToCartButtonProps {
  guitar: {
    id: string;
    name: string;
    price: number;
  };
  addToCart: (guitar: AddToCartButtonProps['guitar']) => void;
}


const AddToCartButton: React.FC<AddToCartButtonProps> = ({ guitar, addToCart }) => {
  return (
    <button onClick={() => addToCart(guitar)} className="add-to-cart-button">
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;