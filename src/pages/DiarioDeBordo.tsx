
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
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/ui/data-table";
import { Edit, Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ConteudoRegistrado {
  id: number;
  turma: string;
  materia: string;
  conteudo: string;
  data: string;
}

const mockConteudos: ConteudoRegistrado[] = [];

const DiarioDeBordo = () => {
  const [conteudos, setConteudos] = useState<ConteudoRegistrado[]>(mockConteudos);
  const [turma, setTurma] = useState<string>("");
  const [materia, setMateria] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");

  const handleRegistrar = () => {
    if (!turma || !materia || !data || !conteudo) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const novoConteudo: ConteudoRegistrado = {
      id: conteudos.length + 1,
      turma,
      materia,
      conteudo,
      data,
    };

    setConteudos([...conteudos, novoConteudo]);
    toast.success("Conteúdo registrado com sucesso");
    
    // Limpar campos
    setConteudo("");
  };

  const handleEdit = (id: number) => {
    toast.info(`Editar conteúdo #${id}`);
  };

  const handleDelete = (id: number) => {
    setConteudos(conteudos.filter((c) => c.id !== id));
    toast.success("Conteúdo removido com sucesso");
  };

  const columns = [
    { key: "turma", header: "TURMA" },
    { key: "materia", header: "MATÉRIA" },
    { key: "conteudo", header: "CONTEÚDO" },
    { key: "data", header: "DATA" },
    { 
      key: "acao", 
      header: "AÇÃO",
      render: (conteudo: ConteudoRegistrado) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(conteudo.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(conteudo.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Diário de Bordo</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Registrar Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Turma
              </label>
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
              <label className="text-sm font-medium">
                Matéria
              </label>
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
              <label className="text-sm font-medium">
                Data
              </label>
              <Select value={data} onValueChange={setData}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-04-01">01/04/2025</SelectItem>
                  <SelectItem value="2025-04-02">02/04/2025</SelectItem>
                  <SelectItem value="2025-04-03">03/04/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium">
              Conteúdo
            </label>
            <Textarea 
              placeholder="Descreva o conteúdo ministrado nesta aula..." 
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              rows={5}
            />
          </div>

          <Button onClick={handleRegistrar}>Registrar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={conteudos}
            keyExtractor={(conteudo) => conteudo.id}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DiarioDeBordo;
