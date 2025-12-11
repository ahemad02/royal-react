import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScroll = React.useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) setIsSticky(true);
    else setIsSticky(false);

    if (currentScroll > lastScroll.current) setShowHeader(false);
    else setShowHeader(true);

    lastScroll.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Product", path: "/product" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Inquiry", path: "/inquiry" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
  <header
  className={`fixed top-0 w-full transition-all duration-300 z-50 pt-8 pb-7 border-b ${
    showHeader ? "translate-y-0" : "-translate-y-full"
  }`}
  style={{ borderBottomColor: "#d5b386" }}
>
  <div
    className={`absolute inset-0 transition-all duration-300 pointer-events-none z-0 ${
      isSticky && showHeader ? "bg-white/95 shadow-md" : "bg-black/10"
    }`}
  ></div>

  <div className="app-container flex items-center justify-between py-3 relative z-10">

        <img
          src="/images/royal-logo.svg"
          alt="Logo"
          className="w-40 cursor-pointer"
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isSticky && showHeader ? "text-black" : "text-white"} ${
                  isActive ? "active" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-3xl focus:outline-none transition cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className={`${isSticky ? "text-black" : "text-white"}`}>
            &#9776;
          </span>
        </button>
      </div>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-xl transition-all duration-500 z-999 ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-8 text-4xl text-black z-1000"
          onClick={() => setMobileMenuOpen(false)}
        >
          &times;
        </button>

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `nav-item mobile text-black text-[20px] ${
                isActive ? "active" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
