import React, { useMemo } from 'react';
import { useTable } from "react-table";
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
// import { GROUPED_COLUMNS } from './columns';
import './table.css';

export const BasicTable = (props) => {

  const columns = useMemo(() => COLUMNS, []);
  // const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
// const data = props.dados;

console.log(JSON.stringify(props.dados));
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    // columns: columns,
    // data: data,
    // \/ Because of es6 sintax.
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render('Header')} </th>
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
                return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
              })
              }
            </tr>
          )
        })
        }
      </tbody>
      <tfoot>
        {footerGroups.map(
          (footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(
                (column) => (
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                )
              )}
            </tr>
          )
        )}
      </tfoot>
    </table>
  )
}
