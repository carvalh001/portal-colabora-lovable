import { useQuery } from '@tanstack/react-query';
import { logService } from '@/services/logService';
import type { Log, LogEventType } from '@/types';

interface GetLogsParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  event_type?: LogEventType;
  start_date?: string;
  end_date?: string;
}

/**
 * Hook para listar logs de eventos (GESTOR_RH/ADMIN)
 */
export function useLogs(params?: GetLogsParams) {
  return useQuery<Log[]>({
    queryKey: ['logs', params],
    queryFn: () => logService.getLogs(params),
  });
}

