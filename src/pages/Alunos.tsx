
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Edit, Trash, Search, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Aluno {
  id: number;
  nome: string;
  status: "ativo" | "inativo";
  turma: string;
  observacoes: string;
}

const mockAlunos: Aluno[] = [
  { id: 1, nome: "Felix Bastian", status: "ativo", turma: "3ºB", observacoes: "teste" },
  { id: 2, nome: "Vinícius Leite", status: "ativo", turma: "3ºB", observacoes: "teste" },
];

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAlunos = alunos.length;
  const alunosAtivos = alunos.filter((a) => a.status === "ativo").length;
  const alunosInativos = alunos.filter((a) => a.status === "inativo").length;
  const alunosPendentes = 0;

  const handleEdit = (id: number) => {
    toast.info(`Editar aluno #${id}`);
  };

  const handleDelete = (id: number) => {
    toast.success(`Aluno #${id} removido com sucesso`);
    setAlunos(alunos.filter((a) => a.id !== id));
  };

  const columns = [
    { key: "nome", header: "Nome" },
    { 
      key: "status", 
      header: "Status",
      render: (aluno: Aluno) => <StatusBadge status={aluno.status} />
    },
    { key: "turma", header: "Turma" },
    { key: "observacoes", header: "Observações" },
    { 
      key: "acoes", 
      header: "Ações",
      render: (aluno: Aluno) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(aluno.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(aluno.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gerenciamento de Alunos</h1>
      
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard value={totalAlunos} label="TOTAL DE ALUNOS" />
        <StatCard value={alunosAtivos} label="ATIVOS" />
        <StatCard value={alunosInativos} label="INATIVOS" />
        <StatCard value={alunosPendentes} label="PENDENTES" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-[300px]"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Aluno
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filteredAlunos}
          keyExtractor={(aluno) => aluno.id}
        />
      </Card>
    </div>
  );
};

export default Alunos;
