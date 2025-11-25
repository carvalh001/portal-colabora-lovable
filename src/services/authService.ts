import { apiClient } from './api';
import type { User } from '@/types';

interface LoginRequest {
  username: string;
  senha: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface RegisterRequest {
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

export const authService = {
  /**
   * Faz login do usuário
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    
    // Salvar token no localStorage
    if (response.access_token) {
      apiClient.setToken(response.access_token);
      // Também salvar user para acesso rápido
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  /**
   * Registra novo usuário
   */
  register: async (userData: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/api/auth/register', userData);
    return response;
  },

  /**
   * Obtém dados do usuário autenticado
   */
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/auth/me');
    // Atualizar localStorage
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  },

  /**
   * Faz logout do usuário
   */
  logout: (): void => {
    apiClient.removeToken();
    localStorage.removeItem('user');
  },

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!apiClient.getToken();
  },

  /**
   * Obtém token atual
   */
  getToken: (): string | null => {
    return apiClient.getToken();
  },

  /**
   * Obtém usuário do localStorage (não faz requisição)
   */
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
};

export default authService;

