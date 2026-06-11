import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Users,
  MapPin,
  Phone,
  ChevronDown,
  Package,
  Plane,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { useModalContext } from "@/context/modal-context";
import planeCargo1 from "@/assets/images/plane-cargo1.jpg";
import planeCargo2 from "@/assets/images/plane-cargo2.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();

  const initParticles = useCallback((width: number, height: number) => {
    const colors = [
      "#3b82f6",
      "#1e40af",
      "#dc2626",
      "#ef4444",
      "#93c5fd",
      "#fca5a5",
    ];
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };
    setSize();

    const handleResize = () => setSize();
    window.addEventListener("resize", handleResize, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      // Draw connections (O(n²))
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,140,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 90, damping: 20 },
    },
  };

  const scrollToStory = () => {
    document
      .getElementById("our-story")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, #060d1f 0%, #0f172a 40%, #1a0a0a 80%, #0f172a 100%)",
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,64,175,0.18) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full"
        style={{ opacity: 0.85 }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
              style={{
                background: "rgba(30,64,175,0.2)",
                borderColor: "rgba(59,130,246,0.35)",
                color: "#93c5fd",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>UK ↔ Ghana Courier Service</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-none mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              About
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Seventh Air
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "rgba(203,213,225,0.85)" }}
          >
            Bridging continents, delivering trust — your premier air freight
            partner between the United Kingdom and Ghana.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={scrollToStory}
              className="px-8 py-4 rounded-full font-semibold text-white text-base sm:text-lg flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(30,64,175,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span>Explore Our Story</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={openContactModal}
              className="px-8 py-4 rounded-full font-semibold text-base sm:text-lg border"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#e2e8f0",
              }}
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        onClick={scrollToStory}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(148,163,184,0.7)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown
            className="w-6 h-6"
            style={{ color: "rgba(148,163,184,0.7)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Our Story Section ────────────────────────────────────────────────────────
const OurStorySection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  const textVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 18,
        delay: i * 0.12,
      },
    }),
  };

  const imageVariants = {
    hidden: { x: 60, opacity: 0, scale: 0.95 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      id="our-story"
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: isDark ? "#0f172a" : "#ffffff" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(30,64,175,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text left */}
          <div className="space-y-6">
            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span
                className="inline-block text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{
                  background: isDark
                    ? "rgba(30,64,175,0.2)"
                    : "rgba(30,64,175,0.08)",
                  color: "var(--primary-blue-light)",
                }}
              >
                Our Story
              </span>
              <h2
                className="text-4xl sm:text-5xl font-extrabold leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                From a Vision to{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Trusted Routes
                </span>
              </h2>
            </motion.div>

            <motion.p
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Founded three years ago by a team passionate about connecting the
              diaspora with home, Seventh Air Limited was born from a simple but
              powerful idea: families and businesses deserved a reliable, fast,
              and transparent way to send parcels between the United Kingdom and
              Ghana.
            </motion.p>

            <motion.p
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              What began as a small operation has grown into a trusted courier
              network with offices in Bantama, Kumasi and the United Kingdom —
              handling thousands of shipments a year with the same care and
              precision we brought to our very first delivery.
            </motion.p>

            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We specialise in air freight for international parcels — delivered
              within 3 working days — and same-day domestic delivery within
              Ghana. Our real-time tracking system keeps you informed at every
              step, because we believe transparency builds trust.
            </motion.p>

            {/* Checkpoints */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3 pt-2"
            >
              {[
                "Air freight UK ↔ Ghana in 3 working days",
                "Same-day domestic delivery across Ghana",
                "User-friendly real-time tracking portal",
                "Dedicated support in both countries",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span
                    className="text-sm sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image collage right */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative h-[460px] sm:h-[520px]"
          >
            {/* Back image */}
            <motion.div
              className="absolute top-0 right-0 w-[75%] h-[72%] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <img
                src={planeCargo1}
                alt="Cargo aircraft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Front image */}
            <motion.div
              className="absolute bottom-0 left-0 w-[65%] h-[62%] rounded-2xl overflow-hidden shadow-2xl border-4"
              style={{ borderColor: isDark ? "#0f172a" : "#ffffff" }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <img
                src={planeCargo2}
                alt="Cargo loading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
            </motion.div>

            {/* Float badge */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-5 py-3 rounded-2xl border shadow-xl text-center"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.9)"
                  : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
                borderColor: isDark
                  ? "rgba(59,130,246,0.3)"
                  : "rgba(30,64,175,0.15)",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="text-2xl font-extrabold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                3 Days
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                UK to Ghana delivery
              </div>
            </motion.div>

            {/* Established badge */}
            <motion.div
              className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-xl border shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="text-white text-sm font-bold">
                Est. 3 years ago
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Stats Section ────────────────────────────────────────────────────────────
const useCounterAnimation = (
  target: number,
  isInView: boolean,
  suffix: string = "",
  prefix: string = "",
  duration: number = 2000,
) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target, duration]);

  return `${prefix}${count}${suffix}`;
};

const StatCard: React.FC<{
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  isInView: boolean;
}> = ({
  value,
  suffix,
  prefix = "",
  label,
  sublabel,
  color,
  delay,
  isInView,
}) => {
  const { isDark } = useTheme();
  const displayValue = useCounterAnimation(value, isInView, suffix, prefix);

  return (
    <motion.div
      className="rounded-2xl p-6 sm:p-8 border text-center"
      style={{
        background: isDark ? "rgba(30,41,59,0.6)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
      whileHover={{
        scale: 1.04,
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2"
        style={{ fontFamily: "var(--font-heading)", color }}
      >
        {displayValue}
      </div>
      <div
        className="text-base sm:text-lg font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </div>
      <div
        className="text-xs sm:text-sm"
        style={{ color: "var(--text-tertiary)" }}
      >
        {sublabel}
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  const stats = [
    {
      value: 3,
      suffix: "+",
      prefix: "",
      label: "Years Established",
      sublabel: "Serving UK-Ghana corridor",
      color: "var(--primary-blue-light)",
    },
    {
      value: 3,
      suffix: " Days",
      prefix: "",
      label: "International Delivery",
      sublabel: "UK to Ghana via air freight",
      color: "var(--primary-red-light)",
    },
    {
      value: 2,
      suffix: "",
      prefix: "",
      label: "Countries",
      sublabel: "United Kingdom & Ghana",
      color: "var(--primary-blue-light)",
    },
    {
      value: 100,
      suffix: "%",
      prefix: "",
      label: "Commitment",
      sublabel: "To every single parcel",
      color: "var(--primary-red-light)",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: isDark ? "#1e293b" : "#f8fafc" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="stats-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 300 Q 480 200, 960 300 T 1920 300"
            stroke="url(#stats-grad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
          <motion.path
            d="M 0 350 Q 480 450, 960 350 T 1920 350"
            stroke="url(#stats-grad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Numbers That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Speak
            </span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Three years of relentless dedication to connecting the UK and Ghana,
            one parcel at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to bottom,rgba(248,250,252,1),transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to top,rgba(248,250,252,1),transparent)",
        }}
      />
    </section>
  );
};

// ─── Mission & Values ─────────────────────────────────────────────────────────
const ValuesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  const values = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Speed",
      description:
        "Time matters. Our streamlined air freight processes and dedicated local teams ensure your parcels reach their destination in 3 working days internationally and same-day domestically. We never sacrifice speed for anything other than safety.",
      gradientFrom: "#1e40af",
      gradientTo: "#3b82f6",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Reliability",
      description:
        "When you hand us your parcel, you're trusting us with what matters most. We treat every shipment as if it were our own — with care, accountability, and a commitment to delivering on our promises every single time.",
      gradientFrom: "#dc2626",
      gradientTo: "#ef4444",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do. From our intuitive tracking portal to our bilingual support teams in both the UK and Ghana, we design every touchpoint to make your shipping experience as effortless as possible.",
      gradientFrom: "#1e40af",
      gradientTo: "#dc2626",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: isDark ? "#0f172a" : "#ffffff" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: isDark
                ? "rgba(30,64,175,0.2)"
                : "rgba(30,64,175,0.08)",
              color: "var(--primary-blue-light)",
            }}
          >
            Our Values
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Mission &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Values
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 sm:p-8 border group"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.65)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
                delay: i * 0.15,
              }}
              whileHover={{
                scale: 1.03,
                y: -6,
                boxShadow: isDark
                  ? "0 24px 48px rgba(0,0,0,0.4)"
                  : "0 24px 48px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${val.gradientFrom} 0%, ${val.gradientTo} 100%)`,
                  boxShadow: `0 8px 24px ${val.gradientFrom}40`,
                }}
              >
                {val.icon}
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                {val.title}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {val.description}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-6 h-1 w-0 rounded-full group-hover:w-full transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${val.gradientFrom} 0%, ${val.gradientTo} 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Three.js Globe Section ───────────────────────────────────────────────────
const GlobeSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group to rotate all elements together
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ── Sphere ──────────────────────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0d1b40,
      specular: 0x1e40af,
      shininess: 20,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // ── Wireframe overlay ───────────────────────────────────────────────────
    const wireGeo = new THREE.SphereGeometry(1.003, 32, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      opacity: 0.12,
      transparent: true,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireframe);

    // ── Atmosphere glow ─────────────────────────────────────────────────────
    const atmosGeo = new THREE.SphereGeometry(1.12, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphere); // outside group so it doesn't rotate with globe

    // ── Surface particles ────────────────────────────────────────────────────
    const particleCount = 800;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.01;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pPositions, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.012,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(dots);

    // ── Helper: lat/lon to Vector3 ───────────────────────────────────────────
    const latLonToVec3 = (
      lat: number,
      lon: number,
      radius: number,
    ): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    };

    // ── UK marker (lat 51.5, lon -0.1) ───────────────────────────────────────
    const ukPos = latLonToVec3(51.5, -0.1, 1.02);
    const ukGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const ukMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const ukMarker = new THREE.Mesh(ukGeo, ukMat);
    ukMarker.position.copy(ukPos);
    globeGroup.add(ukMarker);

    // UK glow ring
    const ukRingGeo = new THREE.RingGeometry(0.035, 0.055, 32);
    const ukRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ukRing = new THREE.Mesh(ukRingGeo, ukRingMat);
    ukRing.position.copy(ukPos);
    ukRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(ukRing);

    // ── Ghana marker (lat 7.9, lon -1.0) ────────────────────────────────────
    const ghPos = latLonToVec3(7.9, -1.0, 1.02);
    const ghGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const ghMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const ghMarker = new THREE.Mesh(ghGeo, ghMat);
    ghMarker.position.copy(ghPos);
    globeGroup.add(ghMarker);

    // Ghana glow ring
    const ghRingGeo = new THREE.RingGeometry(0.035, 0.055, 32);
    const ghRingMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ghRing = new THREE.Mesh(ghRingGeo, ghRingMat);
    ghRing.position.copy(ghPos);
    ghRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(ghRing);

    // ── Curved arc UK → Ghana ────────────────────────────────────────────────
    const midPoint = new THREE.Vector3()
      .addVectors(ukPos, ghPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(1.6); // arc out

    const curve = new THREE.QuadraticBezierCurve3(ukPos, midPoint, ghPos);
    const curvePoints = curve.getPoints(80);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xf97316,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    globeGroup.add(arcLine);

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x4a90d9, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xdc2626, 0.3);
    rimLight.position.set(-5, -3, -3);
    scene.add(rimLight);

    // ── RAF loop ─────────────────────────────────────────────────────────────
    let rafId: number;
    let ukPulse = 0;
    let ghPulse = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.003;

      // Pulse markers
      ukPulse += 0.05;
      ghPulse += 0.05;
      ukRingMat.opacity = 0.3 + 0.3 * Math.sin(ukPulse);
      ghRingMat.opacity = 0.3 + 0.3 * Math.sin(ghPulse);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ───────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ukGeo.dispose();
      ukMat.dispose();
      ukRingGeo.dispose();
      ukRingMat.dispose();
      ghGeo.dispose();
      ghMat.dispose();
      ghRingGeo.dispose();
      ghRingMat.dispose();
      arcGeo.dispose();
      arcMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 18,
        delay: i * 0.12,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: isDark ? "#1e293b" : "#f8fafc" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text left */}
          <div className="order-2 lg:order-1 space-y-6">
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span
                className="inline-block text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{
                  background: isDark
                    ? "rgba(30,64,175,0.2)"
                    : "rgba(30,64,175,0.08)",
                  color: "var(--primary-blue-light)",
                }}
              >
                Global Reach
              </span>
              <h2
                className="text-4xl sm:text-5xl font-extrabold leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                Bridging{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Two Continents
                </span>
              </h2>
            </motion.div>

            <motion.p
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Our dedicated air freight corridor connects London in the United
              Kingdom with our base in Kumasi, Ghana. Every shipment travels
              directly along this route — no unnecessary layovers, no hidden
              handoffs.
            </motion.p>

            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {[
                {
                  flag: "🇬🇧",
                  country: "United Kingdom",
                  city: "London, England",
                  color: "#3b82f6",
                },
                {
                  flag: "🇬🇭",
                  country: "Ghana",
                  city: "Bantama, Kumasi",
                  color: "#dc2626",
                },
              ].map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{
                    background: isDark
                      ? "rgba(15,23,42,0.5)"
                      : "rgba(255,255,255,0.7)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span className="text-3xl">{loc.flag}</span>
                  <div>
                    <div
                      style={{ color: "var(--text-primary)" }}
                      className="font-semibold text-sm sm:text-base text-white"
                    >
                      {loc.country}
                    </div>
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {loc.city}
                    </div>
                  </div>
                  <div
                    className="ml-auto w-3 h-3 rounded-full animate-pulse"
                    style={{ background: loc.color }}
                  />
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30,64,175,0.1) 0%, rgba(220,38,38,0.08) 100%)",
                  borderColor: "rgba(30,64,175,0.2)",
                }}
              >
                <Plane
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "var(--primary-blue-light)" }}
                />
                <span
                  className="text-sm sm:text-base font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Average flight time: approx. 6 hours — your parcel arrives in
                  3 working days
                </span>
              </div>
            </motion.div>
          </div>

          {/* Globe right */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: 0.2,
            }}
          >
            <div
              ref={mountRef}
              className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden"
              style={{
                background: isDark
                  ? "radial-gradient(circle at 40% 40%, #0d1b40 0%, #060d1f 100%)"
                  : "radial-gradient(circle at 40% 40%, #0d1b40 0%, #060d1f 100%)",
                boxShadow:
                  "0 0 80px rgba(30,64,175,0.25), 0 0 160px rgba(220,38,38,0.1)",
              }}
            />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to bottom,rgba(248,250,252,1),transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to top,rgba(248,250,252,1),transparent)",
        }}
      />
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorksSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  const steps = [
    {
      number: "01",
      icon: <Package className="w-7 h-7" />,
      title: "Book & Pay",
      description:
        "Get an instant quote online or call our team. Confirm your booking and make a secure payment in minutes.",
      colorFrom: "#1e40af",
      colorTo: "#3b82f6",
    },
    {
      number: "02",
      icon: <MapPin className="w-7 h-7" />,
      title: "Drop at Collection Point",
      description:
        "Bring your parcel to your nearest collection point in the UK or Ghana. Our staff will handle the rest.",
      colorFrom: "#dc2626",
      colorTo: "#ef4444",
    },
    {
      number: "03",
      icon: <Plane className="w-7 h-7" />,
      title: "Air Freight",
      description:
        "Your parcel is loaded onto our dedicated air freight route. Track it in real time via our digital portal.",
      colorFrom: "#1e40af",
      colorTo: "#dc2626",
    },
    {
      number: "04",
      icon: <CheckCircle className="w-7 h-7" />,
      title: "Delivered",
      description:
        "Your parcel arrives at the destination within 3 working days internationally or same-day domestically.",
      colorFrom: "#059669",
      colorTo: "#34d399",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: isDark ? "#0f172a" : "#ffffff" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: isDark
                ? "rgba(30,64,175,0.2)"
                : "rgba(30,64,175,0.08)",
              color: "var(--primary-blue-light)",
            }}
          >
            Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            How It{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Works
            </span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Shipping with Seventh Air is simple. Four steps from your door to
            theirs.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-0.5 z-0">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #1e40af 0%, #dc2626 50%, #059669 100%)",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 18,
                  delay: 0.2 + i * 0.15,
                }}
              >
                {/* Circle icon */}
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6 text-white flex-shrink-0 border-4 relative"
                  style={{
                    background: `linear-gradient(135deg, ${step.colorFrom} 0%, ${step.colorTo} 100%)`,
                    borderColor: isDark ? "#0f172a" : "#ffffff",
                    boxShadow: `0 0 0 4px ${step.colorFrom}30`,
                  }}
                  whileHover={{
                    scale: 1.08,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  {step.icon}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${step.colorFrom} 0%, ${step.colorTo} 100%)`,
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-primary)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 z-0">
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, #1e40af 0%, #dc2626 50%, #059669 100%)",
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex gap-6 items-start"
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 18,
                  delay: 0.2 + i * 0.15,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 -ml-6 border-2"
                  style={{
                    background: `linear-gradient(135deg, ${step.colorFrom} 0%, ${step.colorTo} 100%)`,
                    borderColor: isDark ? "#0f172a" : "#ffffff",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="flex-1 p-4 rounded-xl border"
                  style={{
                    background: isDark
                      ? "rgba(30,41,59,0.5)"
                      : "rgba(255,255,255,0.8)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: step.colorFrom }}
                    >
                      STEP {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Offices Section ──────────────────────────────────────────────────────────
const OfficesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();

  const offices = [
    {
      flag: "🇬🇧",
      country: "United Kingdom",
      city: "England, UK",
      address: "Serving collections across England",
      phone: "+44 770 821 1000",
      gradient:
        "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)",
      accent: "#3b82f6",
    },
    {
      flag: "🇬🇭",
      country: "Ghana",
      city: "Bantama, Kumasi",
      address: "Bantama, Kumasi — Ashanti Region",
      phone: "+233 202 812 225",
      gradient:
        "linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #ef4444 100%)",
      accent: "#ef4444",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: isDark ? "#1e293b" : "#f8fafc" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: isDark
                ? "rgba(30,64,175,0.2)"
                : "rgba(30,64,175,0.08)",
              color: "var(--primary-blue-light)",
            }}
          >
            Locations
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Offices
            </span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Two offices, two countries, one seamless service.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {offices.map((office, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden border"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.65)"
                  : "rgba(255,255,255,0.65)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
                delay: i * 0.2,
              }}
              whileHover={{
                scale: 1.03,
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-8 text-white text-center relative overflow-hidden"
                style={{ background: office.gradient }}
              >
                {/* Dot pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`office-dots-${i}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#office-dots-${i})`} />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{office.flag}</div>
                  <h3
                    className="text-xl sm:text-2xl font-extrabold mb-1 text-white"
                  >
                    {office.country}
                  </h3>
                  <p className="text-white/80 text-sm">{office.city}</p>
                </div>
              </div>

              {/* Body */}
              <div
                className="px-6 py-6 space-y-4"
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  backgroundImage: isDark
                    ? `linear-gradient(rgba(59, 130, 246, 0.05) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0.5px, transparent 0.5px)`
                    : `linear-gradient(rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px)`,
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: office.accent }}
                  />
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {office.address}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: office.accent }}
                  />
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="text-sm sm:text-base font-semibold transition-colors hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {office.phone}
                  </a>
                </div>

                {/* Stars decoration */}
                <div className="flex gap-1 pt-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-current"
                      style={{ color: office.accent }}
                    />
                  ))}
                  <span
                    className="text-xs ml-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Trusted service
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to bottom,rgba(248,250,252,1),transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top,rgba(30,41,59,1),transparent)"
            : "linear-gradient(to top,rgba(248,250,252,1),transparent)",
        }}
      />
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CtaSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openContactModal } = useModalContext();

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #7c1d1d 50%, #dc2626 100%)",
        }}
      />

      {/* Subtle particle overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="space-y-6"
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plane className="w-10 h-10 text-white" />
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Ship?
          </h2>

          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Join thousands of families and businesses who trust Seventh Air to
            deliver their most important parcels between the UK and Ghana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <motion.button
              onClick={openContactModal}
              className="px-10 py-4 rounded-full font-bold text-base sm:text-lg bg-white flex items-center gap-2"
              style={{ color: "#1e40af" }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Phone className="w-5 h-5" />
              <span>Contact Us Today</span>
            </motion.button>

            <motion.a
              href="tel:+447708211000"
              className="px-10 py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-white/50 text-white flex items-center gap-2"
              style={{
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span>🇬🇧 Call UK Office</span>
            </motion.a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-white/70 text-sm">
            {[
              "3-day international delivery",
              "Real-time tracking",
              "Fully insured",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <HeroSection />
      <OurStorySection />
      <StatsSection />
      <ValuesSection />
      <GlobeSection />
      <HowItWorksSection />
      <OfficesSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;
