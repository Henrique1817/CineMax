'use client';

/* -------------------------------------------------------------------------- */
/*                        Página de carrinho de compras                        */
/* Garante gestão de itens, cupons e checkout antes da finalização do pedido.  */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Dependências principais ---------------------- */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus, FaTicketAlt, FaShoppingCart, FaTags } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  /* --------------------------- Hooks globais utilizados -------------------- */
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    items,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    appliedCoupons,
    subtotal,
    getTotalDiscount,
    getConvenienceFee,
    getTotal,
    totalQuantity,
    checkout,
    clearCart
  } = useCart();

  const discount = getTotalDiscount();
  const convenienceFee = getConvenienceFee();
  const total = getTotal();

  /* ------------------------------ Estados locais --------------------------- */
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  /* ------------------------- Aplicação de cupom seguro -------------------- */
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    try {
      applyCoupon(couponCode.toUpperCase());
      setCouponCode('');
    } catch (error) {
      alert('Cupom inválido ou já aplicado');
    }
    
    setIsApplyingCoupon(false);
  };

  /* ------------------------ Entrypoint para o checkout -------------------- */
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      const goToLogin = confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login?');
      if (goToLogin) {
        router.push('/login');
      }
      return;
    }

    if (items.length === 0) {
      alert('Seu carrinho está vazio');
      return;
    }

    setIsProcessingCheckout(true);
    
    try {
      // Dados fictícios para demo - em produção seria um formulário
      const paymentData = {
        method: 'credit' as const,
        personal: {
          fullName: 'Demo User',
          cpf: '000.000.000-00',
          email: 'demo@example.com',
          phone: '(11) 99999-9999'
        },
        payment: {
          cardNumber: '1234 5678 9012 3456',
          cardExpiry: '12/25',
          cardCvv: '123',
          cardName: 'Demo User',
          installments: '1'
        }
      };

      const order = await checkout(paymentData);
      alert('Compra realizada com sucesso!');
      router.push('/historico');
    } catch (error) {
      alert('Erro ao processar compra. Tente novamente.');
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  /* --------------------------- Estado vazio do carrinho ------------------- */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <FaShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-6">
              Adicione alguns ingressos para continuar
            </p>
            <Link href="/filmes" className="btn btn-primary">
              Ver Filmes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ Interface principal --------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Carrinho de Compras
          </h1>
          <p className="text-gray-600">
            {totalQuantity} {totalQuantity === 1 ? 'ingresso' : 'ingressos'} no seu carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  {/* Movie Poster */}
                  <div className="relative w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Sessão: {item.showtime}</p>
                      <p>Data: {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                      <p>Cinema: {item.theater}</p>
                      <p>Gênero: {item.genre}</p>
                      <p>Duração: {item.duration}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary-600">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        R$ {item.price.toFixed(2)} cada
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                      title="Remover item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cupom de Desconto
              </h3>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Digite o código do cupom"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="btn btn-secondary px-4 disabled:opacity-50"
                >
                  {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
                </button>
              </div>

              {/* Applied Coupons */}
              {appliedCoupons.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Cupons aplicados:</p>
                  {appliedCoupons.map((coupon) => (
                    <div key={coupon.code} className="flex items-center justify-between bg-green-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <FaTags className="text-green-600 text-sm" />
                        <span className="text-sm font-medium text-green-700">
                          {coupon.code}
                        </span>
                      </div>
                      <button
                        onClick={() => removeCoupon(coupon.code)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({totalQuantity} ingressos)</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxa de conveniência</span>
                  <span>R$ {convenienceFee.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessingCheckout}
                className="w-full btn btn-primary mt-6 flex items-center justify-center space-x-2"
              >
                <FaTicketAlt />
                <span>
                  {isProcessingCheckout ? 'Processando...' : 'Finalizar Compra'}
                </span>
              </button>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-3">
                <Link
                  href="/filmes"
                  className="block btn btn-secondary text-center"
                >
                  Continuar Comprando
                </Link>
                
                <button
                  onClick={clearCart}
                  className="block w-full text-red-600 hover:text-red-800 text-sm transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}