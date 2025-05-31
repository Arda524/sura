// Create a dynamic starry background with shiny twinkling effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.body.firstChild); // Add canvas to the top of the body

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1'; // Send canvas to the background

const stars = [];
const numStars = 150;

// Resize canvas to match the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star class
class Star {
    constructor(x, y, size, opacity, flickerSpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = opacity;
        this.flickerSpeed = flickerSpeed;
        this.opacityDirection = 1; // 1 for increasing, -1 for decreasing
    }

    draw() {
        // Add a gradient for the shiny effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`); // Bright center
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.5})`); // Fading edge
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent edge

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    update() {
        // Update opacity to create a shiny twinkling effect
        this.opacity += this.flickerSpeed * this.opacityDirection;
        if (this.opacity >= 1 || this.opacity <= 0) {
            this.opacityDirection *= -1; // Reverse direction at opacity limits
        }
    }
}

// Generate stars
for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 2 + 1; // Random size between 1 and 3
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const opacity = Math.random(); // Random initial opacity
    const flickerSpeed = Math.random() * 0.02 + 0.01; // Random flicker speed between 0.01 and 0.03
    stars.push(new Star(x, y, size, opacity, flickerSpeed));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate();