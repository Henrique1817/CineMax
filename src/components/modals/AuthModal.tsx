"use client";

import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/forms/login";
import RegisterForm from "@/components/forms/cadastro";

type AuthMode = "login" | "register";

type AuthModalProps = {
  /** Controla a visibilidade do modal */
  isOpen: boolean;
  /** Encerra o modal ao clicar em fechar ou concluir o fluxo */
  onClose: () => void;
  /** Indica qual aba deve estar ativa inicialmente */
  mode: AuthMode;
  /** Atualiza o modo ativo quando o usuário alterna na interface */
  onSwitchMode: (mode: AuthMode) => void;
};

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  /** Estado interno sincronizado com o modo recebido via props */
  const [activeTab, setActiveTab] = useState<AuthMode>(mode);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  /** Lista de abas para facilitar renderização e manutenção */
  const tabs = useMemo(
    () => [
      { id: "login" as const, label: "Entrar" },
      { id: "register" as const, label: "Cadastrar" },
    ],
    []
  );

  const handleSwitch = (nextMode: AuthMode) => {
    setActiveTab(nextMode);
    onSwitchMode(nextMode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Modal de autenticação">
      {/* Cabeçalho com título, subtítulo e botão fechar */}
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bem-vindo(a) ao CineMax</h2>
          <p className="text-sm text-gray-500">
            {activeTab === "login"
              ? "Entre para continuar sua experiência."
              : "Crie sua conta em segundos."}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <FaTimes />
        </button>
      </header>

      {/* Abas de autenticação */}
      <nav className="mb-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1 text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSwitch(tab.id)}
            className={`rounded-md py-2 transition ${
              activeTab === tab.id ? "bg-white text-primary-600 shadow" : "hover:text-primary-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Renderização condicional dos formulários */}
      {activeTab === "login" ? (
        <LoginForm onSuccess={onClose} onSwitchToRegister={() => handleSwitch("register")} />
      ) : (
        <RegisterForm onSuccess={onClose} onSwitchToLogin={() => handleSwitch("login")} />
      )}
    </Modal>
  );
}