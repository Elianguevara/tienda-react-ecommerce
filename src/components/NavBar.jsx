import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="nav-menu">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Inicio
      </NavLink>
      <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Productos
      </NavLink>
      {user ? (
        <>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Perfil
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Gestión
          </NavLink>
        </>
      ) : (
        <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Iniciar sesión
        </NavLink>
      )}
      <CartWidget />
    </nav>
  );
};

export default NavBar;
// Clickable link to file: [NavBar.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/NavBar.jsx)
