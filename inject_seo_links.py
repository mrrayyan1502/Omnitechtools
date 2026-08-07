import re

def inject_seo():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. FOOTER UPDATE
    old_footer_start = '<div class="footer-links-col">\n                        <h4>Quick Utilities</h4>'
    old_footer_end = '<div class="footer-links-col">\n                        <h4>Legal & Support</h4>'
    
    new_footer = """<div class="footer-links-col">
                        <h4>Dev & Security Tools</h4>
                        <ul>
                            <li><a href="/jwt-decoder/" onclick="routeTo(event, 'jwt-decoder')">JWT Decoder</a></li>
                            <li><a href="/json-formatter/" onclick="routeTo(event, 'json-formatter')">JSON Formatter</a></li>
                            <li><a href="/regex-tester/" onclick="routeTo(event, 'regex-tester')">Regex Tester</a></li>
                            <li><a href="/sql-formatter/" onclick="routeTo(event, 'sql-formatter')">SQL Formatter</a></li>
                            <li><a href="/password-generator/" onclick="routeTo(event, 'password-generator')">Password Gen</a></li>
                            <li><a href="/base64-encoder-decoder/" onclick="routeTo(event, 'base64')">Base64 Encode</a></li>
                            <li><a href="/uuid-generator/" onclick="routeTo(event, 'uuid-generator')">UUID Gen</a></li>
                            <li><a href="/url-encoder/" onclick="routeTo(event, 'url-encoder')">URL Encoder</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Design & Web Tools</h4>
                        <ul>
                            <li><a href="/svg-blob-generator/" onclick="routeTo(event, 'svg-blob')">SVG Blobs</a></li>
                            <li><a href="/css-glassmorphism-generator/" onclick="routeTo(event, 'css-builder')">Glassmorphism</a></li>
                            <li><a href="/css-box-shadow/" onclick="routeTo(event, 'css-box-shadow')">CSS Box Shadow</a></li>
                            <li><a href="/color-palette-generator/" onclick="routeTo(event, 'color-palette')">Color Palette</a></li>
                            <li><a href="/image-compressor/" onclick="routeTo(event, 'image-compressor')">Image Compressor</a></li>
                            <li><a href="/qr-code-generator/" onclick="routeTo(event, 'qr-generator')">QR Generator</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Content & SEO</h4>
                        <ul>
                            <li><a href="/markdown-editor/" onclick="routeTo(event, 'markdown-editor')">Markdown Editor</a></li>
                            <li><a href="/word-counter/" onclick="routeTo(event, 'word-counter')">Word Counter</a></li>
                            <li><a href="/lorem-ipsum/" onclick="routeTo(event, 'lorem-ipsum')">Lorem Ipsum</a></li>
                            <li><a href="/meta-tag-generator/" onclick="routeTo(event, 'meta-generator')">Meta Tag Gen</a></li>
                            <li><a href="/compound-interest-calculator/" onclick="routeTo(event, 'finance-calc')">Finance Calc</a></li>
                            <li><a href="/inflation-calculator/" onclick="routeTo(event, 'inflation-calc')">Inflation Calc</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Legal & Support</h4>"""
    
    if "Dev & Security Tools" not in html:
        pattern = re.escape(old_footer_start) + r'.*?' + re.escape(old_footer_end)
        html = re.sub(pattern, new_footer, html, flags=re.DOTALL)

    # 2. CONTEXTUAL BLOG LINKS
    blog_replacements = [
        ("API development and data security.", "API development and data security. Try our <a href='/json-formatter/' onclick=\"routeTo(event, 'json-formatter')\" style='color: var(--accent); text-decoration: underline;'>JSON Formatter</a> to safely parse your payloads offline."),
        ("breaking away from rigid grids.", "breaking away from rigid grids. Generate your own shapes with our <a href='/svg-blob-generator/' onclick=\"routeTo(event, 'svg-blob')\" style='color: var(--accent); text-decoration: underline;'>SVG Blob Generator</a>."),
        ("perfect UI color combinations.", "perfect UI color combinations. Build your next theme using our <a href='/color-palette-generator/' onclick=\"routeTo(event, 'color-palette')\" style='color: var(--accent); text-decoration: underline;'>Color Palette Generator</a>."),
        ("entropy and cryptographic security.", "entropy and cryptographic security. Create mathematically secure keys with our <a href='/password-generator/' onclick=\"routeTo(event, 'password-generator')\" style='color: var(--accent); text-decoration: underline;'>Password Generator</a>."),
        ("difference between encoding and encryption.", "difference between encoding and encryption. Test it yourself with our offline <a href='/base64-encoder-decoder/' onclick=\"routeTo(event, 'base64')\" style='color: var(--accent); text-decoration: underline;'>Base64 Encoder</a>."),
        ("dominate search engines and social media.", "dominate search engines and social media. Optimize your snippets using our <a href='/meta-tag-generator/' onclick=\"routeTo(event, 'meta-generator')\" style='color: var(--accent); text-decoration: underline;'>Meta Tag Generator</a>.")
    ]
    
    for old, new in blog_replacements:
        if new not in html:
            html = html.replace(old, new)

    # 3. RELATED TOOLS BLOCK
    related_block = """
                    <div class="related-tools mt-4" style="background: rgba(255,255,255,0.02); border-radius: var(--radius-md); padding: 1.5rem; border: 1px solid var(--border-color);">
                        <h4 style="margin-top: 0; color: var(--text-color); font-size: 1.1rem; margin-bottom: 1rem;"><i data-lucide="layers" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 0.5rem; color: var(--accent);"></i> Explore Related Tools</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            <a href="/jwt-decoder/" onclick="routeTo(event, 'jwt-decoder')" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">JWT Decoder</a>
                            <a href="/json-formatter/" onclick="routeTo(event, 'json-formatter')" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">JSON Formatter</a>
                            <a href="/word-counter/" onclick="routeTo(event, 'word-counter')" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Word Counter</a>
                            <a href="/markdown-editor/" onclick="routeTo(event, 'markdown-editor')" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Markdown Editor</a>
                            <a href="/css-box-shadow/" onclick="routeTo(event, 'css-box-shadow')" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">CSS Shadows</a>
                        </div>
                    </div>
                </section>"""
    
    # We will replace all </section> that are inside tab-panels (except dashboard and blog hub)
    # A safe way is to find `</div>\n                </section>` and inject there, but since formatting varies:
    
    # Let's find all <section class="tab-panel" id="panel-xyz"> ... </section>
    panels = re.finditer(r'(<section class="tab-panel" id="panel-([^"]+)">.*?</section>)', html, flags=re.DOTALL)
    for match in panels:
        full_panel = match.group(1)
        panel_id = match.group(2)
        
        # Don't inject into dashboard, blog hub, or blog articles
        if panel_id in ['dashboard', 'blog'] or panel_id.startswith('blog-article'):
            continue
            
        if "Explore Related Tools" not in full_panel:
            new_panel = full_panel.replace('</section>', related_block)
            html = html.replace(full_panel, new_panel)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SEO Internal Links successfully injected!")

if __name__ == '__main__':
    inject_seo()
