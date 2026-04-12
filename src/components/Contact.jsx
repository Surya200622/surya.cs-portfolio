import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';

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

  const calculatePrice = () => {
    let base = 0;

    // Project type
    if (projectType === 'portfolio') base += 5000;
    if (projectType === 'ecommerce') base += 10000;
    if (projectType === 'custom') base += 15000;

    // Service type
    if (serviceType === 'frontend') base += 0;
    if (serviceType === 'frontend-backend') base += 5000;
    if (serviceType === 'fullstack-live') base += 10000;

    // Pages
    if (pages === '5-10') base += 3000;
    if (pages === '10+') base += 8000;

    // Timeline
    if (timeline === 'urgent') base += 5000;

    // Offer
    const offer = getDynamicOffer();

    if (offer) {
      base -= (base * offer.discountPercent) / 100;
    }

    return base.toLocaleString('en-IN');
  };

  const getQuoteMessage = () => {
    return `Hi, I need a ${projectType} website with ${serviceType}, ${pages} pages, ${timeline} timeline. Estimated cost: ₹${calculatePrice()}`;
  };

  return (
    <section
      id="contact"
      className="py-24 relative w-full bg-zinc-950 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Talk</span>
          </h2>
        </div>

        <div className="glass p-8 md:p-12 rounded-2xl border border-white/10">

          {/* Offer Banner */}
          {getDynamicOffer() && (
            <div className="mb-8 p-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-md">
              <p className="text-cyan-300 font-bold text-xl mb-2">
                🎉 {getDynamicOffer().title}
              </p>

              <p className="text-gray-300 text-sm mb-4">
                {getDynamicOffer().discountPercent}% OFF ends in
              </p>

              <div className="flex gap-4 flex-wrap">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 10px rgba(0,240,255,0.2)',
                        '0 0 30px rgba(0,240,255,0.7)',
                        '0 0 10px rgba(0,240,255,0.2)'
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1,
                      repeat: Infinity
                    }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: '0 0 35px rgba(0,240,255,0.8)'
                    }}
                    className="bg-white/5 border border-cyan-400/30 px-5 py-4 rounded-2xl text-center min-w-[90px]"
                  >
                    <p className="text-3xl font-extrabold text-white">
                      {item.value}
                    </p>
                    <p className="text-xs text-cyan-300 uppercase mt-1">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Cost */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Estimated Cost
            </p>

            <p className="text-4xl font-extrabold text-white">
              ₹{calculatePrice()}
            </p>

            <a
              href={generateWhatsAppLink(getQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center px-8 py-4 bg-cyan-400 text-zinc-950 font-bold rounded-full"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              Get This Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

