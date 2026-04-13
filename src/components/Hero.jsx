import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

// --- MOCKS FOR PREVIEW ENVIRONMENT ---
// In your local project, replace these with your actual imports:
import { generateWhatsAppLink } from '../utils/whatsapp';
import { Link } from 'react-router-dom';
const generateWhatsAppLink = (msg) => `https://wa.me/918220443165?text=${encodeURIComponent(msg)}`;
const Link = ({ to, className, children }) => <a href={to} className={className}>{children}</a>;
// -------------------------------------

// --- 3D Morphing Particle Text Component ---
const MorphingHeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let morphInterval;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    setCanvasSize();

    let particlesArray = [];
    let currentTextIndex = 0;
    
    // The words the particles will morph into (Sub-roles)
    const texts = ["FULL STACK DEVELOPER", "FACE SWAP", "VIDEO EDITOR"];

    const mouse = {
      x: null,
      y: null,
      radius: 120 // Interaction radius
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
        
        // Dynamic size based on screen width for the "3D bubbly" density
        let baseSize = canvas.width < 768 ? 1 : 1.5;
        this.size = Math.random() * 2.5 + baseSize; 
        
        this.density = (Math.random() * 30) + 10;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.04 + 0.01;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Organic wandering motion (elliptical 3D feel)
        this.angle += this.angleSpeed;
        let wanderX = Math.cos(this.angle) * 1.5;
        let wanderY = Math.sin(this.angle * 0.8) * 1.5;
        let targetX = this.baseX + wanderX;
        let targetY = this.baseY + wanderY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (mouse.x != null && distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;

          // Stronger push force for massive particles
          let directionX = forceDirectionX * force * this.density * 1.2;
          let directionY = forceDirectionY * force * this.density * 1.2;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Smooth spring-like flight path to morphing targets
          this.x += (targetX - this.x) * 0.08;
          this.y += (targetY - this.y) * 0.08;
        }
      }
    }

    function init(roleStr) {
      let newTargets = [];
      const offscreenCanvas = document.createElement('canvas');
      const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      if (offscreenCanvas.width === 0 || offscreenCanvas.height === 0) return;

      // 1. Text Setup (Changed to match Image 1 exactly)
      const nameStr = "SURYA CS";

      // Larger font sizes for the massive 3D look
      let nameFontSize = Math.max(Math.min(canvas.width / 4.5, 180), 60);
      let roleFontSize = Math.max(Math.min(canvas.width / 10, 60), 22);

      // Scale Name if it overflows
      offscreenCtx.font = `900 ${nameFontSize}px 'Arial Black', Impact, sans-serif`;
      let nameW = offscreenCtx.measureText(nameStr).width;
      if (nameW > canvas.width * 0.95) {
        nameFontSize = nameFontSize * ((canvas.width * 0.95) / nameW);
        offscreenCtx.font = `900 ${nameFontSize}px 'Arial Black', Impact, sans-serif`;
        nameW = offscreenCtx.measureText(nameStr).width;
      }

      // Scale Role if it overflows
      offscreenCtx.font = `900 ${roleFontSize}px 'Arial Black', Impact, sans-serif`;
      let roleW = offscreenCtx.measureText(roleStr).width;
      if (roleW > canvas.width * 0.9) {
        roleFontSize = roleFontSize * ((canvas.width * 0.9) / roleW);
        offscreenCtx.font = `900 ${roleFontSize}px 'Arial Black', Impact, sans-serif`;
        roleW = offscreenCtx.measureText(roleStr).width;
      }

      // 2. Layout Calculation
      let gap = canvas.width < 768 ? 15 : 30; // Space between Name and Role
      let totalHeight = nameFontSize + roleFontSize + gap;
      
      let nameStartY = (offscreenCanvas.height - totalHeight) / 2 + nameFontSize;
      let roleStartY = nameStartY + gap + roleFontSize;

      // 3. Draw Constant Name Line (SURYA CS) with sharp Pink/Cyan split
      offscreenCtx.font = `900 ${nameFontSize}px 'Arial Black', Impact, sans-serif`;
      let nameStartX = (offscreenCanvas.width - nameW) / 2;
      let nameGradient = offscreenCtx.createLinearGradient(nameStartX, 0, nameStartX + nameW, 0);
      
      // The sharp split exactly like Image 1 (Pink for SURYA, Cyan for CS)
      nameGradient.addColorStop(0, '#e81cff');       // Vibrant Pink
      nameGradient.addColorStop(0.64, '#e81cff');    // Sharp stop
      nameGradient.addColorStop(0.67, '#00d2ff');    // Sharp start cyan
      nameGradient.addColorStop(1, '#00d2ff');       // Cyan

      offscreenCtx.fillStyle = nameGradient;
      offscreenCtx.fillText(nameStr, nameStartX, nameStartY);

      // 4. Draw Dynamic Role Line Below (Cyan to Pink smooth gradient)
      offscreenCtx.font = `900 ${roleFontSize}px 'Arial Black', Impact, sans-serif`;
      let roleStartX = (offscreenCanvas.width - roleW) / 2;
      let roleGradient = offscreenCtx.createLinearGradient(roleStartX, 0, roleStartX + roleW, 0);
      roleGradient.addColorStop(0, '#00d2ff'); 
      roleGradient.addColorStop(1, '#e81cff');
      offscreenCtx.fillStyle = roleGradient;
      offscreenCtx.fillText(roleStr, roleStartX, roleStartY);

      // 5. Extract Pixels (Lower step = Higher density 3D particles)
      const textCoordinates = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const step = canvas.width < 768 ? 4 : 3; 

      for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
          const alphaIndex = (y * 4 * textCoordinates.width) + (x * 4) + 3;
          if (textCoordinates.data[alphaIndex] > 128) {
            let r = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4)];
            let g = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 1];
            let b = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 2];
            newTargets.push({x, y, color: `rgb(${r}, ${g}, ${b})`});
          }
        }
      }

      // 6. Split arrays so "SURYA CS" particles DO NOT shuffle/morph
      // Everything strictly below the name's baseline belongs to the Role
      let splitIndex = newTargets.findIndex(t => t.y > nameStartY + (gap / 2));
      if (splitIndex === -1) splitIndex = newTargets.length;
      
      let nameTargets = newTargets.slice(0, splitIndex);
      let roleTargets = newTargets.slice(splitIndex);
      
      // Shuffle ONLY the role targets to create the matrix morphing effect
      roleTargets.sort(() => Math.random() - 0.5);
      
      newTargets = [...nameTargets, ...roleTargets];

      // 7. Update Particles Array smoothly
      for(let i=0; i < newTargets.length; i++) {
        if(i < particlesArray.length) {
            particlesArray[i].baseX = newTargets[i].x;
            particlesArray[i].baseY = newTargets[i].y;
            particlesArray[i].color = newTargets[i].color;
        } else {
            let p = new Particle(Math.random() * canvas.width, Math.random() * canvas.height, newTargets[i].color);
            p.baseX = newTargets[i].x;
            p.baseY = newTargets[i].y;
            particlesArray.push(p);
        }
      }
      
      // Trim excess particles if the new word is shorter
      if (particlesArray.length > newTargets.length) {
          particlesArray.splice(newTargets.length);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Using source-over to keep particles opaque, making them look like 3D bubbles
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      setCanvasSize();
      init(texts[currentTextIndex]);
    };

    window.addEventListener('resize', handleResize);
    
    document.fonts.ready.then(() => {
      init(texts[0]);
      animate();
      
      // Morph roles every 4 seconds
      morphInterval = setInterval(() => {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        init(texts[currentTextIndex]);
      }, 4000);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(morphInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10 cursor-crosshair touch-none" />
  );
};


// --- Main Hero Component ---
export default function Hero() {
  const sectionRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX - rect.width / 2);
    y.set(mouseY - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Smooth spring-based mouse tilt
  const rawRotateX = useTransform(y, [-400, 400], [10, -10]);
  const rawRotateY = useTransform(x, [-400, 400], [-10, 10]);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20, mass: 0.5 });

  const glowX = useSpring(useTransform(x, [-400, 400], [-30, 30]), { stiffness: 100, damping: 30 });
  const glowY = useSpring(useTransform(y, [-400, 400], [-30, 30]), { stiffness: 100, damping: 30 });

  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, -80]);
  const yText = useTransform(scrollY, [0, 800], [0, 60]);
  const yGlow1 = useTransform(scrollY, [0, 800], [0, -150]);
  const yGlow2 = useTransform(scrollY, [0, 800], [0, 150]);
  const scaleImage = useTransform(scrollY, [0, 600], [1, 0.92]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.4]);

  const smoothYImage = useSpring(yImage, { stiffness: 80, damping: 25 });
  const smoothYText = useSpring(yText, { stiffness: 80, damping: 25 });
  const smoothScale = useSpring(scaleImage, { stiffness: 80, damping: 25 });

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 bg-[#050505] text-white font-sans selection:bg-[#e81cff] selection:text-white"
    >
      {/* Absolute dark overlay to ensure deep blacks */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black"></div>

      {/* Parallax Background Glow Orbs */}
      <motion.div 
        style={{ y: yGlow1, x: glowX }}
        className="absolute top-10 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#e81cff]/15 rounded-full blur-[140px] pointer-events-none z-0"
      />
      <motion.div 
        style={{ y: yGlow2, x: glowY }}
        className="absolute bottom-10 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#00d2ff]/15 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Profile Image (Kept your structure, added fallback for preview) */}
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            perspective: 1200, 
            y: smoothYImage,
            scale: smoothScale,
            opacity: opacityFade,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-[3px] border-[#00d2ff]/60 mb-8 sm:mb-12 shadow-[0_0_50px_rgba(0,210,255,0.25)] will-change-transform z-30 group"
        >
          <img 
            src="/assets/images/WhatsApp Image 2026-03-03 at 10.04.23 AM.jpeg" 
            alt="Profile" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <motion.div 
            style={{ x: glowX, y: glowY }}
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none"
          />
        </motion.div>

        {/* Content Container */}
        <motion.div style={{ y: smoothYText }} className="w-full flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-10 md:p-14 rounded-[2rem] max-w-5xl w-full flex flex-col items-center mb-10"
          >
            
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 text-zinc-100 tracking-wide"
            >
              Hello, I'm
            </motion.h2>

            {/* The Morphing 3D Particle Engine - Taller height to accommodate huge text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[400px] relative mb-4 sm:mb-8"
            >
              <MorphingHeroParticles />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed px-4 text-center"
            >
              Helping businesses grow with modern, extremely fast, and stunningly beautiful web solutions alongside Face swap Photos & Videos.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center px-4"
            >
              <a 
                href={generateWhatsAppLink("Hi! I want a custom high-converting website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00d2ff] to-[#00a2ff] text-black font-bold rounded-full text-base sm:text-lg shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Project 
                <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <Link 
                to="/projects"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full text-base sm:text-lg hover:border-[#e81cff]/50 hover:text-white hover:shadow-[0_0_25px_rgba(232,28,255,0.3)] hover:bg-[#e81cff]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
