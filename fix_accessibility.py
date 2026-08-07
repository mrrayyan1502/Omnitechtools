import re

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

last_label_idx = -1
in_contact_modal = False

for i, line in enumerate(lines):
    # Track the last label found
    if '<label ' in line and ('class="control-label"' in line or 'class="small-label"' in line):
        last_label_idx = i

    # If we find an input, select, or textarea with an ID, bind the last label to it
    match = re.search(r'<(?:input|select|textarea)[^>]*id="([^"]+)"', line)
    if match and last_label_idx != -1:
        input_id = match.group(1)
        # Check if the label already has a 'for' attribute
        if 'for="' not in lines[last_label_idx]:
            # Inject for="..." into the label
            lines[last_label_idx] = lines[last_label_idx].replace('<label ', f'<label for="{input_id}" ')
            last_label_idx = -1 # Reset so we don't bind one label to multiple inputs
            
    # Fix 2: Search Input
    if 'id="toolSearch"' in line and 'aria-label' not in line:
        lines[i] = line.replace('id="toolSearch"', 'id="toolSearch" aria-label="Search tools"')
        
    # Fix 3: Icon-Only Buttons
    if 'class="header-action-btn"' in line and 'github.com' in line and 'aria-label' not in line:
        lines[i] = line.replace('title="View Project Source"', 'title="View Project Source" aria-label="View Project Source on GitHub"')

    # Fix 4: Tool Cards
    tool_match = re.search(r'<div class="tool-card animate-card"[^>]*onclick="switchTab\(\'([^\']+)\'\)"', line)
    if tool_match:
        tab_id = tool_match.group(1)
        if 'role="button"' not in line:
            new_card = line.replace(
                f'onclick="switchTab(\'{tab_id}\')"', 
                f'role="button" onclick="switchTab(\'{tab_id}\')" onkeydown="if(event.key === \'Enter\' || event.key === \' \') {{ switchTab(\'{tab_id}\'); event.preventDefault(); }}"'
            )
            lines[i] = new_card

# Join the lines back
html = "".join(lines)

# Remove the old global event listener for tool cards
old_script_block = """<script>
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
</script>"""

if old_script_block in html:
    html = html.replace(old_script_block, "")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Accessibility fixes applied successfully.")
