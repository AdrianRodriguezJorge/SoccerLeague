# Frontend - Soccer League UI

Esta es la aplicación frontend para **Soccer League**, construida con **Vue 3**, **Vite** y **TailwindCSS**. Provee una interfaz de usuario para gestionar estadios, equipos, partidos y futbolistas, y visualizar reportes.

## Requisitos

- Node.js >= 18
- npm

## Instalación

```bash
cd frontend
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173` (o el puerto indicado en la consola).

## Tecnologías

- Vue 3
- Vite
- TailwindCSS
- Pinia (state management)
- Vue Router

## Estructura del proyecto

```
src/
├─ assets/          # recursos estáticos
├─ common/          # componentes comunes (Navbar, Button, Table)
├─ components/      # componentes CRUD y de funcionalidades
├─ router/          # gestión de rutas
├─ stores/          # Pinia stores para datos
├─ views/           # vistas principales y reportes
├─ App.vue
└─ main.js
```

## Tests

> No se han configurado pruebas unitarias todavía.

## Licencia

MIT