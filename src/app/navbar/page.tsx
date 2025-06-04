"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { TbBrandFiverr } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: "Introduction", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Tech Stack", href: "/technologies" },
    { name: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      href: "https://www.linkedin.com/in/mehak-45a190245/",
    },
    {
      name: "Twitter",
      icon: <Twitter size={24} />,
      href: "https://x.com/mehak_codes",
    },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      href: "https://github.com/mehak-2",
    },
    {
      name: "Fiverr",
      icon: <TbBrandFiverr size={24} />,
      href: "https://www.fiverr.com/s/ZmgZKgk",
    },
  ];

  const baseAnimationDelay = 200;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out 
          ${
            isMounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }
          ${
            isScrolled
              ? "bg-slate-800/80 shadow-lg backdrop-blur-md"
              : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors duration-300">
                  @Mehak
                </span>
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="relative text-gray-300 hover:text-white group px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 cursor-pointer ">
                    {item.name}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-sky-400 w-0 group-hover:w-full transition-all duration-300 ease-out"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, { size: 20 })}
                </a>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="relative z-[101] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all duration-300"
                aria-controls="mobile-menu-overlay"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6 flex flex-col justify-between items-center">
                  <span
                    className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu-overlay"
        className={`md:hidden fixed inset-0 z-[60] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900/90 backdrop-blur-lg
                    flex flex-col items-center justify-center space-y-10 p-8
                    transition-all duration-300 ease-in-out
                    ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-full pointer-events-none"
                    }`}
      >
        <nav className="flex flex-col items-center space-y-6">
          {navItems.map((item, index) => (
            <Link key={item.name} href={item.href} onClick={closeMenu}>
              <span
                className={`block text-3xl font-semibold text-gray-200 hover:text-sky-300 
                            transform transition-all duration-300 ease-out
                            hover:scale-105
                            ${
                              isOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                            }`}
                style={{
                  transitionDelay: isOpen
                    ? `${baseAnimationDelay + index * 100}ms`
                    : "0ms",
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-700/50 w-3/4 max-w-xs">
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-sky-400
                            transform transition-all duration-300 ease-out hover:scale-125
                            ${
                              isOpen
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                            }`}
                style={{
                  transitionDelay: isOpen
                    ? `${
                        baseAnimationDelay + (navItems.length + index) * 100
                      }ms`
                    : "0ms",
                }}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
