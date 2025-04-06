
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface Aluno {
  id: number;
  nome: string;
  status: "ativo" | "inativo";
  turma: string;
  observacoes: string;
}

interface EditAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno | null;
  onSave: (aluno: Aluno) => void;
}

const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["ativo", "inativo"]),
  turma: z.string().min(1, "Turma é obrigatória"),
  observacoes: z.string().optional(),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

const EditAlunoModal = ({ isOpen, onClose, aluno, onSave }: EditAlunoModalProps) => {
  const form = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: aluno?.nome || "",
      status: aluno?.status || "ativo",
      turma: aluno?.turma || "",
      observacoes: aluno?.observacoes || "",
    },
  });

  React.useEffect(() => {
    if (aluno) {
      form.reset({
        nome: aluno.nome,
        status: aluno.status,
        turma: aluno.turma,
        observacoes: aluno.observacoes,
      });
    }
  }, [aluno, form]);

  const onSubmit = (values: AlunoFormValues) => {
    if (!aluno) return;
    
    onSave({
      ...aluno,
      ...values,
    });
    
    toast.success("Aluno atualizado com sucesso!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do aluno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="turma"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 3ºB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Observações sobre o aluno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlunoModal;
