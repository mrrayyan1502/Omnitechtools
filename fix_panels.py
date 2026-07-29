import re

panels_html = """
                <!-- 5 HIGH-TRAFFIC TOOLS PANELS -->
                <section class="tab-panel" id="panel-image-resizer">
                    <div class="tool-header">
                        <h2>Image Resizer</h2>
                        <p>Resize any image to custom dimensions perfectly offline.</p>
                    </div>
                    <div class="tool-layout">
                        <div class="input-panel glass-card">
                            <div class="form-group">
                                <label>Upload Image</label>
                                <input type="file" id="resizerFile" accept="image/png, image/jpeg, image/webp" class="input-field" onchange="loadResizerImage(event)">
                            </div>
                            <div class="form-group">
                                <label>Width (px)</label>
                                <input type="number" id="resizerWidth" class="input-field" placeholder="e.g. 800" oninput="maintainAspect('width')">
                            </div>
                            <div class="form-group">
                                <label>Height (px)</label>
                                <input type="number" id="resizerHeight" class="input-field" placeholder="e.g. 600" oninput="maintainAspect('height')">
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="resizerLock" checked onchange="toggleLockAspect()">
                                <label for="resizerLock">Lock Aspect Ratio</label>
                            </div>
                            <button class="btn btn-primary w-100 mt-3" onclick="resizeImage()">
                                <i data-lucide="crop"></i> Resize Image
                            </button>
                        </div>
                        <div class="output-panel glass-card">
                            <div class="preview-area" id="resizerPreviewArea" style="min-height: 200px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border-radius: 8px;">
                                <p class="text-muted">Preview will appear here</p>
                                <canvas id="resizerCanvas" style="display: none; max-width: 100%; border-radius: 4px;"></canvas>
                            </div>
                            <button class="btn btn-success w-100 mt-4" id="resizerDownloadBtn" style="display: none;" onclick="downloadResizedImage()">
                                <i data-lucide="download"></i> Download Resized Image
                            </button>
                        </div>
                    </div>
                </section>

                <section class="tab-panel" id="panel-pdf-merge">
                    <div class="tool-header">
                        <h2>PDF Merge</h2>
                        <p>Combine multiple PDF documents securely offline.</p>
                    </div>
                    <div class="tool-layout">
                        <div class="input-panel glass-card">
                            <div class="form-group">
                                <label>Select PDF Files (Select Multiple)</label>
                                <input type="file" id="pdfMergeFiles" accept="application/pdf" multiple class="input-field" onchange="renderPdfList(event)">
                            </div>
                            <p class="text-muted" style="font-size: 0.85rem; margin-top: -10px; margin-bottom: 15px;">Files are processed locally in your browser. Nothing is uploaded.</p>
                            <button class="btn btn-primary w-100" id="btnMergePdfs" onclick="mergePdfs()" disabled>
                                <i data-lucide="file-plus"></i> Merge PDFs
                            </button>
                        </div>
                        <div class="output-panel glass-card">
                            <h4>Selected Files (Order)</h4>
                            <ul id="pdfFileList" style="list-style: decimal; padding-left: 20px; color: var(--text-color); margin-bottom: 20px;">
                                <li class="text-muted" style="list-style: none; padding-left: 0;">No files selected</li>
                            </ul>
                            <div id="pdfMergeResult" style="display:none;">
                                <div class="alert alert-success mt-3 mb-3">PDFs successfully merged!</div>
                                <button class="btn btn-success w-100" id="pdfMergeDownloadBtn">
                                    <i data-lucide="download"></i> Download Merged PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="tab-panel" id="panel-unit-converter">
                    <div class="tool-header">
                        <h2>Unit Converter</h2>
                        <p>Fast offline conversion for Length, Weight, Temp & Storage.</p>
                    </div>
                    <div class="tool-layout">
                        <div class="input-panel glass-card">
                            <div class="form-group">
                                <label>Category</label>
                                <select id="unitCategory" class="input-field" onchange="updateUnitOptions()">
                                    <option value="length">Length</option>
                                    <option value="weight">Weight / Mass</option>
                                    <option value="temp">Temperature</option>
                                    <option value="storage">Digital Storage</option>
                                </select>
                            </div>
                            <div style="display: flex; gap: 15px;">
                                <div class="form-group" style="flex: 1;">
                                    <label>From</label>
                                    <input type="number" id="unitInputVal" class="input-field mb-2" value="1" oninput="convertUnits()">
                                    <select id="unitFrom" class="input-field" onchange="convertUnits()"></select>
                                </div>
                                <div style="display: flex; align-items: center; padding-top: 20px;">
                                    <i data-lucide="arrow-right"></i>
                                </div>
                                <div class="form-group" style="flex: 1;">
                                    <label>To</label>
                                    <input type="text" id="unitOutputVal" class="input-field mb-2" readonly style="background: rgba(255,255,255,0.05);">
                                    <select id="unitTo" class="input-field" onchange="convertUnits()"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="tab-panel" id="panel-youtube-thumbnail">
                    <div class="tool-header">
                        <h2>YouTube Thumbnail Downloader</h2>
                        <p>Extract High-Quality (HD) thumbnails from any YouTube video.</p>
                    </div>
                    <div class="tool-layout">
                        <div class="input-panel glass-card">
                            <div class="form-group">
                                <label>YouTube Video URL</label>
                                <input type="text" id="ytUrlInput" class="input-field" placeholder="https://www.youtube.com/watch?v=..." oninput="extractYtThumbnail()">
                            </div>
                            <p class="text-muted" style="font-size: 0.85rem;">Just paste the URL, we will extract the max resolution cover image.</p>
                        </div>
                        <div class="output-panel glass-card">
                            <div class="preview-area" id="ytPreviewArea" style="min-height: 250px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border-radius: 8px;">
                                <p class="text-muted">Thumbnail will appear here</p>
                                <img id="ytThumbnailImg" style="display:none; max-width: 100%; border-radius: 4px;" crossorigin="anonymous">
                            </div>
                            <button class="btn btn-success w-100 mt-4" id="ytDownloadBtn" style="display:none;" onclick="downloadYtThumbnail()">
                                <i data-lucide="download"></i> Download HD Thumbnail
                            </button>
                        </div>
                    </div>
                </section>

                <section class="tab-panel" id="panel-text-to-speech">
                    <div class="tool-header">
                        <h2>Text to Speech</h2>
                        <p>Convert text to natural human voice. 100% Offline.</p>
                    </div>
                    <div class="tool-layout">
                        <div class="input-panel glass-card">
                            <div class="form-group">
                                <label>Enter Text to Speak</label>
                                <textarea id="ttsInput" class="input-field" rows="6" placeholder="Hello world, this is OmniTools..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Voice</label>
                                <select id="ttsVoices" class="input-field"></select>
                            </div>
                            <div style="display: flex; gap: 15px;">
                                <div class="form-group" style="flex: 1;">
                                    <label>Pitch</label>
                                    <input type="range" id="ttsPitch" min="0" max="2" value="1" step="0.1" style="width: 100%;">
                                </div>
                                <div class="form-group" style="flex: 1;">
                                    <label>Speed</label>
                                    <input type="range" id="ttsRate" min="0.5" max="2" value="1" step="0.1" style="width: 100%;">
                                </div>
                            </div>
                            <button class="btn btn-primary w-100 mt-3" onclick="playTTS()">
                                <i data-lucide="play"></i> Speak Now
                            </button>
                            <button class="btn btn-outline w-100 mt-2" onclick="stopTTS()">
                                <i data-lucide="square"></i> Stop
                            </button>
                        </div>
                    </div>
                </section>
"""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'id="panel-image-resizer"' not in html:
    html = html.replace('<!-- Sticky Toast Notification popup -->', panels_html + '\n            <!-- Sticky Toast Notification popup -->')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Panels HTML injected successfully!")
else:
    print("Panels already exist.")
