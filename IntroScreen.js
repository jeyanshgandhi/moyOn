import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../images/logo8.1.png";

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("glow");

  useEffect(() => {
    const glowTimer = setTimeout(() => setPhase("moveUp"), 2500);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 4200);
    return () => {
      clearTimeout(glowTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const finalTop = 2;     // Match Navbar logo top
const finalSize = 96;   // Match Navbar logo size


  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 1, backgroundColor: "rgba(0,0,0,1)" }}
          animate={{
            opacity: phase === "moveUp" ? 0 : 1,
            backgroundColor:
              phase === "moveUp" ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
          }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        >
          <motion.img
            src={logoImage}
            alt="Aeternasoft Logo"
            style={{
              position: "absolute",
              left: "47.5%",
              top: phase === "glow" ? "50%" : `${finalTop}px`,
              width: finalSize,
              height: finalSize,
              transform: "translateX(-50%) translateY(-50%)",
              boxShadow:
                phase === "glow"
                  ? "0 0 40px rgba(128,10,213,0.8), 0 0 70px rgba(128,10,213,0.6)"
                  : "0 0 16px rgba(128,10,213,0.4)",
              borderRadius: "50%",
              transition: "all 1.7s ease-in-out",
              zIndex: 10000,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              top: phase === "glow" ? "50%" : `${finalTop}px`,
            }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
