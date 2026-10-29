import { Navbar } from '@/components/layout';
import { DevelopingIntro } from '@/components/fx/developing-intro';
import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Skills } from '@/sections/skills';
import { Projects } from '@/sections/projects';
import { Journey } from '@/sections/journey';
import { Resume } from '@/sections/resume';
import { Contact } from '@/sections/contact';
import { Footer } from '@/sections/footer';

export default function HomePage() {
  return (
    <>
      <DevelopingIntro />
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
