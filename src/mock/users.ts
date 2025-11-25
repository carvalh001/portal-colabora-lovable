import { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    nome: "Maria Santos",
    email: "maria.santos@empresa.com.br",
    cpf: "123.456.789-00",
    papel: "COLABORADOR",
    telefone: "(11) 98765-4321",
    status: "ATIVO",
    dadosBancarios: {
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
    },
  },
  {
    id: "2",
    nome: "João Silva",
    email: "joao.silva@empresa.com.br",
    cpf: "987.654.321-00",
    papel: "GESTOR_RH",
    telefone: "(11) 91234-5678",
    status: "ATIVO",
    dadosBancarios: {
      banco: "Itaú",
      agencia: "5678-9",
      conta: "98765-4",
    },
  },
  {
    id: "3",
    nome: "Ana Costa",
    email: "ana.costa@empresa.com.br",
    cpf: "456.789.123-00",
    papel: "COLABORADOR",
    telefone: "(11) 93456-7890",
    status: "ATIVO",
    dadosBancarios: {
      banco: "Bradesco",
      agencia: "2345-6",
      conta: "23456-7",
    },
  },
  {
    id: "4",
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com.br",
    cpf: "789.123.456-00",
    papel: "COLABORADOR",
    telefone: "(11) 94567-8901",
    status: "ATIVO",
    dadosBancarios: {
      banco: "Santander",
      agencia: "3456-7",
      conta: "34567-8",
    },
  },
  {
    id: "5",
    nome: "Fernanda Lima",
    email: "fernanda.lima@empresa.com.br",
    cpf: "321.654.987-00",
    papel: "COLABORADOR",
    telefone: "(11) 95678-9012",
    status: "INATIVO",
    dadosBancarios: {
      banco: "Caixa Econômica",
      agencia: "4567-8",
      conta: "45678-9",
    },
  },
];
