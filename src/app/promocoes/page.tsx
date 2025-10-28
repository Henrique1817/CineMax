'use client';

import { useState } from 'react';
import { FaGift, FaPercent, FaTicketAlt, FaCopy, FaCheck, FaTags, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { AVAILABLE_COUPONS } from '@/data/movies';

export default function PromotionsPage() {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const promotions = [
    {
      id: 1,
      title: 'Desconto Estudante',
      description: 'Apresente sua carteirinha de estudante e ganhe 20% de desconto em qualquer sessão.',
      discount: '20%',
      code: 'ESTUDANTE',
      icon: FaPercent,
      color: 'from-blue-500 to-blue-600',
      terms: [
        'Válido apenas para estudantes com carteirinha',
        'Não acumulativo com outras promoções',
        'Máximo 2 ingressos por compra'
      ],
      validUntil: '31/12/2024'
    },
    {
      id: 2,
      title: 'Primeira Compra',
      description: 'Primeira vez no CineMax? Ganhe 15% de desconto na sua primeira compra.',
      discount: '15%',
      code: 'PRIMEIRA',
      icon: FaGift,
      color: 'from-green-500 to-green-600',
      terms: [
        'Válido apenas para novos usuários',
        'Mínimo de 1 ingresso',
        'Uso único por CPF'
      ],
      validUntil: '31/12/2024'
    },
    {
      id: 3,
      title: 'Combo Família VIP',
      description: 'R$ 30 de desconto em compras acima de R$ 150. Perfeito para a família toda!',
      discount: 'R$ 30',
      code: 'VIP30',
      icon: FaTicketAlt,
      color: 'from-purple-500 to-purple-600',
      terms: [
        'Válido para compras acima de R$ 150',
        'Máximo 6 ingressos',
        'Válido para qualquer sessão'
      ],
      validUntil: '28/02/2024'
    },
    {
      id: 4,
      title: 'Desconto Geral',
      description: 'Promoção especial! 10% de desconto em qualquer ingresso, qualquer sessão.',
      discount: '10%',
      code: 'DESCONTO10',
      icon: FaTags,
      color: 'from-orange-500 to-red-500',
      terms: [
        'Válido para qualquer filme',
        'Sem limite de ingressos',
        'Acumulativo com desconto estudante'
      ],
      validUntil: '30/04/2024'
    }
  ];

  const specialOffers = [
    {
      title: 'Segunda-feira Maluca',
      description: 'Todas as segundas-feiras, ingressos por apenas R$ 15,00!',
      icon: FaCalendarAlt,
      details: 'Válido para todas as sessões das segundas-feiras, exceto feriados.'
    },
    {
      title: 'Combo Casal',
      description: '2 ingressos + 1 pipoca grande + 2 refrigerantes por R$ 89,90',
      icon: FaUsers,
      details: 'Válido de terça a quinta-feira em sessões até 20h.'
    },
    {
      title: 'Aniversário do Mês',
      description: 'Aniversariantes do mês ganham ingresso grátis!',
      icon: FaGift,
      details: 'Apresente documento de identidade. Válido apenas no mês do aniversário.'
    }
  ];

  const handleCopyCoupon = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2000);
    } catch (error) {
      alert(`Código: ${code}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Promoções <span className="text-gradient">Especiais</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aproveite nossas ofertas exclusivas e economize na sua experiência no cinema
          </p>
        </div>

        {/* Featured Promotions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {promotions.map((promo) => {
            const IconComponent = promo.icon;
            return (
              <div 
                key={promo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${promo.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="text-3xl" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{promo.discount}</div>
                      <div className="text-sm opacity-90">desconto</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm opacity-90">{promo.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Coupon Code */}
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Código do cupom:</span>
                        <div className="font-mono font-bold text-lg text-primary-600">
                          {promo.code}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyCoupon(promo.code)}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {copiedCoupon === promo.code ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <FaCopy />
                        )}
                        <span className="text-sm">
                          {copiedCoupon === promo.code ? 'Copiado!' : 'Copiar'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Termos e Condições:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {promo.terms.map((term, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaCalendarAlt className="mr-2" />
                    Válido até {promo.validUntil}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleCopyCoupon(promo.code)}
                    className="w-full btn btn-primary"
                  >
                    Usar Este Cupom
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Offers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Ofertas <span className="text-gradient">Especiais</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer, index) => {
              const IconComponent = offer.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-2xl text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {offer.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {offer.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Como Usar os Cupons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Copie o Código</h3>
              <p className="text-gray-600 text-sm">
                Clique no botão "Copiar" ou anote o código do cupom desejado
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Escolha o Filme</h3>
              <p className="text-gray-600 text-sm">
                Selecione o filme e horário desejado, adicione ao carrinho
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Aplique o Desconto</h3>
              <p className="text-gray-600 text-sm">
                No carrinho, digite o código na seção "Cupom de Desconto"
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Não Perca Nenhuma Promoção!
          </h3>
          <p className="mb-6">
            Cadastre-se na nossa newsletter e receba ofertas exclusivas
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Inscrever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}