
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
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/shared/StatusBadge";
import { toast } from "@/components/ui/sonner";

interface Aluno {
  id: number;
  nome: string;
  notas: {
    bim1: number;
    bim2: number;
    bim3: number;
    bim4: number;
    nt: number;
  };
  media: number;
  status: "aprovado" | "reprovado";
}

const mockAlunos: Aluno[] = [
  {
    id: 1,
    nome: "Felix Bastian",
    notas: { bim1: 0, bim2: 0, bim3: 0, bim4: 0, nt: 0 },
    media: 0,
    status: "reprovado",
  },
  {
    id: 2,
    nome: "Vinícius Leite",
    notas: { bim1: 0, bim2: 0, bim3: 0, bim4: 0, nt: 0 },
    media: 0,
    status: "reprovado",
  },
];

const Avaliacoes = () => {
  const [turma, setTurma] = useState<string>("3B");
  const [materia, setMateria] = useState<string>("matematica");
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);

  const calcularMedia = (aluno: Aluno): number => {
    const { bim1, bim2, bim3, bim4, nt } = aluno.notas;
    // Assumindo uma média simples para demonstração
    return ((bim1 + bim2 + bim3 + bim4) / 4 + nt) / 2;
  };

  const handleNotaChange = (alunoId: number, bimestre: string, valor: string) => {
    // Limitar a valores entre 0 e 10
    const nota = Math.min(10, Math.max(0, parseFloat(valor) || 0));
    
    const novosAlunos = alunos.map((aluno) => {
      if (aluno.id === alunoId) {
        const novasNotas = { ...aluno.notas, [bimestre]: nota };
        const novaMedia = calcularMedia({ ...aluno, notas: novasNotas });
        
        return {
          ...aluno,
          notas: novasNotas,
          media: novaMedia,
          status: novaMedia >= 6 ? "aprovado" : "reprovado",
        };
      }
      return aluno;
    });

    setAlunos(novosAlunos);
  };

  const handleSalvar = (alunoId: number) => {
    toast.success("Notas salvas com sucesso!");
  };

  const handleSalvarTodos = () => {
    toast.success("Todas as notas foram salvas com sucesso!");
  };

  const handleExportar = () => {
    toast.success("Relatório exportado com sucesso!");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title mb-0">Avaliações</h1>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleExportar}>
          Exportar
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtrar Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Turma</label>
              <Select value={turma} onValueChange={setTurma}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma turma" />
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
                  <SelectValue placeholder="Selecione uma matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematica">Matemática</SelectItem>
                  <SelectItem value="portugues">Português</SelectItem>
                  <SelectItem value="ciencias">Ciências</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">NOME</th>
                <th className="text-center p-4 font-medium text-muted-foreground">1º BIM.</th>
                <th className="text-center p-4 font-medium text-muted-foreground">2º BIM.</th>
                <th className="text-center p-4 font-medium text-muted-foreground">3º BIM.</th>
                <th className="text-center p-4 font-medium text-muted-foreground">4º BIM.</th>
                <th className="text-center p-4 font-medium text-muted-foreground">NT</th>
                <th className="text-center p-4 font-medium text-muted-foreground">MÉDIA</th>
                <th className="text-center p-4 font-medium text-muted-foreground">STATUS</th>
                <th className="text-center p-4 font-medium text-muted-foreground">SALVAR</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-muted/50">
                  <td className="p-4">{aluno.nome}</td>
                  {["bim1", "bim2", "bim3", "bim4", "nt"].map((bimestre) => (
                    <td key={bimestre} className="p-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        className="w-16 h-8 text-center mx-auto"
                        value={(aluno.notas as any)[bimestre]}
                        onChange={(e) => handleNotaChange(aluno.id, bimestre, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="p-4 text-center font-bold">{aluno.media.toFixed(1)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      aluno.status === "aprovado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {aluno.status === "aprovado" ? "Aprovado" : "Reprovado"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => handleSalvar(aluno.id)}
                    >
                      Salvar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <div className="p-4 border-t">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSalvarTodos}
          >
            Salvar Todos
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Avaliacoes;
