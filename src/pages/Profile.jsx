import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Button } from 'react-bootstrap';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile-page-container">
      <Helmet>
        <title>Perfil | AETHER</title>
        <meta name="description" content="Perfil de usuario autenticado en AETHER." />
      </Helmet>

      <div className="page-title-section">
        <h1 className="page-title">Mi Perfil</h1>
        <p className="page-subtitle">Administración de cuenta y acceso seguro.</p>
      </div>

      <div className="profile-card">
        <div className="profile-details">
          <h2>Bienvenido,</h2>
          <p style={{ color: 'var(--text-primary)' }}><strong>{user?.email}</strong></p>
          <p className="profile-note">
            Desde esta sección puedes acceder al panel de gestión de productos y revisar tu información.
          </p>

          <div className="profile-actions">
            <Button className="btn-secondary" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;