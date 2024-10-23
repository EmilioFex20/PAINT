const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let shapeMode = 'free'; // Modos de dibujo: 'free', 'line', 'circle', 'rectangle', 'bezier'
let startX = 0, startY = 0;
let points = [];
let maxControlPoints = 3;
let fillShape = false; // Opción para rellenar las figuras
let bezierMode = false; // Modo de curvas Bézier

const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');

// Función para actualizar el estilo de dibujo
function setDrawingStyle() {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;
}

// Evento para borrar el lienzo
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    points = []; // Limpiar puntos de control para el modo Bézier
});

// Cambiar el modo de dibujo
document.getElementById('drawMode').addEventListener('change', (e) => {
    shapeMode = e.target.value;
    bezierMode = (shapeMode === 'drawBezier');
    points = []; // Reiniciar los puntos de control si se cambia el modo
});

// Evento al presionar el ratón
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY]; // Guardar la posición inicial
    if (shapeMode === 'free') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    } else if (shapeMode === 'drawBezier' && points.length < maxControlPoints) {
        points.push({ x: e.offsetX, y: e.offsetY });
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        if (points.length === maxControlPoints) {
            drawBezier();
        }
    }
});

// Evento para dibujar en movimiento en modo libre
canvas.addEventListener('mousemove', (e) => {
    if (!drawing || shapeMode !== 'free') return;
    drawFree(e.offsetX, e.offsetY);
});

// Evento al soltar el ratón
canvas.addEventListener('mouseup', (e) => {
    if (!drawing) return;
    drawing = false;
    if (shapeMode === 'line') {
        drawLine(startX, startY, e.offsetX, e.offsetY);
    } else if (shapeMode === 'circle') {
        drawCircle(startX, startY, e.offsetX, e.offsetY);
    } else if (shapeMode === 'rectangle') {
        drawRectangle(startX, startY, e.offsetX, e.offsetY);
    }
});

// Función para dibujar en modo libre
function drawFree(x, y) {
    setDrawingStyle();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Función para dibujar líneas rectas
function drawLine(x1, y1, x2, y2) {
    setDrawingStyle();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Función para dibujar círculos
function drawCircle(x1, y1, x2, y2) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    setDrawingStyle();
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    if (fillShape) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
    }
    ctx.stroke();
}

// Función para dibujar rectángulos
function drawRectangle(x1, y1, x2, y2) {
    const width = x2 - x1;
    const height = y2 - y1;
    setDrawingStyle();
    if (fillShape) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(x1, y1, width, height);
    }
    ctx.strokeRect(x1, y1, width, height);
}

// Función para dibujar curvas de Bézier
function drawBezier() {
    setDrawingStyle();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[2].x, points[2].y);
    ctx.stroke();
    points = []; // Reiniciar puntos después de dibujar la curva
}

// Establecer propiedades del trazo
ctx.lineWidth = 3;
ctx.lineCap = 'round';