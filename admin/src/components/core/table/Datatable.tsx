import { CustomTable, TableProps } from './CustomTable';
import { PaginationArgs, TableControls } from './TableControls';

type DataTableProps = TableProps & PaginationArgs;

export const Datatable = ({
  cols,
  rows,
  page = 1,
  limit = 5,
  search,
  totalCount,
  activeSelection = false,
  filterContent,
  downloadContent,

  onSelectionChanged = console.log,
  onSearch,
  onPageChanged,
  onPageSizeChanged,
}: DataTableProps) => {
  return (
    <div>
      <TableControls
        {...{
          page,
          limit,
          search,
          totalCount,
          filterContent,
          downloadContent,
          onSearch,
          onPageChanged,
          onPageSizeChanged,
        }}
      />
      <CustomTable {...{ activeSelection, onSelectionChanged, rows, cols }} />
    </div>
  );
};
