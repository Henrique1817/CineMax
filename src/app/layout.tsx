import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { AudioProvider } from '@/context/AudioContext'
import AudioControls from '@/components/audio/AudioControls'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
const inter = Inter({ subsets: ['latin'] })

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