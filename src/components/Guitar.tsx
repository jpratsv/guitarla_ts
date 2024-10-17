// Guitar.tsx
import { useState, useEffect } from 'react';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

type GuitarType = Schema['Guitar']['type'];

type GuitarProps = {
    guitar: GuitarType;
    addToCart: (item: GuitarType) => void;
};

// Componente para una guitarra individual
function GuitarCard({ guitar, addToCart }: GuitarProps) {
    const { name, imageUrl, description, price } = guitar;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                {/* <img className="img-fluid" src={`../../public/img/${imageUrl ?? ''}`} alt="imagen guitarra" /> */}
                <img className="img-fluid" src={`../public/img/${imageUrl ? imageUrl : 'default-image'}.jpg`}  alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

// Componente principal para visualizar las guitarras
export default function GuitarList() {
    const [guitars, setGuitars] = useState<GuitarType[]>([]);
    
    // Función para agregar una guitarra al carrito
    const addToCart = (guitar: GuitarType) => {
        console.log('Añadir al carrito:', guitar);
        // Aquí deberías implementar la lógica para añadir al carrito
    };

    // Obtener las guitarras desde Amplify
    const fetchGuitars = async () => {
        try {
            const { data: items } = await client.models.Guitar.list();
            setGuitars(items);
        } catch (error) {
            console.error('Error obteniendo guitarras:', error);
        }
    };

    useEffect(() => {
        fetchGuitars();
    }, []);

    return (
        <div className="container-xl">
            <div className="row">
                {guitars.length === 0 ? (
                    <p className="text-center">No hay guitarras disponibles en este momento.</p>
                ) : (
                    guitars.map((guitar) => (
                        <GuitarCard key={guitar.id} guitar={guitar} addToCart={addToCart} />
                    ))
                )}
            </div>
        </div>
    );
}

