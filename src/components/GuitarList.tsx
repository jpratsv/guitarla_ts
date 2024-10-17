import { useState, useEffect } from 'react';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import './AddGuitarList.css'

const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

export default function GuitarList() {
    const [guitars, setGuitars] = useState<GuitarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Obtener las guitarras desde Amplify
    const fetchGuitars = async () => {
        try {
            setLoading(true);
            const { data: items } = await client.models.Guitar.list();
            if (items) {
                setGuitars(items);
            } else {
                setGuitars([]);
            }
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

    return (
        <div className="container-xl">
            <h2>Nuestra Colección</h2>
            <div className="row">
                {loading && <p className="text-center">Cargando guitarras...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                {guitars.length === 0 && !loading && !error ? (
                    <p className="text-center">No hay guitarras disponibles en este momento.</p>
                ) : (
                    guitars.map((guitar) => (
                        <GuitarCard key={guitar.id} guitar={guitar} addToCart={(guitar) => console.log(guitar)} />
                    ))
                )}
            </div>
        </div>
    );
}
