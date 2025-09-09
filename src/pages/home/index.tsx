import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Truck,
  Shield,
  Clock,
  Globe,
  Phone,
  Mail,
  MapPin,
  Package,
  ChevronDown,
} from "lucide-react";
import SeventhAirHero from "./components/hero";
import planeImg from "@/assets/images/cargo.png";
import globe from "@/assets/images/globe.png";
import { motion, useInView } from "framer-motion";
import SeventhAirFeatures from "./components/feature";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import Faq from "./components/faq";


// Banner data - you can easily modify this array to add more banners
const bannerData = [
  {
    id: 1,
    title: "Fast & Reliable Delivery",
    subtitle: "UK to Ghana in just 3 working days",
    image: "/api/placeholder/1200/600",
    cta: "Track Your Package",
  },
  {
    id: 2,
    title: "Secure International Shipping",
    subtitle: "Your parcels, our priority - delivered safely",
    image: "/api/placeholder/1200/600",
    cta: "Get Quote",
  },
  {
    id: 3,
    title: "Minimum 5kg Packages",
    subtitle: "Affordable rates for all your shipping needs",
    image: "/api/placeholder/1200/600",
    cta: "Learn More",
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    subtitle: "We're here to help whenever you need us",
    image: "/api/placeholder/1200/600",
    cta: "Contact Us",
  },
];

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "3 working days from UK to Ghana and vice versa with our efficient freight service",
  },
  {
    icon: Shield,
    title: "Secure Shipping",
    description:
      "Your packages are protected with our reliable freight service and full insurance coverage",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description:
      "Track your packages every step of the way with our advanced tracking system",
  },
  {
    icon: Globe,
    title: "International Coverage",
    description:
      "Seamless shipping between UK and Ghana with full customs support",
  },
];

const faqs = [
  {
    question: "What is the minimum package weight?",
    answer:
      "We accept packages with a minimum weight of 5kg. This ensures cost-effective shipping for our customers and helps us maintain competitive pricing.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3 working days from UK to Ghana and Ghana to UK. Express options may be available for urgent shipments.",
  },
  {
    question: "How can I track my package?",
    answer:
      "Simply enter your tracking code on our website or contact us with your package ID for real-time updates on your shipment's location and status.",
  },
  {
    question: "What items can I ship?",
    answer:
      "We ship most personal items, electronics, documents, gifts, and household goods. Prohibited items include hazardous materials, perishables, and restricted goods.",
  },
  {
    question: "How do I get a shipping quote?",
    answer:
      "Contact us via phone or WhatsApp with your package details (weight, dimensions, destination) for an instant quote tailored to your needs.",
  },
  {
    question: "Do you provide packaging services?",
    answer:
      "Yes, we offer professional packaging services to ensure your items are properly secured for international shipping. Additional charges may apply.",
  },
];

// Slider Component with auto-scroll and manual controls
const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerData.length);
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length
    );
  };

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-red-500 shadow-2xl">
      {bannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-red-500/80 z-10"></div>
          <div className="relative z-20 flex items-center justify-center h-full text-center text-white px-4">
            <div className="max-w-4xl transform transition-all duration-700 ease-out">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {banner.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 transform transition-all duration-500 delay-200">
                {banner.subtitle}
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                {banner.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 ttext-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// FAQ Component with smooth animations
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 rounded-lg"
          >
            <span className="font-semibold text-gray-800 pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };
  return (
    <div className="min-h-screen ">
      <SeventhAirHero planeImageUrl={planeImg} />

      <main className="relative z-10 bg-white/95 ">
        {/* Hero Section with Slider */}
        <section ref={ref} className="relative ">
          <div className="max-w-7xl flex flex-col md:flex-row justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Thread-like Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient
                    id="thread-gradient-1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient
                    id="thread-gradient-2"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
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
                  ease: "easeInOut",
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
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative z-10 flex-1">
              <img src={globe} alt="" className="" />
            </div>
            <div className="relative z-10 flex-1">
              <motion.h1
                className="text-5xl lg:text-7xl font-bold  md:text-right"
                variants={itemVariants}
              >
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Comfortable
                </span>
                <span className="block text-gray-900 text-4xl">
                  Solution Of Cargo By
                </span>
                <span className="block text-3xl lg:text-5xl mt-2 text-gray-700">
                  Seventh Air Limited
                </span>
              </motion.h1>

              <motion.p className="text-base leading-relaxed md:text-right text-gray-700 mt-6">
                The overall supply chain is a network of businesses as well{" "}
                <br />
                as most organizations working in a sequence of processes <br />
                over including logistics to produce and distribute goods
              </motion.p>

              <div className="flex justify-end mt-5">
                <motion.div
                  className="relative"
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
                      
                      <MdOutlineRoundaboutRight className="w-5 h-5" />
                      <span>ABOUT US</span>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <SeventhAirFeatures />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Slider />
        </section>
       

        {/* Package Tracking Section */}
        <section id="tracking" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-red-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="max-w-4xl mx-auto text-center">
                <Package className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-4xl font-bold mb-6">Track Your Package</h2>
                <p className="text-xl mb-8 opacity-90">
                  Enter your tracking code to get real-time updates on your
                  shipment
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Enter tracking code"
                    className="flex-1 px-6 py-4 rounded-full text-gray-800 text-center font-semibold focus:ring-4 focus:ring-white focus:ring-opacity-50 outline-none transition-all duration-300"
                  />
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Track Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "5kg+", label: "Minimum Weight" },
                { number: "3", label: "Working Days" },
                { number: "24/7", label: "Customer Support" },
                { number: "100%", label: "Secure Delivery" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.05)_0%,transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                Ready to ship? Contact us for a quote
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Ghana: +233 202812225
                    </p>
                    <p className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      UK: +447708211000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">Email</h3>
                    <p className="text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                      info@seventhair.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Service Areas
                    </h3>
                    <p className="text-gray-600">United Kingdom ↔ Ghana</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message / Package Details"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className=" bg-gray-50">
          <Faq />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
