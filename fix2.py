def fix_schema():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    bad_init = "let schemaJson = []; // Array to hold multiple schemas"
    
    good_init = """let schemaJson = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "OmniTools",
            "url": "https://www.omnitechtools.com/"
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OmniTools Suite",
            "url": "https://www.omnitechtools.com/",
            "logo": "https://www.omnitechtools.com/logo.svg",
            "description": "Premium Offline-First Developer Utilities and Creator Tools"
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "OmniTools Web Utilities",
            "operatingSystem": "Any",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
            }
        }
    ]; // Array to hold multiple schemas"""

    if bad_init in js:
        js = js.replace(bad_init, good_init)
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("Schema successfully injected.")
    else:
        print("Could not find bad_init.")

if __name__ == '__main__':
    fix_schema()
