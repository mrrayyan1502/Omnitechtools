import re

def inject():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # 1. Update tabToRouteMap
    route_map_ext = """    'image-resizer': '/image-resizer/',
    'pdf-merge': '/pdf-merge/',
    'unit-converter': '/unit-converter/',
    'youtube-thumbnail': '/youtube-thumbnail-downloader/',
    'text-to-speech': '/text-to-speech/',
"""
    if "'image-resizer':" not in js:
        js = js.replace("    'url-encoder': '/url-encoder/',", route_map_ext + "    'url-encoder': '/url-encoder/',")

    # 2. Update routing logic for SEO Schema and Lazy Loading
    routing_ext = """    } else if (tabId === 'image-resizer') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Image Resizer", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'pdf-merge') {
        loadScript("https://unpkg.com/pdf-lib/dist/pdf-lib.min.js", () => {
            console.log("pdf-lib loaded dynamically.");
        });
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "PDF Merge", "applicationCategory": "BusinessApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'unit-converter') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Unit Converter", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'youtube-thumbnail') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YouTube Thumbnail Downloader", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
    } else if (tabId === 'text-to-speech') {
        schemaJson.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Text to Speech Converter", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } });
"""
    if "tabId === 'image-resizer'" not in js:
        js = js.replace("} else if (tabId === 'url-encoder') {", routing_ext + "    } else if (tabId === 'url-encoder') {")

    # 3. Add logic for 5 tools at the end of the file
    logic_ext = """
// ==========================================
// 5 HIGH-TRAFFIC TOOLS LOGIC
// ==========================================

// 1. Image Resizer
let resizerImgObj = new Image();
function loadResizerImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        resizerImgObj.onload = () => {
            document.getElementById('resizerWidth').value = resizerImgObj.width;
            document.getElementById('resizerHeight').value = resizerImgObj.height;
            document.getElementById('resizerPreviewArea').innerHTML = '';
            resizerImgObj.style.maxWidth = '100%';
            resizerImgObj.style.borderRadius = '4px';
            document.getElementById('resizerPreviewArea').appendChild(resizerImgObj);
        }
        resizerImgObj.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function toggleLockAspect() {
    maintainAspect('width');
}

function maintainAspect(changed) {
    const lock = document.getElementById('resizerLock').checked;
    if (!lock || !resizerImgObj.src) return;
    const ratio = resizerImgObj.width / resizerImgObj.height;
    const wEl = document.getElementById('resizerWidth');
    const hEl = document.getElementById('resizerHeight');
    if (changed === 'width' && wEl.value) {
        hEl.value = Math.round(wEl.value / ratio);
    } else if (changed === 'height' && hEl.value) {
        wEl.value = Math.round(hEl.value * ratio);
    }
}

function resizeImage() {
    if (!resizerImgObj.src) return alert("Please upload an image first.");
    const w = parseInt(document.getElementById('resizerWidth').value);
    const h = parseInt(document.getElementById('resizerHeight').value);
    if (!w || !h) return alert("Enter valid width and height.");
    
    const canvas = document.getElementById('resizerCanvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(resizerImgObj, 0, 0, w, h);
    
    document.getElementById('resizerPreviewArea').innerHTML = '';
    canvas.style.display = 'block';
    document.getElementById('resizerPreviewArea').appendChild(canvas);
    document.getElementById('resizerDownloadBtn').style.display = 'block';
}

function downloadResizedImage() {
    const canvas = document.getElementById('resizerCanvas');
    const link = document.createElement('a');
    link.download = 'resized-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// 2. PDF Merge
let pdfFilesToMerge = [];
function renderPdfList(e) {
    pdfFilesToMerge = Array.from(e.target.files);
    const list = document.getElementById('pdfFileList');
    list.innerHTML = '';
    if (pdfFilesToMerge.length < 2) {
        list.innerHTML = '<li class="text-muted" style="list-style: none; padding-left: 0;">Please select at least 2 PDF files.</li>';
        document.getElementById('btnMergePdfs').disabled = true;
        return;
    }
    pdfFilesToMerge.forEach((f, i) => {
        let li = document.createElement('li');
        li.textContent = f.name;
        list.appendChild(li);
    });
    document.getElementById('btnMergePdfs').disabled = false;
    document.getElementById('pdfMergeResult').style.display = 'none';
}

async function mergePdfs() {
    if (!window.PDFLib) return alert("PDF library is still loading. Please try again in a second.");
    const { PDFDocument } = window.PDFLib;
    document.getElementById('btnMergePdfs').innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Merging...';
    if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
    
    try {
        const mergedPdf = await PDFDocument.create();
        for (let file of pdfFilesToMerge) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        document.getElementById('pdfMergeDownloadBtn').onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged-document.pdf';
            a.click();
        };
        document.getElementById('pdfMergeResult').style.display = 'block';
    } catch (e) {
        alert("Error merging PDFs. Make sure they are valid and not password protected.");
        console.error(e);
    }
    document.getElementById('btnMergePdfs').innerHTML = '<i data-lucide="file-plus"></i> Merge PDFs';
    if (typeof lucide !== 'undefined') setTimeout(() => requestAnimationFrame(() => lucide.createIcons()), 10);
}

// 3. Unit Converter
const units = {
    length: { 'Meter': 1, 'Kilometer': 1000, 'Centimeter': 0.01, 'Mile': 1609.34, 'Yard': 0.9144, 'Foot': 0.3048, 'Inch': 0.0254 },
    weight: { 'Gram': 1, 'Kilogram': 1000, 'Milligram': 0.001, 'Pound': 453.592, 'Ounce': 28.3495 },
    temp: { 'Celsius': 'c', 'Fahrenheit': 'f', 'Kelvin': 'k' },
    storage: { 'Byte': 1, 'Kilobyte': 1024, 'Megabyte': 1048576, 'Gigabyte': 1073741824, 'Terabyte': 1099511627776 }
};

function updateUnitOptions() {
    const cat = document.getElementById('unitCategory').value;
    const fromSelect = document.getElementById('unitFrom');
    const toSelect = document.getElementById('unitTo');
    if (!fromSelect || !toSelect) return;
    fromSelect.innerHTML = ''; toSelect.innerHTML = '';
    
    for (let u in units[cat]) {
        fromSelect.add(new Option(u, u));
        toSelect.add(new Option(u, u));
    }
    if (toSelect.options.length > 1) toSelect.selectedIndex = 1;
    convertUnits();
}

function convertUnits() {
    const cat = document.getElementById('unitCategory').value;
    const val = parseFloat(document.getElementById('unitInputVal').value);
    if (isNaN(val)) return document.getElementById('unitOutputVal').value = '';
    
    const from = document.getElementById('unitFrom').value;
    const to = document.getElementById('unitTo').value;
    let res = 0;
    
    if (cat === 'temp') {
        let celsius = val;
        if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
        if (from === 'Kelvin') celsius = val - 273.15;
        
        if (to === 'Celsius') res = celsius;
        if (to === 'Fahrenheit') res = (celsius * 9/5) + 32;
        if (to === 'Kelvin') res = celsius + 273.15;
    } else {
        const baseVal = val * units[cat][from];
        res = baseVal / units[cat][to];
    }
    
    document.getElementById('unitOutputVal').value = Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}

// 4. YouTube Thumbnail Downloader
function extractYtThumbnail() {
    const url = document.getElementById('ytUrlInput').value;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
        const vid = match[1];
        const imgUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
        const imgEl = document.getElementById('ytThumbnailImg');
        imgEl.src = imgUrl;
        imgEl.style.display = 'block';
        document.getElementById('ytPreviewArea').querySelector('p').style.display = 'none';
        document.getElementById('ytDownloadBtn').style.display = 'block';
        document.getElementById('ytDownloadBtn').dataset.url = imgUrl;
    } else {
        document.getElementById('ytThumbnailImg').style.display = 'none';
        document.getElementById('ytPreviewArea').querySelector('p').style.display = 'block';
        document.getElementById('ytDownloadBtn').style.display = 'none';
    }
}

function downloadYtThumbnail() {
    const url = document.getElementById('ytDownloadBtn').dataset.url;
    if (!url) return;
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
    fetch(proxyUrl)
        .then(res => res.blob())
        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'youtube-thumbnail-hd.jpg';
            a.click();
        })
        .catch(err => alert("Could not download automatically. Please Right-Click the image and select 'Save Image As'."));
}

// 5. Text to Speech
let ttsVoices = [];
function populateVoices() {
    if (!window.speechSynthesis) return;
    ttsVoices = window.speechSynthesis.getVoices();
    const select = document.getElementById('ttsVoices');
    if (!select) return;
    select.innerHTML = '';
    ttsVoices.forEach((v, i) => {
        select.add(new Option(`${v.name} (${v.lang})`, i));
    });
}
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

function playTTS() {
    if (!window.speechSynthesis) return alert("Your browser does not support Text to Speech.");
    window.speechSynthesis.cancel();
    const text = document.getElementById('ttsInput').value;
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = document.getElementById('ttsVoices').value;
    if (ttsVoices[selectedVoice]) {
        utterance.voice = ttsVoices[selectedVoice];
    }
    utterance.pitch = parseFloat(document.getElementById('ttsPitch').value);
    utterance.rate = parseFloat(document.getElementById('ttsRate').value);
    window.speechSynthesis.speak(utterance);
}

function stopTTS() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
}

// Init unit converter and voices
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('unitCategory')) updateUnitOptions();
    setTimeout(populateVoices, 500);
});
"""
    if "HIGH-TRAFFIC TOOLS LOGIC" not in js:
        js += logic_ext

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("JS updated.")

if __name__ == '__main__':
    inject()
