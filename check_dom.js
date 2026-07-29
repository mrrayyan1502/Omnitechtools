const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Check if there are any unclosed divs or articles
const divsOpen = (html.match(/<div\b[^>]*>/g) || []).length;
const divsClose = (html.match(/<\/div>/g) || []).length;
console.log(`DIVs: Open=${divsOpen}, Close=${divsClose}, Diff=${divsOpen - divsClose}`);

const articleOpen = (html.match(/<article\b[^>]*>/g) || []).length;
const articleClose = (html.match(/<\/article>/g) || []).length;
console.log(`ARTICLEs: Open=${articleOpen}, Close=${articleClose}, Diff=${articleOpen - articleClose}`);

const sectionOpen = (html.match(/<section\b[^>]*>/g) || []).length;
const sectionClose = (html.match(/<\/section>/g) || []).length;
console.log(`SECTIONs: Open=${sectionOpen}, Close=${sectionClose}, Diff=${sectionOpen - sectionClose}`);

const pOpen = (html.match(/<p\b[^>]*>/g) || []).length;
const pClose = (html.match(/<\/p>/g) || []).length;
console.log(`Ps: Open=${pOpen}, Close=${pClose}, Diff=${pOpen - pClose}`);
