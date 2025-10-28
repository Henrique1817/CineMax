'use client';

/* -------------------------------------------------------------------------- */
/*                         Carrossel hero da página inicial                    */
/* Faz rotação automática de filmes em destaque e exibe CTA principais.        */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Dependências e dados -------------------------- */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MovieDataUtils } from '@/data/movies';

export default function HeroSection() {
  /* ------------------------------ Estados locais --------------------------- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMovies = MovieDataUtils.getFeaturedMovies();

  /* --------------------------- Rotação automática ------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  /* ----------------------------- Navegação manual ------------------------- */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  /* ----------------------------- Tratamento vazio ------------------------- */
  if (featuredMovies.length === 0) {
    return (
      <section className="h-96 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Carregando filmes...</h2>
          <p>Por favor, aguarde.</p>
        </div>
      </section>
    );
  }

  const currentMovie = featuredMovies[currentSlide];

  /* ---------------------------- Layout principal -------------------------- */
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{ backgroundImage: `url(${currentMovie.poster})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Category */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentMovie.genre}
              </span>
              <span className="text-gold-400 font-medium">
                ★ {currentMovie.rating}/10
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentMovie.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-6 max-w-xl leading-relaxed">
              {currentMovie.description}
            </p>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-8">
              <span className="flex items-center">
                <strong className="mr-2">Duração:</strong> {currentMovie.duration}
              </span>
              <span className="flex items-center">
                <strong className="mr-2">Gênero:</strong> {currentMovie.genre}
              </span>
              <span className="flex items-center">
                <strong className="mr-2">Diretor:</strong> {currentMovie.director}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/filmes/${currentMovie.id}`}
                className="btn btn-primary inline-flex items-center justify-center space-x-2 text-lg py-3 px-8"
              >
                <FaPlay />
                <span>Assistir Trailer</span>
              </Link>
              <Link
                href="/programacao"
                className="btn btn-secondary inline-flex items-center justify-center space-x-2 text-lg py-3 px-8"
              >
                <span>Ver Horários</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {featuredMovies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-primary-500 scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}