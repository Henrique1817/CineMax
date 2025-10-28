'use client';

/* -------------------------------------------------------------------------- */
/*                         Sessão de filmes em destaque                        */
/* Lista primeiros títulos em cartaz e oferece acesso rápido à vitrine.        */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Dependências e dados -------------------------- */
import Link from 'next/link';
import { MOVIES_DATABASE } from '@/data/movies';
import MovieCard from '@/components/ui/MovieCard';

export default function FeaturedMoviesSection() {
  /* --------------------------- Seleção de filmes ativos ------------------- */
  const featuredMovies = MOVIES_DATABASE.current.slice(0, 6);

  /* ------------------------------ Renderização UI ------------------------- */
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Filmes em <span className="text-gradient">Cartaz</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira os filmes que estão sendo exibidos em nossos cinemas
          </p>
        </div>

        {/* Movies Grid */}
        {/* Bloco de cada video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredMovies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              priority={index < 3}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/filmes" 
            className="btn btn-primary inline-flex items-center space-x-2 text-lg py-3 px-8"
          >
            <span>Ver Todos os Filmes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}