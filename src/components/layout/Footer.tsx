'use client';

import Link from 'next/link';
import { FaFilm, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FaFilm className="text-primary-500 text-2xl" />
              <span className="text-2xl font-bold text-gradient">CineMax</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Sua experiência cinematográfica começa aqui. Desfrute dos melhores filmes 
              com tecnologia de ponta e o máximo conforto.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/filmes" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Filmes em Cartaz
                </Link>
              </li>
              <li>
                <Link href="/programacao" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Programação
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Rua do Cinema, 123<br />
                  Centro, São Paulo - SP<br />
                  CEP: 01234-567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  (11) 1234-5678
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  contato@cinemax.com.br
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de separação */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CineMax. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/politica-privacidade" className="text-gray-400 hover:text-primary-500 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="text-gray-400 hover:text-primary-500 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Horários de Funcionamento */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h4 className="text-primary-500 font-semibold mb-2">Horário de Funcionamento</h4>
            <div className="text-gray-300 text-sm">
              <span className="inline-block mr-6">Segunda a Quinta: 14h às 23h</span>
              <span className="inline-block mr-6">Sexta e Sábado: 13h às 24h</span>
              <span className="inline-block">Domingo: 14h às 22h</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}