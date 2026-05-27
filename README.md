**Tienda React E-commerce**

- **Descripción**: Una pequeña tienda en línea construida con React y Vite que permite navegar un catálogo de productos, ver detalles de cada producto y gestionar un carrito de compras en el cliente.

- **Características**: Interfaz responsive, catálogo estático (archivo `public/productos.json`), página de detalle de producto, añadir/eliminar productos del carrito y persistencia de estado en tiempo de vida de la sesión mediante Context API.

- **Principales vistas**: Inicio, Catálogo, Detalle de producto y Carrito.

**Estructura del proyecto**

- **Entrypoint**: [src/main.jsx](src/main.jsx) — inicializa la aplicación.
- **Componente principal**: [src/App.jsx](src/App.jsx).
- **Páginas**: [src/pages/Home.jsx](src/pages/Home.jsx), [src/pages/Catalog.jsx](src/pages/Catalog.jsx), [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx), [src/pages/Cart.jsx](src/pages/Cart.jsx).
- **Contexto**: [src/context/CartContext.jsx](src/context/CartContext.jsx) — lógica del carrito global.
- **Componentes reutilizables**: [src/components/Item.jsx](src/components/Item.jsx), [src/components/CartWidget.jsx](src/components/CartWidget.jsx), [src/components/NavBar.jsx](src/components/NavBar.jsx), [src/components/Layout.jsx](src/components/Layout.jsx), [src/components/Header.jsx](src/components/Header.jsx), [src/components/Footer.jsx](src/components/Footer.jsx).

**Cómo usar la página**

- Navegar el catálogo y hacer clic en un producto para ver su detalle.
- En la página de detalle, elegir cantidad y añadir al carrito.
- Abrir el carrito desde el icono en la barra de navegación para revisar, modificar cantidades o eliminar artículos.

**Instalación y ejecución**

Ejecuta estos comandos en la carpeta del proyecto:

```bash
npm install
npm run dev
# Abrir http://localhost:5173 en el navegador
```

**Archivos importantes**

- Datos de productos: `public/productos.json`.
- Configuración de Vite: `vite.config.js`.
