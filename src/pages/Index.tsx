
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-3xl w-full text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Sistema de Gestão Educacional</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Uma plataforma completa para gerenciar alunos, aulas, avaliações e muito mais.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="hover-scale transition-transform">
              Ir para Dashboard
            </Button>
          </Link>
          <Link to="/alunos">
            <Button variant="outline" size="lg" className="hover-scale transition-transform">
              Gerenciar Alunos
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <Card className="hover-scale hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alunos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              Total de alunos cadastrados
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/alunos" className="text-primary text-sm hover:underline">
              Gerenciar alunos →
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aulas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Programadas para este mês
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/aulas" className="text-primary text-sm hover:underline">
              Gerenciar aulas →
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avaliações
            </CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Avaliações agendadas
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/avaliacoes" className="text-primary text-sm hover:underline">
              Gerenciar avaliações →
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calendário
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Eventos próximos
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/calendario" className="text-primary text-sm hover:underline">
              Ver calendário →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
