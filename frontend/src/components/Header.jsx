"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { to: "hero", label: "Home" },
    { to: "services", label: "Services" },
    { to: "trainings", label: "Trainings" },
    { to: "about", label: "About Us" },
    { to: "feedback", label: "Feedback" },
    { to: "contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="h-20 relative">
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/paw-icon.png" alt="Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ to, label }) => (
                <button
                  key={to}
                  onClick={() => handleScroll(to)}
                  className="text-gray-700 font-medium transition-colors duration-200 hover:text-amber-500 cursor-pointer"
                >
                  {label}
                </button>
              ))}
              <Link href="/login">
                <button className="px-4 py-2 text-white bg-amber-500 hover:bg-amber-700 rounded-md cursor-pointer">
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-20 right-0 w-full bg-white/100 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map(({ to, label }) => (
              <button
                key={to}
                onClick={() => handleScroll(to)}
                className="text-gray-700 font-medium py-2 text-left hover:text-amber-500 hover:bg-gray-100 rounded px-3"
              >
                {label}
              </button>
            ))}
            <Link href="/login">
              <button className="w-full px-4 py-2 text-white bg-amber-500 hover:bg-amber-700 rounded-md mt-2 cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
