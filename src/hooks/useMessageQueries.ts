import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageService } from '@/services/messageService';
import type { Message, MessageStatus } from '@/types';

interface GetMessagesParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  status?: MessageStatus;
}

interface CreateMessageData {
  titulo: string;
  conteudo: string;
}

/**
 * Hook para listar mensagens
 */
export function useMessages(params?: GetMessagesParams) {
  return useQuery<Message[]>({
    queryKey: ['messages', params],
    queryFn: () => messageService.getMessages(params),
  });
}

/**
 * Hook para criar nova mensagem
 */
export function useCreateMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMessageData) => messageService.createMessage(data),
    onSuccess: () => {
      // Invalidar cache de mensagens para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      // Invalidar logs também
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
}

/**
 * Hook para atualizar status de uma mensagem (GESTOR_RH/ADMIN)
 */
export function useUpdateMessageStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, status }: { messageId: number; status: MessageStatus }) =>
      messageService.updateMessageStatus(messageId, status),
    onSuccess: () => {
      // Invalidar cache de mensagens
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

