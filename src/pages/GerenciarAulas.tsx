
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Trash, Plus, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const aulaSchema = z.object({
  turma: z.string().min(1, "Turma é obrigatória"),
  materia: z.string().min(1, "Matéria é obrigatória"),
  periodo: z.string().min(1, "Período é obrigatório"),
  datas: z.date().array().min(1, "Pelo menos uma data é obrigatória"),
});

type AulaFormValues = z.infer<typeof aulaSchema>;

const GerenciarAulas = () => {
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [open, setOpen] = useState(false);
  
  const form = useForm<AulaFormValues>({
    resolver: zodResolver(aulaSchema),
    defaultValues: {
      turma: "",
      materia: "",
      periodo: "",
      datas: [],
    },
  });
  
  const handleEdit = (id: number) => {
    toast.info(`Editar aula #${id}`);
  };

  const handleDelete = (id: number) => {
    setAulas(aulas.filter((a) => a.id !== id));
    toast.success("Aula removida com sucesso!");
  };
  
  const onSubmit = (values: AulaFormValues) => {
    const newAula: Aula = {
      id: aulas.length > 0 ? Math.max(...aulas.map(a => a.id)) + 1 : 1,
      turma: values.turma,
      materia: values.materia,
      periodo: values.periodo,
      datas: values.datas.map(date => format(date, "dd-MM-yyyy")),
    };
    
    setAulas([...aulas, newAula]);
    toast.success("Aula cadastrada com sucesso!");
    form.reset();
    setSelectedDates([]);
    setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Cadastrar Matéria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Aula</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="turma"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Turma</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3º A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="materia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matéria</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Matemática" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="periodo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Período</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um período" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manhã">Manhã</SelectItem>
                          <SelectItem value="Tarde">Tarde</SelectItem>
                          <SelectItem value="Noite">Noite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="datas"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Datas</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value.length && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value.length > 0
                                ? `${field.value.length} data(s) selecionada(s)`
                                : "Selecione as datas"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="multiple"
                              selected={field.value}
                              onSelect={field.onChange}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
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
        <CardHeader>
          <CardTitle>Aulas Cadastradas</CardTitle>
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
