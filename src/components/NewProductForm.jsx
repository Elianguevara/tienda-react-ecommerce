import React, { useState } from 'react';

const NewProductForm = ({ onAdd, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const precioNum = parseFloat(String(precio).replace(',', '.'));
    const stockNum = parseInt(stock, 10);

    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!categoria.trim()) newErrors.categoria = 'La categoría es obligatoria.';
    if (Number.isNaN(precioNum) || precioNum < 0) newErrors.precio = 'Ingrese un precio válido (>= 0).';
    if (Number.isNaN(stockNum) || stockNum < 0) newErrors.stock = 'El stock debe ser un entero >= 0.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: Number(precioNum.toFixed(2)),
      stock: stockNum,
      imagen: imagen && imagen.trim() ? imagen.trim() : 'https://via.placeholder.com/600x400?text=Sin+imagen',
      descripcion: descripcion.trim() || '',
    };

    onAdd(nuevoProducto);

    // reset form
    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setImagen('');
    setDescripcion('');
    setErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // limitar tamaño a 2MB
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, imagen: 'La imagen debe ser menor a 2 MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagen(reader.result);
      setErrors((prev) => ({ ...prev, imagen: undefined }));
    };
    reader.onerror = () => {
      setErrors((prev) => ({ ...prev, imagen: 'No se pudo leer la imagen.' }));
    };
    reader.readAsDataURL(file);
  };

  const handlePrecioChange = (e) => {
    // permitir números y punto/coma
    const raw = e.target.value;
    const cleaned = raw.replace(/[^0-9,\.]/g, '');
    setPrecio(cleaned);
    if (errors.precio) setErrors((prev) => ({ ...prev, precio: undefined }));
  };

  const handleStockChange = (e) => {
    // solo dígitos, sin signo negativo
    const raw = e.target.value;
    const cleaned = raw.replace(/\D/g, '');
    setStock(cleaned);
    if (errors.stock) setErrors((prev) => ({ ...prev, stock: undefined }));
  };

  return (
    <form className="new-product-form" onSubmit={handleSubmit} aria-label="Formulario añadir producto">
      <h3>Añadir producto nuevo</h3>
      <div className="form-row">
        <label htmlFor="np-nombre">Nombre</label>
        <input id="np-nombre" aria-required="true" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        {errors.nombre && <small className="field-error">{errors.nombre}</small>}
      </div>
      <div className="form-row">
        <label htmlFor="np-categoria">Categoría</label>
        <input id="np-categoria" aria-required="true" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        {errors.categoria && <small className="field-error">{errors.categoria}</small>}
      </div>
      <div className="form-row">
        <label htmlFor="np-precio">Precio</label>
        <input id="np-precio" type="text" inputMode="decimal" aria-required="true" value={precio} onChange={handlePrecioChange} placeholder="0.00" required />
        {errors.precio && <small className="field-error">{errors.precio}</small>}
      </div>
      <div className="form-row">
        <label htmlFor="np-stock">Stock</label>
        <input id="np-stock" type="text" inputMode="numeric" value={stock} onChange={handleStockChange} placeholder="0" />
        {errors.stock && <small className="field-error">{errors.stock}</small>}
      </div>
      <div className="form-row full">
        <label htmlFor="np-file">Imagen (subir desde tu equipo)</label>
        <input id="np-file" type="file" accept="image/*" onChange={handleFileChange} />
        {errors.imagen && <small className="field-error">{errors.imagen}</small>}
      </div>

      <div className="form-row full">
        <label htmlFor="np-imagen">O URL de imagen (opcional)</label>
        <input id="np-imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://..." />
      </div>

      <div className="form-row full">
        <label htmlFor="np-descripcion">Descripción</label>
        <textarea id="np-descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>

      {/* Preview */}
      <div className="form-row full">
        <label>Vista previa</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.02)' }}>
            <img src={imagen || 'https://via.placeholder.com/600x400?text=Sin+imagen'} alt="preview" className="image-preview" />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>La imagen subida se convertirá en un recurso embebido (data URL) y se guardará en `localStorage`.</div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" aria-label="Añadir producto">Añadir producto</button>
        <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancelar">Cancelar</button>
      </div>
    </form>
  );
};

export default NewProductForm;
