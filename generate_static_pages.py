#!/usr/bin/env python3
"""Build crawlable standalone pages from the original OmniTools source template."""

from copy import deepcopy
from datetime import date
from pathlib import Path
import json
import re

from lxml import etree, html

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "site-template.html"
BASE_URL = "https://www.omnitechtools.com"

ROUTES = {
    "/": ("panel-dashboard", "Free Online Tools for Creators & Developers | OmniTools",
          "Free private browser-based tools for images, code, QR codes, documents and everyday calculations. No signup required."),
    "/qr-code-generator/": ("panel-qr-generator", "Free QR Code Generator with Logo & Custom Colours",
          "Create a custom QR code with your logo, colours and styles. Download a high-quality PNG or SVG without registration."),
    "/image-compressor/": ("panel-image-compressor", "Free Image Compressor – Compress JPG, PNG & WebP",
          "Compress JPG, PNG and WebP images securely in your browser. Reduce image size without uploading files or creating an account."),
    "/css-glassmorphism-generator/": ("panel-css-builder", "CSS Glassmorphism Generator – Create Glass Effects",
          "Create accessible glassmorphism CSS with live controls for blur, opacity, borders and backgrounds. Copy production-ready CSS."),
    "/compound-interest-calculator/": ("panel-finance-calc", "Compound Interest Calculator with Monthly Contributions",
          "Estimate investment growth, deposits and compound interest with adjustable contributions, rates and time periods."),
    "/json-formatter/": ("panel-json-formatter", "Free JSON Formatter, Validator & Beautifier Online",
          "Format, validate, beautify or minify JSON securely in your browser. Your JSON data is processed locally."),
    "/svg-blob-generator/": ("panel-svg-blob", "Free SVG Blob Generator – Create Organic Shapes",
          "Generate custom SVG blob shapes with gradients and adjustable complexity. Copy the SVG code or download the file."),
    "/color-palette-generator/": ("panel-color-palette", "Colour Palette Generator & WCAG Contrast Checker",
          "Generate harmonious colour palettes and check text contrast against WCAG AA and AAA thresholds."),
    "/password-generator/": ("panel-password-generator", "Secure Password Generator & Strength Checker",
          "Generate strong random passwords locally with custom length, characters and an easy-to-understand strength estimate."),
    "/base64-encoder-decoder/": ("panel-base64", "Free Base64 Encoder & Decoder Online",
          "Encode text or files to Base64 and decode Base64 locally in your browser. No input is uploaded to our server."),
    "/meta-tag-generator/": ("panel-meta-generator", "SEO Meta Tag Generator with Search Preview",
          "Create title, description, Open Graph and social meta tags with live search and sharing previews."),
    "/inflation-calculator/": ("panel-inflation-calc", "Inflation Calculator – Estimate Purchasing Power",
          "Estimate how inflation may affect future purchasing power using your chosen amount, rate and time period."),
    "/jwt-decoder/": ("panel-jwt-decoder", "Free JWT Decoder – Inspect JSON Web Tokens Locally",
          "Decode JWT headers and payloads locally in your browser for debugging. This tool does not verify token signatures."),
    "/markdown-editor/": ("panel-markdown-editor", "Free Live Markdown Editor & Preview",
          "Write Markdown and preview the formatted result live in your browser with no signup or document upload."),
    "/regex-tester/": ("panel-regex-tester", "Online JavaScript Regex Tester",
          "Test JavaScript regular expressions against sample text with live matches, flags and replacement output."),
    "/sql-formatter/": ("panel-sql-formatter", "Free SQL Formatter & Beautifier Online",
          "Format SQL queries for easier reading and debugging directly in your browser."),
    "/css-box-shadow/": ("panel-css-box-shadow", "CSS Box Shadow Generator with Live Preview",
          "Build layered CSS box shadows visually, preview the result and copy the generated CSS."),
    "/word-counter/": ("panel-word-counter", "Free Word & Character Counter with Reading Time",
          "Count words, characters, sentences and estimated reading time instantly in your browser."),
    "/lorem-ipsum/": ("panel-lorem-ipsum", "Free Lorem Ipsum Generator",
          "Generate placeholder paragraphs or words for mockups, layouts and design prototypes."),
    "/uuid-generator/": ("panel-uuid-generator", "Free UUID v4 Generator",
          "Generate cryptographically random UUID v4 identifiers locally in your browser."),
    "/url-encoder/": ("panel-url-encoder", "Free URL Encoder & Decoder Online",
          "Encode or decode URL components and special characters safely in your browser."),
    "/image-resizer/": ("panel-image-resizer", "Free Image Resizer – Resize Photos Locally",
          "Resize image width and height locally in your browser while preserving the aspect ratio when needed."),
    "/pdf-merge/": ("panel-pdf-merge", "Free PDF Merger – Combine PDFs Locally",
          "Combine multiple PDF files in your browser. Your documents are processed locally and are not uploaded."),
    "/unit-converter/": ("panel-unit-converter", "Free Unit Converter – Length, Weight & Temperature",
          "Convert common length, weight, temperature and digital storage units instantly."),
    "/youtube-thumbnail-downloader/": ("panel-youtube-thumbnail", "YouTube Thumbnail Downloader – Get Video Images",
          "View and download publicly available YouTube video thumbnails by pasting a video URL."),
    "/about/": ("panel-about", "About OmniTools – Private Browser-Based Utilities",
          "Learn why OmniTools provides practical, free utilities that process supported inputs locally in your browser."),
    "/privacy-policy/": ("panel-privacy", "Privacy Policy | OmniTools",
          "Read how OmniTools handles browser storage, analytics, advertising, contact details and locally processed tool inputs."),
    "/terms-of-service/": ("panel-terms", "Terms of Service | OmniTools",
          "Read the terms, acceptable-use rules and limitations that apply when using OmniTools."),
    "/contact/": ("panel-contact", "Contact OmniTools – Support & Feedback",
          "Contact OmniTools with a question, bug report, accessibility issue or feature request."),
    "/blog/": ("panel-blog", "OmniTools Guides – Web, Design, Privacy & Finance",
          "Practical guides for browser tools, web performance, design, digital privacy and personal-finance calculations."),
    "/blog/qr-codes-digital-marketing/": ("panel-blog-article-qr", "How to Use QR Codes in Digital Marketing",
          "Learn practical QR code design, placement and testing techniques for offline-to-online marketing."),
    "/blog/image-compression-performance/": ("panel-blog-article-compress", "Image Compression and Web Performance Guide",
          "Learn how image formats, dimensions and compression affect loading speed and Core Web Vitals."),
    "/blog/css-glassmorphism-trends/": ("panel-blog-article-glass", "Glassmorphism CSS: Design and Accessibility Guide",
          "Learn how to create glassmorphism interfaces while protecting readability, accessibility and performance."),
    "/blog/financial-independence-compound-growth/": ("panel-blog-article-fire", "Compound Growth and Financial Independence Guide",
          "Understand compound growth, regular contributions, inflation and the limits of retirement projections."),
    "/blog/developer-utilities-privacy/": ("panel-blog-article-privacy", "Client-Side Developer Tools and Data Privacy",
          "Understand the privacy benefits and limitations of browser-based developer utilities."),
    "/blog/json-formatting-guide/": ("panel-blog-article-json", "JSON Formatting and Validation Guide",
          "Learn common JSON syntax errors and how local formatting and validation tools help developers debug safely."),
    "/blog/svg-organic-blobs-design/": ("panel-blog-article-svg", "SVG Organic Blobs in Modern Web Design",
          "Learn how scalable SVG blob graphics work and how to use them without harming performance."),
    "/blog/ui-color-theory-palettes/": ("panel-blog-article-color", "UI Colour Theory and Accessible Palettes",
          "Learn colour harmony, the 60-30-10 guideline and accessible text contrast for interface design."),
    "/blog/secure-password-cryptography/": ("panel-blog-article-password", "How Secure Password Generators Work",
          "Learn about password length, entropy and cryptographically secure random generation."),
    "/blog/base64-encoding-explained/": ("panel-blog-article-base64", "Base64 Encoding Explained",
          "Learn what Base64 encoding does, why it increases data size and why it is not encryption."),
    "/blog/seo-meta-tags-guide/": ("panel-blog-article-meta", "SEO Meta Tags: Titles, Descriptions and Social Cards",
          "Learn how search titles, descriptions, canonical URLs and social sharing metadata work."),
    "/blog/inflation-wealth-depreciation/": ("panel-blog-article-inflation", "How Inflation Affects Purchasing Power",
          "Learn how inflation changes future purchasing power and how to interpret inflation-calculator estimates."),
}

