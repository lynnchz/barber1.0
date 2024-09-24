// ProfessionalList.jsx
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ProfessionalList = ({ barbers, loading, openProfessionalModal }) => {
  return (
    <div className="professional-list">
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : barbers.length > 0 ? (
        barbers.map((peluquero) => (
          <div className="professional" key={peluquero.id}>
            <img
              src={peluquero.imagen || `/peluqueros/default.jpg`}
              alt={peluquero.nombre || `Peluquero ${peluquero.id}`}
              onClick={() => openProfessionalModal(peluquero.nombre)}
            />
            <span>{peluquero.nombre}</span>
          </div>
        ))
      ) : (
        <p className="text-center">No se encontraron profesionales disponibles.</p>
      )}
    </div>
  );
};

export default ProfessionalList;
