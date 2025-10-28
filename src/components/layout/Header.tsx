'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFilm, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext'; // useAuth é um hook personalizado para acessar o contexto de autenticação
import { useCart } from '@/context/CartContext';
import AuthModal from '../modals/AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para abrir o modal de autenticação com o modo especificado
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <FaFilm className="text-primary-500 text-2xl" />
              <span className="text-2xl font-bold text-gradient">CineMax</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-500 transition-colors">
                Início
              </Link>
              <Link href="/filmes" className="text-gray-700 hover:text-primary-500 transition-colors">
                Filmes
              </Link>
              <Link href="/programacao" className="text-gray-700 hover:text-primary-500 transition-colors">
                Programação
              </Link>
              <Link href="/promocoes" className="text-gray-700 hover:text-primary-500 transition-colors">
                Promoções
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart Button */}
              <Link href="/carrinho" className="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
                <FaShoppingCart className="text-xl" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* User Actions */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors">
                    <FaUser />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meu Perfil
                    </Link>
                    <Link href="/historico" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meus Ingressos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="btn btn-ghost text-sm"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="btn btn-primary text-sm"
                  >
                    Cadastrar
                  </button>
                </div>
              )} 
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-primary-500 transition-colors"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/filmes"
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Filmes
              </Link>
              <Link
                href="/programacao"
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Programação
              </Link>
              <Link
                href="/promocoes"
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Promoções
              </Link>
              <Link
                href="/carrinho"
                className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Carrinho ({totalQuantity})
              </Link>

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <div className="border-t pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Olá, {user?.name}
                  </div>
                  <Link
                    href="/perfil"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <Link
                    href="/historico"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meus Ingressos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2 space-y-1">
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('register');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Cadastrar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
}