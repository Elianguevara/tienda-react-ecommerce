import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, Eye } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Colección Premium 2026</span>
          <h1 className="hero-title">
            Tecnología minimalista para tu <span>espacio diario</span>.
          </h1>
          <p className="hero-desc">
            En AETHER combinamos estética escandinava con ingeniería acústica y electrónica de vanguardia. Diseñamos piezas que no solo funcionan a la perfección, sino que embellecen tu entorno de trabajo y relajación.
          </p>
          <div className="hero-cta-group">
            <Link to="/productos" className="btn-primary">
              Explorar Productos <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn-secondary">
              Conócenos
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
              alt="Aether Premium Devices" 
              className="hero-image" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ paddingTop: '40px' }}>
        <div className="page-title-section" style={{ marginBottom: '30px' }}>
          <h2 className="page-title" style={{ fontSize: '2rem' }}>Por Qué Elegir AETHER</h2>
          <p className="page-subtitle">El estándar de calidad en cada detalle de nuestros productos.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Zap size={32} />
            </div>
            <h3 className="feature-title">Rendimiento Extremo</h3>
            <p className="feature-desc">
              Utilizamos componentes premium de grado audiófilo y procesadores eficientes para garantizar un desempeño inigualable.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Eye size={32} />
            </div>
            <h3 className="feature-title">Diseño Elegante</h3>
            <p className="feature-desc">
              Sin ornamentos innecesarios. Aluminio pulido, cuero genuino y curvas orgánicas que destacan en cualquier ambiente.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Truck size={32} />
            </div>
            <h3 className="feature-title">Envío Express Gratis</h3>
            <p className="feature-desc">
              Recibe tus compras directamente en tu puerta de manera gratuita y asegurada para compras superiores a $100.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={32} />
            </div>
            <h3 className="feature-title">Garantía de 3 Años</h3>
            <p className="feature-desc">
              Confiamos plenamente en la durabilidad de nuestros productos. Ofrecemos garantía directa y soporte al cliente 24/7.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
// Clickable link to file: [Home.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/pages/Home.jsx)
