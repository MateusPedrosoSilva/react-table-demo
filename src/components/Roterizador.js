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
import LinearProgress from '@material-ui/core/LinearProgress';

import Modal from 'react-modal';

import { Menu } from 'semantic-ui-react';

import { GlobalFilter } from './GlobalFilter'

import imagem from '../images/cabecalho.jpg';

import DatePicker from 'react-date-picker';

import { BasicTable } from './BasicTable';

import { makeStyles } from '@material-ui/core/styles';
import {Alert, AlertTitle } from '@material-ui/lab';


import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { set } from 'date-fns';

export const Roterizador = () => {
  //TODO: Manage the date, initial date

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [shown, setShown] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [responseS,setResponseS] = useState([]);
  // const [sendData, setSendData] = useState({});

  var sendData;

  const columns = useMemo(() => COLUMNS, []);


  async function getData(datai1, dataf1) {
    if (datai1 != null) {
      var dataFormatadaInicial = moment(datai1).format('YY-MM-DD');
      var partei = dataFormatadaInicial.split('-');
      dataFormatadaInicial = `1${partei[0]}${partei[1]}${partei[2]}`;
      datai1 = dataFormatadaInicial;

    } else {
      var dataFormatadaInicialNula = moment(datai1).format('YY-MM-DD');
      datai1 = dataFormatadaInicialNula;
    }

    if (dataf1 != null) {
      var dataFormatadaFinal = moment(dataf1).format('YY-MM-DD');
      var partef = dataFormatadaFinal.split('-');
      dataFormatadaFinal = `1${partef[0]}${partef[1]}${partef[2]}`;
      dataf1 = dataFormatadaFinal;

    } else {
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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

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



  
  //GAMBIARRAS
  const createData = () => {
    // console.log('teste' + JSON.stringify(selectedFlatRows));
    setModalIsOpen(true);
    setShown(true);
  };

  const fecharModal = () => {
    setOpen(false);
    setShown(false);
    setModalIsOpen(false);
  };

  const fecharModalAlert = () => {
    setOpen(false);
    setShown(false);
    setModalIsOpen(false);
    document.location.reload(true);
  }

  const pdfGenerate = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');


    var bodyTable = [];
    JSON.parse(sendData).atividades.forEach(element => {
      bodyTable.push([element.DOCUMENTO, element.SEQUENCIA, element.NOME_CLIENTE, element.QUANTIDADE, element.VALOR_MERCADORIA])

    });

    var columns = ["N. Fiscal", "Pedido","Cliente", "Quantidade", "Valor"];
    // console.log(bodyTable);
    doc.autoTable(columns, bodyTable, {
      headStyles: {
        fillColor: [255, 0, 0]
      },
      startY: 115
    });


    var image = new Image();
    // image.src = "https://js.cx/clipart/train.gif";
    image.src = imagem;


    image.onload = function () {
      doc.addImage(image, 'PNG', 70, 10, 500, 95);
      console.log('carregou');
      var data = Date.now();
      var dataFormatada = moment(data).format('DD-MM-YYYY');

      doc.text(350, 75, String(JSON.parse(sendData).atividades[0].PLACA));
      doc.text(40, 75, String(dataFormatada));

      doc.autoPrint();

      window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=800,height=600");

      doc.save('resultado.pdf');
    }

    image.onerror = function (e) {
      console.log('error', e);
    }
  }

 

    //localmente
    async function postRequest(data) {
      await axios.post('http://10.15.2.48:7777/enviarPedidos', JSON.parse(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          
          setOpen(true);
          setSuccess(true);
          setResponseS("Ticket: " + response.data.message.ticket + "/ Status: OK! ");
        })
        .catch(function (error) {
          setOpen(true);
          setSuccess(false);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setResponseS(error.response.data.message);
          }
        })
        ;
    };

  return (
    <>
      <header>
        {MenuExampleInputs()}
      </header>

      {
        loadingData ? (<LinearProgress color="green"/>) : (<table {...getTableProps()}>
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


        
        <button onClick={() => createData()}>Visualizar envio</button>

        {shown && ReactDOM.createPortal(modalBody(), document.body)}
        <code class='hide'>
          {sendData = JSON.stringify({
            //selectedFlatRows: selectedFlatRows.map((row) => row.original),
            atividades: selectedFlatRows.map((row) => row.original),
          },
            null,
            2
          )}
        </code>

        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => setModalIsOpen(false)}>
        <div className={classes.root}>
      <Collapse in={open && success}>
       
      <Alert
        action={
          <Button onClick={() => fecharModalAlert()} color="inherit" size="small">
            FECHAR
          </Button>
        }
      >
      <AlertTitle>Integrado com sucesso!</AlertTitle>
        Response: {responseS}
      </Alert>
      </Collapse>

     
      <Collapse in={open && !success}>
       
       <Alert
         action={
           <Button onClick={() => fecharModal()} color="inherit" size="small">
             Fechar
           </Button>
         }
         severity="error"
       >
       <AlertTitle>Erro ao integrar!</AlertTitle>
        Erro: {responseS}
       </Alert>
       </Collapse>
    </div>
          <button onClick={() => fecharModal()}>Fechar
    </button>


          <BasicTable dados={sendData} />
          <button onClick={() => postRequest(sendData)
          }> Enviar para Senior </button>
          <button onClick={async () => pdfGenerate()}>
            Gerar pdf
</button>

        </Modal>

      </div>

    </>
  )
}