import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockMessages } from "@/mock/messages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { MessageStatus } from "@/types";

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const userMessages = mockMessages.filter((m) => m.userId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !conteudo.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensagem enviada (mock)",
      description: "Sua mensagem foi enviada ao RH com sucesso.",
    });

    setTitulo("");
    setConteudo("");
  };

  const getStatusBadge = (status: MessageStatus) => {
    const variants = {
      RESPONDIDA: { label: "Respondida", className: "bg-success text-success-foreground" },
      EM_ANALISE: { label: "Em análise", className: "bg-warning text-warning-foreground" },
      PENDENTE: { label: "Pendente", className: "bg-muted text-muted-foreground" },
    };
    const variant = variants[status];
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Mensagens para o RH
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Envie suas dúvidas e solicitações diretamente para o departamento de RH
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Nova Mensagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da mensagem</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Dúvida sobre benefício"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conteudo">Escreva sua mensagem</Label>
              <Textarea
                id="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Descreva sua dúvida ou solicitação..."
                rows={5}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Histórico de Mensagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userMessages.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                Você ainda não enviou nenhuma mensagem
              </p>
            ) : (
              userMessages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">
                      {message.titulo}
                    </h3>
                    {getStatusBadge(message.status)}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {message.conteudo}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enviada em{" "}
                    {format(new Date(message.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
