
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import CalendarEventModal, { CalendarEvent } from "@/components/modal/CalendarEventModal";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Calendario = () => {
  // Eventos iniciais
  const [eventos, setEventos] = useState<CalendarEvent[]>([
    { id: 1, data: "2025-04-02", titulo: "Aula de Matemática - 3ºB", tipo: "aula" },
    { id: 2, data: "2025-04-05", titulo: "Reunião de Professores", tipo: "reuniao" },
    { id: 3, data: "2025-04-10", titulo: "Prova Bimestral", tipo: "avaliacao" },
    { id: 4, data: "2025-04-15", titulo: "Conselho de Classe", tipo: "reuniao" },
  ]);
  
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);

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
      case 'aula': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'avaliacao': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'reuniao': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
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
  
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setEventModalOpen(true);
  };
  
  const handleEditEvent = (evento: CalendarEvent) => {
    setSelectedEvent(evento);
    setIsEditing(true);
    setEventModalOpen(true);
  };
  
  const handleDeleteEvent = (id: number) => {
    setDeleteEventId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteEvent = () => {
    if (deleteEventId !== null) {
      setEventos(eventos.filter(e => e.id !== deleteEventId));
      toast.success("Evento removido com sucesso");
      setDeleteDialogOpen(false);
      setDeleteEventId(null);
    }
  };
  
  const handleSaveEvent = (evento: CalendarEvent) => {
    if (isEditing) {
      setEventos(eventos.map(e => e.id === evento.id ? evento : e));
    } else {
      setEventos([...eventos, evento]);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title mb-0">Calendário</h1>
        <Button 
          onClick={handleAddEvent}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Adicionar evento
        </Button>
      </div>
      
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
                    data.dia === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/70'
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
                              className={`px-2 py-1 text-xs rounded truncate flex justify-between items-center ${getEventColor(evento.tipo)}`}
                              title={evento.titulo}
                            >
                              <span className="truncate flex-1">{evento.titulo}</span>
                              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 ml-1">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditEvent(evento);
                                  }}
                                  className="hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(evento.id);
                                  }}
                                  className="hover:text-red-600 dark:hover:text-red-400"
                                >
                                  <Trash className="h-3 w-3" />
                                </button>
                              </div>
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
              <CardTitle className="text-sm flex justify-between items-center">
                <span>Próximos Eventos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventosRecentes.length > 0 ? (
                <ul className="space-y-3">
                  {eventosRecentes.map((evento, i) => (
                    <li key={i} className="border-b pb-2 last:border-0 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{evento.titulo}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </p>
                          <span className={`inline-block px-2 py-0.5 text-xs rounded mt-1 ${getEventColor(evento.tipo)}`}>
                            {evento.tipo === 'aula' ? 'Aula' : 
                            evento.tipo === 'avaliacao' ? 'Avaliação' : 'Reunião'}
                          </span>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditEvent(evento)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(evento.id)}
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum evento agendado
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              {eventosPorTipo.aula.length > 0 ? (
                <ul className="space-y-2">
                  {eventosPorTipo.aula.map((evento, i) => (
                    <li key={i} className="text-sm group">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium block">{evento.titulo}</span>
                          <span className="block text-xs text-muted-foreground">
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditEvent(evento)}
                            className="h-6 w-6"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(evento.id)}
                            className="h-6 w-6"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-2 text-sm">
                  Nenhuma aula agendada
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              {eventosPorTipo.avaliacao.length > 0 ? (
                <ul className="space-y-2">
                  {eventosPorTipo.avaliacao.map((evento, i) => (
                    <li key={i} className="text-sm group">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium block">{evento.titulo}</span>
                          <span className="block text-xs text-muted-foreground">
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditEvent(evento)}
                            className="h-6 w-6"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(evento.id)}
                            className="h-6 w-6"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-2 text-sm">
                  Nenhuma avaliação agendada
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Calendar Event Modal */}
      <CalendarEventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
        isEditing={isEditing}
      />
      
      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteEvent}
        title="Excluir evento"
        description="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default Calendario;
