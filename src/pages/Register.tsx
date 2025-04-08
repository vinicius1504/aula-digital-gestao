
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2, User, Mail, Lock, Building, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const registerSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  school: z.string().min(1, "Nome da escola é obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não correspondem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      school: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(
        values.username,
        values.email,
        values.password,
        values.school
      );
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      // Error is handled inside the useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden animate-fade-in">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Cadastro de Usuário</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome de Usuário</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome de usuário"
                          className="pl-10 bg-transparent border-gray-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Digite seu email"
                          className="pl-10 bg-transparent border-gray-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Digite sua senha"
                          className="pl-10 bg-transparent border-gray-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirmar Senha</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirme sua senha"
                          className="pl-10 bg-transparent border-gray-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Escola</FormLabel>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <FormControl>
                        <Input
                          placeholder="Nome da escola"
                          className="pl-10 bg-transparent border-gray-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && <p className="text-sm text-red-500">{error}</p>}
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-700 hover-scale"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    CADASTRANDO...
                  </>
                ) : (
                  "CADASTRAR"
                )}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">Já tem uma conta?</p>
                <Link to="/login" className="inline-flex items-center mt-2 text-primary hover:underline">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Voltar para login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Register;
