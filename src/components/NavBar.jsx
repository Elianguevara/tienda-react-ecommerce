import React from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="nav-menu">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        Inicio
      </NavLink>
      <NavLink to="/productos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        Productos
      </NavLink>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
// Clickable link to file: [NavBar.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/NavBar.jsx)
