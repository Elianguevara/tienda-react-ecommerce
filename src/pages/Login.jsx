import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const AuthPageWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`;

const AuthCard = styled(Card)`
  max-width: 520px;
  width: 100%;
  border-radius: 24px;
  background: rgba(18, 23, 34, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
`;

const Login = () => {
  const { user, login, authError, setAuthError, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/perfil';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setAuthError(null);
    setSubmitting(true);

    try {
      await login(email.trim(), password);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | AETHER</title>
        <meta name="description" content="Accede a tu cuenta AETHER para gestionar pedidos y catálogo." />
      </Helmet>
      <AuthPageWrapper>
        <AuthCard>
          <Card.Body>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Iniciar sesión</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Accede a tu panel de usuario y gestión de productos.
            </p>
            {authError || submitError ? (
              <Alert variant="warning">{authError || submitError}</Alert>
            ) : null}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="btn-primary" disabled={submitting || loading}>
                {submitting ? 'Iniciando sesión...' : 'Continuar'}
              </Button>
            </Form>

            <div style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>.
            </div>
          </Card.Body>
        </AuthCard>
      </AuthPageWrapper>
    </>
  );
};

export default Login;