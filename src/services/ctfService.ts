import apiClient from "./api";
import type {
  CTFSubmissionCreate,
  CTFSubmissionResponse,
  CTFLeaderboard,
  CTFStats,
} from "@/types";

class CTFService {
  /**
   * Submete uma flag para validação
   */
  async submitFlag(data: CTFSubmissionCreate): Promise<CTFSubmissionResponse> {
    return apiClient.post<CTFSubmissionResponse>("/api/ctf/submit", data);
  }

  /**
   * Obtém o leaderboard completo
   */
  async getLeaderboard(limit?: number): Promise<CTFLeaderboard> {
    const params = limit ? { limit } : undefined;
    return apiClient.get<CTFLeaderboard>("/api/ctf/leaderboard", params);
  }

  /**
   * Obtém estatísticas gerais do CTF
   */
  async getStats(): Promise<CTFStats> {
    return apiClient.get<CTFStats>("/api/ctf/stats");
  }

  /**
   * Obtém submissões de um usuário específico
   */
  async getMySubmissions(email: string): Promise<{
    email: string;
    total_submissions: number;
    total_points: number;
    submissions: Array<{
      difficulty: string;
      points: number;
      submitted_at: string;
    }>;
  }> {
    return apiClient.get(`/api/ctf/my-submissions`, { email });
  }
}

export const ctfService = new CTFService();
export default ctfService;

