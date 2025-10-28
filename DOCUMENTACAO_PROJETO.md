# 🎬 CineMax - Documentação do Projeto

## 📋 Visão Geral
O **CineMax** é um sistema de cinema desenvolvido em **Next.js 14** com **TypeScript** e **Tailwind CSS**. A aplicação permite que usuários naveguem por filmes, assistam trailers incorporados do YouTube, ouçam trilhas sonoras temáticas, façam reservas de ingressos e gerenciem um carrinho de compras com persistência local.

### 🛠️ Tecnologias Principais
- **Next.js 14 (App Router)**: Roteamento baseado em arquivos, renderização híbrida e otimizações de build.
- **React 18 + Hooks**: Composição da interface declarativa e gerenciamento de estado local.
- **TypeScript**: Tipagem estática para interfaces de domínio (filmes, carrinho, usuários).
- **Tailwind CSS + tailwind-merge + clsx**: Estilização por utilitários, resolução de classes conflitantes e montagem condicional.
- **Context API (Auth, Cart, Audio)**: Estados globais compartilhados entre páginas e componentes.
- **Next Image/Link**: Otimização de imagens e navegação SPA.
- **React Icons**: Ícones SVG reutilizáveis.
- **localStorage**: Persistência de autenticação, carrinho e configurações de áudio.

## 🏗️ Arquitetura do Projeto

```
projeto_n1_next/
├── 📁 public/                    # Arquivos estáticos públicos
│   └── 📁 images/               # Imagens do projeto
├── 📁 src/                      # Código fonte principal
│   ├── 📁 app/                  # App Router (Next.js 14)
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── 📁 audio/            # Controles e players de trilha sonora
│   ├── 📁 context/              # Gerenciamento de estado global
│   ├── 📁 data/                 # Dados mockados e utilitários
│   └── 📁 types/                # Definições TypeScript
├── 🎵 public/mp3/               # Trilhas sonoras temáticas dos filmes
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

### 5. **Trailers e Trilhas Sonoras** (`MovieThemePlayer` & iframe YouTube)
```
Página do Filme → Botão Play → URL convertida para embed → YouTube iframe com autoplay
Página do Filme → Dados do filme → AudioContext → Trilha sonora carrega e toca → Controles globais disponíveis
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
- Providers globais (Auth + Cart + Audio)
- Estrutura HTML base
- Controles globais de áudio renderizados em todas as páginas
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
- Trailer incorporado via YouTube (embed automático)
- Horários disponíveis
- Botão "Adicionar ao Carrinho"
- Breadcrumb de navegação
- MovieThemePlayer para tocar a trilha sonora configurada no banco de dados
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

#### **Áudio** (`audio/`)

##### `AudioControls.tsx` - Controles Globais de Áudio
```tsx
// Função: Exibe player flutuante com play/pause, stop, mute e volume
- Disponível em todo o site quando há trilha sonora ativa
- Interage com o AudioContext para controlar o elemento `<audio>` global
- Usa ícones do react-icons para feedback visual
```

##### `MovieThemePlayer.tsx` - Player de Trilha por Filme
```tsx
// Função: Toca automaticamente a trilha sonora definida para cada filme
- Dispara play ao montar e stop ao desmontar a página
- Recebe configuração (src, volume, loop) diretamente dos dados do filme
- Facilita adicionar novas trilhas sem alterar a lógica da página
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

#### `AudioContext.tsx` - Contexto de Trilha Sonora
```tsx
// Função: Gerencia reprodução de áudio global
Funcionalidades:
- playMovieTheme(movieId, src, opts): garante um único `<audio>` controlado
- stopCurrentTrack(): pausa e reseta a trilha atual
- togglePlay(), toggleMute(), setVolume(): expõem controles para UI
- Persistência opcional de volume (pode ser adicionada futuramente)

Estado Global:
- currentTrackId: identifica qual filme está tocando
- isPlaying: status do player
- volume / isMuted: configuração atual de áudio
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
- AUDIO: cada filme pode definir `audio.theme`, `volume`, `loop` para habilitar trilha

Utilitários (MovieDataUtils):
- getMovieById(id): Busca filme por ID
- getMoviePrice(id): Retorna preço do filme
- filterMovies(movies, filters): Aplica filtros
- getMoviesByGenre(genre): Filtra por gênero
- getFeaturedMovies(): Retorna filmes em destaque
- getMoviesWithAudio(): Helper que centraliza filmes com trilhas configuradas
```

#### `types/index.ts` - Definições TypeScript
```typescript
// Função: Contratos de dados da aplicação
Interfaces Principais:
- Movie: Estrutura de um filme (inclui `audio?` com `theme`, `volume`, `loop`)
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

## 🎧 **Gerenciamento de Trilhas Sonoras e Trailers**

### Trilhas Sonoras
```text
1. Salve o arquivo de áudio em `public/mp3/` (ex.: `interestelar.mp3`).
2. No `movies.ts`, adicione a propriedade `audio` ao filme:
	audio: { theme: '/mp3/interestelar.mp3', volume: 0.45, loop: true }
3. Ao acessar a página do filme, o `MovieThemePlayer` monta e toca a trilha.
4. Os controles globais `AudioControls` permitem pausar/mutar o áudio em qualquer rota.
```

### Trailers do YouTube
```text
1. Defina `trailer` no filme com a URL do YouTube (aceita formatos watch, youtu.be ou embed).
2. A página de detalhes converte automaticamente para o formato embed.
3. O iframe é carregado apenas ao clicar no botão play, economizando banda.
4. Autoplay, `modestbranding` e `rel=0` já vêm configurados para uma experiência limpa.
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