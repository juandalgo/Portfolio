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
