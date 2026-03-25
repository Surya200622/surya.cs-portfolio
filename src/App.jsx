import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';
import ParticlesBg from './components/ParticlesBg';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Workflow from './components/Workflow';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-zinc-950 font-sans text-white md:cursor-none flex flex-col">
        <CustomCursor />
        <ParticlesBg />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Showcase />} />
            <Route path="/workflow" element={<Workflow />} />
          </Routes>
        </div>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
