import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/1.png"; // your contact bg image
import $ from "jquery";
import "jquery.ripples";

function SmokeRevealCanvas() {
  const canvasRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dist / dt;

      const radius = Math.min(80 + speed * 100, 300);

      ctx.globalCompositeOperation = "destination-out";
      const gradient = ctx.createRadialGradient(
        e.clientX,
        e.clientY,
        0,
        e.clientX,
        e.clientY,
        radius
      );
      gradient.addColorStop(0, "rgba(0,0,0,0.6)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2, false);
      ctx.fill();

      lastPos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default function Contact() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false); // controls contact form visible
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSwipe, setShowSwipe] = useState(false);
  const [swipeColor, setSwipeColor] = useState("purple");
  const isScrollingRef = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    $(".water-effect").ripples({
      resolution: 256,
      dropRadius: 20,
      perturbance: 0.04,
    });

    return () => {
      try {
        $(".water-effect").ripples("destroy");
      } catch {}
    };
  }, []);

  // Scroll wheel navigation: 
  // Scroll down => "/industries"
  // Scroll up => "/about"
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating || isScrollingRef.current) return;

      isScrollingRef.current = true;

      if (e.deltaY > 20) {
        setSwipeColor("teal");
        setShowSwipe(true);
        setIsAnimating(true);
        setTimeout(() => navigate("/industries"), 500);
      } else if (e.deltaY < -20) {
        setSwipeColor("purple");
        setShowSwipe(true);
        setIsAnimating(true);
        setTimeout(() => navigate("/about"), 500);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isAnimating, navigate]);

  const handleViewClick = () => {
    if (isAnimating) return;
    setSwipeColor("blue");
    setShowSwipe(true);
    setIsAnimating(true);

    setTimeout(() => {
      setShowSwipe(false);
      setIsExpanded(true);
      setIsAnimating(false);

      setTimeout(() => {
        const section = document.getElementById("contactExpandedSection");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }, 300);
  };

  const handleBackClick = () => {
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none bg-black">
      {/* Water ripple background */}
      <div
        className="absolute inset-0 bg-cover bg-center water-effect"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 1 }}
      />

      {/* Smoke reveal effect only when not expanded */}
      {!isExpanded && <SmokeRevealCanvas />}

      {/* View button and page title when collapsed */}
      {!isExpanded && (
        <motion.div
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
  className="relative z-50 text-center flex flex-col items-center space-y-8 mt-[-10vh]"
>
          <h1 className="text-[10vw] font-extrabold text-white opacity-10 select-none">
            CONTACT
          </h1>
          <button
            onClick={handleViewClick}
            className="px-10 py-4 text-white font-bold rounded-full border-2 border-purple-800 hover:bg-gray-200 transition duration-300 select-none"
            disabled={isAnimating}
          >
            View
          </button>
        </motion.div>
      )}

      {/* Expanded contact form section */}
      {isExpanded && (
        <motion.div
          id="contactExpandedSection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen bg-white text-black flex flex-col justify-center items-center px-6 py-20 z-20"
        >
          <h2 className="text-4xl font-bold mb-10 text-purple-700">Get In Touch</h2>

          <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>

          <button
            onClick={handleBackClick}
            className="mt-12 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            disabled={isAnimating}
          >
            Back
          </button>
        </motion.div>
      )}

      {/* Swipe overlays for navigation */}
      {showSwipe && (
        <motion.div
          className={`absolute inset-0 z-50 ${
            swipeColor === "purple"
              ? "bg-gradient-to-b from-purple-700 to-purple-900"
              : swipeColor === "teal"
              ? "bg-gradient-to-b from-teal-500 to-teal-900"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800"
          }`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Black fade fallback */}
      {isAnimating && !showSwipe && (
        <div className="absolute inset-0 z-40 bg-black transition-all duration-700 opacity-90 scale-100 animate-fadeIn" />
      )}
    </div>
  );
}
