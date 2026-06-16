import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import test1 from "@/assets/images/test1.png";
import test2 from "@/assets/images/test2.png";
import test3 from "@/assets/images/test3.png";
import test4 from "@/assets/images/test4.png";
import test5 from "@/assets/images/test5.png";
import test6 from "@/assets/images/test6.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = [test2, test1, test6, test4, test5, test3];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "London Imports Ltd",
    content:
      "Seventh Air has transformed how we ship goods internationally. Their fast delivery is incredibly reliable.",
    rating: 5,
    image: images[0],
    category: "Business",
  },
  {
    id: 2,
    name: "Kwame Asante",
    role: "E-commerce Manager",
    company: "Accra Online Market",
    content:
      "The consistency in delivery times and professional handling of our packages is unmatched. Highly recommended!",
    rating: 5,
    image: images[1],
    category: "E-commerce",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Operations Director",
    company: "Global Trade Solutions",
    content:
      "Customs handling is exceptional. Seventh Air manages everything seamlessly with responsive customer service.",
    rating: 5,
    image: images[2],
    category: "Logistics",
  },
  {
    id: 4,
    name: "Alicia Thompson",
    role: "Supply Chain Manager",
    company: "West African Distributors",
    content:
      "From small parcels to large containers, Seventh Air handles everything with professionalism and care.",
    rating: 5,
    image: images[3],
    category: "Supply Chain",
  },
  {
    id: 5,
    name: "David Osei",
    role: "Founder",
    company: "Global Trade Connect",
    content:
      "Great rates, fast delivery, and packages always arrive in perfect condition. Five stars all the way!",
    rating: 5,
    image: images[4],
    category: "Personal",
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Logistics Coordinator",
    company: "Express Freight UK",
    content:
      "The real-time tracking system gives us complete visibility. Seventh Air is our most trusted shipping partner.",
    rating: 5,
    image: images[5],
    category: "Freight",
  },
];

const PEEK = 12;
const SCROLL_PER_CARD = 600;

const TestimonialCard: React.FC<{
  t: (typeof testimonials)[0];
  index: number;
}> = ({ t }) => {
  const { isDark } = useTheme();
  return (
    <div
      className="testimonial-card w-full rounded-3xl overflow-hidden border"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 25px 50px rgba(0,0,0,0.4)"
          : "0 25px 50px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-72 h-48 md:h-[320px] flex-shrink-0 overflow-hidden">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
            {t.category}
          </div>
        </div>
        <div
          className="flex-1 p-6 md:p-8 flex flex-col justify-between"
          style={{
            backgroundImage: isDark
              ? `linear-gradient(rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(59, 130, 246, 0.06) 0.5px, transparent 0.5px)`
              : `linear-gradient(rgba(30, 64, 175, 0.03) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(30, 64, 175, 0.03) 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <Quote
                className="w-8 h-8 opacity-15"
                style={{ color: "var(--primary-blue-light)" }}
              />
            </div>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: isDark ? "#e2e8f0" : "#374151" }}
            >
              "{t.content}"
            </p>
          </div>
          <div className="flex items-center gap-1.5 justify-between">
            <div className="flex-1">
              <h4
                className="font-bold text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                {t.name}
              </h4>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {t.role} at {t.company}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
              }}
            >
              {t.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
      if (!cards.length || !cardsRef.current || !sectionRef.current) return;

      const total = cards.length;

      // Measure natural card height before making them absolute
      const cardH = cards[0].offsetHeight;

      // Fix container height to show full stack including peek offsets
      cardsRef.current.style.height = `${cardH + (total - 1) * PEEK}px`;

      // Stack all cards: absolute, overlapping, with slight y + scale offsets
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (i) => total - i,
        y: (i) => i * PEEK,
        scale: (i) => 1 - i * 0.025,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline();

      for (let i = 0; i < total - 1; i++) {
        // Fly current top card upward out of view
        tl.to(cards[i], {
          y: -600,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
        });
        // Simultaneously pull remaining cards up one slot
        tl.to(
          cards.slice(i + 1),
          {
            y: (j) => j * PEEK,
            scale: (j) => 1 - j * 0.025,
            duration: 1,
            ease: "power2.inOut",
          },
          "<",
        );
      }

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(total - 1) * SCROLL_PER_CARD}`,
        scrub: 1.5,
        animation: tl,
        invalidateOnRefresh: true,
      });

      return () => st.kill();
    },
    { scope: sectionRef },
  );

  return (
    // Tall section provides the scroll distance; sticky inner stays in view throughout
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `calc(100vh + ${(testimonials.length - 1) * SCROLL_PER_CARD}px)`,
        background: isDark ? "#0f172a" : "#ffffff",
      }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: isDark
                ? "rgba(59,130,246,0.08)"
                : "rgba(59,130,246,0.04)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: isDark
                ? "rgba(239,68,68,0.08)"
                : "rgba(239,68,68,0.04)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span
                className="tracking-[0.06em]"
                style={{ color: "var(--text-primary)" }}
              >
                What Our{" "}
              </span>
              <span
                className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                  animation: "shimmer 4s ease-in-out infinite",
                  WebkitTextStroke: isDark
                    ? "1px rgba(59,130,246,0.3)"
                    : "1px rgba(30,64,175,0.15)",
                }}
              >
                Clients Say
              </span>
            </h2>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Trusted by businesses and individuals across the globe
            </p>
          </motion.div>

          {/* Sidebar + card stack */}
          <div className="flex gap-8 lg:gap-12 items-start">
            {/* Sidebar — visible on large screens only */}
            <div className="hidden lg:flex flex-col justify-start w-52 flex-shrink-0 pt-2">
              <h3
                className="text-2xl lg:text-3xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Trusted by
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  100+ Clients
                </span>
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Scroll to discover what our clients say.
              </p>
            </div>

            {/* Card stack — cardsRef gets a fixed height set by GSAP */}
            <div ref={cardsRef} className="flex-1 relative">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
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
              ? "linear-gradient(to top, rgba(30,41,59,1), rgba(30,41,59,0))"
              : "linear-gradient(to top, rgba(248,250,252,1), rgba(248,250,252,0))",
          }}
        />
      </div>
    </section>
  );
};

export default Testimonials;
