
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

interface Aluno {
  id: number;
  nome: string;
  presente: boolean;
}

const mockAlunos: Aluno[] = [
  { id: 1, nome: "Felix Bastian", presente: true },
  { id: 2, nome: "Vinícius Leite", presente: true },
  { id: 3, nome: "Ana Silva", presente: false },
  { id: 4, nome: "Pedro Santos", presente: true },
];

const Frequencia = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [turma, setTurma] = useState<string>("");
  const [materia, setMateria] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handlePresencaChange = (alunoId: number, presente: boolean) => {
    setAlunos(
      alunos.map((aluno) =>
        aluno.id === alunoId ? { ...aluno, presente } : aluno
      )
    );
  };

  const handleSalvar = () => {
    toast.success("Frequência registrada com sucesso!");
  };

  const totalAlunos = alunos.length;
  const alunosPresentes = alunos.filter((aluno) => aluno.presente).length;
  const percentualPresenca = totalAlunos > 0 
    ? Math.round((alunosPresentes / totalAlunos) * 100) 
    : 0;

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Controle de Frequência</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtrar Turma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Turma</label>
              <Select value={turma} onValueChange={setTurma}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3A">3º A</SelectItem>
                  <SelectItem value="3B">3º B</SelectItem>
                  <SelectItem value="3C">3º C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Matéria</label>
              <Select value={materia} onValueChange={setMateria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematica">Matemática</SelectItem>
                  <SelectItem value="portugues">Português</SelectItem>
                  <SelectItem value="ciencias">Ciências</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <input 
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-transparent"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-center">{totalAlunos}</div>
            <div className="text-muted-foreground text-center">Total de Alunos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-center text-green-600">{alunosPresentes}</div>
            <div className="text-muted-foreground text-center">Alunos Presentes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-center text-blue-600">{percentualPresenca}%</div>
            <div className="text-muted-foreground text-center">Taxa de Presença</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Chamada</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium">Nome</th>
                <th className="text-center py-3 font-medium">Presente</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-b">
                  <td className="py-4">{aluno.nome}</td>
                  <td className="py-4 text-center">
                    <Checkbox
                      checked={aluno.presente}
                      onCheckedChange={(checked) => 
                        handlePresencaChange(aluno.id, checked === true)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6">
            <Button onClick={handleSalvar}>Salvar Frequência</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Frequencia;
