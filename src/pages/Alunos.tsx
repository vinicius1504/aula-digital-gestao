
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Edit, Trash, Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Aluno {
  id: number;
  nome: string;
  status: "ativo" | "inativo";
  turma: string;
  observacoes: string;
}

const mockAlunos: Aluno[] = [
  { id: 1, nome: "Felix Bastian", status: "ativo", turma: "3ºB", observacoes: "teste" },
  { id: 2, nome: "Vinícius Leite", status: "ativo", turma: "3ºB", observacoes: "teste" },
];

const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["ativo", "inativo"]),
  turma: z.string().min(1, "Turma é obrigatória"),
  observacoes: z.string().optional(),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: "",
      status: "ativo",
      turma: "",
      observacoes: "",
    },
  });

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAlunos = alunos.length;
  const alunosAtivos = alunos.filter((a) => a.status === "ativo").length;
  const alunosInativos = alunos.filter((a) => a.status === "inativo").length;
  const alunosPendentes = 0;

  const handleEdit = (id: number) => {
    toast.info(`Editar aluno #${id}`);
  };

  const handleDelete = (id: number) => {
    toast.success(`Aluno #${id} removido com sucesso`);
    setAlunos(alunos.filter((a) => a.id !== id));
  };

  const onSubmit = (values: AlunoFormValues) => {
    const newAluno: Aluno = {
      id: alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
      nome: values.nome,
      status: values.status,
      turma: values.turma,
      observacoes: values.observacoes || "",
    };
    
    setAlunos([...alunos, newAluno]);
    toast.success("Aluno cadastrado com sucesso!");
    form.reset();
    setOpen(false);
  };

  const columns = [
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
          <Button variant="ghost" size="icon" onClick={() => handleEdit(aluno.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(aluno.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gerenciamento de Alunos</h1>
      
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard value={totalAlunos} label="TOTAL DE ALUNOS" />
        <StatCard value={alunosAtivos} label="ATIVOS" />
        <StatCard value={alunosInativos} label="INATIVOS" />
        <StatCard value={alunosPendentes} label="PENDENTES" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-[300px]"
          />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Aluno
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
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
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filteredAlunos}
          keyExtractor={(aluno) => aluno.id}
        />
      </Card>
    </div>
  );
};

export default Alunos;
