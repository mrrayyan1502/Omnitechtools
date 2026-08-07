import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    html_path = f"file:///{os.path.abspath('index.html').replace(os.sep, '/')}"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Capture ALL console output
        page.on("console", lambda msg: print(f"CONSOLE [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
        
        print(f"Opening {html_path}")
        await page.goto(html_path, wait_until="networkidle")
        
        print("Checking for global variables...")
        is_routeMap_defined = await page.evaluate("typeof routeMap !== 'undefined'")
        print(f"routeMap defined? {is_routeMap_defined}")
        
        print("Switching to Image Compressor tab...")
        await page.click("text='Image Compressor'")
        
        print("Uploading a REAL test image...")
        with open("real_test.png", "wb") as f:
            # 1x1 transparent PNG
            f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82')
        
        await page.locator("id=compressFileInput").set_input_files("real_test.png")
        
        await asyncio.sleep(2) # Give it time to process
        
        # Check UI state
        preview_visible = await page.evaluate("document.getElementById('compressedPreview').style.display !== 'none'")
        print(f"Preview visible: {preview_visible}")
        
        orig_size = await page.evaluate("document.getElementById('statOrigSize').innerText")
        new_size = await page.evaluate("document.getElementById('statNewSize').innerText")
        print(f"Sizes: Original={orig_size}, New={new_size}")
        
        await page.screenshot(path="debug_state.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
