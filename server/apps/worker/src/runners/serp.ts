import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import { Helper } from '../utils/helper';

export class SerpScore {
  async run(data: {url: string, keyword: string, maxResult: number, userAgent: string}) {
    data.maxResult = data.maxResult > 500 ? 500 : data.maxResult;
    const keyword = this.formatKeyword(data.keyword);
    for (let i = 0; i < (Math.trunc(data.maxResult / 10) + 1); i++) {
      const res: {index: number, data: {url: string, title: string, title_desc: string, paragraphe: string, imgUrl: string}} = await this.checkData(data.url, keyword, i * 10, data.userAgent);
      if (res.index !== -1) {
        return {index: res.index + 1, pageNumber: i + 1, data: res.data};
      }
      await Helper.sleep(2000);
    }
    return {index: -1, pageNumber: 0, data: undefined};
  }

  checkData(domain: string, keyword: string, pageNumber: number, userAgent: string): Promise<{index: number, data: {url: string, title: string, title_desc: string, paragraphe: string, imgUrl: string, imgAlt: string}}> {
    return new Promise((resolve) => {
      try {
        const url = `https://www.google.com/search?q=${keyword}&start=${pageNumber}`;
        const user_agent = userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
          const config: AxiosRequestConfig = {
            url: url,
            method: 'GET',
            headers: {
              'User-Agent': user_agent,
            },
          };
          axios(config)
          .then((response) => {
          const $ = cheerio.load(response.data);
          const urls: {url: string, resultDesc: {url: string, title: string, title_desc: string, paragraphe: string, imgUrl: string, icon: string, imgAlt: string}}[] = [];
          $(".MjjYud").each((i, el) => {
            const tab = $(el).find('.apx8Vc.cHaqb');
            const text = $(tab).text();
            if (!urls.map(_el => _el.url).includes(text)) {
              const url = $(el).find('.yuRUbf a').attr('href');
              const title = $(el).find('.yuRUbf a .LC20lb').text();
              const title_desc = $(el).find('.yuRUbf a .VuuXrf').text();
              const para = $(el).find('.MjjYud .Z26q7c .VwiC3b span').text();
              const icon = $(el).find('.MjjYud .XNo5Ab').attr('src');
              const imgUrl = $(el).find('.MjjYud .LicuJb img').attr('src');
              const imgAlt = $(el).find('.MjjYud .LicuJb img').attr('alt');
              urls.push({url: text, resultDesc: {url: url, title: title, title_desc: title_desc, paragraphe: para, imgUrl, icon, imgAlt}});
            }
          });
          // $(".apx8Vc.cHaqb").each((i, el) => {
          //   const text = $(el).text();
          //   if (!urls.includes(text)) {
          //     urls.push(text);
          //   }
          // });
          urls.forEach((el: {url: string, resultDesc: {url: string, title: string, title_desc: string, paragraphe: string, imgUrl: string, icon: string, imgAlt: string}}, i: number) => {
            if (el.url.includes(domain)) {
              resolve({index: i, data: el.resultDesc});
            }
          });
          resolve({index: -1, data: undefined});
          })
          .catch((error) => {
            resolve({index: -1, data: undefined});
          });
        } catch (error) {
          resolve({index: -1, data: undefined});
        }
    })
  }

  formatKeyword(keyword: string) {
    try {
      return keyword.trim().replace(/ /g, '+');
    } catch (error) {
      return '';
    }
  }
}
