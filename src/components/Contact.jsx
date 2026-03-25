import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';

const Contact = () => {
  const [projectType, setProjectType] = useState('portfolio');
  const [pages, setPages] = useState('1-5');
  const [timeline, setTimeline] = useState('flexible');

  const calculatePrice = () => {
    let base = 5000;
    if (projectType === 'ecommerce') base += 10000;
    if (projectType === 'custom') base += 15000;
    
    if (pages === '5-10') base += 3000;
    if (pages === '10+') base += 8000;

    if (timeline === 'urgent') base += 5000;

    return base.toLocaleString('en-IN');
  };

  const getQuoteMessage = () => {
    return `Hi, I used the price calculator. I need a ${projectType} website with ${pages} pages. My timeline is ${timeline}. The estimated price was ₹${calculatePrice()}. Let's discuss!`;
  };

  return (
    <section id="contact" className="py-24 relative w-full bg-zinc-950 border-t border-white/5">
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
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Ready to start your project? Get an instant estimate and reach out on WhatsApp.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Direct Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-8"
          >
            <div className="glass p-8 rounded-2xl relative group hover:border-neon-blue/40 transition-colors">
              <div className="w-14 h-14 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaWhatsapp />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400 mb-6">+91 8220 443 165</p>
              <a href={generateWhatsAppLink("Hi! I want to discuss a project.")} target="_blank" rel="noopener noreferrer" className="text-neon-blue font-bold hover:underline inline-flex items-center">
                Chat Now <span className="ml-2">→</span>
              </a>
            </div>

            <div className="glass p-8 rounded-2xl relative group hover:border-neon-purple/40 transition-colors">
              <div className="w-14 h-14 bg-neon-purple/10 rounded-full flex items-center justify-center text-neon-purple text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 mb-6">cssurya2006@gmail.com</p>
              <a href="mailto:cssurya2006@gmail.com" className="text-neon-purple font-bold hover:underline inline-flex items-center">
                Send Email <span className="ml-2">→</span>
              </a>
            </div>
          </motion.div>

          {/* Price Calculator */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3 glass p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden"
          >
             <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 relative z-10">Project Estimator</h3>
             
             <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Project Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {['portfolio', 'ecommerce', 'custom'].map(type => (
                       <button 
                         key={type}
                         onClick={() => setProjectType(type)}
                         className={`py-3 px-4 rounded-xl border transition-all font-medium capitalize outline-none focus:outline-none ${projectType === type ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                       >
                         {type}
                       </button>
                     ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Number of Pages</label>
                  <div className="grid grid-cols-3 gap-4">
                     {['1-5', '5-10', '10+'].map(num => (
                       <button 
                         key={num}
                         onClick={() => setPages(num)}
                         className={`py-3 px-4 rounded-xl border transition-all font-medium outline-none focus:outline-none ${pages === num ? 'bg-neon-purple/20 border-neon-purple text-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.3)] scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                       >
                         {num}
                       </button>
                     ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Timeline</label>
                  <div className="grid grid-cols-2 gap-4">
                     {['flexible', 'urgent'].map(time => (
                       <button 
                         key={time}
                         onClick={() => setTimeline(time)}
                         className={`py-3 px-4 rounded-xl border transition-all font-medium capitalize outline-none focus:outline-none ${timeline === time ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                       >
                         {time}
                       </button>
                     ))}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-900/50 p-6 rounded-2xl">
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Estimated Cost</p>
                    <p className="text-4xl font-extrabold text-white">₹{calculatePrice()}</p>
                  </div>
                  <a 
                    href={generateWhatsAppLink(getQuoteMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-8 py-4 bg-neon-blue text-zinc-950 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                  >
                    <FaWhatsapp className="mr-2 text-xl" /> Get This Quote
                  </a>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
