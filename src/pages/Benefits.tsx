import { useState, useMemo } from "react";
import { useBenefits } from "@/hooks/useBenefitQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Gift, AlertCircle, Loader2 } from "lucide-react";
import type { BenefitCategory } from "@/types";

const Benefits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: benefits, isLoading, error } = useBenefits();

  const filteredBenefits = useMemo(() => {
    if (!benefits) return [];
    
    return benefits.filter((benefit) => {
      const matchesSearch = benefit.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || benefit.categoria === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [benefits, searchTerm, categoryFilter]);

  const getCategoryLabel = (category: BenefitCategory) => {
    const labels = {
      ALIMENTACAO: "Alimentação",
      SAUDE: "Saúde",
      OUTROS: "Outros",
    };
    return labels[category];
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Meus Benefícios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Visualize todos os seus benefícios ativos e informações detalhadas
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
            <p className="text-center text-muted-foreground">
              Erro ao carregar benefícios. Tente novamente.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Meus Benefícios
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Visualize todos os seus benefícios ativos e informações detalhadas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar benefício..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                disabled={isLoading}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={isLoading}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="ALIMENTACAO">Alimentação</SelectItem>
                <SelectItem value="SAUDE">Saúde</SelectItem>
                <SelectItem value="OUTROS">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBenefits.map((benefit) => (
          <Card key={benefit.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between">
                <Gift className="h-5 w-5 text-primary" />
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
              <CardTitle className="text-lg">{benefit.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Categoria
                </p>
                <p className="text-sm text-foreground">
                  {getCategoryLabel(benefit.categoria)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Valor
                </p>
                <p className="text-sm font-semibold text-primary">
                  {benefit.valor}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Descrição
                </p>
                <p className="text-sm text-foreground">{benefit.descricao}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredBenefits.length === 0 && !isLoading && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Gift className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Nenhum benefício encontrado com os filtros aplicados
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      )}
    </div>
  );
};

export default Benefits;
