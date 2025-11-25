import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLeaderboard } from "@/hooks/useCTFQueries";
import { Trophy, Medal, Award, ArrowLeft, RefreshCw, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CTFLeaderboard = () => {
  const { data: leaderboard, isLoading, refetch, isRefetching } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      EASY: "bg-green-500/10 text-green-500 border-green-500/20",
      MEDIUM: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      HARD: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return colors[difficulty as keyof typeof colors] || "";
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Ranking CTF
          </h1>
          <p className="text-muted-foreground mt-1">
            Veja quem está dominando o desafio!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Link to="/ctf">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 3 em destaque */}
      {leaderboard && leaderboard.entries.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {leaderboard.entries.slice(0, 3).map((entry) => (
            <Card
              key={entry.rank}
              className={`${
                entry.rank === 1
                  ? "border-yellow-500/50 bg-yellow-500/5"
                  : entry.rank === 2
                  ? "border-gray-400/50 bg-gray-400/5"
                  : "border-amber-600/50 bg-amber-600/5"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                    {entry.rank}º Lugar
                  </CardTitle>
                  <Badge variant="outline" className="text-lg font-bold">
                    {entry.total_points}pts
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold truncate">{entry.name}</p>
                <p className="text-xs text-muted-foreground truncate">{entry.email}</p>
                <div className="flex gap-1 mt-2">
                  {entry.submissions.map((sub, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className={`text-xs ${getDifficultyBadge(sub.difficulty)}`}
                    >
                      {sub.difficulty.charAt(0)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tabela completa */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Completo</CardTitle>
          <CardDescription>
            {leaderboard
              ? `${leaderboard.total_participants} participante${
                  leaderboard.total_participants !== 1 ? "s" : ""
                }`
              : "Carregando..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : leaderboard && leaderboard.entries.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Flags</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.entries.map((entry) => (
                    <TableRow key={entry.rank}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-center flex-wrap">
                          {entry.submissions.map((sub, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className={`text-xs ${getDifficultyBadge(sub.difficulty)}`}
                              title={`${sub.difficulty} - ${sub.points}pts - ${format(
                                new Date(sub.submitted_at),
                                "dd/MM/yyyy HH:mm",
                                { locale: ptBR }
                              )}`}
                            >
                              {sub.difficulty.charAt(0)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        <Badge variant="outline">{entry.total_points}pts</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum participante ainda. Seja o primeiro!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legenda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Legenda de Dificuldades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getDifficultyBadge("EASY")}
              >
                E
              </Badge>
              <span className="text-sm text-muted-foreground">Fácil (10pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getDifficultyBadge("MEDIUM")}
              >
                M
              </Badge>
              <span className="text-sm text-muted-foreground">Média (20pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getDifficultyBadge("HARD")}
              >
                H
              </Badge>
              <span className="text-sm text-muted-foreground">Difícil (30pts)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTFLeaderboard;

