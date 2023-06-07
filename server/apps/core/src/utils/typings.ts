import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationArgs } from 'nestjs-prisma-pagination';

export class Pagination implements PaginationArgs {
  @ApiPropertyOptional() page?: number;
  @ApiPropertyOptional() limit?: number;
  @ApiPropertyOptional() search?: string;
  @ApiPropertyOptional() from?: string;
  @ApiPropertyOptional() to?: string;
}
