import { TableRow } from '../../components/core/table/CustomTable';

export class Pagination {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
}

export interface ListResponse {
  values: TableRow[];
  count: number;
}
