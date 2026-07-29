/* ==========================================================================
   1. Core Layout, Navigation & HTML5 History Router
   ========================================================================== */
const routeMap = {
    '/': 'dashboard',
    '/qr-code-generator/': 'qr-generator',
    '/image-compressor/': 'image-compressor',
    '/webp-converter/': 'image-compressor',
    '/css-glassmorphism-generator/': 'css-builder',
    '/compound-interest-calculator/': 'finance-calc',
    '/fire-calculator/': 'finance-calc',
    '/about/': 'about',
    '/privacy-policy/': 'privacy',
    '/terms-of-service/': 'terms',
    '/contact/': 'contact',
    '/json-formatter/': 'json-formatter',
    '/svg-blob-generator/': 'svg-blob',
    '/color-palette-generator/': 'color-palette',
    '/password-generator/': 'password-generator',
    '/base64-encoder-decoder/': 'base64',
    '/meta-tag-generator/': 'meta-generator',
    '/inflation-calculator/': 'inflation-calc',
    '/image-resizer/': 'image-resizer',
    '/pdf-merge/': 'pdf-merge',
    '/unit-converter/': 'unit-converter',
    '/youtube-thumbnail-downloader/': 'yt-thumbnail',
    '/text-to-speech/': 'text-to-speech',
    '/blog/': 'blog',
    '/blog/qr-codes-digital-marketing/': 'blog-article-qr',
    '/blog/image-compression-performance/': 'blog-article-compress',
    '/blog/css-glassmorphism-trends/': 'blog-article-glass',
    '/blog/financial-independence-compound-growth/': 'blog-article-fire',
    '/blog/developer-utilities-privacy/': 'blog-article-privacy'
};

const tabToRouteMap = {
    'dashboard': '/',
    'qr-generator': '/qr-code-generator/',
    'image-compressor': '/image-compressor/',
    'css-builder': '/css-glassmorphism-generator/',
    'finance-calc': '/compound-interest-calculator/',
    'about': '/about/',
    'privacy': '/privacy-policy/',
    'terms': '/terms-of-service/',
    'contact': '/contact/',
    'json-formatter': '/json-formatter/',
    'svg-blob': '/svg-blob-generator/',
    'color-palette': '/color-palette-generator/',
    'password-generator': '/password-generator/',
    'base64': '/base64-encoder-decoder/',
    'jwt-decoder': '/jwt-decoder/',
    'markdown-editor': '/markdown-editor/',
    'regex-tester': '/regex-tester/',
    'sql-formatter': '/sql-formatter/',
    'css-box-shadow': '/css-box-shadow/',
    'word-counter': '/word-counter/',
    'lorem-ipsum': '/lorem-ipsum/',
    'uuid-generator': '/uuid-generator/',
    'image-resizer': '/image-resizer/',
    'pdf-merge': '/pdf-merge/',
    'unit-converter': '/unit-converter/',
    'youtube-thumbnail': '/youtube-thumbnail-downloader/',
    'text-to-speech': '/text-to-speech/',
    'url-encoder': '/url-encoder/',
    'meta-generator': '/meta-tag-generator/',
    'inflation-calc': '/inflation-calculator/',
    'image-resizer': '/image-resizer/',
    'pdf-merge': '/pdf-merge/',
    'unit-converter': '/unit-converter/',
    'yt-thumbnail': '/youtube-thumbnail-downloader/',
    'text-to-speech': '/text-to-speech/',
    'blog': '/blog/',
    'blog-article-qr': '/blog/qr-codes-digital-marketing/',
    'blog-article-compress': '/blog/image-compression-performance/',
    'blog-article-glass': '/blog/css-glassmorphism-trends/',
    'blog-article-json': '/blog/json-formatting-guide/',
    'blog-article-svg': '/blog/svg-organic-blobs-design/',
    'blog-article-color': '/blog/ui-color-theory-palettes/',
    'blog-article-password': '/blog/secure-password-cryptography/',
    'blog-article-base64': '/blog/base64-encoding-explained/',
    'blog-article-meta': '/blog/seo-meta-tags-guide/',
    'blog-article-inflation': '/blog/inflation-wealth-depreciation/',

    'blog-article-fire': '/blog/financial-independence-compound-growth/',
    'blog-article-privacy': '/blog/developer-utilities-privacy/'
};

function startApp() {
    // Initialize Lucide Vector Icons safely, DEFERRED for Mobile FCP Performance
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            requestAnimationFrame(() => {
                lucide.createIcons();
            });
        }, 100);
    }
    
    // Core Navigation & Routing Handling
    initNavigation();
    initStandaloneTool();
    initAnalyticsConsent();
    
    // Core Image Compressor Setup (Pre-instantiated, zero heavy libraries)
    initImageCompressor();

    // Core Glassmorphism Studio Setup (Pre-instantiated, zero heavy libraries)
    initGlassStudio();

    // 4 Bawaal Tools Setup (Pre-instantiated, ultra-performance)
    initJSONFormatter();
    initSVGBlob();
    initColorPalette();
    initPasswordGenerator();

    // 3 New AdSense Tools Setup (Pre-instantiated)
    initBase64Tool();
    initMetaTagGenerator();
}

// Standalone pages intentionally bypass the legacy SPA router. Initialise the
// one tool present on the page and load only the library that tool needs.
function initStandaloneTool() {
    const panels = document.querySelectorAll('.tab-panel');
    if (panels.length !== 1) return;

    const toolId = panels[0].id.replace(/^panel-/, '');
    const loaders = {
        'qr-generator': () => loadScript(
            '/vendor/qr-code-styling-1.9.2.js',
            () => {
                if (!qrCodeStyling && typeof QRCodeStyling !== 'undefined') initQRGenerator();
            }
        ),
        'finance-calc': () => loadScript(
            'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
            initFinanceCalc
        ),
        'inflation-calc': () => loadScript(
            'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
            initInflationCalc
        ),
        'markdown-editor': () => loadScript(
            'https://cdn.jsdelivr.net/npm/marked@15.0.6/lib/marked.umd.js',
            () => {
                const input = document.getElementById('markdownInput');
                if (input && input.value) renderMarkdown();
            }
        ),
        'sql-formatter': () => loadScript(
            'https://cdn.jsdelivr.net/npm/sql-formatter@15.3.0/dist/sql-formatter.min.js',
            () => {
                const input = document.getElementById('sqlInput');
                if (input && input.value) formatSQL();
            }
        ),
        'pdf-merge': () => loadScript(
            'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'
        ),
        'css-box-shadow': updateShadow,
        'lorem-ipsum': generateLorem,
        'uuid-generator': generateUUIDs
    };

    if (loaders[toolId]) loaders[toolId]();
}


function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const appSidebar = document.getElementById('appSidebar');
    
    // Mobile menu toggle drawer
    if (mobileMenuBtn && appSidebar) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appSidebar.classList.toggle('mobile-active');
        });
        
        // Close mobile drawer when clicking content viewport
        const contentViewport = document.getElementById('contentViewport');
        if (contentViewport) {
            contentViewport.addEventListener('click', () => {
                appSidebar.classList.remove('mobile-active');
            });
        }
    }

    // Generated pages contain one real, crawlable panel. Keep it visible and
    // use normal links instead of the legacy SPA router.
    const standalonePanels = document.querySelectorAll('.tab-panel');
    if (standalonePanels.length === 1) {
        standalonePanels[0].style.display = 'block';
        standalonePanels[0].classList.add('active');
        return;
    }

    // Bind browser popstate events (Back/Forward arrows navigation)
    window.addEventListener('popstate', (e) => {
        const path = window.location.pathname;
        const tabId = routeMap[path] || 'dashboard';
        switchTab(tabId, false); // false = do not pushState again!
    });

    // Handle initial direct load route
    const initialPath = window.location.pathname;
    const initialTab = routeMap[initialPath] || 'dashboard';
    switchTab(initialTab, false);
}

// Global Routing Click Helper for Links & Footer
function routeTo(event, tabId) {
    if (event) event.preventDefault();
    switchTab(tabId, true);
}

function toggleSidebar() {
    const sidebar = document.getElementById('appSidebar');
    if (sidebar) sidebar.classList.toggle('mobile-active');
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const value = 'value' in element ? element.value : element.innerText;
    if (!value) {
        showToast('There is nothing to copy yet.', 'danger');
        return;
    }
    navigator.clipboard.writeText(value)
        .then(() => showToast('Copied to clipboard!'))
        .catch(() => showToast('Copy failed. Please select and copy the text manually.', 'danger'));
}

