import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTable, useRowSelect, usePagination, useSortBy } from "react-table";
import axios from 'axios';
import { COLUMNS } from './columns';
import './table.css';
import { Checkbox } from './Checkbox';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import imagem from '../images/lider.png';


export const Roterizador = () => {
  //TODO: Manage the date, initial date

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [shown, setShown] = useState(false);
  const [dataInicial, setDataInicial] = useState(1210413);
  const [dataFinal, setDataFinal] = useState(1210416);
  // const [sendData, setSendData] = useState({});

  var sendData;

  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    async function getData(){
      await axios
        .get(`http://10.15.2.48:7777/listarPedidos?data_inicial=${dataInicial}&data_final=${dataFinal}`)
        .then((res) => {
          setData(res.data.message);
          setLoadingData(false);
          console.log(res.data.message);
        });
    };
    
    if(loadingData){
      getData();
    }
  });

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
    initialState: { 
      pageIndex: 0,
      hiddenColumns: [
        'SEGUNDA_PLACA',
        'RETORNA_ORIGEM',
        'COD_EMBARCADOR',
        'COLETA_ENTREGA_SERVICO',
        'PAIS',
        'LATITUDE',
        'LONGITUDE',
        'COD_OPERACAO',
        'COD_TIPO_CARGA',
        'PRIORIDADE',
        'PRAZO_ENTREGA',
        'DATA_AGENDAMENTO',
        'PRAZO_ENTREGA',
        'HORARIO_INICIO_JANELA',
        'TEMPO_ATENDIMENTO',
        'TIPO_DOCUMENTO',
        'CHAVE_ACESSO',
        'VOLUME',
      ]
    }
  },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            // Header: ({ getToggleAllRowsSelectedProps }) => (
            //   <Checkbox {...getToggleAllRowsSelectedProps()} />
            // ),
            // Header: ({ getToggleAllPageRowsSelectedProps }) => (
            //   <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            // ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns,
        ];
      });
    }
    );

  // const firstPageRows = rows.slice(0, 200);
  const { pageIndex, pageSize } = state;


  const modalBody = () => (
    // Build the modal body
    <div>
      <p>Teste de pagina de resumo</p>
      <pre>
        <code>
          {sendData = JSON.stringify({
            //selectedFlatRows: selectedFlatRows.map((row) => row.original),
            atividades: selectedFlatRows.map((row) => row.original),
          },
            null,
            2
          )
          }
        </code>
      </pre>
      <button onClick={() => setShown(false)}>Fechar</button>
    </div>
  );

  const pdfGenerate=()=>{
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');

   
   var bodyTable = [];
   JSON.parse(sendData).atividades.forEach(element => {
     bodyTable.push([element.DOCUMENTO, element.MUNICIPIO, element.BAIRRO,element.LOGRADOURO, element.COD_DESTINO_CPF ])

   });

   var columns = ["Pedido", "Cidade", "Bairro", "Logradouro","CEP"];
   console.log(bodyTable);
   doc.autoTable(columns, bodyTable,  {
    headStyles: {
       fillColor: [255,0,0]
    },
    startY: 70
});
   

var image = new Image();
// image.src = "https://js.cx/clipart/train.gif";
image.src = imagem;


image.onload = function(){
  doc.addImage(image, 'PNG', 270, 10, 70, 40); 
  console.log('carregou');
  var data = Date.now();
  var dataFormatada = moment(data).format('DD-MM-YYYY');

   doc.text(30,65,  'PLACA: '+ String(JSON.parse(sendData).atividades[0].PLACA));
   doc.text(400,65, 'DATA: ' + String(dataFormatada) );
 
   doc.autoPrint();
   
   window.open(doc.output('bloburl'), '_blank',"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=800,height=600");
   
  doc.save('resultado.pdf');
}

image.onerror = function(e){
  console.log('error', e);
}





    // doc.setLineWidth(1.0); 
    // doc.setDrawColor(0, 0, 0);

    // doc.line(450, 400, 300, 400);
// doc.addImage(image, 'PNG', 300, 80, 900, 50); 
  // doc.autotable(columns, bodyTable);
  
 }


  return (
    <>
      {
        loadingData ? (<p>Carregando as informações...</p>):(<table {...getTableProps()}>
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
      </table>)
      }
      <div>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
          {' '}
        </span>
        <span>
          | Ir para página: {' '}
          <input type='number' defaultValue={pageIndex + 1} onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }} style={{ width: '50px' }} />
        </span>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} >
          {
            [10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))
          }
        </select>
      </div>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}> Anterior </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}> Próxima </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
      </div>
      <div>
        <button onClick={ async () => await axios.post('http://10.15.2.48:7777/enviarPedidos', JSON.parse(sendData), {
          headers: {
            'Content-Type': 'application/json'
          }})
        }> Enviar para Senior </button>
        <button onClick={() => setShown(true)}>Prever envio</button>
        <button onClick={ async() => pdfGenerate()}>
  Gerar pdf
</button>
        {shown && ReactDOM.createPortal(modalBody(), document.body)}
      </div>
      
    </>
  )
}
