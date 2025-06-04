"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion"; // Added Variants, Transition for better typing
import ProjectCard from "./ProjectCard"; // Assuming ProjectCard.tsx handles rendering of project.liveLink and project.sourceLink
import { Code2, Layers, Palette, LucideProps } from "lucide-react"; // LucideProps for icon typing

// Re-define Project type or import if ProjectCard exports it globally
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  liveLink?: string; // Optional: Link to the live deployment
  sourceLink?: string; // Optional: Link to the source code repository
}

// Ensure these image paths exist in your public folder
// e.g., /public/images/fahub.png
// liveLink and sourceLink have been added/ensured for all projects.
// The ProjectCard component will need to display these links.
const projectsData: Project[] = [
  {
    id: 1,
    title: "FaHub",
    image: "/1pro.jpeg",
    description:
      "An immersive e-commerce shopping website offering a wide range of fashion products. Built with a focus on user experience and modern design trends.",
    tags: ["React JS", "Context API", "Firebase Auth", "Responsive Design"],
    liveLink: "https://react-shop-plum-seven.vercel.app/", // Placeholder actual URL
    sourceLink: "https://github.com/mehak-2/react_shop", // Placeholder actual URL
  },
  {
    id: 2,
    title: "Chat App",
    image: "/2pro.jpeg",
    description:
      "A real-time chat application built with React JS and an API backend, enabling seamless communication and dynamic message updates.",
    tags: ["React JS", "API Integration", "Real-time", "Firebase"],
    liveLink: "https://luxury-squirrel-100f11.netlify.app/",
    sourceLink: "https://github.com/mehak-2/react-chatapp",
  },
  {
    id: 3,
    title: "Grocery Store",
    image: "/3pro.jpeg",
    description:
      "A fully functional e-commerce website for grocery shopping, featuring product listings, cart functionality, and a clean user interface.",
    tags: ["React JS", "Redux", "E-commerce", "JavaScript"],
    liveLink: "https://ecommerceweb-kappa.vercel.app/",
    sourceLink: "https://github.com/mehak-2/ecommerceweb",
  },
  {
    id: 4,
    title: "School Management System",
    image: "/4pro.jpeg",
    description:
      "A comprehensive system for managing school operations, built with Java, MySQL, and J2EE technologies. Streamlines administrative tasks.",
    tags: ["Java", "MySQL", "J2EE", "Backend", "Spring"],
    liveLink: "#", // Previously commented, now added as a placeholder
    sourceLink: "https://github.com/mehak-2/school-management-web-app",
  },
  {
    id: 5,
    title: "Keyframes App",
    image: "/5pro.jpeg",
    description:
      "An innovative application for creating and visualizing CSS keyframe animations, leveraging React JS, APIs, and JSON for dynamic control.",
    tags: ["React JS", "CSS Animations", "API", "JSON", "Frontend"],
    liveLink: "https://keyframes-app.vercel.app/",
    sourceLink: "https://github.com/mehak-2/keyframes_app",
  },
  {
    id: 6,
    title: "CarWash App",
    image: "/6pro.jpeg",
    description:
      "A sleek application for booking car wash services, built using React Js, Tailwind CSS, and TypeScript for a modern, responsive experience.",
    tags: ["React Js", "Tailwind CSS", "TypeScript", "UI/UX"],
    liveLink: "https://carwash-pi.vercel.app/",
    sourceLink: "https://github.com/mehak-2/carwash",
  },
  {
    id: 7,
    title: "Quiz App",
    image: "/7pro.jpeg",
    description:
      "An interactive quiz application developed with Next.js, Tailwind CSS, and TypeScript, offering a fun and engaging user experience.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Full-stack"],
    liveLink: "https://quizassign.vercel.app/",
    sourceLink: "https://github.com/mehak-2/quizassign",
  },
  {
    id: 8,
    title: "Pokemon App",
    image: "/8pro.jpeg",
    description:
      "A vibrant application showcasing Pokemon data, built with React JS, CSS, and utilizing a Pokemon API for dynamic content.",
    tags: ["React JS", "CSS", "API", "Frontend"],
    liveLink: "https://pokemon-app1-iota.vercel.app/",
    sourceLink: "#",
  },
  {
    id: 9,
    title: "Canva Clone",
    image: "/9pro.jpeg",
    description:
      "A simplified clone of Canva's design interface, built with HTML and CSS to practice fundamental web development skills.",
    tags: ["HTML", "CSS", "Frontend Basics", "UI Design"],
    liveLink: "https://canva-task-1.vercel.app/",
    sourceLink: "https://github.com/mehak-2/canva-task-1",
  },
  {
    id: 10,
    title: "Weather App",
    image: "/10pro.jpeg",
    description:
      "A real-time weather application providing current weather conditions, built with React JS, CSS, JavaScript, and integrating a weather API.",
    tags: ["React JS", "API", "JavaScript", "CSS"],
    liveLink: "https://react-weatherapp-mehak-2.vercel.app/",
    sourceLink: "https://github.com/mehak-2/react-weatherapp",
  },
  {
    id: 11,
    title: "Shopping Web",
    image: "/11pro.jpeg",
    description:
      "Another stylish e-commerce platform featuring a curated collection of clothing. Developed with React JS, JavaScript, CSS, and Firebase.",
    tags: ["React JS", "Firebase", "E-commerce", "Frontend"],
    liveLink: "#",
    sourceLink: "https://github.com/mehak-2/fabricfashion",
  },
];

