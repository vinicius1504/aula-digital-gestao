
import React from "react";
import { BarChart, BookOpen, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  const stats = [
    {
      label: "Total de Alunos",
      value: 120,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      label: "Turmas",
      value: 8,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      label: "Aulas Programadas",
      value: 24,
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      label: "Eventos",
      value: 5,
      icon: <Calendar className="h-5 w-5 text-primary" />,
    },
  ];

  // Dados de exemplo para médias de alunos
  const mediaAlunos = [
    { id: 1, aluno: "Felix Bastian", media: 8.5, turma: "3ºB", status: "aprovado" },
    { id: 2, aluno: "Vinícius Leite", media: 7.2, turma: "3ºB", status: "aprovado" },
    { id: 3, aluno: "Maria Silva", media: 9.1, turma: "2ºA", status: "aprovado" },
    { id: 4, aluno: "João Souza", media: 5.8, turma: "3ºA", status: "reprovado" },
    { id: 5, aluno: "Ana Oliveira", media: 6.5, turma: "1ºB", status: "aprovado" },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden hover-scale">
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

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Médias por Aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead className="text-right">Média</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mediaAlunos.map((item) => (
                    <TableRow key={item.id} className="animate-fade-in">
                      <TableCell className="font-medium">{item.aluno}</TableCell>
                      <TableCell>{item.turma}</TableCell>
                      <TableCell className="text-right">{item.media.toFixed(1)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "aprovado" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {item.status === "aprovado" ? "Aprovado" : "Reprovado"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors">
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors">
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
  );
};

export default Dashboard;
