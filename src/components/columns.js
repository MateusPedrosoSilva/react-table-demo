// import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: 'Prioridade',
    Footer: 'Prioridade',
    accessor: 'PRIORIDADE',
  },
  {
    Header: 'Placa',
    Footer: 'Placa',
    accessor: 'PLACA',
  },
  {
    Header: 'Segunda placa',
    Footer: 'Segunda placa',
    accessor: 'SEGUNDA_PLACA',
  },
  {
    Header: 'Motorista CPF',
    Footer: 'Motorista CPF',
    accessor: 'MOTORISTA_CPF',
  },
  {
    Header: 'Referência de rota',
    Footer: 'Referência de rota',
    accessor: 'REFERENCIA_DE_ROTA',
  },
  {
    Header: 'Data início rota',
    Footer: 'Data início rota',
    accessor: 'DATA_INICIO_ROTA',
  },
  {
    Header: 'Data previsão de atendimento',
    Footer: 'Data previsão de atendimento',
    accessor: 'DATA_PREVISAO_ATENDIMENTO',
  },
  {
    Header: 'Pedido',
    Footer: 'Pedido',
    accessor: 'SEQUENCIA',
  },
  {
    Header: 'Retorna origem',
    Footer: 'Retorna origem',
    accessor: 'RETORNA_ORIGEM',
  },
  {
    Header: 'Cód. destino CPF',
    Footer: 'Cód. destino CPF',
    accessor: 'in',
  },
  {
    Header: 'Cód. embarcador',
    Footer: 'Cód. embarcador',
    accessor: 'COD_EMBARCADOR',
  },
  {
    Header: 'Descrição do destino',
    Footer: 'Descrição do destino',
    accessor: 'DESCRICAO_DESTINO',
  },
  {
    Header: 'Telefone',
    Footer: 'Telefone',
    accessor: 'TELEFONE',
  },
  {
    Header: 'Coleta entrega serviço',
    Footer: 'Coleta entrega serviço',
    accessor: 'COLETA_ENTREGA_SERVICO',
  },
  {
    Header: 'Documento',
    Footer: 'Documento',
    accessor: 'DOCUMENTO',
  },
  {
    Header: 'Tipo documento',
    Footer: 'Tipo documento',
    accessor: 'TIPO_DOCUMENTO',
  },
  {
    Header: 'Chave de acesso',
    Footer: 'Chave de acesso',
    accessor: 'CHAVE_ACESSO',
  },
  {
    Header: 'CEP',
    Footer: 'CEP',
    accessor: 'CODIGO_POSTAL',
  },
  {
    Header: 'Logradouro',
    Footer: 'Logradouro',
    accessor: 'LOGRADOURO',
  },
  {
    Header: 'Número',
    Footer: 'Número',
    accessor: 'NUMERO',
  },
  {
    Header: 'Complemento',
    Footer: 'Complemento',
    accessor: 'COMPLEMENTO',
  },
  {
    Header: 'Bairro',
    Footer: 'Bairro',
    accessor: 'BAIRRO',
  },
  {
    Header: 'Município',
    Footer: 'Município',
    accessor: 'MUNICIPIO',
  },
  {
    Header: 'Estado',
    Footer: 'Estado',
    accessor: 'ESTADO',
  },
  {
    Header: 'País',
    Footer: 'País',
    accessor: 'PAIS',
  },
  {
    Header: 'Latitude',
    Footer: 'Latitude',
    accessor: 'LATITUDE',
  },
  {
    Header: 'Longitude',
    Footer: 'Longitude',
    accessor: 'LONGITUDE',
  },
  {
    Header: 'Peso',
    Footer: 'Peso',
    accessor: 'PESO',
  },
  {
    Header: 'Quantidade',
    Footer: 'Quantidade',
    accessor: 'QUANTIDADE',
  },
  {
    Header: 'Volume',
    Footer: 'Volume',
    accessor: 'VOLUME',
  },
  {
    Header: 'Valor mercadoria',
    Footer: 'Valor mercadoria',
    accessor: 'VALOR_MERCADORIA',
  },
  {
    Header: 'Prazo de entrega',
    Footer: 'Prazo de entrega',
    accessor: 'PRAZO_ENTREGA',
  },
  {
    Header: 'Data agendamento',
    Footer: 'Data agendamento',
    accessor: 'DATA_AGENDAMENTO',
  },
  {
    Header: 'Tempo de atendimento',
    Footer: 'Tempo de atendimento',
    accessor: 'TEMPO_ATENDIMENTO',
  },
  {
    Header: 'Horário início da janala',
    Footer: 'Horário início da janala',
    accessor: 'HORARIO_INICIO_JANELA',
  },
  {
    Header: 'Cód. tipo carga',
    Footer: 'Cód. tipo carga',
    accessor: 'COD_TIPO_CARGA',
  },
  {
    Header: 'Cód. operação',
    Footer: 'Cód. operação',
    accessor: 'COD_OPERACAO',
  },
  {
    Header: 'Observações',
    Footer: 'Observações',
    accessor: 'OBSERVACOES',
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
