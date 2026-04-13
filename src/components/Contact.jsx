import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FaWhatsapp = ({ className = "" }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
  </svg>
);

const FaEnvelope = ({ className = "" }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
  </svg>
);

// Inline fallback for the WhatsApp utility to ensure the component runs independently
const generateWhatsAppLink = (message) => {
  return `https://wa.me/918220443165?text=${encodeURIComponent(message)}`;
};

const ParticleText = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    // Set canvas to parent container's size
    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || 600;
    };
    setCanvasSize();

    let particlesArray = [];
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    // Calculate mouse position relative to the canvas to fix scrolling offset issues
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
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 40) + 5;
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

      let fontSize = Math.max(Math.min(canvas.width / 8, 180), 40);
      offscreenCtx.font = `900 ${fontSize}px 'Arial Black', Impact, sans-serif`;

      const text1 = "SURYA ";
      const text2 = "CS";
      const color1 = '#b026ff';
      const color2 = '#00d2ff';

      let w1 = offscreenCtx.measureText(text1).width;
      let w2 = offscreenCtx.measureText(text2).width;
      let totalWidth = w1 + w2;

      let startX = (offscreenCanvas.width - totalWidth) / 2;
      let startY = offscreenCanvas.height / 2 + (fontSize / 3);

      offscreenCtx.fillStyle = color1;
      offscreenCtx.fillText(text1, startX, startY);

      offscreenCtx.fillStyle = color2;
      offscreenCtx.fillText(text2, startX + w1, startY);

      const textCoordinates = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const step = canvas.width < 768 ? 5 : 4;

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
      // Trail effect background
      ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen min-h-[500px] bg-[#050505] relative overflow-hidden flex justify-center items-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />
    </div>
  );
};

