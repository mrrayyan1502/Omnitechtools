import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Add alt tags to all data-lucide icons where missing, using their name
    # Actually, data-lucide icons get replaced by SVG. The best way is to add aria-label or title.
    # We will let lucide handle its own aria-hidden="true" but we should add aria-labels to the parent buttons or links.
    
    # Let's inject a "Related Tools" block at the end of every tab-panel if it doesn't exist
    related_html = """
                    <div class="related-tools-section" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                        <h3 style="color: #fff; margin-bottom: 1rem; font-family: 'Outfit';">Explore Related Free Tools</h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <a href="/" onclick="routeTo(event, 'home')" class="related-tool-pill" style="padding: 0.5rem 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-main); text-decoration: none; font-size: 0.9rem; transition: border-color 0.2s;"><i data-lucide="home" style="width: 14px; height: 14px; margin-right: 0.5rem; display: inline-block; vertical-align: middle;"></i>All Tools</a>
                            <a href="/image-compressor/" onclick="routeTo(event, 'image-compressor')" class="related-tool-pill" style="padding: 0.5rem 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-main); text-decoration: none; font-size: 0.9rem; transition: border-color 0.2s;"><i data-lucide="image" style="width: 14px; height: 14px; margin-right: 0.5rem; display: inline-block; vertical-align: middle;"></i>Image Compressor</a>
                            <a href="/css-generator/" onclick="routeTo(event, 'css-builder')" class="related-tool-pill" style="padding: 0.5rem 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-main); text-decoration: none; font-size: 0.9rem; transition: border-color 0.2s;"><i data-lucide="code-2" style="width: 14px; height: 14px; margin-right: 0.5rem; display: inline-block; vertical-align: middle;"></i>CSS Glassmorphism</a>
                            <a href="/meta-tag-generator/" onclick="routeTo(event, 'meta-generator')" class="related-tool-pill" style="padding: 0.5rem 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-main); text-decoration: none; font-size: 0.9rem; transition: border-color 0.2s;"><i data-lucide="tags" style="width: 14px; height: 14px; margin-right: 0.5rem; display: inline-block; vertical-align: middle;"></i>SEO Meta Tags</a>
                        </div>
                    </div>
                </section>"""
    
    # Find all </section> that end a tool panel.
    # The panels have ids like id="panel-qr-generator"
    
    # We will replace all </section> that come after a tool with the related tools block
    panels = ['qr-generator', 'image-compressor', 'css-builder', 'finance-calc', 'json-formatter', 'svg-blob', 'color-palette', 'password-generator', 'base64', 'meta-generator', 'inflation-calc']
    
    for panel in panels:
        # Regex to find the end of the specific section
        pattern = re.compile(rf'(id="panel-{panel}".*?)(</section>)', re.DOTALL)
        
        def replacer(match):
            content = match.group(1)
            # Only inject if not already there
            if "Explore Related Free Tools" not in content:
                return content + related_html
            return match.group(0)
            
        html = pattern.sub(replacer, html)

    # Adding basic alt tags to main image elements if any exist. We mostly use icons, so let's aria-label buttons.
    html = html.replace('<img src="og-default.jpg"', '<img src="og-default.jpg" alt="OmniTools Premium Free Utility Hub"')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Injected related tools linking.")

if __name__ == '__main__':
    update_html()
