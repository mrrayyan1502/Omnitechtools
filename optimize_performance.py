import re

def optimize():
    # 1. Update index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace('<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>\n', '')
    html = html.replace('<script src="https://cdn.jsdelivr.net/npm/sql-formatter@15.3.0/dist/sql-formatter.min.js" defer></script>\n', '')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Removed heavy scripts from index.html")

    # 2. Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    markdown_injection = """    } else if (tabId === 'markdown-editor') {
        loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js", () => {
            console.log("Markdown parser loaded dynamically.");
            if (document.getElementById('markdownInput').value) {
                renderMarkdown();
            }
        });
        prettyTitle = "Free Online Markdown Editor with Live Preview 2026";"""
        
    sql_injection = """    } else if (tabId === 'sql-formatter') {
        loadScript("https://cdn.jsdelivr.net/npm/sql-formatter@15.3.0/dist/sql-formatter.min.js", () => {
            console.log("SQL formatter loaded dynamically.");
            if (document.getElementById('sqlInput').value) {
                formatSQL();
            }
        });
        prettyTitle = "Free SQL Formatter & Beautifier Offline 2026";"""

    if 'loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js"' not in js:
        js = js.replace("    } else if (tabId === 'markdown-editor') {\n        prettyTitle = \"Free Online Markdown Editor with Live Preview 2026\";", markdown_injection)
        js = js.replace("    } else if (tabId === 'sql-formatter') {\n        prettyTitle = \"Free SQL Formatter & Beautifier Offline 2026\";", sql_injection)
        
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("Updated app.js with lazy loading.")
    else:
        print("app.js already has lazy loading.")

if __name__ == '__main__':
    optimize()
