import { Navbar } from '@/components/layout';
import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Skills } from '@/sections/skills';
import { Projects } from '@/sections/projects';
import { Journey } from '@/sections/journey';
import { Resume } from '@/sections/resume';
import { Contact } from '@/sections/contact';
import { Footer } from '@/sections/footer';
import { LoadingScreen } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <main id="home" className="relative overflow-hidden">
      {/* Global ambient effects */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Resume />
      <Contact />
      <Footer />
    </main>
    </>
  );
}
