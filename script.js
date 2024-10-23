const canvas = document.getElementById('myCanvas'); // Obtener el canvas
const ctx = canvas.getContext('2d'); // Obtener el contexto del canvas

let isDrawing = false; // Bandera para saber si el usuario está dibujando
let startX = 0;
let startY = 0;

// Cambiar el color del trazo al presionar un botón
document.getElementById('red').addEventListener('click', () => {
ctx.strokeStyle = 'red';
});

document.getElementById('green').addEventListener('click', () => {
ctx.strokeStyle = 'green';
});

document.getElementById('blue').addEventListener('click', () => {
    ctx.strokeStyle = 'blue';
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
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

// Evento al soltar el ratón
canvas.addEventListener('mouseup', (e) => {
    if (isDrawing){
        drawLine(startX, startY, e.offsetX, e.offsetY);
        isDrawing = false;
    }
});

// Si el usuario cancela antes de terminar la línea
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

// Función para dibujar la línea
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Mueve el lápiz al punto de inicio
    ctx.lineTo(x2, y2); // Dibuja la línea hasta el punto final
    ctx.stroke(); // Dibuja la línea en el canvas
}

// Evento al mover el ratón
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return; // Si no estamos dibujando, salimos de la función
    ctx.beginPath(); // Comenzar un nuevo camino
    ctx.moveTo(lastX, lastY); // Moverse a la última posición
    ctx.lineTo(e.offsetX, e.offsetY); // Dibujar hasta la nueva posición
    ctx.stroke(); // Realizar el trazo
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Actualizar la última posición
});

// Establecer propiedades del trazo
ctx.lineWidth = 3; // Ancho del trazo
ctx.lineCap = 'round'; // Terminar los trazos con un borde redondeado