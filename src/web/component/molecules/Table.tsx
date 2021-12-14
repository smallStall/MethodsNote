/* eslint-disable react/jsx-key */
import { useTable, Column } from 'react-table';
import { useEffect } from 'react';
import './Table.module.scss';
type Props<T extends object> = {
  columns: Column<T>[];
  data: T[];
};

/*
type TableNewProps<T extends object> = Pick<
  UseTableInstanceProps<T>,
  'getTableProps' | 'headerGroups' | 'getTableBodyProps' | 'prepareRow' | 'rows'
>;
*/

export function Table<T extends object>(props: Props<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>(props);
  useEffect(() => {
    const nohoho = async () => {
      const str = await window.myAPI.connect();
      console.log(str);
    };
    nohoho();
  }, []);

  return (
    <table {...getTableProps()} className="nohoho">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
