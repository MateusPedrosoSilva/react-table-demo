// import { format } from "date-fns";
import { ColumnFilter } from './ColumnFilter'

export const COLUMNS = [
  {
    Header: 'Prioridade',
    accessor: 'PRIORIDADE',
    disableFilters: true,
  },
  {
    Header: 'Placa *',
    accessor: 'PLACA',
    Filter: ColumnFilter,
  },
  {
    Header: 'Segunda placa',
    accessor: 'SEGUNDA_PLACA',
    disableFilters: true,
  },
  {
    Header: 'Motorista CPF *',
    accessor: 'MOTORISTA_CPF',
    disableFilters: true,
  },
  {
    Header: 'Referência de rota',
    accessor: 'REFERENCIA_DA_ROTA',
    Filter: ColumnFilter,
  },
  {
    Header: 'Data início rota',
    accessor: 'DATA_DE_INICIO_ROTA',
    disableFilters: true,
  },
  {
    Header: 'Pedido',
    accessor: 'SEQUENCIA',
    disableFilters: true,
  },
  {
    Header: 'Retorna origem',
    accessor: 'RETORNA_ORIGEM',
    disableFilters: true,
  },
  {
    Header: 'Cód. destino CPF',
    accessor: 'COD_DESTINO_CPF',
    Filter: ColumnFilter,
  },
  {
    Header: 'Cód. embarcador',
    accessor: 'COD_EMBARCADOR',
    disableFilters: true,
  },
  {
    Header: 'Descrição do destino',
    accessor: 'DESCRICAO_DESTINO',
    disableFilters: true,
  },
  {
    Header: 'Telefone',
    accessor: 'TELEFONE',
    disableFilters: true,
  },
  {
    Header: 'Coleta entrega serviço',
    accessor: 'COLETA_ENTREGA_SERVICO',
    disableFilters: true,
  },
  {
    Header: 'Documento',
    accessor: 'DOCUMENTO',
    disableFilters: true,
  },
  {
    Header: 'Tipo documento',
    accessor: 'TIPO_DOCUMENTO',
    disableFilters: true,
  },
  {
    Header: 'Chave de acesso',
    accessor: 'CHAVE_ACESSO',
    disableFilters: true,
  },
  {
    Header: 'CEP',
    accessor: 'CODIGO_POSTAL',
    disableFilters: true,
  },
  {
    Header: 'Logradouro',
    accessor: 'LOGRADOURO',
    disableFilters: true,
  },
  {
    Header: 'Número',
    accessor: 'NUMERO',
    disableFilters: true,
  },
  {
    Header: 'Complemento',
    accessor: 'COMPLEMENTO',
    disableFilters: true,
  },
  {
    Header: 'Bairro',
    accessor: 'BAIRRO',
    disableFilters: true,
  },
  {
    Header: 'Município',
    accessor: 'MUNICIPIO',
    disableFilters: true,
  },
  {
    Header: 'País',
    accessor: 'PAIS',
    disableFilters: true,
  },
  {
    Header: 'Latitude',
    accessor: 'LATITUDE',
    disableFilters: true,
  },
  {
    Header: 'Longitude',
    accessor: 'LONGITUDE',
    disableFilters: true,
  },
  {
    Header: 'Peso',
    accessor: 'PESO',
    disableFilters: true,
  },
  {
    Header: 'Quantidade',
    accessor: 'QUANTIDADE',
    disableFilters: true,
  },
  {
    Header: 'Volume',
    accessor: 'VOLUME',
    disableFilters: true,
  },
  {
    Header: 'Valor mercadoria',
    accessor: 'VALOR_MERCADORIA',
    disableFilters: true,
  },
  {
    Header: 'Prazo de entrega',
    accessor: 'PRAZO_ENTREGA',
    disableFilters: true,
  },
  {
    Header: 'Data agendamento',
    accessor: 'DATA_AGENDAMENTO',
    disableFilters: true,
  },
  {
    Header: 'Tempo de atendimento',
    accessor: 'TEMPO_ATENDIMENTO',
    disableFilters: true,
  },
  {
    Header: 'Horário início da janala',
    accessor: 'HORARIO_INICIO_JANELA',
    disableFilters: true,
  },
  {
    Header: 'Cód. tipo carga',
    accessor: 'COD_TIPO_CARGA',
    disableFilters: true,
  },
  {
    Header: 'Cód. operação',
    accessor: 'COD_OPERACAO',
    disableFilters: true,
  },
  {
    Header: 'Observações',
    accessor: 'OBSERVACOES',
    disableFilters: true,
  },
];

// export const GROUPED_COLUMNS = [
//   {
//     Header: 'id',
//     Footer: 'id',
//     accessor: 'id',
//   },
//   {
//     Header: 'Name',
//     Footer: 'Name',
//     columns: [
//       {
//         Header: 'First name',
//         Footer: 'First name',
//         accessor: 'first_name',
//       },
//       {
//         Header: 'Last name',
//         Footer: 'Last name',
//         accessor: 'last_name',
//       },
//     ],
//   },
//   {
//     Header: 'Info',
//     Footer: 'Info',
//     columns: [
//       {
//         Header: 'Date of birth',
//         Footer: 'Date of birth',
//         accessor: 'date_of_birth',
//       },
//       {
//         Header: 'Country',
//         Footer: 'Country',
//         accessor: 'country',
//       },
//       {
//         Header: 'Phone',
//         Footer: 'Phone',
//         accessor: 'phone',
//       },
//     ],
//   },
// ];
