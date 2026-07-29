import re

def inject_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # 1. Routes
    routes_inject = """    'jwt-decoder': '/jwt-decoder/',
    'markdown-editor': '/markdown-editor/',
    'regex-tester': '/regex-tester/',
    'sql-formatter': '/sql-formatter/',
    'css-box-shadow': '/css-box-shadow/',
    'word-counter': '/word-counter/',
    'lorem-ipsum': '/lorem-ipsum/',
    'uuid-generator': '/uuid-generator/',
    'url-encoder': '/url-encoder/',
"""
    if "'jwt-decoder'" not in js:
        js = js.replace("'base64': '/base64-encoder-decoder/',\n", "'base64': '/base64-encoder-decoder/',\n" + routes_inject)

    # 2. SEO Block
    seo_inject = """    } else if (tabId === 'jwt-decoder') {
        prettyTitle = "Free JWT Decoder Offline 2026 | JSON Web Token Inspector";
        metaDesc = "Decode and inspect JSON Web Tokens (JWT) 100% offline in your browser. Keep your authentication secrets private.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JWT Decoder", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'markdown-editor') {
        prettyTitle = "Free Online Markdown Editor with Live Preview 2026";
        metaDesc = "Write, edit, and preview Markdown to HTML instantly. 100% free offline-first markdown viewer.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markdown Editor", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'regex-tester') {
        prettyTitle = "Free Regex Tester & Debugger Offline 2026";
        metaDesc = "Test, build, and debug Regular Expressions instantly in your browser. Perfect visual regex tester for developers.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Regex Tester", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'sql-formatter') {
        prettyTitle = "Free SQL Formatter & Beautifier Offline 2026";
        metaDesc = "Format and beautify complex SQL queries instantly. Supports MySQL, PostgreSQL, and standard SQL formatting.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SQL Formatter", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'css-box-shadow') {
        prettyTitle = "CSS Box Shadow Generator Online 2026";
        metaDesc = "Visually design and generate CSS3 box-shadow code with interactive sliders. Copy the CSS instantly.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS Box Shadow Generator", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'word-counter') {
        prettyTitle = "Free SEO Word & Character Counter 2026";
        metaDesc = "Count words, characters, sentences, and calculate reading time instantly offline.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Word Counter", "applicationCategory": "UtilitiesApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'lorem-ipsum') {
        prettyTitle = "Lorem Ipsum Generator Online 2026";
        metaDesc = "Generate random Lorem Ipsum placeholder text for UI mockups and web design quickly and free.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Lorem Ipsum Generator", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'uuid-generator') {
        prettyTitle = "Secure UUID / GUID Generator Offline 2026";
        metaDesc = "Generate cryptographically secure v4 UUIDs and GUIDs instantly in your browser.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "UUID Generator", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'url-encoder') {
        prettyTitle = "Free URL Encoder & Decoder Offline 2026";
        metaDesc = "Safely encode and decode URL components and strings instantly offline.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL Encoder Decoder", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
"""
    if "tabId === 'jwt-decoder'" not in js:
        js = js.replace("} else if (tabId === 'base64') {", seo_inject + "    } else if (tabId === 'base64') {")

    # 3. Logic Block
    logic_inject = """
/* ==========================================================================
   9. NEW TOOLS LOGIC (JWT, Markdown, Regex, SQL, Shadows, Word Count, UUID, Lorem, URL)
   ========================================================================== */

function decodeJWT() {
    const token = document.getElementById('jwtInput').value.trim();
    if (!token) {
        document.getElementById('jwtHeader').innerText = '';
        document.getElementById('jwtPayload').innerText = '';
        return;
    }
    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error("Invalid JWT Format");
        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        document.getElementById('jwtHeader').innerText = JSON.stringify(header, null, 4);
        document.getElementById('jwtPayload').innerText = JSON.stringify(payload, null, 4);
    } catch (e) {
        document.getElementById('jwtHeader').innerText = 'Error: Invalid Token';
        document.getElementById('jwtPayload').innerText = e.message;
    }
}

function renderMarkdown() {
    const input = document.getElementById('markdownInput').value;
    if (typeof marked !== 'undefined') {
        document.getElementById('markdownPreview').innerHTML = marked.parse(input);
    } else {
        document.getElementById('markdownPreview').innerHTML = "<p style='color:red'>marked.js library not loaded.</p>";
    }
}

function testRegex() {
    const regexStr = document.getElementById('regexInput').value;
    const flagsStr = document.getElementById('regexFlags').value;
    const testStr = document.getElementById('regexTestString').value;
    const resultBox = document.getElementById('regexResult');
    
    if (!regexStr || !testStr) {
        resultBox.innerHTML = '';
        return;
    }
    
    try {
        const regex = new RegExp(regexStr, flagsStr);
        const matches = [...testStr.matchAll(regex)];
        
        if (matches.length === 0) {
            resultBox.innerHTML = '<span style="color:var(--text-muted)">No matches found.</span>';
            return;
        }
        
        let output = `Found ${matches.length} match(es):\\n\\n`;
        matches.forEach((match, i) => {
            output += `Match ${i + 1}: "${match[0]}" at index ${match.index}\\n`;
        });
        resultBox.innerText = output;
    } catch (e) {
        resultBox.innerHTML = `<span style="color:#ef4444">Regex Error: ${e.message}</span>`;
    }
}

function formatSQL() {
    const input = document.getElementById('sqlInput').value;
    try {
        if (typeof sqlFormatter !== 'undefined') {
            document.getElementById('sqlOutput').value = sqlFormatter.format(input);
            showToast("SQL Formatted!");
        } else {
            document.getElementById('sqlOutput').value = "Error: SQL Formatter library not loaded.";
        }
    } catch (e) {
        document.getElementById('sqlOutput').value = "Parse Error: " + e.message;
    }
}

function updateShadow() {
    const x = document.getElementById('shadowX').value;
    const y = document.getElementById('shadowY').value;
    const blur = document.getElementById('shadowBlur').value;
    const spread = document.getElementById('shadowSpread').value;
    const colorHex = document.getElementById('shadowColor').value;
    const opacity = document.getElementById('shadowOpacity').value;
    const inset = document.getElementById('shadowInset').checked;
    
    document.getElementById('shadowXVal').innerText = x;
    document.getElementById('shadowYVal').innerText = y;
    document.getElementById('shadowBlurVal').innerText = blur;
    document.getElementById('shadowSpreadVal').innerText = spread;
    document.getElementById('shadowOpacityVal').innerText = opacity;
    
    // Convert hex to rgba
    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    
    const insetStr = inset ? "inset " : "";
    const shadowCode = `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
    
    document.getElementById('shadowBox').style.boxShadow = shadowCode;
    document.getElementById('shadowCode').value = `box-shadow: ${shadowCode};`;
}

function analyzeText() {
    const text = document.getElementById('wcInput').value;
    
    if (!text.trim()) {
        document.getElementById('wcWords').innerText = '0';
        document.getElementById('wcChars').innerText = '0';
        document.getElementById('wcSentences').innerText = '0';
        document.getElementById('wcReadingTime').innerText = '0m';
        return;
    }
    
    const words = text.trim().split(/\\s+/).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    
    document.getElementById('wcWords').innerText = words;
    document.getElementById('wcChars').innerText = chars;
    document.getElementById('wcSentences').innerText = sentences;
    document.getElementById('wcReadingTime').innerText = readingTime + 'm';
}

function generateLorem() {
    const count = parseInt(document.getElementById('loremCount').value) || 3;
    const loremBase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    let result = [];
    for(let i=0; i<count; i++) {
        result.push(loremBase);
    }
    document.getElementById('loremOutput').value = result.join('\\n\\n');
    showToast("Lorem Ipsum generated");
}

function generateUUIDs() {
    const count = parseInt(document.getElementById('uuidCount').value) || 1;
    let result = [];
    for(let i=0; i<count; i++) {
        // v4 UUID using crypto
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            result.push(crypto.randomUUID());
        } else {
            result.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        }
    }
    document.getElementById('uuidOutput').value = result.join('\\n');
    showToast(count + " UUID(s) generated");
}

function processURL(action) {
    const input = document.getElementById('urlInput').value;
    try {
        if (action === 'encode') {
            document.getElementById('urlOutput').value = encodeURIComponent(input);
            showToast("URL Encoded");
        } else {
            document.getElementById('urlOutput').value = decodeURIComponent(input);
            showToast("URL Decoded");
        }
    } catch(e) {
        document.getElementById('urlOutput').value = "Error: " + e.message;
    }
}
"""
    if "decodeJWT()" not in js:
        js = js + "\n\n" + logic_inject
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("app.js logic updated successfully.")

if __name__ == '__main__':
    inject_app_js()
