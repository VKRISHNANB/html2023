document.addEventListener('DOMContentLoaded', () => {
// Initialize Lenis.js
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => t, // Linear easing function
});

// Raf loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Listen for scroll events
lenis.on('scroll', (e) => {
    console.log('Scrolling...', e);
});
});
