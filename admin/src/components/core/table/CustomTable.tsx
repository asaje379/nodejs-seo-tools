import { Checkbox, Table } from 'flowbite-react';
import { ChangeEvent, ReactNode, useState } from 'react';

export type TableCol = {
  label: string;
  id?: string | number;
  render?: (row: TableRow) => ReactNode;
};

export type TableRow = {
  id: string | number;
  [x: string]: any;
};

export type TableProps = {
  cols: TableCol[];
  rows: TableRow[];
  activeSelection?: boolean;
  onSelectionChanged?: (values: Array<string | number>) => void;
};

export const CustomTable = ({
  cols,
  rows,
  activeSelection = false,
  onSelectionChanged = console.log,
}: TableProps) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);

  const selectAll = () => {
    const data = rows.map((row) => row.id);
    setSelected(data);
    onSelectionChanged(data);
  };

  const unselectAll = () => {
    setSelected([]);
    onSelectionChanged([]);
  };

  const handleAllSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectAll();
      return;
    }
    unselectAll();
  };

  const handleOneSelection = (
    id: string | number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.checked) {
      const data = selected.filter((item) => item !== id);
      setSelected(data);
      onSelectionChanged(data);
      return;
    }
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
      onSelectionChanged(selected);
    }
  };

  return (
    <div className="w-full overflow-auto border border-light">
      <Table>
        <Table.Head>
          {activeSelection && (
            <Table.HeadCell className="w-[30px]">
              <Checkbox
                checked={selected.length === rows.length}
                onChange={handleAllSelection}
              />
            </Table.HeadCell>
          )}
          {cols.map((col, index) => (
            <Table.HeadCell key={index + '_h'}>{col.label}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i + '_r'}>
              {activeSelection && (
                <Table.Cell>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={(value) => handleOneSelection(row.id, value)}
                  />
                </Table.Cell>
              )}
              {renderRow(row, cols)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

function renderRow(row: TableRow, cols: TableCol[]) {
  return cols.map((col, index) => (
    <Table.Cell key={index + '_COL'}>
      {col.id ? row[col.id] : col.render ? col.render(row) : ''}
    </Table.Cell>
  ));
}
