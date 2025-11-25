export type UserRole = "COLABORADOR" | "GESTOR_RH" | "ADMIN";

export type UserStatus = "ATIVO" | "INATIVO";

export interface User {
  id: number;
  nome: string;
  email: string;
  username: string;
  senha?: string;
  cpf: string;
  papel: UserRole;
  telefone: string;
  status: UserStatus;
  dadosBancarios: {
    banco: string;
    agencia: string;
    conta: string;
  };
}

export type BenefitCategory = "ALIMENTACAO" | "SAUDE" | "OUTROS";

export type BenefitStatus = "ATIVO" | "SUSPENSO";

export interface Benefit {
  id: number;
  userId: number;
  nome: string;
  categoria: BenefitCategory;
  status: BenefitStatus;
  valor: string;
  descricao: string;
}

export type MessageStatus = "PENDENTE" | "EM_ANALISE" | "RESPONDIDA";

export interface Message {
  id: number;
  userId: number;
  titulo: string;
  conteudo: string;
  dataHora: string;
  status: MessageStatus;
}

export type LogEventType =
  | "LOGIN"
  | "LOGOUT"
  | "UPDATE_DATA"
  | "NEW_MESSAGE"
  | "CHANGE_ROLE"
  | "ATUALIZACAO_DADOS"
  | "NOVO_BENEFICIO"
  | "ALTERACAO_BENEFICIO"
  | "MENSAGEM_ENVIADA";

export interface Log {
  id: number;
  dataHora: string;
  usuario: string;
  userId: number | null;
  tipoEvento: LogEventType;
  descricao: string;
}

// CTF Types
export type CTFDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface CTFSubmissionCreate {
  name: string;
  email: string;
  flag: string;
}

export interface CTFSubmissionResponse {
  success: boolean;
  message: string;
  points?: number;
  difficulty?: CTFDifficulty;
  submitted_at?: string;
}

export interface CTFSubmission {
  id: number;
  user_name: string;
  user_email: string;
  flag_id: number;
  difficulty: CTFDifficulty;
  points: number;
  submitted_at: string;
}

export interface CTFLeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  total_points: number;
  submissions: Array<{
    difficulty: string;
    points: number;
    submitted_at: string;
  }>;
}

export interface CTFLeaderboard {
  entries: CTFLeaderboardEntry[];
  total_participants: number;
}

export interface CTFDifficultyStats {
  difficulty: CTFDifficulty;
  total_slots: number;
  used_slots: number;
  available_slots: number;
  points_per_flag: number;
}

export interface CTFStats {
  total_participants: number;
  total_submissions: number;
  difficulties: CTFDifficultyStats[];
  leaderboard_preview: CTFLeaderboardEntry[];
}