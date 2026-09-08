# Portfolio Personal - Documentación Técnica

Sitio web de portfolio personal y profesional desarrollado con HTML5 semántico, CSS3 modular y JavaScript moderno (ES Modules). El sitio es totalmente responsivo, cuenta con soporte multilingüe (Español / Inglés), efectos visuales interactivos, un formulario de contacto integrado con Formspree y un sistema dinámico de gestión de galerías/carrusel de imágenes.

---

## 1. Arquitectura y Estructura de Archivos

El proyecto sigue una estructura modular para separar responsabilidades:

```text
├── index.html            # Estructura principal y marcado semántico
├── css/
│   ├── global.css        # Variables globales (:root), reset y estilos base
│   ├── layout.css        # Estructuras de contenedores, grid principal y navegación
│   ├── components.css    # Estilos específicos de componentes (tarjetas, botones, carrusel, etc.)
│   └── responsive.css    # Media queries y adaptabilidad para dispositivos móviles
└── js/
    ├── main.js           # Punto de entrada principal (Módulo raíz)
    ├── components/
    │   └── navbar.js     # Lógica de navegación y rastreo de secciones activas
    └── utils/
        ├── i18n.js       # Sistema de internacionalización (Español/Inglés)
        └── formHandler.js  # Lógica de validación y envío asíncrono del formulario
```

---

## 2. Componentes y Módulos Principales

### A. Estilos y Diseño (`global.css`, `layout.css`, `components.css`, `responsive.css`)
* **Variables CSS (`:root`):** Define una paleta de colores basada en tonos oscuros (`#070913`) con acentos en cian/azul claro (`#38bdf8`), efectos de brillo (glow), radios de borde estandarizados (16px) y transiciones fluidas.
* **Efecto Spotlight (Cursor):** Mediante JavaScript se calculan las coordenadas del cursor sobre las tarjetas (`.card`, `.project-card`, etc.) para generar un brillo dinámico radial alrededor del puntero.
* **Tipografía:** Utiliza las fuentes *Inter* para cuerpo de texto y *Plus Jakarta Sans* para títulos y encabezados (cargadas desde Google Fonts).
* **Diseño Responsivo:** Adaptado mediante Media Queries para pantallas de ancho inferior a 1024px, 900px, 768px y 480px, transformando distribuciones de grillas múltiples en columnas individuales (`1fr`) y ocultando elementos de navegación en pantallas compactas.

### B. Navegación (`navbar.js` & `layout.css`)
* Barra de navegación fija con efecto de desenfoque (`backdrop-filter`).
* **ScrollSpy:** Detecta la posición actual del scroll en la ventana para marcar automáticamente como `.active` el enlace correspondiente en la barra de navegación según la sección visible.

### C. Sistema Multilingüe e Internacionalización (`i18n.js`)
* Soporte nativo para Español (`es`) por defecto e Inglés (`en`).
* Traducción dinámica de textos mediante atributos personalizados (`data-es`, `data-en`) en los elementos del DOM.
* Actualización automática de metadatos SEO en el `<head>` (`<title>`, descripciones, etiquetas Open Graph y Twitter Cards).
* Cambio dinámico de los enlaces de descarga del CV (`CV_Jose_Manuel_Dinamarca_ES.pdf` / `CV_Jose_Manuel_Dinamarca_EN.pdf`).
* Gestión de parámetros en la URL (ej. `?lang=en`) para persistencia o carga directa en el idioma seleccionado.
* Actualización de etiquetas de accesibilidad (`aria-label`) y *placeholders* en formularios.

### D. Interactividad de Proyectos y Carrusel (`main.js`)
* **Carrusel de Imágenes:** Permite navegar de forma interactiva entre las capturas de pantalla de los proyectos destacados mediante botones de siguiente/anterior (`#imgPrevBtn`, `#imgNextBtn`) con transiciones fluidas basadas en transformaciones CSS (`translateX`).
* **Feedback de Descarga de CV:** Al hacer clic en el botón de descarga del currículum, cambia temporalmente el icono a un indicador de carga (`fa-spinner fa-spin`) y el texto a "Descargando..." / "Downloading..." durante 2.5 segundos.

### E. Gestión del Formulario de Contacto (`formHandler.js`)
* Integración con el servicio externo Formspree.
* Envío asíncrono mediante `fetch` para evitar recargas de página.
* Bloqueo y animación de carga en el botón de envío (`#submit-btn`).
* Manejo de estados de éxito o error con mensajes dinámicos adaptados al idioma activo.

---

## 3. Tecnologías y Librerías Utilizadas

* **HTML5 / CSS3 / JavaScript (ES6+ Modules)**
* **FontAwesome 6.0.0** (Iconografía)
* **Google Fonts** (*Inter* y *Plus Jakarta Sans*)
* **Formspree** (Backend como servicio para el envío de correos)