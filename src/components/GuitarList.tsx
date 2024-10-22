import React, { useState, useEffect } from 'react';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import GuitarCard from './GuitarCard';
import './GuitarList.css';
import { getCurrentUser } from 'aws-amplify/auth'; // Corregido: Importar Auth

// Inicializar el cliente para trabajar con Amplify
const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

export default function GuitarList() {
    const [guitars, setGuitars] = useState<GuitarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener las guitarras
    const fetchGuitars = async (userId: string | null) => {
        try {
            setLoading(true);
            const { data: items } = await client.models.Guitar.list({ authMode: userId ? 'userPool' : 'identityPool' });
            setGuitars(items || []);
        } catch (error) {
            console.error('Error obteniendo guitarras:', error);
            setError('No se pudieron obtener las guitarras.');
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar las guitarras al montar el componente
    const fetchUserId = async () => {
        try {
            //const user = await Auth.currentAuthenticatedUser();
            const { username, userId, signInDetails } = await getCurrentUser();

        // Verificación del tipo de flujo de autenticación
        if (signInDetails?.authFlowType === 'USER_SRP_AUTH') {
            console.log('Usuario autenticado mediante Cognito (USER_SRP_AUTH).');
        } else {
            console.log('Usuario autenticado, pero no mediante Cognito USER_SRP_AUTH.');
        }

            //const userId = user?.attributes?.sub || null;
            console.log('Usuario autenticado:', userId);
            console.log('Nombre del usuario:', username);
            console.log('Sign-in details', signInDetails);
            await fetchGuitars(userId);
        } catch (error) {
            
            console.log(error);
            if ((error as Error)?.message === 'not authenticated' || (error as Error).message === 'The user is not authenticated') {
                console.warn('Usuario no autenticado, redirigiendo al login...');
                setError('Debes iniciar sesión para ver nuestras guitarras.');
            } else {
                console.error('Error al obtener el usuario:', error);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    return (
        <div className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5 inherited-styles-for-exported-element">
                {loading && <p className="text-center">Cargando guitarras...</p>}
                {error && <p className="text-center ">{error}</p>}
                {guitars.length === 0 && !loading && !error ? (
                    <p className="text-center">No hay guitarras disponibles en este momento.</p>
                ) : (
                    guitars.map((guitar) => (
                        <div key={guitar.id} className="col-md-6 col-lg-4 my-4 row align-items-center">
                            <GuitarCard
                                guitar={{
                                    id: guitar.id,
                                    name: guitar.name,
                                    description: guitar.description ? String(guitar.description) : 'Sin descripción',
                                    price: guitar.price,
                                    imageUrl: guitar.imageUrl ?? 'default-image-url.jpg',
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
