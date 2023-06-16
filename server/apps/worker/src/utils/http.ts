import { HttpStatus } from '@nestjs/common';
import axios from 'axios';

export class Http {
  static getDomain(url: string) {
    const _url = url.split('://')[1];
    return _url.split('/')[0];
  }

  static getBaseUrl(url: string) {
    const protocol = url.split('://')[0];
    return [protocol, Http.getDomain(url)].join('://');
  }

  static async getUrlPageInfo(url: string) {
    try {
      const response = await axios(url);
      return { status: response.status, content: response.data };
    } catch (error) {
      console.log(error);
      return {
        status: error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        content: '',
      };
    }
  }
}
