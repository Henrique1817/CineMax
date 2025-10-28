# 🎬 CineMax - Documentação do Projeto

## 📋 Visão Geral
O **CineMax** é um sistema de cinema desenvolvido em **Next.js 14** com **TypeScript** e **Tailwind CSS**. O projeto permite que usuários naveguem por filmes, vejam detalhes, façam reservas de ingressos e gerenciem um carrinho de compras.

## 🏗️ Arquitetura do Projeto

```
projeto_n1_next/
├── 📁 public/                    # Arquivos estáticos públicos
│   └── 📁 images/               # Imagens do projeto
├── 📁 src/                      # Código fonte principal
│   ├── 📁 app/                  # App Router (Next.js 14)
│   ├── 📁 components/           # Componentes reutilizáveis
│   ├── 📁 context/              # Gerenciamento de estado global
│   ├── 📁 data/                 # Dados mockados e utilitários
│   └── 📁 types/                # Definições TypeScript
├── ⚙️ next.config.js           # Configurações do Next.js
├── 📦 package.json             # Dependências e scripts
└── 🎨 tailwind.config.ts       # Configurações do Tailwind
```

---

## 🔄 Fluxo da Aplicação

### 1. **Inicialização** (`layout.tsx`)
```
Usuário acessa → RootLayout → Providers (Auth + Cart) → Página solicitada
```

### 2. **Autenticação** (`AuthContext`)
```
Login/Registro → Validação → LocalStorage → Estado Global → Header atualizado
```

### 3. **Navegação** (`Header`)
```
Menu → Rota selecionada → Página correspondente → Componentes renderizados
```

### 4. **Carrinho** (`CartContext`)
```
Adicionar filme → Validações → LocalStorage → Estado Global → Contador atualizado
```

---

## 📁 Estrutura Detalhada

### 🎯 **Arquivos de Configuração**

#### `next.config.js`
```javascript
// Configurações do Next.js
- Domínios permitidos para imagens externas
- Otimizações experimentais
- Configurações de build
```

#### `tailwind.config.ts`
```typescript
// Configurações do Tailwind CSS
- Cores personalizadas (primary, secondary, gold)
- Breakpoints responsivos
- Animações customizadas
```

#### `package.json`
```json
// Scripts disponíveis:
- "dev": Servidor de desenvolvimento
- "build": Build de produção
- "start": Servidor de produção
- "lint": Verificação de código
```

---

### 🚀 **App Router** (`src/app/`)

#### `layout.tsx` - Layout Raiz
```tsx
// Função: Layout principal da aplicação
- Metadados SEO
- Fonte Inter do Google
- Providers globais (Auth + Cart)
- Estrutura HTML base
```

#### `page.tsx` - Página Inicial
```tsx
// Função: Homepage do sistema
- HeroSection (banner principal)
- FeaturedMoviesSection (filmes em destaque)
- UpcomingMoviesSection (próximos lançamentos)
- PromotionsSection (promoções)
```

#### `globals.css` - Estilos Globais
```css
// Função: Estilos base da aplicação
- Reset CSS
- Variáveis de cores
- Classes utilitárias personalizadas
- Animações CSS
```

---

### 📄 **Páginas** (`src/app/*/`)

#### `filmes/page.tsx` - Catálogo de Filmes
```tsx
// Função: Listagem e filtros de filmes
- Grid de filmes com MovieCard
- Filtros por gênero, avaliação, busca
- Paginação de resultados
- Estado local para filtros
```

#### `filmes/[id]/page.tsx` - Detalhes do Filme
```tsx
// Função: Página individual do filme
- Informações completas do filme
- Trailer incorporado
- Horários disponíveis
- Botão "Adicionar ao Carrinho"
- Breadcrumb de navegação
```

#### `programacao/page.tsx` - Programação de Horários
```tsx
// Função: Grade de horários dos filmes
- Listagem por data
- Filtros por filme
- Seleção de horários
- Informações de salas e preços
```

