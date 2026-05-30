import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Item from '../components/Item';
import NewProductForm from '../components/NewProductForm';
import { fetchProducts, createProduct } from '../firebase/productService';
import { FaSearch } from 'react-icons/fa';

const Catalog = () => {
  const { user } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProductos(data);
      } catch (fetchError) {
        console.error(fetchError);
        setError('No se pudo cargar el catálogo. Intenta recargar la página.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddProduct = async (nuevo) => {
    try {
      const created = await createProduct(nuevo);
      setProductos((prev) => [created, ...prev]);
      setShowForm(false);
    } catch (createError) {
      console.error(createError);
      setError('No se pudo agregar el producto.');
    }
  };

  const resetPage = () => {
    if (page !== 1) setPage(1);
  };

  const categorias = useMemo(
    () => ['todos', ...new Set(productos.map((p) => p.categoria || '').filter(Boolean))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    const filtroCategoria = categoriaSeleccionada === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

    return filtroCategoria.filter((producto) => {
      const texto = `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLowerCase();
      return texto.includes(searchTerm.toLowerCase());
    });
  }, [productos, categoriaSeleccionada, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(productosFiltrados.length / itemsPerPage));
  const paginatedProducts = productosFiltrados.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
        <div className="catalog-toolbar">
          <div className="search-input-wrapper">
            <FaSearch size={16} className="search-icon" />
            <input
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                resetPage();
              }}
              aria-label="Buscar productos"
            />
          </div>
          {user && (
            <button className="btn-primary" onClick={() => setShowForm((current) => !current)}>
              {showForm ? 'Cerrar formulario' : 'Añadir producto'}
            </button>
          )}
        </div>

        {showForm && (
          <div style={{ marginBottom: '18px' }}>
            <NewProductForm onAdd={handleAddProduct} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <div className="category-filter-bar">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaSeleccionada(cat);
                resetPage();
              }}
              className={`filter-btn ${categoriaSeleccionada === cat ? 'active' : ''}`}
            >
              {cat === 'todos' ? 'Todos los productos' : cat}
            </button>
          ))}
        </div>

        {error ? (
          <div className="catalog-error-message">{error}</div>
        ) : null}

        {paginatedProducts.length > 0 ? (
          <div className="products-grid">
            {paginatedProducts.map((producto) => (
              <Item key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">
            <h3>No se encontraron productos.</h3>
            <p>Prueba otra búsqueda o cambia de categoría para encontrar lo que buscas.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>
            <span className="page-counter">
              Página {page} de {totalPages}
            </span>
            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
// Clickable link to file: [Catalog.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/pages/Catalog.jsx)
