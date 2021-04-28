import React, { useMemo } from 'react';
import { useTable } from "react-table";
// import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS1 } from './columns1';
// import { GROUPED_COLUMNS } from './columns';
import './table.css';

export const BasicTable = (props) => {

  const columns = useMemo(() => COLUMNS1, []);
  // const columns = useMemo(() => GROUPED_COLUMNS, []);

  var tbl =  JSON.parse(props.dados);
console.log(typeof tbl);

  const data = tbl.atividades;


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
