
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/alunos" 
            element={
              <MainLayout>
                <Alunos />
              </MainLayout>
            } 
          />
          <Route 
            path="/aulas" 
            element={
              <MainLayout>
                <Aulas />
              </MainLayout>
            } 
          />
          <Route 
            path="/aulas/gerenciar" 
            element={
              <MainLayout>
                <GerenciarAulas />
              </MainLayout>
            } 
          />
          <Route 
            path="/aulas/diario" 
            element={
              <MainLayout>
                <DiarioDeBordo />
              </MainLayout>
            } 
          />
          <Route 
            path="/avaliacoes" 
            element={
              <MainLayout>
                <Avaliacoes />
              </MainLayout>
            } 
          />
          <Route 
            path="/frequencia" 
            element={
              <MainLayout>
                <Frequencia />
              </MainLayout>
            } 
          />
          <Route 
            path="/calendario" 
            element={
              <MainLayout>
                <Calendario />
              </MainLayout>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <MainLayout>
                <Perfil />
              </MainLayout>
            } 
          />
          <Route 
            path="/configuracoes" 
            element={
              <MainLayout>
                <Configuracoes />
              </MainLayout>
            } 
          />
          <Route 
            path="/ajuda" 
            element={
              <MainLayout>
                <Ajuda />
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
