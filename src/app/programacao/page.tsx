'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaClock, FaStar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MOVIES_DATABASE, MovieDataUtils } from '@/data/movies';

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const selectedMovieId = searchParams.get('filme');
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(
    selectedMovieId ? parseInt(selectedMovieId) : null
  );
  
  const moviesInTheater = MOVIES_DATABASE.current.filter(movie => movie.isInTheater);
  
  // Gerar próximos 7 dias
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Horários padrão para exibição
  const showtimes = ['14:00', '16:30', '19:00', '21:30'];

  const filteredMovies = selectedMovie 
    ? moviesInTheater.filter(movie => movie.id === selectedMovie)
    : moviesInTheater;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Programação do <span className="text-gradient">Cinema</span>
          </h1>
          <p className="text-lg text-gray-600">
            Confira os horários dos filmes em cartaz
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Movie Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Filme
              </label>
              <select
                value={selectedMovie || ''}
                onChange={(e) => setSelectedMovie(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos os filmes</option>
                {moviesInTheater.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dates.map((date) => (
                  <option key={date.toISOString()} value={date.toISOString().split('T')[0]}>
                    {date.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      day: '2-digit', 
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-48 rounded-lg overflow-hidden">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {movie.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-gold-400" />
                          <span>{movie.rating}/10</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock />
                          <span>{movie.duration}</span>
                        </div>
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {movie.genre}
                        </span>
                        <span className="bg-primary-100 px-2 py-1 rounded-full text-primary-700">
                          Livre
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {movie.description}
                    </p>

                    {/* Showtimes */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Horários - {new Date(selectedDate).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          day: '2-digit', 
                          month: '2-digit'
                        })}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {showtimes.map((time) => (
                          <div key={time} className="border border-gray-200 rounded-lg p-4">
                            <div className="text-center mb-3">
                              <div className="text-xl font-bold text-primary-600 mb-1">
                                {time}
                              </div>
                              <div className="flex items-center justify-center text-sm text-gray-600">
                                <FaMapMarkerAlt className="mr-1" />
                                Sala 1
                              </div>
                            </div>
                            
                            <div className="text-center mb-3">
                              <div className="text-lg font-bold text-gray-900">
                                R$ {movie.price.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500">por ingresso</div>
                            </div>
                            
                            <Link
                              href={`/filmes/${movie.id}?horario=${time}&data=${selectedDate}`}
                              className="block btn btn-primary text-sm py-2 text-center"
                            >
                              Comprar
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMovies.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaCalendarAlt className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma sessão encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Não há sessões disponíveis para os filtros selecionados
            </p>
            <button
              onClick={() => {
                setSelectedMovie(null);
                setSelectedDate(new Date().toISOString().split('T')[0]);
              }}
              className="btn btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white p-6 mt-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Informações Importantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Política de Cancelamento:</strong> Cancelamentos gratuitos até 2h antes da sessão
              </div>
              <div>
                <strong>Chegada:</strong> Recomendamos chegar 30min antes do horário da sessão
              </div>
              <div>
                <strong>Desconto Estudante:</strong> Apresente carteirinha e ganhe 20% de desconto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}