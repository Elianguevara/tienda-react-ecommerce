import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Item = ({ producto }) => {
  const { id, nombre, precio, stock, imagen, descripcion, categoria } = producto;
  const { addToCart } = useContext(CartContext);
  const [agregado, setAgregado] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (stock > 0) {
      addToCart(producto, 1);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    }
  };

  return (
    <article className="product-card">
      <div className="card-img-wrapper">
        <img src={imagen} alt={nombre} className="card-image" loading="lazy" />
        <span className="card-badge">{categoria}</span>
        {stock <= 3 && stock > 0 && (
          <span className="card-stock-warning">¡Solo {stock} en stock!</span>
        )}
        {stock === 0 && (
          <span className="card-stock-warning" style={{ backgroundColor: 'rgba(244, 63, 94, 0.95)' }}>Agotado</span>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{nombre}</h3>
        <p className="card-desc">{descripcion}</p>
        <div className="card-footer">
          <span className="card-price">${precio.toFixed(2)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleQuickAdd}
              disabled={stock === 0}
              className={`btn-quick-add ${agregado ? 'added' : ''}`}
              title="Agregar al carrito"
            >
              {agregado ? <Check size={16} /> : <ShoppingBag size={16} />}
            </button>
            <Link to={`/producto/${id}`} className="btn-card-action">
              Ver Detalle <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Item;
// Clickable link to file: [Item.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/Item.jsx)
