import sys

def check_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # Extremely naive brace counter (ignores strings and comments for simplicity)
    import re
    # Remove single line comments
    text = re.sub(r'//.*', '', text)
    # Remove multi line comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    # Remove strings
    text = re.sub(r'"(?:[^"\\]|\\.)*"', '', text)
    text = re.sub(r"'(?:[^'\\]|\\.)*'", '', text)
    text = re.sub(r"`(?:[^`\\]|\\.)*`", '', text)

    open_braces = text.count('{')
    close_braces = text.count('}')
    
    print(f'Open braces: {open_braces}')
    print(f'Close braces: {close_braces}')

check_braces('app.js')
