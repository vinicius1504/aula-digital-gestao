
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Ajuda = () => {
  const faqItems = [
    {
      pergunta: "Como adicionar um novo aluno?",
      resposta: "Para adicionar um novo aluno, acesse o menu 'Alunos' no painel lateral e clique no botão 'Adicionar Aluno'. Preencha todos os dados solicitados no formulário e clique em 'Salvar'."
    },
    {
      pergunta: "Como registrar a frequência dos alunos?",
      resposta: "Acesse o menu 'Frequência', selecione a turma, disciplina e data desejada. Marque a presença dos alunos usando as caixas de seleção e clique em 'Salvar Frequência'."
    },
    {
      pergunta: "Como lançar notas no sistema?",
      resposta: "Acesse o menu 'Avaliações', selecione a turma e a disciplina. Digite as notas para cada período avaliativo e clique em 'Salvar' para cada aluno ou use o botão 'Salvar Todos' para registrar todas as notas de uma vez."
    },
    {
      pergunta: "Como criar uma nova aula no sistema?",
      resposta: "Vá até 'Aulas' > 'Gerenciar Aulas', preencha os campos obrigatórios como turma, matéria e datas da aula e clique em 'Criar'."
    },
    {
      pergunta: "Como exportar relatórios?",
      resposta: "Na maioria das páginas que exibem dados, como 'Avaliações' ou 'Frequência', há um botão 'Exportar' que permite baixar os dados em formato de planilha ou PDF."
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Ajuda e Suporte</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.pergunta}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Suporte Técnico</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: suporte@gestaoescolar.com<br />
                    Telefone: (11) 3456-7890<br />
                    Horário: Segunda a Sexta, 8h às 18h
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Coordenação Pedagógica</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: coordenacao@gestaoescolar.com<br />
                    Telefone: (11) 3456-7891<br />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tutoriais em Vídeo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="border-b pb-2">
                  <a href="#" className="text-primary hover:underline block">Como cadastrar alunos</a>
                  <p className="text-sm text-muted-foreground">Duração: 5:30</p>
                </li>
                <li className="border-b pb-2">
                  <a href="#" className="text-primary hover:underline block">Gerenciando aulas e conteúdos</a>
                  <p className="text-sm text-muted-foreground">Duração: 8:15</p>
                </li>
                <li className="border-b pb-2">
                  <a href="#" className="text-primary hover:underline block">Sistema de avaliações</a>
                  <p className="text-sm text-muted-foreground">Duração: 6:45</p>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline block">Exportando relatórios</a>
                  <p className="text-sm text-muted-foreground">Duração: 4:20</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ajuda;
