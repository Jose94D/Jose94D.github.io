export let currentLang = 'es';

export function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    
    // 1. Cambiar atributo de idioma del HTML y UI del botón
    document.documentElement.lang = currentLang;
    const langText = document.getElementById('lang-text');
    if (langText) langText.innerText = currentLang === 'es' ? 'EN' : 'ES';

    // 2. Actualizar SEO y Metadatos Dinámicos en el <head>
    const titleEl = document.getElementById('page-title');
    const descEl = document.getElementById('meta-desc');
    const ogTitleEl = document.getElementById('og-title');
    const ogDescEl = document.getElementById('og-desc');
    const twTitleEl = document.getElementById('tw-title');
    const twDescEl = document.getElementById('tw-desc');

    if (titleEl && titleEl.getAttribute(`data-${currentLang}`)) {
        titleEl.innerText = titleEl.getAttribute(`data-${currentLang}`);
    }
    if (descEl && descEl.getAttribute(`data-${currentLang}`)) {
        descEl.setAttribute('content', descEl.getAttribute(`data-${currentLang}`));
    }
    if (ogTitleEl && ogTitleEl.getAttribute(`data-${currentLang}`)) {
        ogTitleEl.setAttribute('content', ogTitleEl.getAttribute(`data-${currentLang}`));
    }
    if (ogDescEl && ogDescEl.getAttribute(`data-${currentLang}`)) {
        ogDescEl.setAttribute('content', ogDescEl.getAttribute(`data-${currentLang}`));
    }
    if (twTitleEl && twTitleEl.getAttribute(`data-${currentLang}`)) {
        twTitleEl.setAttribute('content', twTitleEl.getAttribute(`data-${currentLang}`));
    }
    if (twDescEl && twDescEl.getAttribute(`data-${currentLang}`)) {
        twDescEl.setAttribute('content', twDescEl.getAttribute(`data-${currentLang}`));
    }

    // 3. Traducir textos del cuerpo de la página
    const elements = document.querySelectorAll('[data-es], [data-en]');
    elements.forEach(el => {
        if (currentLang === 'en' && el.getAttribute('data-en')) {
            el.innerText = el.getAttribute('data-en');
        } else if (currentLang === 'es' && el.getAttribute('data-es')) {
            el.innerText = el.getAttribute('data-es');
        }
    });

    // 4. Traducir placeholders de formularios
    const inputs = document.querySelectorAll('[data-es-placeholder], [data-en-placeholder]');
    inputs.forEach(input => {
        if (currentLang === 'en' && input.getAttribute('data-en-placeholder')) {
            input.setAttribute('placeholder', input.getAttribute('data-en-placeholder'));
        } else if (currentLang === 'es' && input.getAttribute('data-es-placeholder')) {
            input.setAttribute('placeholder', input.getAttribute('data-es-placeholder'));
        }
    });

    // 5. Traducir etiquetas ARIA de accesibilidad y botón de idioma
    const ariaElements = document.querySelectorAll('[data-es-aria], [data-en-aria]');
    ariaElements.forEach(el => {
        if (currentLang === 'en' && el.getAttribute('data-en-aria')) {
            el.setAttribute('aria-label', el.getAttribute('data-en-aria'));
        } else if (currentLang === 'es' && el.getAttribute('data-es-aria')) {
            el.setAttribute('aria-label', el.getAttribute('data-es-aria'));
        }
    });

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        if (currentLang === 'en' && langToggleBtn.getAttribute('data-en-aria')) {
            langToggleBtn.setAttribute('aria-label', langToggleBtn.getAttribute('data-en-aria'));
        } else if (currentLang === 'es' && langToggleBtn.getAttribute('data-es-aria')) {
            langToggleBtn.setAttribute('aria-label', langToggleBtn.getAttribute('data-es-aria'));
        }
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn && submitBtn.disabled) {
        submitBtn.innerHTML = currentLang === 'es' 
            ? (submitBtn.getAttribute('data-es-loading') || '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...')
            : (submitBtn.getAttribute('data-en-loading') || '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...');
    }

    // Actualizar URL del CV según el idioma
    const btnCv = document.getElementById('btn-cv');
    if (btnCv) {
        btnCv.href = currentLang === 'es' ? btnCv.getAttribute('data-href-es') : btnCv.getAttribute('data-href-en');
    }

    // 6. Actualizar la URL de forma silenciosa
    const url = new URL(window.location);
    if (currentLang === 'en') {
        url.searchParams.set('lang', 'en');
    } else {
        url.searchParams.delete('lang');
    }
    window.history.pushState({}, '', url);
}

export function initI18n() {
    // Auto-detección si el usuario entra mediante un enlace con ?lang=en
    const params = new URLSearchParams(window.location.search);
    if (params.get('lang') === 'en' && currentLang !== 'en') {
        toggleLanguage();
    }

    // Asignar evento al botón de cambio de idioma
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.removeEventListener('click', toggleLanguage); // Evita duplicar listeners si se inicializa varias veces
        langBtn.addEventListener('click', toggleLanguage);
    }
}