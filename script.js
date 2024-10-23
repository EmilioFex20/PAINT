const canvas = document.getElementById('myCanvas'); // Obtener el canvas
const ctx = canvas.getContext('2d'); // Obtener el contexto del canvas

let isDrawing = false; // Bandera para saber si el usuario está dibujando
let startX = 0;
let startY = 0;

let drawMode = 'free';

const drawModeSelect = document.getElementById('drawMode');
const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');

// Evento para borrar todo el lienzo
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
});

drawModeSelect.addEventListener('change', (e) => {
    drawMode = e.target.value;
});

// Evento al presionar el ratón
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if(drawMode === 'free'){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if(isDrawing && drawMode === 'free'){
        drawFree(e.offsetX, e.offsetY);
    }
});

// Evento al soltar el ratón
canvas.addEventListener('mouseup', (e) => {
    if (isDrawing){
        if(drawMode === 'line'){
            drawLine(startX, startY, e.offsetX, e.offsetY);
        }
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
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;
    ctx.stroke(); // Dibuja la línea en el canvas
}
// Función para dibujo libre
function drawFree(x, y) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = colorPicker.value; // Color de línea
    ctx.lineWidth = lineWidthInput.value; // Grosor de línea
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y);
}
// Establecer propiedades del trazo
ctx.lineWidth = 3; // Ancho del trazo
ctx.lineCap = 'round'; // Terminar los trazos con un borde redondeado