import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaNodeJs, FaReact, FaPython } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';

const skillsRow1 = [
  { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
  { name: 'JavaScript', icon: FaJsSquare, color: 'text-yellow-400' },
  { name: 'Bootstrap', icon: FaBootstrap, color: 'text-purple-500' },
];

const skillsRow2 = [
  { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Python', icon: FaPython, color: 'text-blue-400' },
  { name: 'Django', icon: SiDjango, color: 'text-green-600' },
];

const Skills = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dramatic horizontal scroll linked to vertical page scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section ref={containerRef} className="py-24 relative w-full overflow-hidden bg-zinc-950/50 border-y border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Skills</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8 relative z-10 w-full">
        {/* Row 1 moving Left */}
        <motion.div style={{ x: x1 }} className="flex gap-6 md:gap-10 w-max whitespace-nowrap px-10">
          {[...skillsRow1, ...skillsRow2, ...skillsRow1, ...skillsRow2].map((skill, index) => (
            <div key={index} className="flex items-center gap-4 glass px-8 py-5 rounded-full border border-white/10 hover:border-neon-blue/50 transition-colors shadow-lg hover:shadow-neon-blue/20">
              <skill.icon className={`text-4xl md:text-5xl drop-shadow-md ${skill.color}`} />
              <span className="text-xl md:text-2xl font-bold text-gray-200 tracking-wide">{skill.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Row 2 moving Right */}
        <motion.div style={{ x: x2 }} className="flex gap-6 md:gap-10 w-max whitespace-nowrap px-10">
          {[...skillsRow2, ...skillsRow1, ...skillsRow2, ...skillsRow1].map((skill, index) => (
            <div key={index} className="flex items-center gap-4 glass px-8 py-5 rounded-full border border-white/10 hover:border-neon-purple/50 transition-colors shadow-lg hover:shadow-neon-purple/20">
              <skill.icon className={`text-4xl md:text-5xl drop-shadow-md ${skill.color}`} />
              <span className="text-xl md:text-2xl font-bold text-gray-200 tracking-wide">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
