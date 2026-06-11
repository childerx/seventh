import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "@/context/theme-context";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title?: string;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 28, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, title, children }) => {
  const { isDark } = useTheme();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl"
            style={{
              background: isDark
                ? "rgba(15, 23, 42, 0.92)"
                : "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.4)",
              boxShadow: isDark
                ? "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset"
                : "0 32px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2) inset",
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(15, 23, 42, 0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <X className="w-5 h-5" style={{ color: isDark ? "#e2e8f0" : "#334155" }} />
            </button>

            {image && (
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={image}
                  alt={title || ""}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              {title && (
                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                >
                  {title}
                </h2>
              )}
              <div
                className="text-base leading-relaxed"
                style={{ color: isDark ? "#cbd5e1" : "#334155" }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
