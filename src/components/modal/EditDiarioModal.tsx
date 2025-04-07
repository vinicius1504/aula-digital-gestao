
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ConteudoRegistrado {
  id: number;
  turma: string;
  materia: string;
  conteudo: string;
  data: string;
}

interface EditDiarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  conteudo: ConteudoRegistrado | null;
  onSave: (conteudo: ConteudoRegistrado) => void;
}

const EditDiarioModal = ({ isOpen, onClose, conteudo, onSave }: EditDiarioModalProps) => {
  const [formData, setFormData] = useState<{
    turma: string;
    materia: string;
    conteudo: string;
    data: string;
  }>({
    turma: "",
    materia: "",
    conteudo: "",
    data: "",
  });

  useEffect(() => {
    if (conteudo) {
      setFormData({
        turma: conteudo.turma,
        materia: conteudo.materia,
        conteudo: conteudo.conteudo,
        data: conteudo.data,
      });
    }
  }, [conteudo]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!conteudo) return;
    
    if (!formData.turma || !formData.materia || !formData.data || !formData.conteudo) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    const updatedConteudo: ConteudoRegistrado = {
      ...conteudo,
      ...formData,
    };
    
    onSave(updatedConteudo);
    toast.success("Conteúdo atualizado com sucesso");
    onClose();
  };

  if (!conteudo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Registro de Conteúdo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Turma</label>
              <Select value={formData.turma} onValueChange={(value) => handleChange('turma', value)}>
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
              <label className="text-sm font-medium">Matéria</label>
              <Select value={formData.materia} onValueChange={(value) => handleChange('materia', value)}>
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
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Select value={formData.data} onValueChange={(value) => handleChange('data', value)}>
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Conteúdo</label>
            <Textarea 
              placeholder="Descreva o conteúdo ministrado nesta aula..." 
              value={formData.conteudo}
              onChange={(e) => handleChange('conteudo', e.target.value)}
              rows={5}
            />
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

export default EditDiarioModal;
