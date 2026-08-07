import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update About Us
    about_target = """<h4 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 0.5rem;">How It remains Free</h4>
                                <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">By building our tools completely "client-side" (executing entirely within the user's browser), we have zero heavy processing hosting server expenses. This allows us to keep the site online forever supported only by unobtrusive Google display advertisements and small donation programs.</p>
                            </div>"""
    
    about_addition = """<h4 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 0.5rem;">How It remains Free</h4>
                                <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">By building our tools completely "client-side" (executing entirely within the user's browser), we have zero heavy processing hosting server expenses. This allows us to keep the site online forever supported only by unobtrusive Google display advertisements and small donation programs.</p>
                            </div>
                            <div class="faq-item" style="grid-column: 1 / -1;">
                                <h4 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 0.5rem;">Commitment to Accessibility</h4>
                                <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">OmniTools is proud to be fully compliant with the <strong>USA Americans with Disabilities Act (ADA)</strong> and the <strong>UK Web Content Accessibility Guidelines (WCAG) AAA standards</strong>. We have implemented a dedicated Accessibility Toolbar providing high-contrast themes, scalable typography, and dyslexic-friendly fonts to ensure an inclusive experience for all creators globally.</p>
                            </div>"""
    
    if about_target in html:
        html = html.replace(about_target, about_addition)

    # 2. Update Privacy Policy
    privacy_target = """<h3 style="color: #fff; margin-bottom: 1rem;">4. GDPR & CCPA Compliance</h3>
                        <p style="margin-bottom: 1.5rem;">Since we do not collect, process, or transmit any user file data to our servers, we fully comply with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). Your data remains strictly in your hands under your absolute control.</p>"""
    
    privacy_addition = """<h3 style="color: #fff; margin-bottom: 1rem;">4. GDPR & CCPA Compliance</h3>
                        <p style="margin-bottom: 1.5rem;">Since we do not collect, process, or transmit any user file data to our servers, we fully comply with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). Your data remains strictly in your hands under your absolute control.</p>
                        
                        <h3 style="color: #fff; margin-bottom: 1rem;">5. Accessibility Settings & Privacy</h3>
                        <p style="margin-bottom: 1.5rem;">In accordance with USA ADA and UK WCAG guidelines, we provide accessibility tools (text sizing, high contrast, dyslexic fonts). Any preferences you configure using our accessibility widget are saved entirely locally on your browser via <code>localStorage</code>. We do not track, collect, or transmit your disability or accessibility preferences to any server.</p>"""

    if privacy_target in html:
        html = html.replace(privacy_target, privacy_addition)

    # 3. Update Contact Us
    contact_target = """<h3 style="margin-bottom: 0.75rem; color: #fff;">Need Instant Assistance?</h2>
                            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem;">Check out our rich informational guides at the bottom of each tool panel. Most technical operations are completely offline and do not require server setup.</p>"""
    
    contact_addition = """<h3 style="margin-bottom: 0.75rem; color: #fff;">Need Instant Assistance?</h2>
                            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.0rem;">Check out our rich informational guides at the bottom of each tool panel. Most technical operations are completely offline and do not require server setup.</p>
                            <p style="color: var(--primary); line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem;"><strong>Accessibility Support:</strong> OmniTools strictly follows USA ADA and UK WCAG guidelines. If you require further accommodations or experience accessibility barriers, please contact us immediately.</p>"""

    if contact_target in html:
        html = html.replace(contact_target, contact_addition)

    # 4. Update Terms & Conditions
    terms_target = """<h3 style="color: #fff; margin-bottom: 1rem;">4. Limitation of Liability</h3>
                        <p style="margin-bottom: 1.5rem;">In no event shall OmniTools, its creators, or partners be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of use, data, or profits; or business interruption) arising in any way out of the use of this free software.</p>"""
    
    terms_addition = """<h3 style="color: #fff; margin-bottom: 1rem;">4. Limitation of Liability</h3>
                        <p style="margin-bottom: 1.5rem;">In no event shall OmniTools, its creators, or partners be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of use, data, or profits; or business interruption) arising in any way out of the use of this free software.</p>
                        
                        <h3 style="color: #fff; margin-bottom: 1rem;">5. Accessibility Compliance Statement</h3>
                        <p style="margin-bottom: 1.5rem;">We are committed to providing a digital environment that is accessible to all, in accordance with the <strong>Americans with Disabilities Act (ADA)</strong> of the USA and the <strong>Web Content Accessibility Guidelines (WCAG)</strong> of the UK. We continuously maintain and update our platform's Accessibility Tools. By using this service, you acknowledge our efforts to provide a globally compliant and inclusive digital workspace.</p>"""

    if terms_target in html:
        html = html.replace(terms_target, terms_addition)


    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        print("Successfully updated text.")

if __name__ == '__main__':
    update_html()
