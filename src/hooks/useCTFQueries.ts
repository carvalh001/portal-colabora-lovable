import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ctfService } from "@/services/ctfService";
import type { CTFSubmissionCreate } from "@/types";
import { toast } from "@/hooks/use-toast";

/**
 * Hook para submeter uma flag
 */
export function useSubmitFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CTFSubmissionCreate) => ctfService.submitFlag(data),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "🎉 Flag Encontrada!",
          description: response.message,
          variant: "default",
        });
        
        // Invalidar queries relacionadas para atualizar dados
        queryClient.invalidateQueries({ queryKey: ["ctf-leaderboard"] });
        queryClient.invalidateQueries({ queryKey: ["ctf-stats"] });
      } else {
        toast({
          title: "Flag Incorreta",
          description: response.message,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao submeter flag. Tente novamente.",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook para obter o leaderboard
 */
export function useLeaderboard(limit?: number) {
  return useQuery({
    queryKey: ["ctf-leaderboard", limit],
    queryFn: () => ctfService.getLeaderboard(limit),
    refetchInterval: 30000, // Atualiza a cada 30 segundos
    staleTime: 10000, // Considera dados frescos por 10 segundos
  });
}

/**
 * Hook para obter estatísticas do CTF
 */
export function useCTFStats() {
  return useQuery({
    queryKey: ["ctf-stats"],
    queryFn: () => ctfService.getStats(),
    refetchInterval: 30000,
    staleTime: 10000,
  });
}

/**
 * Hook para obter submissões de um usuário
 */
export function useMySubmissions(email: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["ctf-my-submissions", email],
    queryFn: () => ctfService.getMySubmissions(email),
    enabled: enabled && !!email,
    staleTime: 5000,
  });
}

