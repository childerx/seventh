import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, MapPin, Clock, Package, CheckCircle, ArrowRight, BoxSelect, Shirt, Laptop, FileText } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useModalContext } from '@/context/modal-context';

import cp1 from '@/assets/images/cp1.jpeg';
import cp2 from '@/assets/images/cp2.jpeg';
import cp3 from '@/assets/images/cp3.jpeg';
import cp4 from '@/assets/images/cp4.jpeg';
import cp5 from '@/assets/images/cp5.jpeg';
import cp6 from '@/assets/images/cp6.jpeg';
import cp7 from '@/assets/images/cp7.jpeg';
import cp8 from '@/assets/images/cp8.jpeg';
import cp9 from '@/assets/images/cp9.jpeg';
import cp10 from '@/assets/images/cp10.jpeg';
import cp11 from '@/assets/images/cp11.jpeg';
import cp12 from '@/assets/images/cp12.jpeg';
import cp13 from '@/assets/images/cp13.jpeg';
import cp14 from '@/assets/images/cp14.jpeg';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollectionPoint {
  id: number;
  name: string;
  location: string;
  country: 'UK' | 'GH';
  x: number;
  y: number;
  image: string;
  address: string;
  hours: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NODES: CollectionPoint[] = [
  { id: 1,  x: 90,  y: 180, name: 'London Central', country: 'UK', location: 'Central London, UK',   image: cp1,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 2,  x: 260, y: 70,  name: 'Manchester',      country: 'UK', location: 'Manchester, UK',       image: cp2,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 3,  x: 440, y: 55,  name: 'Birmingham',      country: 'UK', location: 'Birmingham, UK',       image: cp3,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 4,  x: 620, y: 70,  name: 'Leeds',           country: 'UK', location: 'Leeds, UK',            image: cp4,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 5,  x: 810, y: 125, name: 'Glasgow',         country: 'UK', location: 'Glasgow, UK',          image: cp5,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 6,  x: 980, y: 255, name: 'Bristol',         country: 'UK', location: 'Bristol, UK',          image: cp6,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 7,  x: 960, y: 415, name: 'Liverpool',       country: 'UK', location: 'Liverpool, UK',        image: cp7,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 8,  x: 820, y: 520, name: 'Accra Central',   country: 'GH', location: 'Accra, Ghana',         image: cp8,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 9,  x: 640, y: 555, name: 'Kumasi',          country: 'GH', location: 'Kumasi, Ghana',        image: cp9,  address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 10, x: 445, y: 535, name: 'Tema',            country: 'GH', location: 'Tema, Ghana',          image: cp10, address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 11, x: 260, y: 475, name: 'Takoradi',        country: 'GH', location: 'Takoradi, Ghana',      image: cp11, address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 12, x: 90,  y: 380, name: 'Cape Coast',      country: 'GH', location: 'Cape Coast, Ghana',    image: cp12, address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 13, x: 315, y: 285, name: 'Tamale',          country: 'GH', location: 'Tamale, Ghana',        image: cp13, address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
  { id: 14, x: 595, y: 315, name: 'Koforidua',       country: 'GH', location: 'Koforidua, Ghana',     image: cp14, address: 'Contact us for exact address', hours: 'Mon–Sat: 9am–6pm' },
];

const EDGES: [number, number][] = [
  // Outer ring
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0],
  // Hub spokes to node 12 (Tamale) and node 13 (Koforidua)
  [0, 12], [1, 12], [2, 13], [3, 13], [5, 13], [6, 13], [7, 13], [9, 13], [10, 12], [11, 12],
  // Center hub connection
  [12, 13],
  // Additional cross connections
  [4, 13], [8, 13],
];

// ─── Grid dot positions (pre-computed for stable render) ──────────────────────

const GRID_DOTS: { cx: number; cy: number }[] = (() => {
  const dots: { cx: number; cy: number }[] = [];
  for (let col = 0; col <= 23; col++) {
    for (let row = 0; row <= 12; row++) {
      dots.push({ cx: col * 52 + 4, cy: row * 54 + 4 });
    }
  }
  return dots;
})();

// ─── Network Graph ─────────────────────────────────────────────────────────────

interface NetworkGraphProps {
  isDark: boolean;
  onNodeClick: (index: number) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ isDark, onNodeClick }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <svg
      viewBox="0 0 1200 650"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Clip paths for node images */}
        {NODES.map((node, i) => (
          <clipPath key={`clip-${i}`} id={`node-clip-${i}`}>
            <circle cx={node.x} cy={node.y} r={28} />
          </clipPath>
        ))}

        {/* Blue glow filter */}
        <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Red glow filter */}
        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node hover glow */}
        <filter id="glow-node" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Edge paths — forward and backward for animateMotion */}
        {EDGES.map((edge, i) => {
          const from = NODES[edge[0]];
          const to   = NODES[edge[1]];
          return (
            <React.Fragment key={`ep-${i}`}>
              <path id={`ep${i}f`} d={`M${from.x},${from.y} L${to.x},${to.y}`} />
              <path id={`ep${i}b`} d={`M${to.x},${to.y} L${from.x},${from.y}`} />
            </React.Fragment>
          );
        })}
      </defs>

      {/* 1. Background */}
      <rect width="1200" height="650" fill={isDark ? '#0a0f1e' : '#f0f4ff'} />

      {/* 2. Grid dot pattern */}
      {GRID_DOTS.map((dot, i) => (
        <circle
          key={`gd-${i}`}
          cx={dot.cx}
          cy={dot.cy}
          r={1}
          fill={isDark ? 'rgba(148,163,184,0.12)' : 'rgba(30,64,175,0.10)'}
        />
      ))}

      {/* 3. Edge lines */}
      {EDGES.map((edge, i) => {
        const from = NODES[edge[0]];
        const to   = NODES[edge[1]];
        return (
          <line
            key={`edge-${i}`}
            x1={from.x} y1={from.y}
            x2={to.x}   y2={to.y}
            stroke="rgba(59,130,246,0.2)"
            strokeWidth={1}
          />
        );
      })}

      {/* 4. Animated particles */}
      {EDGES.map((_, i) => (
        <React.Fragment key={`particles-${i}`}>
          {/* Forward particle — blue */}
          <circle r={3.5} fill="#3b82f6" filter="url(#glow-blue)">
            <animateMotion
              dur={`${2.5 + (i % 5) * 0.4}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#ep${i}f`} />
            </animateMotion>
          </circle>

          {/* Backward particle — red */}
          <circle r={3} fill="#ef4444" filter="url(#glow-red)" opacity={0.8}>
            <animateMotion
              dur={`${3 + (i % 4) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.6) % 3}s`}
            >
              <mpath href={`#ep${i}b`} />
            </animateMotion>
          </circle>
        </React.Fragment>
      ))}

      {/* 5. Nodes */}
      {NODES.map((node, i) => {
        const isHovered = hoveredNode === i;
        const isUK = node.country === 'UK';
        const badgeColor = isUK ? '#3b82f6' : '#f59e0b';

        return (
          <g key={`node-${i}`}>
            {/* Outer pulsing ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={36}
              fill="none"
              stroke={isHovered ? '#3b82f6' : 'rgba(59,130,246,0.4)'}
              strokeWidth={isHovered ? 2.5 : 1.5}
              filter={isHovered ? 'url(#glow-node)' : undefined}
            >
              {isHovered && (
                <animate
                  attributeName="r"
                  values="36;40;36"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Node image */}
            <image
              href={node.image}
              x={node.x - 28}
              y={node.y - 28}
              width={56}
              height={56}
              clipPath={`url(#node-clip-${i})`}
              preserveAspectRatio="xMidYMid slice"
            />

            {/* Country badge */}
            <circle
              cx={node.x + 20}
              cy={node.y - 20}
              r={7}
              fill={badgeColor}
              stroke={isDark ? '#0a0f1e' : '#f0f4ff'}
              strokeWidth={1.5}
            />

            {/* Invisible click target */}
            <circle
              cx={node.x}
              cy={node.y}
              r={36}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onClick={() => onNodeClick(i)}
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          </g>
        );
      })}

      {/* 6. Node labels */}
      {NODES.map((node, i) => (
        <text
          key={`label-${i}`}
          x={node.x}
          y={node.y + 52}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
          fill={isDark ? 'rgba(226,232,240,0.85)' : 'rgba(15,23,42,0.75)'}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {node.name}
        </text>
      ))}
    </svg>
  );
};

