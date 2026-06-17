import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

const PageLoader: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: isDark ? "#0f172a" : "#ffffff" }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.12)" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{ borderTopColor: "#1e40af", borderRightColor: "#dc2626" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #1e40af, #dc2626)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
