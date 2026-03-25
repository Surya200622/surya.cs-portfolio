import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { FaCode, FaShoppingCart, FaBriefcase, FaUserTie, FaLaptopCode, FaVideo } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';

const services = [
  {
    title: "Web App Development",
    description: "Custom, scalable web applications built with React and modern tech stacks.",
    icon: <FaCode />,
    message: "Hi, I need a Custom Web Application."
  },
  {
    title: "E-commerce Websites",
    description: "High-converting online stores that turn visitors into loyal customers.",
    icon: <FaShoppingCart />,
    message: "Hi, I want to build an E-commerce website."
  },
  {
    title: "Business Websites",
    description: "Professional websites to establish your brand and generate corporate leads.",
    icon: <FaBriefcase />,
    message: "Hi, I need a website for my business."
  },
  {
    title: "Portfolio Websites",
    description: "Stunning personal portfolios to showcase your work and attract clients.",
    icon: <FaUserTie />,
    message: "Hi, I need a professional portfolio website."
  },
  {
    title: "Custom websites",
    description: "Custom websites to showcase your work and attract clients.",
    icon: <FaLaptopCode />,
    message: "Hi, I need a custom website."
  },
  {
    title: "Video Editing & Deepfakes",
    description: "Professional video editing and face swapping services for your content.",
    icon: <FaVideo />,
    message: "Hi, I need video editing / face swapping services."
  }
];

const ServiceCard = ({ service, index, scrollYProgress }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [50 + index * 15, -50 - index * 15]
  );

  return (
    <motion.div style={{ y: parallaxY }} className="h-full">
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-8 h-full flex flex-col items-start group relative overflow-hidden transform-gpu"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/10 group-hover:to-neon-purple/10 transition-all duration-500 rounded-2xl pointer-events-none" />
        
        <div className="text-4xl text-neon-blue mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
          {service.description}
        </p>
        <a 
          href={generateWhatsAppLink(service.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto px-6 py-2 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-neon-blue hover:bg-neon-blue hover:text-zinc-950 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] z-10"
        >
          Start Project
        </a>
      </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={containerRef} id="services" className="py-24 relative z-10 w-full bg-zinc-950/50 overflow-hidden">
      <motion.div style={{ y: yBg1 }} className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: yBg2 }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            My <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            I provide end-to-end digital solutions to help your business thrive online.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
