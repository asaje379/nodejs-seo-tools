import { ApiProperty } from '@nestjs/swagger';

export class LighthousePayload {
  @ApiProperty() url: string;
}

export class SiteMapPayload {
  @ApiProperty() url: string;
}

export class InternalLinkPayload {
  @ApiProperty() url: string;
  @ApiProperty() nbre: number;
}

export type LighthouseMsArgs = {
  url: string;
  id: string;
};

export type SiteMapMsArgs = {
  url: string;
  id: string;
};

export type InternalLinkMsArgs = {
  url: string;
  id: string;
  nbre: number;
};
