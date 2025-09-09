import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import fork from "@/assets/images/fork.png";
import { ChevronDown } from "lucide-react";

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

function Faq() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
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
    <section ref={ref} className="relative ">
      <div className="max-w-7xl flex justify-between gap-6 items-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <img src={fork} alt="" className="" />
        </div>
        <div className="relative z-10 flex-1">
          <FAQ />
        </div>
      </div>
    </section>
  );
}

export default Faq;
