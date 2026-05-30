const teamMembers = [
  {
    id: 1,
    name: "Clara Dupont",
    role: "Fundadora & CEO",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Elian Guevara",
    role: "Director de Tecnología",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Diseñadora UX/UI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3 className="footer-logo">AETHER</h3>
            <p className="footer-tagline">
              Diseñamos y fabricamos dispositivos inteligentes que combinan la tecnología más avanzada con una estética minimalista para inspirar tu día a día.
            </p>
            <div className="footer-contact">
              <span>Contacto: elian.guevara689@gmail.com</span>
              <span>Teléfono: +54 (263) 4314690</span>
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>
          
          <div className="footer-team-section">
            <h4 className="team-section-title">Nuestro Equipo</h4>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-card">
                  <div className="team-avatar-wrapper">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="team-avatar"
                      loading="lazy" 
                    />
                  </div>
                  <h5 className="team-name">{member.name}</h5>
                  <span className="team-role">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AETHER Technologies. Todos los derechos reservados.</p>
          <p>Proyecto React Pre-Entrega</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// Clickable link to file: [Footer.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/Footer.jsx)
