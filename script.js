const firebaseConfig = { databaseURL: "https://m-legacy-5cf2b-default-rtdb.firebaseio.com/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const mover = document.getElementById('canvas-mover');
const mCanvas = document.getElementById('mainCanvas');
const mCtx = mCanvas.getContext('2d');

// ১০ মিলিয়ন পিক্সেল গ্রিড সেটআপ (যেমন: ৫০০০ x ২০০০ পিক্সেল)
mCanvas.width = 5000; 
mCanvas.height = 2000; 

let scale = 0.15, posX = 0, posY = 0, isDragging = false, startX, startY;

function drawGrid() {
    mCtx.strokeStyle = "#DDD"; mCtx.lineWidth = 0.5;
    for(let x=0; x<=5000; x+=10){ mCtx.beginPath(); mCtx.moveTo(x,0); mCtx.lineTo(x,2000); mCtx.stroke(); }
    for(let y=0; y<=2000; y+=10){ mCtx.beginPath(); mCtx.moveTo(0,y); mCtx.lineTo(5000,y); mCtx.stroke(); }
}

function update() { mover.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`; }
update();

document.getElementById('pixel-viewport').onwheel = (e) => {
    e.preventDefault();
    scale *= e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.05, Math.min(scale, 4));
    update();
};

document.getElementById('pixel-viewport').onmousedown = (e) => { isDragging = true; startX = e.clientX-posX; startY = e.clientY-posY; };
window.onmouseup = () => isDragging = false;
window.onmousemove = (e) => { if (isDragging) { posX = e.clientX - startX; posY = e.clientY - startY; update(); } };

function render() {
    mCtx.clearRect(0,0,5000,2000);
    drawGrid();
    // এখানে আপনার ডাটাবেস থেকে অ্যাপ্রুভড পিক্সেলগুলো আঁকা হবে
}
render();
