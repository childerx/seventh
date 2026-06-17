import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Box,
  Thermometer,
  Ruler,
  Weight,
  CheckCircle,
  ArrowRight,
  Package,
} from "lucide-react";
import containerImg from "@/assets/images/container.jpg";
import planeCargo1 from "@/assets/images/plane-cargo1.jpg";
import ban2 from "@/assets/images/f3.jpeg";
import { useTheme } from "@/context/theme-context";
import { useModalContext } from "@/context/modal-context";

const containers = [
  {
    id: "20ft",
    label: "20ft Container",
    tagline: "The Compact Powerhouse.",
    icon: Box,
    color: "#1e40af",
    image: containerImg,
    description:
      "Our 20-foot standard container is the most commonly used unit in global shipping. Ideal for dense, heavy goods, palletised cargo, and household effects. It provides a secure, weather-tight environment for your shipment from origin to destination.",
    specs: [
      { label: "Internal Length", value: "5.90 m" },
      { label: "Internal Width", value: "2.35 m" },
      { label: "Internal Height", value: "2.39 m" },
      { label: "Capacity", value: "~33 m³" },
      { label: "Max Payload", value: "21,770 kg" },
      { label: "Tare Weight", value: "2,230 kg" },
    ],
    highlights: [
      "Ideal for dense, heavy cargo",
      "Palletised and bulk goods",
      "Household moves & personal effects",
      "Weather-tight steel construction",
      "Customs-sealed for international transit",
      "Available as FCL or LCL",
    ],
  },
  {
    id: "40ft",
    label: "40ft Container",
    tagline: "Maximum Capacity. Maximum Value.",
    icon: Package,
    color: "#dc2626",
    image: planeCargo1,
    description:
      "Double the volume of a 20ft unit, our 40-foot container is the go-to choice for large shipments, furniture, vehicles, and high-volume retail orders. The extra length means fewer containers per shipment and significant cost savings on a per-unit basis.",
    specs: [
      { label: "Internal Length", value: "12.03 m" },
      { label: "Internal Width", value: "2.35 m" },
      { label: "Internal Height", value: "2.39 m" },
      { label: "Capacity", value: "~67 m³" },
      { label: "Max Payload", value: "26,750 kg" },
      { label: "Tare Weight", value: "3,750 kg" },
    ],
    highlights: [
      "Twice the volume of a 20ft unit",
      "Vehicles, furniture & large machinery",
      "High-volume retail & e-commerce orders",
      "40ft High Cube option available (+30cm height)",
      "Cost-effective for large, light cargo",
      "Available as FCL",
    ],
  },
  {
    id: "refrigerated",
    label: "Refrigerated Container",
    tagline: "Cold Chain. Guaranteed.",
    icon: Thermometer,
    color: "#0891b2",
    image: ban2,
    description:
      "Also known as Reefer containers, our refrigerated units maintain precise temperature control throughout the entire journey. Perfect for perishable food, pharmaceuticals, flowers, and any cargo that demands an unbroken cold chain from pickup to delivery.",
    specs: [
      { label: "Temperature Range", value: "-25°C to +25°C" },
      { label: "Available Sizes", value: "20ft & 40ft" },
      { label: "Power Source", value: "Shore power + genset" },
      { label: "Humidity Control", value: "Yes" },
      { label: "Monitoring", value: "Real-time data logging" },
      { label: "Certifications", value: "ATP certified" },
    ],
    highlights: [
      "Unbroken cold chain from origin to door",
      "Fresh produce, meat & seafood",
      "Pharmaceuticals & vaccines",
      "Flowers, plants & perishables",
      "Real-time temperature monitoring",
      "24/7 alarm & alert system",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

interface ContainerSectionProps {
  container: (typeof containers)[0];
  index: number;
}

const ContainerSection: React.FC<ContainerSectionProps> = ({
  container,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();
  const Icon = container.icon;
  const isEven = index % 2 === 0;

  return (
    <section
      id={container.id}
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          index % 2 === 0
            ? isDark
              ? "#0f172a"
              : "#ffffff"
            : isDark
              ? "#1e293b"
              : "#f8fafc",
      }}
    >
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-15"
        style={{
          width: 500,
          height: 500,
          background: container.color,
          top: "50%",
          [isEven ? "right" : "left"]: "-10%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            isEven ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={container.image}
              alt={container.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${container.color}44 0%, transparent 60%)`,
              }}
            />
            {/* Spec chips */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              {container.specs.slice(0, 3).map((s, i) => (
                <div
                  key={i}
                  className="px-2 py-1.5 rounded-xl backdrop-blur-md text-white text-center"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                >
                  <div className="text-[11px] font-bold leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[9px] opacity-70 mt-0.5 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-4"
                style={{
                  background: `${container.color}15`,
                  borderColor: `${container.color}30`,
                  color: container.color,
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{container.label}</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                {container.tagline}
              </h2>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {container.description}
              </p>
            </motion.div>

            {/* Full spec grid */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {container.specs.map((spec, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border"
                  style={{
                    background: isDark
                      ? "rgba(30,41,59,0.5)"
                      : "rgba(248,250,252,0.8)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {i === 0 ? (
                      <Ruler
                        className="w-3.5 h-3.5"
                        style={{ color: container.color }}
                      />
                    ) : i === 4 ? (
                      <Weight
                        className="w-3.5 h-3.5"
                        style={{ color: container.color }}
                      />
                    ) : (
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: container.color }}
                      />
                    )}
                    <span
                      className="text-[10px] uppercase tracking-wide font-semibold"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {spec.label}
                    </span>
                  </div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.ul
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {container.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: container.color }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {h}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.button
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${container.color}, #1e40af)`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book This Container
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContainersPage: React.FC = () => {
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
        style={{ background: isDark ? "#0f172a" : "#ffffff" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[130px]"
            style={{
              background: isDark
                ? "rgba(30,64,175,0.15)"
                : "rgba(30,64,175,0.08)",
            }}
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{
              background: isDark
                ? "rgba(8,145,178,0.12)"
                : "rgba(8,145,178,0.07)",
            }}
            animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-6"
              style={{
                background: isDark
                  ? "rgba(30,41,59,0.6)"
                  : "rgba(255,255,255,0.8)",
                borderColor: isDark
                  ? "rgba(59,130,246,0.25)"
                  : "rgba(59,130,246,0.2)",
                color: "var(--primary-blue-light)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Container Types</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
              }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Containers
              </span>
            </h1>
            <p
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              From standard dry freight to temperature-controlled reefers, we
              offer the right container for every cargo type and every route.
            </p>

            {/* Quick jump */}
            <div className="flex flex-wrap justify-center gap-2">
              {containers.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all hover:scale-105"
                  style={{
                    background: isDark
                      ? "rgba(30,41,59,0.5)"
                      : "rgba(255,255,255,0.7)",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <c.icon className="w-3.5 h-3.5" />
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {containers.map((container, index) => (
        <ContainerSection
          key={container.id}
          container={container}
          index={index}
        />
      ))}

      {/* CTA */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: isDark ? "#1e293b" : "#f8fafc" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            Need help choosing?
          </h2>
          <p
            className="text-base sm:text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell us about your cargo and we'll recommend the right container
            type, size, and route for the best price.
          </p>
          <motion.button
            onClick={openContactModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #0891b2 100%)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get a Container Quote
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ContainersPage;
