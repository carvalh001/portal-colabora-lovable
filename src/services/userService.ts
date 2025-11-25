import { apiClient } from './api';
import type { User, UserRole } from '@/types';

interface UpdateUserRequest {
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

export const userService = {
  /**
   * Obtém dados do usuário autenticado
   */
  getMe: async (): Promise<User> => {
    return apiClient.get<User>('/api/users/me');
  },

  /**
   * Atualiza dados do usuário autenticado
   */
  updateMe: async (data: UpdateUserRequest): Promise<User> => {
    return apiClient.put<User>('/api/users/me', data);
  },

  /**
   * Lista todos os usuários (GESTOR_RH/ADMIN)
   */
  getUsers: async (params?: GetUsersParams): Promise<User[]> => {
    return apiClient.get<User[]>('/api/users', params);
  },

  /**
   * Obtém detalhes de um usuário específico (GESTOR_RH/ADMIN)
   */
  getUser: async (userId: number): Promise<User> => {
    return apiClient.get<User>(`/api/users/${userId}`);
  },

  /**
   * Atualiza papel de um usuário (ADMIN)
   */
  updateUserRole: async (userId: number, papel: UserRole): Promise<User> => {
    return apiClient.patch<User>(`/api/users/${userId}/role`, { papel });
  },

  /**
   * Obtém benefícios de um usuário específico
   */
  getUserBenefits: async (userId: number): Promise<any[]> => {
    return apiClient.get<any[]>(`/api/users/${userId}/benefits`);
  },
};

export default userService;

