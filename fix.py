import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<img id="qrLogoPreview" src="" alt="Selected Brand Logo">', '<img id="qrLogoPreview" src="" alt="Selected Brand Logo Preview for Custom QR Code">')

lines = html.split('\n')
in_tool_card = False
new_lines = []
for line in lines:
    if '<div class="tool-card"' in line:
        in_tool_card = True
    if in_tool_card and '<h3>' in line:
        line = line.replace('<h3>', '<h2>').replace('</h3>', '</h2>')
        in_tool_card = False
    new_lines.append(line)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))
print("Fixed index.html successfully.")
