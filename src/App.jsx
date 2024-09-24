// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './peluqueros/LOGO.webp';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Accordion, Modal, Button, Spinner } from 'react-bootstrap';
import db from './config/firebase';

function App() {
  const [selectedService, setSelectedService] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openProfessionalModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        // Obtener el documento de la peluquería. Usa el ID de la peluquería (puedes cambiar "peluqueriaXYZ" por el ID que corresponda)
        const peluqueriaRef = doc(db, "peluquerias", "EgFul1erU7iSy5jMrsEo");
        const peluqueriaSnap = await getDoc(peluqueriaRef);
  
        if (peluqueriaSnap.exists()) {
          const peluqueriaData = peluqueriaSnap.data();
          
          // Obtener la subcolección de barberos de esa peluquería
          const barberosRef = collection(peluqueriaRef, "barberos");
          const barberosSnapshot = await getDocs(barberosRef);
          
          const barbersList = [];
          barberosSnapshot.forEach((doc) => {
            barbersList.push({ id: doc.id, ...doc.data() });
            console.log("Barbero:", doc.data());
          });
  
          // Actualizar el estado de barberos y cargar los datos de la peluquería
          setBarbers(barbersList);
          // Si necesitas mostrar otros datos de la peluquería (horario, precios, etc.)
          console.log("Peluquería:", peluqueriaData);
        } else {
          console.error("No se encontró la peluquería.");
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching barbers data: ", error);
        setLoading(false);
      }
    };
   
    fetchBarbers();
  }, []);
  

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= 9 && hour < 18);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="branch-header">
        <img src={logo} alt="Logo de la Peluquería" />
        <div className="branch-info">
          <h1>Barber Shop</h1>
          <h2>Belgrano</h2>
        </div>
        <div className={`status ${isOpen ? 'open' : 'closed'}`}>
          {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
        </div>
      </div>

      <h2 className="text-center">Selecciona tu Profesional</h2>

      <div className="professional-list">
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : barbers.length > 0 ? (
          barbers.map((peluquero) => (
            <div className="professional" key={peluquero.id}>
              <img
                src={peluquero.imagen || `/peluqueros/default.jpg`}
                alt={peluquero.nombre || `Peluquero ${peluquero.id}`}
                onClick={() => openProfessionalModal(`Peluquero ${peluquero.nombre || `#${peluquero.id}`}`)}
              />
              <span>{peluquero.nombre}</span>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron profesionales disponibles.</p>
        )}
      </div>

      <h2 className="text-center mt-5">Selecciona tu Servicio</h2>

      <Accordion defaultActiveKey="0">
        {[
          { title: 'Color', services: ['Decoloración y Color', 'Mechas', 'Claritos', 'Tintura'] },
          { title: 'Corte', services: ['Corte', 'Corte con diseño'] },
          { title: 'Corte y Barba', services: ['Corte y Barba'] }
        ].map((section, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{section.title}</Accordion.Header>
            <Accordion.Body>
              <ul className="service-list">
                {section.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} onClick={() => openProfessionalModal(service)}>
                    <span>{service}</span>
                    <span className="service-price">$18,000</span>
                    <span className="arrow">→</span>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={modalOpen} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Elige un profesional para {selectedService}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {barbers.map((peluquero, index) => (
              <div className="col-6 col-md-4 text-center mb-4" key={peluquero.id}>
                <img src={peluquero.imagen || `/peluqueros/default.jpg`} alt={`Peluquero ${peluquero.nombre || index + 1}`} className="peluquero-img" />
                <p>{peluquero.nombre || `Peluquero ${index + 1}`}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="success" className="btn-no-preference" onClick={() => {/* Lógica para "No tengo preferencia" */}}>
              No tengo preferencia
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;