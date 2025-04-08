
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

interface AlunosToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AlunosToolbar: React.FC<AlunosToolbarProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar alunos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-[300px]"
        />
      </div>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 hover-scale transition-all duration-300">
          <Plus className="h-4 w-4" />
          Adicionar Aluno
        </Button>
      </DialogTrigger>
    </div>
  );
};

export default AlunosToolbar;
