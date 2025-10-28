# 🎬 CineMax - Sistema de Cinema em Next.js

Um sistema completo de cinema desenvolvido em **Next.js 14** com **TypeScript**, migrado de JavaScript vanilla para uma arquitetura moderna e escalável.

## ✨ Principais Funcionalidades

### 🎭 Sistema de Filmes
- **Catálogo Completo**: Filmes em cartaz e próximos lançamentos
- **Filtros Avançados**: Por gênero, avaliação, busca textual
- **Detalhes do Filme**: Sinopse, elenco, trailer, informações completas
- **Sistema de Avaliações**: Ratings e reviews dos filmes

### 🎫 Sistema de Reservas
- **Programação Completa**: Visualização de horários por filme e data
- **Seleção de Sessões**: Escolha de horário, sala e quantidade de ingressos
- **Carrinho de Compras**: Gerenciamento completo de itens
- **Sistema de Cupons**: Descontos e promoções especiais

### 👤 Autenticação e Usuários
- **Login/Cadastro**: Sistema completo de autenticação
- **Perfil de Usuário**: Gerenciamento de dados pessoais
- **Histórico de Compras**: Visualização de ingressos adquiridos
- **Persistência**: Dados salvos no localStorage

### 🛒 E-commerce Completo
- **Carrinho Persistente**: Mantém itens entre sessões
- **Sistema de Cupons**: Múltiplos tipos de desconto
- **Checkout Simulado**: Processo completo de compra
- **Cálculo Automático**: Preços, impostos, taxas

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática e desenvolvimento mais seguro
- **Tailwind CSS**: Framework CSS utilitário para styling
- **React Context API**: Gerenciamento de estado global
- **React Icons**: Biblioteca de ícones extensiva

### Desenvolvimento
- **ESLint**: Linting e padronização de código
- **PostCSS**: Processamento de CSS
- **Autoprefixer**: Compatibilidade cross-browser automática

## 📁 Estrutura do Projeto

```
src/
├── app/                      # App Router (Next.js 14)
│   ├── carrinho/            # Página do carrinho
│   ├── filmes/              # Catálogo de filmes
│   │   └── [id]/           # Detalhes do filme
│   ├── programacao/         # Horários das sessões
│   ├── promocoes/           # Página de promoções
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx            # Página inicial
├── components/              # Componentes reutilizáveis
│   ├── layout/             # Componentes de layout
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   └── Footer.tsx      # Rodapé da aplicação
│   ├── modals/             # Componentes de modal
│   │   └── AuthModal.tsx   # Modal de autenticação
│   ├── sections/           # Seções da página
│   │   ├── HeroSection.tsx # Banner principal
│   │   ├── FeaturedMoviesSection.tsx
│   │   ├── UpcomingMoviesSection.tsx
│   │   └── PromotionsSection.tsx
│   └── ui/                 # Componentes de interface
│       └── MovieCard.tsx   # Card de filme
├── context/                # Context API
│   ├── AuthContext.tsx     # Contexto de autenticação
│   └── CartContext.tsx     # Contexto do carrinho
├── data/                   # Dados estáticos
│   └── movies.ts           # Database de filmes e utilitários
└── types/                  # Definições TypeScript
    └── index.ts            # Interfaces e tipos
```

## 🎨 Design e UX

### Interface Moderna
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Tema Personalizado**: Paleta de cores cinematográfica
- **Animações Suaves**: Transições e hover effects
- **Gradientes**: Efeitos visuais modernos

### Componentes Reutilizáveis
- **MovieCard**: Card de filme com informações essenciais
- **AuthModal**: Modal de login/cadastro
- **HeroSection**: Banner rotativo com filmes em destaque
- **Header/Footer**: Navegação consistente

## 📊 Sistema de Dados

### Gerenciamento de Estado
- **React Context**: Estado global para autenticação e carrinho
- **localStorage**: Persistência de dados do usuário
- **TypeScript Interfaces**: Tipagem completa dos dados

