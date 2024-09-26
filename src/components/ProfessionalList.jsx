// ProfessionalList.jsx
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ProfessionalList = ({ barbers, loading, openBarberDetailModal }) => {
  return (
    <div className="professional-list">
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : barbers.length > 0 ? (
        barbers.map((barber) => (
          <div
            className="professional"
            key={barber.id}
            onClick={() => openBarberDetailModal(barber)} // Usar openBarberDetailModal aquí
          >
            <img
              src={barber.imagen || `/peluqueros/default.jpg`}
              alt={barber.nombre}
            />
            <p>{barber.nombre}</p>
          </div>
        ))
      ) : (
        <p>No se encontraron profesionales disponibles.</p>
      )}
    </div>
  );
};

export default ProfessionalList;