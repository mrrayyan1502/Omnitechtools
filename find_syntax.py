import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Strip strings and comments
text = re.sub(r'//.*', '', text)
text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
text = re.sub(r'"(?:[^"\\]|\\.)*"', '""', text)
text = re.sub(r"'(?:[^'\\]|\\.)*'", "''", text)
text = re.sub(r"`(?:[^`\\]|\\.)*`", "``", text)

# Find all function declarations and track their end lines
lines = text.split('\n')
depth = 0
function_stack = []

for i, line in enumerate(lines):
    # Track functions starting on this line
    if 'function' in line or '=>' in line:
        function_stack.append({'line': i+1, 'depth_at_start': depth})
        
    open_b = line.count('{')
    close_b = line.count('}')
    
    # Process each character to match braces exactly
    for char in line:
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth < 0:
                print(f"Error: Negative depth at line {i+1}")
            
    if depth == 0 and len(function_stack) > 0:
        # A top level function closed
        function_stack = []

if depth > 0:
    print(f"File ends with unclosed braces! Final depth: {depth}")
    print("These functions were never closed:")
    for func in function_stack:
        orig_line = lines[func['line']-1].strip()
        print(f"Line {func['line']}: {orig_line}")