// Switching Tab Panels & Handling Router Actions
function switchTab(tabId, pushToHistory = true) {
    const panels = document.querySelectorAll('.tab-panel');
    const navItems = document.querySelectorAll('.nav-item');
    
    panels.forEach(panel => {
        panel.style.display = 'none'; // Clear any inline display to prevent overlap bug
        panel.classList.remove('active');
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show active panel
    const targetPanel = document.getElementById(`panel-${tabId}`);
    const targetNavItem = document.getElementById(`nav-${tabId}`);
    
    if (targetPanel) {
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');
    }
    if (targetNavItem) {
        targetNavItem.classList.add('active');
    }

    // Dynamic SEO Titles & Meta Descriptions
    let prettyTitle = "OmniTools - Free Premium Creator & Developer Utility Hub 2026";
    let metaDesc = "OmniTools is a 100% free, private, and offline-first creator & developer utility hub. Generate custom QR codes, compress images, and more.";
    let schemaJson = [
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
    ]; // Array to hold multiple schemas
    let ogImageUrl = "https://www.omnitechtools.com/og-default.jpg";

    if (tabId === 'qr-generator') {
        prettyTitle = "Free Custom QR Code Generator Online 2026 | Make QR Instantly";
        metaDesc = "Generate highly stylized QR codes with gradient fills, round custom corners, and upload your brand logo for free completely offline.";
        ogImageUrl = "https://www.omnitechtools.com/og-qr.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Custom QR Code Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "MultimediaApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "Is this QR Code generator completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our custom QR code generator is 100% free with no scanning limits and no expiration dates." } },
                { "@type": "Question", "name": "Can I add my logo to the QR code?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. You can securely upload your brand logo and embed it in the center of the QR code offline." } },
                { "@type": "Question", "name": "Are these QR codes safe to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool works entirely offline in your browser, meaning your data and URLs are never sent to external servers." } }
            ]
        });
    } else if (tabId === 'image-compressor') {
        prettyTitle = "Free Image Compressor Online 2026 | Compress JPG PNG WebP Fast";
        metaDesc = "Reduce file size of your JPEG, PNG, or convert them directly to WebP completely offline without losing quality.";
        ogImageUrl = "https://www.omnitechtools.com/og-image.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Browser Image Compressor",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "How does the image compressor work offline?", "acceptedAnswer": { "@type": "Answer", "text": "It uses your browser's native HTML5 Canvas API to redraw and compress the image locally, ensuring zero data leaves your device." } },
                { "@type": "Question", "name": "Does image compression reduce quality?", "acceptedAnswer": { "@type": "Answer", "text": "You have full control over the quality slider. Small reductions in size usually have zero visible impact on image quality." } },
                { "@type": "Question", "name": "Can I convert PNG to WebP?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can upload PNG or JPEG formats and instantly export them as next-generation WebP files." } }
            ]
        });
        
        // Custom URL Simulator trigger
        if (window.location.pathname === '/webp-converter/') {
            const formatSelect = document.getElementById('compressFormat');
            if (formatSelect) {
                formatSelect.value = 'image/webp';
            }
        }
    } else if (tabId === 'css-builder') {
        prettyTitle = "Free CSS Glassmorphism Generator 2026 | Blur & Gradients UI";
        metaDesc = "Create visual CSS gradients and glassmorphism layouts with direct slider controls and instant code exports.";
        ogImageUrl = "https://www.omnitechtools.com/og-css.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Glassmorphism CSS Studio",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is Glassmorphism in CSS?", "acceptedAnswer": { "@type": "Answer", "text": "Glassmorphism is a UI design trend that uses CSS backdrop-filter to create frosted glass effects with translucent backgrounds." } },
                { "@type": "Question", "name": "Is the backdrop-filter supported in all browsers?", "acceptedAnswer": { "@type": "Answer", "text": "It is fully supported in modern Chrome, Safari, and Edge. However, it's a good practice to provide an opaque fallback color." } },
                { "@type": "Question", "name": "Is the exported CSS free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all CSS code generated by this tool is open-source and free to use in any commercial or personal project." } }
            ]
        });
    } else if (tabId === 'finance-calc') {
        prettyTitle = "Free Compound Interest Calculator 2026 | FIRE Target & Charts";
        metaDesc = "Forecast your savings, compound growth, and outline your financial independence targets with dynamic charts.";
        ogImageUrl = "https://www.omnitechtools.com/og-finance.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "FIRE Compound Interest Calculator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "FinanceApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });

        // Custom URL Simulator trigger
        if (window.location.pathname === '/fire-calculator/') {
            const rateInput = document.getElementById('finRate');
            if (rateInput) {
                rateInput.value = '12'; // pre-fill 12% high-yield investment forecast
            }
        }
    } else if (tabId === 'about') {
        prettyTitle = "About Us - Premium Free Creator & Developer Utility Hub | OmniTools";
        metaDesc = "Learn about the serverless, private-first utilities mission behind OmniTools. Clean digital tools accessible globally without paywalls.";
    } else if (tabId === 'privacy') {
        prettyTitle = "Privacy Policy & Data Security | OmniTools";
        metaDesc = "Read our official privacy statement. Our browser-based local processing guarantees absolute protection for your private files and data.";
    } else if (tabId === 'terms') {
        prettyTitle = "Terms of Service & Licensing Disclaimers | OmniTools";
        metaDesc = "Read our terms of service and licensing guidelines for using the free web utilities inside the OmniTools suite safely.";
    } else if (tabId === 'contact') {
        prettyTitle = "Contact Us & Support Helpdesk | OmniTools";
        metaDesc = "Get in touch with the OmniTools creators for partnership opportunities, feedback, bug reporting, or developer utility support.";
    } else if (tabId === 'json-formatter') {
        prettyTitle = "Free JSON Formatter & Validator Online 2026 | Secure & Offline";
        metaDesc = "Clean, syntax-highlight, compress, and validate JSON strings offline with interactive nodes tree parsing.";
        ogImageUrl = "https://www.omnitechtools.com/og-json.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JSON Formatter & Validator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
    } else if (tabId === 'svg-blob') {
        prettyTitle = "Free SVG Blob Generator Online 2026 | Custom Wave Assets";
        metaDesc = "Generate highly custom fluid organic shapes and CSS vector gradients. Export SVG codes and assets instantly.";
        ogImageUrl = "https://www.omnitechtools.com/og-svg.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SVG Blob Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
    } else if (tabId === 'color-palette') {
        prettyTitle = "Free Color Palette Generator 2026 | WCAG Contrast Checker";
        metaDesc = "Create visual hex schemes harmonies and analyze text color contrast ratios for WCAG AA/AAA compliance indicators.";
        ogImageUrl = "https://www.omnitechtools.com/og-color.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Color Palette Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
    } else if (tabId === 'password-generator') {
        prettyTitle = "Free Secure Password Generator 2026 | Unbreakable Passwords";
        metaDesc = "Create unbreakable passwords offline using Web Crypto API. Tweak lengths, analyze entropy, and track crack time.";
        ogImageUrl = "https://www.omnitechtools.com/og-password.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Secure Password Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "SecurityApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
        } else if (tabId === 'jwt-decoder') {
        prettyTitle = "Free JWT Decoder Offline 2026 | JSON Web Token Inspector";
        metaDesc = "Decode and inspect JSON Web Tokens (JWT) 100% offline in your browser. Keep your authentication secrets private.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JWT Decoder", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'markdown-editor') {
        loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js", () => {
            console.log("Markdown parser loaded dynamically.");
            if (document.getElementById('markdownInput').value) {
                renderMarkdown();
            }
        });
        prettyTitle = "Free Online Markdown Editor with Live Preview 2026";
        metaDesc = "Write, edit, and preview Markdown to HTML instantly. 100% free offline-first markdown viewer.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markdown Editor", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'regex-tester') {
        prettyTitle = "Free Regex Tester & Debugger Offline 2026";
        metaDesc = "Test, build, and debug Regular Expressions instantly in your browser. Perfect visual regex tester for developers.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Regex Tester", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'sql-formatter') {
        loadScript("https://cdn.jsdelivr.net/npm/sql-formatter@15.3.0/dist/sql-formatter.min.js", () => {
            console.log("SQL formatter loaded dynamically.");
            if (document.getElementById('sqlInput').value) {
                formatSQL();
            }
        });
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
        } else if (tabId === 'image-resizer') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Image Resizer", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'pdf-merge') {
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js", () => {
            console.log("pdf-lib loaded dynamically.");
        });
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "PDF Merge", "applicationCategory": "BusinessApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'unit-converter') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Unit Converter", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'youtube-thumbnail') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YouTube Thumbnail Downloader", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'text-to-speech') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Text to Speech Converter", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'url-encoder') {
        prettyTitle = "Free URL Encoder & Decoder Offline 2026";
        metaDesc = "Safely encode and decode URL components and strings instantly offline.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL Encoder Decoder", "applicationCategory": "DeveloperApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'base64') {
        prettyTitle = "Free Base64 Encoder Online 2026 | Decode Text & Binary Files";
        metaDesc = "Encode plain text or binary files to Base64 strings, or decode Base64 back securely and completely offline.";
        ogImageUrl = "https://www.omnitechtools.com/og-base64.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Base64 Encoder & Decoder",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
    } else if (tabId === 'meta-generator') {
        prettyTitle = "Free SEO Meta Tag Generator 2026 | Google Snippet Previewer";
        metaDesc = "Generate highly-rated SEO meta tags and preview your search snippet in real-time for Google & Facebook.";
        ogImageUrl = "https://www.omnitechtools.com/og-meta.jpg";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SEO Meta Tag Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        });
    } else if (tabId === 'inflation-calc') {
        prettyTitle = "Inflation & Money Depreciation Calculator with Charts | OmniTools";
        metaDesc = "Track purchasing power losses and compound inflation depreciation trajectories over time with charts.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Inflation Depreciation Calculator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "FinanceApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        });
    } else if (tabId === 'blog') {
        prettyTitle = "Premium SEO Guides & Digital Creator Blog | OmniTools";
        metaDesc = "Explore the official OmniTools blog. Read expert tutorials on QR codes, image compression, CSS UI trends, personal finance calculations, and web security.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "OmniTools Creator Blog",
            "description": "High-value articles about web development, UI design, speed optimization, and digital marketing."
        });
    } else if (tabId === 'blog-article-qr') {
        prettyTitle = "QR Codes in Digital Marketing: Boosting Conversions | OmniTools";
        metaDesc = "Learn how stylized custom QR codes with gradient fills and logo embeds bridge the offline-to-online marketing gap to boost user conversion rates.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Ultimate Guide to QR Codes in Digital Marketing: Boosting Offline-to-Online Conversion Rates",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        });
    } else if (tabId === 'blog-article-compress') {
        prettyTitle = "Web Image Compression: Optimizing Speed & Core Web Vitals | OmniTools";
        metaDesc = "The definitive technical guide on offline JPEG, PNG, and WebP compression. Optimize site loading speeds and enhance Core Web Vitals automatically.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Technical Guide to Web Image Compression: Optimizing Performance, SEO, and Core Web Vitals",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        });
    } else if (tabId === 'blog-article-glass') {
        prettyTitle = "Glassmorphism UI Trends & Backdrop Filter Styling | OmniTools";
        metaDesc = "Master the visual style of frosted glass UI design. Learn the CSS backdrop-filter formulas, accessibility parameters, and visual shadows design techniques.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Glassmorphism in Modern UI Design: Mastering CSS Backdrop Filters and Frosted Glass Aesthetics",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        });
    } else if (tabId === 'blog-article-fire') {
        prettyTitle = "The Math of Financial Independence & FIRE Safe Withdrawals | OmniTools";
        metaDesc = "Analyze the mathematical foundation of financial independence. Master the Rule of 25, 4% Safe Withdrawal Rate, and compound interest wealth growth lines.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Math of Financial Independence: How Compound Interest and FIRE Metrics Define Your Future",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        });
    } else if (tabId === 'blog-article-privacy') {
        prettyTitle = "Browser Privacy & Serverless Client-Side Web Tools | OmniTools";
        metaDesc = "Explore why serverless, client-side web utility architectures are the future of user privacy. Learn how offline FileReader and Web Crypto APIs protect data.";
        schemaJson.push({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Why Serverless Client-Side Utilities are the Future of Web Developer Tools and Browser Privacy",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        });
    }

    document.title = prettyTitle;

    // Update Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
        metaDescTag.setAttribute('content', metaDesc);
    }

    // Update OpenGraph tags dynamically
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', prettyTitle);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDesc);
    
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', ogImageUrl);
    
    const canonicalOrigin = "https://www.omnitechtools.com";
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalOrigin + (tabToRouteMap[tabId] || '/'));

    // Update Canonical tag link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalOrigin + (tabToRouteMap[tabId] || '/'));

    // Inject Search Engine structured data schemas
    injectSchema(schemaJson);

    // Ensure Single Active H1 Tag
    document.querySelectorAll('.panel-h1-title').forEach(el => {
        el.outerHTML = `<h2 class="panel-h1-title panel-title">${el.innerHTML}</h2>`;
    });
    
    const activePanelHeader = document.querySelector(`#panel-${tabId} .panel-title`);
    if (activePanelHeader && activePanelHeader.tagName.toLowerCase() !== 'h1') {
        activePanelHeader.outerHTML = `<h1 class="panel-h1-title panel-title">${activePanelHeader.innerHTML}</h1>`;
    }

    // Push State to browser history API safely (handling security limits in local file:// modes)
    if (pushToHistory) {
        try {
            const targetRoute = tabToRouteMap[tabId] || '/';
            history.pushState({ tabId: tabId }, prettyTitle, targetRoute);
            if (typeof updateSEOMeta === 'function') {
                updateSEOMeta(targetRoute);
            }
        } catch (historyErr) {
            console.warn("HTML5 History pushState is blocked or unsupported in this context:", historyErr);
        }
    }

    // Force scroll to top of EVERYTHING (bulletproof for SPAs)
    const forceScrollToTop = () => {
        try {
            if (document.activeElement && document.activeElement !== document.body) {
                document.activeElement.blur();
            }
        } catch (e) {}

        try { window.scrollTo(0, 0); } catch (e) {}
        try { document.documentElement.scrollTop = 0; } catch (e) {}
        try { document.body.scrollTop = 0; } catch (e) {}
        
        try {
            const scrollSelectors = ['.content-viewport', '.main-wrapper', '#contentViewport'];
            scrollSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el) el.scrollTop = 0;
                });
            });
        } catch (e) {}
    };

    // Execute scroll resets progressively to bypass rendering/reflow delays
    requestAnimationFrame(() => {
        forceScrollToTop();
        setTimeout(forceScrollToTop, 10);
        setTimeout(forceScrollToTop, 50);
        setTimeout(forceScrollToTop, 150);
        setTimeout(forceScrollToTop, 300);
    });
    
    // Close mobile menu if active
    const appSidebar = document.getElementById('appSidebar');
    if (appSidebar) {
        appSidebar.classList.remove('mobile-active');
    }

    // On-Demand Lazy Loading for Heavy Libraries
    if (tabId === 'qr-generator') {
        loadScript("/vendor/qr-code-styling-1.9.2.js", () => {
            if (!qrCodeStyling) {
                initQRGenerator();
            }
        });
    }
    if (tabId === 'finance-calc') {
        loadScript("https://cdn.jsdelivr.net/npm/chart.js", () => {
            if (!financeChartInstance) {
                initFinanceCalc();
            }
        });
    }
    if (tabId === 'inflation-calc') {
        loadScript("https://cdn.jsdelivr.net/npm/chart.js", () => {
            if (!inflationChartInstance) {
                initInflationCalc();
            }
        });
    }
}

