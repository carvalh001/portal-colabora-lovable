import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CTFDifficulty } from "@/types";

interface CTFBadgeProps {
  difficulty: CTFDifficulty;
  points?: number;
  className?: string;
}

export function CTFBadge({ difficulty, points, className }: CTFBadgeProps) {
  const config = {
    EASY: {
      color: "bg-green-500/10 text-green-500 border-green-500/20",
      emoji: "🟢",
      label: "Fácil",
    },
    MEDIUM: {
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      emoji: "🟡",
      label: "Média",
    },
    HARD: {
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      emoji: "🔴",
      label: "Difícil",
    },
  };

  const diff = config[difficulty];

  return (
    <Badge
      variant="outline"
      className={cn(diff.color, "font-semibold", className)}
    >
      {diff.emoji} {diff.label}
      {points !== undefined && ` • ${points}pts`}
    </Badge>
  );
}