interface FloatingShapeProps {
  icon: React.ComponentType<LucideProps>; // Use ComponentType for Lucide icons
  className?: string;
  animationProps?: {
    animate?: Record<string, unknown>; // Use unknown instead of any
    transition?: Transition;
  };
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  icon: Icon,
  className,
  animationProps,
}) => (
  <motion.div
    className={`absolute z-0 text-sky-500/10 ${className || ""}`}
    initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 180 - 90 }}
    animate={{
      opacity: [0, 0.5, 0.2, 0],
      scale: [0.5, 1.2, 0.8, 0.5],
      rotate: Math.random() * 360 + 360,
      ...animationProps?.animate,
    }}
    transition={{
      duration: Math.random() * 15 + 20,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 5,
      ...animationProps?.transition,
    }}
  >
    <Icon size={Math.random() * 60 + 60} strokeWidth={1} />
  </motion.div>
);

const Projects: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -50, skewX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <motion.section
      id="projects"
      className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900/20 text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <FloatingShape icon={Code2} className="-top-20 -left-20" />
      <FloatingShape
        icon={Layers}
        className="-bottom-20 -right-20 opacity-5"
        animationProps={{ animate: { rotate: Math.random() * -360 - 360 } }}
      />
      <FloatingShape
        icon={Palette}
        className="top-1/3 -right-10 opacity-8"
        animationProps={{ transition: { delay: 2 } }}
      />
      <FloatingShape
        icon={Code2}
        className="bottom-1/4 -left-10 opacity-8"
        animationProps={{
          animate: { x: [0, 20, 0], y: [0, -20, 0] },
          transition: { duration: 15, repeatType: "mirror" },
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="flex items-center mb-14 md:mb-20">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text
                       bg-gradient-to-r from-sky-300 via-cyan-300 to-indigo-400
                       uppercase tracking-tighter whitespace-nowrap"
            variants={titleVariants}
          >
            My Creations
          </motion.h2>
          <motion.div
            className="ml-4 md:ml-6 h-1.5 flex-grow
                       bg-gradient-to-r from-sky-500/80 via-cyan-500/60 to-indigo-500/80
                       rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            variants={lineVariants}
          ></motion.div>
        </motion.div>

        <motion.div
          style={{ perspective: "1200px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
          variants={containerVariants}
        >
          {projectsData.map((project) => (
            // ProjectCard is responsible for displaying individual project details,
            // including project.liveLink and project.sourceLink.
            // Ensure ProjectCard.tsx has logic to render these links if they exist.
            // For example:
            // if (project.liveLink) { <a href={project.liveLink}>Live Demo</a> }
            // if (project.sourceLink) { <a href={project.sourceLink}>Source Code</a> }
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
