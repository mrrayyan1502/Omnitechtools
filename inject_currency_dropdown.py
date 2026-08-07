import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Revert messy replacements
    html = html.replace('($ / € / £)', '(<span class="currency-label">$</span>)')
    html = html.replace('$/€/£ 0.00', '<span class="currency-label">$</span>0.00')
    html = html.replace('$/€/£ 10,000.00', '<span class="currency-label">$</span>10,000.00')

    # Currency Dropdown HTML
    dropdown_html = """
                            <div class="control-group">
                                <label class="control-label">Local Currency</label>
                                <select class="form-control currency-selector" onchange="updateGlobalCurrency(this.value)">
                                    <option value="$">US Dollar ($)</option>
                                    <option value="£">British Pound (£)</option>
                                    <option value="€">Euro (€)</option>
                                </select>
                            </div>
    """

    # 1. Inject into FIRE Calc (before finPrincipal)
    fire_target = '<div class="control-group">\n                                <label for="finPrincipal" class="control-label">Initial Investment / Principal'
    if fire_target in html and "currency-selector" not in html.split('finPrincipal')[0]:
        html = html.replace(fire_target, dropdown_html + fire_target)
        
    # 2. Inject into Inflation Calc (before infCapital)
    inf_target = '<div class="control-group">\n                                <label for="infCapital" class="control-label">Starting Capital / Principal'
    if inf_target in html and html.count("currency-selector") == 1: # ensure we only inject once more
        html = html.replace(inf_target, dropdown_html + inf_target)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated index.html")

def update_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # Revert formatCurrency
    bad_format = "return '$/€/£ ' + amount.toLocaleString"
    good_format = "return globalUserCurrency + amount.toLocaleString"
    js = js.replace(bad_format, good_format)

    # Revert any tooltips if needed (the previous script replaced context.parsed.y)
    bad_tooltip = "return '$/€/£ ' + context.parsed.y"
    good_tooltip = "return globalUserCurrency + context.parsed.y"
    js = js.replace(bad_tooltip, good_tooltip)

    # Append Global Currency State Logic
    currency_logic = """
/* ==========================================================================
   Global Currency State Management
   ========================================================================== */
let globalUserCurrency = '$';

function initCurrency() {
    const savedCurrency = localStorage.getItem('omni-currency');
    if (savedCurrency) {
        updateGlobalCurrency(savedCurrency, false);
    }
}

function updateGlobalCurrency(symbol, save = true) {
    globalUserCurrency = symbol;
    if (save) {
        localStorage.setItem('omni-currency', symbol);
    }
    
    // Update all dropdowns
    const dropdowns = document.querySelectorAll('.currency-selector');
    dropdowns.forEach(dd => dd.value = symbol);

    // Update all label spans
    const labels = document.querySelectorAll('.currency-label');
    labels.forEach(lbl => lbl.innerText = symbol);

    // Re-trigger math charts if functions exist
    if (typeof calculateFinancialGrowth === 'function') {
        calculateFinancialGrowth();
    }
    if (typeof calculateInflationLoss === 'function') {
        calculateInflationLoss();
    }
}

// Attach to DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCurrency();
});
"""
    if "globalUserCurrency" not in js:
        js += currency_logic
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated app.js")

if __name__ == '__main__':
    update_html()
    update_js()
