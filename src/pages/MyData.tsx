import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateUserMutation } from "@/hooks/useUserQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, CreditCard, Loader2 } from "lucide-react";

const MyData = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const updateUserMutation = useUpdateUserMutation();
  
  const [formData, setFormData] = useState({
    email: "",
    telefone: "",
    banco: "",
    agencia: "",
    conta: "",
  });

  // Atualizar form quando user carregar
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        telefone: user.telefone || "",
        banco: user.dadosBancarios?.banco || "",
        agencia: user.dadosBancarios?.agencia || "",
        conta: user.dadosBancarios?.conta || "",
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserMutation.mutateAsync({
        email: formData.email,
        telefone: formData.telefone,
        dadosBancarios: {
          banco: formData.banco,
          agencia: formData.agencia,
          conta: formData.conta,
        },
      });

      toast({
        title: "Dados atualizados",
        description: "Suas alterações foram salvas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Meus Dados
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Visualize e edite suas informações pessoais
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={user.nome}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Este campo não pode ser editado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={user.cpf}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Este campo não pode ser editado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="(00) 00000-0000"
              />
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
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Informações para reembolso de despesas
            </p>

            <div className="space-y-2">
              <Label htmlFor="banco">Banco</Label>
              <Input
                id="banco"
                value={formData.banco}
                onChange={(e) => handleChange("banco", e.target.value)}
                placeholder="Nome do banco"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agencia">Agência</Label>
              <Input
                id="agencia"
                value={formData.agencia}
                onChange={(e) => handleChange("agencia", e.target.value)}
                placeholder="0000-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conta">Conta</Label>
              <Input
                id="conta"
                value={formData.conta}
                onChange={(e) => handleChange("conta", e.target.value)}
                placeholder="00000-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          size="lg"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MyData;
