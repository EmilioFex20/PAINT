const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let points = [];
let maxControlPoints = 3;

let drawing = false; // Bandera para saber si el usuario está dibujando
let lastX = 0, lastY = 0; // Para rastrear la última posición del ratón
let bezierMode = false; // Bandera para el modo de curvas de Bézier

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
    points = []; // Limpiar los puntos de control si se está en modo Bézier
});

// Activar o desactivar el modo Bézier
document.getElementById('drawBezier').addEventListener('click', () => {
    bezierMode = !bezierMode; // Alternar el modo de curvas de Bézier
    points = []; // Reiniciar los puntos de control
    if (bezierMode) {
        document.getElementById('drawBezier').textContent = 'Modo Bézier: Activado';
    } else {
        document.getElementById('drawBezier').textContent = 'Modo Bézier: Desactivado';
    }
});

// Evento para registrar puntos de control con el mouse en modo Bézier
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

// Eventos para el dibujo normal fuera del modo Bézier
canvas.addEventListener('mousedown', (e) => {
    if (!bezierMode) { // Solo dibujar si no estamos en modo Bézier
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY]; // Guardar la posición inicial
    }
});

canvas.addEventListener('mouseup', () => {
    if (!bezierMode) {
        drawing = false;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing || bezierMode) return; // Si no estamos dibujando o estamos en modo Bézier, salir de la función
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Moverse a la última posición
    ctx.lineTo(e.offsetX, e.offsetY); // Dibujar hasta la nueva posición
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Actualizar la última posición
});

// Establecer propiedades del trazo
ctx.lineWidth = 3;
ctx.lineCap = 'round';
