import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

urdu_words = ['Kya', 'Hai', 'Kaise', 'Kyun', 'aur', 'kar', 'sakte', 'mein', 'hain', 'liye', 'hota', 'hoti']
in_info = False

with open('urdu_lines.txt', 'w', encoding='utf-8') as f:
    for i, line in enumerate(lines):
        if 'class="tool-info-section"' in line:
            in_info = True
        
        if in_info:
            f.write(f"{i}: {line.strip()}\n")
            
        if '</section>' in line:
            in_info = False
