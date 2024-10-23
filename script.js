const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let points = [];
let maxControlPoints = 3;

let drawing = false;
let bezierMode = false; // Modo Bézier
let shapeMode = 'free'; // Modos: 'free', 'circle', 'rectangle'
let fillShape = false; // Opción para rellenar la figura
let startX = 0, startY = 0; // Para rastrear la posición inicial al dibujar formas

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

// Borrar todo el lienzo
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    points = []; // Limpiar los puntos de control si se está en modo Bézier
});

// Activar o desactivar el modo Bézier
document.getElementById('drawBezier').addEventListener('click', () => {
    bezierMode = !bezierMode; // Alternar el modo de curvas de Bézier
    points = []; // Reiniciar los puntos de control
    shapeMode = 'free'; // Al usar Bézier, se desactivan los otros modos
    if (bezierMode) {
        document.getElementById('drawBezier').textContent = 'Modo Bézier: Activado';
    } else {
        document.getElementById('drawBezier').textContent = 'Modo Bézier: Desactivado';
    }
});

canvas.addEventListener('click', (e) => {
    if (bezierMode) {
        if (points.length < maxControlPoints) {
            points.push({ x: e.offsetX, y: e.offsetY });
            // Dibujar el punto de control en el canvas
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.stroke();

            // Si se han seleccionado 3 puntos, dibujar la curva de Bézier
            if (points.length === maxControlPoints) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[2].x, points[2].y);
                ctx.stroke();

                // Reiniciar los puntos
                points = [];
            }
        }
    }
});

// Cambiar el modo de dibujo
document.getElementById('freeDraw').addEventListener('click', () => {
    shapeMode = 'free';
    bezierMode = false;
});
document.getElementById('circleMode').addEventListener('click', () => {
    shapeMode = 'circle';
    bezierMode = false;
});
document.getElementById('rectangleMode').addEventListener('click', () => {
    shapeMode = 'rectangle';
    bezierMode = false;
});

// Alternar el fondo para figuras
document.getElementById('fillShape').addEventListener('change', (e) => {
    fillShape = e.target.checked;
});

// Evento al presionar el ratón
canvas.addEventListener('mousedown', (e) => {
    if (!bezierMode) {
        drawing = true;
        [startX, startY] = [e.offsetX, e.offsetY]; // Guardar la posición inicial
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (!bezierMode) {
        drawing = false;

        if (shapeMode === 'circle') {
            const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            if (fillShape) {
                ctx.fillStyle = ctx.strokeStyle; // Usar el mismo color para el fondo
                ctx.fill();
            }
            ctx.stroke();
        } else if (shapeMode === 'rectangle') {
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            if (fillShape) {
                ctx.fillStyle = ctx.strokeStyle; // Usar el mismo color para el fondo
                ctx.fillRect(startX, startY, width, height);
            }
            ctx.strokeRect(startX, startY, width, height);
        }
    }
});

// Evento para dibujar en movimiento en modo libre
canvas.addEventListener('mousemove', (e) => {
    if (!drawing || bezierMode || shapeMode !== 'free') return;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [startX, startY] = [e.offsetX, e.offsetY];
});

// Establecer propiedades del trazo
ctx.lineWidth = 3;
ctx.lineCap = 'round';
