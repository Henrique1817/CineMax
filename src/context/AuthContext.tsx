'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {  // Componente responsavel pela autenticação do usuario, Como assim autenticação do usuario?
  // Isto significa que ele gerencia o estado de login, logout, registro e mantém as informações do usuário autenticado.
  // Ele também fornece essas funcionalidades para outros componentes através do contexto React.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Carregar usuário do localStorage na inicialização
    const savedUser = localStorage.getItem('cinemax_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser)); // Corrigido: Adicionado JSON.parse para converter a string de volta para objeto, JSON.parse significa analisar uma string JSON e transformá-la em um objeto JavaScript.
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('cinemax_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulação de autenticação (em produção, seria uma chamada API)
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Para demo, aceitar qualquer email/senha válidos
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ''),
      email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      purchases: []
    };

    setUser(newUser);
    localStorage.setItem('cinemax_user', JSON.stringify(newUser));
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Validações
    if (!name || !email || !password) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      purchases: []
    };

    setUser(newUser);
    localStorage.setItem('cinemax_user', JSON.stringify(newUser));
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('cinemax_user');
    // Também limpar o carrinho ao fazer logout (opcional)
    localStorage.removeItem('cinemax_cart');
  };

  const addPurchaseToHistory = (order: Order): void => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      purchases: [order, ...user.purchases]
    };

    setUser(updatedUser);
    localStorage.setItem('cinemax_user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    addPurchaseToHistory
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};