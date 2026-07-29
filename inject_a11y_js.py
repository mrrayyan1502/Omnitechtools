def update_js():
    js_content = """

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
"""
    with open('app.js', 'a', encoding='utf-8') as f:
        f.write(js_content)
        print("Successfully injected A11y JS.")

if __name__ == '__main__':
    update_js()
