#!/usr/bin/env python3
"""Validate generated routes and essential technical SEO."""
from pathlib import Path
from urllib.parse import urlparse
from lxml import html
import generate_static_pages as site

ROOT = Path(__file__).resolve().parent
errors = []

for route in site.ROUTES:
    path = ROOT / "index.html" if route == "/" else ROOT / route.strip("/") / "index.html"
    if not path.exists():
        errors.append(f"{route}: missing file")
        continue
    document = html.parse(str(path)).getroot()
    expected = {
        "h1": 1,
        "title": 1,
        "description": 1,
        "canonical": 1,
        "panel": 1,
    }
    actual = {
        "h1": len(document.xpath("//main//h1")),
        "title": len(document.xpath("//title")),
        "description": len(document.xpath("//meta[@name='description']")),
        "canonical": len(document.xpath("//link[@rel='canonical']")),
        "panel": len(document.xpath("//main/section[contains(@class,'tab-panel')]")),
    }
    for name, count in expected.items():
        if actual[name] != count:
            errors.append(f"{route}: {name} count is {actual[name]}, expected {count}")
    ids = document.xpath("//*[@id]/@id")
    if len(ids) != len(set(ids)):
        errors.append(f"{route}: duplicate element IDs")
    canonicals = document.xpath("//link[@rel='canonical']/@href")
    if canonicals and canonicals[0] != site.BASE_URL + route:
        errors.append(f"{route}: incorrect canonical {canonicals[0]}")
    for href in document.xpath("//a[starts-with(@href,'/')]/@href"):
        clean = urlparse(href).path
        if clean not in site.ROUTES and clean not in {"/favicon.svg"}:
            errors.append(f"{route}: internal link has no generated route: {href}")

if errors:
    print("\n".join(errors))
    raise SystemExit(1)
print(f"PASS: {len(site.ROUTES)} routes validated")
