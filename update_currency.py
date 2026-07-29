def update_currency():
    # Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()
    
    app_js = app_js.replace("return '$' + amount.toLocaleString", "return '$/€/£ ' + amount.toLocaleString")
    # Also update any chart tooltips if hardcoded
    app_js = app_js.replace("return '$' + context.parsed.y", "return '$/€/£ ' + context.parsed.y")
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)

    # Update index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Labels
    html = html.replace("($)", "($ / € / £)")
    # Default zeros
    html = html.replace("$0.00", "$/€/£ 0.00")
    # Specific defaults
    html = html.replace("$10,000.00", "$/€/£ 10,000.00")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Currency symbols updated successfully.")

if __name__ == '__main__':
    update_currency()
