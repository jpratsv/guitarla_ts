import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Authenticator } from '@aws-amplify/ui-react';
import './GuitarAuth.css';

interface GuitarAuthProps {
    show: boolean;
    handleClose: () => void;
}

const GuitarAuth: React.FC<GuitarAuthProps> = ({ show, handleClose }) => {
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
