import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Authenticator } from '@aws-amplify/ui-react';
import './GuitarAuth.css';
import { Hub } from 'aws-amplify/utils';
import GuitarDatatable from './GuitarDatatable';


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

Hub.listen('auth', ({ payload }) => {
    if (payload.event === 'signedIn') {
        const mailusuari = payload.data.signInDetails?.loginId;
        if (mailusuari === 'jpratsv@gmail.com') {
            {/* Modal para GuitarDatatable */}
            <Modal show={showDatatableModal} onHide={() => setShowDatatableModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Guitar Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GuitarDatatable />
                </Modal.Body>
            </Modal>
            
        }
    }
});


export default GuitarAuth;
