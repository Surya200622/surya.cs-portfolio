import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass } from 'lucide-react';
import Skills from '../components/Skills';

// --- Custom Hook to detect Mobile/Tablet ---
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

// --- 3D Morphing Particle Text Component ---
const ParticleHeading = () => {
  const canvasRef = useRef(null);
  
  // Detect screen size
  const windowWidth = useWindowWidth();
  const isMobileOrTablet = windowWidth < 1024;

  useEffect(() => {
    // Skip heavy particle logic entirely on mobile/tablet
    if (isMobileOrTablet) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    setCanvasSize();

    let particlesArray = [];
    const mouse = {
      x: null,
      y: null,
      radius: 100 // Interaction radius
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleTouchMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      constructor(x, y, color) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = x;
        this.baseY = y;
        this.color = color;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 5;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.05 + 0.01;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.angle += this.angleSpeed;
        let wanderX = Math.cos(this.angle) * 1.5;
        let wanderY = Math.sin(this.angle) * 1.5;
        let targetX = this.baseX + wanderX;
        let targetY = this.baseY + wanderY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        
        // LAG FIX: Calculate distance squared first
        let distanceSq = dx * dx + dy * dy;
        let radiusSq = mouse.radius * mouse.radius;

        if (mouse.x != null && distanceSq < radiusSq) {
          let distance = Math.sqrt(distanceSq);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;

          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== targetX) {
            let dx = this.x - targetX;
            this.x -= dx / 15;
          }
          if (this.y !== targetY) {
            let dy = this.y - targetY;
            this.y -= dy / 15;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      const offscreenCanvas = document.createElement('canvas');
      const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      if (offscreenCanvas.width === 0 || offscreenCanvas.height === 0) return;

      const text1 = "About ";
      const text2 = "Our Journey";

      let fontSize = 100;
      offscreenCtx.font = `900 ${fontSize}px 'Arial Black', Impact, sans-serif`;

      let w1 = offscreenCtx.measureText(text1).width;
      let w2 = offscreenCtx.measureText(text2).width;

      // Desktop Layout: Single line, dynamically scaled to never cut off
      let totalWidth = w1 + w2;
      let desktopMaxWidth = canvas.width * 0.85; // Leave 15% safety margin
      if (totalWidth > desktopMaxWidth) {
        fontSize = fontSize * (desktopMaxWidth / totalWidth);
        offscreenCtx.font = `900 ${fontSize}px 'Arial Black', Impact, sans-serif`;
        w1 = offscreenCtx.measureText(text1).width;
        w2 = offscreenCtx.measureText(text2).width;
        totalWidth = w1 + w2;
      }

      let startX = (offscreenCanvas.width - totalWidth) / 2;
      let startY = offscreenCanvas.height / 2 + (fontSize / 3);

      // Dark Zinc Color for "About" to match request
      offscreenCtx.fillStyle = '#52525b'; 
      offscreenCtx.fillText(text1, startX, startY);

      let gradient = offscreenCtx.createLinearGradient(startX + w1, 0, startX + totalWidth, 0);
      gradient.addColorStop(0, '#00d2ff'); // Neon Blue
      gradient.addColorStop(1, '#b026ff'); // Neon Purple

      offscreenCtx.fillStyle = gradient;
      offscreenCtx.fillText(text2, startX + w1, startY);

      const textCoordinates = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const step = 4; // High density mapping

      for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
          const alphaIndex = (y * 4 * textCoordinates.width) + (x * 4) + 3;
          if (textCoordinates.data[alphaIndex] > 128) {
            let r = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4)];
            let g = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 1];
            let b = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 2];
            particlesArray.push(new Particle(x, y, `rgb(${r}, ${g}, ${b})`));
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    window.addEventListener('resize', handleResize);
    
    document.fonts.ready.then(() => {
      init();
      animate();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileOrTablet]);

  // --- MOBILE / TABLET RENDER ---
  if (isMobileOrTablet) {
    return (
      <div className="w-full flex justify-center items-center h-[200px] sm:h-[250px] relative z-20">
        <h1 className="text-[3rem] sm:text-[4.5rem] font-['Arial_Black',Impact,sans-serif] uppercase tracking-tighter flex flex-col items-center leading-[1.1] drop-shadow-lg">
          <span className="text-zinc-500 flex items-center gap-3">
            <Compass className="w-8 h-8 sm:w-12 sm:h-12 text-[#00d2ff] animate-pulse" /> 
            About
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e81cff] via-[#b026ff] to-[#00d2ff] drop-shadow-[0_0_25px_rgba(232,28,255,0.4)]">
            Our Journey
          </span>
        </h1>
      </div>
    );
  }

  // --- DESKTOP RENDER ---
  return (
    <div className="w-full h-[250px] md:h-[200px] relative mb-6">
      <h1 className="sr-only">About Our Journey</h1>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10 cursor-crosshair" />
    </div>
  );
};

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

  const { scrollYProgress: collageProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };

  const rawYText = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const yText = useSpring(rawYText, springConfig);

  const rawYBg1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawYBg2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yBg1 = useSpring(rawYBg1, { stiffness: 40, damping: 25 });
  const yBg2 = useSpring(rawYBg2, { stiffness: 40, damping: 25 });

  const rawYImg1 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [60, -80]);
  const rawYImg2 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [-40, 100]);
  const rawYImg3 = useTransform(collageProgress, [0, 1], isMobile ? [0, 0] : [80, -100]);
  const yImg1 = useSpring(rawYImg1, springConfig);
  const yImg2 = useSpring(rawYImg2, springConfig);
  const yImg3 = useSpring(rawYImg3, springConfig);

  const rotateImg1 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [2, 0, -2]);
  const rotateImg2 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-4, -2, 0]);
  const rotateImg3 = useTransform(collageProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [3, 1, -1]);

  const scaleImg1 = useTransform(collageProgress, [0.1, 0.4, 0.8], isMobile ? [1, 1, 1] : [0.9, 1.02, 0.98]);
  const smoothScaleImg1 = useSpring(scaleImg1, springConfig);

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
      
      {/* Background Glowing Orbs */}
      <motion.div style={{ y: yBg1 }} className="absolute top-40 left-10 md:left-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#00d2ff]/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: yBg2 }} className="absolute bottom-40 right-10 md:right-40 w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-[#b026ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-40 pb-32 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          style={{ y: yText }} 
          className="text-center mb-24 md:mb-40 z-30 px-4 w-full"
        >
          {/* Responsive Heading Component */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full drop-shadow-2xl"
          >
            <ParticleHeading />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mt-4"
          >
            I'm Surya, a full-stack developer with a passion for building beautiful, user-friendly web applications and I am always looking for new challenges to tackle.
            I don't just build websites. I craft digital experiences. Every pixel, every animation, every line of code is designed to leave a lasting impression.
          </motion.p>
        </motion.div>

        {/* Dynamic Collage Section */}
        <div ref={collageRef} className="relative w-full max-w-5xl h-[900px] md:h-[800px] flex items-center justify-center">
          
          {/* Top Left Image */}
          <motion.div 
            style={{ y: yImg2, rotate: rotateImg2 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="absolute z-10 w-[75%] md:w-[350px] top-4 md:top-0 left-2 md:left-10"
          >
            <div className="bg-zinc-900/30 backdrop-blur-md p-2 rounded-3xl border border-[#b026ff]/40 transform rotate-0 md:-rotate-6 hover:rotate-0 transition-all duration-500 shadow-[0_0_40px_rgba(176,38,255,0.15)]">
              <img src="/assets/images/WhatsApp Image 2025-11-25 at 20.07.24_74456a06.jpg" alt="Artistic Profile" className="w-full h-auto rounded-2xl object-cover opacity-90 hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-zinc-800/80 backdrop-blur-xl px-5 py-2 rounded-xl border border-[#b026ff]/20">
              <p className="text-white font-bold tracking-widest text-xs md:text-sm">VISIONARY</p>
            </div>
          </motion.div>

          {/* Center Main Image */}
          <motion.div 
            style={{ y: yImg1, rotate: rotateImg1, scale: smoothScaleImg1 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="absolute z-30 w-[85%] md:w-[450px] top-[280px] md:top-auto left-1/2 -translate-x-1/2 md:-translate-x-1/2 md:left-1/2"
          >
            <div className="bg-zinc-900/40 backdrop-blur-xl p-2 md:p-3 rounded-3xl border border-[#00d2ff]/40 transform hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(0,240,255,0.25)]">
              <img src="/assets/images/WhatsApp Image 2026-03-03 at 10.04.23 AM.jpeg" alt="Surya Profile" className="w-full h-auto rounded-2xl object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 md:-right-8 bg-zinc-900/80 backdrop-blur-xl px-6 py-3 rounded-2xl border flex items-center gap-3 border-[#00d2ff]/40 shadow-xl">
              <span className="w-3 h-3 bg-[#00d2ff] rounded-full animate-pulse"></span>
              <p className="text-[#00d2ff] font-bold tracking-widest text-sm md:text-base">DEVELOPER</p>
            </div>
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div 
            style={{ y: yImg3, rotate: rotateImg3 }} 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="absolute z-20 w-[75%] md:w-[400px] bottom-0 md:-bottom-20 right-2 md:right-0"
          >
            <div className="bg-zinc-900/60 backdrop-blur-lg p-2 rounded-3xl border border-white/20 transform rotate-0 md:rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
              <img src="/assets/images/aifaceswap-1b7f5fe5feca730d7ec0009fcdcc80c6.jpg" alt="Casual Profile" className="w-full h-[200px] md:h-[350px] rounded-2xl object-cover" />
            </div>
            <div className="absolute -top-6 right-10 bg-zinc-800/80 backdrop-blur-xl px-6 py-2 rounded-xl border border-white/10 shadow-lg">
              <p className="text-white font-bold tracking-widest text-xs md:text-sm">CREATOR</p>
            </div>
          </motion.div>
          
        </div>

        {/* Closing text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-40 md:mt-52 text-center z-30 px-4"
        >
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to create <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00d2ff]">Magic?</span>
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
