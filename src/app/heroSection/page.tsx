"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  ArrowRight,
  Code,
  Cpu,
  GitFork,
  Layers,
  Terminal,
  Database,
  Zap,
  Aperture,
} from "lucide-react";
import mypic from "../mypic.png";

const getRandom = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

interface FloatingIconCustomProps {
  icon: React.ElementType;
  size: number;
}

type FloatingIconProps = FloatingIconCustomProps &
  Omit<HTMLMotionProps<"div">, keyof FloatingIconCustomProps | "children">;

const FloatingIcon = ({
  icon: IconComponent,
  size,
  ...restMotionProps
}: FloatingIconProps) => {
  const duration = getRandom(20, 40);
  const delay = getRandom(0, 10);
  const { className: passedClassName, ...otherPassedProps } = restMotionProps;

  return (
    <motion.div
      className={`absolute z-0 text-sky-400/30 ${passedClassName || ""}`}
      {...otherPassedProps}
      initial={{
        opacity: 0,
        x: getRandom(-100, 100) + "vw",
        y: getRandom(-100, 100) + "vh",
        scale: getRandom(0.5, 1.2),
      }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.3, 0],
        x: `calc(${getRandom(-20, 20)}vw + ${getRandom(-100, 100)}px)`,
        y: `calc(${getRandom(-20, 20)}vh + ${getRandom(-100, 100)}px)`,
        rotate: getRandom(-360, 360),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <IconComponent size={size} />
    </motion.div>
  );
};

const HeroSection = () => {
  const name = "Mehak";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageContainerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.6,
      },
    },
  };

  const backgroundIcons = [
    { icon: Cpu, size: 30 },
    { icon: GitFork, size: 25 },
    { icon: Layers, size: 35 },
    { icon: Terminal, size: 28 },
    { icon: Database, size: 30 },
    { icon: Zap, size: 22 },
    { icon: Code, size: 40 },
    { icon: Aperture, size: 26 },
  ];

  return (
    <section
      // id="hero"
      className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-0"
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900/20 opacity-75"></div>
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-sky-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-indigo-600/10 blur-[120px] animate-pulse-slow animation-delay-2000"></div>

        <div className="hidden md:block">
          {backgroundIcons.map((item, index) => (
            <FloatingIcon
              key={`bg-icon-${index}`}
              icon={item.icon}
              size={item.size}
            />
          ))}
        </div>
        <div className="block md:hidden">
          {backgroundIcons.slice(0, 4).map((item, index) => (
            <FloatingIcon
              key={`bg-icon-mobile-${index}`}
              icon={item.icon}
              size={item.size * 0.7}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:w-3/5 lg:w-1/2 text-center md:text-left mb-12 md:mb-0 md:pr-10 lg:pr-16">
          <motion.p
            className="text-sky-400 font-medium mb-2 text-lg sm:text-xl"
            variants={itemVariants}
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300"
            variants={itemVariants}
          >
            {name},<br className="sm:hidden" /> a Passionate{" "}
            <span className="block sm:inline-block text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              Software Developer.
            </span>
          </motion.h1>

          <motion.p
            className="text-slate-300 max-w-xl mx-auto md:mx-0 text-base sm:text-lg lg:text-xl mb-8"
            variants={itemVariants}
          >
            Crafting innovative digital solutions and bringing ideas to life
            with clean, efficient code. Ready to build something amazing?
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-6"
            variants={itemVariants}
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-sky-500 
                           text-white text-base sm:text-lg font-semibold rounded-lg shadow-xl
                           hover:bg-sky-600 transition-all duration-300 ease-in-out
                           transform hover:scale-105 focus:outline-none focus:ring-4 
                           focus:ring-sky-400/50 group w-full sm:w-auto" // Adjusted width
            >
              View My Work
              <ArrowRight
                size={20}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="https://drive.google.com/file/d/1CAXZ1a8c_SCU29fFTldyrWQ4EIylfM52/view"
              download
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-sky-500
                           text-sky-400 text-base sm:text-lg font-semibold rounded-lg shadow-lg
                           hover:bg-sky-500 hover:text-white transition-all duration-300 ease-in-out
                           transform hover:scale-105 focus:outline-none focus:ring-4 
                           focus:ring-sky-400/50 group w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              {/* <Download
                size={20} // Slightly adjusted icon size
                className="ml-2 transition-transform duration-300 group-hover:scale-110" // Different hover for download icon
              /> */}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="md:w-2/5 lg:w-1/2 flex justify-center items-center relative mt-10 md:mt-0"
          variants={imageContainerVariants}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
            <motion.div
              className="absolute inset-0 border-2 border-sky-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[10%] border border-indigo-500/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                delay: 1,
              }}
            />

            <motion.div
              className="absolute inset-[18%] bg-slate-800/50 backdrop-blur-md rounded-full shadow-2xl overflow-hidden
                         flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-center p-4">
                <Image
                  src={mypic}
                  alt="Mehak - Software Developer"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl border border-sky-500/30 group-hover:border-sky-500/70 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-pulse-slow" />
            </motion.div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-3 h-3 bg-sky-400 rounded-full shadow-lg"
                style={{
                  x:
                    Math.cos((i / 3) * 2 * Math.PI) * ((420 * 0.82) / 2 + 10) -
                    6,
                  y:
                    Math.sin((i / 3) * 2 * Math.PI) * ((420 * 0.82) / 2 + 10) -
                    6,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 0.8, 1], opacity: [0, 1, 1, 1] }}
                transition={{
                  delay: 1 + i * 0.3,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