#### `promocoes/page.tsx` - Promoções
```tsx
// Função: Página de ofertas e cupons
- Lista de promoções ativas
- Cupons de desconto
- Condições de uso
- Datas de validade
```

#### `carrinho/page.tsx` - Carrinho de Compras
```tsx
// Função: Finalização de compra
- Itens selecionados
- Aplicação de cupons
- Cálculo de valores
- Formulário de pagamento
- Processamento da compra
```

---

### 🧩 **Componentes** (`src/components/`)

#### **Layout** (`layout/`)

##### `Header.tsx` - Cabeçalho
```tsx
// Função: Navegação principal
- Logo do CineMax
- Menu de navegação
- Botões de login/registro
- Contador do carrinho
- Menu mobile responsivo
- Integração com AuthContext e CartContext
```

##### `Footer.tsx` - Rodapé
```tsx
// Função: Informações institucionais
- Links úteis
- Informações de contato
- Redes sociais
- Copyright
```

#### **Modais** (`modals/`)

##### `AuthModal.tsx` - Modal de Autenticação
```tsx
// Função: Login e registro de usuários
- Formulário de login
- Formulário de registro
- Validações de entrada
- Estados de loading
- Tratamento de erros
- Integração com AuthContext
```

#### **Seções** (`sections/`)

##### `HeroSection.tsx` - Banner Principal
```tsx
// Função: Destaque da homepage
- Slider de filmes principais
- Botões de ação (Assistir, Mais Info)
- Background dinâmico
- Autoplay automático
```

##### `FeaturedMoviesSection.tsx` - Filmes em Destaque
```tsx
// Função: Showcase de filmes populares
- Grid responsivo de MovieCard
- Filmes com rating alto
- Navegação por categorias
```

##### `UpcomingMoviesSection.tsx` - Próximos Lançamentos
```tsx
// Função: Filmes que ainda não estrearam
- Lista de lançamentos futuros
- Datas de estreia
- Botão "Notify Me"
```

##### `PromotionsSection.tsx` - Seção de Promoções
```tsx
// Função: Destaque de ofertas
- Cards de promoções ativas
- Códigos de cupom
- Links para página de promoções
```

#### **UI** (`ui/`)

##### `MovieCard.tsx` - Card de Filme
```tsx
// Função: Componente reutilizável para exibir filmes
- Poster do filme
- Informações básicas (título, gênero, duração)
- Rating com estrelas
- Botões de ação
- Hover effects
- Suporte a priority loading
- Badge de classificação etária
```

---

### 🔧 **Gerenciamento de Estado** (`src/context/`)

#### `AuthContext.tsx` - Contexto de Autenticação
```tsx
// Função: Gerencia estado de usuário logado
Funcionalidades:
- login(email, password): Autentica usuário
- register(name, email, password): Cadastra novo usuário
- logout(): Remove usuário da sessão
- addPurchaseToHistory(): Adiciona compra ao histórico
- Persistência em localStorage
- Validações de entrada
- Estados de loading e erro

Estado Global:
- user: User | null
- isAuthenticated: boolean
```

#### `CartContext.tsx` - Contexto do Carrinho
```tsx
// Função: Gerencia carrinho de compras
Funcionalidades:
- addItem(movieId, options): Adiciona filme ao carrinho
- removeItem(itemId): Remove item específico
- updateQuantity(itemId, quantity): Atualiza quantidade
- clearCart(): Limpa carrinho completo
- applyCoupon(code): Aplica cupom de desconto
- removeCoupon(code): Remove cupom aplicado
- checkout(paymentData): Processa compra

Cálculos:
- subtotal: Soma dos itens
- getTotalDiscount(): Desconto total dos cupons
- getConvenienceFee(): Taxa de conveniência
- getTotal(): Valor final com descontos e taxas

Estado Global:
- items: CartItem[]
- appliedCoupons: Coupon[]
- totalQuantity: number
```

