import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import { Helper } from '../utils/helper';

export class SerpScore {
  // = 'https://www.google.com/search?q=juste+un+test&start=8'
  async run(data: {url: string, keyword: string}) {
    console.log(data);
    
    const keyword = this.formatKeyword(data.keyword);
    console.log(keyword);
    for (let i = 0; i < 10; i++) {
      const res: {index: number, url: string} = await this.checkData(data.url, keyword, i * 10);
      console.log(res);
      if (res.index !== -1) {
        return {index: res.index + 1, pageNumber: i + 1, url: res.url};
      }
      console.log(res);
      await Helper.sleep(2000);
    }
    return {index: -1, pageNumber: 0, url: ''};
  }

  checkData(domain: string, keyword: string, pageNumber: number): Promise<{index: number, url: string}> {
    return new Promise((resolve) => {
      try {
        const url = `https://www.google.com/search?q=${keyword}&start=${pageNumber}`;
        const user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
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
          const urls: string[] = [];
          $(".apx8Vc.cHaqb").each((i, el) => {
            const text = $(el).text();
            if (!urls.includes(text)) {
              urls.push(text);
            }
          });
          urls.forEach((el: string, i: number) => {
            if (el.includes(domain)) {
              resolve({index: i, url: el});
            }
          })
          })
          .catch((error) => {
            resolve({index: -1, url: ''});
            console.log(error);
          });
        } catch (error) {
          resolve({index: -1, url: ''});
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
