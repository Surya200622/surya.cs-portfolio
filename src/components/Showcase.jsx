import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { generateWhatsAppLink, handleWhatsApp } from '../utils/whatsapp';

const projects = [
  {
    title: "Cipher Apparel",
    tech: ["HTML", "CSS", "JS", "DJANGO"],
    problem: "Needed a futuristic, premium storefront to capture high-ticket customers.",
    solution: "Developed a stunning, dark-themed UI that drives massive engagement.",
    image: "/assets/images/Cipherapparel.png",
    demoLink: "https://cipherapparel.pythonanywhere.com/",
    buyMessage: "Hi, I want to buy the Cipher Apparel Project.",
    customMessage: "Hi, I want a custom website similar to Cipher Apparel."
  },
  {
    title: "Dental Experts",
    tech: ["HTML", "CSS", "JS", "DJANGO"],
    problem: "A clinical practice seeking a clean, trustworthy digital face.",
    solution: "Delivered a modern, smooth-scrolling experience that converts visitors to patients.",
    image: "/assets/images/Dental experts.png",
    demoLink: "https://suryacs.pythonanywhere.com/",
    buyMessage: "Hi, I want to buy the Dental Experts Project.",
    customMessage: "Hi, I want a custom website similar to Dental Experts."
  }
];

const ProjectCard = ({ project, index, scrollYProgress }) => {
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [40 + index * 20, -40 - index * 20]
  );

  return (
    <motion.div style={{ y: parallaxY }} className="h-full">
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="glass-card overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden bg-zinc-800 flex items-center justify-center p-0">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10 opacity-60"></div>
        <div className="w-full h-full text-gray-500 transition-transform duration-700 group-hover:scale-110">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => { e.target.style.display='none' }} />
        </div>
        
        <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2">
           {project.tech.map((t, i) => (
             <span key={i} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-neon-blue border border-neon-blue/30">
               {t}
             </span>
           ))}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">{project.title}</h3>
        
        <div className="mb-4">
          <span className="text-neon-purple font-semibold text-sm uppercase tracking-wider">Problem:</span>
          <p className="text-gray-400 mt-1 text-sm leading-relaxed">{project.problem}</p>
        </div>
        
        <div className="mb-8 flex-grow">
          <span className="text-neon-blue font-semibold text-sm uppercase tracking-wider">Solution:</span>
          <p className="text-gray-300 mt-1 text-sm leading-relaxed">{project.solution}</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-auto relative z-20">
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-auto text-center py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors text-sm">
            Live Demo
          </a>
          <button onClick={() => handleWhatsApp(project.buyMessage)} className="flex-auto text-center py-3 px-4 rounded-xl bg-neon-purple/20 border border-neon-purple text-white hover:bg-neon-purple hover:shadow-[0_0_15px_rgba(176,38,255,0.5)] font-medium transition-all text-sm whitespace-nowrap cursor-pointer">
            Buy Project
          </button>
          <a href={generateWhatsAppLink(project.customMessage)} target="_blank" rel="noopener noreferrer" className="flex-auto md:w-full lg:flex-auto text-center py-3 px-4 rounded-xl bg-neon-blue/20 border border-neon-blue text-white hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] font-bold transition-all text-sm whitespace-nowrap lg:min-w-[150px]">
            Customize This
          </a>
        </div>
      </div>
    </motion.div>
    </motion.div>
  );
};

const Showcase = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={containerRef} id="projects" className="py-24 relative w-full bg-zinc-950 overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Featured <span className="text-gradient">Work</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg"
            >
              A selection of my recent high-converting web applications.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-20 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-3xl overflow-hidden glass-card p-2 neon-border"
        >
          <video 
            src="/assets/videos/lv_0_20241029162047.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
          ></video>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
