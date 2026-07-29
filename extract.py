import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all blocks inside <div class="tool-info-section">
sections = re.findall(r'(<div class="tool-info-section">.*?</section>)', content, re.DOTALL)

with open('extracted_urdu.txt', 'w', encoding='utf-8') as f:
    for sec in sections:
        f.write(sec + "\n" + "="*80 + "\n")
