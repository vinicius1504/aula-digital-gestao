
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Aluno {
  id: number;
  nome: string;
  notas: {
    bim1: number;
    bim2: number;
    bim3: number;
    bim4: number;
    nt: number;
  };
  usarNT: boolean;
  media: number;
  status: "aprovado" | "reprovado";
}

interface EditAvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno | null;
  onSave: (aluno: Aluno) => void;
}

const EditAvaliacaoModal = ({ isOpen, onClose, aluno, onSave }: EditAvaliacaoModalProps) => {
  const [notas, setNotas] = useState({
    bim1: 0,
    bim2: 0,
    bim3: 0,
    bim4: 0,
    nt: 0,
  });
  const [usarNT, setUsarNT] = useState(false);

  useEffect(() => {
    if (aluno) {
      setNotas(aluno.notas);
      setUsarNT(aluno.usarNT || false);
    }
  }, [aluno]);

  const calcularMedia = (): number => {
    const { bim1, bim2, bim3, bim4, nt } = notas;
    
    // Se usar NT, incluir na média; caso contrário, apenas média dos bimestres
    if (usarNT) {
      return ((bim1 + bim2 + bim3 + bim4) / 4 + nt) / 2;
    } else {
      return (bim1 + bim2 + bim3 + bim4) / 4;
    }
  };

  const handleNotaChange = (bimestre: keyof typeof notas, valor: string) => {
    // Limitar a valores entre 0 e 10
    const nota = Math.min(10, Math.max(0, parseFloat(valor) || 0));
    setNotas({ ...notas, [bimestre]: nota });
  };

  const handleSave = () => {
    if (!aluno) return;
    
    const media = calcularMedia();
    const updatedAluno: Aluno = {
      ...aluno,
      notas: { ...notas },
      usarNT,
      media: media,
      status: media >= 6 ? "aprovado" : "reprovado",
    };
    
    onSave(updatedAluno);
    toast.success("Notas atualizadas com sucesso!");
    onClose();
  };

  if (!aluno) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Editar Notas de {aluno.nome}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">1º Bimestre</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={notas.bim1}
                onChange={(e) => handleNotaChange('bim1', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">2º Bimestre</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={notas.bim2}
                onChange={(e) => handleNotaChange('bim2', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">3º Bimestre</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={notas.bim3}
                onChange={(e) => handleNotaChange('bim3', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">4º Bimestre</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={notas.bim4}
                onChange={(e) => handleNotaChange('bim4', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Nota Trabalho</label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={notas.nt}
                onChange={(e) => handleNotaChange('nt', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Média Calculada</label>
              <Input
                type="number"
                min="0"
                max="10"
                value={calcularMedia().toFixed(1)}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="usar-nt" 
              checked={usarNT} 
              onCheckedChange={(checked) => setUsarNT(!!checked)} 
            />
            <label
              htmlFor="usar-nt"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Incluir Nota Trabalho na média
            </label>
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

export default EditAvaliacaoModal;