### Base de Dados (Simulada)
- **8 Filmes em Cartaz**: Com informações completas
- **4 Próximos Lançamentos**: Para seção "Em Breve"
- **Sistema de Cupons**: 5 cupons diferentes com regras específicas
- **Preços Dinâmicos**: Baseados no gênero do filme

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd cinemax-nextjs
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

## 📱 Funcionalidades por Página

### 🏠 Página Inicial
- Hero section com slider de filmes em destaque
- Seção de filmes em cartaz (6 filmes)
- Próximos lançamentos (4 filmes)
- Seção de promoções especiais

### 🎬 Catálogo de Filmes (`/filmes`)
- Lista completa de filmes em cartaz
- Filtros por gênero, avaliação e busca
- Cards informativos com rating e preço
- Navegação para detalhes do filme

### 🎯 Detalhes do Filme (`/filmes/[id]`)
- Informações completas: sinopse, elenco, diretor
- Seleção de horários e quantidade de ingressos
- Botão de compra integrado com o carrinho
- Preview de trailer (simulado)

### 📅 Programação (`/programacao`)
- Visualização de horários por filme e data
- Filtros por filme específico
- Próximos 7 dias disponíveis
- Preços e disponibilidade em tempo real

### 🛒 Carrinho (`/carrinho`)
- Gerenciamento completo de itens
- Sistema de cupons integrado
- Cálculo automático de totais
- Processo de checkout simulado

### 🎁 Promoções (`/promocoes`)
- Lista de cupons disponíveis
- Instruções de como usar
- Termos e condições
- Newsletter signup

## 🎯 Recursos Avançados

### Sistema de Cupons
```typescript
// Exemplos de cupons disponíveis
DESCONTO10: 10% de desconto geral
ESTUDANTE: 20% desconto para estudantes  
PRIMEIRA: 15% desconto primeira compra
VIP30: R$ 30 de desconto em compras acima de R$ 150
```

### Autenticação Persistente
- Login/Cadastro com validação
- Dados salvos no localStorage
- Sessão mantida entre visitas
- Histórico de compras do usuário

### Responsividade Completa
- Grid layouts adaptativos
- Menu mobile com hamburger
- Cards que se reorganizam
- Formulários mobile-friendly

## 🔐 Segurança e Validação

### Validações Implementadas
- **Formulários**: Validação client-side completa
- **Dados de Entrada**: Sanitização e verificação
- **Estados de Erro**: Tratamento de exceções
- **Feedback Visual**: Indicadores de loading e sucesso

### TypeScript
- Tipagem estática em 100% do código
- Interfaces bem definidas
- Compilação segura
- IntelliSense completo

## 🎨 Customização

### Tema Tailwind
O projeto usa um tema customizado definido em `tailwind.config.ts`:

```typescript
// Cores principais do cinema
primary: { 500: '#DC2626', 600: '#B91C1C' }
secondary: { 500: '#7C3AED', 600: '#6D28D9' }
gold: { 400: '#FBBF24', 500: '#F59E0B' }
```

### Classes Utilitárias
- `.text-gradient`: Efeito de gradiente em texto
- `.btn-primary/.btn-secondary`: Botões estilizados
- `.line-clamp-*`: Limitação de linhas de texto

## 📈 Performance

### Otimizações Implementadas
- **Next.js Image**: Otimização automática de imagens
- **Code Splitting**: Divisão automática do código
- **Static Generation**: Páginas estáticas quando possível
- **Tree Shaking**: Remoção de código não utilizado

### SEO Ready
- Metadata configurado por página
- Estrutura semântica HTML
- Open Graph tags
- Sitemap automático

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Build Manual
```bash
npm run build
npm start
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando **Next.js 14** e **TypeScript**.

---

**CineMax** - Sua experiência cinematográfica começa aqui! 🎬✨