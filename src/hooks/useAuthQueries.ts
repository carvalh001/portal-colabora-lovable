import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import type { User } from '@/types';

interface LoginCredentials {
  username: string;
  senha: string;
}

interface RegisterData {
  nome: string;
  email: string;
  username: string;
  senha: string;
  cpf: string;
  telefone: string;
  dadosBancarios?: {
    banco: string;
    agencia: string;
    conta: string;
  };
}

/**
 * Hook para fazer login
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Atualizar cache do usuário atual
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
}

/**
 * Hook para registrar novo usuário
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
  });
}

/**
 * Hook para obter usuário atual
 */
export function useCurrentUser(enabled = true) {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: () => authService.getMe(),
    enabled: enabled && authService.isAuthenticated(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

/**
 * Hook para fazer logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    authService.logout();
    queryClient.clear(); // Limpar todo o cache
  };
}

