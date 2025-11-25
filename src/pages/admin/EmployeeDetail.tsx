import { useParams, Link, Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUserQueries";
import { useUserBenefits } from "@/hooks/useBenefitQueries";
import { useMessages } from "@/hooks/useMessageQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, Gift, MessageSquare, CreditCard, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { BenefitCategory, MessageStatus } from "@/types";

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : undefined;

  const { data: employee, isLoading: isLoadingEmployee, error: errorEmployee } = useUser(userId!);
  const { data: employeeBenefits, isLoading: isLoadingBenefits } = useUserBenefits(userId!);
  const { data: allMessages, isLoading: isLoadingMessages } = useMessages();

  const employeeMessages = allMessages?.filter((m) => m.userId === userId) || [];

  if (!userId) {
    return <Navigate to="/admin/colaboradores" replace />;
  }

  if (errorEmployee) {
    return <Navigate to="/admin/colaboradores" replace />;
  }

  if (isLoadingEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent><Skeleton className="h-32 w-full" /></CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent><Skeleton className="h-32 w-full" /></CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/admin/colaboradores" replace />;
  }

  const getCategoryLabel = (category: BenefitCategory) => {
    const labels = {
      ALIMENTACAO: "Alimentação",
      SAUDE: "Saúde",
      OUTROS: "Outros",
    };
    return labels[category];
  };

  const getStatusBadge = (status: MessageStatus) => {
    const variants = {
      RESPONDIDA: { label: "Respondida", className: "bg-success text-success-foreground" },
      EM_ANALISE: { label: "Em análise", className: "bg-warning text-warning-foreground" },
      PENDENTE: { label: "Pendente", className: "bg-muted text-muted-foreground" },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/colaboradores">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Dados do Colaborador
          </h1>
          <p className="text-sm text-muted-foreground">
            Colaboradores {">"} {employee.nome}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
              <p className="text-sm text-foreground">{employee.nome}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
              <p className="text-sm text-foreground">{employee.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">CPF</p>
              <p className="text-sm text-foreground">{employee.cpf}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p className="text-sm text-foreground">{employee.telefone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Situação</p>
              <Badge
                variant={employee.status === "ATIVO" ? "default" : "secondary"}
                className={
                  employee.status === "ATIVO"
                    ? "bg-success text-success-foreground"
                    : ""
                }
              >
                {employee.status === "ATIVO" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Dados Bancários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Banco</p>
              <p className="text-sm text-foreground">{employee.dadosBancarios.banco}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Agência</p>
              <p className="text-sm text-foreground">{employee.dadosBancarios.agencia}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conta</p>
              <p className="text-sm text-foreground">{employee.dadosBancarios.conta}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Benefícios ({employeeBenefits?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingBenefits ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {!employeeBenefits || employeeBenefits.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">
                  Nenhum benefício vinculado
                </p>
              ) : (
                employeeBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex items-start justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{benefit.nome}</h4>
                      <Badge variant="outline">
                        {getCategoryLabel(benefit.categoria)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {benefit.descricao}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {benefit.valor}
                    </p>
                  </div>
                  <Badge
                    variant={benefit.status === "ATIVO" ? "default" : "secondary"}
                    className={
                      benefit.status === "ATIVO"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {benefit.status === "ATIVO" ? "Ativo" : "Suspenso"}
                  </Badge>
                </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Últimas Mensagens ({employeeMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingMessages ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {employeeMessages.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">
                  Nenhuma mensagem enviada
                </p>
              ) : (
                employeeMessages.slice(0, 5).map((message) => (
                <div
                  key={message.id}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{message.titulo}</h4>
                    {getStatusBadge(message.status)}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {message.conteudo}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(message.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button asChild variant="outline">
          <Link to="/admin/colaboradores">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para lista de colaboradores
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
