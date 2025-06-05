"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX_card = useMotionValue(0);
  const mouseY_card = useMotionValue(0);

  const mouseX_glare = useMotionValue(0);
  const mouseY_glare = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();

    mouseX_card.set(e.clientX - left - width / 2);
    mouseY_card.set(e.clientY - top - height / 2);

    mouseX_glare.set(e.clientX - left);
    mouseY_glare.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX_card.set(0);
    mouseY_card.set(0);
    mouseX_glare.set(-200);
    mouseY_glare.set(-200);
  };

  const springConfig = { stiffness: 120, damping: 15, mass: 0.1 };
  const springX = useSpring(mouseX_card, springConfig);
  const springY = useSpring(mouseY_card, springConfig);

  const cardTranslateX = useTransform(springX, [-150, 150], [-8, 8]);
  const cardTranslateY = useTransform(springY, [-100, 100], [-6, 6]);

  const glareSpringConfig = { stiffness: 300, damping: 30, mass: 1 };
  const glareSpringX = useSpring(mouseX_glare, glareSpringConfig);
  const glareSpringY = useSpring(mouseY_glare, glareSpringConfig);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl
                 bg-slate-800 border border-slate-700/80
                 transition-shadow duration-400 ease-out cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: cardTranslateX,
        y: cardTranslateY,
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useTransform(
            [glareSpringX, glareSpringY],
            ([latestX, latestY]) =>
              `radial-gradient(
                200px circle at ${latestX}px ${latestY}px,
                rgba(100, 180, 255, 0.15), /* Brighter, bluer light source */
                transparent 80%
              )`
          ),
          mixBlendMode: "soft-light",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <motion.div
          className="relative w-full h-48 md:h-56 overflow-hidden"
          style={{
            x: useTransform(cardTranslateX, (val) => -val * 0.3),
            y: useTransform(cardTranslateY, (val) => -val * 0.3),
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out
                       group-hover:scale-110"
            priority={project.id <= 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 via-slate-800/30 to-transparent"></div>
        </motion.div>

        <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
          <div>
            <motion.h3
              className="text-xl md:text-2xl font-bold text-sky-400 mb-2 group-hover:text-sky-300 transition-colors"
              style={{
                x: useTransform(cardTranslateX, (val) => -val * 0.2),
                y: useTransform(cardTranslateY, (val) => -val * 0.2),
              }}
            >
              {project.title}
            </motion.h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2.5">
                {project.tags.slice(0, 4).map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-900/60 rounded-lg
                               border border-cyan-700/70 group-hover:bg-cyan-800/80 transition-all duration-300
                               group-hover:shadow-[0_0_10px_rgba(56,200,248,0.4)] group-hover:text-cyan-200"
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -2, scale: 1.05, color: "#E0F2FE" }}
                    transition={{
                      delay: 0.25 + index * 0.07,
                      duration: 0.35,
                      y: { type: "spring", stiffness: 300 },
                      scale: { type: "spring", stiffness: 300 },
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          <motion.div
            className="flex items-center gap-4 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {project.liveLink && project.liveLink !== "#" && (
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white
                           bg-sky-500 rounded-lg shadow-lg hover:shadow-sky-500/40
                           hover:bg-sky-400 transition-all duration-300 ease-in-out
                           transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
                           focus:ring-sky-300 focus:ring-opacity-75 group/button"
              >
                <ExternalLink
                  size={18}
                  className="mr-2 group-hover/button:rotate-[12deg] transition-transform duration-300"
                />
                View Live
              </Link>
            )}
            {project.sourceLink && project.sourceLink !== "#" && (
              <Link
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-100
                           bg-slate-600/70 rounded-lg shadow-lg hover:shadow-slate-500/30
                           hover:bg-slate-500/80 transition-all duration-300 ease-in-out
                           transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
                           focus:ring-slate-400 focus:ring-opacity-75 group/button"
              >
                <Github
                  size={18}
                  className="mr-2 group-hover/button:scale-110 transition-transform duration-300"
                />
                Source
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute -inset-px rounded-2xl border-2 border-transparent pointer-events-none"
        initial={{ borderColor: "transparent" }}
        whileHover={{ borderColor: "rgba(56, 189, 248, 0.6)" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="absolute -top-px -left-px w-4 h-4 border-l-2 border-t-2 border-sky-500/0 group-hover:border-sky-500/80 rounded-tl-xl transition-all duration-300" />
        <motion.div className="absolute -top-px -right-px w-4 h-4 border-r-2 border-t-2 border-sky-500/0 group-hover:border-sky-500/80 rounded-tr-xl transition-all duration-300" />
        <motion.div className="absolute -bottom-px -left-px w-4 h-4 border-l-2 border-b-2 border-sky-500/0 group-hover:border-sky-500/80 rounded-bl-xl transition-all duration-300" />
        <motion.div className="absolute -bottom-px -right-px w-4 h-4 border-r-2 border-b-2 border-sky-500/0 group-hover:border-sky-500/80 rounded-br-xl transition-all duration-300" />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
