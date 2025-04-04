
import React from "react";
import { BarChart, BookOpen, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";

const Dashboard = () => {
  const stats = [
    {
      label: "Total de Alunos",
      value: 120,
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "Turmas",
      value: 8,
      icon: <Users className="h-5 w-5 text-green-600" />,
    },
    {
      label: "Aulas Programadas",
      value: 24,
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
    },
    {
      label: "Eventos",
      value: 5,
      icon: <Calendar className="h-5 w-5 text-orange-600" />,
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Aula de Matemática realizada</p>
                    <p className="text-sm text-muted-foreground">Turma 3°B - hoje</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-md">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Reunião de Pais</p>
                    <p className="text-sm text-muted-foreground">06 de Abril, 15:00</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
