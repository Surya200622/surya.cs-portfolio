// import { motion } from 'framer-motion';

// const testimonials = [
//   { name: "Sarah L.", role: "E-Commerce Founder", text: "The new website literally doubled my conversion rate in a month." },
//   { name: "James D.", role: "CEO at SaaS Co", text: "Incredibly fast turnaround and pixel-perfect design." },
//   { name: "Emily R.", role: "Digital Agency", text: "The 3D animations are stunning. My clients are always impressed." }
// ];

// const Testimonials = () => {
//   return (
//     <section className="py-24 relative w-full bg-zinc-950/50">
//       <div className="max-w-7xl mx-auto px-6 overflow-hidden">
//         <div className="text-center mb-16">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl font-bold text-white mb-4"
//           >
//             Client <span className="text-gradient">Love</span>
//           </motion.h2>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
//           {testimonials.map((t, idx) => (
//             <motion.div 
//               key={idx}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.2 }}
//               className="glass p-8 rounded-2xl flex-1 border border-white/5 relative group hover:border-neon-purple/50 transition-colors"
//             >
//                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>
//                <div className="mt-auto pt-6 border-t border-white/10">
//                  <h4 className="font-bold text-white text-lg">{t.name}</h4>
//                  <span className="text-sm text-neon-purple font-semibold uppercase tracking-widest">{t.role}</span>
//                </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
