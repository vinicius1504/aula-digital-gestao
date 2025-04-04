
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const Configuracoes = () => {
  const handleSalvar = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Configurações</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificações por Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações por email sobre atividades importantes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Lembretes de Aulas</h3>
                  <p className="text-sm text-muted-foreground">
                    Receber lembretes sobre aulas próximas
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificações de Sistema</h3>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre atualizações e manutenção do sistema
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Tema Escuro</h3>
                  <p className="text-sm text-muted-foreground">
                    Alternar entre tema claro e escuro
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Animações</h3>
                  <p className="text-sm text-muted-foreground">
                    Habilitar animações na interface
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Sessão Ativa</h3>
                  <p className="text-sm text-muted-foreground">
                    Manter sessão ativa mesmo sem atividade
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exportação de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Exportar Relatórios</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Exportar dados e relatórios do sistema
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Relatório de Alunos</Button>
                  <Button variant="outline">Relatório de Avaliações</Button>
                  <Button variant="outline">Diário de Classe</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSalvar}>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
