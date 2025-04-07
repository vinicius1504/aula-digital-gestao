
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export interface CalendarEvent {
  id: number;
  data: string;
  titulo: string;
  tipo: "aula" | "avaliacao" | "reuniao";
}

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onSave: (event: CalendarEvent) => void;
  isEditing: boolean;
}

const CalendarEventModal = ({ isOpen, onClose, event, onSave, isEditing }: CalendarEventModalProps) => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<"aula" | "avaliacao" | "reuniao">("aula");
  const [data, setData] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (event) {
      setTitulo(event.titulo);
      setTipo(event.tipo);
      setData(new Date(event.data));
    } else {
      setTitulo("");
      setTipo("aula");
      setData(undefined);
    }
  }, [event]);

  const handleSave = () => {
    if (!titulo || !data) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const formattedDate = format(data, "yyyy-MM-dd");
    
    const savedEvent: CalendarEvent = {
      id: event?.id || Date.now(),
      titulo,
      tipo,
      data: formattedDate,
    };
    
    onSave(savedEvent);
    toast.success(isEditing ? "Evento atualizado com sucesso" : "Evento adicionado com sucesso");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Evento" : "Adicionar Evento"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do evento"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo</label>
            <Select value={tipo} onValueChange={(value: "aula" | "avaliacao" | "reuniao") => setTipo(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aula">Aula</SelectItem>
                <SelectItem value="avaliacao">Avaliação</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data ? format(data, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data}
                  onSelect={setData}
                  disabled={(date) => date < new Date("2025-01-01")}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventModal;
