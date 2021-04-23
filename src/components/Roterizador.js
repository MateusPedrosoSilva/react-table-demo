import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTable, useRowSelect, usePagination, useSortBy, use, useGlobalFilter } from "react-table";
import axios from 'axios';
import { COLUMNS } from './columns';
import './table.css';
import { Checkbox } from './Checkbox';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './header/header.css';
import 'semantic-ui-css/semantic.min.css';

import Modal from 'react-modal';

import { Menu } from 'semantic-ui-react';

import { GlobalFilter } from './GlobalFilter'

import imagem from '../images/lider.png';

import DatePicker from 'react-date-picker';

import {BasicTable} from './BasicTable';

export const Roterizador = () => {
  //TODO: Manage the date, initial date

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [shown, setShown] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  // const [sendData, setSendData] = useState({});

  var sendData;

  const columns = useMemo(() => COLUMNS, []);


  async function getData(datai1, dataf1) {
     if(datai1 != null){
      var dataFormatadaInicial = moment(datai1).format('YY-MM-DD');
      var partei = dataFormatadaInicial.split('-');
      dataFormatadaInicial = `1${partei[0]}${partei[1]}${partei[2]}`;
       datai1 = dataFormatadaInicial;

     }else{
      var dataFormatadaInicialNula = moment(datai1).format('YY-MM-DD');
       datai1 = dataFormatadaInicialNula;
     }

     if(dataf1 != null){
      var dataFormatadaFinal = moment(dataf1).format('YY-MM-DD');
      var partef = dataFormatadaFinal.split('-');
      dataFormatadaFinal = `1${partef[0]}${partef[1]}${partef[2]}`;
      dataf1 = dataFormatadaFinal;

    }else{
      var dataFormatada2 = moment(dataf1).format('YY-MM-DD');
      dataf1 = dataFormatada2;
    }

    await axios
      .get(`http://10.15.2.48:7777/listarPedidos?data_inicial=${datai1}&data_final=${dataf1}`)
      .then((res) => {
        setData(res.data.message);
        setLoadingData(false);
        // console.log(res.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, [loadingData]);

    const MenuExampleInputs = () => (
    <Menu>
      <Menu.Item>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Menu.Item>

      <Menu.Item position='right' >
          <p>Data Inicial:</p>
          <DatePicker
            className='calendario'
            onChange={setDataInicial}
            value={dataInicial}
          />

          <p>Data Final:</p>
          <DatePicker
            className='calendario'
            onChange={setDataFinal}
            value={dataFinal}
          />

        <button onClick={() => getData(dataInicial, dataFinal)} className='button'>
          Atualizar
      </button>
      </Menu.Item>
    </Menu>
  )

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
    setGlobalFilter,
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
    useGlobalFilter,
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
  const { pageIndex, pageSize, globalFilter } = state;

  const [modalIsOpen, setModalIsOpen] = useState(false)
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

  const createData = (dados1) => (
    <div>
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => setModalIsOpen(false)}>

<code>
{sendData = JSON.stringify({
      //selectedFlatRows: selectedFlatRows.map((row) => row.original),
      atividades: selectedFlatRows.map((row) => row.original),
    },
      null,
      2
    )}
</code>
          <button onClick={() => setModalIsOpen(false)}>Fechar
    </button>


<BasicTable dados = {sendData}/>
          <button onClick={async () => await axios.post('http://10.15.2.48:7777/enviarPedidos', JSON.parse(sendData), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          }> Enviar para Senior </button>
          <button onClick={async () => pdfGenerate()}>
            Gerar pdf
</button>


          {/* <pre>
            <code>
              {sendData}
            </code>
          </pre> */}


          {shown && ReactDOM.createPortal(modalBody(), document.body)}



        </Modal>

    </div>
  );
  const pdfGenerate = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');


    var bodyTable = [];
    JSON.parse(sendData).atividades.forEach(element => {
      bodyTable.push([element.DOCUMENTO, element.SEQUENCIA, element.QUANTIDADE, element.NOME_CLIENTE])

    });

    var columns = ["N. Fiscal", "Pedido", "Quantidade", "Cliente"];
    // console.log(bodyTable);
    doc.autoTable(columns, bodyTable, {
      headStyles: {
        fillColor: [255, 0, 0]
      },
      startY: 70
    });


    var image = new Image();
    // image.src = "https://js.cx/clipart/train.gif";
    image.src = imagem;


    image.onload = function () {
      doc.addImage(image, 'PNG', 270, 10, 70, 40);
      console.log('carregou');
      var data = Date.now();
      var dataFormatada = moment(data).format('DD-MM-YYYY');

      doc.text(30, 65, 'PLACA: ' + String(JSON.parse(sendData).atividades[0].PLACA));
      doc.text(400, 65, 'DATA: ' + String(dataFormatada));

      doc.autoPrint();

      window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=800,height=600");

      doc.save('resultado.pdf');
    }

    image.onerror = function (e) {
      console.log('error', e);
    }

  }


  return (
    <>
      <header>
        {MenuExampleInputs()}
      </header>

      {
        loadingData ? (<p>Carregando as informações...</p>) : (<table {...getTableProps()}>
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


        <button onClick={() => setModalIsOpen(true)}>Visualizar envio</button>
        <button onClick={() => setShown(true)}>Prever envio</button>
        <button onClick={() => createData()}>Criar envio</button>

{shown && ReactDOM.createPortal(modalBody(), document.body)}


        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => setModalIsOpen(false)}>

<code>
{sendData = JSON.stringify({
      //selectedFlatRows: selectedFlatRows.map((row) => row.original),
      atividades: selectedFlatRows.map((row) => row.original),
    },
      null,
      2
    )}
</code>
          <button onClick={() => setModalIsOpen(false)}>Fechar
    </button>


<BasicTable dados = {sendData}/>
          <button onClick={async () => await axios.post('http://10.15.2.48:7777/enviarPedidos', JSON.parse(sendData), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          }> Enviar para Senior </button>
          <button onClick={async () => pdfGenerate()}>
            Gerar pdf
</button>


          {/* <pre>
            <code>
              {sendData}
            </code>
          </pre> */}


          {shown && ReactDOM.createPortal(modalBody(), document.body)}



        </Modal>


      </div>

    </>
  )
}