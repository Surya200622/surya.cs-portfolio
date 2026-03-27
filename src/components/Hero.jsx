import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { Link } from 'react-router-dom';

const roles = [
  "A Full Stack Python Developer.",
  "A Face Swap Photo & Video Editor.",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 500;

const Hero = () => {
  const sectionRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Typing effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing, pause then start deleting
        timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeout = setTimeout(() => {}, PAUSE_AFTER_DELETING);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

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

  // Smooth spring-based mouse tilt (dampened for natural feel)
  const rawRotateX = useTransform(y, [-400, 400], [12, -12]);
  const rawRotateY = useTransform(x, [-400, 400], [-12, 12]);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20, mass: 0.5 });

  // Mouse-reactive glow shift
  const glowX = useSpring(useTransform(x, [-400, 400], [-20, 20]), { stiffness: 100, damping: 30 });
  const glowY = useSpring(useTransform(y, [-400, 400], [-20, 20]), { stiffness: 100, damping: 30 });

  // Scroll-based parallax with gentle, layered speeds
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, -80]);
  const yText = useTransform(scrollY, [0, 800], [0, 60]);
  const yGlow1 = useTransform(scrollY, [0, 800], [0, -120]);
  const yGlow2 = useTransform(scrollY, [0, 800], [0, 100]);
  const scaleImage = useTransform(scrollY, [0, 600], [1, 0.92]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.6]);

  // Smooth the scroll transforms with springs
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
        className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-blue/8 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        style={{ y: yGlow2, x: glowY }}
        className="absolute bottom-20 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-neon-purple/8 rounded-full blur-[100px] pointer-events-none z-0"
      />

      {/* Glassmorphism Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Profile Image with smooth spring tilt + scroll parallax + floating animation */}
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            perspective: 1200, 
            y: smoothYImage,
            scale: smoothScale,
            opacity: opacityFade,
          }}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neon-blue neon-glow mb-10 mt-10 md:mt-0 shadow-[0_0_40px_rgba(0,240,255,0.4)] will-change-transform"
        >
          <img src="/assets/images/WhatsApp Image 2026-03-03 at 10.04.23 AM.jpeg" alt="Profile" className="w-full h-full object-cover" />
          
          {/* Inner shine that moves with mouse */}
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
            className="glass-card p-10 md:p-16 max-w-4xl w-full flex flex-col items-center mb-10"
          >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white leading-tight drop-shadow-2xl"
          >
            Hello, <span className="text-gradient">I'm Surya.CS</span><br/>
            <span className="relative block min-h-[1.5em] w-full">
              <span className="invisible block">
                A Face Swap Photo & Video Editor.
              </span>
              <span className="absolute left-0 top-0 w-full text-center text-gradient break-words">
                {displayText}
                <span className="animate-pulse text-neon-blue">|</span>
              </span>
            </span>
          </motion.h1>
          
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
              className="px-8 py-4 bg-neon-blue text-zinc-950 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Start Project (WhatsApp)
            </a>
            <Link 
              to="/projects"
              className="px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-lg hover:border-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(176,38,255,0.5)] hover:bg-neon-purple/20 hover:scale-105 transition-all duration-300 flex items-center justify-center"
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
