import HeroSection from '@/components/sections/HeroSection';
import FeaturedMoviesSection from '@/components/sections/FeaturedMoviesSection';
import UpcomingMoviesSection from '@/components/sections/UpcomingMoviesSection';
import PromotionsSection from '@/components/sections/PromotionsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedMoviesSection />
      <UpcomingMoviesSection />
      <PromotionsSection />
    </main>
  );
}