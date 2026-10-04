"""Genera index.html a partir de data/*.json y templates/.

Uso:  python build.py

Diseño (SOLID):
  - ContentSource      -> contrato para cargar contenido (DIP).
  - JsonContentSource  -> una implementación: lee data/*.json (SRP).
  - HtmlRenderer       -> solo renderiza templates Jinja2 (SRP).
  - Artifact           -> par plantilla -> archivo de salida (OCP: agregar uno no toca el builder).
  - SiteBuilder        -> orquesta; depende de abstracciones (DIP, OCP).
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any, Callable, Protocol, Sequence

from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape

ROOT = Path(__file__).resolve().parent


class ContentSource(Protocol):
    def load(self) -> dict[str, Any]: ...


@dataclass(frozen=True)
class JsonContentSource:
    """Cada archivo data/<nombre>.json queda disponible como variable <nombre>."""

    data_dir: Path

    def load(self) -> dict[str, Any]:
        return {
            path.stem: json.loads(path.read_text(encoding="utf-8"))
            for path in sorted(self.data_dir.glob("*.json"))
        }


class HtmlRenderer:
    def __init__(self, templates_dir: Path) -> None:
        self._env = Environment(
            loader=FileSystemLoader(templates_dir),
            autoescape=select_autoescape(["html", "xml"]),
            undefined=StrictUndefined,  # falla si falta un dato en el JSON
            trim_blocks=True,
            lstrip_blocks=True,
        )

    def render(self, template: str, context: dict[str, Any]) -> str:
        return self._env.get_template(template).render(**context)


@dataclass(frozen=True)
class Artifact:
    """Un archivo que se genera: plantilla de entrada y nombre de salida."""

    template: str
    output: str


ARTIFACTS = (
    Artifact("base.html", "index.html"),
    Artifact("robots.txt", "robots.txt"),
    Artifact("sitemap.xml", "sitemap.xml"),
)


class SiteBuilder:
    def __init__(
        self,
        source: ContentSource,
        renderer: HtmlRenderer,
        output_dir: Path,
        artifacts: Sequence[Artifact] = ARTIFACTS,
        today: Callable[[], date] = date.today,
    ) -> None:
        self._source = source
        self._renderer = renderer
        self._output_dir = output_dir
        self._artifacts = artifacts
        self._today = today

    def build(self) -> list[Path]:
        context = {**self._source.load(), "build_date": self._today().isoformat()}
        written = []
        for artifact in self._artifacts:
            path = self._output_dir / artifact.output
            path.write_text(self._renderer.render(artifact.template, context), encoding="utf-8")
            written.append(path)
        return written


def main() -> None:
    builder = SiteBuilder(
        source=JsonContentSource(ROOT / "data"),
        renderer=HtmlRenderer(ROOT / "templates"),
        output_dir=ROOT,
    )
    for path in builder.build():
        print(f"Generado: {path.name}")


if __name__ == "__main__":
    main()
