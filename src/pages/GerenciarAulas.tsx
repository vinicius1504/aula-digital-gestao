
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { Edit, Trash, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Aula {
  id: number;
  turma: string;
  materia: string;
  periodo: string;
  datas: string[];
}

const mockAulas: Aula[] = [
  {
    id: 1,
    turma: "teste",
    materia: "tes",
    periodo: "Manhã",
    datas: ["01-04-2025", "02-04-2025", "03-04-2025"],
  },
];

const GerenciarAulas = () => {
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  
  const handleEdit = (id: number) => {
    toast.info(`Editar aula #${id}`);
  };

  const handleDelete = (id: number) => {
    setAulas(aulas.filter((a) => a.id !== id));
    toast.success("Aula removida com sucesso!");
  };

  const columns = [
    { key: "turma", header: "TURMA" },
    { key: "materia", header: "MATÉRIA" },
    { key: "periodo", header: "PERÍODO" },
    { 
      key: "datas", 
      header: "DATAS",
      render: (aula: Aula) => (
        <div className="flex flex-wrap gap-1">
          {aula.datas.map((data, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {data}
            </span>
          ))}
        </div>
      )
    },
    { 
      key: "acoes", 
      header: "AÇÕES",
      render: (aula: Aula) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(aula.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(aula.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title mb-0">Gerenciamento de Aulas</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Cadastrar Matéria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aulas Cadastradas</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="space-y-2 w-40">
              <label className="text-sm font-medium">
                Turma:
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="3A">3º A</SelectItem>
                  <SelectItem value="3B">3º B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 w-40">
              <label className="text-sm font-medium">
                Data:
              </label>
              <Input type="date" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={aulas}
            keyExtractor={(aula) => aula.id}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GerenciarAulas;
