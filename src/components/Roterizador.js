import React, { useMemo, useState } from 'react';
import { useTable, useRowSelect, usePagination } from "react-table";
// import MOCK_DATA from './MOCK_DATA.json';
// import MOCK_API from './MOCK_API.json';
import axios from 'axios';
import { COLUMNS } from './columns';
import './table.css';
import { Checkbox } from './Checkbox';

export const Roterizador = () => {
  const [dataInicial, seDataInicial] = useState(1210301);
  const [dataFinal, seDataFinal] = useState(1210406);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);
  // const data = useMemo(() => MOCK_API, []);

  var data = axios.get(`http://10.15.2.48:7777/listarPedidos?data_inicial=${dataInicial}&data_final=${dataFinal}`).then(res.message);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    // rows,
    page,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
    selectedFlatRows,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 }
  },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns,
        ];
      });
    });

  // const firstPageRows = rows.slice(0, 200);
  const { pageIndex, pageSize } = state;

  return (
    <>
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
          {
            // firstPageRows.map((row) => {
            // rows.map((row) => {
            page.map((row) => {
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
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {' '}
        </span>
        <span>
          | Go to page: {' '}
          <input type='number' defaultValue={pageIndex + 1} onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }} style={{ width: '50px' }} />
        </span>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} >
          {
            [10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
      </div>
      <pre>
        <code>
          {JSON.stringify({
            //selectedFlatRows: selectedFlatRows.map((row) => row.original),
            atividades: selectedFlatRows.map((row) => row.original),
            // test de comantario 
          },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}
