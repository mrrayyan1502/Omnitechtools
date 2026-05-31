/* ==========================================================================
   OmniTools - Main Core Javascript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Vector Icons
    lucide.createIcons();
    
    // Core Navigation & Routing Handling
    initNavigation();
    
    // Core Image Compressor Setup (Pre-instantiated, zero heavy libraries)
    initImageCompressor();

    // Core Glassmorphism Studio Setup (Pre-instantiated, zero heavy libraries)
    initGlassStudio();
});

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
    '/contact/': 'contact'
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
    'contact': '/contact/'
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

    // Smooth scroll content area viewport to top on tab switch
    const viewport = document.getElementById('contentViewport');
    if (viewport) {
        viewport.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
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
