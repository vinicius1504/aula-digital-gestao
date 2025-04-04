
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";

const Perfil = () => {
  const handleSalvar = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Perfil</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4 bg-primary">
                <div className="text-4xl font-bold text-primary-foreground">MS</div>
              </Avatar>
              <h2 className="text-xl font-bold">Maria Silva</h2>
              <p className="text-muted-foreground">Professora</p>
              <Button className="mt-4 w-full">Alterar Foto</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input defaultValue="Maria" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sobrenome</label>
                    <Input defaultValue="Silva" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" defaultValue="maria.silva@escola.edu.br" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cargo</label>
                  <Input defaultValue="Professora de Matemática" />
                </div>

                <Button onClick={handleSalvar}>Salvar Alterações</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha Atual</label>
                  <Input type="password" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nova Senha</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirmar Nova Senha</label>
                    <Input type="password" />
                  </div>
                </div>

                <Button variant="outline">Atualizar Senha</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
