import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SoupExtractorKind } from './constants';

export class UrlPayload {
  @ApiProperty() url: string;
}

export class TextAndUrlPayload {
  @ApiPropertyOptional() text?: string;
  @ApiPropertyOptional() url?: string;
}

export class TextAndStopwordPayload extends UrlPayload {
  @ApiProperty() text: string;
  @ApiPropertyOptional() stopwords?: string;
}

export type UrlMsArgs = {
  url: string;
  id: string;
};

export type TextAndStopwordsMsArgs = {
  text: string;
  stopwords?: string;
  id: string;
};

export type TextAndUrlMsArgs = {
  url?: string;
  text?: string;
  id: string;
};

export class SoupExtractorPayload {
  @ApiProperty() url: string;
  @ApiProperty() options: SoupExtractorKind[];
}

export type UrlOptionsMsArgs = {
  id: string;
  url: string;
  options: SoupExtractorKind[];
};
