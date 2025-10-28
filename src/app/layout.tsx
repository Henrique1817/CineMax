/* -------------------------------------------------------------------------- */
/*                             Layout raiz do app                              */
/* Responsável por registrar estilos globais e provedores de contexto.         */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Configurações UI ---------------------------- */
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

/* ---------------------------- Contextos globais ----------------------------- */
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { AudioProvider } from '@/context/AudioContext'
import AudioControls from '@/components/audio/AudioControls'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
const inter = Inter({ subsets: ['latin'] })

/* --------------------------- SEO e metadados base --------------------------- */
export const metadata: Metadata = {
  title: 'CineMax - Sistema de Cinema',
  description: 'O melhor sistema de cinema online. Reserve seus ingressos com facilidade.',
  keywords: 'cinema, filmes, ingressos, entretenimento',
  authors: [{ name: 'CineMax Team' }],
  openGraph: {
    title: 'CineMax - Sistema de Cinema',
    description: 'Reserve seus ingressos de cinema online',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /* ---------------------- Envoltórios e elementos globais -------------------- */
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <AudioProvider>
              {children}
              <AudioControls />
            </AudioProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}