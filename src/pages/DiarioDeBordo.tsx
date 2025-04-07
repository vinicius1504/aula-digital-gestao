
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
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import EditDiarioModal from "@/components/modal/EditDiarioModal";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConteudoId, setDeleteConteudoId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedConteudo, setSelectedConteudo] = useState<ConteudoRegistrado | null>(null);

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
    const conteudoToEdit = conteudos.find(c => c.id === id);
    if (conteudoToEdit) {
      setSelectedConteudo(conteudoToEdit);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConteudoId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (deleteConteudoId !== null) {
      setConteudos(conteudos.filter((c) => c.id !== deleteConteudoId));
      toast.success("Conteúdo removido com sucesso");
      setDeleteDialogOpen(false);
    }
  };
  
  const handleUpdateConteudo = (updatedConteudo: ConteudoRegistrado) => {
    setConteudos(conteudos.map(c => 
      c.id === updatedConteudo.id ? updatedConteudo : c
    ));
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
          {conteudos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className="text-left p-4 font-medium text-muted-foreground">
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {conteudos.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50">
                      {columns.map((column) => (
                        <td key={`${item.id}-${column.key}`} className="p-4">
                          {column.render 
                            ? column.render(item)
                            : column.key === 'data' 
                              ? new Date(item[column.key as keyof ConteudoRegistrado] as string).toLocaleDateString('pt-BR') 
                              : String(item[column.key as keyof ConteudoRegistrado])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum conteúdo registrado</p>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir conteúdo"
        description="Tem certeza que deseja excluir este conteúdo? Esta ação não pode ser desfeita."
      />
      
      {/* Edit Modal */}
      <EditDiarioModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        conteudo={selectedConteudo}
        onSave={handleUpdateConteudo}
      />
    </div>
  );
};

export default DiarioDeBordo;
