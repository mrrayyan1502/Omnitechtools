def update_css():
    css_content = """

/* ==========================================================================
   Accessibility (A11y) Tools Widget
   ========================================================================== */

/* Floating Action Button */
.a11y-fab {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 60px;
    height: 60px;
    background: #8b5cf6; /* Accessible Purple */
    color: #fff;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
    cursor: pointer;
    z-index: 9999;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.a11y-fab:hover {
    transform: scale(1.1);
}
.a11y-fab svg {
    width: 30px;
    height: 30px;
}

/* A11y Panel Modal */
.a11y-panel {
    position: fixed;
    bottom: 6rem;
    left: 2rem;
    width: 320px;
    background: #111424; /* Dark theme matching screenshot */
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
    z-index: 9998;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
    transition: all 0.3s ease;
    overflow: hidden;
}
.a11y-panel.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.a11y-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(0, 0, 0, 0.2);
}
.a11y-header h3 {
    margin: 0;
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
    color: #fff;
}
.a11y-close {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0;
}

.a11y-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.a11y-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.a11y-group label {
    color: #a1a1aa;
    font-size: 0.9rem;
    font-weight: 500;
}

.a11y-button-group {
    display: flex;
    gap: 0.5rem;
}

.a11y-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
}
.a11y-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}
.a11y-btn.active {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
    color: #8b5cf6;
}

/* ==========================================================================
   Accessibility Modifiers (High Contrast, Dyslexic, Text Size)
   ========================================================================== */

/* High Contrast Mode */
body.high-contrast {
    --bg-dark: #000000;
    --bg-sidebar: #000000;
    --bg-card: #0a0a0a;
    --text-main: #ffffff;
    --text-muted: #e2e8f0;
    --border-color: #ffffff;
    --border-hover: #ffffff;
    --primary: #ffff00; /* Yellow for max contrast */
    --primary-glow: rgba(255, 255, 0, 0.5);
}
body.high-contrast .glass-card,
body.high-contrast .app-sidebar,
body.high-contrast .app-header {
    background: #000000 !important;
    border: 2px solid #ffffff !important;
    box-shadow: none !important;
}

/* Dyslexic Friendly Font */
body.dyslexic-mode * {
    font-family: 'Lexend', sans-serif !important;
    letter-spacing: 0.05em !important;
    word-spacing: 0.1em !important;
    line-height: 1.8 !important;
}

/* Text Size Variations */
html.text-size-90 { font-size: 14.4px !important; }
html.text-size-100 { font-size: 16px !important; }
html.text-size-110 { font-size: 17.6px !important; }
html.text-size-120 { font-size: 19.2px !important; }

@media (max-width: 768px) {
    .a11y-panel {
        bottom: 5.5rem;
        left: 1rem;
        width: calc(100vw - 2rem);
    }
    .a11y-fab {
        bottom: 1rem;
        left: 1rem;
        width: 50px;
        height: 50px;
    }
}
"""
    with open('style.css', 'a', encoding='utf-8') as f:
        f.write(css_content)
        print("Successfully injected A11y CSS.")

if __name__ == '__main__':
    update_css()
