# Backend - API de Soccer League

Este es el backend de la aplicación **Soccer League**, construido con **NestJS** y **TypeScript**. Provee una API REST para gestionar estadios, equipos, partidos y futbolistas.

## Requisitos

- Node.js >= 18
- npm
- Base de datos configurada en `.env` (ej. PostgreSQL con Prisma)

## Instalación

```bash
cd backend
npm install
```

## Configuración

Copiar el archivo de ejemplo y ajustar variables:

```bash
cp .env.example .env
# editar .env con la información de la base de datos
```

## Ejecutar en modo desarrollo

```bash
npm run start:dev
```

El servidor se iniciará en `http://localhost:3000`.

## Compilación y producción

```bash
npm run build
npm run start:prod
```

## Tests

```bash
npm run test
npm run test:e2e
```

## Tecnologías

- NestJS
- TypeScript
- Prisma
- PostgreSQL (u otra base compatible)

## Licencia

MIT
