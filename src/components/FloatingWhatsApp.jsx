import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={generateWhatsAppLink("Hi I want a website")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] flex items-center justify-center group"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="text-4xl" />
      <span className="absolute right-full mr-4 bg-zinc-900 border border-white/10 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Chat with me
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
