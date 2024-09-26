import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BarberDetailModal = ({ modalOpen, closeModal, barber }) => {
  console.log("Barbero seleccionado:", barber);

  // Verificamos que barber.especialidades exista y sea un array antes de mapearlo
  const especialidades = Array.isArray(barber.especialidades) ? barber.especialidades : [];

  return (
    <Modal show={modalOpen} onHide={closeModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{barber.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={barber.imagen}
            alt={barber.nombre}
            className="barber-img"
            style={{ borderRadius: '50%', width: '150px', height: '150px' }}
          />
          <h4>{barber.nombre}</h4>
          <p>Información sobre el barbero aquí</p>
        </div>
        <div>
          <h5>Servicios</h5>
          {especialidades.length > 0 ? (
            <ul>
              {especialidades.map((especialidad, index) => (
                <li key={index}>{especialidad}</li>
              ))}
            </ul>
          ) : (
            <p>No hay servicios disponibles para este barbero.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cambiar Profesional
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BarberDetailModal;
