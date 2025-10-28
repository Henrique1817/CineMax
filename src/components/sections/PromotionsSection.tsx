'use client';

import Link from 'next/link';
import { FaGift, FaPercent, FaTicketAlt } from 'react-icons/fa';

export default function PromotionsSection() {
  const promotions = [
    {
      id: 1,
      title: 'Desconto Estudante',
      description: 'Estudantes têm 20% de desconto em todos os ingressos',
      discount: '20%',
      code: 'ESTUDANTE',
      icon: FaPercent,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Primeira Compra',
      description: 'Ganhe 15% de desconto na sua primeira compra',
      discount: '15%',
      code: 'PRIMEIRA',
      icon: FaGift,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Combo Família',
      description: 'R$ 30 de desconto em compras acima de R$ 150',
      discount: 'R$ 30',
      code: 'VIP30',
      icon: FaTicketAlt,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Promoções <span className="text-gradient">Especiais</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aproveite nossas ofertas exclusivas e economize na sua experiência no cinema
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {promotions.map((promo) => {
            const IconComponent = promo.icon;
            return (
              <div 
                key={promo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${promo.color} p-6 text-white text-center`}>
                  <IconComponent className="text-3xl mx-auto mb-3" />
                  <h3 className="text-xl font-bold">{promo.title}</h3>
                  <div className="text-2xl font-bold mt-2">{promo.discount}</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3 text-center mb-4">
                    <span className="text-sm text-gray-500">Cupom:</span>
                    <div className="font-mono font-bold text-lg text-primary-600">
                      {promo.code}
                    </div>
                  </div>
                  <button className="w-full btn btn-primary">
                    Usar Cupom
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quer mais promoções?
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se e receba ofertas exclusivas diretamente no seu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/promocoes" 
                className="btn btn-primary flex-1"
              >
                Ver Todas as Promoções
              </Link>
              <Link 
                href="/newsletter" 
                className="btn btn-secondary flex-1"
              >
                Assinar Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}