H1S = {route: title.split(" | ")[0].split(" – ")[0] for route, (_, title, _) in ROUTES.items()}
H1S["/"] = "Free Online Tools for Creators and Developers"

GUIDE_SOURCES = {
    "panel-finance-calc": "panel-inflation-calc",
    "panel-json-formatter": "panel-meta-generator",
    "panel-svg-blob": "panel-finance-calc",
    "panel-color-palette": "panel-json-formatter",
    "panel-password-generator": "panel-svg-blob",
    "panel-base64": "panel-password-generator",
    "panel-meta-generator": "panel-color-palette",
}


def clean_head(document, route, title, description):
    head = document.find(".//head")
    for script in list(head.findall("script")):
        text = script.text or ""
        src = script.get("src", "")
        if "seoMeta" in text or "googlesyndication" in src or "loadAdSense" in text:
            head.remove(script)

    def set_meta(selector, attrs):
        nodes = head.xpath(selector)
        node = nodes[0] if nodes else etree.SubElement(head, "meta")
        for key, value in attrs.items():
            node.set(key, value)

    title_nodes = head.findall("title")
    title_node = title_nodes[0] if title_nodes else etree.SubElement(head, "title")
    title_node.text = title
    for extra in title_nodes[1:]:
        head.remove(extra)

    canonical_url = BASE_URL + route
    canonicals = head.xpath("./link[@rel='canonical']")
    canonical = canonicals[0] if canonicals else etree.SubElement(head, "link")
    canonical.set("rel", "canonical")
    canonical.set("href", canonical_url)
    for extra in canonicals[1:]:
        head.remove(extra)

    set_meta("./meta[@name='description']", {"name": "description", "content": description})
    set_meta("./meta[@name='robots']", {"name": "robots", "content": "index,follow,max-image-preview:large"})
    set_meta("./meta[@property='og:title']", {"property": "og:title", "content": title})
    set_meta("./meta[@property='og:description']", {"property": "og:description", "content": description})
    set_meta("./meta[@property='og:url']", {"property": "og:url", "content": canonical_url})
    set_meta("./meta[@property='og:type']", {"property": "og:type", "content": "article" if route.startswith("/blog/") and route != "/blog/" else "website"})
    set_meta("./meta[@name='twitter:title']", {"name": "twitter:title", "content": title})
    set_meta("./meta[@name='twitter:description']", {"name": "twitter:description", "content": description})

    schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication" if "panel-" in ROUTES[route][0] and not route.startswith("/blog") and route not in {"/", "/about/", "/privacy-policy/", "/terms-of-service/", "/contact/"} else "WebPage",
        "name": H1S[route],
        "url": canonical_url,
        "description": description,
        "isAccessibleForFree": True,
    }
    schema_node = etree.SubElement(head, "script", type="application/ld+json")
    schema_node.text = json.dumps(schema, ensure_ascii=False)


