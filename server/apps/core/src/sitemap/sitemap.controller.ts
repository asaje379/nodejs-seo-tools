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
  let user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
 }

async googleThisFunction(keyword: string) {
  const options = {
    page: 0, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      hl: 'en' 
    }
  }
  const response = await google.search(keyword, options);
}

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
    return parser.serp;
  } catch (error) {
    console.log(error);
  }
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