const Contact = () => {
  const [projectType, setProjectType] = useState('portfolio');
  const [serviceType, setServiceType] = useState('frontend');
  const [pages, setPages] = useState('1-5');
  const [timeline, setTimeline] = useState('flexible');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const getDynamicOffer = () => {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDay();

    if (day === 6) {
      return {
        title: "Saturday Special Offer",
        discountPercent: 10
      };
    }

    const monthlyOffers = {
      0: { title: "New Year Offer", discountPercent: 20 },
      1: { title: "Valentine Offer", discountPercent: 15 },
      2: { title: "March Startup Offer", discountPercent: 10 },
      3: { title: "Summer Offer", discountPercent: 12 },
      4: { title: "May Growth Offer", discountPercent: 10 },
      5: { title: "June Developer Offer", discountPercent: 15 },
      6: { title: "July Freelancer Offer", discountPercent: 10 },
      7: { title: "Independence Offer", discountPercent: 18 },
      8: { title: "September Business Offer", discountPercent: 12 },
      9: { title: "Diwali Offer", discountPercent: 20 },
      10: { title: "Festival Offer", discountPercent: 15 },
      11: { title: "Year End Offer", discountPercent: 25 }
    };

    return monthlyOffers[month] || null;
  };

  const getOfferEndDate = () => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endDate = getOfferEndDate();
      const difference = endDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPriceDetails = () => {
    let base = 0;

    if (projectType === 'portfolio') base += 5000;
    if (projectType === 'ecommerce') base += 10000;
    if (projectType === 'custom') base += 15000;

    if (serviceType === 'frontend') base += 0;
    if (serviceType === 'frontend-backend') base += 5000;
    if (serviceType === 'fullstack-live') base += 10000;

    if (pages === '5-10') base += 3000;
    if (pages === '10+') base += 8000;

    if (timeline === 'urgent') base += 5000;

    const offer = getDynamicOffer();
    let discountAmount = 0;
    let finalPrice = base;

    if (offer) {
      discountAmount = (base * offer.discountPercent) / 100;
      finalPrice = base - discountAmount;
    }

    return {
      originalPrice: base,
      discountAmount,
      finalPrice,
      formattedOriginal: base.toLocaleString('en-IN'),
      formattedDiscount: discountAmount.toLocaleString('en-IN'),
      formattedFinal: finalPrice.toLocaleString('en-IN')
    };
  };

  const getQuoteMessage = () => {
    const price = getPriceDetails();
    return `Hi, I need a ${projectType} website with ${serviceType}. Pages: ${pages}. Timeline: ${timeline}. Estimated price: ₹${price.formattedFinal}. Let's discuss!`;
  };

  const activeOffer = getDynamicOffer();
  const priceDetails = getPriceDetails();

  return (
    <>
      <section
        id="contact"
        className="py-16 md:py-20 lg:py-24 relative w-full bg-zinc-950 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00d2ff]">Talk</span>
            </motion.h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Ready to start your project? Get an instant estimate and reach out on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12">

            {/* Contact Info */}
            <div className="w-full lg:w-1/3 space-y-6 md:space-y-8">

              <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#00d2ff]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:scale-[1.02] group">
                <div className="w-14 h-14 bg-[#00d2ff]/10 rounded-full flex items-center justify-center text-[#00d2ff] text-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  <FaWhatsapp />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  WhatsApp
                </h3>

                <p className="text-gray-400 mb-6">
                  +91 8220 443 165
                </p>

                <a
                  href={generateWhatsAppLink("Hi! I want to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00d2ff] font-bold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                >
                  Chat Now →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#b026ff]/50 hover:shadow-[0_0_25px_rgba(176,38,255,0.25)] hover:scale-[1.02] group">
                <div className="w-14 h-14 bg-[#b026ff]/10 rounded-full flex items-center justify-center text-[#b026ff] text-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(176,38,255,0.5)]">
                  <FaEnvelope />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Email
                </h3>

                <p className="text-gray-400 mb-6 break-all">
                  cssurya2006@gmail.com
                </p>

                <a
                  href="mailto:cssurya2006@gmail.com"
                  className="text-[#b026ff] font-bold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]"
                >
                  Send Email →
                </a>
              </div>
            </div>

            {/* Estimator */}
            <div className="w-full lg:w-2/3 bg-white/5 backdrop-blur-md p-6 md:p-10 lg:p-12 rounded-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.08)]">
              <h3 className="text-2xl font-bold text-white mb-8">
                Project Estimator
              </h3>

              <div className="space-y-6">

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                    Project Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {['portfolio', 'ecommerce', 'custom'].map(type => (
                      <button
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`py-3 px-4 rounded-xl border transition-all ${
                          projectType === type
                            ? 'bg-[#00d2ff]/20 border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                    Service Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {['frontend', 'frontend-backend', 'fullstack-live'].map(service => (
                      <button
                        key={service}
                        onClick={() => setServiceType(service)}
                        className={`py-3 px-4 rounded-xl border transition-all ${
                          serviceType === service
                            ? 'bg-[#b026ff]/20 border-[#b026ff] text-[#b026ff] shadow-[0_0_15px_rgba(176,38,255,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {service === 'frontend'
                          ? 'Frontend'
                          : service === 'frontend-backend'
                          ? 'Frontend + Backend'
                          : 'Full Stack + Live'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                    Number of Pages
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['1-5', '5-10', '10+'].map(num => (
                      <button
                        key={num}
                        onClick={() => setPages(num)}
                        className={`py-3 px-4 rounded-xl border transition-all ${
                          pages === num
                            ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                    Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['flexible', 'urgent'].map(time => (
                      <button
                        key={time}
                        onClick={() => setTimeline(time)}
                        className={`py-3 px-4 rounded-xl border transition-all ${
                          timeline === time
                            ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offer Banner */}
                {activeOffer && (
                  <div className="p-6 rounded-2xl border border-[#00d2ff]/30 bg-[#00d2ff]/5">
                    <p className="text-[#00d2ff] font-bold text-xl mb-4">
                      🎉 {activeOffer.title} - {activeOffer.discountPercent}% OFF
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Object.entries(timeLeft).map(([label, value], index) => (
                        <motion.div
                          key={label}
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 0 10px rgba(0,240,255,0.2)',
                              '0 0 30px rgba(0,240,255,0.7)',
                              '0 0 10px rgba(0,240,255,0.2)'
                            ]
                          }}
                          whileHover={{
                            scale: 1.08,
                            boxShadow: '0 0 35px rgba(0,240,255,0.8)'
                          }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.1,
                            repeat: Infinity
                          }}
                          className="bg-white/5 border border-[#00d2ff]/30 px-5 py-4 rounded-2xl text-center"
                        >
                          <p className="text-2xl md:text-3xl font-bold text-white">
                            {value}
                          </p>
                          <p className="text-xs text-[#00d2ff] uppercase mt-1">
                            {label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <p className="text-gray-400 text-sm uppercase mb-1">
                      Estimated Cost
                    </p>
                    {activeOffer ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-gray-500 line-through text-lg">
                            ₹{priceDetails.formattedOriginal}
                          </span>
                          <span className="text-[#00d2ff] bg-[#00d2ff]/10 px-2 py-0.5 rounded text-xs font-bold border border-[#00d2ff]/20">
                            Save ₹{priceDetails.formattedDiscount}
                          </span>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold text-white">
                          ₹{priceDetails.formattedFinal}
                        </p>
                      </div>
                    ) : (
                      <p className="text-3xl md:text-4xl font-bold text-white">
                        ₹{priceDetails.formattedFinal}
                      </p>
                    )}
                  </div>

                  <a
                    href={generateWhatsAppLink(getQuoteMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-8 py-4 bg-[#00d2ff] text-zinc-950 font-bold rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <FaWhatsapp className="inline mr-2" />
                    Get This Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inserted Particle Background Section */}
      <ParticleText />
    </>
  );
};

export default Contact;
