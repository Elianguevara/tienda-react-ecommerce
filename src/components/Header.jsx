import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <Shield className="logo-icon" size={24} />
          <span>AETHER</span>
        </Link>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
// Clickable link to file: [Header.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/Header.jsx)
