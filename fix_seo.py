import os

def fix_h1_and_inject_blogs():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Fix the sr-only H1
    html = html.replace('<h1 class="sr-only">', '<span class="sr-only">')
    html = html.replace('</h1>\n                        <div class="search-box">', '</span>\n                        <div class="search-box">')

    # 2. Fix Blog H1 tags to H2
    html = html.replace('<h1>The Ultimate Guide to QR Codes', '<h2>The Ultimate Guide to QR Codes')
    html = html.replace('Conversion Rates</h1>', 'Conversion Rates</h2>')

    html = html.replace('<h1>The Technical Guide to Web Image Compression', '<h2>The Technical Guide to Web Image Compression')
    html = html.replace('Core Web Vitals</h1>', 'Core Web Vitals</h2>')

    html = html.replace('<h1>Glassmorphism in Modern UI Design', '<h2>Glassmorphism in Modern UI Design')
    html = html.replace('Glass Aesthetics</h1>', 'Glass Aesthetics</h2>')

    html = html.replace('<h1>The Math of Financial Independence: How Compound Interest', '<h2>The Math of Financial Independence: How Compound Interest')
    html = html.replace('Shape Your Future</h1>', 'Shape Your Future</h2>')

    html = html.replace('<h1>Why Serverless Client-Side Utilities', '<h2>Why Serverless Client-Side Utilities')
    html = html.replace('Browser Privacy</h1>', 'Browser Privacy</h2>')

    # 3. Create 7 new SEO Blog Articles HTML
    # We inject these before `</main>`
    new_blogs_html = """
                <!-- TAB: BLOG ARTICLE - JSON FORMATTER -->
                <section class="tab-panel" id="panel-blog-article-json">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>The Ultimate Developer's Guide to JSON Formatting and Validation</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 6 min read</span>
                                <span><i data-lucide="tag"></i> Development</span>
                            </div>
                            
                            <p class="lead">JSON (JavaScript Object Notation) has become the de-facto standard for data interchange on the web. Learn why offline validation and formatting is critical for modern API development.</p>
                            
                            <h3>Why Developers Need Offline JSON Tools</h3>
                            <p>Pasting sensitive API payloads or proprietary configuration files into online formatting tools exposes your data to third-party servers. Using a client-side, offline-first tool like the OmniTools JSON Formatter guarantees that your data never leaves your browser.</p>
                            
                            <h3>Common JSON Errors and How to Fix Them</h3>
                            <p>Most JSON parsing errors stem from simple mistakes like trailing commas, missing quotation marks around keys, or unmatched brackets. A robust validator instantly highlights the exact line of the syntax error.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - SVG BLOB -->
                <section class="tab-panel" id="panel-blog-article-svg">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>Mastering SVG Organic Blobs in Modern Web Design</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 5 min read</span>
                                <span><i data-lucide="tag"></i> Design</span>
                            </div>
                            
                            <p class="lead">Organic shapes and fluid SVG blobs have revolutionized UI design, breaking away from rigid grids to create dynamic, flowing interfaces.</p>
                            
                            <h3>The Math Behind the Blob</h3>
                            <p>Organic blobs are generated using complex Bezier curves and mathematical sine waves. By mapping points onto a circle and applying random displacement vectors, developers can generate infinite unique shapes.</p>
                            
                            <h3>Performance Benefits of SVG</h3>
                            <p>Unlike PNG or WebP images, SVG blobs are rendered using mathematics natively by the browser. This means they are infinitely scalable without quality loss and have a file size of mere bytes, perfectly optimizing Core Web Vitals.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - COLOR PALETTE -->
                <section class="tab-panel" id="panel-blog-article-color">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>Color Theory for UI/UX: Building Harmonious Palettes</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 7 min read</span>
                                <span><i data-lucide="tag"></i> UX Design</span>
                            </div>
                            
                            <p class="lead">Choosing the right colors is more than just aesthetics; it is about brand psychology, accessibility, and visual hierarchy.</p>
                            
                            <h3>The 60-30-10 Rule</h3>
                            <p>A classic interior design rule that applies perfectly to UI design: 60% of your interface should be a dominant background color, 30% a secondary color (like cards or menus), and 10% an accent color for calls-to-action.</p>
                            
                            <h3>WCAG Accessibility Standards</h3>
                            <p>Color contrast is critical for legibility. Using an HSL-based palette generator allows designers to precisely control lightness and saturation to meet WCAG AA or AAA contrast ratios.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - PASSWORD GEN -->
                <section class="tab-panel" id="panel-blog-article-password">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>Cryptographic Security: How Secure Password Generators Work</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 8 min read</span>
                                <span><i data-lucide="tag"></i> Cybersecurity</span>
                            </div>
                            
                            <p class="lead">With the rise of automated brute-force attacks and GPU hashing, weak passwords are the leading cause of data breaches.</p>
                            
                            <h3>Math.random vs. Crypto.getRandomValues</h3>
                            <p>Standard random number generators in programming are 'pseudo-random' and predictable. Secure tools use the Web Crypto API, utilizing the operating system's entropy pool to generate cryptographically secure passwords.</p>
                            
                            <h3>Password Entropy</h3>
                            <p>Password strength is measured in 'entropy'. A 16-character password mixing uppercase, lowercase, numbers, and symbols provides over 90 bits of entropy, which would take current supercomputers trillions of years to crack.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - BASE64 -->
                <section class="tab-panel" id="panel-blog-article-base64">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>Understanding Base64 Encoding in Web Architecture</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 5 min read</span>
                                <span><i data-lucide="tag"></i> Web Dev</span>
                            </div>
                            
                            <p class="lead">Base64 is a fundamental encoding scheme used universally across the internet to transmit binary data over text-based protocols.</p>
                            
                            <h3>Why Encode Data?</h3>
                            <p>Protocols like HTTP, SMTP, and HTML were designed for text. When you need to embed an image directly into CSS or transfer an authentication token, you must convert binary data (1s and 0s) into safe, printable ASCII characters. Base64 translates 3 bytes of data into 4 ASCII characters.</p>
                            
                            <h3>Security Misconception</h3>
                            <p>Base64 is an encoding scheme, NOT encryption. Anyone can decode a Base64 string instantly. Never use Base64 to 'hide' sensitive data unless it is first encrypted via standard cryptographic methods.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - META TAGS -->
                <section class="tab-panel" id="panel-blog-article-meta">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>The Ultimate SEO Meta Tags Guide for 2026</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 6 min read</span>
                                <span><i data-lucide="tag"></i> SEO</span>
                            </div>
                            
                            <p class="lead">Meta tags remain the critical bridge between your website's content and search engine crawlers, dictating how your site appears in Google, Twitter, and Facebook.</p>
                            
                            <h3>Title and Description Optimization</h3>
                            <p>Your Title Tag should be under 60 characters to prevent truncation, embedding high-intent keywords naturally. The Meta Description, while not a direct ranking factor, drastically affects your Click-Through Rate (CTR) and should act as compelling ad copy under 160 characters.</p>
                            
                            <h3>OpenGraph and Twitter Cards</h3>
                            <p>Social media sharing drives viral growth. Implementing specific OpenGraph (og:title, og:image) and Twitter Card tags ensures that when someone pastes your link into a chat or feed, it generates a beautiful, clickable preview card rather than a boring blue link.</p>
                        </div>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - INFLATION -->
                <section class="tab-panel" id="panel-blog-article-inflation">
                    <div class="blog-article-content">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i> Back to Blog
                        </button>
                        
                        <div class="glass-card article-body">
                            <h2>The Silent Thief: How Inflation Depreciates Your Wealth</h2>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> June 10, 2026</span>
                                <span><i data-lucide="clock"></i> 7 min read</span>
                                <span><i data-lucide="tag"></i> Finance</span>
                            </div>
                            
                            <p class="lead">Leaving cash in a standard savings account feels safe, but mathematical realities dictate that it is actively losing purchasing power every single day.</p>
                            
                            <h3>The Mechanics of Fiat Depreciation</h3>
                            <p>When central banks increase the money supply faster than the economy creates goods and services, the value of each individual currency unit drops. At a historical average of 3% inflation, cash loses half its purchasing power every 24 years.</p>
                            
                            <h3>Asset Allocation Defense</h3>
                            <p>To combat inflation, capital must be deployed into yield-bearing assets (like equities, real estate, or bonds) that appreciate at a rate higher than the CPI (Consumer Price Index). An inflation calculator visualizes exactly how much capital you are losing by staying entirely in cash.</p>
                        </div>
                    </div>
                </section>
"""
    if "panel-blog-article-json" not in html:
        html = html.replace('</main>', new_blogs_html + '\n            </main>')

    # 4. Add links to the new blogs in the main blog panel
    blog_cards = """
                        <div class="blog-card" onclick="routeTo(null, 'blog-article-json')">
                            <div class="blog-card-content">
                                <span class="blog-tag">Development</span>
                                <h3>The Ultimate Developer's Guide to JSON Formatting</h3>
                                <p>Learn why offline validation and formatting is critical for modern API development and data security.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-svg')">
                            <div class="blog-card-content">
                                <span class="blog-tag">Design</span>
                                <h3>Mastering SVG Organic Blobs in Web Design</h3>
                                <p>How organic shapes and fluid SVG blobs have revolutionized UI design, breaking away from rigid grids.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-color')">
                            <div class="blog-card-content">
                                <span class="blog-tag">UX Design</span>
                                <h3>Color Theory: Building Harmonious Palettes</h3>
                                <p>The 60-30-10 rule and WCAG accessibility standards for perfect UI color combinations.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-password')">
                            <div class="blog-card-content">
                                <span class="blog-tag">Cybersecurity</span>
                                <h3>How Secure Password Generators Work</h3>
                                <p>Math.random vs Crypto API: Understanding password entropy and cryptographic security.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-base64')">
                            <div class="blog-card-content">
                                <span class="blog-tag">Web Dev</span>
                                <h3>Understanding Base64 Encoding Architecture</h3>
                                <p>Why we encode binary data into text protocols, and the critical difference between encoding and encryption.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-meta')">
                            <div class="blog-card-content">
                                <span class="blog-tag">SEO</span>
                                <h3>The Ultimate SEO Meta Tags Guide for 2026</h3>
                                <p>Optimize your Title, Description, and OpenGraph tags to dominate search engines and social media.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="blog-card" onclick="routeTo(null, 'blog-article-inflation')">
                            <div class="blog-card-content">
                                <span class="blog-tag">Finance</span>
                                <h3>The Silent Thief: How Inflation Depreciates Wealth</h3>
                                <p>The mathematical mechanics of fiat depreciation and how to defend your purchasing power.</p>
                                <span class="read-more">Read Article <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>
"""
    if "blog-article-json" not in html:
        html = html.replace('<div class="blog-grid">', '<div class="blog-grid">\n' + blog_cards)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed H1 tags and injected 7 new blog articles into index.html")

