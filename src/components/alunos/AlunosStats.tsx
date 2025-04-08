
import React from "react";
import StatCard from "@/components/shared/StatCard";
import { Aluno } from "@/schemas/alunoSchema";

interface AlunosStatsProps {
  alunos: Aluno[];
}

const AlunosStats: React.FC<AlunosStatsProps> = ({ alunos }) => {
  const totalAlunos = alunos.length;
  const alunosAtivos = alunos.filter((a) => a.status === "ativo").length;
  const alunosInativos = alunos.filter((a) => a.status === "inativo").length;
  const alunosPendentes = 0;

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-8">
      <StatCard value={totalAlunos} label="TOTAL DE ALUNOS" />
      <StatCard value={alunosAtivos} label="ATIVOS" />
      <StatCard value={alunosInativos} label="INATIVOS" />
      <StatCard value={alunosPendentes} label="PENDENTES" />
    </div>
  );
};

export default AlunosStats;
