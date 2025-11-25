import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(usernameOrEmail, senha);
      if (success) {
        toast({
          title: "Login realizado",
          description: "Bem-vindo(a) ao Portal!",
        });
        navigate("/home");
      } else {
        toast({
          title: "Erro ao entrar",
          description: "Usuário ou senha inválidos.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao entrar",
        description: error.message || "Erro ao conectar com o servidor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              <strong>Ambiente de demonstração</strong> - Use suas credenciais ou login rápido com dados fictícios.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Usuário ou E-mail
              </label>
              <Input
                type="text"
                placeholder="Digite seu usuário ou e-mail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Usuários de teste
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-2">Credenciais para teste:</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><strong>Maria (Colaborador):</strong> maria / 123456</p>
              <p><strong>João (Gestor RH):</strong> joao / 123456</p>
              <p><strong>Ana (Admin):</strong> admin / admin123</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não tem cadastro?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Criar conta
              </Link>
            </p>
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
