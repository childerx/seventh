import { motion, useInView } from "framer-motion";
import React, { useState } from "react";
import { ChevronDown, HelpCircle, CheckCircle, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const faqs = [
  { question: "What is the minimum package weight?", answer: "We accept packages with a minimum weight of 5kg. This ensures cost-effective shipping and helps us maintain competitive pricing." },
  { question: "How long does delivery take?", answer: "International delivery typically takes 3–5 working days depending on destination. Domestic and regional shipments may be faster. Express options are available for urgent shipments." },
  { question: "How can I track my package?", answer: "Enter your tracking code on our website or contact us with your package ID for real-time updates on your shipment." },
  { question: "What items can I ship?", answer: "We ship personal items, electronics, documents, gifts, and household goods. Prohibited items include hazardous materials and perishables." },
  { question: "How do I get a shipping quote?", answer: "Contact us via phone or WhatsApp with your package details (weight, dimensions, destination) for an instant quote." },
  { question: "Do you provide packaging services?", answer: "Yes, we offer professional packaging services to ensure your items are properly secured for international shipping." },
];

function Faq() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isDark } = useTheme();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ background: isDark ? '#0f172a' : '#f8fafc' }}>
      {/* Thread background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="faq-thread-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="faq-thread-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <motion.path d="M 0 200 Q 400 100, 800 200 T 1600 200" stroke="url(#faq-thread-1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2 }} />
          <motion.path d="M 0 400 Q 400 500, 800 400 T 1600 400" stroke="url(#faq-thread-2)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.3 }} />
          <motion.path d="M 0 600 Q 400 700, 800 600 T 1600 600" stroke="url(#faq-thread-1)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.6 }} />
          <motion.path d="M 0 800 Q 400 900, 800 800 T 1600 800" stroke="url(#faq-thread-2)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, delay: 0.9 }} />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Frequently Asked </span><br />
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Questions</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            className="hidden lg:flex flex-col gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-3xl p-8 border"
              style={{
                background: isDark ? 'rgba(30,41,59,0.65)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.35)' : '0 20px 50px rgba(0,0,0,0.07)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'linear-gradient(135deg, #1e40af, #dc2626)' }}
              >
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                Quick Answers
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Everything you need to know about shipping with Seventh Air. Can't find what you're looking for? Our team is ready to help.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['6 Key Topics', '24/7 Support', 'Expert Team', 'Fast Replies'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,197,94,0.15)' }}
                    >
                      <CheckCircle className="w-3 h-3" style={{ color: '#22c55e' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6 border relative overflow-hidden"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(30,64,175,0.08), rgba(220,38,38,0.05))'
                  : 'linear-gradient(135deg, rgba(30,64,175,0.04), rgba(220,38,38,0.02))',
                borderColor: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(30,64,175,0.15)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)',
                  transform: 'translate(50%, -50%)',
                }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)' }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: 'var(--primary-blue-light)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Still have questions?</p>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Talk to our team</p>
                </div>
              </div>
              <p
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #1e40af, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                +233 202 812 225
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Mon – Sat · 9am – 6pm GMT
              </p>
            </div>
          </motion.div>
          
          <motion.div className="space-y-3 sm:space-y-4" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border overflow-hidden transition-all duration-300 relative"
                style={{
                  background: isDark ? '#1e293b' : '#ffffff',
                  borderColor: openIndex === index
                    ? 'rgba(59,130,246,0.35)'
                    : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  boxShadow: openIndex === index
                    ? isDark ? '0 4px 24px rgba(59,130,246,0.1)' : '0 4px 24px rgba(59,130,246,0.06)'
                    : 'none',
                }}
              >
                {openIndex === index && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                    style={{ background: 'linear-gradient(to bottom, #1e40af, #dc2626)' }}
                  />
                )}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center"
                  style={{ color: 'var(--text-primary)', paddingLeft: openIndex === index ? '1.5rem' : undefined }}
                >
                  <span className="font-semibold pr-4 text-sm sm:text-base">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: openIndex === index ? 'var(--primary-blue-light)' : 'var(--text-tertiary)' }}
                    />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5" style={{ paddingLeft: openIndex === index ? '1.5rem' : undefined }}>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20" style={{ background: isDark ? "linear-gradient(to bottom, rgba(15,23,42,1), rgba(15,23,42,0))" : "linear-gradient(to bottom, rgba(248,250,252,1), rgba(248,250,252,0))" }} />
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20" style={{ background: isDark ? "linear-gradient(to top, rgba(15,23,42,1), rgba(15,23,42,0))" : "linear-gradient(to top, rgba(248,250,252,1), rgba(248,250,252,0))" }} />
    </section>
  );
}

export default Faq;
