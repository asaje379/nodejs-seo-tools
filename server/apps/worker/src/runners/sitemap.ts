import * as sitemap from 'sitemap-generator';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as path from 'path';

export class Sitemap {
  constructor() { }
  generateSiteMap(url: string) {
    return new Promise((resolve, reject) => {
      try {
        const generator = sitemap(url, {
          maxDepth: 0,
          filepath: './sitemap.xml',
          maxEntriesPerFile: 50000,
          stripQuerystring: true,
        });
        generator.on('done', () => {
          var parser = new xml2js.Parser();
          fs.readFile(path.join(__dirname, '../../../') + '/sitemap.xml', function(err, data) {
            parser.parseString(data, function (err, result) {
                console.dir(result);
                resolve(result?.urlset?.url);
            });
          });
        });
        generator.start();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }
}
