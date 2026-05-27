import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetch('/productos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        return response.json();
      })
      .then((data) => {
        const item = data.find((p) => p.id === id);
        setProducto(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching detail:", error);
        setLoading(false);
      });
  }, [id]);

  const incrementar = () => {
    if (producto && cantidad < producto.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAgregar = () => {
    if (producto && producto.stock > 0) {
      addToCart(producto, cantidad);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando detalles de producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Producto no encontrado</h2>
        <p style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>El producto que buscas no existe o ha sido descontinuado.</p>
        <Link to="/productos" className="btn-secondary" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <Link to="/productos" className="btn-card-action" style={{ display: 'inline-flex', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>
      
      <div className="detail-layout">
        <div className="detail-img-container">
          <img src={producto.imagen} alt={producto.nombre} className="detail-image" />
        </div>
        
        <div className="detail-info">
          <span className="detail-category">{producto.categoria}</span>
          <h1 className="detail-title">{producto.nombre}</h1>
          
          <div className="detail-price">
            ${producto.precio.toFixed(2)}
            <span className={`detail-stock-badge ${producto.stock > 0 ? 'stock-ok' : 'stock-low'}`}>
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
            </span>
          </div>
          
          <p className="detail-desc">{producto.descripcion}</p>
          
          {producto.stock > 0 ? (
            <div className="detail-actions">
              <div className="quantity-control">
                <span className="quantity-label">Cantidad:</span>
                <div className="qty-btn-group">
                  <button 
                    onClick={decrementar} 
                    className="qty-btn" 
                    disabled={cantidad <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="qty-value">{cantidad}</span>
                  <button 
                    onClick={incrementar} 
                    className="qty-btn" 
                    disabled={cantidad >= producto.stock}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAgregar} 
                className="btn-primary"
                style={{ justifyContent: 'center' }}
              >
                <ShoppingBag size={18} /> Agregar al Carrito
              </button>
              
              {agregado && (
                <div className="btn-added-notif">
                  <Check size={18} /> ¡Agregado al carrito con éxito!
                </div>
              )}
            </div>
          ) : (
            <div className="detail-actions" style={{ opacity: 0.7 }}>
              <p style={{ textAlign: 'center', fontWeight: '600', color: 'var(--accent-rose)', marginBottom: '12px' }}>
                Este producto se encuentra temporalmente agotado.
              </p>
              <button className="btn-primary" disabled style={{ justifyContent: 'center' }}>
                Agotado
              </button>
            </div>
          )}
          
          <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
            <Link to="/carrito" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Ir al Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
// Clickable link to file: [ProductDetail.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/pages/ProductDetail.jsx)
