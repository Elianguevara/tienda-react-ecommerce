import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
import NewProductForm from '../components/NewProductForm';

const Catalog = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  useEffect(() => {
    setLoading(true);
    fetch('/productos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        return response.json();
      })
      .then((data) => {
        // Simular un breve retraso para mostrar la animacion de carga premium
        setTimeout(() => {
          // combinar con productos locales guardados en localStorage
          const local = JSON.parse(localStorage.getItem('productos_local') || '[]');
          const map = new Map();
          data.forEach((p) => map.set(p.id, p));
          local.forEach((p) => map.set(p.id, p));
          setProductos(Array.from(map.values()));
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);

  const loadLocalProductos = () => JSON.parse(localStorage.getItem('productos_local') || '[]');

  const handleAddProduct = (nuevo) => {
    // guardar en localStorage (solo los locales)
    const actuales = loadLocalProductos();
    const nuevosLocales = [nuevo, ...actuales];
    localStorage.setItem('productos_local', JSON.stringify(nuevosLocales));

    // actualizar estado para que se vea inmediatamente
    setProductos((prev) => [nuevo, ...prev]);
    setShowForm(false);
  };

  const categorias = ['todos', ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter((p) => p.categoria === categoriaSeleccionada);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Estableciendo conexión con el catálogo...</p>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <div className="page-title-section">
        <h1 className="page-title">Catálogo AETHER</h1>
        <p className="page-subtitle">Explora nuestra colección curada de dispositivos inteligentes de diseño.</p>
      </div>

      <div className="catalog-layout">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div />
          <div>
            <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
              {showForm ? 'Cerrar formulario' : 'Añadir producto'}
            </button>
          </div>
        </div>

        {showForm && (
          <div style={{ marginBottom: '18px' }}>
            <NewProductForm onAdd={handleAddProduct} onCancel={() => setShowForm(false)} />
          </div>
        )}
        {/* Category Filters */}
        <div className="category-filter-bar">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`filter-btn ${categoriaSeleccionada === cat ? 'active' : ''}`}
            >
              {cat === 'todos' ? 'Todos los productos' : cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {productosFiltrados.length > 0 ? (
          <div className="products-grid">
            {productosFiltrados.map((producto) => (
              <Item key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No se encontraron productos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
// Clickable link to file: [Catalog.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/pages/Catalog.jsx)
