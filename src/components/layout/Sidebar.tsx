
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart, BookOpen, Calendar, HelpCircle, Settings, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mainNavItems = [
    { title: "Dashboard", icon: <BarChart className="w-5 h-5" />, href: "/" },
    { title: "Calendário", icon: <Calendar className="w-5 h-5" />, href: "/calendario" },
  ];

  const academicNavItems = [
    { title: "Aulas", icon: <BookOpen className="w-5 h-5" />, href: "/aulas" },
    { title: "Alunos", icon: <Users className="w-5 h-5" />, href: "/alunos" },
    { title: "Avaliações", icon: <BarChart className="w-5 h-5" />, href: "/avaliacoes" },
    { title: "Frequência", icon: <Calendar className="w-5 h-5" />, href: "/frequencia" },
  ];

  const configNavItems = [
    { title: "Perfil", icon: <User className="w-5 h-5" />, href: "/perfil" },
    { title: "Configurações", icon: <Settings className="w-5 h-5" />, href: "/configuracoes" },
    { title: "Ajuda", icon: <HelpCircle className="w-5 h-5" />, href: "/ajuda" },
  ];

  const NavSection = ({ title, items }: { title: string; items: any[] }) => (
    <div className="px-3 py-2">
      <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-4 mb-2">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center text-sidebar-foreground px-4 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href))
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-sidebar fixed w-64">
      <div className="flex flex-col items-center py-8">
        <Avatar className="h-16 w-16 bg-sidebar-accent">
          <div className="text-2xl font-bold text-sidebar-foreground">MS</div>
        </Avatar>
        <h2 className="mt-4 text-xl font-semibold text-sidebar-foreground">Maria Silva</h2>
        <p className="text-sidebar-foreground/70">Professora</p>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <NavSection title="" items={mainNavItems} />
        <NavSection title="Gestão Acadêmica" items={academicNavItems} />
        <NavSection title="Configurações" items={configNavItems} />
      </div>
      <div className="p-4 text-xs text-sidebar-foreground/70 border-t border-sidebar-border">
        Sistema de Gestão Escolar v1.0.2
      </div>
    </div>
  );
};

export default Sidebar;
