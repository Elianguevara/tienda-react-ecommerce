import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const Register = () => {
  const { user, register, authError, setAuthError, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/perfil', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setAuthError(null);

    if (password !== passwordConfirm) {
      setSubmitError('Las contraseñas deben coincidir.');
      return;
    }

    setSubmitting(true);
    try {
      await register(email.trim(), password);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro | AETHER</title>
        <meta name="description" content="Regístrate en AETHER para gestionar tus compras y productos." />
      </Helmet>
      <AuthPageWrapper>
        <AuthCard>
          <Card.Body>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Crear cuenta</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Regístrate rápido para acceder a tu perfil y panel de administración.
            </p>
            {authError || submitError ? (
              <Alert variant="warning">{authError || submitError}</Alert>
            ) : null}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="registerPasswordConfirm">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="btn-primary" disabled={submitting || loading}>
                {submitting ? 'Creando cuenta...' : 'Registrarme'}
              </Button>
            </Form>

            <div style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>.
            </div>
          </Card.Body>
        </AuthCard>
      </AuthPageWrapper>
    </>
  );
};

export default Register;