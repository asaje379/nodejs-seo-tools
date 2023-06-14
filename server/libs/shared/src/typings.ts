import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UrlPayload {
  @ApiProperty() url: string;
}

export class TextAndUrlPayload {
  @ApiPropertyOptional() text?: string;
  @ApiPropertyOptional() url?: string;
}

export type UrlMsArgs = {
  url: string;
  id: string;
};

export type TextAndUrlMsArgs = {
  url?: string;
  text?: string;
  id: string;
};
