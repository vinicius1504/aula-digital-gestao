
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Aulas from "./pages/Aulas";
import GerenciarAulas from "./pages/GerenciarAulas";
import DiarioDeBordo from "./pages/DiarioDeBordo";
import Avaliacoes from "./pages/Avaliacoes";
import Frequencia from "./pages/Frequencia";
import Calendario from "./pages/Calendario";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import Ajuda from "./pages/Ajuda";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alunos" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Alunos />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/aulas" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Aulas />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/aulas/gerenciar" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <GerenciarAulas />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/aulas/diario" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DiarioDeBordo />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/avaliacoes" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Avaliacoes />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/frequencia" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Frequencia />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendario" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Calendario />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Perfil />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/configuracoes" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Configuracoes />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ajuda" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Ajuda />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
