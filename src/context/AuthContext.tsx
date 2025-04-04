
import React, { createContext, useState, useContext, useEffect } from "react";

// Define user type
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "teacher" | "staff";
  avatar?: string;
}

// Define mock users for testing
const mockUsers: User[] = [
  {
    id: 1,
    name: "Administrador",
    email: "admin@escola.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin",
  },
  {
    id: 2,
    name: "Professor Silva",
    email: "professor@escola.com",
    role: "teacher",
    avatar: "https://i.pravatar.cc/150?u=teacher",
  },
  {
    id: 3,
    name: "Secretária Ana",
    email: "secretaria@escola.com",
    role: "staff",
    avatar: "https://i.pravatar.cc/150?u=staff",
  },
];

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (mock authentication)
      const foundUser = mockUsers.find(user => user.email === email);
      
      // In a real app, you would verify password here
      // For this demo, we'll accept any non-empty password
      if (!password) {
        throw new Error("Senha é obrigatória");
      }
      
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(foundUser));
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const mockUserCredentials = [
  { email: "admin@escola.com", password: "senha123", role: "Administrador" },
  { email: "professor@escola.com", password: "senha123", role: "Professor" },
  { email: "secretaria@escola.com", password: "senha123", role: "Secretária" },
];
