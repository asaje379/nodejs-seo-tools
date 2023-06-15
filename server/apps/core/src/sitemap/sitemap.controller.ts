import { AppEvent, SiteMapPayload } from '@app/shared';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { SitemapService } from './sitemap.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../utils/typings';
// import * as GoogleSearchResults from 'google-search-results';
// const GoogleSearchResults = require('google-search-results');
// import { GoogleSearchResults, GoogleSearchResultsJSON } from 'google-search-results-nodejs';
import axios, { AxiosRequestConfig } from 'axios';
import { GoogleSERP } from 'serp-parser';
import * as google from 'googlethis';
import * as scrapeIt from 'scrape-it';
import * as cheerio from 'cheerio'


@Controller('site-map')
@ApiTags('SiteMap')
export class SitemapController {
  constructor(private service: SitemapService) {
    // let user_agent = this.selectRandom();
    let user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
    // scrapeIt("https://www.google.com/search?q=toto&start=50", {
    // url: {
    //   selector: ".apx8Vc.cHaqb"
    // }
    // }).then(({ data, status }) => {
    //     console.log(`Status Code: ${status}`)
    //     console.log(data)
    // });

    // let header = {
    //     "User-Agent": `${user_agent}`
    // }
    // this.getData('https://www.google.com/search?q=toto');
  //   const config: AxiosRequestConfig = {
  //     url: 'https://www.google.com/search?q=juste+un+test&start=8',
  //     method: 'GET',
  //     headers: {
  //       'User-Agent': user_agent,
  //     },
  //   };
  //   axios(config)
  // .then((response) => {
  //   // Traitez la réponse
  //   // console.log(response.data);
  //   const $ = cheerio.load(response.data)
  //   console.log($);
  //   let ads = [];
  //   $(".apx8Vc.cHaqb").each((i, el) => {
  //     const text = $(el).text();
  //     // if (!ads.includes(text)) {
  //       ads[i] = text
  //     // }
  // })
  // console.log(ads);
  
  //   // const parser = new GoogleSERP(response.data);
  //   // console.dir(parser.serp);
  // })
  // .catch((error) => {
  //   // Gérez les erreurs
  //   console.error(error);
  // });

    // Créez une instance du module
// const serp = new GoogleSearchResults();

// Définissez les paramètres de recherche
// const params = {
//   q: 'votre mot-clé',
//   location: 'Benin', // facultatif
//   num: 100 // Nombre de résultats à récupérer, facultatif (par défaut: 100)
// };

// // Effectuez la recherche
// serp.json(params, (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//     // Récupérez les résultats de recherche
//     const organicResults = result.organic_results;
    
//     // Parcourez les résultats pour trouver la position de votre site
//     for (let i = 0; i < organicResults.length; i++) {
//       const result = organicResults[i];
      
//       // Vérifiez si l'URL de votre site correspond à celui dans les résultats
//       if (result.link === 'URL de votre site') {
//         // La position de votre site est i + 1 (les indices commencent à partir de 0)
//         console.log('Votre site se trouve à la position', i + 1);
//         break;
//       }
//     }
//   }
// });
// this.googleThisFunction('test');
// this.getData2();
}

async getData2() {
  let resData = [];
    const _data: any = await this.getData('https://www.google.com/search?q=toto&start=10');
    console.log(_data);
    
    // const pagination = _data.pagination;
    // console.log(pagination);
    
    // resData = _data.organic;
    // console.log(resData);
    
    // for (let i = 0; i < pagination.length; i++) {
    //   const page = pagination[i]?.path;
    //   if (page !== '') {
    //     console.log('------------ page non vide ----------');
        
    //     const _data: any = await this.getData(page);
    //     console.log(_data);
        
    //     resData = resData.concat(_data?.organic)
    //   }
    // }
    // console.log(resData);
    // console.log('--------- termine -------------');
    
}

async googleThisFunction(keyword: string) {
  const options = {
    page: 0, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en' 
    }
  }
  console.log(google);
  
  const response = await google.search(keyword, options);
  console.log(response); 
}

// document.querySelectorAll('.apx8Vc.tjvcx.cHaqb')
async getData(url: string) {
  let user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
  const config: AxiosRequestConfig = {
    url: url,
    method: 'GET',
    headers: {
      'User-Agent': user_agent,
    },
  };
  try {
    const data = await axios(config);
    const parser = new GoogleSERP(data.data);
    // console.log('------------ parser.serp ------------');
    // console.dir(parser.serp);
    return parser.serp;
  } catch (error) {
    console.log(error);
  }

  // .then((response) => {
  //   // Traitez la réponse
  //   // console.log(response.data);
  //   const parser = new GoogleSERP(response.data);
  //   console.dir(parser.serp);
  // })
  // .catch((error) => {
  //   // Gérez les erreurs
  //   console.error(error);
  // });
}


selectRandom() {
  const userAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36", ]
  var randomNumber = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomNumber];
}

  @Post('run')
  async run(@Body() data: SiteMapPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.SITEMAP_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.SITEMAP_STATUS_CHANGED, data },
    });
  }

  @Get()
  async all(@Query() args: Pagination) {
    return await this.service.findAll(args);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
