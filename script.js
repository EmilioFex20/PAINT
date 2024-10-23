const canvas = document.getElementById('myCanvas'); // Obtener el canvas
const ctx = canvas.getContext('2d'); // Obtener el contexto del canvas

let drawing = false; // Bandera para saber si el usuario está dibujando
let lastX = 0, lastY = 0; // Para rastrear la última posición del ratón

// Cambiar el color del trazo al presionar un botón
document.getElementById('red').addEventListener('click', () => {
ctx.strokeStyle = 'red';
});

// Cambiar el grosor del trazo
document.getElementById('lineWidth').addEventListener('input', (e) => {
ctx.lineWidth = e.target.value;
});

// Evento para borrar todo el lienzo
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
});

// Evento al presionar el ratón
canvas.addEventListener('mousedown', (e) => {
    drawing = true; // Activar la bandera de dibujo
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Guardar la posición inicial
});

// Evento al soltar el ratón
canvas.addEventListener('mouseup', () => {
    drawing = false; // Desactivar la bandera de dibujo
});

// Evento al mover el ratón
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return; // Si no estamos dibujando, salimos de la función
    ctx.beginPath(); // Comenzar un nuevo camino
    ctx.moveTo(lastX, lastY); // Moverse a la última posición
    ctx.lineTo(e.offsetX, e.offsetY); // Dibujar hasta la nueva posición
    ctx.stroke(); // Realizar el trazo
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Actualizar la última posición
});

// Establecer propiedades del trazo
ctx.lineWidth = 3; // Ancho del trazo
ctx.lineCap = 'round'; // Terminar los trazos con un borde redondeado