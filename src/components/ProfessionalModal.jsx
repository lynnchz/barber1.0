// ProfessionalModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProfessionalModal = ({ modalOpen, closeModal, barbers, selectedService }) => {
  return (
    <Modal show={modalOpen} onHide={closeModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Elige un profesional para {selectedService}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {barbers.map((peluquero, index) => (
            <div className="col-6 col-md-4 text-center mb-4" key={peluquero.id}>
              <img
                src={peluquero.imagen || `/peluqueros/default.jpg`}
                alt={`Peluquero ${peluquero.nombre || index + 1}`}
                className="peluquero-img"
              />
              <p>{peluquero.nombre || `Peluquero ${index + 1}`}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="success"
            className="btn-no-preference"
            onClick={() => {/* Lógica para "No tengo preferencia" */}}
          >
            No tengo preferencia
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfessionalModal;
