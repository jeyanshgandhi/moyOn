import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../images/logo8.1.png";

const sections = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/industries", label: "Industries We Serve" },
  { path: "/contact", label: "Contact Us" },
];

export default function Navbar({ hideLogo }){
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [borderToCard, setBorderToCard] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setAnimateItems(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateItems(false);
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setBorderToCard(true);
      setTimeout(() => setMenuOpen(true), 500);
    } else {
      setMenuOpen(false);
      setTimeout(() => setBorderToCard(false), 500);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
    setTimeout(() => setBorderToCard(false), 500);
  };

  const gapTop = 50;
  const bottomOffset = 65;
  const sideOffset = 70;

  return (
    <>
      {/* Border Lines */}
      {!borderToCard && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
        >
          {/* Top Left */}
          <div
            className="absolute bg-purple-950 h-[2px]"
            style={{
              top: `${gapTop}px`,
              left: `${sideOffset}px`,
              width: "calc(45% - 70px)",
            }}
          />
          
          {/* Top Right */}
          <div
            className="absolute bg-purple-950 h-[2px]"
            style={{
              top: `${gapTop}px`,
              right: `${sideOffset}px`,
              width: "calc(45% - 70px)",
            }}
          />
          {/* Left Vertical */}
          <div
            className="absolute bg-purple-950 w-[2px]"
            style={{
              left: `${sideOffset}px`,
              top: `${gapTop}px`,
              height: "calc(100% - 2 * 58px)",
            }}
          />
          {/* Right Vertical */}
          <div
            className="absolute bg-purple-950 w-[2px]"
            style={{
              right: `${sideOffset}px`,
              top: `${gapTop}px`,
              height: "calc(100% - 2 * 58px)",
            }}
          />
          {/* Bottom Line */}
          {/* <div
            className="absolute bg-purple-950 h-[2px]"
            style={{
              bottom: `${bottomOffset}px`,
              left: `${sideOffset}px`,
              width: `calc(100% - ${sideOffset * 2}px)`,
            }}
          /> */}

{/* Bottom Left Line */}
<div
  className="absolute bg-purple-950 h-[3px]"
  style={{
    bottom: `${bottomOffset}px`, // same as top
    left: `${sideOffset}px`,
    width: "calc(48% - 70px)", // same width as top lines
  }}
/>

{/* Bottom Right Line */}
<div
  className="absolute bg-purple-950 h-[3px]"
  style={{
    bottom: `${bottomOffset}px`, // same as top
    right: `${sideOffset}px`,
    width: "calc(48% - 70px)", // same width as top lines
  }}
/>


        </div>
      )}

      {/* Morphing Card when menu is triggered */}
      {(borderToCard === false || ["/about", "/services", "/industries", "/contact"].includes(location.pathname)) && (
  <div
    aria-hidden="true"
    className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60]" // increased z-index to stay visible
  >
    {/* Top Left */}
    <div
      className="absolute bg-purple-950 h-[3px]"
      style={{
        top: `${gapTop}px`,
        left: `${sideOffset}px`,
        width: "calc(45% - 70px)",
      }}
    />
    {/* Top Right */}
    <div
      className="absolute bg-purple-950 h-[3px]"
      style={{
        top: `${gapTop}px`,
        right: `${sideOffset}px`,
        width: "calc(45% - 70px)",
      }}
    />
    {/* Left Vertical */}
    <div
      className="absolute bg-purple-950 w-[3px]"
      style={{
        left: `${sideOffset}px`,
        top: `${gapTop}px`,
        height: "calc(100% - 2 * 58px)",
      }}
    />
    {/* Right Vertical */}
    <div
      className="absolute bg-purple-950 w-[3px]"
      style={{
        right: `${sideOffset}px`,
        top: `${gapTop}px`,
        height: "calc(100% - 2 * 58px)",
      }}
    />
  {/* Bottom Left Line */}
<div
  className="absolute bg-purple-950 h-[3px]"
  style={{
    bottom: `${bottomOffset}px`, // same as top
    left: `${sideOffset}px`,
    width: "calc(45% - 70px)", // same width as top lines
  }}
/>

{/* Bottom Right Line */}
<div
  className="absolute bg-purple-950 h-[3px]"
  style={{
    bottom: `${bottomOffset}px`, // same as top
    right: `${sideOffset}px`,
    width: "calc(45% - 70px)", // same width as top lines
  }}
/>
  </div>
)}


      {/* Logo Center Overlap */}
      {!hideLogo && (
        <div
    className="fixed left-1/2 z-50 pointer-events-none"
    style={{
      top: `2px`,
      transform: "translateX(-50%)",
      width: 96,
      height: 96,
      borderRadius: "50%",
      boxShadow: "0 0 12px rgba(128, 10, 213, 0.5)",
      padding: "8px",
    }}
  >
          <img
            src={logoImage}
            alt="Aeternasoft Logo"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      )}

      {/* Vertical Right Side Nav */}
      <nav className="fixed top-0 right-0 h-full flex flex-col items-center justify-between py-8 px-4 z-50 select-none">
        {/* MENU text */}
        <div
          className="text-xl font-bold cursor-pointer rotate-90 text-gray-200"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          title="Toggle menu"
        >
          MENU
        </div>

 {/* Vertical line with attached circles */}
<div className="relative h-full flex flex-col items-center justify-center mt-4 mb-24">
  {/* White Vertical Line */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gray-300" style={{ height: "calc(100% - 100px)" }} />

  {/* Dots with numbers */}
  <ul className="flex flex-col gap-10 z-10">
  {sections.map(({ path, label }, i) => {
    const isActive = location.pathname === path;

    return (
      <li
        key={path}
        onClick={() => {
          if (!menuOpen) navigate(path);
        }}
        className={`relative flex items-center gap-3 transition-all duration-300 select-none ${
          isActive
            ? "text-purple-700 font-bold"
            : menuOpen
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-300 hover:text-purple-400"
        }`}
        style={{
          pointerEvents: menuOpen ? "none" : "auto",
        }}
      >
        {/* Circle over the vertical line */}
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            isActive ? "border-purple-700" : "border-gray-300"
          } bg-black absolute left-1/2 transform -translate-x-1/2`}
        ></div>

        {/* Show number only for active section */}
        {isActive && <span className="text-sm ml-6">{i + 1}</span>}
      </li>
    );
  })}
</ul>
</div>

      </nav>

      {/* Fullscreen Menu Overlay */}

      {/* Background overlay when menu is open (disables clicks and dims view) */}
{menuOpen && (
  <div
    className="fixed inset-0 bg-black opacity-40 z-30 pointer-events-none transition-opacity duration-500"
    aria-hidden="true"
  />
)}
      <div
        className={`fixed inset-0 bg-black bg-opacity-100 backdrop-blur-sm z-40 flex flex-col items-center justify-center
        transform transition-all duration-700 ease-in-out origin-center
        ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
      `}
        onClick={toggleMenu}
      >
        <ul
          className="text-white text-5xl font-bold space-y-12 cursor-pointer select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {sections.map(({ path, label }, index) => (
            <li
              key={path}
              onClick={() => handleNavigate(path)}
              className={`hover:text-purple-500 transform transition-all ${
                animateItems
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              } duration-500`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
