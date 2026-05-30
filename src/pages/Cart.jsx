import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle, CreditCard } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeItem, clearCart, getCartTotal, getCartQuantity } = useContext(CartContext);
  
  // Checkout Form state
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  
  // Order state
  const [orderId, setOrderId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const total = getCartTotal();
  const quantity = getCartQuantity();
  const costoEnvio = total > 150 ? 0 : 15.00;
  const totalConEnvio = total + costoEnvio;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !telefono.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    setCheckoutLoading(true);
    
    // Simular procesamiento del pago/orden
    setTimeout(() => {
      const generatedId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      clearCart();
      setCheckoutLoading(false);
    }, 1500);
  };

  // 1. Success Order State
  if (orderId) {
    return (
      <div className="empty-cart-state" style={{ border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 0 30px rgba(20, 184, 166, 0.1)' }}>
        <div className="empty-icon-wrapper" style={{ color: 'var(--accent-teal)' }}>
          <CheckCircle size={64} />
        </div>
        <h2 className="empty-title">¡Compra Realizada con Éxito!</h2>
        <p className="empty-desc" style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '500' }}>
          Gracias por confiar en AETHER, <strong>{nombre}</strong>.
        </p>
        <p className="empty-desc" style={{ marginTop: '0' }}>
          Hemos enviado la confirmación y detalles de envío a: <strong>{email}</strong>.<br />
          Tu número de seguimiento de orden es: <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '1.2rem' }}>{orderId}</span>
        </p>
        <Link to="/productos" className="btn-primary empty-btn">
          Seguir Comprando <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  // 2. Empty Cart State
  if (quantity === 0) {
    return (
      <div className="empty-cart-state">
        <div className="empty-icon-wrapper">
          <ShoppingBag size={64} />
        </div>
        <h2 className="empty-title">Tu Carrito Está Vacío</h2>
        <p className="empty-desc">
          Parece que aún no has agregado ningún producto a tu carrito de compras. ¡Explora nuestro catálogo y descubre dispositivos asombrosos!
        </p>
        <Link to="/productos" className="btn-primary empty-btn">
          Ver Productos <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  // 3. Active Cart List State
  return (
    <div className="cart-page-container">
      <div className="page-title-section" style={{ marginBottom: '24px', textAlign: 'left' }}>
        <h1 className="page-title">Tu Carrito</h1>
        <p className="page-subtitle">Revisa tus productos seleccionados antes de completar el pedido.</p>
      </div>

      <div className="cart-layout">
        {/* Left Side: Items list */}
        <div className="cart-items-container">
          <div className="cart-header-actions">
            <span>{quantity} {quantity === 1 ? 'producto seleccionado' : 'productos seleccionados'}</span>
            <button onClick={clearCart} className="btn-clear-cart">
              <Trash2 size={16} /> Vaciar Carrito
            </button>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.nombre}</h3>
                <span className="cart-item-meta" style={{ textTransform: 'capitalize' }}>
                  Categoría: {item.categoria}
                </span>
                <span className="cart-item-meta">
                  Precio Unitario: ${item.precio.toFixed(2)}
                </span>
              </div>
              
              <div className="cart-item-actions">
                <div className="cart-item-price-calc">
                  <span className="qty-value" style={{ border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    x{item.quantity}
                  </span>
                  <span className="cart-item-total">
                    ${(item.precio * item.quantity).toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => removeItem(item.id)} 
                  className="btn-remove-item"
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Summary & Checkout */}
        <div className="cart-summary-box">
          <h2 className="summary-title">Resumen de Compra</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Envío</span>
            <span>
              {costoEnvio === 0 ? (
                <span style={{ color: 'var(--accent-teal)', fontWeight: '600' }}>Gratis</span>
              ) : (
                `$${costoEnvio.toFixed(2)}`
              )}
            </span>
          </div>
          
          {costoEnvio > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '12px' }}>
              ¡Agrega ${(150 - total).toFixed(2)} más para envío gratuito!
            </p>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span>${totalConEnvio.toFixed(2)}</span>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleCheckoutSubmit} className="checkout-form" style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', marginBottom: '8px' }}>
              Información de Envío
            </h3>
            
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre Completo</label>
              <input 
                type="text" 
                id="nombre" 
                className="form-input" 
                placeholder="Juan Pérez" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="juan@ejemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono" className="form-label">Teléfono de Contacto</label>
              <input 
                type="tel" 
                id="telefono" 
                className="form-input" 
                placeholder="+54 9 11 1234-5678" 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <>Procesando Pago...</>
              ) : (
                <>
                  <CreditCard size={18} /> Confirmar Pedido
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
// Clickable link to file: [Cart.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/pages/Cart.jsx)