---

### 📊 **Dados e Tipos** (`src/data/` e `src/types/`)

#### `movies.ts` - Banco de Dados de Filmes
```typescript
// Função: Dados mockados e utilitários
Conteúdo:
- MOVIES_DATABASE: Filmes atuais e próximos lançamentos
- AVAILABLE_COUPONS: Cupons de desconto disponíveis
- MOVIE_GENRES: Lista de gêneros para filtros

Utilitários (MovieDataUtils):
- getMovieById(id): Busca filme por ID
- getMoviePrice(id): Retorna preço do filme
- filterMovies(movies, filters): Aplica filtros
- getMoviesByGenre(genre): Filtra por gênero
- getFeaturedMovies(): Retorna filmes em destaque
```

#### `types/index.ts` - Definições TypeScript
```typescript
// Função: Contratos de dados da aplicação
Interfaces Principais:
- Movie: Estrutura de um filme
- CartItem: Item no carrinho
- User: Dados do usuário
- Order: Pedido de compra
- Coupon: Cupom de desconto
- Session: Sessão de cinema
- PaymentData: Dados de pagamento

Contextos:
- AuthContextType: Tipo do contexto de autenticação
- CartContextType: Tipo do contexto do carrinho
```

---

## 🔄 **Fluxos de Uso Principais**

### 1. **Visualizar Filmes**
```
Homepage → HeroSection/FeaturedMovies → MovieCard → Detalhes do Filme
```

### 2. **Fazer Login**
```
Header → Botão Login → AuthModal → Formulário → AuthContext → Estado Atualizado
```

### 3. **Adicionar ao Carrinho**
```
Página do Filme → Botão "Adicionar" → CartContext → localStorage → Header Atualizado
```

### 4. **Finalizar Compra**
```
Carrinho → Revisar Itens → Aplicar Cupons → Dados Pagamento → Checkout → AuthContext (histórico)
```

### 5. **Filtrar Filmes**
```
Página Filmes → Filtros (gênero/rating/busca) → MovieDataUtils → Resultados Atualizados
```

---

## 🎨 **Sistema de Design**

### **Cores** (Tailwind Config)
```typescript
primary: Azul (#1E3A8A - #3B82F6)
secondary: Roxo (#7C3AED - #A855F7)
gold: Dourado (#F59E0B - #FBBF24)
```

### **Responsividade**
```typescript
Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
Mobile-first approach com Tailwind CSS
```

### **Componentes Reutilizáveis**
```typescript
- MovieCard: Display padrão de filmes
- AuthModal: Modal padrão para autenticação
- Buttons: Classes btn-primary, btn-secondary
- Layouts: Grid responsivo para seções
```

---

## 🚀 **Scripts de Desenvolvimento**

```bash
# Desenvolvimento
npm run dev          # Servidor local (http://localhost:3000)

# Produção
npm run build        # Build otimizado
npm start           # Servidor de produção

# Qualidade de Código
npm run lint        # ESLint
npm run type-check  # Verificação TypeScript
```

---

## 🔧 **Tecnologias Utilizadas**

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Ícones**: React Icons
- **Estado**: Context API + localStorage
- **Imagens**: next/image (otimização automática)
- **Fonte**: Inter (Google Fonts)

---

## 🎯 **Principais Funcionalidades**

✅ **Sistema de Autenticação** (mock com localStorage)  
✅ **Catálogo de Filmes** (grid responsivo com filtros)  
✅ **Carrinho de Compras** (persistente com cupons)  
✅ **Checkout Completo** (formulário de pagamento)  
✅ **Responsive Design** (mobile-first)  
✅ **SEO Otimizado** (metadados e estrutura)  
✅ **Performance** (next/image, otimizações)  

---

## 📝 **Próximos Passos**

- [ ] Integração com API real
- [ ] Sistema de assentos interativo
- [ ] Pagamento online (Stripe/PagSeguro)
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Deploy na Vercel/Netlify