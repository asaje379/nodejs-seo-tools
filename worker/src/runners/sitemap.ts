import * as sitemap from 'sitemap-generator';

export class Sitemap {
  generateSiteMap(url: string) {
    const generator = sitemap(url, {
      maxDepth: 0,
      filepath: './sitemap.xml',
      maxEntriesPerFile: 50000,
      stripQuerystring: true
    });

    // register event listeners
    generator.on('done', () => {
      console.log('done');
      
      // sitemaps created
    });
    
    // start the crawler
    generator.start();
    return 'start';
  }
}