def make_links_crawlable(document):
    for node in document.xpath("//*[@onclick]"):
        onclick = node.get("onclick", "")
        match = re.search(r"(?:switchTab|routeTo)\([^'\"]*['\"]([^'\"]+)['\"]", onclick)
        if node.tag == "a" and node.get("href"):
            if match:
                tab = match.group(1)
                target = next((route for route, (panel, _, _) in ROUTES.items()
                               if panel == f"panel-{tab}"), None)
                if target:
                    node.set("href", target)
            node.attrib.pop("onclick", None)
        elif match:
            tab = match.group(1)
            target = next((route for route, (panel, _, _) in ROUTES.items()
                           if panel == f"panel-{tab}"), None)
            if target:
                node.attrib.pop("onclick", None)
                node.tag = "a"
                node.set("href", target)
                node.set("role", "link")
                node.attrib.pop("onkeydown", None)


def build(route, panel_id, title, description, source):
    document = html.document_fromstring(source)
    clean_head(document, route, title, description)
    main = document.get_element_by_id("contentViewport")
    panels = main.xpath("./section[contains(concat(' ', normalize-space(@class), ' '), ' tab-panel ')]")
    selected = document.get_element_by_id(panel_id)

    guide_source_id = GUIDE_SOURCES.get(panel_id)
    if guide_source_id:
        source_panel = document.get_element_by_id(guide_source_id)
        source_guides = source_panel.xpath(".//article[contains(@class,'seo-guide-section')]")
        target_guides = selected.xpath(".//article[contains(@class,'seo-guide-section')]")
        if source_guides and target_guides:
            target_guides[0].getparent().replace(target_guides[0], deepcopy(source_guides[0]))

    if panel_id == "panel-inflation-calc":
        source_panel = document.get_element_by_id("panel-blog-article-inflation")
        source_cards = source_panel.xpath(".//div[contains(@class,'glass-card')]")
        target_guides = selected.xpath(".//article[contains(@class,'seo-guide-section')]")
        if source_cards and target_guides:
            replacement = deepcopy(source_cards[0])
            replacement.set("class", "seo-guide-section glass-card")
            target_guides[0].getparent().replace(target_guides[0], replacement)

    if panel_id in {"panel-finance-calc", "panel-inflation-calc"}:
        workspaces = selected.xpath(".//*[contains(@class,'tool-workspace')]")
        if workspaces:
            disclaimer = html.fragment_fromstring(
                '<p class="calculator-disclaimer" role="note">'
                '<strong>Important:</strong> Results are illustrative estimates, not financial advice or a guarantee of future returns. '
                'Rates, inflation, taxes, fees and market performance can change.</p>'
            )
            workspaces[0].addnext(disclaimer)

    for panel in panels:
        if panel is not selected:
            main.remove(panel)
    selected.set("class", "tab-panel active")
    selected.attrib.pop("style", None)

    h1s = selected.xpath(".//h1")
    if not h1s:
        headings = selected.xpath(".//h2[contains(@class,'panel-title') or parent::*[contains(@class,'tool-header')] or parent::*[contains(@class,'panel-header')]]")
        if not headings:
            headings = selected.xpath(".//h2")
        if headings:
            headings[0].tag = "h1"
            h1s = [headings[0]]
    if h1s:
        for child in list(h1s[0]):
            h1s[0].remove(child)
        h1s[0].text = H1S[route]
        for extra in h1s[1:]:
            extra.tag = "h2"

    make_links_crawlable(document)
    for nav in document.xpath("//a[contains(@class,'nav-item')]"):
        classes = nav.get("class", "").replace(" active", "")
        if nav.get("href") == route:
            classes += " active"
            nav.set("aria-current", "page")
        else:
            nav.attrib.pop("aria-current", None)
        nav.set("class", classes.strip())

    return "<!DOCTYPE html>\n" + html.tostring(document, encoding="unicode", method="html")


def write_sitemap():
    today = date.today().isoformat()
    urls = "\n".join(
        f"  <url><loc>{BASE_URL}{route}</loc><lastmod>{today}</lastmod></url>"
        for route in ROUTES
    )
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n</urlset>\n", encoding="utf-8"
    )


def main():
    if not TEMPLATE.exists():
        raise SystemExit("Missing site-template.html")
    source = TEMPLATE.read_text(encoding="utf-8")
    for route, (panel_id, title, description) in ROUTES.items():
        output = ROOT / "index.html" if route == "/" else ROOT / route.strip("/") / "index.html"
        output.parent.mkdir(parents=True, exist_ok=True)
        rendered = build(route, panel_id, title, description, source)
        rendered = "\n".join(line.rstrip() for line in rendered.splitlines()) + "\n"
        output.write_text(rendered, encoding="utf-8")
        print(f"Built {route}")
    write_sitemap()


if __name__ == "__main__":
    main()
