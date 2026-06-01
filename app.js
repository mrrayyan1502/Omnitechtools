function startApp() {
    // Initialize Lucide Vector Icons safely
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Core Navigation & Routing Handling
    initNavigation();
    
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
    initInflationCalc();
}

// Robust execution handle for asynchronous or direct script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

/* ==========================================================================
   1. Core Layout & Navigation
   ========================================================================== */
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
    'meta-generator': '/meta-tag-generator/',
    'inflation-calc': '/inflation-calculator/',
    'blog': '/blog/',
    'blog-article-qr': '/blog/qr-codes-digital-marketing/',
    'blog-article-compress': '/blog/image-compression-performance/',
    'blog-article-glass': '/blog/css-glassmorphism-trends/',
    'blog-article-fire': '/blog/financial-independence-compound-growth/',
    'blog-article-privacy': '/blog/developer-utilities-privacy/'
};

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
        document.getElementById('contentViewport').addEventListener('click', () => {
            appSidebar.classList.remove('mobile-active');
        });
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
    let prettyTitle = "OmniTools - The Free Premium Creator & Developer Utility Hub";
    let metaDesc = "OmniTools is a 100% free, private-by-design creator & developer utility hub. Generate custom styled QR codes, compress images, and calculate growth.";
    let schemaJson = null;

    if (tabId === 'qr-generator') {
        prettyTitle = "Free Custom QR Code Generator with Logo & Colors | OmniTools";
        metaDesc = "Generate highly stylized QR codes with gradient fills, rounded dots, custom eyes, and upload your brand logo for 100% free.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Custom QR Code Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "MultimediaApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'image-compressor') {
        prettyTitle = "Online Image Compressor & WebP Converter (Private & Offline) | OmniTools";
        metaDesc = "Reduce JPEG and PNG file sizes or convert them directly to WebP offline. Zero server uploads ensures 100% privacy.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Browser Image Compressor",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
        
        // Custom URL Simulator trigger
        if (window.location.pathname === '/webp-converter/') {
            const formatSelect = document.getElementById('compressFormat');
            if (formatSelect) {
                formatSelect.value = 'image/webp';
            }
        }
    } else if (tabId === 'css-builder') {
        prettyTitle = "Advanced CSS Glassmorphism Generator & UI Studio | OmniTools";
        metaDesc = "Create modern frosted-glass cards and visual gradients with slider controls. Export production-ready CSS3 styles instantly.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Glassmorphism CSS Studio",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'finance-calc') {
        prettyTitle = "Compound Interest & FIRE Target Calculator with Charts | OmniTools";
        metaDesc = "Forecast monthly savings, compound growth yields, and timeline targets. Visual graphs powered client-side.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "FIRE Compound Interest Calculator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "FinanceApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };

        // Custom URL Simulator trigger
        if (window.location.pathname === '/fire-calculator/') {
            const rateInput = document.getElementById('finRate');
            if (rateInput) {
                rateInput.value = '12'; // pre-fill 12% high-yield investment forecast
            }
        }
    } else if (tabId === 'about') {
        prettyTitle = "About Us - The OmniTools Mission";
        metaDesc = "Learn about the serverless, private-first utilities mission behind OmniTools. Clean digital tools accessible globally without paywalls.";
    } else if (tabId === 'privacy') {
        prettyTitle = "Privacy Policy & Data Security | OmniTools";
        metaDesc = "Read our official privacy statements. Browser local processing guarantees absolute protection for your private files.";
    } else if (tabId === 'terms') {
        prettyTitle = "Terms of Service & Licensing Disclaimers | OmniTools";
        metaDesc = "Terms of service and licensing rules for utilizing the free tools inside the OmniTools Suite.";
    } else if (tabId === 'contact') {
        prettyTitle = "Contact Us & Support Helpdesk | OmniTools";
        metaDesc = "Get in touch with the OmniTools creators for partnerships, feedback, bug reporting, or support.";
    } else if (tabId === 'json-formatter') {
        prettyTitle = "Online JSON Formatter, Beautifier & Validator | OmniTools";
        metaDesc = "Format, minify, and validate JSON strings offline. Spot syntax issues instantly with glowing error indicators and folding tree viewers.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JSON Formatter & Validator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'svg-blob') {
        prettyTitle = "Dynamic SVG Blob & Gradient Wave Generator | OmniTools";
        metaDesc = "Generate custom organic SVG vector shapes and wave overlays with colors and gradients. Export SVG codes and assets for web design.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SVG Blob Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'color-palette') {
        prettyTitle = "Advanced Color Palette Generator & Contrast Checker | OmniTools";
        metaDesc = "Generate professional color schemes harmonies and analyze text background contrast ratios for WCAG AA/AAA compliance ratings.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Color Palette Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DesignApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'password-generator') {
        prettyTitle = "Secure Offline Password Generator & Strength Meter | OmniTools";
        metaDesc = "Generate cryptographically secure passwords offline using Web Crypto API. Tweak length complexity, calculate entropy, and check brute force crack times.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Secure Password Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "SecurityApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'base64') {
        prettyTitle = "Online Base64 Encoder & Decoder (100% Offline) | OmniTools";
        metaDesc = "Encode UTF-8 text strings or binary files to Base64 instantly offline, or decode Base64 data back safely. Zero data server uploads ensure 100% privacy.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Base64 Encoder & Decoder",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'meta-generator') {
        prettyTitle = "SEO Meta Tag Generator & Search Result Previewer | OmniTools";
        metaDesc = "Generate highly-optimized HTML meta tags for your website. Preview search snippet visuals for Google, Facebook, and Twitter cards in real-time.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SEO Meta Tag Generator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (tabId === 'inflation-calc') {
        prettyTitle = "Historical Inflation & Purchasing Power Depreciation Calculator | OmniTools";
        metaDesc = "Track how compound annual inflation rates depreciate starting capital values over time. View real-time CPI money value charts client-side.";
        schemaJson = {
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
        };
    } else if (tabId === 'blog') {
        prettyTitle = "Premium SEO Guides & Digital Creator Blog | OmniTools";
        metaDesc = "Explore the official OmniTools blog. Read expert tutorials on QR codes, image compression, CSS UI trends, personal finance calculations, and web security.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "OmniTools Creator Blog",
            "description": "High-value articles about web development, UI design, speed optimization, and digital marketing."
        };
    } else if (tabId === 'blog-article-qr') {
        prettyTitle = "QR Codes in Digital Marketing: Boosting Conversions | OmniTools";
        metaDesc = "Learn how stylized custom QR codes with gradient fills and logo embeds bridge the offline-to-online marketing gap to boost user conversion rates.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Ultimate Guide to QR Codes in Digital Marketing: Boosting Offline-to-Online Conversion Rates",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        };
    } else if (tabId === 'blog-article-compress') {
        prettyTitle = "Web Image Compression: Optimizing Speed & Core Web Vitals | OmniTools";
        metaDesc = "The definitive technical guide on offline JPEG, PNG, and WebP compression. Optimize site loading speeds and enhance Core Web Vitals automatically.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Technical Guide to Web Image Compression: Optimizing Performance, SEO, and Core Web Vitals",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        };
    } else if (tabId === 'blog-article-glass') {
        prettyTitle = "Glassmorphism UI Trends & Backdrop Filter Styling | OmniTools";
        metaDesc = "Master the visual style of frosted glass UI design. Learn the CSS backdrop-filter formulas, accessibility parameters, and visual shadows design techniques.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Glassmorphism in Modern UI Design: Mastering CSS Backdrop Filters and Frosted Glass Aesthetics",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        };
    } else if (tabId === 'blog-article-fire') {
        prettyTitle = "The Math of Financial Independence & FIRE Safe Withdrawals | OmniTools";
        metaDesc = "Analyze the mathematical foundation of financial independence. Master the Rule of 25, 4% Safe Withdrawal Rate, and compound interest wealth growth lines.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Math of Financial Independence: How Compound Interest and FIRE Metrics Define Your Future",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        };
    } else if (tabId === 'blog-article-privacy') {
        prettyTitle = "Browser Privacy & Serverless Client-Side Web Tools | OmniTools";
        metaDesc = "Explore why serverless, client-side web utility architectures are the future of user privacy. Learn how offline FileReader and Web Crypto APIs protect data.";
        schemaJson = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Why Serverless Client-Side Utilities are the Future of Web Developer Tools and Browser Privacy",
            "datePublished": "2026-06-01",
            "author": { "@type": "Organization", "name": "OmniTools" }
        };
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
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', window.location.origin + (tabToRouteMap[tabId] || '/'));

    // Update Canonical tag link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + (tabToRouteMap[tabId] || '/'));

    // Inject Search Engine structured data schemas
    injectSchema(schemaJson);

    // Push State to browser history API
    if (pushToHistory) {
        const targetRoute = tabToRouteMap[tabId] || '/';
        history.pushState({ tabId: tabId }, prettyTitle, targetRoute);
    }

    // Smooth scroll content area viewport and window to top on tab switch
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const viewport = document.getElementById('contentViewport');
        if (viewport) {
            viewport.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 50);
    
    // Close mobile menu if active
    const appSidebar = document.getElementById('appSidebar');
    if (appSidebar) {
        appSidebar.classList.remove('mobile-active');
    }

    // On-Demand Lazy Loading for Heavy Libraries
    if (tabId === 'qr-generator') {
        loadScript("https://unpkg.com/qr-code-styling@1.5.0-rc.2/lib/qr-code-styling.js", () => {
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
    } catch {
        safeName = `qr-${qrText.substring(0, 12).replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
    }

    qrCodeStyling.download({
        name: safeName,
        extension: extension
    });
    
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

function triggerCompressFileInput() {
    document.getElementById('compressFileInput').click();
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
    // Generate initial card visual
    updateGlassStudio();
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
    if (!ctx) return;

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
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ==========================================================================
   6. Contact Form & Support Handler (Client-Side Simulated Submission)
   ========================================================================== */
function handleContactSubmit(event) {
    event.preventDefault();
    
    const btn = document.getElementById('btnContactSubmit');
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    
    if (!btn || !name || !email) return;
    
    // Simulate beautiful premium loading sequence
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Sending Message...`;
    lucide.createIcons(); // render standard icons
    
    setTimeout(() => {
        // Reset form inputs
        document.getElementById('contactForm').reset();
        
        // Restore button state
        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
        
        // Trigger success feedback popup
        showToast(`Thank you, ${name}! Your message has been sent successfully. We will reply to ${email} within 24 hours.`, "success");
    }, 1500);
}

/* ==========================================================================
   7. Helper Utilities for Lazy Loading & SEO Schema Markups
   ========================================================================== */
const loadedScripts = {};

// Performance dynamic script injector
function loadScript(url, callback) {
    if (loadedScripts[url]) {
        if (callback) callback();
        return;
    }
    
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
        loadedScripts[url] = true;
        if (callback) callback();
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

function triggerBase64FileInput() {
    document.getElementById('base64FileInput').click();
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
        } catch {
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
    if (!ctx) return;

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

