const herName = "Andrea: My Beautiful Princess";  // Replace with her actual name!

// Update page title and heading dynamically
document.title = `10 Reasons I Love You, ${herName} 💗`;
document.getElementById("mainTitle").innerText = `10 Reasons I Love You, ${herName} 💗`;

// Reasons and photos
const reasons = [
    "Seeing you makes my day all the better 🌞🌞🌞🌞",
    "You always support me no matter what I do and have confidence in me even when I don't! 💗💗💗💖💖💝",
    "We made it this far and even though we have our ups and downs, I am never giving up on you 💝💝💝🙂‍↕️",
    "I love how you're always so kind to everybody and even though you have a lot going on, you still treat me with compassion 💕💕",
    "You're so drop-dead gorgeous hehe mwah 💋",
    "You truly have the most beautiful heart out of anybody I ever know. Don't let anyone change that!💓",
    "You make every moment special and I love sharing every little thing that happens to me with youuuuu🎉",
    "I admire how hardworking you are. Even though you work so so so much, you always make time to respond to me and to talk to me (esp at night when your exhausted!!)",
    "You understand me better than anyone else on the planetttttt🫶",
    "I love you more and more as the days go on babe❤️"
];

const images = [
    "images/photo1.gif",
    "images/photo2.gif",
    "images/photo3.gif",
    "images/photo4.gif",
    "images/photo5.gif",
    "images/photo6.gif",
    "images/photo7.gif",
    "images/photo8.gif",
    "images/photo9.gif",
    "images/photo10.gif"
];

let clickedHearts = new Set();

function showReason(number) {
    // Hide the clicked heart button
    const heartBtn = document.querySelector(`.heart-container button:nth-child(${number})`);
    if (heartBtn) {
        heartBtn.style.visibility = 'hidden';
        heartBtn.disabled = true; // disable click
    }

    // Show reason text and image
    document.getElementById("reasonText").innerText = reasons[number - 1];
    const img = document.getElementById("reasonImage");
    img.src = images[number - 1];
    img.style.display = "block";

    // Confetti burst
    confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#ff69b4', '#ff1493', '#ffd700'],
        origin: { y: 0.6 }
    });

    // Track clicked hearts
    clickedHearts.add(number);

    // Surprise final message & fireworks if all hearts clicked
    if (clickedHearts.size === 10) {
        setTimeout(() => {
            alert(`Surprise, ${herName}! You’ve found all the reasons. Just wanted to say... I love you endlessly! ❤️`);
            launchFireworks();
        }, 500);
    }
}

// ----------- Fireworks celebration -----------
function launchFireworks() {
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 200,
            spread: 160,
            startVelocity: 30,
            colors: ['#ff69b4', '#ff1493', '#ffd700', '#00ffff', '#00ff00'],
            origin: {
                x: Math.random(),
                y: Math.random() * 0.6
            }
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// ----------- Starry Night Background -----------

const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');

function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.radius = Math.random() * 1.2;
        this.alpha = Math.random();
        this.alphaChange = 0.01 + Math.random() * 0.02;
    }
    draw() {
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        starCtx.fill();
    }
    update() {
        this.alpha += this.alphaChange;
        if (this.alpha <= 0 || this.alpha >= 1) {
            this.alphaChange = -this.alphaChange;
        }
    }
}

const stars = [];
const maxStars = 150;

for (let i = 0; i < maxStars; i++) {
    stars.push(new Star());
}

// --- Shooting Star Class ---

class ShootingStar {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height / 2; // top half
        this.len = Math.random() * 80 + 50;
        this.speed = Math.random() * 10 + 6;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 0;
        this.opacitySpeed = 0.03;
        this.active = false;
    }
    start() {
        this.active = true;
    }
    update() {
        if (!this.active) return;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        if (this.opacity < 1 && this.opacitySpeed > 0) {
            this.opacity += this.opacitySpeed;
        } else if (this.opacity >= 1) {
            this.opacitySpeed = -this.opacitySpeed;
        }

        if (this.opacity <= 0) {
            this.reset();
            this.active = false;
        }

        if (this.x > starCanvas.width + this.len || this.y > starCanvas.height + this.len) {
            this.reset();
            this.active = false;
        }
    }
    draw() {
        if (!this.active) return;
        starCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        starCtx.lineWidth = 2;
        starCtx.beginPath();
        starCtx.moveTo(this.x, this.y);
        starCtx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
        starCtx.stroke();
    }
}

const shootingStars = [];
const maxShootingStars = 3;

for (let i = 0; i < maxShootingStars; i++) {
    shootingStars.push(new ShootingStar());
}

function tryStartShootingStar() {
    shootingStars.forEach(star => {
        if (!star.active && Math.random() < 0.005) {
            star.start();
        }
    });
}

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });
    tryStartShootingStar();
    requestAnimationFrame(animateStars);
}

animateStars();

// ----------- Floating Hearts Animation -----------

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        ctx.globalAlpha = heart.opacity;
        ctx.fillStyle = "#ff69b4";
        ctx.beginPath();
        ctx.moveTo(heart.x, heart.y);
        ctx.bezierCurveTo(heart.x + heart.size / 2, heart.y - heart.size,
                          heart.x + heart.size, heart.y + heart.size / 2,
                          heart.x, heart.y + heart.size);
        ctx.bezierCurveTo(heart.x - heart.size, heart.y + heart.size / 2,
                          heart.x - heart.size / 2, heart.y - heart.size,
                          heart.x, heart.y);
        ctx.fill();

        heart.y -= heart.speed;

        if (heart.y < -20) hearts.splice(index, 1);
    });
    requestAnimationFrame(drawHearts);
}

setInterval(() => hearts.push(createHeart()), 300);
drawHearts();