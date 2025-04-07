
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth, mockUserCredentials } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2, User, Lock, Facebook, Twitter } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Type your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-transparent border-gray-200"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  type="password"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-transparent border-gray-200"
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 dark:from-cyan-600 dark:to-purple-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  LOGANDO...
                </>
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
          
          <div className="mt-8">
            <p className="text-center text-sm mb-4">Or Sign Up Using</p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10 border-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10 border-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10 border-gray-300 hover:bg-red-50 dark:hover:bg-red-900"
              >
                <span className="text-red-500 font-bold">G</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-center text-sm mb-2">Or Sign Up Using</p>
            <Button 
              variant="link" 
              className="text-sm font-medium"
            >
              SIGN UP
            </Button>
          </div>

          <div className="mt-8 border-t pt-6 text-xs">
            <p className="font-medium mb-2">Usuários de teste:</p>
            <div className="space-y-1">
              {mockUserCredentials.map((credential, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
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
        </div>
      </Card>
    </div>
  );
};

export default Login;
