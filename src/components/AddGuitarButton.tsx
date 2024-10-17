// AddGuitarButton.tsx
import React from 'react';
import './AddGuitarButton.css'
interface AddGuitarButtonProps {
  onAddGuitar: () => void; // Función que manejará el evento de añadir una guitarra
}

const AddGuitarButton: React.FC<AddGuitarButtonProps> = ({ onAddGuitar }) => {
  return (
    <button onClick={onAddGuitar} className="add-guitar-button">
      Añadir Guitarra
    </button>
  );
};

export default AddGuitarButton;