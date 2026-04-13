import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';

// --- MOCKS FOR PREVIEW ENVIRONMENT ---
// In your local project, delete the two mock functions below and uncomment your real imports.
const generateWhatsAppLink = (msg) => `https://wa.me/918220443165?text=${encodeURIComponent(msg)}`;
const Link = ({ to, className, children }) => <a href={to} className={className}>{children}</a>;

// import { generateWhatsAppLink } from '../utils/whatsapp';
// import { Link } from 'react-router-dom';
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
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (mouse.x != null && distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;

          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Flight path easing towards target
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

    function init(roleStr) {
      let newTargets = [];
      const offscreenCanvas = document.createElement('canvas');
      const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      if (offscreenCanvas.width === 0 || offscreenCanvas.height === 0) return;

      const nameStr = "SURYA.CS";

      // 1. Base Font Sizes
      let nameFontSize = Math.max(Math.min(canvas.width / 6, 100), 50);
      let roleFontSize = Math.max(Math.min(canvas.width / 12, 50), 25);

      // Scale Name if it overflows
      offscreenCtx.font = `900 ${nameFontSize}px 'Arial Black', Impact, sans-serif`;
      let nameW = offscreenCtx.measureText(nameStr).width;
      if (nameW > canvas.width * 0.9) {
        nameFontSize = nameFontSize * ((canvas.width * 0.9) / nameW);
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
      let gap = 15; // Space between Name and Role
      let totalHeight = nameFontSize + roleFontSize + gap;
      
      let nameStartY = (offscreenCanvas.height - totalHeight) / 2 + nameFontSize;
      let roleStartY = nameStartY + gap + roleFontSize;

      // 3. Draw Constant Name Line (SURYA.CS)
      offscreenCtx.font = `900 ${nameFontSize}px 'Arial Black', Impact, sans-serif`;
      let nameStartX = (offscreenCanvas.width - nameW) / 2;
      let nameGradient = offscreenCtx.createLinearGradient(nameStartX, 0, nameStartX + nameW, 0);
      nameGradient.addColorStop(0, '#00d2ff');
      nameGradient.addColorStop(1, '#b026ff');
      offscreenCtx.fillStyle = nameGradient;
      offscreenCtx.fillText(nameStr, nameStartX, nameStartY);

      // 4. Draw Dynamic Role Line Below
      offscreenCtx.font = `900 ${roleFontSize}px 'Arial Black', Impact, sans-serif`;
      let roleStartX = (offscreenCanvas.width - roleW) / 2;
      let roleGradient = offscreenCtx.createLinearGradient(roleStartX, 0, roleStartX + roleW, 0);
      roleGradient.addColorStop(0, '#b026ff'); // Reverse gradient for the role text
      roleGradient.addColorStop(1, '#00d2ff');
      offscreenCtx.fillStyle = roleGradient;
      offscreenCtx.fillText(roleStr, roleStartX, roleStartY);

      // 5. Extract Pixels
      const textCoordinates = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const step = canvas.width < 768 ? 5 : 4; 

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

      // 6. Split arrays so SURYA.CS particles DO NOT shuffle/morph
      // Everything strictly below the name's baseline belongs to the Role
      let splitIndex = newTargets.findIndex(t => t.y > nameStartY + 5);
      if (splitIndex === -1) splitIndex = newTargets.length;
      
      let nameTargets = newTargets.slice(0, splitIndex);
      let roleTargets = newTargets.slice(splitIndex);
      
      // Shuffle ONLY the role targets to create the matrix morphing effect
      roleTargets.sort(() => Math.random() - 0.5);
      
      newTargets = [...nameTargets, ...roleTargets];

      // 7. Update Particles
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
      init(texts[currentTextIndex]);
    };

    window.addEventListener('resize', handleResize);
    
    document.fonts.ready.then(() => {
      init(texts[0]);
      animate();
      
      // Setup the interval to morph the roles every 4 seconds
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
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10 cursor-crosshair" />
  );
};


// --- Main Hero Component ---
const Hero = () => {
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
  const rawRotateX = useTransform(y, [-400, 400], [12, -12]);
  const rawRotateY = useTransform(x, [-400, 400], [-12, 12]);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20, mass: 0.5 });

  const glowX = useSpring(useTransform(x, [-400, 400], [-20, 20]), { stiffness: 100, damping: 30 });
  const glowY = useSpring(useTransform(y, [-400, 400], [-20, 20]), { stiffness: 100, damping: 30 });

  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, -80]);
  const yText = useTransform(scrollY, [0, 800], [0, 60]);
  const yGlow1 = useTransform(scrollY, [0, 800], [0, -120]);
  const yGlow2 = useTransform(scrollY, [0, 800], [0, 100]);
  const scaleImage = useTransform(scrollY, [0, 600], [1, 0.92]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.6]);

  const smoothYImage = useSpring(yImage, { stiffness: 80, damping: 25 });
  const smoothYText = useSpring(yText, { stiffness: 80, damping: 25 });
  const smoothScale = useSpring(scaleImage, { stiffness: 80, damping: 25 });

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24"
    >
      <div className="absolute inset-0 z-0 bg-zinc-950"></div>

      {/* Parallax Background Glow Orbs */}
      <motion.div 
        style={{ y: yGlow1, x: glowX }}
        className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#00d2ff]/10 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        style={{ y: yGlow2, x: glowY }}
        className="absolute bottom-20 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#b026ff]/10 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            perspective: 1200, 
            y: smoothYImage,
            scale: smoothScale,
            opacity: opacityFade,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#00d2ff] neon-glow mb-10 mt-10 md:mt-0 shadow-[0_0_40px_rgba(0,240,255,0.4)] will-change-transform"
        >
          <img src="/assets/images/WhatsApp Image 2026-03-03 at 10.04.23 AM.jpeg" alt="Profile" className="w-full h-full object-cover" />
          <motion.div 
            style={{ x: glowX, y: glowY }}
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full pointer-events-none"
          />
        </motion.div>

        <motion.div style={{ y: smoothYText }} className="w-full flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-2xl p-10 md:p-16 rounded-3xl max-w-4xl w-full flex flex-col items-center mb-10"
          >
            
            {/* The Text Title Above Particles */}
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-lg"
            >
              Hello, I'm
            </motion.h2>

            {/* The Morphing 3D Particle Engine */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              // Expanded container height slightly to easily fit two rows of giant particles
              className="w-full h-[120px] sm:h-[160px] md:h-[220px] relative mb-6"
            >
              <MorphingHeroParticles />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light text-shadow text-justify"
            >
              Helping businesses grow with modern, extremely fast, and stunningly beautiful web solutions and Face swap Photos & Videos.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 w-full justify-center"
            >
              <a 
                href={generateWhatsAppLink("Hi! I want a custom high-converting website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#00d2ff] text-zinc-950 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start Project (WhatsApp)
              </a>
              <Link 
                to="/projects"
                className="px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-lg hover:border-[#b026ff] hover:text-white hover:shadow-[0_0_20px_rgba(176,38,255,0.5)] hover:bg-[#b026ff]/20 hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
