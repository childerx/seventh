import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Package, Shield, Clock, ChevronDown } from "lucide-react";
import planeImg from "@/assets/images/cargo.png";
import { LuArrowRightLeft } from "react-icons/lu";
import { useTheme } from "@/context/theme-context";

const SeventhAirHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDark } = useTheme();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const scrollToNext = () => {
    document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(isDark ? 0x0f172a : 0xffffff, 10, 100);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // WebGL context loss recovery
    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    }, false);

    renderer.domElement.addEventListener('webglcontextrestored', () => {
      // Re-render on next frame
      requestAnimationFrame(() => renderer.render(scene, camera));
    }, false);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    setTimeout(() => setIsLoaded(true), 100);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.4,
      color: isDark ? 0x3b82f6 : 0x3b82f6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      const posArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < Math.min(posArray.length, particlesCount * 3); i += 3) {
        posArray[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isDark]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 80, damping: 15 } },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 50%, #ffffff 100%)',
      }}
    >
      {/* Background gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.12)' }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.12)' }}
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Scene */}
      <motion.div ref={mountRef} className="absolute inset-0 z-10" style={{ opacity, scale }} />

      {/* Content */}
      <motion.div className="relative z-20 h-full flex items-center" style={{ y }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="space-y-6 sm:space-y-8 pt-16 sm:pt-20">
              <motion.div variants={itemVariants}>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                  }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5 font-semibold" style={{ color: isDark ? '#e2e8f0' : '#374151' }}>
                    <span className="text-sm leading-tight">Now Shipping • 🌍 Worldwide</span>
                    <LuArrowRightLeft className="w-3.5 h-3.5 hidden sm:inline-block flex-shrink-0" />
                    <span className="text-xs sm:text-sm leading-tight" style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>International & Domestic</span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-none" style={{ fontFamily: 'var(--font-heading)' }} variants={itemVariants}>
                <span className="relative inline-block">
                  <span
                    className="block bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% auto',
                      animation: 'shimmer 4s ease-in-out infinite',
                      WebkitTextStroke: isDark ? '1px rgba(59,130,246,0.3)' : '1px rgba(30,64,175,0.15)',
                    }}
                  >CARGO</span>
                </span>
                <span
                  className="block tracking-[0.15em] sm:tracking-[0.2em] mt-1"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: isDark ? '1.5px rgba(148,163,184,0.5)' : '1.5px rgba(30,64,175,0.25)',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                  }}
                >DELIVERY</span>
                <span
                  className="block text-xl sm:text-2xl lg:text-3xl mt-3 font-medium tracking-[0.12em] uppercase"
                  style={{ color: 'var(--text-secondary)', letterSpacing: '0.15em' }}
                >
                  Seventh Air Limited
                </span>
              </motion.h1>

              <motion.p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }} variants={itemVariants}>
                Fast, reliable, and convenient international & domestic shipping. From small parcels to large cargo, we deliver with precision worldwide.
              </motion.p>

              <motion.div className="grid grid-cols-3 gap-3 sm:gap-4" variants={itemVariants}>
                {[
                  { icon: Clock, value: "3", label: "Days Delivery", color: "text-blue-600" },
                  { icon: Package, value: "5kg", label: "Min Weight", color: "text-red-600" },
                  { icon: Shield, value: "100%", label: "Insured", color: "text-blue-600" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-3 sm:p-4 border"
                    style={{
                      background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(12px)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} mb-2`} />
                    <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div className="flex flex-wrap gap-3 sm:gap-4" variants={itemVariants}>
                <motion.button
                  className="flex justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg"
                  style={{ background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)', color: '#ffffff' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="flex items-center space-x-2">
                    <span>Start Shipping</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>

                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Track Package
                </motion.button>
              </motion.div>
            </div>

            <motion.div className="hidden lg:flex justify-center" variants={itemVariants}>
              <div className="relative">
                <img src={planeImg} alt="Cargo Plane" className="w-full max-w-lg" />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer focus:outline-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-label="Scroll to next section"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: 'var(--text-tertiary)' }}>
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default SeventhAirHero;
