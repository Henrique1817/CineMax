'use client';

import Link from 'next/link';
import { MOVIES_DATABASE } from '@/data/movies';
import MovieCard from '@/components/ui/MovieCard';

export default function UpcomingMoviesSection() {
  const upcomingMovies = MOVIES_DATABASE.upcoming.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Próximos <span className="text-gradient">Lançamentos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fique por dentro dos filmes que estão chegando em breve
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {upcomingMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              priority={false}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/em-breve" 
            className="btn btn-secondary inline-flex items-center space-x-2 text-lg py-3 px-8"
          >
            <span>Ver Todos os Lançamentos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}