# Tienda React E-commerce

Aplicación de comercio electrónico desarrollada con React 19 y Vite, diseñada como versión final de entrega para Talento Lab.

## Características implementadas

- Carrito de compras global con Context API.
- Autenticación de usuarios con Firebase Authentication, y fallback local si no se configura Firebase.
- Rutas protegidas para perfil y panel de administración.
- CRUD completo de productos: crear, leer, editar y eliminar.
- Modal de confirmación antes de eliminar productos.
- Gestión de catálogo con búsqueda en tiempo real y paginación.
- Diseño responsivo y moderno, con React Bootstrap y styled-components.
- SEO básico usando React Helmet Async.
- Persistencia de datos local y carga inicial desde `public/productos.json`.

## Navegación principal

- **Inicio**: presentación del proyecto.
- **Productos**: catálogo con filtros, búsqueda y paginación.
- **Detalle de producto**: vista completa del producto con control de cantidad y añadir al carrito.
- **Carrito**: revisión de productos, checkout simulado y gestión de productos seleccionados.
- **Login / Registro**: acceso y creación de cuentas.
- **Perfil**: ruta protegida para usuarios autenticados.
- **Gestión**: panel privado para administrar el catálogo.

## Estructura del proyecto

- `src/main.jsx` — entrada de la app.
- `src/App.jsx` — rutas y providers globales.
- `src/context/CartContext.jsx` — lógica y persistencia del carrito.
- `src/context/AuthContext.jsx` — autenticación y estado de usuario.
- `src/firebase/config.js` — configuración de Firebase.
- `src/firebase/productService.js` — servicio de productos con Firebase fallback.
- `src/pages` — páginas del sitio.
- `src/components` — componentes reutilizables.

## Requisitos de entorno

1. Copia `.env.example` a `.env`.
2. Completa las variables de entorno de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> Se incluyó `.env` en `.gitignore` para proteger datos sensibles.

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173`.

## Compilación de producción

```bash
npm run build
```

## Notas de implementación

- Si no se configura Firebase, la aplicación utiliza un fallback local mediante `localStorage` para productos y autenticación.
- El panel de administración permite agregar, editar y eliminar productos.
- La búsqueda filtra por nombre, categoría y descripción del producto.
- Los usuarios autenticados pueden acceder a `/perfil` y `/admin`.
