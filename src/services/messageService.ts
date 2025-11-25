import { apiClient } from './api';
import type { Message, MessageStatus } from '@/types';

interface GetMessagesParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  status?: MessageStatus;
}

interface CreateMessageRequest {
  titulo: string;
  conteudo: string;
}

export const messageService = {
  /**
   * Lista mensagens
   * Se COLABORADOR: retorna apenas suas mensagens
   * Se GESTOR_RH/ADMIN: retorna todas ou filtradas
   */
  getMessages: async (params?: GetMessagesParams): Promise<Message[]> => {
    return apiClient.get<Message[]>('/api/messages', params);
  },

  /**
   * Cria nova mensagem
   */
  createMessage: async (data: CreateMessageRequest): Promise<Message> => {
    return apiClient.post<Message>('/api/messages', data);
  },

  /**
   * Atualiza status da mensagem (GESTOR_RH/ADMIN)
   */
  updateMessageStatus: async (messageId: number, status: MessageStatus): Promise<Message> => {
    return apiClient.patch<Message>(`/api/messages/${messageId}`, { status });
  },
};

export default messageService;

