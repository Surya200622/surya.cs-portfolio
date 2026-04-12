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

    // Saturday offer
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

    // Project Type
    if (projectType === 'portfolio') base += 5000;
    if (projectType === 'ecommerce') base += 10000;
    if (projectType === 'custom') base += 15000;

    // Service Type
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
    return `Hi, I used the price calculator. I need a ${projectType} website with ${serviceType}. Pages: ${pages}. Timeline: ${timeline}. Estimated price: ₹${calculatePrice()}. Let's discuss!`;
  };

  return (
    <section
      id="contact"
      className="py-24 relative w-full bg-zinc-950 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's <span className="text-gradient">Talk</span>
          </motion.h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start your project? Get an instant estimate and reach out on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400 mb-6">+91 8220 443 165</p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 mb-6">cssurya2006@gmail.com</p>
            </div>
          </div>

          {/* Estimator */}
          <div className="lg:w-2/3 glass p-8 md:p-12 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">
              Project Estimator
            </h3>

            <div className="space-y-6">

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                  Project Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['portfolio', 'ecommerce', 'custom'].map(type => (
                    <button
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`py-3 px-4 rounded-xl border ${
                        projectType === type
                          ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                          : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase">
                  Service Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    'frontend',
                    'frontend-backend',
                    'fullstack-live'
                  ].map(service => (
                    <button
                      key={service}
                      onClick={() => setServiceType(service)}
                      className={`py-3 px-4 rounded-xl border ${
                        serviceType === service
                          ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                          : 'bg-white/5 border-white/10 text-gray-400'
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
                <div className="grid grid-cols-3 gap-4">
                  {['1-5', '5-10', '10+'].map(num => (
                    <button
                      key={num}
                      onClick={() => setPages(num)}
                      className={`py-3 px-4 rounded-xl border ${
                        pages === num
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-white/5 border-white/10 text-gray-400'
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
                <div className="grid grid-cols-2 gap-4">
                  {['flexible', 'urgent'].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimeline(time)}
                      className={`py-3 px-4 rounded-xl border ${
                        timeline === time
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Offer Banner */}
              {getDynamicOffer() && (
                <div className="p-6 rounded-2xl border border-neon-blue/30 bg-neon-blue/5">
                  <p className="text-neon-blue font-bold text-xl mb-4">
                    🎉 {getDynamicOffer().title}
                  </p>

                  <div className="flex gap-4 flex-wrap">
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
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1,
                          repeat: Infinity
                        }}
                        className="bg-white/5 border border-neon-blue/30 px-5 py-4 rounded-2xl min-w-[90px] text-center"
                      >
                        <p className="text-3xl font-bold text-white">
                          {value}
                        </p>
                        <p className="text-xs text-neon-blue uppercase mt-1">
                          {label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm uppercase">
                    Estimated Cost
                  </p>
                  <p className="text-4xl font-bold text-white">
                    ₹{calculatePrice()}
                  </p>
                </div>

                <a
                  href={generateWhatsAppLink(getQuoteMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-neon-blue text-zinc-950 font-bold rounded-full"
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
  );
};

export default Contact;
