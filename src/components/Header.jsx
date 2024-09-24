// Header.jsx
import React from 'react';
import logo from '../peluqueros/LOGO.webp';

const Header = ({ isOpen }) => {
  return (
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
  );
};

export default Header;
