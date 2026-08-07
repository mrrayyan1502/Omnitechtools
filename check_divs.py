import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sections_open = len(re.findall(r'<section\b', text))
sections_close = len(re.findall(r'</section>', text))
print(f'Sections open: {sections_open}, close: {sections_close}')

divs_open = len(re.findall(r'<div\b', text))
divs_close = len(re.findall(r'</div>', text))
print(f'Divs open: {divs_open}, close: {divs_close}')

# Let's count them per section.
sections = text.split('<section class="tab-panel"')
for sec in sections[1:]: # skip the first part before any section
    d_open = len(re.findall(r'<div\b', sec))
    d_close = len(re.findall(r'</div>', sec))
    id_match = re.search(r'id="([^"]+)"', sec)
    sec_id = id_match.group(1) if id_match else 'unknown'
    print(f'Section {sec_id}: divs open={d_open}, close={d_close}, diff={d_open - d_close}')
