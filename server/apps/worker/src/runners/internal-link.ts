import * as Crawler from 'crawler';
import { Helper } from '../utils/helper';

export class InternalLink {
  formatCrawlerOptions(uriTab: string[], currentIndex: string) {
    return uriTab.map((uri: string) => {
      return {
        uri: currentIndex + uri,
        index: `${
          currentIndex === '' ? '' : '[' + currentIndex + ']'
        }['${uri}']`,
      };
    });
  }

  getInternalLink(uri: string, maxDepth: number) {
    return new Promise((resolve, reject) => {
      const internalLinks = []; // Tableau pour stocker les liens internes
      const crawler = new Crawler({
        maxDepth: 2, // Profondeur maximale de l'exploration
        callback: (error, res, done) => {
          if (error) {
            console.error(error);
          } else {
            const currentPageUrl = res.options.uri;
            const currentDepth = res.options.depth;
  
            // Extraye tous les liens internes de la page actuelle
            let internalLinksOnPage = res
              .$('a[href^="/"]')
              .toArray()
              .map((link) => {
                const href = res.$(link).attr('href');
  
                // Vérifie si le lien est relatif (commence par "/")
                // Si oui, le converti en URL absolue en utilisant la page actuelle comme base
                if (href.startsWith('/')) {
                  return new URL(href, currentPageUrl).href;
                }
  
                // Si le lien est déjà absolu, le retourner tel quel
                return href;
              });
  
            // ne concerve que les liens uniques
            internalLinksOnPage = Helper.removeDuplicates(internalLinksOnPage);
  
            // Ajoute les liens internes de la page actuelle au tableau
            internalLinks.push({
              url: currentPageUrl,
              links: internalLinksOnPage,
            });
  
            // Si la profondeur n'a pas atteint la limite maximale, suivre les liens internes pour explorer les pages liées
            if (currentDepth < maxDepth) {
              internalLinksOnPage.forEach((link) => {
                const oldUrl = internalLinks.findIndex((el) => el.url === link);
                if (oldUrl === -1) {
                  crawler.queue({ uri: link, depth: currentDepth + 1 });
                } else {
                  console.log('existe');
                }
              });
            }
          }
          done();
        },
      });
  
      // Commence le crawling en ajoutant l'URL de départ à la file d'attente
      crawler.queue({ uri: uri, depth: 1 });
  
      // Écoute l'événement "drain" pour savoir quand le crawling est terminé
      crawler.on('drain', () => {
        console.log('Crawling terminé');
        console.log('Liens internes du site :', internalLinks);
        resolve(internalLinks);
      });
    })
  }
}
