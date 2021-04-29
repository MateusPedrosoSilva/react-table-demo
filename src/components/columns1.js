// import { format } from "date-fns";

export const COLUMNS1 = [
 
  {
    Header: 'Placa',
    accessor: 'PLACA',
  },
  {
    Header: 'Motorista CPF',
    accessor: 'MOTORISTA_CPF',
  },
  {
    Header: 'Referência de rota',
    accessor: 'REFERENCIA_DA_ROTA',
  },
  {
    Header: 'Data início rota',
    accessor: 'DATA_DE_INICIO_ROTA',
  },
  {
    Header: 'Data previsão de atendimento',
    accessor: 'DATA_PREVISAO_ATENDIMENTO',
  },
  {
    Header: 'Pedido',
    accessor: 'SEQUENCIA',
  },
  {
    Header: 'Retorna origem',
    accessor: 'RETORNA_ORIGEM',
  },
  {
    Header: 'Cód. destino CPF',
    accessor: 'COD_DESTINO_CPF',
  },
  {
    Header: 'Cód. embarcador',
    accessor: 'COD_EMBARCADOR',
  },
  {
    Header: 'Descrição do destino',
    accessor: 'DESCRICAO_DESTINO',
  },
  {
    Header: 'Telefone',
    accessor: 'TELEFONE',
  },
  {
    Header: 'Coleta entrega serviço',
    accessor: 'COLETA_ENTREGA_SERVICO',
  },
  {
    Header: 'Documento',
    accessor: 'DOCUMENTO',
  },
  
  {
    Header: 'CEP',
    accessor: 'CODIGO_POSTAL',
  },
  {
    Header: 'Logradouro',
    accessor: 'LOGRADOURO',
  },
  {
    Header: 'Número',
    accessor: 'NUMERO',
  },
  {
    Header: 'Complemento',
    accessor: 'COMPLEMENTO',
  },
  {
    Header: 'Bairro',
    accessor: 'BAIRRO',
  },
  {
    Header: 'Município',
    accessor: 'MUNICIPIO',
  },
  {
    Header: 'Peso',
    accessor: 'PESO',
  },
  {
    Header: 'Quantidade',
    accessor: 'QUANTIDADE',
  },
  {
    Header: 'Valor mercadoria',
    accessor: 'VALOR_MERCADORIA',
  },
  {
    Header: 'Prazo de entrega',
    accessor: 'PRAZO_ENTREGA',
  }
];

export const GROUPED_COLUMNS = [
  {
    Header: 'id',
    Footer: 'id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First name',
        Footer: 'First name',
        accessor: 'first_name',
      },
      {
        Header: 'Last name',
        Footer: 'Last name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of birth',
        Footer: 'Date of birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
];
