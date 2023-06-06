import { ApiProperty } from '@nestjs/swagger';

export class LighthousePayload {
  @ApiProperty() url: string;
}

export type LighthouseMsArgs = {
  url: string;
  id: string;
};
