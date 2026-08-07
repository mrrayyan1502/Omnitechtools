def inject_cdns_and_sitemap():
    # 1. CDNs
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    cdns = """
    <!-- Tool Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/sql-formatter@15.3.0/dist/sql-formatter.min.js" defer></script>
"""
    if "marked.min.js" not in html:
        html = html.replace('<!-- Core App Engine script -->', cdns + '    <!-- Core App Engine script -->')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("CDNs injected.")

    # 2. Sitemap Update
    with open('sitemap.xml', 'r', encoding='utf-8') as f:
        sitemap = f.read()

    new_urls = """    <url><loc>https://www.omnitechtools.com/jwt-decoder/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/markdown-editor/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/regex-tester/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/sql-formatter/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/css-box-shadow/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/word-counter/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/lorem-ipsum/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/uuid-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/url-encoder/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
"""
    if "jwt-decoder" not in sitemap:
        sitemap = sitemap.replace('</urlset>', new_urls + '</urlset>')
        with open('sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(sitemap)
        print("Sitemap updated.")

if __name__ == '__main__':
    inject_cdns_and_sitemap()
