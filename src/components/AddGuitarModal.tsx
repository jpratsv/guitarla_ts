import React, { useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

type AddGuitarModalProps = {

    open: boolean;

    onClose: () => void;

    onGuitarAdded: () => void;

    refreshData: () => Promise<void>;
    

};

export default function AddGuitarModal({ open, onClose, onGuitarAdded }: AddGuitarModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    if (!open) {
        return null;
    }

    const handleSubmit = async () => {
        try {
            // Añadir la nueva guitarra a la base de datos DynamoDB
            await client.models.Guitar.create({
                name,
                price,
                description,
                imageUrl: imageUrl,
            });

            // Llamar a la función para actualizar la lista de guitarras y cerrar el modal
            onGuitarAdded();
            onClose();
        } catch (error) {
            console.error("Error al añadir la guitarra:", error);
            alert("Ocurrió un error al añadir la guitarra. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Añadir Nueva Guitarra</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input 
                            type="number" 
                            id="price" 
                            value={price} 
                            onChange={(e) => setPrice(Number(e.target.value))} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">URL de la Imagen:</label>
                        <input 
                            type="text" 
                            id="imageUrl" 
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)} 
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-dark">Añadir Guitarra</button>
                        <button type="button" className="btn btn-light" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
