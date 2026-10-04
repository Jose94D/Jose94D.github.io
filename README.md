# Portafolio – generador estático

Contenido en `data/*.json`, estructura en `templates/`, salida en `index.html`.

## Flujo de trabajo
1. `pip install -r requirements.txt`
2. Edita el JSON de la sección (p. ej. `data/projects.json`).
3. `python build.py`
4. Haz commit de `index.html` junto con los cambios (GitHub Pages sirve el archivo generado).

## Estructura
- `data/`        contenido bilingüe: `{"es": "...", "en": "..."}` (string plano = no se traduce)
- `templates/_i18n.html`        macros de traducción (`data-es` / `data-en`)
- `templates/_components.html`  componentes repetidos (títulos, tarjetas, tags)
- `templates/sections/`         una plantilla por sección
- `css/additions.css`           pegar al final de `css/components.css`

## Tareas comunes
- Nuevo proyecto: agregar un objeto a `projects` en `data/projects.json`.
- Nueva habilidad: agregar una línea en `data/skills.json`.
- Nuevo trabajo: agregar un objeto a `jobs` en `data/experience.json`.

Nota: los ids del carrusel (`imgPrevBtn`, `img-track`...) los usa `js/main.js`.
El primer proyecto conserva los ids originales; para varios carruseles hay que
pasar `main.js` a selectores por clase.
