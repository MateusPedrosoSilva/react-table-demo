import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTable, useRowSelect, usePagination, useSortBy, useGlobalFilter, useFilters } from "react-table";
import axios from 'axios';
import { COLUMNS } from './columns';
import { Checkbox } from './Checkbox';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';


//CSS
import './header/header.css';
import './table.css';

//Semantic-ui
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';

//Material-ui
import { LinearProgress, IconButton, makeStyles, Collapse, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Alert, AlertTitle } from '@material-ui/lab';

import Modal from 'react-modal';

// import { GlobalFilter } from './GlobalFilter';

import imagem from '../images/cabecalho.jpg';

//Calendário
import DatePicker from 'react-date-picker';

import { BasicTable } from './BasicTable';
// import { set } from 'date-fns';

const Roterizador = () => {
  //TODO: Manage the date, initial date

  //LoadingBar
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCelulas, setLoadingCelula] = useState(false);

  const [data, setData] = useState([]);
  const [shown, setShown] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);

  // Usado pra pegar a resposta do servidor e mostrar no Alert
  const [responseS, setResponseS] = useState([]);

  // Deixa o botao de enviar para o serior desabilitado
  const [btnVisivel, setBtnVisivel] = useState('x');

  // const [sendData, setSendData] = useState({});

  // Usado pra saber quando aparecer o loading bar
  const [loadBar, setLoadBar] = useState(true);

  // Coloca pagina com zoom de 80%
  document.body.style.zoom = "80%";

  var sendData;

  const columns = useMemo(() => COLUMNS, []);

  // Função de Pegar os pedidos 
  async function getData(datai1, dataf1) {
    setLoadingCelula(true);
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
        setLoadingCelula(false);
        console.log(res.status);
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
      <Menu.Item position='left'>
        <Link to='/' disabled='true'>
          <button className='botesRotas' disabled="true">
            Inicial
          </button>
        </Link>

        <Link to='/reenvio'>
          <button className='botesRotas'>
            Reenviar Pedido
          </button>
        </Link>
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
    // setGlobalFilter,
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
    useFilters,
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
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // const firstPageRows = rows.slice(0, 200);
  const { pageIndex, pageSize } = state;

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const modalBody = () => (
    // Build the modal body
    <div className='hide'>
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
      {/* <button onClick={() => setShown(false)}>Fechar</button> */}
    </div>
  );

  //GAMBIARRAS
  const createData = () => {
    // console.log('teste' + JSON.stringify(selectedFlatRows));
    setModalIsOpen(true);
    setShown(true);
    setLoadBar(false);
  };

  //fecha quando da errado
  const fecharModal = () => {
    setOpen(false);
    setShown(false);
    setModalIsOpen(false);
    setBtnVisivel('x');
  };

  // fecha quando ta certo
  const fecharModalAlert = () => {
    setLoadingData(true);
    setOpen(false);
    setShown(false);
    setModalIsOpen(false);
    setBtnVisivel('x');
    getData(dataInicial, dataFinal);
  }

  const pdfGenerate = () => {
    var doc = new jsPDF('portrait', 'px', 'a4', 'false');


    var bodyTable = [];
    JSON.parse(sendData).atividades.forEach(element => {
      bodyTable.push([element.DOCUMENTO, element.SEQUENCIA, element.NOME_CLIENTE, element.QUANTIDADE, element.VALOR_MERCADORIA])

    });

    var columns = ["N. Fiscal", "Pedido", "Cliente", "Quantidade", "Valor"];
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
      doc.setPage(1);

      doc.addImage(image, 'PNG', 10, 10, 415, 95);

      console.log('carregou');

      doc.autoPrint();

      window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=800,height=600");

      // doc.save('resultado.pdf');
    }

    image.onerror = function (e) {
      console.log('error', e);
    }
  }

  //localmente
  async function postRequest(data) {
    setBtnVisivel('');
    await axios.post('http://rota.lidernet.com.br:7777/enviarPedidos', JSON.parse(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        setLoadBar(false);

        if (response.data.message.ticket === undefined) {
          setOpen(false);
          setSuccess(false);
          setResponseS("Ticket: " + response.data.message.ticket + " / Status: ERRO! ");
        } else {
          setOpen(true);
          setSuccess(true);
          setResponseS("Ticket: " + response.data.message.ticket + " / Status: OK! ");
        }

      })
      .catch(function (error) {
        setOpen(true);
        setSuccess(false);
        setLoadBar(false);
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

      <div id='scrollTable'>
        <LinearProgress color="secondary" hidden={!loadingCelulas} />
        {
          loadingData ? (<LinearProgress color="secondary" />) : (<table {...getTableProps()}>
            {/* Head da Tabela */}
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ▼'
                            : ' ▲'
                          : ''}
                      </span>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body da tabela */}
            <tbody {...getTableBodyProps()}>
              {
                // firstPageRows.map((row) => {  
                // rows.map((row) => {
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {
                        row.cells.map((cell) => {
                          return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>

            {/* Footer da Tabela */}
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
      </div>

      {/* Paginação */}
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

      {/* Botões */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='buttonSeta'> {'<<'} </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='buttonGeral'> Anterior </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} className='buttonGeral'> Próxima </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='buttonSeta'> {'>>'} </button>
      </div>

      {/* Modal Option */}
      <div>
        <button onClick={() => createData()} className='buttonEnviar'>Visualizar envio</button>

        {shown && ReactDOM.createPortal(modalBody(), document.body)}
        <code className='hide'>
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
                    <label className='texto'>FECHAR</label>
                  </Button>
                }
              >
                <AlertTitle >Integrado com sucesso!</AlertTitle>
                <p>Response: {responseS}</p>
              </Alert>
            </Collapse>


            <Collapse in={open && !success}>

              <Alert
                action={
                  <Button onClick={() => fecharModal()} color="inherit" size="small">
                    <label className='texto'>FECHAR</label>
                  </Button>
                }
                severity="error"
              >
                <AlertTitle>Erro ao integrar!</AlertTitle>
                <label >Erro: {responseS}</label>

              </Alert>
            </Collapse>
            <LinearProgress color="secondary" hidden={!loadBar} />
            <br />
          </div>

          <div id='divButton' hidden={!shown}>
            <IconButton color="secondary" aria-label="Fechar" onClick={() => fecharModal()}  >
              <HighlightOffIcon fontSize="large" />
            </IconButton>
          </div>

          <div id='tabelaModal'>
            <BasicTable dados={sendData} />
          </div>

          <button onClick={() => { postRequest(sendData); setShown(false); setLoadBar(true) }}
            disabled={!btnVisivel} className='buttonEnviarModal'>
            Enviar para Senior
          </button>

          <button onClick={async () => pdfGenerate()} className='buttonGeral'>
            Gerar pdf
          </button>
        </Modal>
      </div>
    </>
  )
}

export default Roterizador;