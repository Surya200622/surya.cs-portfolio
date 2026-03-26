import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Skills from '../components/Skills';

const AboutUs = () => {
  const containerRef = useRef(null);
  const collageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Collage-specific scroll progress for tighter control
  const { scrollYProgress: collageProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"]
  });

  // Spring config for smooth, natural motion
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };

  // Header parallax — gentle float
  const rawYText = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const yText = useSpring(rawYText, springConfig);

  // Background orbs — subtle drift, different speeds for depth
  const rawYBg1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawYBg2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yBg1 = useSpring(rawYBg1, { stiffness: 40, damping: 25 });
  const yBg2 = useSpring(rawYBg2, { stiffness: 40, damping: 25 });

  // Image parallax — controlled ranges, different speeds per layer for depth
  // On mobile, disable transforms for clear image display
  const rawYImg1 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [60, -80]);
  const rawYImg2 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [-40, 100]);
  const rawYImg3 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [80, -100]);
  const yImg1 = useSpring(rawYImg1, springConfig);
  const yImg2 = useSpring(rawYImg2, springConfig);
  const yImg3 = useSpring(rawYImg3, springConfig);

  // Rotation on scroll — disabled on mobile for clarity
  const rotateImg1 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [2, 0, -2]);
  const rotateImg2 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-4, -2, 0]);
  const rotateImg3 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [3, 1, -1]);

  // Scale — disabled on mobile for clarity
  const scaleImg1 = useTransform(collageProgress, [0.1, 0.4, 0.8], isMobile ? [1, 1, 1] : [0.9, 1.02, 0.98]);
  const smoothScaleImg1 = useSpring(scaleImg1, springConfig);



  // Staggered reveal variants
  const revealVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  };

  return (
    <div className="w-full bg-zinc-950 px-6 min-h-[150vh] relative overflow-hidden" ref={containerRef}>
      
      {/* Background Glowing Orbs — smooth drift */}
      <motion.div style={{ y: yBg1 }} className="absolute top-40 left-10 md:left-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: yBg2 }} className="absolute bottom-40 right-10 md:right-40 w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-40 pb-32 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          style={{ y: yText }} 
          className="text-center mb-24 md:mb-40 z-30 px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight text-white drop-shadow-2xl"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Our Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            I'm Surya, a full-stack developer with a passion for building beautiful, user-friendly web applications and I am always looking for new challenges to tackle.
            I don't just build websites. I craft digital experiences. Every pixel, every animation, every line of code is designed to leave a lasting impression.
          </motion.p>
        </motion.div>

        {/* Dynamic Collage Section */}
        <div ref={collageRef} className="relative w-full max-w-5xl h-[900px] md:h-[800px] flex items-center justify-center">
          
          {/* Top Left Image — medium layer speed + scroll rotation */}
          <motion.div 
            style={{ y: yImg2, rotate: rotateImg2 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="absolute z-10 w-[75%] md:w-[350px] top-4 md:top-0 left-2 md:left-10"
          >
            <div className="glass p-2 rounded-3xl border border-neon-purple/40 transform rotate-0 md:-rotate-6 hover:rotate-0 transition-all duration-500 shadow-[0_0_40px_rgba(176,38,255,0.15)] bg-zinc-900/30 backdrop-blur-md">
              <img src="/assets/images/WhatsApp Image 2025-11-25 at 20.07.24_74456a06.jpg" alt="Artistic Profile" className="w-full h-auto rounded-2xl object-cover opacity-90 hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-left-8 glass px-5 py-2 rounded-xl border border-neon-purple/20 backdrop-blur-xl bg-zinc-800/80">
              <p className="text-white font-bold tracking-widest text-xs md:text-sm">VISIONARY</p>
            </div>
          </motion.div>

          {/* Center Main Image — slowest layer + scale pulse + scroll rotation */}
          <motion.div 
            style={{ y: yImg1, rotate: rotateImg1, scale: smoothScaleImg1 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="absolute z-30 w-[85%] md:w-[450px] top-[280px] md:top-auto left-1/2 -translate-x-1/2 md:-translate-x-1/2 md:left-1/2"
          >
            <div className="glass p-2 md:p-3 rounded-3xl neon-border transform hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-zinc-900/40 backdrop-blur-xl">
              <img src="/assets/images/WhatsApp Image 2026-03-03 at 10.04.23 AM.jpeg" alt="Surya Profile" className="w-full h-auto rounded-2xl object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 md:-right-8 glass px-6 py-3 rounded-2xl border flex items-center gap-3 border-neon-blue/40 backdrop-blur-xl shadow-xl">
              <span className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></span>
              <p className="text-neon-blue font-bold tracking-widest text-sm md:text-base">DEVELOPER</p>
            </div>
          </motion.div>

          {/* Bottom Right Image — fastest layer + scroll rotation */}
          <motion.div 
            style={{ y: yImg3, rotate: rotateImg3 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="absolute z-20 w-[75%] md:w-[400px] bottom-0 md:-bottom-20 right-2 md:right-0"
          >
            <div className="glass p-2 rounded-3xl border border-white/20 transform rotate-0 md:rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl bg-zinc-900/60 backdrop-blur-lg">
              <img src="/assets/images/aifaceswap-1b7f5fe5feca730d7ec0009fcdcc80c6.jpg" alt="Casual Profile" className="w-full h-[200px] md:h-[350px] rounded-2xl object-cover" />
            </div>
            <div className="absolute -top-6 right-10 glass px-6 py-2 rounded-xl border border-white/10 backdrop-blur-xl bg-zinc-800/80 shadow-lg">
              <p className="text-white font-bold tracking-widest text-xs md:text-sm">CREATOR</p>
            </div>
          </motion.div>
          
        </div>

        {/* Closing text — smooth reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-40 md:mt-52 text-center z-30 px-4"
        >
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to create <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Magic?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">Combining aesthetics with performance to deliver products that don't just look good, but perform exceptionally.</p>
        </motion.div>

      </div>
      <div className="relative z-20 pb-20 w-screen left-1/2 -translate-x-1/2">
        <Skills />
      </div>
    </div>
  )
}

export default AboutUs;
