import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    share_html = """
                    <div class="share-results-block" style="margin-top: 3rem;">
                        <div class="share-block-header">Share Results & Help Others! 🤝</div>
                        <div class="share-buttons-row">
                            <button class="share-btn whatsapp" onclick="shareToolResult('whatsapp')" aria-label="Share on WhatsApp">
                                <i data-lucide="message-circle"></i> WhatsApp
                            </button>
                            <button class="share-btn telegram" onclick="shareToolResult('telegram')" aria-label="Share on Telegram">
                                <i data-lucide="send"></i> Telegram
                            </button>
                            <button class="share-btn twitter" onclick="shareToolResult('twitter')" aria-label="Share on X/Twitter">
                                <i data-lucide="twitter"></i> X (Twitter)
                            </button>
                            <button class="share-btn facebook" onclick="shareToolResult('facebook')" aria-label="Share on Facebook">
                                <i data-lucide="facebook"></i> Facebook
                            </button>
                            <button class="share-btn copylink" onclick="shareToolResult('copy', this)" aria-label="Copy Link">
                                <i data-lucide="link-2"></i> <span>Copy Link</span>
                            </button>
                        </div>
                    </div>
"""
    
    # We will inject this right before `<div class="related-tools-section"`
    # But ONLY in the tool panels, not the blog or privacy pages.
    # The related-tools-section is currently everywhere we injected it.
    
    # Let's replace the start of related-tools-section
    target = '<div class="related-tools-section"'
    
    if target in html:
        # Prevent double injection
        if "share-results-block" not in html:
            html = html.replace(target, share_html + target)
            with open('index.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Successfully injected share block.")
        else:
            print("Share block already exists.")
    else:
        print("Could not find related-tools-section.")

if __name__ == '__main__':
    update_html()
