import { Movie, Coupon } from '@/types';

export const MOVIES_DATABASE = {
  current: [
    {
      id: 1,
      title: "Vingadores: Ultimato",
      genre: "Ação",
      duration: "181 min",
      rating: 8.4,
      poster: "/images/ultimato.svg",
      description: "Os heróis mais poderosos da Terra enfrentam o Thanos em uma batalha épica pelo destino do universo.",
      year: 2019,
      director: "Anthony Russo, Joe Russo",
      cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Scarlett Johansson"],
      trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      showtimes: ["14:00", "17:30", "21:00"],
      price: 25.00,
      isInTheater: true,
      audio: {
        theme: "/mp3/vingadores_ultimato.mp3",
        volume: 0.45,
        loop: true
      }
    },
    {
      id: 2,
      title: "Interestelar",
      genre: "Ficção Científica",
      duration: "169 min",
      rating: 8.6,
      poster: "/images/interestelar.svg",
      description: "Um grupo de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.",
      year: 2014,
      director: "Christopher Nolan",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      showtimes: ["15:30", "19:00", "22:30"],
      price: 25.00,
      isInTheater: true,
      audio: {
        theme: "/mp3/interestelar.mp3",
        volume: 0.45,
        loop: true
      }
    },
    {
      id: 3,
      title: "Pantera Negra",
      genre: "Ação",
      duration: "134 min",
      rating: 7.3,
      poster: "/images/pantera.svg",
      description: "T'Challa retorna para casa para a isolada e tecnologicamente avançada nação africana de Wakanda para servir como novo líder de seu país.",
      year: 2018,
      director: "Ryan Coogler",
      cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
      trailer: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
      showtimes: ["16:00", "19:30", "22:45"],
      price: 25.00,
      isInTheater: true,
      audio: {
        theme: "/mp3/pantera_negra.mp3",
        volume: 0.45,
        loop: true
      }
    },
    {
      id: 4,
      title: "Matrix Resurrections",
      genre: "Ficção Científica",
      duration: "148 min",
      rating: 5.7,
      poster: "/images/matrix.svg",
      description: "Neo vive uma vida aparentemente comum sob sua identidade original como Thomas A. Anderson em San Francisco.",
      year: 2021,
      director: "Lana Wachowski",
      cast: ["Keanu Reeves", "Carrie-Anne Moss", "Yahya Abdul-Mateen II"],
      trailer: "https://www.youtube.com/watch?v=9ix7TUGVYIo",
      showtimes: ["14:30", "18:00", "21:30"],
      price: 25.00,
      isInTheater: true
    },
    {
      id: 5,
      title: "Duna",
      genre: "Ficção Científica",
      duration: "155 min",
      rating: 8.0,
      poster: "/images/duna.svg",
      description: "Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino além de sua compreensão, deve viajar para o planeta mais perigoso do universo.",
      year: 2021,
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
      trailer: "https://www.youtube.com/watch?v=n9xhJrPXop4",
      showtimes: ["15:00", "18:30", "22:00"],
      price: 25.00,
      isInTheater: true
    },
    {
      id: 6,
      title: "Homem-Aranha: Sem Volta Para Casa",
      genre: "Ação",
      duration: "148 min",
      rating: 8.2,
      poster: "/images/homem_aranha.svg",
      description: "Peter Parker busca a ajuda do Doutor Estranho para fazer com que sua identidade secreta seja esquecida novamente.",
      year: 2021,
      director: "Jon Watts",
      cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
      trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
      showtimes: ["14:15", "17:45", "21:15"],
      price: 25.00,
      isInTheater: true
    },
    {
      id: 7,
      title: "Top Gun: Maverick",
      genre: "Ação",
      duration: "131 min",
      rating: 8.3,
      poster: "/images/top_gun.svg",
      description: "Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete 'Maverick' Mitchell está de volta.",
      year: 2022,
      director: "Joseph Kosinski",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
      trailer: "https://www.youtube.com/watch?v=qSqVVswa420",
      showtimes: ["16:30", "20:00", "23:00"],
      price: 25.00,
      isInTheater: true
    },
    {
      id: 8,
      title: "Doutor Estranho no Multiverso da Loucura",
      genre: "Ação",
      duration: "126 min",
      rating: 6.9,
      poster: "/images/doutor_estranho.svg",
      description: "O Doutor Estranho desperta o Multiverso e, com a ajuda de aliados místicos tanto antigos quanto novos, atravessa as realidades alternativas.",
      year: 2022,
      director: "Sam Raimi",
      cast: ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor"],
      trailer: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
      showtimes: ["15:45", "18:45", "21:45"],
      price: 25.00,
      isInTheater: true
    }
  ] as Movie[],
  
  upcoming: [
    {
      id: 9,
      title: "Avatar: O Caminho da Água 2",
      genre: "Ficção Científica",
      duration: "190 min",
      rating: 0,
      poster: "/images/avatar.svg",
      description: "Jake Sully e Ney'tiri continuam sua jornada épica em Pandora com novas aventuras aquáticas.",
      year: 2025,
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      releaseDate: "2025-12-15",
      showtimes: [],
      price: 25.00,
      isInTheater: false
    },
    {
      id: 10,
      title: "Thor: Love and Thunder 2",
      genre: "Ação",
      duration: "125 min",
      rating: 0,
      poster: "/images/thor.svg",
      description: "Thor embarca em uma nova jornada cósmica com Jane Foster como a Poderosa Thor.",
      year: 2025,
      director: "Taika Waititi",
      cast: ["Chris Hemsworth", "Natalie Portman", "Tessa Thompson"],
      releaseDate: "2025-11-08",
      showtimes: [],
      price: 25.00,
      isInTheater: false
    },
    {
      id: 11,
      title: "Guardiões da Galáxia Vol. 4",
      genre: "Ação",
      duration: "140 min",
      rating: 0,
      poster: "/images/galaxia.svg",
      description: "Os Guardiões enfrentam novos desafios cósmicos em uma aventura emocionante.",
      year: 2025,
      director: "James Gunn",
      cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
      releaseDate: "2025-10-20",
      showtimes: [],
      price: 25.00,
      isInTheater: false
    },
    {
      id: 12,
      title: "Blade Runner 2099",
      genre: "Ficção Científica",
      duration: "150 min",
      rating: 0,
      poster: "/images/blade_runner.svg",
      description: "Uma nova história no universo Blade Runner, explorando o futuro da humanidade.",
      year: 2025,
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Ana de Armas", "Jared Leto"],
      releaseDate: "2025-09-15",
      showtimes: [],
      price: 25.00,
      isInTheater: false
    }
  ] as Movie[]
};

