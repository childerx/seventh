import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, Shield, Clock, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import planeAir from '@/assets/images/plane-air.jpg';
import planeCargo1 from '@/assets/images/plane-cargo1.jpg';
import planeCargo2 from '@/assets/images/plane-cargo2.jpg';
import container from '@/assets/images/container.jpg';
import { useTheme } from '@/context/theme-context';
import Modal from '@/components/core/modal';

const features = [
  {
    title: "Fast Delivery",
    icon: <Truck className="w-7 h-7" />,
    description: "3 working days from UK to Ghana with our efficient freight service and streamlined logistics network.",
    image: planeAir,
    detail: "Our Fast Delivery service leverages a strategically optimized supply chain spanning two continents. With dedicated air freight routes operating six days per week between London Heathrow and Kotoka International Airport in Accra, we guarantee a transit time of just 3 working days for all shipments. Our proprietary sorting and routing technology ensures your cargo travels along the most direct path with minimal handling, reducing the risk of delays. Real-time customs pre-clearance in both the UK and Ghana further accelerates the process, making Seventh Air the premier choice for time-sensitive freight between Europe and West Africa.",
  },
  {
    title: "Secure Shipping",
    icon: <Shield className="w-7 h-7" />,
    description: "Full insurance coverage and maximum security handling throughout the entire journey.",
    image: planeCargo1,
    detail: "Security is the cornerstone of Seventh Air's shipping philosophy. Every consignment is covered by our comprehensive insurance policy, underwritten by Lloyd's of London, providing full indemnity against loss, damage, or theft from collection to delivery. Our warehousing facilities employ 24/7 CCTV surveillance, biometric access control, and tamper-evident sealing protocols. During transit, all cargo is secured within ULD (Unit Load Device) containers that are tracked at every waypoint. Our security-cleared personnel handle each package with rigorous chain-of-custody procedures, ensuring an unbroken audit trail from sender to recipient.",
  },
  {
    title: "Real-time Tracking",
    icon: <Clock className="w-7 h-7" />,
    description: "Advanced tracking system with instant updates on your shipment's location and status.",
    image: planeCargo2,
    detail: "Seventh Air's tracking infrastructure represents the cutting edge of logistics technology. Each shipment is assigned a unique digital identifier linked to our IoT-enabled tracking network, which integrates GPS geolocation, RFID scanning, and environmental sensors monitoring temperature, humidity, and shock. Customers access a dedicated dashboard providing a live map view, milestone notifications via SMS and email, and predictive ETA calculations powered by machine learning algorithms that account for weather patterns, air traffic, and customs processing times. The system also generates automated compliance documentation for regulatory authorities in both jurisdictions.",
  },
  {
    title: "Global Coverage",
    icon: <Globe className="w-7 h-7" />,
    description: "Seamless UK-Ghana shipping with full customs support and regulatory compliance.",
    image: container,
    detail: "Beyond our core UK-Ghana corridor, Seventh Air maintains a network of strategic partnerships with major freight carriers, customs brokers, and last-mile delivery providers across six continents. Our in-house customs team comprises licensed brokers certified by both HMRC and the Ghana Revenue Authority, ensuring your shipments navigate import/export regulations flawlessly. We handle all documentation electronically — including Certificates of Origin, ATA Carnets, and commercial invoices — eliminating paperwork bottlenecks. Whether your cargo requires temperature-controlled transport, hazardous material handling, or oversized freight solutions, our global coverage infrastructure scales to meet your requirements with precision and compliance.",
  },
];

