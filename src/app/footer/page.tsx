"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, ChevronUp, Copyright, Twitter } from "lucide-react";
import { TbBrandFiverr } from "react-icons/tb";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={22} />,
      href: "https://www.linkedin.com/in/mehak-45a190245/",
    },
    {
      name: "GitHub",
      icon: <Github size={22} />,
      href: "https://github.com/mehak-2",
    },
    {
      name: "Twitter",
      icon: <Twitter size={24} />,
      href: "https://x.com/mehak_codes",
    },
    {
      name: "Fiverr",
      icon: <TbBrandFiverr size={24} />,
      href: "https://www.fiverr.com/s/ZmgZKgk",
    },
    // {
    //   name: "Email",
    //   icon: <Mail size={22} />,
    //   href: "kangmehak167@gmail.com", // REPLACE
    // },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      className="bg-slate-900 border-t border-slate-700/50 text-slate-400 py-8 sm:py-10"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center text-sm">
            <Copyright size={16} className="mr-1.5" />
            <span>
              Copyright © {new Date().getFullYear()} Mehak. All Rights Reserved.
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {isVisible && (
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-sky-600/80 hover:bg-sky-500 text-white 
                           transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
                aria-label="Scroll to top"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <ChevronUp size={20} />
              </motion.button>
            )}

            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
