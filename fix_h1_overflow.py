import os

# 1. Update style.css
css_path = 'style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Remove overflow-x from body
css = css.replace('overflow-x: hidden;\n    min-height: 100vh;', 'min-height: 100vh;')
# Add overflow-x to .app-container
css = css.replace('.app-container {\n    display: flex;\n    min-height: 100vh;', '.app-container {\n    display: flex;\n    min-height: 100vh;\n    overflow-x: hidden;\n    width: 100%;')

# Add sr-only class
sr_only_css = """
/* Screen Reader Only Utility */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
"""
if '.sr-only {' not in css:
    css += sr_only_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update index.html
html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

target = '<main class="content-viewport" id="contentViewport">\n                \n                <!-- TAB 1: DASHBOARD -->'
replacement = '<main class="content-viewport" id="contentViewport">\n                <h1 class="sr-only">OmniTools - Premium Creator & Developer Utility Hub</h1>\n                \n                <!-- TAB 1: DASHBOARD -->'
if '<h1 class="sr-only">' not in html:
    html = html.replace(target, replacement)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Fixed H1 and overflow successfully.")
