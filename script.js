// Simulación de cambios de estado (activar/desactivar botones según estado)
let ligaActiva = false; // Cambiar esto para probar los estados

// Mostrar u ocultar elementos de la interfaz según el estado
if (!ligaActiva) {
    document.getElementById('iniciarLiga').style.display = 'block';
    document.getElementById('culminarLiga').style.display = 'none';
} else {
    document.getElementById('iniciarLiga').style.display = 'none';
    document.getElementById('culminarLiga').style.display = 'block';
}

// Cambiar el estado de los botones cuando se hace clic en "Iniciar sesión" o "Cerrar sesión"
document.getElementById('iniciarSesion').addEventListener('click', function () {
    document.getElementById('cerrarSesion').style.display = 'block';
    document.getElementById('iniciarSesion').style.display = 'none';
});

document.getElementById('cerrarSesion').addEventListener('click', function () {
    document.getElementById('cerrarSesion').style.display = 'none';
    document.getElementById('iniciarSesion').style.display = 'block';
});

// Función para iniciar la liga
document.getElementById('iniciarLiga').addEventListener('click', function () {
    ligaActiva = true;
    alert('La liga ha comenzado');
    location.reload();
});

// Función para culminar la liga
document.getElementById('culminarLiga').addEventListener('click', function () {
    ligaActiva = false;
    alert('La liga ha culminado');
    location.reload();
});