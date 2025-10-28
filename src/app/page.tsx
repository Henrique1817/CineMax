/* -------------------------------------------------------------------------- */
/*                               Página inicial                               */
/* Composição das seções principais exibidas logo na entrada do app.           */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Blocos de conteúdo ---------------------------- */
import HeroSection from '@/components/sections/HeroSection';
import FeaturedMoviesSection from '@/components/sections/FeaturedMoviesSection';
import UpcomingMoviesSection from '@/components/sections/UpcomingMoviesSection';
import PromotionsSection from '@/components/sections/PromotionsSection';

export default function Home() {
  /* ---------------------- Organização das seções na home --------------------- */
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedMoviesSection />
      <UpcomingMoviesSection />
      <PromotionsSection />
    </main>
  );
}