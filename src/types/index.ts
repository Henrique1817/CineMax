// Interface no typescript é um contrato que define a estrutura de um objeto, especificando os tipos de dados que ele deve conter.
// Em typeScript existe dois tipos principais de definições de tipos: "interface" e "type alias" (ou simplesmente "type").
// Ambos são usados para definir a forma de um objeto, mas têm algumas diferenças sutis.
// "interface" é mais adequada para definir a estrutura de objetos complexos e pode ser estendida ou implementada por outras interfaces ou classes.
// "type" é mais flexível e pode ser usado para definir tipos primitivos, uniões, interseções e outros tipos compostos.
// A escolha entre usar "interface" ou "type" muitas vezes depende das preferências do desenvolvedor e do contexto do código.
// Neste projeto, optamos por usar "interface" para definir a estrutura dos dados principais, como filmes, usuários, pedidos, etc.,
// pois elas fornecem uma maneira clara e organizada de descrever a forma desses objetos e podem ser facilmente estendidas no futuro, se necessário.

export interface MovieAudio {
  theme: string;
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export interface Movie { // Interface significa um filme
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  poster: string;
  /** Imagem ampla para fundos/hero; usar path do public (ex.: /images/foo_bg.svg) */
  background?: string;
  description: string;
  year: number;
  director: string;
  cast: string[];
  trailer?: string;
  showtimes: string[];
  price: number;
  isInTheater: boolean;
  releaseDate?: string;
  audio?: MovieAudio;
}

export interface CartItem { // Interface significa um item no carrinho de compras
  id: string;
  movieId: number;
  title: string;
  poster: string;
  genre: string;
  duration: string;
  rating: number;
  price: number;
  quantity: number;
  showtime: string;
  date: string;
  theater: string;
  seats?: string[];
  addedAt: string;
}

export interface User { // Interface significa um usuário
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  purchases: Order[];
}

export interface Order { // Interface significa um pedido de compra
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  convenienceFee: number;
  taxes: number;
  total: number;
  appliedCoupons: Coupon[];
  paymentData: PaymentData;
  user: User;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Coupon { // Interface significa um cupom de desconto
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

export interface PaymentData { // Interface significa dados de pagamento
  method: 'credit' | 'debit' | 'pix';
  personal: PersonalData;
  payment: PaymentInfo;
}

export interface PersonalData { // Interface significa dados pessoais
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate?: string;
}

export interface PaymentInfo { // Interface significa informações de pagamento
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardName?: string;
  installments?: string;
}

export interface Promotion { // Interface significa uma promoção
  id: number;
  title: string;
  description: string;
  discount: string;
  icon: string;
  isActive: boolean;
  validUntil?: string;
}

export interface Session { // Interface significa uma sessão de filme
  id: string;
  movieId: number;
  date: string;
  time: string;
  theater: string;
  availableSeats: number;
  price: number;
}

export interface FilterState {
  genre: string;
  rating: string;
  search: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addPurchaseToHistory: (order: Order) => void;
}

export interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  appliedCoupons: Coupon[];
  addItem: (movieId: number, options?: Partial<CartItem>) => boolean;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: (code: string) => void;
  getTotalDiscount: () => number;
  getConvenienceFee: () => number;
  getTotal: () => number;
  checkout: (paymentData: PaymentData) => Promise<Order>;
}