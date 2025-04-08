
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Aluno } from "@/schemas/alunoSchema";

export const getAlunosTableColumns = (
  handleEdit: (aluno: Aluno) => void,
  handleDelete: (id: number) => void
) => [
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
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleEdit(aluno)}
          className="hover-scale transition-all duration-200"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleDelete(aluno.id)}
          className="hover-scale transition-all duration-200"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )
  }
];

export default getAlunosTableColumns;