def fix_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # Add routes for the new blogs
    new_routes = """
    'blog-article-json': '/blog/json-formatting-guide/',
    'blog-article-svg': '/blog/svg-organic-blobs-design/',
    'blog-article-color': '/blog/ui-color-theory-palettes/',
    'blog-article-password': '/blog/secure-password-cryptography/',
    'blog-article-base64': '/blog/base64-encoding-explained/',
    'blog-article-meta': '/blog/seo-meta-tags-guide/',
    'blog-article-inflation': '/blog/inflation-wealth-depreciation/',
"""
    if "'blog-article-json'" not in js:
        js = js.replace("'blog-article-glass': '/blog/css-glassmorphism-trends/',", "'blog-article-glass': '/blog/css-glassmorphism-trends/'," + new_routes)

    # Inject Schema and Titles for the new blogs inside applyRouteUpdate
    new_schema = """
    } else if (tabId === 'blog-article-json') {
        prettyTitle = "Developer's Guide to JSON Formatting & Validation | OmniTools";
        metaDesc = "Learn why offline JSON validation and formatting is critical for modern API development. Keep your data secure locally.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "The Ultimate Developer's Guide to JSON Formatting and Validation", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-svg') {
        prettyTitle = "Mastering SVG Organic Blobs in Web Design | OmniTools";
        metaDesc = "How organic shapes and fluid SVG blobs have revolutionized UI design. Generate dynamic mathematical vectors offline.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Mastering SVG Organic Blobs in Modern Web Design", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-color') {
        prettyTitle = "Color Theory for UI/UX: Building Harmonious Palettes | OmniTools";
        metaDesc = "Learn the 60-30-10 design rule and WCAG accessibility standards for perfect user interface color combinations.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Color Theory for UI/UX: Building Harmonious Palettes", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-password') {
        prettyTitle = "Cryptographic Security: Secure Password Generators | OmniTools";
        metaDesc = "Math.random vs Crypto API: Understand password entropy and how offline cryptographic tools generate secure hashes.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Cryptographic Security: How Secure Password Generators Work", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-base64') {
        prettyTitle = "Understanding Base64 Encoding in Web Architecture | OmniTools";
        metaDesc = "Why we encode binary data into text protocols. A deep dive into Base64 architecture and security implications.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Understanding Base64 Encoding in Web Architecture", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-meta') {
        prettyTitle = "The Ultimate SEO Meta Tags Guide for 2026 | OmniTools";
        metaDesc = "Optimize your Title, Description, and OpenGraph tags to dominate search engines and boost social media CTR.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "The Ultimate SEO Meta Tags Guide for 2026", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
    } else if (tabId === 'blog-article-inflation') {
        prettyTitle = "The Silent Thief: How Inflation Depreciates Wealth | OmniTools";
        metaDesc = "The mathematical mechanics of fiat depreciation. Learn how to track and defend your purchasing power against inflation.";
        schemaJson.push({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "The Silent Thief: How Inflation Depreciates Your Wealth", "datePublished": "2026-06-10", "author": { "@type": "Organization", "name": "OmniTools" } });
"""
    if "blog-article-json" not in js:
        js = js.replace("} else if (tabId === 'blog-article-privacy') {", new_schema + "\n    } else if (tabId === 'blog-article-privacy') {")

    # Fix global schema issue (add SoftwareApplication & Organization globally)
    global_schema = """
    // Base global schemas for SEO Trust
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
    ];
"""
    js = js.replace("let schemaJson = [{\n        \"@context\": \"https://schema.org\",\n        \"@type\": \"WebSite\",\n        \"name\": \"OmniTools\",\n        \"url\": \"https://www.omnitechtools.com/\"\n    }];", global_schema.strip())
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated app.js with global schema and new blog routes.")

def write_sitemap():
    sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://www.omnitechtools.com/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
    <url><loc>https://www.omnitechtools.com/qr-code-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/image-compressor/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/css-glassmorphism-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/compound-interest-calculator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/json-formatter/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/svg-blob-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/color-palette-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/password-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/base64-encoder-decoder/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/meta-tag-generator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/inflation-calculator/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>https://www.omnitechtools.com/about/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.omnitechtools.com/privacy-policy/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.omnitechtools.com/terms-of-service/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.omnitechtools.com/contact/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/qr-codes-digital-marketing/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/image-compression-performance/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/css-glassmorphism-trends/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/finance-independence-math/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/client-side-browser-privacy/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/json-formatting-guide/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/svg-organic-blobs-design/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/ui-color-theory-palettes/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/secure-password-cryptography/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/base64-encoding-explained/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/seo-meta-tags-guide/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://www.omnitechtools.com/blog/inflation-wealth-depreciation/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>
"""
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print("Rewrote sitemap.xml to perfection.")

if __name__ == '__main__':
    fix_h1_and_inject_blogs()
    fix_app_js()
    write_sitemap()