// ─── Node Modal ────────────────────────────────────────────────────────────────

interface NodeModalProps {
  nodeIndex: number | null;
  onClose: () => void;
  isDark: boolean;
}

const NodeModal: React.FC<NodeModalProps> = ({ nodeIndex, onClose, isDark }) => {
  const node = nodeIndex !== null ? NODES[nodeIndex] : null;

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: isDark
                ? 'rgba(15,23,42,0.65)'
                : 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(40px) saturate(180%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            }}
            initial={{ scale: 0.88, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                color: 'var(--text-primary)',
              }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <img
                src={node.image}
                alt={node.name}
                className="w-full h-full object-cover"
              />
              {/* Country flag pill */}
              <div
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-semibold"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
              >
                <span>{node.country === 'UK' ? '🇬🇧' : '🇬🇭'}</span>
                <span>{node.country === 'UK' ? 'United Kingdom' : 'Ghana'}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {node.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {node.location}
                  </span>
                </div>
              </div>

              <div
                className="rounded-xl p-3 space-y-2"
                style={{
                  background: isDark ? 'rgba(30,41,59,0.5)' : 'rgba(241,245,249,0.7)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#1E40AF' }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Address</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{node.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#DC2626' }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Opening Hours</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{node.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient footer bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #DC2626 100%)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Info Cards ────────────────────────────────────────────────────────────────

const infoCards = [
  {
    title: 'How to Drop Off',
    icon: <Package className="w-6 h-6" />,
    color: '#1E40AF',
    steps: [
      { icon: <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />, text: 'Book your shipment online or via WhatsApp' },
      { icon: <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />, text: 'Bring your package to any collection point' },
      { icon: <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />, text: 'Receive your tracking receipt' },
      { icon: <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />, text: 'Track your package in real time' },
    ],
  },
  {
    title: 'What We Accept',
    icon: <BoxSelect className="w-6 h-6" />,
    color: '#DC2626',
    items: [
      { icon: <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />, text: 'Documents & letters' },
      { icon: <Package className="w-4 h-4 text-red-500 flex-shrink-0" />,  text: 'Parcels & gifts (5kg+)' },
      { icon: <Laptop className="w-4 h-4 text-red-500 flex-shrink-0" />,  text: 'Electronics & gadgets' },
      { icon: <Shirt className="w-4 h-4 text-red-500 flex-shrink-0" />,   text: 'Clothing & household goods' },
    ],
  },
  {
    title: 'Packaging Guide',
    icon: <ArrowRight className="w-6 h-6" />,
    color: '#1E40AF',
    tips: [
      'Use a sturdy, double-walled box for heavy items',
      'Wrap fragile items in at least 5 cm of bubble wrap',
      'Fill empty space with packing peanuts or crumpled paper',
      'Seal all seams with strong packing tape',
      'Clearly label both sender and recipient details',
    ],
  },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────

const CollectionPointsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const heroRef   = React.useRef(null);
  const graphRef  = React.useRef(null);
  const cardsRef  = React.useRef(null);

  const heroInView  = useInView(heroRef,  { once: true, margin: '-80px' });
  const graphInView = useInView(graphRef, { once: true, margin: '-80px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden:  { y: 32, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } },
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: isDark ? '#0f172a' : '#f8fafc' }}
    >
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)'
            : 'linear-gradient(160deg, #f0f4ff 0%, #e0e7ff 50%, #f8fafc 100%)',
        }}
      >
        {/* Decorative orbs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.10)' }}
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: isDark ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.08)' }}
          animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Pill badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {['14 Locations', 'Worldwide Network', 'Real-time Tracking'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: isDark ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
                    color: '#3b82f6',
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              Collection{' '}
              <span
                className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'shimmer 4s ease-in-out infinite' }}
              >
                Points
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Drop off your packages at any of our&nbsp;
              <strong style={{ color: 'var(--text-primary)' }}>14 trusted collection locations</strong>
              &nbsp;across our global network. Fast, reliable, and convenient.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Network Graph ──────────────────────────────────────────────── */}
      <section
        ref={graphRef}
        className="py-16 sm:py-20"
        style={{ background: isDark ? '#0f172a' : '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={graphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-10 sm:mb-14 text-center"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Our </span>
              <span
                className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-700 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'shimmer 4s ease-in-out infinite' }}
              >
                Network
              </span>
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              An interconnected web of collection points spanning two continents — click any node to explore.
            </p>
          </motion.div>

          {/* Graph container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={graphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: isDark ? 'rgba(15,23,42,0.65)' : 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(40px) saturate(180%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
            }}
          >
            {/* Mobile: horizontal scroll; desktop: full width */}
            <div className="overflow-x-auto">
              <div style={{ minWidth: 560 }}>
                <NetworkGraph isDark={isDark} onNodeClick={(i) => setSelectedNode(i)} />
              </div>
            </div>

            {/* Legend */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 px-5 py-4 border-t"
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  UK Collection Points
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Ghana Collection Points
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#3b82f6', opacity: 0.45 }} />
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Click any node to view location
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Info Cards ─────────────────────────────────────────────────── */}
      <section
        ref={cardsRef}
        className="py-16 sm:py-20"
        style={{ background: isDark ? '#0f172a' : '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-10 sm:mb-14 text-center"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              Everything You Need to Know
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Simple, straightforward guidance for every step of your shipment.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={cardsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Card 0 — How to Drop Off */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 shadow-lg"
              style={{
                background: isDark ? 'rgba(15,23,42,0.65)' : 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #3b82f6 100%)' }}
              >
                {infoCards[0].icon}
              </div>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {infoCards[0].title}
              </h3>
              <ol className="space-y-3">
                {infoCards[0].steps!.map((step, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    {step.icon}
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-semibold mr-1" style={{ color: 'var(--text-primary)' }}>{j + 1}.</span>
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Card 1 — What We Accept */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 shadow-lg"
              style={{
                background: isDark ? 'rgba(15,23,42,0.65)' : 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ background: 'linear-gradient(135deg, #DC2626 0%, #ef4444 100%)' }}
              >
                {infoCards[1].icon}
              </div>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {infoCards[1].title}
              </h3>
              <ul className="space-y-3">
                {infoCards[1].items!.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Prohibited: hazardous materials, perishables, and restricted goods. Contact us if unsure.
              </p>
            </motion.div>

            {/* Card 2 — Packaging Guide */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 shadow-lg"
              style={{
                background: isDark ? 'rgba(15,23,42,0.65)' : 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #DC2626 100%)' }}
              >
                {infoCards[2].icon}
              </div>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {infoCards[2].title}
              </h3>
              <ul className="space-y-3">
                {infoCards[2].tips!.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #DC2626 100%)', fontSize: 9 }}
                    >
                      {j + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA Strip ──────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="relative rounded-2xl overflow-hidden px-8 py-12 sm:py-16 text-center"
            style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #DC2626 100%)' }}
          >
            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-dots)" />
              </svg>
            </div>

            <div className="relative z-10 space-y-5">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Ready to ship?
              </h2>
              <p className="text-white/85 text-lg max-w-xl mx-auto">
                Get in touch with our team today. We're here to help you every step of the way.
              </p>
              <motion.button
                onClick={openContactModal}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-shadow"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: '#ffffff',
                }}
                whileHover={{ scale: 1.06, background: 'rgba(255,255,255,0.28)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Node Modal ────────────────────────────────────────────────────── */}
      <NodeModal
        nodeIndex={selectedNode}
        onClose={() => setSelectedNode(null)}
        isDark={isDark}
      />
    </div>
  );
};

export default CollectionPointsPage;
