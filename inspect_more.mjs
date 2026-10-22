import fs from 'fs';
const html = fs.readFileSync('vodjo_temp.html', 'utf8');

// Let's inspect the header/navbar html
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  console.log('--- HEADER ---');
  console.log(headerMatch[0].substring(0, 1500));
}

// Let's check all section names/classes
const sectionTags = [...html.matchAll(/<section[^>]*class=["']([^"']*)["'][^>]*>/gi)].map(m => m[1]);
console.log('Section classes:', sectionTags);

// Let's inspect Our Clients
const clientIdx = html.indexOf('Our Clients');
if (clientIdx !== -1) {
  console.log('--- CLIENTS SNIPPET ---');
  console.log(html.substring(clientIdx - 50, clientIdx + 800));
}

// Let's inspect Testimonials
const testIdx = html.indexOf('Testimonials');
if (testIdx !== -1) {
  console.log('--- TESTIMONIALS SNIPPET ---');
  console.log(html.substring(testIdx - 50, testIdx + 800));
}

