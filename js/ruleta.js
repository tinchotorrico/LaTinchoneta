const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const options = [
    "OPCION 1",
    "OPCION 2",
    "OPCION 3",
    "OPCION 4",
    "OPCION 5",
    "OPCION 6"
];
const colors = ["#FFA07A", "#20B2AA", "#778899", "#9370DB", "#FF6347", "#3CB371"];
const segments = options.length;
const arc = Math.PI / (segments / 2);
let startAngle = 0;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < segments; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc, false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.translate(
            canvas.width / 2 + Math.cos(angle + arc / 2) * canvas.width / 2.5,
            canvas.height / 2 + Math.sin(angle + arc / 2) * canvas.height / 2.5
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);

    // Ajuste para determinar el índice basado en la posición derecha
    const degrees = (startAngle * 180) / Math.PI + 240;  // Ajustar el ángulo de referencia
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((degrees % 360) / arcd);
    
    // Calcular el índice de la opción ganadora ajustando la posición a la derecha
    const winningIndex = (index + segments / 2) % segments;
    
    ctx.save();
    ctx.font = "bold 30px Arial";
    const text = options[winningIndex];
    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinBtn.addEventListener("click", () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
});

drawWheel();
