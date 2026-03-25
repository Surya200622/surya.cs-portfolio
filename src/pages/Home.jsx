import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Showcase from '../components/Showcase';
import Workflow from '../components/Workflow';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main className="w-full flex justify-center min-h-[100vh] relative z-10 flex-col">
      <Hero />
      <Skills />
      <Services />
      <Showcase />
      <Workflow />
      <Contact />
    </main>
  );
};

export default Home;
