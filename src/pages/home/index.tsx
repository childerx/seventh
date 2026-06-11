import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-location";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Package,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Award,
  TrendingUp,
  Plane,
} from "lucide-react";
import SeventhAirHero from "./components/hero";
import planeImg from "@/assets/images/cargo.png";
import globe from "@/assets/images/globe.png";
import planeAir from "@/assets/images/plane-air.jpg";
import planeCargo1 from "@/assets/images/plane-cargo1.jpg";
import planeCargo2 from "@/assets/images/plane-cargo2.jpg";
import container from "@/assets/images/container.jpg";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SeventhAirFeatures from "./components/feature";
import Faq from "./components/faq";
import Testimonials from "./components/testimonials";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "@/components/core/text-input";
import { useTheme } from "@/context/theme-context";
import { useModalContext } from "@/context/modal-context";

const sliderData = [
  {
    id: 1,
    title: "Fast & Reliable Delivery",
    subtitle: "UK to Ghana in just 3 working days",
    image: planeAir,
    cta: "Track Your Package",
  },
  {
    id: 2,
    title: "Secure International Shipping",
    subtitle: "Your parcels, our priority - delivered safely",
    image: planeCargo1,
    cta: "Get Quote",
  },
  {
    id: 3,
    title: "Minimum 5kg Packages",
    subtitle: "Affordable rates for all your shipping needs",
    image: planeCargo2,
    cta: "Learn More",
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    subtitle: "We're here to help whenever you need us",
    image: container,
    cta: "Contact Us",
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
      {sliderData.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 30,
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white max-w-xl"
              >
                <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    color: "#ffffff",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (slide.cta === "Contact Us") openContactModal();
                  }}
                >
                  {slide.cta}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <button
        onClick={() => setCurrentSlide((p) => (p === 0 ? 3 : p - 1))}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((p) => (p === 3 ? 0 : p + 1))}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 z-30 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: index === currentSlide ? "2rem" : "0.5rem",
              height: "0.5rem",
              background:
                index === currentSlide ? "#ffffff" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const GlobeSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const { isDark } = useTheme();

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const checklistItems = [
    "Dedicated air freight routes, 6 days a week",
    "Real-time package tracking from pickup to door",
    "Full customs handling included in every shipment",
    "Offices in Bantama (Kumasi) and United Kingdom",
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{ background: isDark ? "#0f172a" : "#ffffff" }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: isDark
              ? "rgba(59,130,246,0.1)"
              : "rgba(59,130,246,0.07)",
          }}
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[100px]"
          style={{
            background: isDark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.07)",
          }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Thread background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="globe-thread-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 200 Q 400 100, 800 200 T 1600 200"
            stroke="url(#globe-thread-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M 0 500 Q 400 600, 800 500 T 1600 500"
            stroke="url(#globe-thread-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
          />
          <motion.path
            d="M 0 800 Q 400 700, 800 800 T 1600 800"
            stroke="url(#globe-thread-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.6 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Globe visual */}
          <motion.div
            className="relative flex justify-center order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Glow behind globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-72 h-72 rounded-full blur-[70px]"
                style={{
                  background: isDark
                    ? "rgba(59,130,246,0.22)"
                    : "rgba(59,130,246,0.12)",
                }}
              />
            </div>

            {/* Dashed orbital rings */}
            <motion.div
              className="absolute w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] rounded-full border"
              style={{
                borderColor: "rgba(59,130,246,0.18)",
                borderStyle: "dashed",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full border"
              style={{
                borderColor: "rgba(239,68,68,0.14)",
                borderStyle: "dashed",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Globe image */}
            <motion.img
              src={globe}
              alt="Global Coverage"
              className="relative z-10 w-full max-w-[270px] sm:max-w-sm md:max-w-md"
              style={{
                rotate,
                filter: isDark
                  ? "drop-shadow(0 0 48px rgba(59,130,246,0.35))"
                  : "drop-shadow(0 24px 48px rgba(30,64,175,0.18))",
              }}
            />

            {/* Floating badges */}
            <motion.div
              className="absolute top-4 right-4 sm:right-2 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{
                background: "rgba(59,130,246,0.92)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✈ 3-Day Delivery
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-2 sm:left-0 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{
                background: "rgba(220,38,38,0.92)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              🛡 100% Insured
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-0 sm:-left-2 z-20 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.95)"
                  : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                color: "var(--text-primary)",
              }}
              animate={{ x: [0, -5, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              🇬🇧 UK ↔ 🇬🇭 Ghana
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {/* Badge pill */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border mb-6"
              style={{
                background: isDark
                  ? "rgba(30,41,59,0.65)"
                  : "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: isDark
                  ? "rgba(59,130,246,0.25)"
                  : "rgba(59,130,246,0.2)",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Plane
                className="w-4 h-4"
                style={{ color: "var(--primary-blue-light)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Air Freight Specialists
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-5 leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span
                className="block bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                  animation: "shimmer 4s ease-in-out infinite",
                }}
              >
                Connecting
              </span>
              <span
                className="block tracking-tight mt-1"
                style={{ color: "var(--text-primary)" }}
              >
                UK & Ghana,
              </span>
              <span
                className="block text-xl sm:text-2xl lg:text-3xl mt-2 font-medium tracking-widest uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                One Parcel at a Time
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Seventh Air Limited specialises in fast, secure parcel delivery
              between the UK and Ghana — combining air freight efficiency with
              personalised service at every step of the journey.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              className="space-y-2.5 mb-8"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {checklistItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.15)" }}
                  >
                    <CheckCircle
                      className="w-3 h-3"
                      style={{ color: "#22c55e" }}
                    />
                  </div>
                  <span
                    className="text-sm sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "inline-block" }}
              >
                <Link
                  to="/about-us"
                  className="px-6 sm:px-7 py-3 rounded-full font-semibold text-sm sm:text-base inline-flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    color: "#ffffff",
                  }}
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(15,23,42,1), rgba(15,23,42,0))"
            : "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(15,23,42,1), rgba(15,23,42,0))"
            : "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
    </section>
  );
};

const TrackingSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const trackingForm = useFormik({
    initialValues: { trackingCode: "" },
    onSubmit: () => {},
  });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: isDark ? "#1e293b" : "#ffffff" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="track-thread"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 300 Q 480 200, 960 300 T 1920 300"
            stroke="url(#track-thread)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M 0 700 Q 480 800, 960 700 T 1920 700"
            stroke="url(#track-thread)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>
        <div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: isDark
              ? "rgba(59, 130, 246, 0.08)"
              : "rgba(59, 130, 246, 0.05)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: isDark
              ? "rgba(239, 68, 68, 0.08)"
              : "rgba(239, 68, 68, 0.05)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="rounded-3xl overflow-hidden shadow-2xl relative"
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="track-dots"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#track-dots)" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16 items-center relative z-10">
            <div className="text-white">
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 mb-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20"
                whileHover={{ rotate: 8, scale: 1.05 }}
              >
                <Package className="w-7 h-7 sm:w-9 sm:h-9" />
              </motion.div>
              <h2
                className="text-2xl text-white sm:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight"
                // style={{ fontFamily: "var(--font-heading)" }}
              >
                Track Your Package
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                Enter your tracking code to get real-time updates on your
                shipment location and estimated delivery time.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  "Real-time GPS tracking",
                  "Delivery time estimates",
                  "Status notifications",
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6 sm:p-8 border"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.18)",
                backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255,255,255,0.04) 0.5px, transparent 0.5px)`,
                backgroundSize: "20px 20px",
              }}
            >
              <div className="space-y-4">
                <TextInput
                  id="trackingCode"
                  label="Tracking number"
                  placeholder="Enter tracking code (e.g., SAL-2024-XXXX)"
                  // style={{ color: "#1e293b", fontWeight: 600 }}
                  values={trackingForm.values}
                  handleChange={trackingForm.handleChange}
                  handleBlur={trackingForm.handleBlur}
                />
                <motion.button
                  className="w-full py-3 sm:py-4 rounded-xl font-semibold text-md bg-white text-blue-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Track Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(30,41,59,1), rgba(30,41,59,0))"
            : "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(30,41,59,1), rgba(30,41,59,0))"
            : "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
    </section>
  );
};

const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const stats = [
    {
      icon: Package,
      number: "5kg+",
      label: "Minimum Weight",
      color: "var(--primary-blue-light)",
    },
    {
      icon: Zap,
      number: "3",
      label: "Working Days",
      color: "var(--primary-red-light)",
    },
    {
      icon: Users,
      number: "24/7",
      label: "Customer Support",
      color: "var(--primary-blue-light)",
    },
    {
      icon: Award,
      number: "100%",
      label: "Secure Delivery",
      color: "var(--primary-red-light)",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: isDark ? "#0f172a" : "#f8fafc" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="stats-thread" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 300 Q 480 200, 960 300 T 1920 300"
            stroke="url(#stats-thread)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 leading-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Numbers That </span>
            <span
              className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              Speak
            </span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Trusted by businesses and families shipping between UK and Ghana
          </p>
        </motion.div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="flex gap-6 sm:gap-8 animate-scroll-left pause-on-hover">
            {/* Duplicate stats for seamless loop */}
            {[...stats, ...stats, ...stats, ...stats].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 sm:p-8 rounded-2xl border flex-shrink-0 w-[250px] sm:w-[280px]"
                style={{
                  backgroundColor: isDark
                    ? "rgba(30, 41, 59, 0.5)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                  backgroundImage: isDark
                    ? `linear-gradient(rgba(59, 130, 246, 0.05) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0.5px, transparent 0.5px)`
                    : `linear-gradient(rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(30, 64, 175, 0.04) 0.5px, transparent 0.5px)`,
                  backgroundSize: "20px 20px",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: (index % stats.length) * 0.1,
                }}
                whileHover={{
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: isDark
                      ? "rgba(30,41,59,0.9)"
                      : "rgba(255,255,255,0.9)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                    boxShadow: `0 4px 12px ${stat.color}22`,
                  }}
                >
                  <stat.icon
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-br from-blue-500 to-red-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm sm:text-base font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(15,23,42,1), rgba(15,23,42,0))"
            : "linear-gradient(to bottom, rgba(248,250,252,1), rgba(248,250,252,0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(15,23,42,1), rgba(15,23,42,0))"
            : "linear-gradient(to top, rgba(248,250,252,1), rgba(248,250,252,0))",
        }}
      />
    </section>
  );
};

const ContactSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const contactForm = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema: yup.object({
      name: yup.string().min(2, "Too short").required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().min(7, "Invalid phone").required("Phone is required"),
      message: yup
        .string()
        .min(10, "At least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: () => {},
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: isDark ? "#1e293b" : "#ffffff" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{
            background: isDark
              ? "rgba(59,130,246,0.08)"
              : "rgba(59,130,246,0.05)",
          }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[90px]"
          style={{
            background: isDark
              ? "rgba(239,68,68,0.08)"
              : "rgba(239,68,68,0.05)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="contact-thread"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 200 Q 480 100, 960 200 T 1920 200"
            stroke="url(#contact-thread)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M 0 800 Q 480 900, 960 800 T 1920 800"
            stroke="url(#contact-thread)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 leading-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Get In </span>
            <span
              className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              Touch
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Ready to ship? Contact us for a quote
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                icon: Phone,
                title: "Phone Numbers",
                items: ["Ghana: +233 202812225", "UK: +447708211000"],
                color: "var(--primary-blue-light)",
                hex: "#3b82f6",
              },
              {
                icon: Mail,
                title: "Email",
                items: ["info@seventhair.com"],
                href: `mailto:opoku.ach@gmail.com?subject=${encodeURIComponent("Seventh Air — New Inquiry")}&body=${encodeURIComponent("Dear Seventh Air Team,\n\nI am reaching out via your website to inquire about your cargo and logistics services between the UK and Ghana.\n\nI would like to know more about:\n- \n\nLooking forward to hearing from you.\n\nBest regards,\n")}`,
                color: "var(--primary-red-light)",
                hex: "#ef4444",
              },
              {
                icon: MapPin,
                title: "Service Areas",
                items: ["United Kingdom ↔ Ghana"],
                color: "#22c55e",
                hex: "#22c55e",
              },
            ].map((contact, idx) => (
              <motion.div
                key={idx}
                className="flex items-start space-x-4 p-4 rounded-2xl border transition-all duration-300"
                style={{
                  background: isDark
                    ? "rgba(30,41,59,0.4)"
                    : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                }}
                whileHover={{ x: 4, borderColor: `${contact.hex}40` }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${contact.hex}18`,
                    border: `1px solid ${contact.hex}25`,
                  }}
                >
                  <contact.icon
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: contact.color }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold mb-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.title}
                  </h3>
                  {contact.items.map((item, i) => (
                    contact.href ? (
                      <a
                        key={i}
                        href={contact.href}
                        className="text-sm hover:text-blue-500 transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item}
                      </a>
                    ) : (
                      <p
                        key={i}
                        className="text-sm hover:text-blue-500 transition-colors cursor-pointer"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item}
                      </p>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-6 sm:p-8 rounded-2xl border"
              style={{
                background: isDark
                  ? "rgba(15,23,42,0.6)"
                  : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
                boxShadow: isDark
                  ? "0 20px 50px rgba(0,0,0,0.3)"
                  : "0 20px 50px rgba(0,0,0,0.07)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <TextInput
                  id="name"
                  label="Full Name"
                  placeholder="Full Name"
                  values={contactForm.values}
                  errors={contactForm.errors}
                  touched={contactForm.touched}
                  handleChange={contactForm.handleChange}
                  handleBlur={contactForm.handleBlur}
                />
                <TextInput
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Email Address"
                  values={contactForm.values}
                  errors={contactForm.errors}
                  touched={contactForm.touched}
                  handleChange={contactForm.handleChange}
                  handleBlur={contactForm.handleBlur}
                />
                <TextInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone Number"
                  className="sm:col-span-2"
                  values={contactForm.values}
                  errors={contactForm.errors}
                  touched={contactForm.touched}
                  handleChange={contactForm.handleChange}
                  handleBlur={contactForm.handleBlur}
                />
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message / Package Details"
                  rows={4}
                  value={contactForm.values.message}
                  onChange={contactForm.handleChange}
                  onBlur={contactForm.handleBlur}
                  className="sm:col-span-2 w-full px-4 py-3 bg-transparent rounded-xl border outline-none transition-all duration-200 resize-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] hover:border-blue-300/50"
                  style={{
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
                <motion.button
                  className="sm:col-span-2 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                    color: "#ffffff",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(30,41,59,1), rgba(30,41,59,0))"
            : "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(30,41,59,1), rgba(30,41,59,0))"
            : "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
    </section>
  );
};

const HomePage: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <SeventhAirHero planeImageUrl={planeImg} />
      <main
        className="relative z-10"
        style={{ background: "var(--bg-primary)" }}
      >
        <GlobeSection />
        <SeventhAirFeatures />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Slider />
        </section>
        <Testimonials />
        <TrackingSection />
        <StatsSection />
        <ContactSection />
        <Faq />
      </main>
    </div>
  );
};

export default HomePage;
