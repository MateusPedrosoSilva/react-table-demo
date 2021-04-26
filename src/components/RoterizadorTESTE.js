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

import { BasicTable } from './BasicTable';

export const RoterizadorTESTE = () => {
  //TODO: Manage the date, initial date

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [shown, setShown] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [visivel, setVisivel] = useState('');
  // const [sendData, setSendData] = useState({});

  var sendData;

  const columns = useMemo(() => COLUMNS, []);


  async function getData() {

    await axios
      .get(`https://fakestoreapi.com/products/`)
      .then((res) => {
        setData(res.data);
        setLoadingData(false);
        // console.log(res.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
    <div class='hide'>
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
    setShown(false);
    setModalIsOpen(false);
  };


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



  };
  //localmente
  async function postRequest(data) {
    data = `{
      "atividades": [
        {
          "PRIORIDADE": "9",
          "PLACA": "OTX4339",
          "SEGUNDA_PLACA": "0",
          "MOTORISTA_CPF": null,
          "REFERENCIA_DA_ROTA": 100,
          "DATA_DE_INICIO_ROTA": "08/04/2021",
          "DATA_PREVISAO_ATENDIMENTO": "0",
          "SEQUENCIA": 76732444323433323,
          "RETORNA_ORIGEM": "0",
          "COD_DESTINO_CPF": "03003536265",
          "COD_EMBARCADOR": "0",
          "DESCRICAO_DESTINO": "ENTREGA PELO CDAM/TRAV SEGUINDA DE QUELUZ 368 ENTRE ROSO DANIN E SILVA ROSADO EM FRENTE A ESCOLA SIECtestestest44e",
          "TELEFONE": 91980133977,
          "COLETA_ENTREGA_SERVIÇO": "ENTREGA",
          "DOCUMENTO": 4190332323595,
          "TIPO_DOCUMENTO": "NFE",
          "CHAVE_ACESSO": "15210405054671000582550010004905951077727519",
          "CODIGO_POSTAL": 66070500,
          "LOGRADOURO": "SEGUNDA DE QUELUZ",
          "NUMERO": "368",
          "COMPLEMENTO": "CASA",
          "BAIRRO": "CANUDOS",
          "MUNICIPIO": "BELEM",
          "ESTADO": "PA",
          "PAIS": "BRASIL",
          "LATITUDE": "0",
          "LONGITUDE": "0",
          "PESO": 16,
          "QUANTIDADE": 1,
          "VOLUME": 0,
          "VALOR_MERCADORIA": 279,
          "PRAZO_ENTREGA": "08/04/2021",
          "DATA_AGENDAMENTO": "0",
          "TEMPO_ATENDIMENTO": "0",
          "HORARIO_INICIO_JANELA": "0",
          "COD_TIPO_CARGA": "0",
          "COD_OPERACAO": "0",
          "OBSERVACOES": "VD.PAULO/REFNT2000"
        }
      ]
    }`;
    await axios.post('http://localhost:7777/enviarPedidos', JSON.parse(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        alert(JSON.stringify(response));
        fecharModal();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(JSON.stringify(error.response.data.message));
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


        <button onClick={() => createData()} >Visualizar envio</button>
        {/* <button onClick={() => setShown(true)}>Prever envio</button>
        <button onClick={() => createData()}>Criar envio</button> */}

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

          {/* <code class='hide'>
            {sendData = JSON.stringify({
              //selectedFlatRows: selectedFlatRows.map((row) => row.original),
              atividades: selectedFlatRows.map((row) => row.original),
            },
              null,
              2
            )}
          </code> */}
          <button onClick={() => fecharModal()}>Fechar
    </button>


          <BasicTable dados={sendData} />
          <button onClick={() => postRequest(sendData)
          }> Enviar para Senior </button>
          <button onClick={async () => pdfGenerate()}>
            Gerar pdf
</button>


          {/* <pre>
            <code>
              {sendData}
            </code>
          </pre> */}




        </Modal>


      </div>

    </>
  )
}