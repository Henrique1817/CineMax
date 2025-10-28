"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	/** Indica se o modal deve estar visível */
	isOpen: boolean;
	/** Função disparada ao fechar (botão, ESC ou clique no overlay) */
	onClose: () => void;
	/** Conteúdo renderizado dentro da janela */
	children: ReactNode;
	/** Texto alternativo para acessibilidade */
	ariaLabel?: string;
};

export default function Modal({ isOpen, onClose, children, ariaLabel }: ModalProps) {
	/** Controla se o componente já foi montado no cliente para habilitar o portal */
	const [mounted, setMounted] = useState(false);
	/** Referência para detectar cliques fora da caixa do modal */
	const overlayRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	useEffect(() => {
		/** Fecha ao pressionar ESC quando o modal estiver aberto */
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		if (isOpen) document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen, onClose]);

	if (!mounted || !isOpen) return null;

	/** Usa um elemento raiz dedicado se existir; caso contrário, anexa no body */
	const portalTarget = document.getElementById("modal-root") ?? document.body;

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === overlayRef.current) onClose();
	};

	return createPortal(
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel}
			onMouseDown={handleOverlayClick}
		>
			<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
				{children}
			</div>
		</div>,
		portalTarget
	);
}
