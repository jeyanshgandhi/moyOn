import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../images/logo10.jpg";
import image2 from "../images/logoblob1.png";
import "../App.css";

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [swipeColor, setSwipeColor] = useState("purple"); // to differentiate swipe colors
  const navigate = useNavigate();
  const isScrollingRef = useRef(false); // prevent multiple triggers

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientY, currentTarget } = e;
      const sectionHeight = currentTarget.clientHeight;
      const centerY = sectionHeight / 2;
      const moveY = (clientY - centerY) / 30;
      setOffsetY(moveY);
    };

    const section = document.getElementById("home");
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Scroll event handler to detect scroll down and trigger swipe + navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating || isScrollingRef.current) return; // already animating or scrolling

      if (e.deltaY > 20) {
        // scroll down detected with enough intensity
        isScrollingRef.current = true;
        setSwipeColor("teal"); // different swipe color for scroll
        setShowCard(true);

        setTimeout(() => {
          setIsAnimating(true);
        }, 200);

        setTimeout(() => {
          navigate("/about");
        }, 500); // a bit longer so animation can be seen

        // Reset after navigation or if you want to allow back navigation to this page, 
        // you might handle differently.
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isAnimating, navigate]);

  const scrollToAbout = () => {
    if (isAnimating) return;
    setSwipeColor("purple"); // swipe color for button click
    setShowCard(true);
    setTimeout(() => {
      setIsAnimating(true);
    }, 200);
    setTimeout(() => {
      navigate("/about");
    }, 500);
  };

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-white px-6 text-center relative overflow-hidden"
    >
      {/* Background Image */}
      <img
  src={image1}
  alt="Background"
  className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-105 saturate-110 z-0 transition duration-700 ease-in-out"
  style={{
    opacity: isAnimating ? 0 : 1, // fully visible when not animating
    filter: "none", // optional: remove filters if previously blurred/faded
  }}
/>

{/* Scroll Down Button */}
<button
  onClick={scrollToAbout}
  className="absolute bottom-8 z-20 flex flex-col items-center text-purple-800 opacity-80 hover:opacity-100 transition duration-300"
  title="Scroll down"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-15 h-20 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
 
</button>



      {/* Floating Blob */}
      <img
        src={image2}
        alt="Blob"
        className="absolute right-[30%] top-1/2 w-2/5 opacity-90 z-10 pointer-events-none select-none transition-all duration-700 ease-in-out"
        style={{
          transform: `translateY(calc(-50% - ${offsetY}px + ${isAnimating ? 100 : 0}px))`,
          opacity: isAnimating ? 0 : 1,
        }}
      />

      {/* Title */}
      {/* <h1
        className="z-20 text-[12vw] opacity-60 font-extrabold text-white leading-none transition-all duration-700 ease-in-out"
        style={{
          transform: `translateY(${offsetY + (isAnimating ? 100 : 0)}px)`,
          opacity: isAnimating ? 0 : 0.6,
        }}
      >
        Aeternasoft
      </h1> */}
     

      {/* Swipe Transition Card */}
      {showCard && (
        <div
          className={`absolute inset-0 z-50 ${
            swipeColor === "purple"
              ? "bg-gradient-to-b from-purple-700 to-purple-900"
              : "bg-gradient-to-b from-yellow-500 to-yellow-800"
          }`}
          style={{
            animation: "slideUp 0.3s ease forwards",
          }}
        />
      )}

      {/* Fade Transition as fallback */}
      {isAnimating && (
        <div className="absolute inset-0 z-40 bg-black transition-all duration-200 opacity-90 scale-100 animate-fadeIn" />
      )}
    </section>
  );
}
