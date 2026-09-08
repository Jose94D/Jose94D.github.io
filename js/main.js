import { initI18n, currentLang } from './utils/i18n.js';
import { initFormHandler } from './utils/formHandler.js';
import { initNavbar } from './components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Módulos
    initI18n();
    initNavbar();
    initFormHandler();

    // 2. Efecto spotlight del cursor en las tarjetas
    document.addEventListener('mousemove', e => {
        if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) return;

        const cards = document.querySelectorAll('.card, .project-card, .contact-grid, .hero-content, .profile-sidebar');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 3. Feedback al descargar el CV
    const cvDownloadBtn = document.getElementById('btn-cv');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const span = this.querySelector('span');
            const originalIconClass = icon.className;

            icon.className = 'fas fa-spinner fa-spin';
            span.innerText = currentLang === 'es' ? 'Descargando...' : 'Downloading...';
            this.style.pointerEvents = 'none';

            setTimeout(() => {
                icon.className = originalIconClass;
                span.innerText = currentLang === 'es' ? span.getAttribute('data-es') : span.getAttribute('data-en');
                this.style.pointerEvents = 'auto';
            }, 2500);
        });
    }

    // 4. Lógica del Carrusel de Imágenes
    const track = document.getElementById('img-track');
    const prevBtn = document.getElementById('imgPrevBtn');
    const nextBtn = document.getElementById('imgNextBtn');
    let currentSlide = 0;

    if (track && prevBtn && nextBtn) {
        const slides = Array.from(track.children);
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === slides.length - 1;
        }

        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        updateCarousel();
    }
});