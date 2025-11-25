import { Message } from "@/types";

export const mockMessages: Message[] = [
  {
    id: "m1",
    userId: "1",
    titulo: "Dúvida sobre Vale Refeição",
    conteudo: "Gostaria de saber se é possível aumentar o valor do vale refeição.",
    dataHora: "2024-01-15T10:30:00",
    status: "RESPONDIDA",
  },
  {
    id: "m2",
    userId: "1",
    titulo: "Atualização de Dados Bancários",
    conteudo: "Preciso atualizar minha conta bancária para recebimento de reembolsos.",
    dataHora: "2024-01-20T14:45:00",
    status: "EM_ANALISE",
  },
  {
    id: "m3",
    userId: "1",
    titulo: "Solicitação de Auxílio Educação",
    conteudo: "Gostaria de solicitar o benefício de auxílio educação para um curso de pós-graduação.",
    dataHora: "2024-01-25T09:15:00",
    status: "PENDENTE",
  },
  {
    id: "m4",
    userId: "3",
    titulo: "Problema com Plano de Saúde",
    conteudo: "Estou tendo dificuldades para utilizar o plano de saúde na rede credenciada.",
    dataHora: "2024-01-18T11:20:00",
    status: "RESPONDIDA",
  },
  {
    id: "m5",
    userId: "3",
    titulo: "Reembolso de Despesas",
    conteudo: "Preciso solicitar reembolso de despesas médicas do mês passado.",
    dataHora: "2024-01-22T16:30:00",
    status: "EM_ANALISE",
  },
  {
    id: "m6",
    userId: "4",
    titulo: "Informações sobre Home Office",
    conteudo: "Quais são os requisitos para solicitar o auxílio home office?",
    dataHora: "2024-01-19T13:00:00",
    status: "RESPONDIDA",
  },
];
