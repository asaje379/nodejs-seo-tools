import { useEffect, useState } from 'react';
import { TableRow } from '../components/core/table/CustomTable';

type PaginationArgs = {
  page?: number;
  limit?: number;
  search?: string;
  totalCount?: number;
  selected?: (string | number)[];
};
export function useDatable({
  page = 1,
  limit = 5,
  search,
  totalCount,
  selected,
  values,
}: PaginationArgs & { values?: TableRow[] }) {
  const [_page, setPage] = useState<number>(page);
  const [_limit, setLimit] = useState<number>(limit);
  const [_search, setSearch] = useState<string | undefined>(search);
  const [_selected, setSelected] = useState(selected ?? []);
  const [_values, setValues] = useState(values ?? []);

  useEffect(() => {
    if (values) {
      let result: TableRow[] = values;
      console.log(_page, _limit, _search, values);
      if (_search) {
        result =
          values?.filter((it) =>
            JSON.stringify(it).toLowerCase().includes(_search.toLowerCase()),
          ) ?? values;
      }

      const start = (_page - 1) * _limit;
      result = values.slice(start, start + _limit);

      setValues(result);
    }
  }, [_page, _limit, _search, values]);

  return {
    page: _page,
    limit: _limit,
    search: _search,
    selected: _selected,
    rows: _values,
    totalCount: values ? values.length : totalCount,
    onSelectionChanged: (values: (string | number)[]) =>
      setSelected([...values]),
    onSearch: setSearch,
    onPageChanged: setPage,
    onPageSizeChanged: setLimit,
  };
}
