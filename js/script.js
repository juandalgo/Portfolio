document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.mix');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Eliminar clase active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir al seleccionado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    if (card.classList.contains(filterValue)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// Sistema de Ceniza (Ash Particles)
const canvas = document.getElementById('ash-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    // Generar 60 partículas de ceniza
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.5,     // Radio (tamaño variable y pequeño)
            d: Math.random() * 20,          // Densidad (para el balanceo en el aire)
            vx: Math.random() * 1 - 0.5,    // Deriva horizontal
            vy: Math.random() * 1 + 0.2     // Velocidad de caída
        });
    }

    let angle = 0;
    function drawAsh() {
        ctx.clearRect(0, 0, width, height);
        // Color grisáceo/blanco roto con transparencia para dar efecto polvo
        ctx.fillStyle = 'rgba(180, 180, 180, 0.4)'; 
        ctx.beginPath();
        
        angle += 0.01;
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            
            // Físicas: caída más balanceo sinusoidal (como una hoja o ceniza suave)
            p.y += Math.cos(angle + p.d) * 0.5 + p.vy;
            p.x += Math.sin(angle) * 0.5 + p.vx;
            
            // Si la ceniza sale por debajo o por un lado, reiniciar arriba
            if (p.x > width || p.x < 0 || p.y > height) {
                particles[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, vx: p.vx, vy: p.vy };
            }
        }
        ctx.fill();
        requestAnimationFrame(drawAsh);
    }

    drawAsh();

    // Reajustar el lienzo si el usuario redimensiona la ventana
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}
