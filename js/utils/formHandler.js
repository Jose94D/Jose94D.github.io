import { currentLang } from './i18n.js';

export async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const successDiv = document.getElementById('form-success');
    
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = currentLang === 'es' 
        ? (submitBtn.getAttribute('data-es-loading') || '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...')
        : (submitBtn.getAttribute('data-en-loading') || '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...');

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            submitBtn.style.display = 'none';
            successDiv.style.display = 'block';
        } else {
            alert(currentLang === 'es' ? successDiv.getAttribute('data-es-error') : successDiv.getAttribute('data-en-error'));
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    } catch (error) {
        alert(currentLang === 'es' ? successDiv.getAttribute('data-es-connection-error') : successDiv.getAttribute('data-en-connection-error'));
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

export function initFormHandler() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}