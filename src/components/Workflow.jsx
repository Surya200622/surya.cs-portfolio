import { motion } from 'framer-motion';
import { FaWhatsapp, FaComments, FaDesktop, FaCreditCard, FaRocket } from 'react-icons/fa';

const steps = [
  { icon: <FaWhatsapp />, title: "Message on WhatsApp", desc: "Reach out via WhatsApp to discuss your project idea." },
  { icon: <FaComments />, title: "Discuss Requirements", desc: "We'll hop on a quick call or chat to define the scope." },
  { icon: <FaDesktop />, title: "Get a Demo", desc: "Review the initial design prototype and provide feedback." },
  { icon: <FaCreditCard />, title: "Payment", desc: "Secure payment processing to kick off final development." },
  { icon: <FaRocket />, title: "Delivery", desc: "Your high-converting web app is launched and ready." }
];

const Workflow = () => {
  return (
    <section id="workflow" className="py-24 relative w-full bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Client <span className="text-gradient">Workflow</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            A simple, transparent process from idea to launch.
          </motion.p>
        </div>

        <div className="relative border-l-2 border-neon-blue/20 md:border-transparent">
          {/* Vertical Line Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-neon-blue opacity-30 rounded-full"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex items-center justify-between w-full mb-16 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="hidden md:block w-5/12"></div>
              
              <div className="absolute left-[-17px] md:left-1/2 md:transform md:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-zinc-900 border-2 border-neon-blue rounded-full z-10 flex items-center justify-center text-neon-blue text-lg md:text-2xl shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                {step.icon}
              </div>
              
              <div className={`w-full md:w-5/12 glass-card p-6 md:p-8 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right text-left'} ml-8 md:ml-0 group hover:scale-[1.02] transition-transform duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-r hover:from-neon-blue/10 hover:to-neon-purple/10 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors relative z-10">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 relative z-10">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
