import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Modal, Table, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import NewProductForm from '../components/NewProductForm';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../firebase/productService';

const AdminPageWrapper = styled.div`
  padding: 40px 16px;
  min-height: calc(100vh - 160px);
`;

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProductos(data);
    } catch (error) {
      console.error(error);
      setNotification({ type: 'danger', message: 'No se pudieron cargar los productos. Intenta más tarde.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadProducts();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCreate = async (product) => {
    try {
      await createProduct(product);
      setNotification({ type: 'success', message: 'Producto agregado correctamente.' });
      setShowForm(false);
      await loadProducts();
    } catch (error) {
      console.error(error);
      setNotification({ type: 'danger', message: 'No se pudo agregar el producto.' });
    }
  };

  const handleEdit = async (product) => {
    try {
      await updateProduct(product);
      setNotification({ type: 'success', message: 'Producto actualizado correctamente.' });
      setEditTarget(null);
      await loadProducts();
    } catch (error) {
      console.error(error);
      setNotification({ type: 'danger', message: 'No se pudo actualizar el producto.' });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setNotification({ type: 'success', message: 'Producto eliminado correctamente.' });
      await loadProducts();
    } catch (error) {
      console.error(error);
      setNotification({ type: 'danger', message: 'No se pudo eliminar el producto.' });
    }
  };

  const activeProducts = useMemo(
    () => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [productos]
  );

  return (
    <AdminPageWrapper>
      <Helmet>
        <title>Panel de Administración | AETHER</title>
        <meta name="description" content="Panel privado para gestionar productos del catálogo." />
      </Helmet>

      <div className="page-title-section">
        <h1 className="page-title">Panel de Administración</h1>
        <p className="page-subtitle">Gestiona el catálogo con creación, edición y eliminación segura.</p>
      </div>

      {notification ? (
        <Alert
          variant={notification.type}
          onClose={() => setNotification(null)}
          dismissible
        >
          {notification.message}
        </Alert>
      ) : null}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Aquí puedes agregar productos nuevos o editar los existentes en el catálogo.
        </p>
        <Button className="btn-primary" onClick={() => { setEditTarget(null); setShowForm(true); }}>
          <FaPlus style={{ marginRight: 8 }} /> Nuevo Producto
        </Button>
      </div>

      <div style={{ marginTop: 28 }}>
        <Table responsive bordered hover variant="dark" className="admin-product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>
                  Cargando productos...
                </td>
              </tr>
            ) : activeProducts.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>
                  No hay productos disponibles.
                </td>
              </tr>
            ) : (
              activeProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td style={{ textTransform: 'capitalize' }}>{product.categoria}</td>
                  <td>${product.precio.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => {
                        setEditTarget(product);
                        setShowForm(true);
                      }}
                      style={{ marginRight: 8 }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editTarget ? 'Editar producto' : 'Agregar producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProductForm
            initialData={editTarget}
            onAdd={async (product) => {
              if (editTarget) {
                await handleEdit({ ...editTarget, ...product });
              } else {
                await handleCreate(product);
              }
            }}
            onCancel={() => setShowForm(false)}
            submitLabel={editTarget ? 'Guardar cambios' : 'Crear producto'}
          />
        </Modal.Body>
      </Modal>
    </AdminPageWrapper>
  );
};

export default AdminPanel;