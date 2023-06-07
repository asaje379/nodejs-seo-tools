import { ReactNode } from 'react';
import { ElementPerPage } from './ElementPerPage';
import { Pagination } from 'flowbite-react';
import { Search } from '../Search';

export type PaginationArgs = {
  page?: number;
  limit?: number;
  search?: string;
  totalCount?: number;
  filterContent?: ReactNode;
  downloadContent?: ReactNode;

  onSearch?: (x: string) => void;
  onPageSizeChanged?: (x: number) => void;
  onPageChanged?: (x: number) => void;
};

export const TableControls = ({
  page = 1,
  limit = 10,
  search,
  totalCount = 0,
  onSearch,
  onPageChanged,
  onPageSizeChanged,
}: PaginationArgs) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row items-center justify-between p-3 border border-light border-b-0 rounded">
      <div className="flex items-center justify-between gap-4 w-full lg:w-fit">
        <Search
          value={search}
          onSearch={onSearch ?? console.log}
        />
        <ElementPerPage
          onChange={onPageSizeChanged}
          value={limit}
        />
      </div>

      <div>
        <div className="font-semibold text-sm text-center text-gray-500">
          {totalCount} items
        </div>
        <Pagination
          currentPage={page}
          onPageChange={onPageChanged ?? console.log}
          totalPages={Math.ceil(totalCount / limit)}
        />
      </div>
    </div>
  );
};