export const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'DESCONTO10': { code: 'DESCONTO10', type: 'percentage', value: 10, description: '10% de desconto' },
  'PRIMEIRA': { code: 'PRIMEIRA', type: 'percentage', value: 15, description: '15% desconto primeira compra' },
  'ESTUDANTE': { code: 'ESTUDANTE', type: 'percentage', value: 20, description: '20% desconto estudante' },
  'VIP30': { code: 'VIP30', type: 'fixed', value: 30.00, description: 'R$ 30 de desconto' },
  'FRETE': { code: 'FRETE', type: 'percentage', value: 0, description: 'Taxa de conveniência grátis' }
};

export const MOVIE_GENRES = [
  'Todos',
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Ficção Científica',
  'Terror',
  'Thriller',
  'Romance',
  'Animação'
];

export const MovieDataUtils = {
  getMovieById: (id: number): Movie | undefined => {
    return [...MOVIES_DATABASE.current, ...MOVIES_DATABASE.upcoming].find(movie => movie.id === id);
  },
  
  getMoviePrice: (id: number): number => {
    const movie = MovieDataUtils.getMovieById(id);
    return movie?.price || 25.00;
  },
  
  filterMovies: (movies: Movie[], filters: { genre?: string; rating?: string; search?: string }) => {
    return movies.filter(movie => {
      const genreMatch = !filters.genre || filters.genre === 'Todos' || movie.genre === filters.genre;
      const ratingMatch = !filters.rating || filters.rating === 'all' || movie.rating >= parseFloat(filters.rating);
      const searchMatch = !filters.search || 
        movie.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        movie.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return genreMatch && ratingMatch && searchMatch;
    });
  },
  
  getMoviesByGenre: (genre: string): Movie[] => {
    if (genre === 'Todos') return MOVIES_DATABASE.current;
    return MOVIES_DATABASE.current.filter(movie => movie.genre === genre);
  },
  
  getUpcomingMovies: (): Movie[] => {
    return MOVIES_DATABASE.upcoming;
  },
  
  getFeaturedMovies: (): Movie[] => {
    // Retorna filmes em destaque (com rating alto)
    return MOVIES_DATABASE.current.filter(movie => movie.rating >= 8.0).slice(0, 5);
  }
};