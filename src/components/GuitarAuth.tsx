import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Authenticator } from '@aws-amplify/ui-react';
import { Hub } from 'aws-amplify/utils';
import { useNavigate } from 'react-router-dom';
import { useGuitarContext } from './GuitarContext'; // Importar el contexto

interface GuitarAuthProps {
    show: boolean;
    handleClose: () => void;
}

const GuitarAuth: React.FC<GuitarAuthProps> = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const { setShowGuitarDatatable } = useGuitarContext();

    useEffect(() => {
        const listener = Hub.listen('auth', ({ payload }: { payload: { event: string } }) => {
            if (payload.event === 'signedIn') {
                setShowGuitarDatatable(true);
                handleClose();
                navigate('/inventory'); // Navegar al inventario después de autenticarse
            } else if (payload.event === 'signedOut') {
                setShowGuitarDatatable(false);
                navigate('/'); // Navegar a la página principal al cerrar sesión
            }
        });

        return () => {
            listener(); // Eliminar listener al desmontar
        };
    }, [handleClose, setShowGuitarDatatable, navigate]);

    return (
        <Modal show={show} onHide={handleClose} centered className="auth-modal">
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Authenticator>
                    {({ signOut, user }) => (
                        <main>
                            <p>Hola, {user?.username}</p>
                            <Button onClick={signOut}>Cerrar sesión</Button>
                        </main>
                    )}
                </Authenticator>
            </Modal.Body>
        </Modal>
    );
};

export default GuitarAuth;
