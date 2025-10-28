'use client';

/* -------------------------------------------------------------------------- */
/*                    Página de detalhes individuais do filme                  */
/* Exibe sinopse, trailer e permite comprar ingressos para o título escolhido. */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Dependências e dados -------------------------- */
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaStar, FaClock, FaCalendar, FaUser, FaPlay, FaTicketAlt } from 'react-icons/fa';
import { MovieDataUtils } from '@/data/movies';
import MovieThemePlayer from '@/components/audio/MovieThemePlayer';
import { useCart } from '@/context/CartContext'; 

export default function MovieDetailsPage() {
  /* ----------------------- Resolução de parâmetros e hooks ----------------- */
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  
  const movieId = parseInt(params.id as string);
  const movie = MovieDataUtils.getMovieById(movieId);
  
  /* ------------------------------ Estados locais --------------------------- */
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  /* ------------------- Conversão resiliente de URL do trailer -------------- */
  const getYouTubeEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, '');
      // youtu.be/<id>
      if (host === 'youtu.be') {
        const id = u.pathname.slice(1);
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      // youtube.com/watch?v=<id>
      if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
        if (u.pathname === '/watch') {
          const id = u.searchParams.get('v');
          return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        if (u.pathname.startsWith('/embed/')) {
          return `https://www.youtube.com${u.pathname}`;
        }
      }
      // www.youtube.com or others
      if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
        const id = u.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (host === 'youtube.com' || host === 'www.youtube.com') {
        const id = u.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (host === 'youtube.com' || host === 'www.youtube.com') {
        const id = u.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      // Fallback: try to extract v param
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    } catch {
      return null;
    }
  };

  /* ---------------------------- Fallback quando não há filme --------------- */
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Filme não encontrado</h1>
          <button
            onClick={() => router.back()}
            className="btn btn-primary"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ Ação comprar ingressos ------------------- */
  const handleBuyTickets = () => {
    if (!selectedShowtime) {
      alert('Por favor, selecione um horário');
      return;
    }

    const success = addItem(movieId, {
      showtime: selectedShowtime,
      quantity: selectedSeats,
      date: new Date().toISOString().split('T')[0],
      theater: 'Sala 1'
    });

    if (success) {
      router.push('/carrinho');
    } else {
      alert('Erro ao adicionar item ao carrinho');
    }
  };

  /* ------------------------------ Estrutura visual ------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Movie theme audio (plays if configured in movie data) */}
      {movie.audio?.theme && (
        <MovieThemePlayer
          movieId={`movie-${movie.id}`}
          src={movie.audio.theme}
          volume={movie.audio.volume ?? 0.45}
          loop={movie.audio.loop ?? true}
        />
      )}
      {/* Hero Section */}
      <div className="relative h-96 bg-black">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end space-x-6">
              <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-white pb-4">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{movie.title}</h1>
                <div className="flex items-center space-x-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-gold-400" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendar />
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Movie Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sinopse</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {movie.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gênero</h3>
                  <p className="text-gray-600">{movie.genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Diretor</h3>
                  <p className="text-gray-600">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ano</h3>
                  <p className="text-gray-600">{movie.year}</p>
                </div>
              </div>
            </div>

            {/* Cast */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Elenco Principal</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-600">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trailer */}
            {movie.trailer && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  {isTrailerPlaying && getYouTubeEmbedUrl(movie.trailer) ? (
                    <iframe
                      title={`Trailer de ${movie.title}`}
                      src={`${getYouTubeEmbedUrl(movie.trailer)}?autoplay=1&rel=0&modestbranding=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      onClick={() => setIsTrailerPlaying(true)}
                      className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-6 transition-colors"
                      aria-label="Reproduzir trailer"
                    >
                      <FaPlay className="text-2xl ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Booking */}
            {movie.isInTheater ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comprar Ingressos</h3>
                
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600">
                    R$ {movie.price.toFixed(2)}
                  </div>
                  <div className="text-gray-600">por ingresso</div>
                </div>

                {/* Showtimes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horários Disponíveis
                  </label>
                  <select
                    value={selectedShowtime}
                    onChange={(e) => setSelectedShowtime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecione um horário</option>
                    {movie.showtimes.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Seats */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade de Ingressos
                  </label>
                  <select
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} ingresso{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-primary-600">
                      R$ {(movie.price * selectedSeats).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyTickets}
                  className="w-full btn btn-primary flex items-center justify-center space-x-2"
                >
                  <FaTicketAlt />
                  <span>Comprar Ingressos</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Em Breve</h3>
                <p className="text-gray-600 mb-4">
                  Este filme ainda não está em cartaz
                </p>
                {movie.releaseDate && (
                  <p className="text-sm text-gray-500">
                    Estreia em: {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            )}

            {/* Movie Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informações</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avaliação</span>
                  <span className="font-medium">{movie.rating}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração</span>
                  <span className="font-medium">{movie.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gênero</span>
                  <span className="font-medium">{movie.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ano</span>
                  <span className="font-medium">{movie.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}