import os

# 1. Update index.html
html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Add tabindex="0" and onkeydown to tool-cards
html = html.replace('class="tool-card animate-card" onclick="switchTab(', 'class="tool-card animate-card" tabindex="0" onclick="switchTab(')

# Add event listener for Enter key
script_block = """
<script>
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                card.click();
            }
        });
    });
});
</script>
</body>
"""
html = html.replace('</body>', script_block)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update style.css
css_path = 'style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('textarea:focus-visible {', 'textarea:focus-visible,\n.tool-card:focus-visible {')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixed tabindex successfully.")
