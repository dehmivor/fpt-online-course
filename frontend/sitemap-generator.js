const { SitemapStream } = require('sitemap');
const fs = require('fs');
const { Readable } = require('stream');

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
];

const stream = new SitemapStream({ hostname: 'https://risemaster.ihebmejri.com' });

const writeStream = fs.createWriteStream('./public/sitemap.xml');

Readable.from(urls).pipe(stream).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Sitemap generated at public/sitemap.xml');
});
