import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  easeInOut,
} from "framer-motion";
import {
  ArrowRight,
  Globe,
  Package,
  Plane,
  Shield,
  Clock,
  ChevronDown,
  Upload,
} from "lucide-react";
import planeImg from "@/assets/images/cargo.png";
import { LuArrowRightLeft } from "react-icons/lu";

interface SeventhAirHeroProps {
  planeImageUrl?: string;
}

const SeventhAirHero: React.FC<SeventhAirHeroProps> = ({ planeImageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(
    planeImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Three.js 3D Scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 10, 100);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.mapSize.set(2048, 2048);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xef4444, 0.3);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

    // Create plane with image texture or 3D model
    let planeObject: THREE.Mesh | THREE.Group;

    if (imageFile) {
      // Load the cargo plane image as texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(imageFile, (texture) => {
        // Create a plane geometry to display the image
        const aspectRatio = texture.image.width / texture.image.height;
        const planeWidth = 8 * aspectRatio;
        const planeHeight = 8;

        const geometry = new THREE.PlaneGeometry(
          planeWidth,
          planeHeight,
          32,
          32
        );

        // Add some displacement for 3D effect
        const vertices = geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i + 1];
          // Create subtle 3D bulge in the center
          const distance = Math.sqrt(x * x + y * y);
          vertices[i + 2] = Math.exp(-distance * 0.1) * 0.5;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        // Material with transparency support
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.5,
          side: THREE.DoubleSide,
          specular: 0xffffff,
          shininess: 100,
          emissive: 0xffffff,
          emissiveIntensity: 0.05,
        });

        planeObject = new THREE.Mesh(geometry, material);
        planeObject.castShadow = true;
        planeObject.receiveShadow = true;
        planeRef.current = planeObject;
        scene.add(planeObject);
      });
    } else {
      // Fallback: Create 3D plane model if no image
      const createCargoPlane = () => {
        const group = new THREE.Group();

        // Fuselage (main body)
        const fuselageGeometry = new THREE.CylinderGeometry(0.8, 1, 6, 16);
        const fuselageMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 0.1,
          specular: 0x111111,
          shininess: 100,
        });
        const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
        fuselage.rotation.z = Math.PI / 2;
        fuselage.castShadow = true;
        group.add(fuselage);

        // Nose cone
        const noseGeometry = new THREE.ConeGeometry(0.8, 1.5, 16);
        const nose = new THREE.Mesh(noseGeometry, fuselageMaterial);
        nose.rotation.z = -Math.PI / 2;
        nose.position.x = 3.75;
        group.add(nose);

        // Main wings
        const wingGeometry = new THREE.BoxGeometry(8, 0.1, 2);
        const wingMaterial = new THREE.MeshPhongMaterial({
          color: 0xf0f0f0,
          emissive: 0xffffff,
          emissiveIntensity: 0.05,
        });
        const wings = new THREE.Mesh(wingGeometry, wingMaterial);
        wings.position.x = -0.5;
        wings.castShadow = true;
        group.add(wings);

        // Tail fin with brand colors
        const tailGeometry = new THREE.BoxGeometry(0.1, 2.5, 1.5);
        const tailMaterial = new THREE.MeshPhongMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 0.1,
        });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-2.8, 1.2, 0);
        group.add(tail);

        // Logo triangle
        const logoGeometry = new THREE.ConeGeometry(0.4, 0.8, 3);
        const logoMaterial = new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.3,
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.rotation.z = Math.PI;
        logo.position.set(-2.75, 1.5, 0);
        group.add(logo);

        return group;
      };

      planeObject = createCargoPlane();
      planeObject.scale.set(1.2, 1.2, 1.2);
      scene.add(planeObject);
    }

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Alternate between blue and red particles
      if (i % 2 === 0) {
        colors[i * 3] = 0.23; // R for blue
        colors[i * 3 + 1] = 0.51; // G for blue
        colors[i * 3 + 2] = 0.96; // B for blue
      } else {
        colors[i * 3] = 0.94; // R for red
        colors[i * 3 + 1] = 0.26; // G for red
        colors[i * 3 + 2] = 0.26; // B for red
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create spiral clouds/smoke trail
    const createSpiralTrail = () => {
      const trailGroup = new THREE.Group();

      for (let j = 0; j < 3; j++) {
        const spiralPoints = [];
        const offset = j * 120;

        for (let i = 0; i < 100; i++) {
          const angle = i * 0.2 + offset;
          const radius = 2 + i * 0.02;
          spiralPoints.push(
            new THREE.Vector3(
              -i * 0.1 - 3,
              Math.sin(angle) * radius * 0.3,
              Math.cos(angle) * radius * 0.3
            )
          );
        }

        const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
        const spiralGeometry = new THREE.TubeGeometry(
          spiralCurve,
          100,
          0.05,
          8,
          false
        );
        const spiralMaterial = new THREE.MeshPhongMaterial({
          color: j === 0 ? 0x3b82f6 : j === 1 ? 0xffffff : 0xef4444,
          transparent: true,
          opacity: 0.2,
          emissive: j === 0 ? 0x3b82f6 : j === 1 ? 0xffffff : 0xef4444,
          emissiveIntensity: 0.1,
        });
        const spiral = new THREE.Mesh(spiralGeometry, spiralMaterial);
        trailGroup.add(spiral);
      }

      return trailGroup;
    };

    const spiralTrail = createSpiralTrail();
    scene.add(spiralTrail);

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Plane animations
      if (planeRef.current) {
        // Floating animation
        planeRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
        planeRef.current.position.x = Math.sin(Date.now() * 0.0005) * 0.5;

        // Rotation based on mouse
        planeRef.current.rotation.y = mousePosition.x * 0.5;
        planeRef.current.rotation.x = -mousePosition.y * 0.3;
        planeRef.current.rotation.z =
          Math.sin(Date.now() * 0.001) * 0.05 + mousePosition.x * 0.1;
      }

      // Particle animation
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Update particle positions for floating effect
      const positions = particles.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Spiral trail animation
      spiralTrail.rotation.x += 0.001;
      spiralTrail.position.x = Math.sin(Date.now() * 0.0003) * 2;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Set loaded state
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePosition, imageFile]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut, // Use imported easing function
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-red-50/20"
    >
      {/* Image Upload Control - Remove this in production */}
      {!imageFile && (
        <div className="absolute top-4 right-4 z-50">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/90 backdrop-blur-lg px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Load Plane Image</span>
          </motion.button>
        </div>
      )}

      {/* Animated Spiral Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Spiral SVG patterns */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="spiral-gradient-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="spiral-gradient-2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Multiple animated spiral paths */}
          <motion.path
            d="M -100 540 Q 480 200, 960 540 T 1920 540"
            stroke="url(#spiral-gradient-1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M -100 600 Q 480 900, 960 600 T 1920 600"
            stroke="url(#spiral-gradient-2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0 300 Q 960 100, 1920 300"
            stroke="url(#spiral-gradient-1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
          />

          {/* Animated circles */}
          <motion.circle
            cx="200"
            cy="200"
            r="100"
            stroke="#3b82f6"
            strokeWidth="0.5"
            fill="none"
            strokeOpacity="0.2"
            animate={{
              r: [100, 150, 100],
              strokeOpacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="1720"
            cy="880"
            r="150"
            stroke="#ef4444"
            strokeWidth="0.5"
            fill="none"
            strokeOpacity="0.2"
            animate={{
              r: [150, 200, 150],
              strokeOpacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="960"
            cy="540"
            r="200"
            stroke="#ffffff"
            strokeWidth="0.3"
            fill="none"
            strokeOpacity="0.1"
            animate={{
              r: [200, 300, 200],
              strokeOpacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 3D Scene Container */}
      <motion.div
        ref={mountRef}
        className="absolute inset-0 z-10"
        style={{ opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Content Overlay */}
      <motion.div
        className="relative z-20 h-full flex items-center"
        style={{ y }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div className="inline-block" variants={itemVariants}>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full border border-blue-200/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                    <span className="">Now Operating • 🇬🇧 UK</span>
                    <LuArrowRightLeft />
                    <span className="">🇬🇭 Ghana</span>
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-5xl lg:text-7xl font-bold"
                variants={itemVariants}
              >
                <span className="block bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
                  CARGO
                </span>
                <span className="block text-gray-900">DELIVERY</span>
                <span className="block text-3xl lg:text-5xl mt-2 text-gray-700">
                  Seventh Air Limited
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-xl font-serif font-medium text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                Fast, reliable, and convenient international shipping. From
                small parcels to large cargo, we deliver with precision and care
                across UK and Ghana.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                variants={itemVariants}
              >
                <div className="bg-black/10 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-2xl">
                  <Clock className="w-6 h-6 text-blue-900 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-xs text-gray-600">Days Delivery</div>
                </div>
                <div className="bg-black/10 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-2xl">
                  <Package className="w-6 h-6 text-red-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5kg</div>
                  <div className="text-xs text-gray-600">Min Weight</div>
                </div>
                <div className="bg-black/10 backdrop-blur-lg rounded-xl p-4 border border-white/50 shadow-2xl">
                  <Shield className="w-6 h-6 text-blue-900 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Insured</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.button
                  className="group px-8 py-4 relative group  overflow-hidden text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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

                  <span className="relative z-10 flex items-center space-x-2 text-white">
                    <span className="text-white">Start Shipping</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <motion.button
                  className="px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-blue-400 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Track Package
                </motion.button>
              </motion.div>
            </div>

            {/* Right side - Features */}
            <motion.div
              className="hidden lg:block"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="relative">
                <img src={planeImg} alt="" className="" />

                {/* Feature cards floating around */}
                <motion.div
                  className="absolute bottom-10 right-10 bg-white/80 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-white/50"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Plane className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">Air Freight</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 left-10 bg-white/80 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-white/50"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Globe className="w-8 h-8 text-red-600 mb-2" />
                  <div className="text-sm font-medium">Global Reach</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SeventhAirHero;
