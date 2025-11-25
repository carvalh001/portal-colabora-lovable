import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCTFStats } from "@/hooks/useCTFQueries";
import { Trophy, Target, Users, Award } from "lucide-react";
import { CTFBadge } from "./CTFBadge";
import type { CTFDifficulty } from "@/types";

export function CTFStats() {
  const { data: stats, isLoading } = useCTFStats();

  if (isLoading || !stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Carregando estatísticas...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Estatísticas Gerais */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Participantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_participants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Competindo no desafio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Submissões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_submissions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Flags encontradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              Top Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.leaderboard_preview.length > 0 ? (
              <>
                <div className="text-lg font-bold truncate">
                  {stats.leaderboard_preview[0].name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">
                    {stats.leaderboard_preview[0].total_points}pts
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhum líder ainda
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progresso por Dificuldade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Slots Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.difficulties.map((diff) => {
            const percentage = (diff.used_slots / diff.total_slots) * 100;
            return (
              <div key={diff.difficulty} className="space-y-2">
                <div className="flex items-center justify-between">
                  <CTFBadge
                    difficulty={diff.difficulty as CTFDifficulty}
                    points={diff.points_per_flag}
                  />
                  <span className="text-sm font-medium">
                    {diff.available_slots}/{diff.total_slots} disponíveis
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