// Global search inputs to filter sidebar items or quick actions
function searchTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Pop-up Toast Alert alert popup notification
function showToast(text, type = 'success') {
    const toast = document.getElementById('toastAlert');
    const toastText = document.getElementById('toastText');
    
    if (toast && toastText) {
        toastText.innerText = text;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
}

/* ==========================================================================
   2. QR Code Generator Engine
   ========================================================================== */
let qrCodeStyling = null;
let qrLogoDataUrl = null;

function initQRGenerator() {
    // Instantiate the custom QR designer styling
    qrCodeStyling = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg",
        data: "https://omnitools.co",
        image: "",
        dotsOptions: {
            color: "#00f2fe",
            type: "square"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 4
        }
    });

    // Mount canvas into workspace preview element
    const container = document.getElementById("qrCodeCanvas");
    if (container) {
        container.innerHTML = "";
        qrCodeStyling.append(container);
    }

    // Bind real-time update color picker text indicators
    const qrColorMain = document.getElementById('qrColorMain');
    const qrColorMainText = document.getElementById('qrColorMainText');
    const qrColorBg = document.getElementById('qrColorBg');
    const qrColorBgText = document.getElementById('qrColorBgText');

    if (qrColorMain && qrColorMainText) {
        qrColorMain.addEventListener('input', (e) => {
            qrColorMainText.value = e.target.value.toUpperCase();
        });
    }
    if (qrColorBg && qrColorBgText) {
        qrColorBg.addEventListener('input', (e) => {
            qrColorBgText.value = e.target.value.toUpperCase();
        });
    }

    // Trigger initial render
    generateQRCode();
    
    // Setup file drag and drop zones
    setupQRLogoDragDrop();
}

function setupQRLogoDragDrop() {
    const dropzone = document.getElementById('qrLogoDropzone');
    const fileInput = document.getElementById('qrLogoFile');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--primary)';
            dropzone.style.backgroundColor = 'rgba(0, 242, 254, 0.05)';
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = 'var(--border-color)';
            dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border-color)';
            dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                const event = { target: { files: e.dataTransfer.files } };
                loadQRLogo(event);
            }
        });
    }
}

// Toggle field input groups when user switches color styles
function toggleQRColorFields() {
    const type = document.getElementById('qrColorType').value;
    const singleGroup = document.getElementById('qrSingleColorGroup');
    const gradGroup = document.getElementById('qrGradientGroup');

    if (type === 'single') {
        singleGroup.classList.remove('hidden');
        gradGroup.classList.add('hidden');
    } else {
        singleGroup.classList.add('hidden');
        gradGroup.classList.remove('hidden');
    }
    generateQRCode();
}

// Subtab switcher inside utility controls card
function switchControlSubTab(subpanelId, element) {
    const parent = element.parentElement;
    const tabButtons = parent.querySelectorAll('.control-tab-btn');
    const subpanels = parent.parentElement.querySelectorAll('.control-subpanel');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    subpanels.forEach(panel => panel.classList.remove('active'));

    element.classList.add('active');
    const activePanel = document.getElementById(`subpanel-${subpanelId}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

// Load QR Logo uploaded by user
function loadQRLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            qrLogoDataUrl = e.target.result;
            
            // Show preview box
            const previewBox = document.getElementById('qrLogoPreviewContainer');
            const previewImg = document.getElementById('qrLogoPreview');
            if (previewBox && previewImg) {
                previewImg.src = qrLogoDataUrl;
                previewBox.classList.remove('hidden');
            }
            
            generateQRCode();
            showToast("Brand logo loaded successfully!");
        };
        reader.readAsDataURL(file);
    }
}

// Remove QR Logo
function removeQRLogo() {
    qrLogoDataUrl = null;
    document.getElementById('qrLogoFile').value = '';
    
    const previewBox = document.getElementById('qrLogoPreviewContainer');
    if (previewBox) {
        previewBox.classList.add('hidden');
    }
    
    generateQRCode();
    showToast("Brand logo removed.");
}

// Re-generate custom styled QR code
function generateQRCode() {
    if (!qrCodeStyling) return;

    const qrText = document.getElementById('qrText').value || "https://omnitools.co";
    const colorType = document.getElementById('qrColorType').value;
    const bgColor = document.getElementById('qrColorBg').value || "#ffffff";
    const dotStyle = document.getElementById('qrDotStyle').value;
    const cornerOuterStyle = document.getElementById('qrCornerOuterStyle').value;
    const cornerInnerStyle = document.getElementById('qrCornerInnerStyle').value;

    let dotsOptions = {
        type: dotStyle
    };

    // Color or Gradient Options
    if (colorType === 'single') {
        const mainColor = document.getElementById('qrColorMain').value || "#00f2fe";
        dotsOptions.color = mainColor;
        dotsOptions.gradient = null;
    } else {
        const start = document.getElementById('qrColorGradStart').value || "#00f2fe";
        const end = document.getElementById('qrColorGradEnd').value || "#4facfe";
        const angle = parseFloat(document.getElementById('qrGradAngle').value || 45) * Math.PI / 180;
        
        dotsOptions.color = undefined;
        dotsOptions.gradient = {
            type: "linear",
            rotation: angle,
            colorStops: [
                { offset: 0, color: start },
                { offset: 1, color: end }
            ]
        };
    }

    // Apply configurations dynamically
    qrCodeStyling.update({
        data: qrText,
        image: qrLogoDataUrl || "",
        dotsOptions: dotsOptions,
        backgroundOptions: {
            color: bgColor
        },
        cornersSquareOptions: {
            type: cornerOuterStyle,
            color: dotsOptions.color || document.getElementById('qrColorGradStart').value
        },
        cornersDotOptions: {
            type: cornerInnerStyle,
            color: dotsOptions.color || document.getElementById('qrColorGradEnd').value
        }
    });
}

// Download final generated QR code
function downloadQRCode(extension) {
    if (!qrCodeStyling) return;
    const qrText = document.getElementById('qrText').value || "qrcode";
    
    // Extract a safe name prefix
    let safeName = "omnitools-qr";
    try {
        const url = new URL(qrText);
        safeName = `qr-${url.hostname}`;
    } catch (e) {
        safeName = `qr-${qrText.substring(0, 12).replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
    }

    qrCodeStyling.download({
        name: safeName,
        extension: extension
    });
    
    // Viral Loop: Show WhatsApp sharing hook
    const waShare = document.getElementById('wa-share-qr');
    if (waShare) {
        waShare.style.display = 'block';
    }
    
    showToast(`QR Code successfully downloaded as ${extension.toUpperCase()}!`);
}

/* ==========================================================================
   3. Browser Image Compressor & WebP Converter
   ========================================================================== */
let originalImageFile = null;
let originalImageSrc = null;

function initImageCompressor() {
    const dropzone = document.getElementById('compressDropzone');
    
    if (dropzone) {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--primary)';
            dropzone.style.backgroundColor = 'rgba(0, 242, 254, 0.05)';
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = 'var(--border-color)';
            dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--border-color)';
            dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            
            if (e.dataTransfer.files.length > 0) {
                const files = e.dataTransfer.files;
                if (files[0].type.startsWith('image/')) {
                    document.getElementById('compressFileInput').files = files;
                    const event = { target: { files: files } };
                    handleCompressImageUpload(event);
                } else {
                    showToast("Please upload a valid image file.", "danger");
                }
            }
        });
    }
}

function triggerCompressFileInput(event) {
    if (event && event.target && event.target.id === 'compressFileInput') return;
    const fileInput = document.getElementById('compressFileInput');
    if (fileInput) fileInput.value = '';
    fileInput.click();
}

function updateCompressQualityLabel() {
    const val = document.getElementById('compressQuality').value;
    document.getElementById('compressQualityVal').innerText = `${val}%`;
}

// Handle Image Upload
function handleCompressImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        originalImageFile = file;
        
        // Reset sizes representation
        document.getElementById('statOrigSize').innerText = formatFileSize(file.size);
        
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImageSrc = e.target.result;
            
            // Show workspace control sliders and stats
            document.getElementById('compressionControls').classList.remove('hidden');
            document.getElementById('compressionStats').classList.remove('hidden');
            document.getElementById('btnDownloadCompressed').classList.remove('hidden');
            
            triggerImageCompression();
            showToast("Photo loaded successfully!");
        };
        reader.readAsDataURL(file);
    }
}

// Client-side variable Quality compression using Canvas API
function triggerImageCompression() {
    if (!originalImageSrc) return;

    const format = document.getElementById('compressFormat').value;
    const quality = parseFloat(document.getElementById('compressQuality').value) / 100;
    
    const img = new Image();
    img.src = originalImageSrc;
    
    img.onload = function() {
        // Draw the image on a virtual Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Export image using browser compression engines
        const compressedDataUrl = canvas.toDataURL(format, quality);
        
        // Render preview inside container
        const previewContainer = document.getElementById('compressPreviewHolder');
        if (previewContainer) {
            previewContainer.innerHTML = "";
            const previewImg = document.createElement('img');
            previewImg.src = compressedDataUrl;
            previewContainer.appendChild(previewImg);
        }

        // Calculate approximate size based on base64 character counts
        const base64Content = compressedDataUrl.split(',')[1];
        const compressedSizeInBytes = atob(base64Content).length;
        
        // Update Stats metrics
        document.getElementById('statCompSize').innerText = formatFileSize(compressedSizeInBytes);
        
        const savingsPercent = Math.max(0, Math.round(((originalImageFile.size - compressedSizeInBytes) / originalImageFile.size) * 100));
        document.getElementById('statSavings').innerText = `${savingsPercent}%`;
        
        // Bind URL into download actions button
        const btn = document.getElementById('btnDownloadCompressed');
        if (btn) {
            btn.dataset.url = compressedDataUrl;
            btn.dataset.extension = format.split('/')[1];
        }
    };
}

