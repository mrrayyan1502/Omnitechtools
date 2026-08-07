def fix_and_inject():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Fix the mismatched </h1>
    html = html.replace('<span class="sr-only">OmniTools - Premium Creator & Developer Utility Hub</h1>', 
                        '<span class="sr-only">OmniTools - Premium Creator & Developer Utility Hub</span>')

    # 2. Inject the 7 new blog panels
    new_blogs_html = """
                <!-- TAB: BLOG ARTICLE - JSON FORMATTER -->
                <section class="tab-panel" id="panel-blog-article-json">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-dev">Development</span>
                            <h2>The Ultimate Developer's Guide to JSON Formatting and Validation</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 6 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">JSON (JavaScript Object Notation) has become the de-facto standard for data interchange on the web. Learn why offline validation and formatting is critical for modern API development.</p>
                            
                            <h3>Why Developers Need Offline JSON Tools</h3>
                            <p>Pasting sensitive API payloads or proprietary configuration files into online formatting tools exposes your data to third-party servers. Using a client-side, offline-first tool like the OmniTools JSON Formatter guarantees that your data never leaves your browser.</p>
                            
                            <h3>Common JSON Errors and How to Fix Them</h3>
                            <p>Most JSON parsing errors stem from simple mistakes like trailing commas, missing quotation marks around keys, or unmatched brackets. A robust validator instantly highlights the exact line of the syntax error.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - SVG BLOB -->
                <section class="tab-panel" id="panel-blog-article-svg">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-design">Design</span>
                            <h2>Mastering SVG Organic Blobs in Modern Web Design</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 5 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">Organic shapes and fluid SVG blobs have revolutionized UI design, breaking away from rigid grids to create dynamic, flowing interfaces.</p>
                            
                            <h3>The Math Behind the Blob</h3>
                            <p>Organic blobs are generated using complex Bezier curves and mathematical sine waves. By mapping points onto a circle and applying random displacement vectors, developers can generate infinite unique shapes.</p>
                            
                            <h3>Performance Benefits of SVG</h3>
                            <p>Unlike PNG or WebP images, SVG blobs are rendered using mathematics natively by the browser. This means they are infinitely scalable without quality loss and have a file size of mere bytes, perfectly optimizing Core Web Vitals.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - COLOR PALETTE -->
                <section class="tab-panel" id="panel-blog-article-color">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-design">UX Design</span>
                            <h2>Color Theory for UI/UX: Building Harmonious Palettes</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 7 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">Choosing the right colors is more than just aesthetics; it is about brand psychology, accessibility, and visual hierarchy.</p>
                            
                            <h3>The 60-30-10 Rule</h3>
                            <p>A classic interior design rule that applies perfectly to UI design: 60% of your interface should be a dominant background color, 30% a secondary color (like cards or menus), and 10% an accent color for calls-to-action.</p>
                            
                            <h3>WCAG Accessibility Standards</h3>
                            <p>Color contrast is critical for legibility. Using an HSL-based palette generator allows designers to precisely control lightness and saturation to meet WCAG AA or AAA contrast ratios.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - PASSWORD GEN -->
                <section class="tab-panel" id="panel-blog-article-password">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-dev">Cybersecurity</span>
                            <h2>Cryptographic Security: How Secure Password Generators Work</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 8 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">With the rise of automated brute-force attacks and GPU hashing, weak passwords are the leading cause of data breaches.</p>
                            
                            <h3>Math.random vs. Crypto.getRandomValues</h3>
                            <p>Standard random number generators in programming are 'pseudo-random' and predictable. Secure tools use the Web Crypto API, utilizing the operating system's entropy pool to generate cryptographically secure passwords.</p>
                            
                            <h3>Password Entropy</h3>
                            <p>Password strength is measured in 'entropy'. A 16-character password mixing uppercase, lowercase, numbers, and symbols provides over 90 bits of entropy, which would take current supercomputers trillions of years to crack.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - BASE64 -->
                <section class="tab-panel" id="panel-blog-article-base64">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-dev">Web Dev</span>
                            <h2>Understanding Base64 Encoding in Web Architecture</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 5 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">Base64 is a fundamental encoding scheme used universally across the internet to transmit binary data over text-based protocols.</p>
                            
                            <h3>Why Encode Data?</h3>
                            <p>Protocols like HTTP, SMTP, and HTML were designed for text. When you need to embed an image directly into CSS or transfer an authentication token, you must convert binary data (1s and 0s) into safe, printable ASCII characters. Base64 translates 3 bytes of data into 4 ASCII characters.</p>
                            
                            <h3>Security Misconception</h3>
                            <p>Base64 is an encoding scheme, NOT encryption. Anyone can decode a Base64 string instantly. Never use Base64 to 'hide' sensitive data unless it is first encrypted via standard cryptographic methods.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - META TAGS -->
                <section class="tab-panel" id="panel-blog-article-meta">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-seo">SEO</span>
                            <h2>The Ultimate SEO Meta Tags Guide for 2026</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 6 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">Meta tags remain the critical bridge between your website's content and search engine crawlers, dictating how your site appears in Google, Twitter, and Facebook.</p>
                            
                            <h3>Title and Description Optimization</h3>
                            <p>Your Title Tag should be under 60 characters to prevent truncation, embedding high-intent keywords naturally. The Meta Description, while not a direct ranking factor, drastically affects your Click-Through Rate (CTR) and should act as compelling ad copy under 160 characters.</p>
                            
                            <h3>OpenGraph and Twitter Cards</h3>
                            <p>Social media sharing drives viral growth. Implementing specific OpenGraph (og:title, og:image) and Twitter Card tags ensures that when someone pastes your link into a chat or feed, it generates a beautiful, clickable preview card rather than a boring blue link.</p>
                        </article>
                    </div>
                </section>

                <!-- TAB: BLOG ARTICLE - INFLATION -->
                <section class="tab-panel" id="panel-blog-article-inflation">
                    <div class="blog-post-view glass-card">
                        <button class="btn btn-outline mb-4" onclick="routeTo(event, 'blog')">
                            <i data-lucide="arrow-left"></i> Back to Blog Hub
                        </button>
                        
                        <div class="blog-post-header">
                            <span class="blog-badge badge-finance">Finance</span>
                            <h2>The Silent Thief: How Inflation Depreciates Your Wealth</h2>
                            <div class="blog-post-info">
                                <span>Published: June 10, 2026</span>
                                <span>Reading Time: 7 min</span>
                            </div>
                        </div>
                        
                        <article class="blog-post-content">
                            <p class="lead" style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.8;">Leaving cash in a standard savings account feels safe, but mathematical realities dictate that it is actively losing purchasing power every single day.</p>
                            
                            <h3>The Mechanics of Fiat Depreciation</h3>
                            <p>When central banks increase the money supply faster than the economy creates goods and services, the value of each individual currency unit drops. At a historical average of 3% inflation, cash loses half its purchasing power every 24 years.</p>
                            
                            <h3>Asset Allocation Defense</h3>
                            <p>To combat inflation, capital must be deployed into yield-bearing assets (like equities, real estate, or bonds) that appreciate at a rate higher than the CPI (Consumer Price Index). An inflation calculator visualizes exactly how much capital you are losing by staying entirely in cash.</p>
                        </article>
                    </div>
                </section>
"""
    if "panel-blog-article-json" not in html:
        # Inject right before toastAlert
        html = html.replace('<!-- Sticky Toast Notification popup -->', new_blogs_html + '\n            <!-- Sticky Toast Notification popup -->')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed HTML injected correctly.")

def fix_app_js_schema():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    new_schema = """    } else if (tabId === 'blog-article-json') {
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
    if "blog-article-json" not in js.split("} else if (tabId === 'blog-article-privacy') {")[0]:
        js = js.replace("} else if (tabId === 'blog-article-privacy') {", new_schema + "} else if (tabId === 'blog-article-privacy') {")
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("Fixed Schema injected correctly into app.js")

if __name__ == '__main__':
    fix_and_inject()
    fix_app_js_schema()
