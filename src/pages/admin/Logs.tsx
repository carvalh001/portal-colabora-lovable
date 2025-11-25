import { useState, useMemo } from "react";
import { useLogs } from "@/hooks/useLogQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Search, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { LogEventType } from "@/types";

const Logs = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState("");

  const { data: logs, isLoading, error } = useLogs();

  const filteredLogs = useMemo(() => {
    if (!logs) return [];
    
    return logs.filter((log) => {
      const matchesEventType =
        eventTypeFilter === "all" || log.tipoEvento === eventTypeFilter;
      const matchesUser = log.usuario
        .toLowerCase()
        .includes(userFilter.toLowerCase());
      return matchesEventType && matchesUser;
    });
  }, [logs, eventTypeFilter, userFilter]);

  const getEventTypeLabel = (type: LogEventType) => {
    const labels: Record<LogEventType, string> = {
      // Tipos em inglês (backend atual)
      LOGIN: "Login",
      LOGOUT: "Logout",
      UPDATE_DATA: "Atualização de Dados",
      NEW_MESSAGE: "Mensagem Enviada",
      CHANGE_ROLE: "Mudança de Papel",
      // Tipos em português (legado)
      ATUALIZACAO_DADOS: "Atualização de Dados",
      NOVO_BENEFICIO: "Novo Benefício",
      ALTERACAO_BENEFICIO: "Alteração de Benefício",
      MENSAGEM_ENVIADA: "Mensagem Enviada",
    };
    return labels[type] || type;
  };

  const getEventTypeColor = (type: LogEventType) => {
    const colors: Record<LogEventType, string> = {
      // Tipos em inglês (backend atual)
      LOGIN: "bg-green-100 text-green-700 border-green-200",
      LOGOUT: "bg-gray-100 text-gray-600 border-gray-200",
      UPDATE_DATA: "bg-blue-100 text-blue-700 border-blue-200",
      NEW_MESSAGE: "bg-purple-100 text-purple-700 border-purple-200",
      CHANGE_ROLE: "bg-orange-100 text-orange-700 border-orange-200",
      // Tipos em português (legado)
      ATUALIZACAO_DADOS: "bg-blue-100 text-blue-700 border-blue-200",
      NOVO_BENEFICIO: "bg-indigo-100 text-indigo-700 border-indigo-200",
      ALTERACAO_BENEFICIO: "bg-yellow-100 text-yellow-700 border-yellow-200",
      MENSAGEM_ENVIADA: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Logs de Eventos
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Acompanhe todos os eventos críticos registrados no portal
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Tipo de evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os eventos</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
                <SelectItem value="UPDATE_DATA">Atualização de Dados</SelectItem>
                <SelectItem value="NEW_MESSAGE">Mensagem Enviada</SelectItem>
                <SelectItem value="CHANGE_ROLE">Mudança de Papel</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuário..."
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Registro de Eventos ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
              <p className="text-center text-muted-foreground">
                Erro ao carregar logs
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">
                      Data/Hora
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">
                      Usuário
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">
                      Tipo de Evento
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-border transition-colors hover:bg-accent/50"
                  >
                    <td className="py-3 text-sm text-muted-foreground">
                      {format(new Date(log.dataHora), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </td>
                    <td className="py-3 text-sm font-medium text-foreground">
                      {log.usuario}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={getEventTypeColor(log.tipoEvento)}
                      >
                        {getEventTypeLabel(log.tipoEvento)}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-foreground">
                      {log.descricao}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
              {filteredLogs.length === 0 && (
                <p className="py-8 text-center text-muted-foreground">
                  Nenhum evento encontrado com os filtros aplicados
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
