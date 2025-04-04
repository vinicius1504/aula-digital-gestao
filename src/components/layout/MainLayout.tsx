
import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Você saiu do sistema com sucesso");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">Sistema de Gestão Escolar</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full" 
                  />
                ) : (
                  <User className="w-8 h-8 p-1 rounded-full bg-muted" />
                )}
                <div className="text-sm">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role === "admin" ? "Administrador" : user?.role === "teacher" ? "Professor" : "Funcionário"}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sair">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
