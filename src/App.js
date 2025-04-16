import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RehanBirthdayApp() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // Animation plays for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-400 via-red-400 to-yellow-300 font-sans">
      <AnimatePresence>
        {showAnimation ? (
          <motion.div
            key="birthday"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white bg-black bg-opacity-30 p-8 rounded-2xl shadow-2xl"
          >
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">🎉 Happy 22nd Birthday, Rehan! 🎂</h1>
            <p className="text-2xl drop-shadow">Wishing you an amazing year ahead 🎈</p>
          </motion.div>
        ) : (
          <div className="text-white text-center bg-black bg-opacity-20 p-6 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold mb-2 drop-shadow-sm">Welcome to Rehan's Birthday App 🎊</h2>
            <p className="text-xl">Enjoy the celebration!</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
