import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import os

async def main():
    # 1. Create a dummy image
    img = Image.new('RGB', (800, 600), color = 'red')
    img.save('test_image.png')
    
    html_path = f"file:///{os.path.abspath('index.html').replace(os.sep, '/')}"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Listen for console errors
        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}") if msg.type in ['error', 'warning'] else None)
        page.on("pageerror", lambda err: print(f"Browser Page Error: {err}"))
        
        print(f"Opening {html_path}")
        await page.goto(html_path, wait_until="networkidle")
        
        print("Switching to Image Compressor tab...")
        # Find the nav link for image compressor
        await page.click("text='Image Compressor'")
        
        print("Uploading test image...")
        await page.locator("id=compressFileInput").set_input_files("test_image.png")
        
        print("Waiting for compression preview to become visible...")
        try:
            # Wait for the preview image to become visible
            await page.wait_for_selector("id=compressedPreview", state="visible", timeout=5000)
            
            # Check stats
            orig_size = await page.locator("id=statOrigSize").inner_text()
            new_size = await page.locator("id=statNewSize").inner_text()
            print(f"Success! Original Size: {orig_size}, Compressed Size: {new_size}")
        except Exception as e:
            print(f"Failed waiting for compression result: {e}")
            await page.screenshot(path="error_screenshot.png")
            print("Saved error_screenshot.png")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
