'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Coupon, PaymentData, Order, CartContextType } from '@/types';
import { MovieDataUtils, AVAILABLE_COUPONS } from '@/data/movies';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([]);
  const { user, addPurchaseToHistory } = useAuth();

  const convenienceFee = 5.00;
  const taxRate = 0.0; // Taxa de imposto (0% para ingressos de cinema)

  useEffect(() => {
    // Carregar carrinho do localStorage na inicialização
    const savedCart = localStorage.getItem('cinemax_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setItems(cartData.items || []);
        setAppliedCoupons(cartData.coupons || []);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Salvar carrinho no localStorage sempre que houver mudanças
    const cartData = {
      items,
      coupons: appliedCoupons
    };
    localStorage.setItem('cinemax_cart', JSON.stringify(cartData));
  }, [items, appliedCoupons]);

  const addItem = (movieId: number, options: Partial<CartItem> = {}): boolean => {
    const movie = MovieDataUtils.getMovieById(movieId);
    if (!movie) return false;

    const newItem: CartItem = {
      id: Date.now().toString(),
      movieId,
      title: movie.title,
      poster: movie.poster,
      genre: movie.genre,
      duration: movie.duration,
      rating: movie.rating,
      price: options.price || movie.price,
      quantity: options.quantity || 1,
      showtime: options.showtime || movie.showtimes[0] || '19:00',
      date: options.date || new Date().toISOString().split('T')[0],
      theater: options.theater || 'Sala 1',
      seats: options.seats || [],
      addedAt: new Date().toISOString(),
      ...options
    };

    // Verificar se já existe item similar
    const existingItemIndex = items.findIndex(item => 
      item.movieId === movieId && 
      item.showtime === newItem.showtime && 
      item.date === newItem.date &&
      item.theater === newItem.theater
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      setItems(updatedItems);
    } else {
      setItems(prev => [...prev, newItem]);
    }

    return true;
  };

  const removeItem = (itemId: string): void => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = (): void => {
    setItems([]);
    setAppliedCoupons([]);
  };

  const applyCoupon = (code: string): void => {
    const upperCode = code.toUpperCase();
    const coupon = AVAILABLE_COUPONS[upperCode];
    
    if (!coupon) {
      throw new Error('Cupom inválido');
    }

    if (appliedCoupons.find(c => c.code === upperCode)) {
      throw new Error('Cupom já aplicado');
    }

    setAppliedCoupons(prev => [...prev, coupon]);
  };

  const removeCoupon = (code: string): void => {
    setAppliedCoupons(prev => prev.filter(c => c.code !== code));
  };

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const getTotalDiscount = (): number => {
    let totalDiscount = 0;
    let totalFixed = 0;
    let totalPercentage = 0;

    appliedCoupons.forEach(coupon => {
      if (coupon.type === 'fixed') {
        totalFixed += coupon.value;
      } else if (coupon.type === 'percentage') {
        totalPercentage += coupon.value;
      }
    });

    // Aplicar desconto percentual
    if (totalPercentage > 0) {
      const percentageDiscount = Math.min(totalPercentage, 100);
      totalDiscount += (subtotal * percentageDiscount) / 100;
    }

    // Aplicar desconto fixo
    totalDiscount += totalFixed;

    // Não pode ser maior que o subtotal
    return Math.min(totalDiscount, subtotal);
  };

  const getConvenienceFee = (): number => {
    // Verificar se há cupom que elimina a taxa
    const hasFreeShipping = appliedCoupons.some(c => c.code === 'FRETE');
    return hasFreeShipping ? 0 : convenienceFee;
  };

  const getTaxes = (): number => {
    const taxableAmount = subtotal - getTotalDiscount();
    return Math.max(0, taxableAmount * taxRate);
  };

  const getTotal = (): number => {
    const discount = getTotalDiscount();
    const convenience = getConvenienceFee();
    const taxes = getTaxes();
    
    return Math.max(0, subtotal - discount + convenience + taxes);
  };

  const checkout = async (paymentData: PaymentData): Promise<Order> => {
    if (items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Simular processamento de pagamento
    const orderData: Order = {
      id: Date.now().toString(),
      items: [...items],
      subtotal,
      discount: getTotalDiscount(),
      convenienceFee: getConvenienceFee(),
      taxes: getTaxes(),
      total: getTotal(),
      appliedCoupons: [...appliedCoupons],
      paymentData,
      user,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Adicionar ao histórico do usuário
    addPurchaseToHistory(orderData);

    // Limpar carrinho
    clearCart();

    return orderData;
  };

  const value: CartContextType = {
    items,
    totalQuantity,
    subtotal,
    appliedCoupons,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    getTotalDiscount,
    getConvenienceFee,
    getTotal,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};