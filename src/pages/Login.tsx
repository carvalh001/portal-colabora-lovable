import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockUsers } from "@/mock/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedUserId) {
      login(selectedUserId);
      navigate("/home");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold md:text-3xl">
            Portal de Benefícios do Colaborador
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Acesse seus benefícios e informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 rounded-lg bg-info/10 p-3 text-sm text-info">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              <strong>Ambiente de demonstração</strong> - Selecione um usuário para acessar o sistema com dados fictícios.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Selecione um perfil
              </label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um usuário..." />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers
                    .filter((u) => ["1", "2"].includes(u.id))
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.nome} -{" "}
                        {user.papel === "GESTOR_RH" ? "Gestor RH" : "Colaboradora"}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!selectedUserId}
              className="w-full"
              size="lg"
            >
              Entrar
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Ambiente de demonstração com dados fictícios
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
