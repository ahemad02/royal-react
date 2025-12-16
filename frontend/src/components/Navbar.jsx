import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // sticky background
      setIsSticky(current > 50);

      // hide / show logic
      if (current > lastScroll.current && current > 120) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <>
      {/* HEADER */}
      <header
        className={`fixed left-0 w-full z-50 transition-[top] duration-300
          ${showHeader ? "top-0" : "-top-[150px]"}
        `}
      >
        {/* VISUAL WRAPPER */}
        <div
          className={`border-b transition-all duration-300
            ${isSticky
              ? "bg-white/95 shadow-md pt-8 pb-7"
              : "bg-black/10 pt-8 pb-7"}
          `}
          style={{ borderBottomColor: "#d5b386" }}
        >
          <div className="app-container flex items-center justify-between py-3">
            {/* LOGO */}
            <img
              src="/images/royal-logo.svg"
              alt="Logo"
              className="w-40 cursor-pointer"
            />

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex gap-8">
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item ${
                      isSticky ? "text-black" : "text-white"
                    } ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden text-3xl cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className={isSticky ? "text-black" : "text-white"}>
                &#9776;
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white flex flex-col
          items-center justify-center gap-6 text-xl transition-all duration-500
          ${mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
        style={{ zIndex: 999 }}
      >
        {/* CLOSE */}
        <button
          className="absolute top-6 right-8 text-4xl text-black"
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
    </>
  );
};

export default Navbar;
