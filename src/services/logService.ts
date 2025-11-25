import { apiClient } from './api';
import type { Log, LogEventType } from '@/types';

interface GetLogsParams {
  skip?: number;
  limit?: number;
  user_id?: number;
  event_type?: LogEventType;
  start_date?: string;
  end_date?: string;
}

export const logService = {
  /**
   * Lista logs de eventos (GESTOR_RH/ADMIN)
   */
  getLogs: async (params?: GetLogsParams): Promise<Log[]> => {
    return apiClient.get<Log[]>('/api/logs', params);
  },
};

export default logService;

