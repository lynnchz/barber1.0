// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProfessionalList from './components/ProfessionalList';
import ServiceAccordion from './components/ServiceAccordion';
import ProfessionalModal from './components/ProfessionalModal';

import db from './config/firebase';
import { collection, getDocs } from "firebase/firestore";

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
        const querySnapshot = await getDocs(collection(db, "barberos"));
        const barbersList = [];
        querySnapshot.forEach((doc) => {
          barbersList.push({ id: doc.id, ...doc.data() });
        });
        setBarbers(barbersList);
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
      <Header isOpen={isOpen} />
      <h2 className="text-center">Selecciona tu Profesional</h2>
      <ProfessionalList barbers={barbers} loading={loading} openProfessionalModal={openProfessionalModal} />
      <h2 className="text-center mt-5">Selecciona tu Servicio</h2>
      <ServiceAccordion openProfessionalModal={openProfessionalModal} />
      <ProfessionalModal modalOpen={modalOpen} closeModal={closeModal} barbers={barbers} selectedService={selectedService} />
    </div>
  );
}

export default App;
