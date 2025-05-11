import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLOOM_DELAY = 1200;
const MESSAGE_DELAY = 2200;
const PETAL_COLORS = [
  "#f472b6", // pink
  "#a5b4fc", // purple
  "#fbbf24", // yellow
  "#34d399", // green
  "#f87171", // red
  "#60a5fa", // blue
  "#facc15", // gold
  "#fb7185", // rose
];

function getRandomColor() {
  return PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
}

// Fixed, spread-out positions (in % of viewport)
const FIXED_FLOWER_POSITIONS = [
  { top: 12, left: 15 },   // top left
  { top: 12, left: 75 },   // top right
  { top: 70, left: 15 },   // bottom left
  { top: 70, left: 75 },   // bottom right
  { top: 20, left: 50 },   // top center
  { top: 65, left: 50 },   // bottom center
  { top: 40, left: 10 },   // middle left
  { top: 40, left: 90 },   // middle right
];

const GALLERY_IMAGES = [
  require("./images/Gallery1.jpg"),
  require("./images/Gallery2.jpg"),
  require("./images/Gallery3.jpg"),
  require("./images/Gallery4.jpg"),
  require("./images/Gallery5.jpg"),
  require("./images/Gallery6.jpg"),
  require("./images/Gallery7.jpg"),
  require("./images/Gallery8.jpg"),
];

function useResponsiveFlowerSize() {
  const [size, setSize] = useState(getSize());
  function getSize() {
    if (typeof window === 'undefined') return 180;
    if (window.innerWidth < 500) return 90;
    if (window.innerWidth < 800) return 120;
    return 180;
  }
  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

function SimpleBloomFlower({ delay = 0, size = 180, petalColor = "#f472b6" }) {
  const petalCount = 8;
  const petalRadius = size * 0.18;
  const centerRadius = size * 0.19;
  const flowerRadius = size * 0.42;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", top: 0, left: 0 }}>
      {[...Array(petalCount)].map((_, i) => {
        const angle = (i * 360) / petalCount;
        const rad = (angle * Math.PI) / 180;
        const cx = size / 2 + flowerRadius * Math.cos(rad);
        const cy = size / 2 + flowerRadius * Math.sin(rad);
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={petalRadius}
            fill={petalColor}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: BLOOM_DELAY / 1000 + delay, duration: 0.7, type: "spring" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        );
      })}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={centerRadius}
        fill="#fde047"
        stroke="#facc15"
        strokeWidth={size * 0.04}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: BLOOM_DELAY / 1000 + delay + 0.3, duration: 0.6, type: "spring" }}
        style={{ originX: "50%", originY: "50%" }}
      />
    </svg>
  );
}

export default function MothersDayApp() {
  const [showMessage, setShowMessage] = useState(false);
  const [flowers, setFlowers] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const flowerSize = useResponsiveFlowerSize();

  useEffect(() => {
    setFlowers(
      FIXED_FLOWER_POSITIONS.map(pos => ({
        ...pos,
        color: getRandomColor(),
        delay: Math.random() * 0.8,
      }))
    );
    const msgTimer = setTimeout(() => setShowMessage(true), MESSAGE_DELAY + BLOOM_DELAY);
    const galleryTimer = setTimeout(() => setShowGallery(true), MESSAGE_DELAY + BLOOM_DELAY + 1200);
    return () => {
      clearTimeout(msgTimer);
      clearTimeout(galleryTimer);
    };
  }, []);

  return (
    <div className="bg-pink-50 font-sans min-h-screen w-screen overflow-x-hidden">
      {/* Fixed, non-scrolling flower background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="relative w-full h-full min-h-screen">
          {flowers.map((flower, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `${flower.top}%`,
                left: `${flower.left}%`,
                zIndex: 2,
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SimpleBloomFlower delay={flower.delay} petalColor={flower.color} size={flowerSize} />
            </div>
          ))}
        </div>
      </div>
      {/* Scrollable overlay content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Add enough top padding so text appears centered on load */}
        <div className="w-full flex flex-col items-center" style={{ minHeight: '100vh', justifyContent: 'center', paddingTop: '20vh', paddingBottom: '10vh' }}>
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-center z-50 pointer-events-none"
                style={{ width: '100vw', maxWidth: '100vw' }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-lg">
                  Happy Mother's Day
                </h1>
                <p className="text-xl md:text-2xl text-green-700 mt-2">
                  You make the world bloom 🌷
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Gallery section below the animation */}
        {showGallery && (
          <section className="w-full pt-12 pb-12 bg-pink-50 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl px-4">
              {GALLERY_IMAGES.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-48 md:h-72"
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
