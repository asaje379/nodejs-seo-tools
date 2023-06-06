import axios from 'axios';
import { GoogleSERP } from 'serp-parser';

export class SerpScore {
  async run(url: string) {
    try {
      const response = await axios.get(url);
      const parser = new GoogleSERP(response.data as string);
      console.log(parser);
      return parser.serp;
    } catch (error) {
      return null;
    }
  }
}
