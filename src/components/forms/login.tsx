"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type LoginFormProps = {
	/** Ação executada quando o login finaliza com sucesso */
	onSuccess?: () => void;
	/** Alterna para a aba de cadastro quando o usuário solicita */
	onSwitchToRegister?: () => void;
};

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
	const { login } = useAuth();

	/** Campos controlados do formulário */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/** Feedback visual durante requisições e tratamento de erros */
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSubmitting(true);
		try {
			await login(email, password);
			onSuccess?.();
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Não foi possível entrar.";
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			{/* Campo de e-mail controlado */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="login-email">
					E-mail
				</label>
				<input
					id="login-email"
					type="email"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="seuemail@email.com"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					autoComplete="email"
				/>
			</div>

			{/* Campo de senha controlado */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="login-password">
					Senha
				</label>
				<input
					id="login-password"
					type="password"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="Digite sua senha"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
					minLength={6}
					autoComplete="current-password"
				/>
			</div>

			{/* Feedback de erro simples e direto */}
			{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

			{/* Botão de envio com estado de carregamento */}
			<button
				type="submit"
				className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
				disabled={submitting}
			>
				{submitting ? "Entrando..." : "Entrar"}
			</button>

			{/* Link para alternar para o cadastro */}
			<p className="text-center text-sm text-gray-600">
				Ainda não tem conta?{" "}
				<button type="button" className="font-semibold text-primary-600 hover:underline" onClick={onSwitchToRegister}>
					Cadastre-se
				</button>
			</p>
		</form>
	);
}
