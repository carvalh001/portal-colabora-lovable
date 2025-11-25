import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mockUsers } from "@/mock/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Users as UsersIcon } from "lucide-react";
import type { UserStatus } from "@/types";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const employees = mockUsers.filter((u) => u.papel === "COLABORADOR");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || employee.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  const maskCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, "$1.***.***-$4");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Colaboradores
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Visualize as informações básicas dos colaboradores da empresa
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
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as situações</SelectItem>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            Lista de Colaboradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-semibold text-foreground">
                    Nome
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-foreground">
                    E-mail
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-foreground">
                    CPF
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-foreground">
                    Situação
                  </th>
                  <th className="pb-3 text-right text-sm font-semibold text-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-border transition-colors hover:bg-accent/50"
                  >
                    <td className="py-3 text-sm text-foreground">
                      {employee.nome}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {employee.email}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {maskCPF(employee.cpf)}
                    </td>
                    <td className="py-3">
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
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                      >
                        <Link to={`/admin/colaboradores/${employee.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredEmployees.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                Nenhum colaborador encontrado com os filtros aplicados
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
