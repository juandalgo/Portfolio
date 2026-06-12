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

// Sistema de Ceniza y Ascuas (DS3 Style)
const canvas = document.getElementById('ash-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
        // 20% de probabilidad de ser un ascua incandescente (ember)
        const isEmber = Math.random() < 0.2; 
        
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.5,     
            d: Math.random() * 20,          
            vx: Math.random() * 1 - 0.5,    
            vy: Math.random() * 1 + 0.2,    
            isEmber: isEmber,
            // Asigna color: naranja/carmesí con distina opacidad para las ascuas, y grises para la ceniza
            color: isEmber 
                ? `rgba(226, 88, 34, ${Math.random() * 0.7 + 0.3})` 
                : `rgba(180, 180, 180, ${Math.random() * 0.4 + 0.1})`
        });
    }

    let angle = 0;
    function drawAsh() {
        ctx.clearRect(0, 0, width, height);
        angle += 0.01;
        
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            ctx.beginPath();
            ctx.fillStyle = p.color;
            
            // Si es un ascua, aplicamos un halo de luz de renderizado por hardware
            if (p.isEmber) {
                ctx.shadowBlur = 12;
                ctx.shadowColor = 'rgba(255, 69, 0, 0.8)';
                
                // Las ascuas flotan hacia ARRIBA y de forma más errática
                p.y -= (p.vy * 0.8);
                p.x += Math.sin(angle * 2 + p.d) * 1;
            } else {
                // Quitamos el glow para que no afecte a la ceniza (ahorra cálculo)
                ctx.shadowBlur = 0;
                
                // La ceniza cae hacia ABAJO pesadamente
                p.y += Math.cos(angle + p.d) * 0.5 + p.vy;
                p.x += Math.sin(angle) * 0.5 + p.vx;
            }

            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();
            
            // Control de límites (reposicionamiento infinito)
            if (p.x > width + 10 || p.x < -10 || p.y > height + 10 || p.y < -10) {
                if (p.isEmber) {
                    // Ascuas renacen abajo para flotar alto
                    particles[i].x = Math.random() * width;
                    particles[i].y = height + 10;
                } else {
                    // Ceniza renace arriba para caer
                    particles[i].x = Math.random() * width;
                    particles[i].y = -10;
                }
            }
        }
        requestAnimationFrame(drawAsh);
    }

    drawAsh();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}
