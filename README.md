# Proyecto de Gestión de la Liga Nacional de Fútbol

Este proyecto es una aplicación web para gestionar y visualizar información sobre la Liga Nacional de Fútbol. La aplicación permite a los usuarios iniciar sesión, gestionar la liga, ver reportes y mucho más.

## Características

- **Iniciar sesión**: Formulario de inicio de sesión para los usuarios.
- **Navbar**: Barra de navegación con menús desplegables para acceder a diferentes secciones de la aplicación.
- **Gestión de la liga**: Funcionalidades para gestionar estadios, equipos, partidos y futbolistas.
- **Reportes**: Visualización de diferentes reportes sobre la liga, incluyendo la tabla de posiciones, partidos por equipos, y más.

## Tecnologías Utilizadas

- **Vue.js**: Framework de JavaScript utilizado para construir la interfaz de usuario.
- **Vue Router**: Biblioteca de enrutamiento para gestionar las rutas de la aplicación.
- **Bootstrap**: Framework CSS para el diseño y la disposición de la interfaz de usuario.
- **Pinia**: Biblioteca de gestión del estado para Vue.js.

## Instalación

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/nombre-del-proyecto.git
    cd nombre-del-proyecto
    ```

2. **Instalar dependencias**:
    ```bash
    npm install
    ```

3. **Ejecutar la aplicación en modo de desarrollo**:
    ```bash
    npm run dev
    ```

## Estructura del Proyecto

```
├── src
│   ├── assets
│   ├── components
│   │   ├── Login.vue
│   │   ├── Navbar.vue
│   │   ├── Principal.vue
│   │   ├── CrudEstadio.vue
│   │   ├── CrudPartido.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   ├── App.vue
│   ├── main.js
├── public
├── package.json
└── README.md
```

## Uso

1. **Inicio de Sesión**: Ingresa tus credenciales de usuario en el formulario de inicio de sesión. 
2. **Navegación**: Usa la barra de navegación para acceder a diferentes secciones de la aplicación.
3. **Gestión de la Liga**: Accede a las funcionalidades para gestionar estadios, equipos, partidos y futbolistas.
4. **Reportes**: Visualiza diferentes reportes sobre la liga desde el menú de reportes.