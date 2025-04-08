
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import AlunoForm from "./AlunoForm";
import { AlunoFormValues } from "@/schemas/alunoSchema";

interface AddAlunoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: AlunoFormValues) => void;
}

const AddAlunoDialog: React.FC<AddAlunoDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const handleSubmit = (values: AlunoFormValues) => {
    onSave(values);
    toast.success("Aluno cadastrado com sucesso!");
    onOpenChange(false);
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
      </DialogHeader>
      <AlunoForm onSubmit={handleSubmit} />
    </DialogContent>
  );
};

export default AddAlunoDialog;
