import { apiClient } from './api';
import type { Benefit, BenefitCategory, BenefitStatus } from '@/types';

interface GetBenefitsParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  category?: BenefitCategory;
  status?: BenefitStatus;
}

export const benefitService = {
  /**
   * Lista benefícios
   * Se COLABORADOR: retorna apenas seus próprios
   * Se GESTOR_RH/ADMIN: retorna todos ou filtrado por user_id
   */
  getBenefits: async (params?: GetBenefitsParams): Promise<Benefit[]> => {
    return apiClient.get<Benefit[]>('/api/benefits', params);
  },

  /**
   * Lista benefícios de um usuário específico
   * Apenas GESTOR_RH e ADMIN
   */
  getUserBenefits: async (userId: number): Promise<Benefit[]> => {
    return apiClient.get<Benefit[]>(`/api/users/${userId}/benefits`);
  },
};

export default benefitService;

