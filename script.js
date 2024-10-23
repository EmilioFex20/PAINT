const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let shapeMode = 'free';
let startX = 0, startY = 0;
let puntos_control = [];
let max_puntos_control = 3;
let rellenar = false;
let bezierMode = false;

const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');
const fillShapeCheckbox = document.getElementById('rellenar');

function setDrawingStyle() {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;
}

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    puntos_control = [];
});

document.getElementById('drawMode').addEventListener('change', (e) => {
    shapeMode = e.target.value;
    bezierMode = (shapeMode === 'drawBezier');
    puntos_control = []; 
});

fillShapeCheckbox.addEventListener('change', (e) => {
    rellenar = e.target.checked;
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
    if (shapeMode === 'free') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    } else if (shapeMode === 'drawBezier' && puntos_control.length < max_puntos_control) {
        puntos_control.push({ x: e.offsetX, y: e.offsetY });
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        if (puntos_control.length === max_puntos_control) {
            drawBezier();
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing || shapeMode !== 'free') return;
    drawFree(e.offsetX, e.offsetY);
});

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

function drawFree(x, y) {
    setDrawingStyle();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function drawLine(x1, y1, x2, y2) {
    setDrawingStyle();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircle(x1, y1, x2, y2) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    setDrawingStyle();
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    if (rellenar) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
    }
    ctx.stroke();
}

function drawRectangle(x1, y1, x2, y2) {
    const width = x2 - x1;
    const height = y2 - y1;
    setDrawingStyle();
    if (rellenar) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(x1, y1, width, height);
    }
    ctx.strokeRect(x1, y1, width, height);
}

function drawBezier() {
    setDrawingStyle();
    ctx.beginPath();
    ctx.moveTo(puntos_control[0].x, puntos_control[0].y);
    ctx.bezierCurveTo(puntos_control[1].x, puntos_control[1].y, puntos_control[2].x, puntos_control[2].y, puntos_control[2].x, puntos_control[2].y);
    ctx.stroke();
    puntos_control = []; 
}

ctx.lineWidth = 3;
ctx.lineCap = 'round';
