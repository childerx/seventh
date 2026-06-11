import logo from "@/assets/images/logoT.png";
import logoWhite from "@/assets/images/logoTwhite.png";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-location';
import { Menu, X, Phone, Package, Plane, Truck, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/core/theme-toggle';
import { useTheme } from '@/context/theme-context';
import { useModalContext } from '@/context/modal-context';

interface NavbarProps {
  className?: string;
}

const SeventhAirNavbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', isRoute: true, dropdown: null },
    { label: 'About Us', href: '/about-us', isRoute: true, dropdown: null },
    {
      label: 'Services',
      href: '#services',
      isRoute: false,
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
      isRoute: false,
      dropdown: [
        { label: '20ft Container', href: '#20ft' },
        { label: '40ft Container', href: '#40ft' },
        { label: 'Refrigerated', href: '#refrigerated' }
      ]
    },
    { label: 'Collection Points', href: '/collection-points', isRoute: true, dropdown: null }
  ];

  return (
    <>
      <motion.nav 
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 ${className}`}
      >
        <div 
          className="relative rounded-full transition-all duration-500"
          style={{
            background: isDark 
              ? 'rgba(15, 23, 42, 0.65)' 
              : 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: isScrolled 
              ? isDark 
                ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
                : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
              : isDark
                ? '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.5)'}`,
          }}
        >
          <div className="px-5 py-2.5 flex items-center justify-between">
            <img src={isDark ? logoWhite : logo} alt="Seventh Air Logo" className="w-12 h-11 object-contain" />
            
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className={`
                        font-medium text-sm tracking-wide transition-colors duration-200 flex items-center space-x-1 py-2
                        ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                      `}
                    >
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`
                        font-medium text-sm tracking-wide transition-colors duration-200 flex items-center space-x-1 py-2
                        ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                      `}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <motion.div
                          animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      )}
                    </a>
                  )}
                  
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl overflow-hidden"
                        style={{
                          background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                          boxShadow: isDark 
                            ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                            : '0 20px 40px rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        <div className="p-2">
                          {link.dropdown.map((item: any, idx) => (
                            <a
                              key={idx}
                              href={item.href}
                              className={`
                                flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors duration-150
                                ${isDark 
                                  ? 'text-gray-300 hover:bg-white/10 hover:text-white' 
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                            >
                              {item.icon && <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{item.icon}</span>}
                              <span className="text-sm font-medium">{item.label}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <motion.button 
                className="relative px-5 py-2.5 rounded-full overflow-hidden font-semibold text-sm tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)',
                  color: '#ffffff',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContactModal}
              >
                <span className="relative flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>CONTACT</span>
                </span>
              </motion.button>
            </div>
            
            <div className="lg:hidden flex items-center space-x-3">
              <ThemeToggle />
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}
            />
            
            <motion.div 
              className="fixed right-4 top-24 left-4 z-50 lg:hidden"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(40px) saturate(180%)',
                borderRadius: '1.5rem',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="p-5 space-y-2">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className={`block py-3 px-4 font-medium rounded-xl transition-colors duration-200 ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-800 hover:bg-gray-50'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`block py-3 px-4 font-medium rounded-xl transition-colors duration-200 ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-800 hover:bg-gray-50'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                    {link.dropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdown.map((item: any, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className={`flex items-center space-x-2 py-2 px-4 text-sm transition-colors duration-150 ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.icon && item.icon}
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <motion.button 
                  className="w-full mt-4 px-5 py-3 font-semibold rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)', color: '#ffffff' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { openContactModal(); setIsMenuOpen(false); }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Contact Us</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SeventhAirNavbar;
