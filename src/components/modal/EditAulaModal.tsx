
import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface Aula {
  id: number;
  turma: string;
  materia: string;
  periodo: string;
  datas: string[];
}

interface EditAulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  aula: Aula | null;
  onSave: (aula: Aula) => void;
}

const aulaSchema = z.object({
  turma: z.string().min(1, "Turma é obrigatória"),
  materia: z.string().min(1, "Matéria é obrigatória"),
  periodo: z.string().min(1, "Período é obrigatório"),
  datas: z.date().array().min(1, "Pelo menos uma data é obrigatória"),
});

type AulaFormValues = z.infer<typeof aulaSchema>;

const EditAulaModal = ({ isOpen, onClose, aula, onSave }: EditAulaModalProps) => {
  const form = useForm<AulaFormValues>({
    resolver: zodResolver(aulaSchema),
    defaultValues: {
      turma: aula?.turma || "",
      materia: aula?.materia || "",
      periodo: aula?.periodo || "",
      datas: [],
    },
  });

  React.useEffect(() => {
    if (aula) {
      // Convert string dates to Date objects
      const dateObjects = aula.datas.map(dateStr => 
        parse(dateStr, "dd-MM-yyyy", new Date())
      );
      
      form.reset({
        turma: aula.turma,
        materia: aula.materia,
        periodo: aula.periodo,
        datas: dateObjects,
      });
    }
  }, [aula, form]);

  const onSubmit = (values: AulaFormValues) => {
    if (!aula) return;
    
    onSave({
      ...aula,
      turma: values.turma,
      materia: values.materia,
      periodo: values.periodo,
      datas: values.datas.map(date => format(date, "dd-MM-yyyy")),
    });
    
    toast.success("Aula atualizada com sucesso!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Aula</DialogTitle>
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
  );
};

export default EditAulaModal;
