import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import type { User, UserRole } from '@/types';

interface UpdateUserData {
  nome?: string;
  email?: string;
  telefone?: string;
  dadosBancarios?: {
    banco: string;
    agencia: string;
    conta: string;
  };
}

interface GetUsersParams {
  skip?: number;
  limit?: number;
  role?: UserRole;
  is_active?: boolean;
  search?: string;
}

/**
 * Hook para listar usuários (GESTOR_RH/ADMIN)
 */
export function useUsers(params?: GetUsersParams) {
  return useQuery<User[]>({
    queryKey: ['users', params],
    queryFn: () => userService.getUsers(params),
  });
}

/**
 * Hook para obter detalhes de um usuário específico
 */
export function useUser(userId: number, enabled = true) {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    enabled,
  });
}

/**
 * Hook para atualizar dados do usuário autenticado
 */
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => userService.updateMe(data),
    onSuccess: (data) => {
      // Atualizar cache do usuário atual
      queryClient.setQueryData(['currentUser'], data);
      // Invalidar lista de usuários se existir
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

/**
 * Hook para atualizar papel de um usuário (ADMIN)
 */
export function useUpdateUserRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, papel }: { userId: number; papel: UserRole }) =>
      userService.updateUserRole(userId, papel),
    onSuccess: (data, variables) => {
      // Atualizar cache do usuário específico
      queryClient.setQueryData(['user', variables.userId], data);
      // Invalidar lista de usuários
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

/**
 * Hook para obter benefícios de um usuário
 */
export function useUserBenefits(userId: number, enabled = true) {
  return useQuery({
    queryKey: ['userBenefits', userId],
    queryFn: () => userService.getUserBenefits(userId),
    enabled,
  });
}

