'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { MOVIES_DATABASE, MOVIE_GENRES, MovieDataUtils } from '@/data/movies';
import { Movie } from '@/types';
import MovieCard from '@/components/ui/MovieCard';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES_DATABASE.current);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(MOVIES_DATABASE.current);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedRating, setSelectedRating] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const filtered = MovieDataUtils.filterMovies(movies, {
      search: searchTerm,
      genre: selectedGenre,
      rating: selectedRating
    });
    setFilteredMovies(filtered);
  }, [searchTerm, selectedGenre, selectedRating, movies]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setIsFilterOpen(false);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('Todos');
    setSelectedRating('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Filmes em <span className="text-gradient">Cartaz</span>
          </h1>
          <p className="text-lg text-gray-600">
            Descubra os melhores filmes em exibição
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar filmes..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <FaFilter />
                <span>{selectedGenre}</span>
              </button>

              {isFilterOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  {MOVIE_GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedGenre === genre ? 'bg-primary-50 text-primary-600' : ''
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div>
              <select
                value={selectedRating}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Todas as avaliações</option>
                <option value="9">9+ estrelas</option>
                <option value="8">8+ estrelas</option>
                <option value="7">7+ estrelas</option>
                <option value="6">6+ estrelas</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Mostrando {filteredMovies.length} de {movies.length} filmes
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                priority={index < 8}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaSearch className="mx-auto text-6xl mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum filme encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}