// Download compressed file
function downloadCompressedImage() {
    const btn = document.getElementById('btnDownloadCompressed');
    const dataUrl = btn.dataset.url;
    const extension = btn.dataset.extension;
    
    if (!dataUrl) return;
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `omnitools-optimized.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Viral Loop: Show WhatsApp sharing hook
    const waShare = document.getElementById('wa-share-img');
    if (waShare) {
        waShare.style.display = 'block';
    }
    
    showToast("Optimized image downloaded!");
}

// Help size converter
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/* ==========================================================================
   4. Glassmorphism CSS Studio Playground
   ========================================================================== */
function initGlassStudio() {
    if (!document.getElementById('glassOpacity')) return;
    // Generate initial card visual
    updateGlassStudio();
}

function initAnalyticsConsent() {
    const notice = document.getElementById('cookieNotice');
    if (!notice) return;
    if (!localStorage.getItem('omni-analytics-consent')) {
        notice.hidden = false;
    }
}

function setAnalyticsConsent(accepted) {
    const value = accepted ? 'granted' : 'denied';
    localStorage.setItem('omni-analytics-consent', value);
    if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: value });
    }
    const notice = document.getElementById('cookieNotice');
    if (notice) notice.hidden = true;
}

function updateGlassStudio() {
    const opacity = parseFloat(document.getElementById('glassOpacity').value);
    const blur = parseInt(document.getElementById('glassBlur').value);
    const borderOpacity = parseFloat(document.getElementById('glassBorderOpacity').value);
    const baseColor = document.getElementById('glassBaseColor').value;
    const borderColor = document.getElementById('glassBorderColor').value;

    // Convert hex base colors to RGB format
    const baseRgb = hexToRgb(baseColor);
    const borderRgb = hexToRgb(borderColor);

    // Dynamic Visual label sync
    document.getElementById('glassOpacityVal').innerText = opacity;
    document.getElementById('glassBlurVal').innerText = `${blur}px`;
    document.getElementById('glassBorderOpacityVal').innerText = borderOpacity;

    const targetCard = document.getElementById('simulatedGlassCard');
    const codeBlock = document.getElementById('glassCssCode');

    if (targetCard) {
        // Construct visual styling properties
        const bgVal = `rgba(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}, ${opacity})`;
        const borderVal = `1px solid rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, ${borderOpacity})`;
        const backdropFilterVal = `blur(${blur}px)`;
        
        targetCard.style.background = bgVal;
        targetCard.style.border = borderVal;
        targetCard.style.backdropFilter = backdropFilterVal;
        targetCard.style.webkitBackdropFilter = backdropFilterVal;

        // Render code string block output
        if (codeBlock) {
            codeBlock.innerText = 
`.glass-panel {
    background: ${bgVal};
    border: ${borderVal};
    backdrop-filter: ${backdropFilterVal};
    -webkit-backdrop-filter: ${backdropFilterVal};
    border-radius: 14px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`;
        }
    }
}

function updateGlassBackgroundSimulation() {
    const preset = document.getElementById('glassBgPreset').value;
    const previewContainer = document.getElementById('glassPreviewContainer');
    
    if (previewContainer) {
        // Reset classes
        previewContainer.className = "workspace-preview glass-card flex-center-column";
        previewContainer.classList.add(preset);
    }
}

function copyGlassCssToClipboard() {
    const codeBlock = document.getElementById('glassCssCode');
    if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
            showToast("CSS code copied to clipboard!");
        });
    }
}

// Convert Hex colors to RGB object
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

/* ==========================================================================
   5. Compound Interest & FIRE Calculator Engine
   ========================================================================== */
let financeChartInstance = null;

function initFinanceCalc() {
    // Generate initial predictions model
    calculateFinancialGrowth();
}

function calculateFinancialGrowth() {
    const principal = parseFloat(document.getElementById('finPrincipal').value) || 0;
    const monthly = parseFloat(document.getElementById('finMonthly').value) || 0;
    const rate = parseFloat(document.getElementById('finRate').value) / 100 || 0;
    const years = parseInt(document.getElementById('finYears').value) || 0;
    const compounding = parseInt(document.getElementById('finCompounding').value) || 12;

    if (years <= 0) return;

    let balanceData = [];
    let principalData = [];
    let labels = [];

    let currentBalance = principal;
    let totalDeposits = principal;

    const annualMonths = 12;

    for (let year = 1; year <= years; year++) {
        // Math loop logic representing compounding schedules
        for (let month = 1; month <= annualMonths; month++) {
            currentBalance += monthly;
            totalDeposits += monthly;
            
            // Compound calculation based on monthly cycle
            if (month % (annualMonths / compounding) === 0) {
                const periodicRate = rate / compounding;
                currentBalance += currentBalance * periodicRate;
            }
        }
        
        balanceData.push(Math.round(currentBalance));
        principalData.push(Math.round(totalDeposits));
        labels.push(`Year ${year}`);
    }

    // Update UI Cards with currency labels
    document.getElementById('finTotalValue').innerText = formatCurrency(currentBalance);
    document.getElementById('finTotalDeposits').innerText = formatCurrency(totalDeposits);
    document.getElementById('finTotalInterest').innerText = formatCurrency(currentBalance - totalDeposits);

    // Refresh dynamic Chart.js canvas instance
    renderFinanceChart(labels, balanceData, principalData);
}

function renderFinanceChart(labels, totalData, depositsData) {
    const ctx = document.getElementById('financeChart');
    if (!ctx || typeof Chart === 'undefined') return;

    // Destroy old chart instances to avoid overlap visual bugs
    if (financeChartInstance) {
        financeChartInstance.destroy();
    }

    financeChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Forecasted Wealth ($)',
                    data: totalData,
                    borderColor: '#00f2fe',
                    backgroundColor: 'rgba(0, 242, 254, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Total Deposits ($)',
                    data: depositsData,
                    borderColor: '#8b92b6',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.1,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#8b92b6',
                        font: { family: 'Outfit', size: 12 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#8b92b6', font: { family: 'Inter' } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: {
                        color: '#8b92b6',
                        font: { family: 'Inter' },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function formatCurrency(amount) {
    return globalUserCurrency + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ==========================================================================
   6. Contact Form & Support Handler (Client-Side Simulated Submission)
   ========================================================================== */
function handleContactSubmit(event) {
    event.preventDefault();
    
    const btn = document.getElementById('btnContactSubmit');
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!btn || !name || !email || !message) return;
    
    // Simulate beautiful premium loading sequence
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Preparing Email...`;
    lucide.createIcons(); // render standard icons
    
    setTimeout(() => {
        // Since we are client-side only, redirect to default email client with pre-filled data
        const mailtoLink = `mailto:omnitechtools.support@gmail.com?subject=${encodeURIComponent(subject || 'Support Request')}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        window.location.href = mailtoLink;
        
        btn.innerHTML = `<i data-lucide="check-circle"></i> Opening Email Client...`;
        btn.classList.replace('btn-primary', 'btn-success');
        lucide.createIcons();
        document.getElementById('contactForm').reset();
        
        showToast("Opening your default email app...");
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('btn-success', 'btn-primary');
            btn.disabled = false;
        }, 3000);
    }, 800);
}

/* ==========================================================================
   7. Helper Utilities for Lazy Loading & SEO Schema Markups
   ========================================================================== */
const loadedScripts = {};

// Performance dynamic script injector
function loadScript(url, callback) {
    if (loadedScripts[url] === true) {
        if (callback) callback(null);
        return;
    }

    if (Array.isArray(loadedScripts[url])) {
        if (callback) loadedScripts[url].push(callback);
        return;
    }

    loadedScripts[url] = callback ? [callback] : [];
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
        const callbacks = loadedScripts[url];
        loadedScripts[url] = true;
        callbacks.forEach(fn => fn(null));
    };
    script.onerror = () => {
        delete loadedScripts[url];
        console.error(`Unable to load required tool library: ${url}`);
        showToast('A required tool component could not load. Check your connection and try again.', 'error');
    };
    document.body.appendChild(script);
}

// Google JSON-LD Structured Data injector
function injectSchema(schemaJson) {
    const oldSchema = document.getElementById('omnitools-jsonld');
    if (oldSchema) {
        oldSchema.remove();
    }
    
    if (!schemaJson) return;
    
    const script = document.createElement('script');
    script.id = 'omnitools-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaJson);
    document.head.appendChild(script);
}

/* ==========================================================================
   8. JSON Formatter, Beautifier & Validator Engine
   ========================================================================== */
function initJSONFormatter() {
    // Check elements exist
    const input = document.getElementById('jsonInput');
    if (!input) return;
    
    // Setup defaults
    input.value = "";
}

function loadSampleJSON() {
    const sample = {
        "appName": "OmniTools Suite",
        "version": "2.0.0",
        "releaseDate": "2026-06-01",
        "isFree": true,
        "featuresCount": 8,
        "activeModules": ["QRGen", "Compressor", "GlassStudio", "CompoundInterest", "JSONFormatter", "SVGBlob", "PaletteHarmony", "PassSecure"],
        "serverlessArchitecture": {
            "hosting": "Vercel Hobby",
            "dbCost": 0,
            "userPrivacy": "100% Client-Side Local Storage"
        }
    };
    const textarea = document.getElementById('jsonInput');
    if (textarea) {
        textarea.value = JSON.stringify(sample, null, 4);
        processJSON('format');
    }
}

function processJSON(action) {
    const inputVal = document.getElementById('jsonInput').value.trim();
    const outputBlock = document.getElementById('jsonOutput');
    const treeBlock = document.getElementById('jsonTreeViewer');
    const errorAlert = document.getElementById('jsonErrorAlert');
    const errorText = document.getElementById('jsonErrorText');
    
    if (!inputVal) {
        if (outputBlock) outputBlock.innerText = "// Output is empty...";
        if (treeBlock) treeBlock.innerHTML = `<span style="color: var(--text-muted);">// Tree is empty...</span>`;
        if (errorAlert) errorAlert.classList.add('hidden');
        return;
    }
    
    try {
        const parsed = JSON.parse(inputVal);
        
        // Hide error alert
        if (errorAlert) errorAlert.classList.add('hidden');
        
        // Beautify/Format or Minify
        if (action === 'format') {
            outputBlock.innerText = JSON.stringify(parsed, null, 4);
        } else if (action === 'minify') {
            outputBlock.innerText = JSON.stringify(parsed);
        }
        
        // Render Node Tree Viewer
        if (treeBlock) {
            treeBlock.innerHTML = "";
            treeBlock.appendChild(renderJSONNode("root", parsed, true));
        }
        
        showToast("JSON processed successfully!");
    } catch (err) {
        // Render parse errors
        if (errorAlert && errorText) {
            errorText.innerText = err.message;
            errorAlert.classList.remove('hidden');
        }
        if (outputBlock) outputBlock.innerText = `// Parsing failed:\n// ${err.message}`;
        showToast("Invalid JSON syntax!", "danger");
    }
}

function renderJSONNode(key, value, isLast) {
    const container = document.createElement('div');
    container.style.marginLeft = '1.2rem';
    container.style.position = 'relative';
    
    const type = typeof value;
    const isObject = value !== null && type === 'object';
    
    const line = document.createElement('div');
    line.style.margin = '2px 0';
    
    // Key name
    const keySpan = document.createElement('span');
    keySpan.style.color = '#ff7b72'; // glowing key
    keySpan.innerText = key === 'root' ? '' : `"${key}": `;
    line.appendChild(keySpan);
    
    if (isObject) {
        const isArray = Array.isArray(value);
        const startBrack = isArray ? '[' : '{';
        const endBrack = isArray ? ']' : '}';
        const size = isArray ? value.length : Object.keys(value).length;
        
        // Toggle Collapse trigger
        const toggle = document.createElement('span');
        toggle.style.cursor = 'pointer';
        toggle.style.userSelect = 'none';
        toggle.style.color = 'var(--primary)';
        toggle.style.marginRight = '4px';
        toggle.innerText = '▼ ';
        
        line.insertBefore(toggle, keySpan);
        
        const brackSpan = document.createElement('span');
        brackSpan.style.color = '#a6c1ee';
        brackSpan.innerText = `${startBrack} `;
        line.appendChild(brackSpan);
        
        const countSpan = document.createElement('span');
        countSpan.style.color = 'var(--text-muted)';
        countSpan.style.fontSize = '0.75rem';
        countSpan.innerText = `// ${size} items`;
        line.appendChild(countSpan);
        
        // Render child elements
        const childrenBox = document.createElement('div');
        childrenBox.style.borderLeft = '1px dashed rgba(255,255,255,0.08)';
        childrenBox.style.paddingLeft = '0.5rem';
        
        if (isArray) {
            value.forEach((item, index) => {
                childrenBox.appendChild(renderJSONNode(index, item, index === value.length - 1));
            });
        } else {
            const keys = Object.keys(value);
            keys.forEach((k, index) => {
                childrenBox.appendChild(renderJSONNode(k, value[k], index === keys.length - 1));
            });
        }
        
        container.appendChild(line);
        container.appendChild(childrenBox);
        
        const closeLine = document.createElement('div');
        closeLine.style.color = '#a6c1ee';
        closeLine.innerText = isLast ? endBrack : `${endBrack},`;
        container.appendChild(closeLine);
        
        // Toggle collapse actions
        toggle.addEventListener('click', () => {
            if (childrenBox.style.display === 'none') {
                childrenBox.style.display = 'block';
                toggle.innerText = '▼ ';
                closeLine.style.display = 'block';
                countSpan.innerText = `// ${size} items`;
            } else {
                childrenBox.style.display = 'none';
                toggle.innerText = '▶ ';
                closeLine.style.display = 'inline';
                closeLine.style.marginLeft = '4px';
                countSpan.innerText = `// collapsed... ${endBrack}${isLast ? '' : ','}`;
            }
        });
        
    } else {
        const valSpan = document.createElement('span');
        if (type === 'string') {
            valSpan.style.color = '#a5d6ff'; // String values
            valSpan.innerText = `"${value}"`;
        } else if (type === 'number') {
            valSpan.style.color = '#ff9b50'; // Numeric values
            valSpan.innerText = value;
        } else if (type === 'boolean') {
            valSpan.style.color = '#79c0ff'; // Boolean values
            valSpan.innerText = value;
        } else if (value === null) {
            valSpan.style.color = '#569cd6'; // Null values
            valSpan.innerText = 'null';
        }
        line.appendChild(valSpan);
        
        const comma = document.createElement('span');
        comma.style.color = '#a6c1ee';
        comma.innerText = isLast ? '' : ',';
        line.appendChild(comma);
        
        container.appendChild(line);
    }
    
    return container;
}

function clearJSON() {
    document.getElementById('jsonInput').value = "";
    document.getElementById('jsonOutput').innerText = "// Output is empty...";
    document.getElementById('jsonTreeViewer').innerHTML = `<span style="color: var(--text-muted);">// Tree is empty...</span>`;
    document.getElementById('jsonErrorAlert').classList.add('hidden');
}

function copyJSONToClipboard() {
    const output = document.getElementById('jsonOutput').innerText;
    if (output && !output.startsWith('//')) {
        navigator.clipboard.writeText(output).then(() => {
            showToast("Beautified JSON copied to clipboard!");
        });
    }
}

function switchJSONSubTab(subTabId, element) {
    const parent = element.parentElement;
    const tabButtons = parent.querySelectorAll('.control-tab-btn');
    const subpanels = parent.parentElement.querySelectorAll('.control-subpanel');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    subpanels.forEach(panel => panel.classList.remove('active'));

    element.classList.add('active');
    const activePanel = document.getElementById(`subpanel-json-${subTabId}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

/* ==========================================================================
   9. Dynamic SVG Blob & Wave Generator Engine
   ========================================================================== */
let blobPathString = "";

function initSVGBlob() {
    const compInput = document.getElementById('blobComplexity');
    if (!compInput) return;
    
    // Set default initial rendering
    generateSVGBlob();
}

function generateSVGBlob() {
    const complexity = parseInt(document.getElementById('blobComplexity').value);
    const roundness = parseInt(document.getElementById('blobRoundness').value) / 100;
    const gradStart = document.getElementById('blobGradStart').value;
    const gradEnd = document.getElementById('blobGradEnd').value;

    // Label indicators sync
    document.getElementById('blobComplexityVal').innerText = complexity;
    document.getElementById('blobRoundnessVal').innerText = `${Math.round(roundness * 100)}%`;

    // Mathematical calculations to draw cubic bezier organic curves
    const size = 250;
    const center = size / 2;
    const radiusMax = center * 0.9;
    const radiusMin = center * (0.3 + 0.4 * roundness);
    
    const points = [];
    const angleStep = (Math.PI * 2) / complexity;
    
    // Random seeds based coordinates calculation
    for (let i = 0; i < complexity; i++) {
        const angle = i * angleStep;
        // Generate pseudo-random radii constrained by complexity
        const randRadii = radiusMin + Math.random() * (radiusMax - radiusMin);
        const x = center + Math.cos(angle) * randRadii;
        const y = center + Math.sin(angle) * randRadii;
        points.push({ x, y, angle });
    }

    // Connect organic vector loops using cubic beziers
    let path = `M ${points[0].x} ${points[0].y} `;
    for (let i = 0; i < complexity; i++) {
        const nextIdx = (i + 1) % complexity;
        const nextNextIdx = (i + 2) % complexity;
        
        const p1 = points[i];
        const p2 = points[nextIdx];
        const p3 = points[nextNextIdx];
        
        // Control point calculations for smooth circular transitions
        const cpX1 = p1.x + Math.cos(p1.angle + Math.PI / 2) * (radiusMax - radiusMin) * 0.45;
        const cpY1 = p1.y + Math.sin(p1.angle + Math.PI / 2) * (radiusMax - radiusMin) * 0.45;
        
        const cpX2 = p2.x - Math.cos(p2.angle + Math.PI / 2) * (radiusMax - radiusMin) * 0.45;
        const cpY2 = p2.y - Math.sin(p2.angle + Math.PI / 2) * (radiusMax - radiusMin) * 0.45;
        
        path += `C ${cpX1.toFixed(1)} ${cpY1.toFixed(1)}, ${cpX2.toFixed(1)} ${cpY2.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
    }
    path += "Z";
    
    // Construct dynamic inline SVG string
    const svgCode = 
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" width="100%" height="100%">
    <defs>
        <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${gradStart}" />
            <stop offset="100%" stop-color="${gradEnd}" />
        </linearGradient>
    </defs>
    <path fill="url(#blobGrad)" d="${path}" />
</svg>`;

    // Render Preview
    const preview = document.getElementById('svgBlobPreview');
    if (preview) {
        preview.innerHTML = svgCode;
    }

    // Display markup code
    const codeBlock = document.getElementById('svgBlobCode');
    if (codeBlock) {
        codeBlock.innerText = svgCode;
    }
    
    blobPathString = svgCode;
}

function randomizeBlobPreset() {
    const startColors = ["#00f2fe", "#f857a6", "#11998e", "#ffd200", "#ff0844", "#a1c4fd", "#667eea"];
    const endColors = ["#4facfe", "#ff5858", "#38ef7d", "#f7971e", "#ffb199", "#c2e9fb", "#764ba2"];
    
    const idx = Math.floor(Math.random() * startColors.length);
    
    document.getElementById('blobComplexity').value = 4 + Math.floor(Math.random() * 6);
    document.getElementById('blobRoundness').value = 40 + Math.floor(Math.random() * 60);
    document.getElementById('blobGradStart').value = startColors[idx];
    document.getElementById('blobGradEnd').value = endColors[idx];
    
    generateSVGBlob();
    showToast("Organic shape randomized!");
}

function copySVGCode() {
    if (blobPathString) {
        navigator.clipboard.writeText(blobPathString).then(() => {
            showToast("SVG XML code copied to clipboard!");
        });
    }
}

function downloadSVGBlob() {
    if (!blobPathString) return;
    
    const blob = new Blob([blobPathString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omnitools-organic-blob.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast("SVG file successfully downloaded!");
}

/* ==========================================================================
   10. Advanced Color Palette Generator & Contrast Checker Engine
   ========================================================================== */
let activeHexPaletteColors = [];

function initColorPalette() {
    if (!document.getElementById('paletteHarmony')) return;
    
    // Spacebar keyboard shortcut for generating palettes
    window.addEventListener('keydown', (e) => {
        // Spacebar code check, avoid key actions when text fields are in active focus
        if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-panel.active');
            if (activeTab && activeTab.id === 'panel-color-palette') {
                generateColorsPalette();
            }
        }
    });

    // Initial triggers
    generateColorsPalette();
    runContrastAnalysis();
}

function generateColorsPalette() {
    const harmony = document.getElementById('paletteHarmony').value;
    const grid = document.getElementById('paletteColorGrid');
    if (!grid) return;
    
    grid.innerHTML = "";
    activeHexPaletteColors = [];
    
    // Choose base color randomly
    const baseHue = Math.floor(Math.random() * 360);
    const baseSat = 65 + Math.floor(Math.random() * 20); // vibrant saturation
    const baseLight = 40 + Math.floor(Math.random() * 15); // standard lightness
    
    let hues = [];
    
    if (harmony === 'monochromatic') {
        hues = Array(5).fill(baseHue);
    } else if (harmony === 'analogous') {
        hues = [
            (baseHue - 40 + 360) % 360,
            (baseHue - 20 + 360) % 360,
            baseHue,
            (baseHue + 20) % 360,
            (baseHue + 40) % 360
        ];
    } else if (harmony === 'complementary') {
        const compHue = (baseHue + 180) % 360;
        hues = [
            baseHue,
            (baseHue + 15) % 360,
            (baseHue - 15 + 360) % 360,
            compHue,
            (compHue + 15) % 360
        ];
    } else if (harmony === 'triadic') {
        const tri1 = (baseHue + 120) % 360;
        const tri2 = (baseHue + 240) % 360;
        hues = [baseHue, (baseHue + 20) % 360, tri1, (tri1 + 20) % 360, tri2];
    }

    for (let i = 0; i < 5; i++) {
        let sat = baseSat;
        let light = baseLight;
        
        // Adjust lightness/saturation for monochromatic gradient variations
        if (harmony === 'monochromatic') {
            light = 15 + i * 16;
            sat = baseSat - i * 5;
        } else {
            // Apply slight random variations to make templates unique
            light = 35 + (i * 8) + Math.floor(Math.random() * 5);
        }
        
        const hex = hslToHex(hues[i], sat, light);
        activeHexPaletteColors.push(hex);
        
        // Build interactive color block card
        const card = document.createElement('div');
        card.className = "color-card flex-center-column";
        card.style.backgroundColor = hex;
        card.style.borderRadius = 'var(--radius-sm)';
        card.style.padding = '1rem 0.5rem';
        card.style.justifyContent = 'flex-end';
        card.style.cursor = 'pointer';
        card.style.border = '1px solid rgba(255,255,255,0.08)';
        card.style.transition = 'var(--transition)';
        
        const label = document.createElement('span');
        label.style.fontFamily = 'monospace';
        label.style.fontSize = '0.75rem';
        label.style.fontWeight = 'bold';
        label.style.padding = '0.2rem 0.4rem';
        label.style.backgroundColor = 'rgba(0,0,0,0.6)';
        label.style.borderRadius = '4px';
        label.style.color = '#fff';
        label.innerText = hex.toUpperCase();
        
        card.appendChild(label);
        
        // Click color card to copy Hex to clipboard
        card.addEventListener('click', () => {
            navigator.clipboard.writeText(hex).then(() => {
                showToast(`HEX Color ${hex.toUpperCase()} copied!`);
            });
        });
        
        grid.appendChild(card);
    }
    
    // Automatically set checker presets based on new palette colors
    document.getElementById('contrastText').value = activeHexPaletteColors[0];
    document.getElementById('contrastBg').value = "#0b0d19"; // standard dark theme background
    runContrastAnalysis();
}

function runContrastAnalysis() {
    const bgHex = document.getElementById('contrastBg').value;
    const textHex = document.getElementById('contrastText').value;

    const previewCard = document.getElementById('contrastPreviewCard');
    const ratioVal = document.getElementById('contrastRatioVal');
    const aaLabel = document.getElementById('contrastAARate');
    const aaaLabel = document.getElementById('contrastAAARate');

    if (!previewCard) return;

    // Apply colors to visual preview card
    previewCard.style.backgroundColor = bgHex;
    previewCard.style.color = textHex;

    // Calculate Luminance
    const lum1 = getRelativeLuminance(bgHex);
    const lum2 = getRelativeLuminance(textHex);
    
    // Compute Contrast Ratio
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    const formattedRatio = ratio.toFixed(2);
    
    if (ratioVal) ratioVal.innerText = `${formattedRatio}:1`;

    // Apply WCAG Standards checks
    if (aaLabel) {
        if (ratio >= 4.5) {
            aaLabel.innerText = "PASS";
            aaLabel.className = "text-success";
        } else {
            aaLabel.innerText = "FAIL";
            aaLabel.className = "text-danger";
            aaLabel.style.color = 'var(--danger)';
        }
    }
    if (aaaLabel) {
        if (ratio >= 7.0) {
            aaaLabel.innerText = "PASS";
            aaaLabel.className = "text-success";
        } else {
            aaaLabel.innerText = "FAIL";
            aaaLabel.className = "text-danger";
            aaaLabel.style.color = 'var(--danger)';
        }
    }
}

// Math helpers for color converters
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function getRelativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    const r = adjustRGBForLuminance(rgb.r);
    const g = adjustRGBForLuminance(rgb.g);
    const b = adjustRGBForLuminance(rgb.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function adjustRGBForLuminance(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/* ==========================================================================
   11. Password Generator & Strength Analyzer Engine
   ========================================================================== */
function initPasswordGenerator() {
    if (!document.getElementById('passLength')) return;
    
    // Sync numerical display indicators
    const slider = document.getElementById('passLength');
    if (slider) {
        slider.addEventListener('input', (e) => {
            document.getElementById('passLengthVal').innerText = e.target.value;
        });
    }

    // Initial triggers
    generateSecurePassword();
}

function generateSecurePassword() {
    const length = parseInt(document.getElementById('passLength').value);
    const useUpper = document.getElementById('passUpper').checked;
    const useLower = document.getElementById('passLower').checked;
    const useNums = document.getElementById('passNumbers').checked;
    const useSyms = document.getElementById('passSymbols').checked;

    const outputField = document.getElementById('passOutput');
    if (!outputField) return;

    // Define pool characters sets
    const upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerPool = "abcdefghijklmnopqrstuvwxyz";
    const numPool = "0123456789";
    const symPool = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let pool = "";
    if (useUpper) pool += upperPool;
    if (useLower) pool += lowerPool;
    if (useNums) pool += numPool;
    if (useSyms) pool += symPool;

    if (!pool) {
        outputField.value = "Select complexity filters!";
        document.getElementById('passStrengthText').innerText = "NONE";
        document.getElementById('passStrengthBar').style.width = "0%";
        document.getElementById('passEntropyVal').innerText = "0 Bits";
        document.getElementById('passTimeCrackVal').innerText = "0 seconds";
        return;
    }

    let password = "";
    
    // Cryptographically secure values array filling
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    for (let i = 0; i < length; i++) {
        const characterIndex = randomArray[i] % pool.length;
        password += pool[characterIndex];
    }

    // Render password output
    outputField.value = password;

    // Calculate Cryptographic Entropy Bits
    const entropy = Math.round(length * Math.log2(pool.length));
    document.getElementById('passEntropyVal').innerText = `${entropy} Bits`;

    // Visual Strength indicator syncing
    const bar = document.getElementById('passStrengthBar');
    const label = document.getElementById('passStrengthText');
    
    if (bar && label) {
        if (entropy < 40) {
            label.innerText = "TOO WEAK (VULNERABLE)";
            label.style.color = "var(--danger)";
            bar.style.width = "20%";
            bar.style.background = "var(--danger)";
        } else if (entropy < 60) {
            label.innerText = "WEAK";
            label.style.color = "#ff9b50";
            bar.style.width = "40%";
            bar.style.background = "#ff9b50";
        } else if (entropy < 80) {
            label.innerText = "MODERATE STRENGTH";
            label.style.color = "#ffd200";
            bar.style.width = "60%";
            bar.style.background = "#ffd200";
        } else if (entropy < 100) {
            label.innerText = "STRONG SECURITY";
            label.style.color = "var(--secondary)";
            bar.style.width = "80%";
            bar.style.background = "var(--secondary)";
        } else {
            label.innerText = "EXTREMELY SECURE (MILITARY-GRADE)";
            label.style.color = "var(--success)";
            bar.style.width = "100%";
            bar.style.background = "linear-gradient(95deg, var(--success), var(--primary))";
        }
    }

    // Calculate Estimated Brute Force Crack Time
    // Assumes standard supercomputer guessing capacity (10 billion guesses/second)
    const guessesPerSec = 1e10; 
    const secondsToCrack = Math.pow(2, entropy) / 2 / guessesPerSec;
    
    let timeLabel = "";
    if (secondsToCrack < 1) {
        timeLabel = "Instantaneous";
    } else if (secondsToCrack < 60) {
        timeLabel = `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
        timeLabel = `${Math.round(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
        timeLabel = `${Math.round(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
        timeLabel = `${Math.round(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 3153600000) {
        timeLabel = `${Math.round(secondsToCrack / 31536000)} years`;
    } else if (secondsToCrack < 3153600000000) {
        timeLabel = `${Math.round(secondsToCrack / 3153600000)} centuries`;
    } else {
        const trillionYears = secondsToCrack / 31536000 / 1e12;
        timeLabel = `${trillionYears.toFixed(1)} Trillion Years`;
    }
    
    document.getElementById('passTimeCrackVal').innerText = timeLabel;
}

function copyPasswordToClipboard() {
    const password = document.getElementById('passOutput').value;
    if (password && !password.startsWith('Select')) {
        navigator.clipboard.writeText(password).then(() => {
            showToast("Secure password copied to clipboard!");
        });
    }
}

/* ==========================================================================
   12. Base64 Encoder & Decoder Engine (100% Client-Side)
   ========================================================================== */
let base64FileBuffer = null;

function initBase64Tool() {
    const dropzone = document.getElementById('base64Dropzone');
    if (!dropzone) return;

    // Drag and drop event listeners
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--primary)';
        dropzone.style.backgroundColor = 'rgba(0, 242, 254, 0.05)';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--border-color)';
        dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--border-color)';
        dropzone.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        
        if (e.dataTransfer.files.length > 0) {
            const files = e.dataTransfer.files;
            document.getElementById('base64FileInput').files = files;
            const event = { target: { files: files } };
            handleBase64FileUpload(event);
        }
    });
}

function switchBase64Mode(mode, element) {
    const parent = element.parentElement;
    const tabButtons = parent.querySelectorAll('.control-tab-btn');
    const subpanels = parent.parentElement.querySelectorAll('.control-subpanel');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    subpanels.forEach(panel => panel.classList.remove('active'));

    element.classList.add('active');
    const activePanel = document.getElementById(`subpanel-base64-${mode}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    // Clear outputs on toggle to avoid layout shifts
    document.getElementById('base64Output').value = "";
}

function triggerBase64FileInput(event) {
    if (event && event.target && event.target.id === 'base64FileInput') return;
    const fileInput = document.getElementById('base64FileInput');
    if (fileInput) fileInput.value = '';
    fileInput.click();
}

function handleBase64FileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 15 * 1024 * 1024) {
            showToast("File size exceeds 15MB limit!", "danger");
            return;
        }
        
        base64FileBuffer = file;
        
        // Show file meta information box
        document.getElementById('base64FileName').innerText = file.name;
        document.getElementById('base64FileSize').innerText = formatFileSize(file.size);
        document.getElementById('base64FilePreviewBox').classList.remove('hidden');
        
        showToast("File loaded successfully!");
    }
}

function clearBase64File() {
    base64FileBuffer = null;
    document.getElementById('base64FileInput').value = "";
    document.getElementById('base64FilePreviewBox').classList.add('hidden');
    document.getElementById('base64Output').value = "";
    showToast("File cleared.");
}

function processBase64Text() {
    const output = document.getElementById('base64Output');
    if (output) output.value = '';
}

function triggerBase64Encode() {
    const activeTab = document.querySelector('#panel-base64 .control-tab-btn.active');
    const isText = activeTab && activeTab.id === 'btn-base64-text';
    const outputBlock = document.getElementById('base64Output');

    if (isText) {
        const text = document.getElementById('base64TextInput').value;
        if (!text) {
            showToast("Please enter text to encode!", "danger");
            return;
        }
        try {
            // Perfect UTF-8 compatible encoding using unescape encodeURIComponent
            const encoded = btoa(unescape(encodeURIComponent(text)));
            outputBlock.value = encoded;
            showToast("Text encoded to Base64!");
        } catch (err) {
            showToast("Encoding failed: " + err.message, "danger");
        }
    } else {
        if (!base64FileBuffer) {
            showToast("Please upload a file to encode!", "danger");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            outputBlock.value = e.target.result;
            showToast("File encoded to Base64!");
        };
        reader.readAsDataURL(base64FileBuffer);
    }
}

function triggerBase64Decode() {
    const activeTab = document.querySelector('#panel-base64 .control-tab-btn.active');
    const isText = activeTab && activeTab.id === 'btn-base64-text';
    const outputBlock = document.getElementById('base64Output');

    if (isText) {
        const base64 = document.getElementById('base64TextInput').value.trim();
        if (!base64) {
            showToast("Please enter Base64 string to decode!", "danger");
            return;
        }
        try {
            // Perfect UTF-8 compatible decoding
            const decoded = decodeURIComponent(escape(atob(base64)));
            outputBlock.value = decoded;
            showToast("Base64 string successfully decoded!");
        } catch (err) {
            outputBlock.value = "// Decoding failed:\n// " + err.message;
            showToast("Invalid Base64 format!", "danger");
        }
    } else {
        showToast("Please use Plain Text tab to decode Base64 strings!", "danger");
    }
}

function copyBase64Output() {
    const output = document.getElementById('base64Output').value;
    if (output) {
        navigator.clipboard.writeText(output).then(() => {
            showToast("Base64 output copied to clipboard!");
        });
    }
}

/* ==========================================================================
   13. SEO Meta Tag Generator Engine (100% Client-Side)
   ========================================================================== */
function initMetaTagGenerator() {
    if (!document.getElementById('metaTitle')) return;
    updateMetaTagsAndPreviews();
}

function switchMetaPreview(mode, element) {
    const parent = element.parentElement;
    const tabButtons = parent.querySelectorAll('.control-tab-btn');
    const subpanels = parent.parentElement.querySelectorAll('.control-subpanel');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    subpanels.forEach(panel => panel.classList.remove('active'));

    element.classList.add('active');
    const activePanel = document.getElementById(`subpanel-meta-${mode}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

function updateMetaTagsAndPreviews() {
    const title = document.getElementById('metaTitle').value.trim();
    const desc = document.getElementById('metaDesc').value.trim();
    const url = document.getElementById('metaUrl').value.trim() || "https://www.yourwebsite.com";
    const keywords = document.getElementById('metaKeywords').value.trim();
    const imgUrl = document.getElementById('metaImageUrl').value.trim() || "https://www.yourwebsite.com/logo.png";

    // Character metrics updates
    const titleLen = title.length;
    const descLen = desc.length;
    
    const countTitle = document.getElementById('charCountTitle');
    const countDesc = document.getElementById('charCountDesc');
    
    if (countTitle) {
        countTitle.innerText = `${titleLen} chars`;
        if (titleLen < 50 || titleLen > 60) {
            countTitle.style.color = '#ff9b50'; // warning orange
        } else {
            countTitle.style.color = 'var(--success)';
        }
    }
    
    if (countDesc) {
        countDesc.innerText = `${descLen} chars`;
        if (descLen < 150 || descLen > 160) {
            countDesc.style.color = '#ff9b50';
        } else {
            countDesc.style.color = 'var(--success)';
        }
    }

    // Google Preview Card Updates
    const googleTitle = document.getElementById('googleSimTitle');
    const googleDesc = document.getElementById('googleSimDesc');
    const googleUrl = document.getElementById('googleSimUrl');
    
    if (googleTitle) googleTitle.innerText = title || "Site Title Will Render Here";
    if (googleDesc) googleDesc.innerText = desc || "Site Description will render here in google snippets layouts...";
    if (googleUrl) googleUrl.innerText = url;

    // Social Preview Card Updates
    const socTitle = document.getElementById('socialSimTitle');
    const socDesc = document.getElementById('socialSimDesc');
    const socDomain = document.getElementById('socialSimDomain');
    const socImg = document.getElementById('socialSimImage');
    
    if (socTitle) socTitle.innerText = title || "Site Title Preview";
    if (socDesc) socDesc.innerText = desc || "Site Description preview...";
    if (socDomain) {
        try {
            const domain = new URL(url).hostname;
            socDomain.innerText = domain;
        } catch (e) {
            socDomain.innerText = "www.yourwebsite.com";
        }
    }
    if (socImg) {
        socImg.style.backgroundImage = `url('${imgUrl}')`;
    }

    // Dynamic HTML tag string generation
    const markup = 
`<!-- HTML Meta Tags -->
<title>${title || "Site Title"}</title>
<meta name="description" content="${desc || ""}">
<meta name="keywords" content="${keywords || ""}">

<!-- Facebook Meta Tags (OpenGraph) -->
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title || ""}">
<meta property="og:description" content="${desc || ""}">
<meta property="og:image" content="${imgUrl}">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="${url.replace(/https?:\/\//i, "")}">
<meta property="twitter:url" content="${url}">
<meta name="twitter:title" content="${title || ""}">
<meta name="twitter:description" content="${desc || ""}">
<meta name="twitter:image" content="${imgUrl}">`;

    document.getElementById('metaGeneratedCode').value = markup;
}

function copyMetaTagsCode() {
    const code = document.getElementById('metaGeneratedCode').value;
    if (code) {
        navigator.clipboard.writeText(code).then(() => {
            showToast("SEO HTML Meta tags copied successfully!");
        });
    }
}

/* ==========================================================================
   14. Inflation & Purchasing Power Depreciation Engine (Chart.js)
   ========================================================================== */
let inflationChartInstance = null;

function initInflationCalc() {
    if (!document.getElementById('infCapital')) return;
    calculateInflationLoss();
}

function updateInflationRateLabel() {
    const val = parseFloat(document.getElementById('infRate').value);
    document.getElementById('infRateVal').innerText = `${val.toFixed(1)}%`;
}

function updateInflationYearsLabel() {
    const val = parseInt(document.getElementById('infYears').value);
    document.getElementById('infYearsVal').innerText = `${val} Years`;
}

function calculateInflationLoss() {
    const capital = parseFloat(document.getElementById('infCapital').value) || 0;
    const rate = parseFloat(document.getElementById('infRate').value) / 100 || 0;
    const years = parseInt(document.getElementById('infYears').value) || 0;

    if (years <= 0 || capital <= 0) return;

    let originalData = [];
    let futureData = [];
    let labels = [];

    let currentVal = capital;

    for (let year = 1; year <= years; year++) {
        // Mathematically compound cash depreciation 
        currentVal = currentVal / (1 + rate);
        
        originalData.push(capital);
        futureData.push(Math.round(currentVal));
        labels.push(`Year ${year}`);
    }

    const totalLost = capital - currentVal;

    // Update Stats indicators
    document.getElementById('infOrigValue').innerText = formatCurrency(capital);
    document.getElementById('infFutureValue').innerText = formatCurrency(currentVal);
    document.getElementById('infValueLost').innerText = formatCurrency(totalLost);

    // Refresh dynamic Chart.js canvas instance
    renderInflationChart(labels, originalData, futureData);
}

function renderInflationChart(labels, originalData, futureData) {
    const ctx = document.getElementById('inflationChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (inflationChartInstance) {
        inflationChartInstance.destroy();
    }

    inflationChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Original Cash Value ($)',
                    data: originalData,
                    borderColor: '#8b92b6',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'Real Purchasing Power ($)',
                    data: futureData,
                    borderColor: '#ff1744', // glowing mehangai red
                    backgroundColor: 'rgba(255, 23, 68, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#8b92b6',
                        font: { family: 'Outfit', size: 12 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#8b92b6', font: { family: 'Inter' } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: {
                        color: '#8b92b6',
                        font: { family: 'Inter' },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

/* ==========================================================================
   Viral Growth Hooks
   ========================================================================== */
function shareTool(toolId) {
    const messages = {
        'qr-generator': "I just created an awesome custom QR Code instantly! Try this 100% free, private tool here: ",
        'image-compressor': "I just optimized my images without losing quality! Try this blazing fast offline tool: "
    };
    
    const baseText = messages[toolId] || "Check out this amazing free developer utility hub: ";
    const url = "https://www.omnitechtools.com/" + (toolId !== 'qr-generator' && toolId !== 'image-compressor' ? '' : toolId + '/');
    
    if (navigator.share) {
        navigator.share({
            title: 'OmniTools',
            text: baseText,
            url: url
        }).catch(err => {
            console.log("Share cancelled or failed.", err);
        });
    } else {
        // Fallback for desktop/unsupported browsers: Copy to clipboard
        navigator.clipboard.writeText(baseText + url).then(() => {
            showToast("Share link copied to clipboard! You can now paste it anywhere.");
        }).catch(err => {
            showToast("Failed to copy link. Please copy manually: " + url);
        });
    }
}


// Robust execution handle for asynchronous or direct script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

/* ==========================================================================
   Premium Sharing Logic
   ========================================================================== */
function shareToolResult(platform, btnElement = null) {
    // Get active tab info
    const activeTabId = document.querySelector('.tab-panel.active') ? document.querySelector('.tab-panel.active').id.replace('panel-', '') : 'home';
    const currentUrl = window.location.href;
    
    // Dynamic message based on tool
    let shareMessage = "Check out OmniTools, a premium suite of free developer utilities!";
    
    if (activeTabId === 'qr-generator') {
        shareMessage = "Just created a stunning custom premium QR Code for free on OmniTools! Try it here:";
    } else if (activeTabId === 'image-compressor') {
        shareMessage = "Optimized my website images offline using OmniTools. Lightning fast and secure! Check it out:";
    } else if (activeTabId === 'css-builder') {
        shareMessage = "Built a beautiful Glassmorphism UI component for free on OmniTools! Try the generator:";
    } else if (activeTabId === 'finance-calc') {
        shareMessage = "Just ran my FIRE retirement numbers on OmniTools! Calculate your financial freedom timeline here:";
    } else if (activeTabId === 'password-generator') {
        shareMessage = "Generated a cryptographically secure password entirely offline using OmniTools! Stay secure:";
    } else if (activeTabId === 'color-palette') {
        shareMessage = "Exploring beautiful WCAG-compliant color palettes on OmniTools! See the combinations:";
    } else if (activeTabId === 'svg-blob') {
        shareMessage = "Generated some awesome organic SVG blobs and waves for my UI design using OmniTools:";
    }

    const encodedMsg = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(currentUrl);
    
    if (platform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodedMsg}%20${encodedUrl}`, '_blank');
    } else if (platform === 'telegram') {
        window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedMsg}`, '_blank');
    } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedUrl}`, '_blank');
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(`${shareMessage} ${currentUrl}`).then(() => {
            if (btnElement) {
                const originalText = btnElement.querySelector('span').innerText;
                const originalIcon = btnElement.innerHTML;
                
                // Show success state
                btnElement.innerHTML = '<i data-lucide="check" style="color: #000;"></i> <span style="color: #000;">Copied!</span>';
                lucide.createIcons();
                
                // Revert after 2 seconds
                setTimeout(() => {
                    btnElement.innerHTML = originalIcon;
                    lucide.createIcons();
                }, 2000);
            }
            showToast("Share link copied to clipboard!");
        });
    }
}


