import { useQuery } from '@tanstack/react-query';
import { benefitService } from '@/services/benefitService';
import type { Benefit, BenefitCategory, BenefitStatus } from '@/types';

interface GetBenefitsParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  category?: BenefitCategory;
  status?: BenefitStatus;
}

/**
 * Hook para listar benefícios
 * Se COLABORADOR: retorna apenas seus próprios
 * Se GESTOR_RH/ADMIN: retorna todos ou filtrado por user_id
 */
export function useBenefits(params?: GetBenefitsParams) {
  return useQuery<Benefit[]>({
    queryKey: ['benefits', params],
    queryFn: () => benefitService.getBenefits(params),
  });
}

/**
 * Hook para listar benefícios de um usuário específico
 * Apenas GESTOR_RH e ADMIN
 */
export function useUserBenefits(userId: number) {
  return useQuery<Benefit[]>({
    queryKey: ['benefits', 'user', userId],
    queryFn: () => benefitService.getUserBenefits(userId),
    enabled: !!userId,
  });
}

