import logo from "@/assets/images/logoT.png";
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Package, Plane, Truck, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  className?: string;
}

const SeventhAirNavbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      label: 'About Us', 
      href: '#about',
      dropdown: null
    },
    { 
      label: 'Services', 
      href: '#services',
      dropdown: [
        { label: 'Air Freight', href: '#air-freight', icon: <Plane className="w-4 h-4" /> },
        { label: 'Ground Shipping', href: '#ground', icon: <Truck className="w-4 h-4" /> },
        { label: 'Express Delivery', href: '#express', icon: <Package className="w-4 h-4" /> },
        { label: 'International', href: '#international', icon: <Globe className="w-4 h-4" /> }
      ]
    },
    { 
      label: 'Containers', 
      href: '#containers',
      dropdown: [
        { label: '20ft Container', href: '#20ft' },
        { label: '40ft Container', href: '#40ft' },
        { label: 'Refrigerated', href: '#refrigerated' }
      ]
    },
    { 
      label: 'Shippers', 
      href: '#shippers',
      dropdown: null
    }
  ];

  // Animation variants
  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'tween' as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        initial="initial"
        animate="animate"
        variants={navbarVariants}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 ${className}`}
      >
        <motion.div 
          className={`
            relative overflow- rounded-full
            transition-all duration-700 ease-out
            ${isScrolled ? 'shadow-2xl' : 'shadow-xl'}
          `}
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Ultra Glass Effect Layers */}
          
          {/* Base glass layer - very transparent */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl"></div>
          
          {/* Gradient overlay - subtle colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-red-600/10"></div>
          
          {/* Top shine effect */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          
          {/* Animated border gradient */}
          <motion.div 
            className="absolute inset-0 rounded-full "
            style={{
              background: "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(255,255,255,0.3), rgba(239,68,68,0.2))",
              padding: "1px"
            }}
            animate={{
              background: [
                "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(255,255,255,0.3), rgba(239,68,68,0.2))",
                "linear-gradient(180deg, rgba(239,68,68,0.2), rgba(255,255,255,0.3), rgba(59,130,246,0.2))",
                "linear-gradient(270deg, rgba(59,130,246,0.2), rgba(255,255,255,0.3), rgba(239,68,68,0.2))",
                "linear-gradient(360deg, rgba(239,68,68,0.2), rgba(255,255,255,0.3), rgba(59,130,246,0.2))",
                "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(255,255,255,0.3), rgba(239,68,68,0.2))"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Content Container with enhanced glass effect */}
          <div className="relative bg-gradient-to-r from-gray-900/20 via-gray-800/10 to-gray-900/20 backdrop-blur-2xl rounded-full border border-white/10">
            <div className="px-5 py-2 flex items-center justify-between">
              
              {/* Logo Section */}
             <img src={logo} alt="logo" className="w-14 h-12 object-contain" />
              
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.a 
                      href={link.href}
                      className="text-gray-700 hover:text-gray-500 font-medium text-base tracking-wide transition-all duration-300 flex items-center space-x-1 py-2 drop-shadow-md"
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }
                      }}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <motion.div
                          animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      )}
                    </motion.a>
                    
                    {/* Hover Underline Effect */}
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-red-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {link.dropdown && activeDropdown === link.label && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden shadow-2xl"
                        >
                          <div className="bg-white/80 backdrop-blur-2xl border border-white/20">
                            {link.dropdown.map((item: any, idx) => (
                              <motion.a
                                key={idx}
                                href={item.href}
                                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-red-50/50 hover:text-blue-900 transition-all duration-200"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {item.icon && item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              
              {/* Contact Button */}
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.button 
                  className="relative group px-5 py-3 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Button Text */}
                  <span className="relative text-white font-semibold text-sm tracking-wider flex items-center space-x-2 drop-shadow-lg">
                    <Phone className="w-5 h-5" />
                    <span>CONTACT</span>
                  </span>
                </motion.button>
              </motion.div>
              
              {/* Mobile Menu Toggle */}
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            </motion.div>
            
            {/* Menu Panel */}
            <motion.div 
              className="fixed right-4 top-20 left-4 z-50 lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                <div className="p-6 space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.a 
                        href={link.href}
                        className="block py-3 px-4 text-gray-800 font-medium hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-red-50/50 rounded-xl transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                      </motion.a>
                      {link.dropdown && (
                        <motion.div 
                          className="ml-4 mt-2 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          {link.dropdown.map((item: any, idx) => (
                            <motion.a
                              key={idx}
                              href={item.href}
                              className="flex items-center space-x-2 py-2 px-4 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                              whileHover={{ x: 5 }}
                            >
                              {item.icon && item.icon}
                              <span>{item.label}</span>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Mobile Contact Button */}
                  <motion.button 
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold rounded-xl shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Contact Us</span>
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SeventhAirNavbar;