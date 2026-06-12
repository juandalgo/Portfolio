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

// Sistema Fuego Creativo: Ascuas y Ceniza focalizada
const canvas = document.getElementById('ash-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles = [];
    const emberCount = 100; // Gran volumen de fuego
    const ashCount = 40;    // Poca ceniza muerta

    for (let i = 0; i < emberCount + ashCount; i++) {
        let isEmber = i < emberCount;
        particles.push({
            isEmber: isEmber,
            // Las ascuas nacen en el centro inferior. La ceniza cae en cualquier sitio.
            x: isEmber ? (width / 2) + (Math.random() * 200 - 100) : Math.random() * width,
            y: isEmber ? height + Math.random() * 100 : Math.random() * height,
            r: isEmber ? Math.random() * 2 + 0.8 : Math.random() * 2 + 0.5, // Tamaño
            d: Math.random() * 20, 
            // Las ascuas se abren hacia los lados; la ceniza cae más recta
            vx: isEmber ? (Math.random() - 0.5) * 1.5 : Math.random() * 1 - 0.5,
            vy: isEmber ? Math.random() * 2 + 1.2 : Math.random() * 1 + 0.2, 
            maxOpacity: isEmber ? Math.random() * 0.8 + 0.2 : Math.random() * 0.4 + 0.1
        });
    }

    let angle = 0;
    function drawFire() {
        ctx.clearRect(0, 0, width, height);
        angle += 0.02; // Acelera el parpadeo del fuego

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            
            if (p.isEmber) {
                // Físicas del fuego de abajo arriba, ensanchándose
                p.y -= p.vy;
                p.x += p.vx + Math.sin(angle + p.d) * 0.5;
                
                // Magia visual: pierden brillo conforme suben (Y se acerca a 0)
                let life = Math.max(0, p.y / height); // 1 abajo, 0 arriba
                let currentOpacity = p.maxOpacity * life;
                
                // Color super caliente con luz dinámica
                ctx.fillStyle = `rgba(255, 100, 30, ${currentOpacity})`;
                ctx.shadowBlur = 15 * life; // Brilla más cuanto más bajo
                ctx.shadowColor = `rgba(255, 69, 0, ${life})`;
            } else {
                // La ceniza gris de arriba abajo
                p.y += p.vy;
                p.x += Math.sin(angle) * 0.5 + p.vx;
                ctx.fillStyle = `rgba(150, 150, 150, ${p.maxOpacity})`;
                ctx.shadowBlur = 0;
            }

            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();
            
            // Reciclaje de partículas invisibles
            if (p.isEmber) {
                // Si el ascua desaparece arriba o en los lados, vuelve al origen del fuego
                if (p.y < 0 || p.x < 0 || p.x > width) {
                    p.x = (width / 2) + (Math.random() * 100 - 50); // Núcleo térmico
                    p.y = height + 10;
                }
            } else {
                // La ceniza vuelve al cielo
                if (p.y > height) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
            }
        }
        requestAnimationFrame(drawFire);
    }

    drawFire();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}
