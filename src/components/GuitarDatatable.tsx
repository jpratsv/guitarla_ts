import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import AddGuitarModal from './AddGuitarModal';
import ModifyGuitarModal from './ModifyGuitarModal';
import './GuitarDataTable.css';

// Inicializar el cliente para trabajar con Amplify
const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

export default function GuitarDataTable() {
    const [guitars, setGuitars] = useState<GuitarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openModifyModal, setOpenModifyModal] = useState<{ open: boolean; guitar: GuitarType | null }>({ open: false, guitar: null });

    // Función para obtener las guitarras
    const fetchGuitars = async () => {
        try {
            setLoading(true);
            const { data: items } = await client.models.Guitar.list({ authMode: 'AWS_IAM' });
            setGuitars(items || []);
        } catch (error) {
            console.error('Error obteniendo guitarras:', error);
            setError('No se pudieron obtener las guitarras.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuitars();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await client.models.Guitar.delete({ id });
            setGuitars((prevGuitars) => prevGuitars.filter((guitar) => guitar.id !== id));
        } catch (error) {
            console.error('Error eliminando guitarra:', error);
            setError('No se pudo eliminar la guitarra.');
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'description', headerName: 'Descripción', width: 200 },
        { field: 'price', headerName: 'Precio', width: 100 },
        { field: 'imageUrl', headerName: 'URL de Imagen', width: 250 },
        {
            field: 'modify',
            headerName: 'Modificar',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModifyModal({ open: true, guitar: params.row })}
                >
                    Modificar
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Borrar',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                >
                    Borrar
                </Button>
            ),
        },
    ];

    return (
        <div className="container-xl mt-5">
            <h2 className="text-center">Gestión de Guitarras</h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddModal(true)}
                style={{ marginBottom: '20px' }}
            >
                Añadir Guitarra
            </Button>
            {loading && <p className="text-center">Cargando guitarras...</p>}
            {error && <p className="text-center">{error}</p>}
            <div className="data-grid-container">
                <DataGrid rows={guitars} columns={columns} pageSize={5} getRowId={(row) => row.id} />
            </div>
            {openAddModal && <AddGuitarModal open={openAddModal} onClose={() => setOpenAddModal(false)} refreshData={fetchGuitars} />}
            {openModifyModal.open && openModifyModal.guitar && (
                <ModifyGuitarModal
                    open={openModifyModal.open}
                    onClose={() => setOpenModifyModal({ open: false, guitar: null })}
                    guitar={openModifyModal.guitar}
                    refreshData={fetchGuitars}
                />
            )}
        </div>
    );
}
