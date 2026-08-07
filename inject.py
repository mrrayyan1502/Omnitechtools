import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject AdSense Placeholder before every <div class="tool-workspace grid-2">
ad_block = '\n                    <div class="adsense-placeholder"></div>\n                    <div class="tool-workspace grid-2">'
content = content.replace('<div class="tool-workspace grid-2">', ad_block)

# 2. Inject WhatsApp Share Hook in QR Generator
whatsapp_qr = '''
                            <div class="whatsapp-share-hook" id="wa-share-qr" style="display: none;">
                                <h4>🎉 QR Code Ready!</h4>
                                <p>Share this amazing free tool with your friends.</p>
                                <button class="btn btn-whatsapp w-100" onclick="shareOnWhatsApp('qr')">
                                    <i data-lucide="message-circle"></i> Share on WhatsApp
                                </button>
                            </div>
'''

qr_download_btn = 'onclick="downloadQR()">\n                                    <i data-lucide="download"></i> Download High-Res PNG\n                                </button>'
content = content.replace(qr_download_btn, qr_download_btn + whatsapp_qr)

# 3. Inject WhatsApp Share Hook in Image Compressor
whatsapp_img = '''
                            <div class="whatsapp-share-hook" id="wa-share-img" style="display: none;">
                                <h4>🎉 Image Compressed!</h4>
                                <p>Help others save space by sharing this free tool.</p>
                                <button class="btn btn-whatsapp w-100" onclick="shareOnWhatsApp('img')">
                                    <i data-lucide="message-circle"></i> Share on WhatsApp
                                </button>
                            </div>
'''
img_download_btn = 'onclick="downloadCompressedImage()">\n                                    <i data-lucide="download"></i> Download Compressed Image\n                                </button>'
content = content.replace(img_download_btn, img_download_btn + whatsapp_img)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Injection complete.')
