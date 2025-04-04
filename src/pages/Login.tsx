
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth, mockUserCredentials } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (err) {
      // Error is handled inside the useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Sistema de Gestão Escolar</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta para continuar</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="text-sm text-gray-500 mt-4 border-t pt-4 w-full">
              <p className="font-medium mb-2">Usuários de teste:</p>
              <div className="space-y-1">
                {mockUserCredentials.map((credential, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Email:</span> {credential.email}
                    </div>
                    <div>
                      <span className="font-medium">Função:</span> {credential.role}
                    </div>
                  </div>
                ))}
                <p className="mt-1">Senha para todos: <span className="font-medium">senha123</span></p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
