const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let shapeMode = 'free';
let startX = 0, startY = 0;
let points = [];
let maxControlPoints = 3;
let fillShape = false;
let bezierMode = false;

const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');
const fillShapeCheckbox = document.getElementById('fillShape');

function setDrawingStyle() {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;
}

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    points = []; 
});

document.getElementById('downloadImage').addEventListener('click', () =>{
    const link = document.createElement('a');
    link.download = 'mi_dibujo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

document.getElementById('drawMode').addEventListener('change', (e) => {
    shapeMode = e.target.value;
    bezierMode = (shapeMode === 'drawBezier');
    points = []; 
});

fillShapeCheckbox.addEventListener('change', (e) => {
    fillShape = e.target.checked; 
});


canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY]; 
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
    if (fillShape) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
    }
    ctx.stroke();
}

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

function drawBezier() {
    setDrawingStyle();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[2].x, points[2].y);
    ctx.stroke();
    points = [];
}

const colorPickers = document.getElementById('colorPicker');
const preview = document.getElementById('preview');
    
    colorPicker.addEventListener('input', () => {
        preview.style.backgroundColor = colorPickers.value;
    });

const toggleButton = document.getElementById('toggleDarkMode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Modo Claro';
    } else {
        toggleButton.textContent = 'Modo Oscuro';
    }
});

ctx.lineWidth = 3;
ctx.lineCap = 'round';