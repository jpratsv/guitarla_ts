import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import './ModifyGuitarModal.css';

// Inicializar el cliente para trabajar con Amplify
const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

type ModifyGuitarModalProps = {
    open: boolean;
    onClose: () => void;
    guitar: GuitarType;
    refreshData: () => void;
};

export default function ModifyGuitarModal({ open, onClose, guitar, refreshData }: ModifyGuitarModalProps) {
    const [name, setName] = useState(guitar.name);
    const [description, setDescription] = useState(guitar.description || '');
    const [price, setPrice] = useState(guitar.price);
    const [imageUrl, setImageUrl] = useState(guitar.imageUrl || '');
    const [error, setError] = useState<string | null>(null);

    const handleModify = async () => {
        try {
            await client.models.Guitar.update({
                id: guitar.id,
                name,
                description,
                price,
                imageUrl,
            });
            refreshData();
            onClose();
        } catch (error) {
            console.error('Error modificando guitarra:', error);
            setError('No se pudo modificar la guitarra.');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-box">
                <h2>Modificar Guitarra</h2>
                {error && <p className="error-message">{error}</p>}
                <TextField
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Precio"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="URL de Imagen"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <div className="button-group">
                    <Button variant="contained" color="primary" onClick={handleModify}>
                        Guardar Cambios
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Cancelar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
