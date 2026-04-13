import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 py-12 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-neon-purple tracking-widest mb-4">SURYA<span className="text-neon-blue">.CS</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed">Building high-converting digital experiences with modern web technologies. Transforming ideas into reality.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#services" className="hover:text-neon-blue transition-colors">Services</a></li>
            <li><a href="#projects" className="hover:text-neon-blue transition-colors">Projects</a></li>
            <li><a href="#workflow" className="hover:text-neon-blue transition-colors">Client Workflow</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/Surya200622" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-blue/20 hover:border-neon-blue border border-transparent transition-all"><FaGithub className="text-xl"/></a>
            <a href="https://www.linkedin.com/in/suryacs22/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-blue/20 hover:border-neon-blue border border-transparent transition-all"><FaLinkedin className="text-xl"/></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Surya.CS  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
