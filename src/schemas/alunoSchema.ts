
import { z } from "zod";

export interface Aluno {
  id: number;
  nome: string;
  status: "ativo" | "inativo";
  turma: string;
  observacoes: string;
}

export const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["ativo", "inativo"]),
  turma: z.string().min(1, "Turma é obrigatória"),
  observacoes: z.string().optional(),
});

export type AlunoFormValues = z.infer<typeof alunoSchema>;

// Mock data for development
export const mockAlunos: Aluno[] = [
  { id: 1, nome: "Felix Bastian", status: "ativo", turma: "3ºB", observacoes: "teste" },
  { id: 2, nome: "Vinícius Leite", status: "ativo", turma: "3ºB", observacoes: "teste" },
];
