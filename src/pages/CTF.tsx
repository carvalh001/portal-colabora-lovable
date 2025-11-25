import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubmitFlag, useCTFStats } from "@/hooks/useCTFQueries";
import { Flag, Trophy, Target, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const submitSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(200),
  email: z.string().email("Email inválido"),
  flag: z.string().min(5, "Flag deve ter pelo menos 5 caracteres").max(100),
});

type SubmitFormData = z.infer<typeof submitSchema>;

const CTF = () => {
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const submitMutation = useSubmitFlag();
  const { data: stats } = useCTFStats();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitFormData>({
    resolver: zodResolver(submitSchema),
  });

  const onSubmit = async (data: SubmitFormData) => {
    const response = await submitMutation.mutateAsync(data);
    setLastResponse(response);
    if (response.success) {
      setShowConfetti(true);
      reset({ name: data.name, email: data.email, flag: "" });
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "HARD":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Flag className="h-8 w-8 text-primary" />
            CTF Challenge
          </h1>
          <p className="text-muted-foreground mt-1">
            Capture The Flag - Encontre as flags escondidas e ganhe pontos!
          </p>
        </div>
        <Link to="/ctf/leaderboard">
          <Button variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            Ver Ranking
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          {stats.difficulties.map((diff) => (
            <Card key={diff.difficulty}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {diff.difficulty}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pontos:</span>
                    <Badge variant="outline">{diff.points_per_flag}pts</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Disponíveis:</span>
                    <span className="font-medium">
                      {diff.available_slots}/{diff.total_slots}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(diff.used_slots / diff.total_slots) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submeter Flag</TabsTrigger>
          <TabsTrigger value="info">Regras & Dicas</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Submeter sua Flag
              </CardTitle>
              <CardDescription>
                Encontrou uma flag? Digite suas informações e a flag para validar!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    {...register("name")}
                    disabled={submitMutation.isPending}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    {...register("email")}
                    disabled={submitMutation.isPending}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flag">Flag</Label>
                  <Input
                    id="flag"
                    placeholder="FLAG{...}"
                    {...register("flag")}
                    disabled={submitMutation.isPending}
                    className="font-mono"
                  />
                  {errors.flag && (
                    <p className="text-sm text-destructive">{errors.flag.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Formato esperado: FLAG{"{conteudo}"}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Validando..." : "Submeter Flag"}
                </Button>
              </form>

              {lastResponse && (
                <Alert
                  className={`mt-4 ${
                    lastResponse.success
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-red-500/50 bg-red-500/10"
                  }`}
                >
                  <AlertDescription className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{lastResponse.message}</p>
                      {lastResponse.success && lastResponse.difficulty && (
                        <div className="mt-2 flex items-center gap-2">
                          <Badge className={getDifficultyColor(lastResponse.difficulty)}>
                            {lastResponse.difficulty}
                          </Badge>
                          <Badge variant="outline">+{lastResponse.points} pontos</Badge>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Regras do Desafio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Como Funciona?</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Explore a plataforma e encontre flags escondidas</li>
                  <li>Flags seguem o formato: FLAG{"{conteudo}"}</li>
                  <li>Cada usuário pode submeter UMA flag por dificuldade</li>
                  <li>Há um número limitado de slots por dificuldade</li>
                  <li>Primeiro a submeter, primeiro a pontuar!</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pontuação</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>🟢 Flag Fácil: 10 pontos (10 slots disponíveis)</li>
                  <li>🟡 Flag Média: 20 pontos (5 slots disponíveis)</li>
                  <li>🔴 Flag Difícil: 30 pontos (3 slots disponíveis)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dicas Iniciais</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>🔍 Inspecione elementos da página (F12 ou botão direito)</li>
                  <li>📱 Verifique o console do navegador</li>
                  <li>🌐 Explore endpoints da API</li>
                  <li>🔐 Algumas flags podem estar codificadas</li>
                  <li>🎨 Nem tudo que está na tela é visível...</li>
                </ul>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Dica:</strong> As flags estão espalhadas em diferentes lugares:
                  interface, código-fonte, APIs e mais. Use suas habilidades de investigação!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default CTF;

