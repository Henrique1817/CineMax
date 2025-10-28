"use client";

/* -------------------------------------------------------------------------- */
/*                             Cadastro de Usuário                             */
/* Formulário responsável por criar uma nova conta dentro do modal de auth.    */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Dependências React --------------------------- */
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

/* --------------------------- Propriedades recebidas ------------------------ */
type RegisterFormProps = {
	/** Chamado ao finalizar o cadastro com sucesso */
	onSuccess?: () => void;
	/** Alterna o modal para a aba de login */
	onSwitchToLogin?: () => void;
};

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
	const { register } = useAuth();

	/* ---------------------------- Estados controlados ---------------------------- */
	/** Campos controlados para o formulário de cadastro */
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	/* ---------------------------- Estados auxiliares UX -------------------------- */
	/** Estados auxiliares para UX: loading e mensagem de erro */
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/* ------------------------------ Submissão segura ----------------------------- */
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setError("As senhas não conferem.");
			return;
		}

		setError(null);
		setSubmitting(true);
		try {
			await register(name, email, password);
			onSuccess?.();
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Não foi possível criar a conta.";
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};

	/* --------------------------- Interface do formulário ------------------------ */
	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			{/* Campo de nome completo */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="register-name">
					Nome completo
				</label>
				<input
					id="register-name"
					type="text"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="Seu nome"
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
					autoComplete="name"
				/>
			</div>

			{/* Campo de e-mail */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="register-email">
					E-mail
				</label>
				<input
					id="register-email"
					type="email"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="seuemail@email.com"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					autoComplete="email"
				/>
			</div>

			{/* Campo de senha */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="register-password">
					Senha
				</label>
				<input
					id="register-password"
					type="password"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="Crie uma senha"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
					minLength={6}
					autoComplete="new-password"
				/>
			</div>

			{/* Campo de confirmação de senha */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700" htmlFor="register-confirm-password">
					Confirmar senha
				</label>
				<input
					id="register-confirm-password"
					type="password"
					className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
					placeholder="Repita a senha"
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					required
					autoComplete="new-password"
				/>
			</div>

			{/* Mensagem de erro quando necessário */}
			{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

			{/* Botão principal */}
			<button
				type="submit"
				className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
				disabled={submitting}
			>
				{submitting ? "Criando conta..." : "Criar conta"}
			</button>

			{/* Link para alternar para login */}
			<p className="text-center text-sm text-gray-600">
				Já tem conta?{" "}
				<button type="button" className="font-semibold text-primary-600 hover:underline" onClick={onSwitchToLogin}>
					Entrar
				</button>
			</p>
		</form>
	);
}
