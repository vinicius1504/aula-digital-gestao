
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Aulas = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gestão de Aulas</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/aulas/gerenciar">
          <Button 
            variant="outline" 
            className="w-full h-40 flex flex-col items-center justify-center gap-4 text-lg hover-scale hover-glow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-8 w-8 transition-transform duration-300 group-hover:scale-110"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Gerenciar Aulas
          </Button>
        </Link>
        
        <Link to="/aulas/diario">
          <Button 
            variant="outline" 
            className="w-full h-40 flex flex-col items-center justify-center gap-4 text-lg hover-scale hover-glow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-8 w-8 transition-transform duration-300 group-hover:scale-110"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Diário de Bordo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Aulas;
