// import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: 'Loja Pedido',
    Footer: 'Loja Pedido',
    accessor: 'LOJAPEDIDO',
  },
  {
    Header: 'Loja Origem',
    Footer: 'Loja Origem',
    accessor: 'LOJAORIGEM',
  },
  {
    Header: 'Pedido',
    Footer: 'Pedido',
    accessor: 'PEDIDO',
  },
  {
    Header: 'Carga',
    Footer: 'Carga',
    accessor: 'CARGA',
  },
  {
    Header: 'Produto',
    Footer: 'Produto',
    accessor: 'PRODUTO',
  },
  {
    Header: 'Descrição',
    Footer: 'Descrição',
    accessor: 'DESCRICAO',
  },
  {
    Header: 'Quantidade',
    Footer: 'Quantidade',
    accessor: 'QUANTIDADE',
  },
  {
    Header: 'Doca',
    Footer: 'Doca',
    accessor: 'DOCA',
  },
  {
    Header: 'Veículo',
    Footer: 'Veículo',
    accessor: 'VEICULO',
  },
  {
    Header: 'Data Pedido',
    Footer: 'Data Pedido',
    accessor: 'DATAPEDIDO',
  },
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