/* ==========================================================================
   Accessibility (A11y) Tools Logic
   ========================================================================== */

let currentTextSize = 100;
let isHighContrast = false;
let isDyslexicFont = false;

function initA11y() {
    // Load saved preferences
    const savedSize = localStorage.getItem('a11y-text-size');
    const savedContrast = localStorage.getItem('a11y-high-contrast');
    const savedDyslexic = localStorage.getItem('a11y-dyslexic');

    if (savedSize) {
        currentTextSize = parseInt(savedSize);
        applyTextSize();
    }
    if (savedContrast === 'true') {
        toggleHighContrast(true);
    }
    if (savedDyslexic === 'true') {
        toggleDyslexicFont(true);
    }
}

function toggleA11yPanel() {
    const panel = document.getElementById('a11yPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

function changeTextSize(step) {
    if (step === 0) {
        currentTextSize = 100;
    } else {
        currentTextSize += (step * 10);
    }
    
    // Limits
    if (currentTextSize < 90) currentTextSize = 90;
    if (currentTextSize > 120) currentTextSize = 120;
    
    applyTextSize();
    localStorage.setItem('a11y-text-size', currentTextSize.toString());
}

function applyTextSize() {
    // Remove old classes
    document.documentElement.classList.remove('text-size-90', 'text-size-100', 'text-size-110', 'text-size-120');
    // Add new class
    document.documentElement.classList.add(`text-size-${currentTextSize}`);
}

function toggleHighContrast(forceState = null) {
    const btn = document.getElementById('a11yContrastBtn');
    if (forceState !== null) {
        isHighContrast = forceState;
    } else {
        isHighContrast = !isHighContrast;
    }

    if (isHighContrast) {
        document.body.classList.add('high-contrast');
        if (btn) btn.classList.add('active');
    } else {
        document.body.classList.remove('high-contrast');
        if (btn) btn.classList.remove('active');
    }
    
    localStorage.setItem('a11y-high-contrast', isHighContrast.toString());
}

function toggleDyslexicFont(forceState = null) {
    const btn = document.getElementById('a11yDyslexicBtn');
    if (forceState !== null) {
        isDyslexicFont = forceState;
    } else {
        isDyslexicFont = !isDyslexicFont;
    }

    if (isDyslexicFont) {
        document.body.classList.add('dyslexic-mode');
        if (btn) btn.classList.add('active');
    } else {
        document.body.classList.remove('dyslexic-mode');
        if (btn) btn.classList.remove('active');
    }
    
    localStorage.setItem('a11y-dyslexic', isDyslexicFont.toString());
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initA11y();
});
/* ==========================================================================
   Global Currency State Management
   ========================================================================== */
let globalUserCurrency = '$';

function initCurrency() {
    const savedCurrency = localStorage.getItem('omni-currency');
    if (savedCurrency) {
        updateGlobalCurrency(savedCurrency, false);
    }
}

function updateGlobalCurrency(symbol, save = true) {
    globalUserCurrency = symbol;
    if (save) {
        localStorage.setItem('omni-currency', symbol);
    }
    
    // Update all dropdowns
    const dropdowns = document.querySelectorAll('.currency-selector');
    dropdowns.forEach(dd => dd.value = symbol);

    // Update all label spans
    const labels = document.querySelectorAll('.currency-label');
    labels.forEach(lbl => lbl.innerText = symbol);

    // Re-trigger math charts if functions exist
    if (typeof calculateFinancialGrowth === 'function' && document.getElementById('finPrincipal')) {
        calculateFinancialGrowth();
    }
    if (typeof calculateInflationLoss === 'function' && document.getElementById('infInitial')) {
        calculateInflationLoss();
    }
}

// Attach to DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCurrency();
});



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
        
        let output = `Found ${matches.length} match(es):\n\n`;
        matches.forEach((match, i) => {
            output += `Match ${i + 1}: "${match[0]}" at index ${match.index}\n`;
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
    
    const words = text.trim().split(/\s+/).length;
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
    document.getElementById('loremOutput').value = result.join('\n\n');
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
    document.getElementById('uuidOutput').value = result.join('\n');
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

// ==========================================
// 5 HIGH-TRAFFIC TOOLS LOGIC
// ==========================================

// 1. Image Resizer
let resizerImgObj = new Image();
function loadResizerImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        resizerImgObj.onload = () => {
            document.getElementById('resizerWidth').value = resizerImgObj.width;
            document.getElementById('resizerHeight').value = resizerImgObj.height;
            
            // Hide the placeholder text safely
            const p = document.getElementById('resizerPreviewArea').querySelector('p');
            if (p) p.style.display = 'none';
            
            // Show original image on canvas as preview
            const canvas = document.getElementById('resizerCanvas');
            canvas.width = resizerImgObj.width;
            canvas.height = resizerImgObj.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(resizerImgObj, 0, 0);
            canvas.style.display = 'block';
        }
        resizerImgObj.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function toggleLockAspect() {
    maintainAspect('width');
}

function maintainAspect(changed) {
    const lock = document.getElementById('resizerLock').checked;
    if (!lock || !resizerImgObj.src) return;
    const ratio = resizerImgObj.width / resizerImgObj.height;
    const wEl = document.getElementById('resizerWidth');
    const hEl = document.getElementById('resizerHeight');
    if (changed === 'width' && wEl.value) {
        hEl.value = Math.round(wEl.value / ratio);
    } else if (changed === 'height' && hEl.value) {
        wEl.value = Math.round(hEl.value * ratio);
    }
}

function resizeImage() {
    if (!resizerImgObj.src) return alert("Please upload an image first.");
    const w = parseInt(document.getElementById('resizerWidth').value);
    const h = parseInt(document.getElementById('resizerHeight').value);
    if (!w || !h) return alert("Enter valid width and height.");
    
    const canvas = document.getElementById('resizerCanvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(resizerImgObj, 0, 0, w, h);
    
    document.getElementById('resizerDownloadBtn').style.display = 'block';
}

function downloadResizedImage() {
    const canvas = document.getElementById('resizerCanvas');
    const link = document.createElement('a');
    link.download = 'resized-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// 2. PDF Merge
let pdfFilesToMerge = [];
function renderPdfList(e) {
    const newFiles = Array.from(e.target.files);
    pdfFilesToMerge = pdfFilesToMerge.concat(newFiles);
    e.target.value = ''; // Reset input to allow adding the same file again if needed
    updatePdfListView();
}

function removePdfFile(index) {
    pdfFilesToMerge.splice(index, 1);
    updatePdfListView();
}

function updatePdfListView() {
    const list = document.getElementById('pdfFileList');
    list.innerHTML = '';
    if (pdfFilesToMerge.length < 2) {
        list.innerHTML = '<li class="text-muted" style="list-style: none; padding-left: 0;">Please select at least 2 PDF files. (' + pdfFilesToMerge.length + ' selected)</li>';
        document.getElementById('btnMergePdfs').disabled = true;
    } else {
        document.getElementById('btnMergePdfs').disabled = false;
    }
    
    pdfFilesToMerge.forEach((f, i) => {
        let li = document.createElement('li');
        li.textContent = f.name;
        
        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&times;';
        removeBtn.style.marginLeft = '15px';
        removeBtn.style.background = 'rgba(255, 68, 68, 0.1)';
        removeBtn.style.border = 'none';
        removeBtn.style.color = '#ff4444';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.width = '24px';
        removeBtn.style.height = '24px';
        removeBtn.style.display = 'inline-flex';
        removeBtn.style.alignItems = 'center';
        removeBtn.style.justifyContent = 'center';
        removeBtn.onclick = () => removePdfFile(i);
        
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
    document.getElementById('pdfMergeResult').style.display = 'none';
}

async function mergePdfs() {
    if (!window.PDFLib) {
        alert("Loading PDF engine, please wait a second and try again...");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
        return;
    }
    const { PDFDocument } = window.PDFLib;
    document.getElementById('btnMergePdfs').innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Merging...';
    if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
    
    try {
        const mergedPdf = await PDFDocument.create();
        for (let file of pdfFilesToMerge) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        document.getElementById('pdfMergeDownloadBtn').onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged-document.pdf';
            a.click();
        };
        document.getElementById('pdfMergeResult').style.display = 'block';
    } catch (e) {
        alert("Error: " + e.message + "\\nMake sure the PDFs are not password protected or corrupted.");
        console.error("PDF Merge Error:", e);
    }
    document.getElementById('btnMergePdfs').innerHTML = '<i data-lucide="file-plus"></i> Merge PDFs';
    if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
}

// 3. Unit Converter
const units = {
    length: { 'Meter': 1, 'Kilometer': 1000, 'Centimeter': 0.01, 'Mile': 1609.34, 'Yard': 0.9144, 'Foot': 0.3048, 'Inch': 0.0254 },
    weight: { 'Gram': 1, 'Kilogram': 1000, 'Milligram': 0.001, 'Pound': 453.592, 'Ounce': 28.3495 },
    temp: { 'Celsius': 'c', 'Fahrenheit': 'f', 'Kelvin': 'k' },
    storage: { 'Byte': 1, 'Kilobyte': 1024, 'Megabyte': 1048576, 'Gigabyte': 1073741824, 'Terabyte': 1099511627776 }
};

function updateUnitOptions() {
    const cat = document.getElementById('unitCategory').value;
    const fromSelect = document.getElementById('unitFrom');
    const toSelect = document.getElementById('unitTo');
    if (!fromSelect || !toSelect) return;
    fromSelect.innerHTML = ''; toSelect.innerHTML = '';
    
    for (let u in units[cat]) {
        fromSelect.add(new Option(u, u));
        toSelect.add(new Option(u, u));
    }
    if (toSelect.options.length > 1) toSelect.selectedIndex = 1;
    convertUnits();
}

function convertUnits() {
    const cat = document.getElementById('unitCategory').value;
    const val = parseFloat(document.getElementById('unitInputVal').value);
    if (isNaN(val)) return document.getElementById('unitOutputVal').value = '';
    
    const from = document.getElementById('unitFrom').value;
    const to = document.getElementById('unitTo').value;
    let res = 0;
    
    if (cat === 'temp') {
        let celsius = val;
        if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
        if (from === 'Kelvin') celsius = val - 273.15;
        
        if (to === 'Celsius') res = celsius;
        if (to === 'Fahrenheit') res = (celsius * 9/5) + 32;
        if (to === 'Kelvin') res = celsius + 273.15;
    } else {
        const baseVal = val * units[cat][from];
        res = baseVal / units[cat][to];
    }
    
    document.getElementById('unitOutputVal').value = Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}

// 4. YouTube Thumbnail Downloader
function extractYtThumbnail() {
    const url = document.getElementById('ytUrlInput').value;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
        const vid = match[1];
        const imgUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
        const imgEl = document.getElementById('ytThumbnailImg');
        imgEl.src = imgUrl;
        imgEl.style.display = 'block';
        document.getElementById('ytPreviewArea').querySelector('p').style.display = 'none';
        document.getElementById('ytDownloadBtn').style.display = 'block';
        document.getElementById('ytDownloadBtn').dataset.url = imgUrl;
    } else {
        document.getElementById('ytThumbnailImg').style.display = 'none';
        document.getElementById('ytPreviewArea').querySelector('p').style.display = 'block';
        document.getElementById('ytDownloadBtn').style.display = 'none';
    }
}

function downloadYtThumbnail() {
    const url = document.getElementById('ytDownloadBtn').dataset.url;
    if (!url) return;
    
    document.getElementById('ytDownloadBtn').innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Downloading...';
    if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);

    // Remove protocol for wsrv.nl
    const cleanUrl = url.replace(/^https?:\/\//, '');

    const proxies = [
        'https://wsrv.nl/?url=' + encodeURIComponent(cleanUrl),
        'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
        'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)
    ];

    async function tryFetch(index) {
        if (index >= proxies.length) {
            document.getElementById('ytDownloadBtn').innerHTML = '<i data-lucide="download"></i> Download HD Thumbnail';
            if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
            alert("Could not download automatically. Please Right-Click the image above and select 'Save Image As'.");
            return;
        }
        try {
            const res = await fetch(proxies[index]);
            if (!res.ok) throw new Error("Proxy response not ok");
            const blob = await res.blob();
            
            // Validate blob is an image
            if (!blob.type.startsWith('image/')) throw new Error("Not an image");

            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'youtube-thumbnail-hd.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            
            document.getElementById('ytDownloadBtn').innerHTML = '<i data-lucide="download"></i> Download HD Thumbnail';
            if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
        } catch (e) {
            console.warn("Proxy failed:", proxies[index], e);
            tryFetch(index + 1);
        }
    }
    
    tryFetch(0);
}

// 5. Text to Speech


// Init unit converter and voices
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('unitCategory')) updateUnitOptions();
});
