// ServiceAccordion.jsx
import React from 'react';
import { Accordion } from 'react-bootstrap';

const ServiceAccordion = ({ openProfessionalModal }) => {
  const services = [
    { title: 'Color', services: ['Decoloración y Color', 'Mechas', 'Claritos', 'Tintura'] },
    { title: 'Corte', services: ['Corte', 'Corte con diseño'] },
    { title: 'Corte y Barba', services: ['Corte y Barba'] }
  ];

  return (
    <Accordion defaultActiveKey="0">
      {services.map((section, index) => (
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
  );
};

export default ServiceAccordion;
