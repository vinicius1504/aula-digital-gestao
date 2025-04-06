
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Calendario = () => {
  // Eventos de exemplo
  const eventos = [
    { data: "2025-04-02", titulo: "Aula de Matemática - 3ºB", tipo: "aula" },
    { data: "2025-04-05", titulo: "Reunião de Professores", tipo: "reuniao" },
    { data: "2025-04-10", titulo: "Prova Bimestral", tipo: "avaliacao" },
    { data: "2025-04-15", titulo: "Conselho de Classe", tipo: "reuniao" },
  ];

  // Dados do mês atual (Abril 2025)
  const mesAtual = 3; // Abril (0-indexed)
  const anoAtual = 2025;
  const primeiroDia = new Date(anoAtual, mesAtual, 1);
  const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
  
  const diasNoMes = ultimoDia.getDate();
  const primeiroDiaSemana = primeiroDia.getDay();
  
  // Gerar dias do calendário
  const dias = [];
  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push({ dia: 0, eventos: [] });  // dias vazios
  }
  
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const eventosNoDia = eventos.filter(evento => evento.data === dataStr);
    dias.push({ dia, eventos: eventosNoDia });
  }
  
  // Função auxiliar para cor dos eventos
  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'aula': return 'bg-blue-100 text-blue-800';
      case 'avaliacao': return 'bg-red-100 text-red-800';
      case 'reuniao': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Agrupar eventos por categoria para a barra lateral
  const eventosRecentes = [...eventos].sort((a, b) => 
    new Date(a.data).getTime() - new Date(b.data).getTime()
  );

  const eventosPorTipo = {
    aula: eventos.filter(e => e.tipo === 'aula'),
    avaliacao: eventos.filter(e => e.tipo === 'avaliacao'),
    reuniao: eventos.filter(e => e.tipo === 'reuniao'),
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Calendário</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {MONTHS[mesAtual]} {anoAtual}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {/* Cabeçalho dos dias da semana */}
                {DAYS.map((dia, i) => (
                  <div key={i} className="py-2 text-center font-medium text-sm">
                    {dia}
                  </div>
                ))}
                
                {/* Dias do mês */}
                {dias.map((data, i) => (
                  <div key={i} className={`border rounded-md min-h-[100px] ${
                    data.dia === 0 ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}>
                    {data.dia > 0 && (
                      <>
                        <div className="p-2 text-right font-medium">
                          {data.dia}
                        </div>
                        <div className="px-1 space-y-1">
                          {data.eventos.map((evento, j) => (
                            <div 
                              key={j} 
                              className={`px-2 py-1 text-xs rounded truncate ${getEventColor(evento.tipo)}`}
                              title={evento.titulo}
                            >
                              {evento.titulo}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {eventosRecentes.map((evento, i) => (
                  <li key={i} className="border-b pb-2 last:border-0">
                    <p className="font-medium">{evento.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </p>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded mt-1 ${getEventColor(evento.tipo)}`}>
                      {evento.tipo === 'aula' ? 'Aula' : 
                       evento.tipo === 'avaliacao' ? 'Avaliação' : 'Reunião'}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {eventosPorTipo.aula.map((evento, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">{evento.titulo}</span>
                    <span className="block text-xs text-muted-foreground">
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {eventosPorTipo.avaliacao.map((evento, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">{evento.titulo}</span>
                    <span className="block text-xs text-muted-foreground">
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
