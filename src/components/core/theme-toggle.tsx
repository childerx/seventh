import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' 
          : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' 
            : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          boxShadow: isDark 
            ? '0 2px 8px rgba(59, 130, 246, 0.4)' 
            : '0 2px 8px rgba(245, 158, 11, 0.4)',
        }}
        animate={{
          left: isDark ? 'calc(100% - 1.75rem)' : '0.25rem',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
