import re

def fix_html_injection():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Navigation items
    nav_inject = """
                <!-- 9 NEW TOOLS NAVIGATION -->
                <a href="/jwt-decoder/" class="nav-item" id="nav-jwt-decoder" onclick="routeTo(event, 'jwt-decoder')">
                    <i data-lucide="unlock"></i>
                    <span>JWT Decoder</span>
                </a>
                <a href="/markdown-editor/" class="nav-item" id="nav-markdown-editor" onclick="routeTo(event, 'markdown-editor')">
                    <i data-lucide="file-edit"></i>
                    <span>Markdown Editor</span>
                </a>
                <a href="/regex-tester/" class="nav-item" id="nav-regex-tester" onclick="routeTo(event, 'regex-tester')">
                    <i data-lucide="regex"></i>
                    <span>Regex Tester</span>
                </a>
                <a href="/sql-formatter/" class="nav-item" id="nav-sql-formatter" onclick="routeTo(event, 'sql-formatter')">
                    <i data-lucide="database"></i>
                    <span>SQL Formatter</span>
                </a>
                <a href="/css-box-shadow/" class="nav-item" id="nav-css-box-shadow" onclick="routeTo(event, 'css-box-shadow')">
                    <i data-lucide="box"></i>
                    <span>CSS Box Shadow</span>
                </a>
                <a href="/word-counter/" class="nav-item" id="nav-word-counter" onclick="routeTo(event, 'word-counter')">
                    <i data-lucide="type"></i>
                    <span>Word Counter</span>
                </a>
                <a href="/lorem-ipsum/" class="nav-item" id="nav-lorem-ipsum" onclick="routeTo(event, 'lorem-ipsum')">
                    <i data-lucide="align-left"></i>
                    <span>Lorem Ipsum Gen</span>
                </a>
                <a href="/uuid-generator/" class="nav-item" id="nav-uuid-generator" onclick="routeTo(event, 'uuid-generator')">
                    <i data-lucide="fingerprint"></i>
                    <span>UUID Generator</span>
                </a>
                <a href="/url-encoder/" class="nav-item" id="nav-url-encoder" onclick="routeTo(event, 'url-encoder')">
                    <i data-lucide="link"></i>
                    <span>URL Encoder</span>
                </a>
"""
    if "nav-jwt-decoder" not in html:
        html = html.replace('<div class="nav-label">Resources</div>', nav_inject + '\n                <div class="nav-label">Resources</div>')

    # 2. Dashboard Tool Cards
    dashboard_cards = """
                        <!-- 9 NEW TOOLS DASHBOARD CARDS -->
                        <div class="tool-card" onclick="routeTo(event, 'jwt-decoder')">
                            <div class="tool-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                                <i data-lucide="unlock"></i>
                            </div>
                            <h3>JWT Decoder</h3>
                            <p>Decode, verify, and inspect JSON Web Tokens securely offline.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'markdown-editor')">
                            <div class="tool-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                                <i data-lucide="file-edit"></i>
                            </div>
                            <h3>Markdown Editor</h3>
                            <p>Write, preview, and format Markdown documents with live rendering.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'regex-tester')">
                            <div class="tool-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">
                                <i data-lucide="regex"></i>
                            </div>
                            <h3>Regex Tester</h3>
                            <p>Build, test, and debug Regular Expressions visually and offline.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'sql-formatter')">
                            <div class="tool-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                                <i data-lucide="database"></i>
                            </div>
                            <h3>SQL Formatter</h3>
                            <p>Beautify and format complex SQL database queries instantly.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'css-box-shadow')">
                            <div class="tool-icon" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                                <i data-lucide="box"></i>
                            </div>
                            <h3>Box Shadow Gen</h3>
                            <p>Visually create advanced CSS3 box shadows with layered rendering.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'word-counter')">
                            <div class="tool-icon" style="background: rgba(236, 72, 153, 0.1); color: #ec4899;">
                                <i data-lucide="type"></i>
                            </div>
                            <h3>SEO Word Counter</h3>
                            <p>Count words, characters, and analyze keyword density for SEO.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'lorem-ipsum')">
                            <div class="tool-icon" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">
                                <i data-lucide="align-left"></i>
                            </div>
                            <h3>Lorem Ipsum Gen</h3>
                            <p>Generate placeholder dummy text for UI mockups and web design.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'uuid-generator')">
                            <div class="tool-icon" style="background: rgba(168, 85, 247, 0.1); color: #a855f7;">
                                <i data-lucide="fingerprint"></i>
                            </div>
                            <h3>UUID Generator</h3>
                            <p>Generate secure, cryptographically random v4 UUIDs/GUIDs.</p>
                        </div>
                        
                        <div class="tool-card" onclick="routeTo(event, 'url-encoder')">
                            <div class="tool-icon" style="background: rgba(20, 184, 166, 0.1); color: #14b8a6;">
                                <i data-lucide="link"></i>
                            </div>
                            <h3>URL Encoder/Decoder</h3>
                            <p>Safely encode and decode URL strings and URI components.</p>
                        </div>
"""
    if "jwt-decoder" not in html.split('id="panel-dashboard"')[1].split('</section>')[0]:
        # Using a regex to find the end of the tool grid in the dashboard panel
        pattern = r'(<div class="tool-card" onclick="routeTo\(event, \'inflation-calc\'\)">.*?</div>\s*)(</div>\s*</section>)'
        html = re.sub(pattern, r'\1' + dashboard_cards + r'\2', html, flags=re.DOTALL)

    # 3. HTML Panels
    panels_html = """
                <!-- TAB: JWT DECODER -->
                <section class="tab-panel" id="panel-jwt-decoder">
                    <h2 class="panel-title">JWT Decoder</h2>
                    <p class="panel-subtitle">Decode JSON Web Tokens securely offline without sending secrets to any server.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="form-group">
                            <label>Paste your JWT String</label>
                            <textarea id="jwtInput" rows="4" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." oninput="decodeJWT()"></textarea>
                        </div>
                        
                        <div class="grid-2 mt-4" style="gap: 1rem;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label>Header (Algorithm & Type)</label>
                                <pre id="jwtHeader" class="code-preview" style="min-height: 120px;"></pre>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label>Payload (Data)</label>
                                <pre id="jwtPayload" class="code-preview" style="min-height: 120px;"></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TAB: MARKDOWN EDITOR -->
                <section class="tab-panel" id="panel-markdown-editor">
                    <h2 class="panel-title">Markdown Editor</h2>
                    <p class="panel-subtitle">Real-time Markdown to HTML live preview editor.</p>
                    
                    <div class="panel-content glass-card" style="padding: 1rem;">
                        <div class="grid-2" style="gap: 1rem; height: 500px;">
                            <div class="form-group" style="margin-bottom: 0; display: flex; flex-direction: column;">
                                <label>Markdown Source</label>
                                <textarea id="markdownInput" placeholder="# Hello World..." oninput="renderMarkdown()" style="flex: 1; resize: none; font-family: monospace; background: var(--bg-main); color: var(--text-color); border: 1px solid var(--border-color);"></textarea>
                            </div>
                            <div class="form-group" style="margin-bottom: 0; display: flex; flex-direction: column;">
                                <label>Live HTML Preview</label>
                                <div id="markdownPreview" class="code-preview" style="flex: 1; overflow-y: auto; background: var(--bg-main);"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TAB: REGEX TESTER -->
                <section class="tab-panel" id="panel-regex-tester">
                    <h2 class="panel-title">Regular Expression Tester</h2>
                    <p class="panel-subtitle">Test and debug JavaScript regular expressions offline.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="form-group">
                            <label>Regular Expression</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <span style="font-size: 1.5rem; color: var(--text-muted);">/</span>
                                <input type="text" id="regexInput" placeholder="[A-Za-z0-9]+" oninput="testRegex()" style="flex: 1;">
                                <span style="font-size: 1.5rem; color: var(--text-muted);">/</span>
                                <input type="text" id="regexFlags" value="g" oninput="testRegex()" style="width: 80px;" placeholder="flags (g, i, m)">
                            </div>
                        </div>
                        
                        <div class="form-group mt-4">
                            <label>Test String</label>
                            <textarea id="regexTestString" rows="5" placeholder="Enter text to test here..." oninput="testRegex()"></textarea>
                        </div>
                        
                        <div class="form-group mt-4">
                            <label>Match Results</label>
                            <div id="regexResult" class="code-preview" style="min-height: 100px; white-space: pre-wrap; word-break: break-all;"></div>
                        </div>
                    </div>
                </section>

                <!-- TAB: SQL FORMATTER -->
                <section class="tab-panel" id="panel-sql-formatter">
                    <h2 class="panel-title">SQL Formatter</h2>
                    <p class="panel-subtitle">Instantly beautify complex, messy database queries.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="grid-2" style="gap: 1rem;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label>Raw SQL Query</label>
                                <textarea id="sqlInput" rows="12" placeholder="SELECT * FROM users WHERE active=1"></textarea>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label>Formatted SQL</label>
                                <textarea id="sqlOutput" rows="12" readonly class="code-preview"></textarea>
                            </div>
                        </div>
                        <div class="btn-group mt-4">
                            <button class="btn btn-primary" onclick="formatSQL()">Format SQL</button>
                            <button class="btn btn-outline" onclick="copyToClipboard('sqlOutput')">Copy Output</button>
                        </div>
                    </div>
                </section>

                <!-- TAB: CSS BOX SHADOW -->
                <section class="tab-panel" id="panel-css-box-shadow">
                    <h2 class="panel-title">CSS Box Shadow Generator</h2>
                    <p class="panel-subtitle">Visually create stunning CSS3 box shadows with real-time preview.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="grid-2" style="gap: 2rem;">
                            <div>
                                <div class="form-group">
                                    <label>Horizontal Offset (<span id="shadowXVal">0</span>px)</label>
                                    <input type="range" id="shadowX" min="-50" max="50" value="0" oninput="updateShadow()">
                                </div>
                                <div class="form-group">
                                    <label>Vertical Offset (<span id="shadowYVal">10</span>px)</label>
                                    <input type="range" id="shadowY" min="-50" max="50" value="10" oninput="updateShadow()">
                                </div>
                                <div class="form-group">
                                    <label>Blur Radius (<span id="shadowBlurVal">20</span>px)</label>
                                    <input type="range" id="shadowBlur" min="0" max="100" value="20" oninput="updateShadow()">
                                </div>
                                <div class="form-group">
                                    <label>Spread Radius (<span id="shadowSpreadVal">-5</span>px)</label>
                                    <input type="range" id="shadowSpread" min="-50" max="50" value="-5" oninput="updateShadow()">
                                </div>
                                <div class="form-group">
                                    <label>Shadow Color</label>
                                    <input type="color" id="shadowColor" value="#000000" oninput="updateShadow()">
                                </div>
                                <div class="form-group">
                                    <label>Shadow Opacity (<span id="shadowOpacityVal">0.2</span>)</label>
                                    <input type="range" id="shadowOpacity" min="0" max="1" step="0.01" value="0.2" oninput="updateShadow()">
                                </div>
                                <div class="form-group" style="display: flex; gap: 0.5rem; align-items: center;">
                                    <input type="checkbox" id="shadowInset" onchange="updateShadow()">
                                    <label style="margin: 0;">Inset (Inner Shadow)</label>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                                <div id="shadowPreviewArea" style="width: 100%; height: 250px; background: var(--bg-main); display: flex; align-items: center; justify-content: center; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05);">
                                    <div id="shadowBox" style="width: 150px; height: 150px; background: var(--glass-bg); border-radius: var(--radius-md);"></div>
                                </div>
                                
                                <div style="width: 100%;">
                                    <textarea id="shadowCode" rows="3" readonly class="code-preview" style="text-align: center; font-size: 1.1rem; padding: 1rem;"></textarea>
                                    <button class="btn btn-primary mt-2" style="width: 100%;" onclick="copyToClipboard('shadowCode')">Copy CSS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TAB: WORD COUNTER -->
                <section class="tab-panel" id="panel-word-counter">
                    <h2 class="panel-title">SEO Word & Character Counter</h2>
                    <p class="panel-subtitle">Analyze text length, reading time, and keyword density instantly.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="grid-4 mb-4" style="gap: 1rem;">
                            <div class="stat-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                                <h3 id="wcWords" style="font-size: 2rem; color: var(--accent); margin: 0;">0</h3>
                                <p style="margin: 0; color: var(--text-muted);">Words</p>
                            </div>
                            <div class="stat-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                                <h3 id="wcChars" style="font-size: 2rem; color: var(--accent); margin: 0;">0</h3>
                                <p style="margin: 0; color: var(--text-muted);">Characters</p>
                            </div>
                            <div class="stat-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                                <h3 id="wcSentences" style="font-size: 2rem; color: var(--accent); margin: 0;">0</h3>
                                <p style="margin: 0; color: var(--text-muted);">Sentences</p>
                            </div>
                            <div class="stat-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                                <h3 id="wcReadingTime" style="font-size: 2rem; color: var(--accent); margin: 0;">0m</h3>
                                <p style="margin: 0; color: var(--text-muted);">Reading Time</p>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <textarea id="wcInput" rows="10" placeholder="Type or paste your text here to analyze..." oninput="analyzeText()"></textarea>
                        </div>
                    </div>
                </section>

                <!-- TAB: LOREM IPSUM -->
                <section class="tab-panel" id="panel-lorem-ipsum">
                    <h2 class="panel-title">Lorem Ipsum Generator</h2>
                    <p class="panel-subtitle">Generate realistic dummy text for UI mockups and prototypes.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="grid-2" style="gap: 1rem;">
                            <div class="form-group">
                                <label>Paragraphs Count</label>
                                <input type="number" id="loremCount" value="3" min="1" max="50">
                            </div>
                        </div>
                        <div class="btn-group mb-4">
                            <button class="btn btn-primary" onclick="generateLorem()">Generate Text</button>
                            <button class="btn btn-outline" onclick="copyToClipboard('loremOutput')">Copy All</button>
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <textarea id="loremOutput" rows="12" readonly class="code-preview"></textarea>
                        </div>
                    </div>
                </section>

                <!-- TAB: UUID GENERATOR -->
                <section class="tab-panel" id="panel-uuid-generator">
                    <h2 class="panel-title">UUID / GUID Generator</h2>
                    <p class="panel-subtitle">Generate cryptographically secure v4 UUIDs.</p>
                    
                    <div class="panel-content glass-card">
                        <div class="form-group">
                            <label>Number of UUIDs to generate</label>
                            <input type="number" id="uuidCount" value="1" min="1" max="1000">
                        </div>
                        <div class="btn-group mb-4">
                            <button class="btn btn-primary" onclick="generateUUIDs()">Generate UUIDs</button>
                            <button class="btn btn-outline" onclick="copyToClipboard('uuidOutput')">Copy All</button>
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <textarea id="uuidOutput" rows="10" readonly class="code-preview" style="font-family: monospace;"></textarea>
                        </div>
                    </div>
                </section>

                <!-- TAB: URL ENCODER -->
                <section class="tab-panel" id="panel-url-encoder">
                    <h2 class="panel-title">URL Encoder / Decoder</h2>
                    <p class="panel-subtitle">Safely encode and decode Uniform Resource Identifiers (URI).</p>
                    
                    <div class="panel-content glass-card">
                        <div class="grid-2" style="gap: 1rem;">
                            <div class="form-group">
                                <label>Input Text / URL</label>
                                <textarea id="urlInput" rows="6" placeholder="https://example.com/search?q=hello world"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Result</label>
                                <textarea id="urlOutput" rows="6" readonly class="code-preview"></textarea>
                            </div>
                        </div>
                        <div class="btn-group mt-2">
                            <button class="btn btn-primary" onclick="processURL('encode')">Encode</button>
                            <button class="btn btn-secondary" onclick="processURL('decode')">Decode</button>
                            <button class="btn btn-outline" onclick="copyToClipboard('urlOutput')">Copy Result</button>
                        </div>
                    </div>
                </section>
"""
    if "panel-jwt-decoder" not in html:
        html = html.replace('<section class="tab-panel" id="panel-blog">', panels_html + '\n                <section class="tab-panel" id="panel-blog">')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed injections applied successfully to index.html.")

if __name__ == '__main__':
    fix_html_injection()
