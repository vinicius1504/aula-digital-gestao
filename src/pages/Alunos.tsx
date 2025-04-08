
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import EditAlunoModal from "@/components/modal/EditAlunoModal";
import AlunosStats from "@/components/alunos/AlunosStats";
import AlunosToolbar from "@/components/alunos/AlunosToolbar";
import AddAlunoDialog from "@/components/alunos/AddAlunoDialog";
import getAlunosTableColumns from "@/components/alunos/alunosTableColumns";
import { mockAlunos, Aluno, AlunoFormValues } from "@/schemas/alunoSchema";

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [deleteAlunoId, setDeleteAlunoId] = useState<number | null>(null);

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteAlunoId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (deleteAlunoId !== null) {
      setAlunos(alunos.filter((a) => a.id !== deleteAlunoId));
      toast.success(`Aluno removido com sucesso`);
      setDeleteAlunoId(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleUpdateAluno = (updatedAluno: Aluno) => {
    setAlunos(alunos.map(aluno => 
      aluno.id === updatedAluno.id ? updatedAluno : aluno
    ));
  };

  const handleAddAluno = (values: AlunoFormValues) => {
    const newAluno: Aluno = {
      id: alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
      nome: values.nome,
      status: values.status,
      turma: values.turma,
      observacoes: values.observacoes || "",
    };
    
    setAlunos([...alunos, newAluno]);
  };

  const columns = getAlunosTableColumns(handleEdit, handleDelete);

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gerenciamento de Alunos</h1>
      
      <AlunosStats alunos={alunos} />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <AlunosToolbar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <AddAlunoDialog
          open={open}
          onOpenChange={setOpen}
          onSave={handleAddAluno}
        />
      </Dialog>

      <Card className="transition-all duration-300 hover:shadow-md">
        <DataTable
          columns={columns}
          data={filteredAlunos}
          keyExtractor={(aluno) => aluno.id}
        />
      </Card>
      
      {/* Edit Modal */}
      <EditAlunoModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aluno={selectedAluno}
        onSave={handleUpdateAluno}
      />
      
      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir aluno"
        description="Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default Alunos;
