import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Google Fonts to include Lexend
    old_fonts_preload = '<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap">'
    old_fonts_link = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
    
    new_fonts_preload = '<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Lexend:wght@400;500;600&display=swap">'
    new_fonts_link = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Lexend:wght@400;500;600&display=swap" rel="stylesheet">'

    if old_fonts_preload in html:
        html = html.replace(old_fonts_preload, new_fonts_preload)
    if old_fonts_link in html:
        html = html.replace(old_fonts_link, new_fonts_link)

    # 2. Inject A11y HTML at the end of body
    a11y_html = """
    <!-- Accessibility Widget -->
    <button class="a11y-fab" id="a11yToggleBtn" onclick="toggleA11yPanel()" aria-label="Accessibility Tools">
        <i data-lucide="accessibility"></i>
    </button>

    <div class="a11y-panel glass-card" id="a11yPanel">
        <div class="a11y-header">
            <h3>Accessibility Tools</h3>
            <button class="a11y-close" onclick="toggleA11yPanel()"><i data-lucide="x"></i></button>
        </div>
        
        <div class="a11y-content">
            <div class="a11y-group">
                <label>Text Size:</label>
                <div class="a11y-button-group">
                    <button class="a11y-btn" onclick="changeTextSize(-1)">A-</button>
                    <button class="a11y-btn" onclick="changeTextSize(0)">Reset</button>
                    <button class="a11y-btn" onclick="changeTextSize(1)">A+</button>
                </div>
            </div>

            <div class="a11y-group">
                <label>Contrast:</label>
                <button class="a11y-btn a11y-toggle-btn" id="a11yContrastBtn" onclick="toggleHighContrast()">Toggle High Contrast</button>
            </div>

            <div class="a11y-group">
                <label>Font Style:</label>
                <button class="a11y-btn a11y-toggle-btn" id="a11yDyslexicBtn" onclick="toggleDyslexicFont()">Dyslexic Friendly Font</button>
            </div>
        </div>
    </div>
    
    <!-- Core App Engine script -->
"""

    target_body_end = '    <!-- Core App Engine script -->'
    if target_body_end in html and "id=\"a11yToggleBtn\"" not in html:
        html = html.replace(target_body_end, a11y_html)
        
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        print("Successfully injected A11y HTML.")

if __name__ == '__main__':
    update_html()