const SeventhAirFeatures = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const openModal = (feature: typeof features[0]) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 80, damping: 15 } }
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ background: isDark ? '#0f172a' : '#f8fafc' }}>
      {/* Thread background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="thread-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="thread-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <motion.path d="M 0 200 Q 400 100, 800 200 T 1600 200 L 1920 200" stroke="url(#thread-grad-1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, ease: "easeOut" }} />
          <motion.path d="M 0 400 Q 400 500, 800 400 T 1600 400 L 1920 400" stroke="url(#thread-grad-2)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.3, ease: "easeOut" }} />
          <motion.path d="M 0 600 Q 400 700, 800 600 T 1600 600 L 1920 600" stroke="url(#thread-grad-1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.6, ease: "easeOut" }} />
          <motion.path d="M 0 800 Q 400 900, 800 800 T 1600 800 L 1920 800" stroke="url(#thread-grad-2)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.9, ease: "easeOut" }} />
          <motion.path d="M 300 0 Q 250 540, 300 1080" stroke="url(#thread-grad-1)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 1.2, ease: "easeOut" }} />
          <motion.path d="M 1620 0 Q 1670 540, 1620 1080" stroke="url(#thread-grad-2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 1.5, ease: "easeOut" }} />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="tracking-[0.06em]" style={{ color: 'var(--text-primary)' }}>Features Of Our</span><br />
            <span
              className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
                animation: 'shimmer 4s ease-in-out infinite',
                WebkitTextStroke: isDark ? '1px rgba(59,130,246,0.3)' : '1px rgba(30,64,175,0.15)',
              }}
            >Logistics Solution</span>
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>Comprehensive cargo services tailored for UK-Ghana shipping</p>
        </motion.div>

        <div className="relative">
          <button onClick={() => setActiveCard((p) => (p === 0 ? 3 : p - 1))} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-12 z-20 p-2 lg:p-3 rounded-full shadow-lg transition-all hover:scale-110" style={{ background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}` }}>
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: 'var(--text-primary)' }} />
          </button>
          
          <button onClick={() => setActiveCard((p) => (p === 3 ? 0 : p + 1))} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-12 z-20 p-2 lg:p-3 rounded-full shadow-lg transition-all hover:scale-110" style={{ background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}` }}>
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: 'var(--text-primary)' }} />
          </button>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {features.map((feature, index) => (
              <motion.div key={index} variants={cardVariants} className="relative group">
                <motion.div
                  className="relative rounded-2xl cursor-pointer h-full"
                  style={{
                    border: `1px solid ${activeCard === index
                      ? (isDark ? 'rgba(59,130,246,0.45)' : 'rgba(30,64,175,0.3)')
                      : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')}`,
                    boxShadow: activeCard === index
                      ? (isDark
                        ? '0 8px 32px rgba(59,130,246,0.15), 0 4px 16px rgba(220,38,38,0.08)'
                        : '0 8px 32px rgba(30,64,175,0.1), 0 4px 16px rgba(220,38,38,0.05)')
                      : '0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onMouseEnter={() => setActiveCard(index)}
                >
                  {/* Image with overlay */}
                  <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-2xl">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
                    
                    <div className="absolute top-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </div>

                  {/* Card body with faint grid background */}
                  <div
                    className="relative p-5 rounded-b-2xl"
                    style={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      backgroundImage: isDark
                        ? `linear-gradient(rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px)`
                        : `linear-gradient(rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px)`,
                      backgroundSize: '24px 24px',
                    }}
                  >
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
                    <motion.button
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm"
                      style={{ background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)', color: '#ffffff' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal(feature)}
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  {/* Number badge — placed outside overflow scope */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-10" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)' }}>
                    {index + 1}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center space-x-2 mt-8 sm:mt-12">
            {features.map((_, index) => (
              <button key={index} onClick={() => setActiveCard(index)} className="transition-all duration-300 rounded-full" style={{ width: activeCard === index ? '2rem' : '0.5rem', height: '0.5rem', background: activeCard === index ? 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)' : isDark ? '#475569' : '#cbd5e1' }} />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image={selectedFeature?.image}
        title={selectedFeature?.title}
      >
        {selectedFeature?.detail}
      </Modal>
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20" style={{ background: isDark ? "linear-gradient(to bottom, rgba(15,23,42,1), rgba(15,23,42,0))" : "linear-gradient(to bottom, rgba(248,250,252,1), rgba(248,250,252,0))" }} />
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20" style={{ background: isDark ? "linear-gradient(to top, rgba(15,23,42,1), rgba(15,23,42,0))" : "linear-gradient(to top, rgba(248,250,252,1), rgba(248,250,252,0))" }} />
    </section>
  );
};

export default SeventhAirFeatures;
