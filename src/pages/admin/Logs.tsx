import { useState, useMemo } from "react";
import { mockLogs } from "@/mock/logs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { LogEventType } from "@/types";

const Logs = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState("");

  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      const matchesEventType =
        eventTypeFilter === "all" || log.tipoEvento === eventTypeFilter;
      const matchesUser = log.usuario
        .toLowerCase()
        .includes(userFilter.toLowerCase());
      return matchesEventType && matchesUser;
    });
  }, [mockLogs, eventTypeFilter, userFilter]);

  const getEventTypeLabel = (type: LogEventType) => {
    const labels = {
      LOGIN: "Login",
      LOGOUT: "Logout",
      ATUALIZACAO_DADOS: "Atualização de Dados",
      NOVO_BENEFICIO: "Novo Benefício",
      ALTERACAO_BENEFICIO: "Alteração de Benefício",
      MENSAGEM_ENVIADA: "Mensagem Enviada",
    };
    return labels[type];
  };

  const getEventTypeColor = (type: LogEventType) => {
    const colors = {
      LOGIN: "bg-success/10 text-success border-success/20",
      LOGOUT: "bg-muted text-muted-foreground border-muted",
      ATUALIZACAO_DADOS: "bg-info/10 text-info border-info/20",
      NOVO_BENEFICIO: "bg-primary/10 text-primary border-primary/20",
      ALTERACAO_BENEFICIO: "bg-warning/10 text-warning border-warning/20",
      MENSAGEM_ENVIADA: "bg-accent text-accent-foreground border-accent",
    };
    return colors[type];
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
                <SelectItem value="ATUALIZACAO_DADOS">Atualização de Dados</SelectItem>
                <SelectItem value="NOVO_BENEFICIO">Novo Benefício</SelectItem>
                <SelectItem value="ALTERACAO_BENEFICIO">Alteração de Benefício</SelectItem>
                <SelectItem value="MENSAGEM_ENVIADA">Mensagem Enviada</SelectItem>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
