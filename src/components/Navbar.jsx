import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location]); 

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] md:w-[90%] py-4 rounded-full ${
        scrolled ? 'glass top-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'top-4 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-bold text-white tracking-widest text-shadow-sm">
          Surya<span className="text-neon-blue">.CS</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/about" className="text-gray-300 hover:text-neon-blue transition-colors text-sm uppercase tracking-wider font-semibold">About</Link>
          <Link to="/services" className="text-gray-300 hover:text-neon-blue transition-colors text-sm uppercase tracking-wider font-semibold">Services</Link>
          <Link to="/projects" className="text-gray-300 hover:text-neon-blue transition-colors text-sm uppercase tracking-wider font-semibold">Projects</Link>
          <Link to="/workflow" className="text-gray-300 hover:text-neon-blue transition-colors text-sm uppercase tracking-wider font-semibold">Workflow</Link>
        </div>
         <Link to="/#contact" className="hidden md:inline-block px-6 py-2 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-zinc-950 transition-all duration-300 font-semibold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]">Let's Talk</Link>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl focus:outline-none hover:text-neon-blue transition-colors">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-4 glass border border-white/10 rounded-2xl shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 space-y-6 text-center">
              <Link to="/about" onClick={() => setIsOpen(false)} className="text-white hover:text-neon-blue font-semibold uppercase tracking-wider text-sm transition-colors">About</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="text-white hover:text-neon-blue font-semibold uppercase tracking-wider text-sm transition-colors">Services</Link>
              <Link to="/projects" onClick={() => setIsOpen(false)} className="text-white hover:text-neon-blue font-semibold uppercase tracking-wider text-sm transition-colors">Projects</Link>
              <Link to="/workflow" onClick={() => setIsOpen(false)} className="text-white hover:text-neon-blue font-semibold uppercase tracking-wider text-sm transition-colors">Workflow</Link>
              <Link to="/#contact" onClick={() => setIsOpen(false)} className="inline-block px-6 py-3 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-zinc-950 transition-all font-semibold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)]">Let's Talk</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav> 
  );
};

export default Navbar;
