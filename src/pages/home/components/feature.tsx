import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, Shield, Clock, Globe, ArrowRight, Zap, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const SeventhAirFeatures = () => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Fast Delivery",
      icon: <Truck className="w-8 h-8" />,
      description: "3 working days from UK to Ghana and vice versa with our efficient freight service. We ensure your packages arrive on time with our streamlined logistics network.",
      color: "blue",
      bgGradient: "from-blue-600 to-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Secure Shipping",
      icon: <Shield className="w-8 h-8" />,
      description: "Your packages are protected with our reliable freight service and full insurance coverage. We handle your cargo with maximum security throughout the journey.",
      color: "red",
      bgGradient: "from-red-600 to-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Real-time Tracking",
      icon: <Clock className="w-8 h-8" />,
      description: "Track your packages every step of the way with our advanced tracking system. Get instant updates and peace of mind knowing exactly where your shipment is.",
      color: "blue",
      bgGradient: "from-blue-600 to-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "International Coverage",
      icon: <Globe className="w-8 h-8" />,
      description: "Seamless shipping between UK and Ghana with full customs support. We handle all the paperwork and regulations for smooth international delivery.",
      color: "red",
      bgGradient: "from-red-600 to-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 12
      }
    }
  };

  const handlePrevious = () => {
    setActiveCard((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={ref} className="relative py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      
      {/* Thread-like Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="thread-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="thread-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Curved thread lines */}
          <motion.path
            d="M 0 200 Q 400 100, 800 200 T 1600 200 L 1920 200"
            stroke="url(#thread-gradient-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.path
            d="M 0 400 Q 400 500, 800 400 T 1600 400 L 1920 400"
            stroke="url(#thread-gradient-2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M 0 600 Q 400 700, 800 600 T 1600 600 L 1920 600"
            stroke="url(#thread-gradient-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M 0 800 Q 400 900, 800 800 T 1600 800 L 1920 800"
            stroke="url(#thread-gradient-2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.9, ease: "easeOut" }}
          />
          
          {/* Vertical threads */}
          <motion.path
            d="M 300 0 Q 250 540, 300 1080"
            stroke="url(#thread-gradient-1)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
          />
          <motion.path
            d="M 1620 0 Q 1670 540, 1620 1080"
            stroke="url(#thread-gradient-2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-800">Features Of Our</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Logistic Solution
            </span>
          </h2>
        </motion.div>

        {/* Feature Cards Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-white/80 backdrop-blur-lg rounded-full p-3 shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-white/80 backdrop-blur-lg rounded-full p-3 shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cards Container */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
                onMouseEnter={() => setActiveCard(index)}
              >
                <motion.div
                  className={`
                    relative rounded-3xl p-8 h-full cursor-pointer overflow-hidden
                    ${activeCard === index 
                      ? `bg-gradient-to-br ${feature.bgGradient} text-white shadow-2xl` 
                      : 'bg-white/80 backdrop-blur-lg border border-gray-200/50 hover:border-gray-300/50 shadow-lg'
                    }
                    transition-all duration-500
                  `}
                  whileHover={{ scale: 1.02 }}
                  animate={activeCard === index ? { y: -10 } : { y: 0 }}
                >
                  {/* Grid pattern for active card - more visible */}
                  {activeCard === index && (
                    <div className="absolute inset-0">
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `
                            linear-gradient(0deg, rgba(255,255,255,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                          `,
                          backgroundSize: '15px 15px'
                        }}
                      />
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                          `,
                          backgroundSize: '30px 30px',
                          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`
                        inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                        ${activeCard === index 
                          ? 'bg-white/20' 
                          : feature.iconBg
                        }
                      `}
                      animate={activeCard === index ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={activeCard === index ? 'text-white' : feature.iconColor}>
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className={`
                      text-xl font-bold mb-4
                      ${activeCard === index ? 'text-white' : 'text-gray-800'}
                    `}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className={`
                      text-sm leading-relaxed mb-6
                      ${activeCard === index ? 'text-white/90' : 'text-gray-600'}
                    `}>
                      {feature.description}
                    </p>

                    {/* Learn More Button */}
                    <motion.button
                      className={`
                        inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-sm transition-all
                        ${activeCard === index 
                          ? 'bg-white text-gray-800 hover:bg-gray-100' 
                          : `bg-gradient-to-r ${feature.bgGradient} text-white hover:shadow-lg`
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Decorative elements for active card */}
                  {activeCard === index && (
                    <>
                      <motion.div
                        className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}
                </motion.div>

                {/* Card number indicator */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`
                  transition-all duration-300
                  ${activeCard === index 
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-red-600 rounded-full' 
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeventhAirFeatures;