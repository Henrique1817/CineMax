'use client';

/* -------------------------------------------------------------------------- */
/*                          Cartão individual de filme                         */
/* Renderiza capa, metadados e ações rápidas para cada item na vitrine.        */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Dependências UI ----------------------------- */
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaClock, FaPlay } from 'react-icons/fa';
import { Movie } from '@/types';

/* ------------------------------- Tipagem local ------------------------------ */
interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

/* -------------------------- Componente principal --------------------------- */
export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  /* ---------------------- Estrutura visual do cartão ----------------------- */
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={`Poster do filme ${movie.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={priority}
        />
        
        {/* Overlay with Play Button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Link
              href={`/filmes/${movie.id}`}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-colors"
            >
              <FaPlay className="text-xl ml-1" />
            </Link>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md flex items-center space-x-1 text-sm">
          <FaStar className="text-gold-400 text-xs" />
          <span className="font-medium">{movie.rating}</span>
        </div>

        {/* Age Rating Badge */}
        <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-bold">
          Livre
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {movie.title}
        </h3>

        {/* Genre and Duration */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {Array.isArray(movie.genre) ? movie.genre[0] : movie.genre}
          </span>
          <div className="flex items-center space-x-1">
            <FaClock className="text-xs" />
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Synopsis */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            href={`/filmes/${movie.id}`}
            className="block btn btn-primary text-center text-sm py-2"
          >
            Ver Detalhes
          </Link>
          
          {movie.isInTheater && (
            <Link
              href={`/programacao?filme=${movie.id}`}
              className="block btn btn-secondary text-center text-sm py-2"
            >
              Ver Horários
            </Link>
          )}
        </div>

        {/* Price (if in theater) */}
        {movie.isInTheater && (
          <div className="mt-3 text-center">
            <span className="text-lg font-bold text-primary-600">
              A partir de R$ {movie.price.toFixed(2)}
            </span>
          </div>
        )}

        {/* Coming Soon Badge */}
        {!movie.isInTheater && (
          <div className="mt-3 text-center">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Em Breve
            </span>
          </div>
        )}
      </div>
    </div>
  );
}