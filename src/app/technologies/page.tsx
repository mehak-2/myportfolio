"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaJava,
  FaPhp,
  FaNodeJs,
  FaLinux,
} from "react-icons/fa";
import { FaSquareJs } from "react-icons/fa6";
import { BiLogoTypescript, BiLogoBootstrap } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import {
  SiCplusplus,
  SiSpringboot,
  SiMysql,
  SiFirebase,
  SiFramer,
} from "react-icons/si";
import {
  Settings2,
  Cpu,
  Database,
  Code,
  LucideProps,
  TerminalSquare,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "Languages",
    items: [
      {
        name: "JavaScript",
        icon: <FaSquareJs size={36} className="text-yellow-400" />,
      },
      {
        name: "TypeScript",
        icon: <BiLogoTypescript size={36} className="text-blue-600" />,
      },
      {
        name: "Python",
        icon: <FaPython size={36} className="text-blue-500" />,
      },
      { name: "Java", icon: <FaJava size={36} className="text-red-500" /> },
      {
        name: "C++",
        icon: <SiCplusplus size={32} className="text-blue-700" />,
      },
      { name: "C", icon: <Code size={32} className="text-gray-400" /> },
      { name: "PHP", icon: <FaPhp size={36} className="text-indigo-400" /> },
    ],
  },
  {
    title: "Frontend Development",
    items: [
      {
        name: "HTML5",
        icon: <FaHtml5 size={36} className="text-orange-500" />,
      },
      { name: "CSS3", icon: <FaCss3Alt size={36} className="text-blue-500" /> },
      { name: "React", icon: <FaReact size={36} className="text-sky-400" /> },
      {
        name: "Next.js",
        icon: <RiNextjsFill size={36} className="text-neutral-300" />,
      },
      {
        name: "Tailwind CSS",
        icon: <RiTailwindCssFill size={36} className="text-teal-400" />,
      },
      {
        name: "Bootstrap",
        icon: <BiLogoBootstrap size={36} className="text-purple-600" />,
      },
      {
        name: "Framer Motion",
        icon: <SiFramer size={32} className="text-purple-400" />,
      },
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      {
        name: "Node.js",
        icon: <FaNodeJs size={36} className="text-green-500" />,
      },
      {
        name: "Spring Boot",
        icon: <SiSpringboot size={32} className="text-green-600" />,
      },
      { name: "MySQL", icon: <SiMysql size={36} className="text-blue-400" /> },
      {
        name: "Firebase",
        icon: <SiFirebase size={32} className="text-yellow-500" />,
      },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: <FaGitAlt size={36} className="text-orange-600" /> },
      {
        name: "GitHub",
        icon: <FaGithub size={36} className="text-neutral-300" />,
      },
      {
        name: "VS Code",
        icon: <VscVscode size={36} className="text-blue-500" />,
      },
      { name: "Eclipse", icon: <Cpu size={32} className="text-indigo-500" /> },
      {
        name: "Windows",
        icon: <Settings2 size={32} className="text-sky-500" />,
      },
      {
        name: "Linux",
        icon: <FaLinux size={32} className="text-yellow-300" />,
      },
      {
        name: "UNIX",
        icon: <TerminalSquare size={32} className="text-green-300" />,
      },
    ],
  },
];

interface FloatingShapeProps {
  icon: React.ComponentType<LucideProps>;
  className?: string;
  animationProps?: {
    animate?: Record<string, unknown>;
    transition?: Transition;
  };
  sizeRange?: [number, number];
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  icon: Icon,
  className,
  animationProps,
  sizeRange = [50, 100],
}) => (
  <motion.div
    className={`absolute z-0 text-sky-500/5 ${className || ""}`}
    initial={{
      opacity: 0,
      scale: 0.3,
      rotate: Math.random() * 200 - 100,
      x: `${Math.random() * 20 - 10}vw`,
      y: `${Math.random() * 20 - 10}vh`,
    }}
    animate={{
      opacity: [0, 0.3, 0.1, 0.3, 0],
      scale: [0.3, 1, 0.6, 1, 0.3],
      rotate: Math.random() * 720 - 360,
      x: `calc(${Math.random() * 30 - 15}vw + ${Math.random() * 100 - 50}px)`,
      y: `calc(${Math.random() * 30 - 15}vh + ${Math.random() * 100 - 50}px)`,
      ...animationProps?.animate,
    }}
    transition={{
      duration: Math.random() * 20 + 25,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 10,
      ...animationProps?.transition,
    }}
  >
    <Icon
      size={Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}
      strokeWidth={0.5}
    />
  </motion.div>
);

const Technologies: React.FC = () => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const titleItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const categoryTitleVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  const techIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 10 },
    },
  };

  const lineGrowVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.7 },
    },
  };

  return (
    <motion.section
      id="tech-stack"
      className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900/25 text-slate-200 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <FloatingShape
        icon={Code}
        className="top-10 left-10"
        sizeRange={[80, 120]}
      />
      <FloatingShape
        icon={Cpu}
        className="bottom-20 right-1/4"
        animationProps={{ transition: { delay: 2 } }}
        sizeRange={[60, 100]}
      />
      <FloatingShape
        icon={Settings2}
        className="top-1/3 right-10"
        animationProps={{ transition: { delay: 4 } }}
      />
      <FloatingShape
        icon={Database}
        className="bottom-10 left-1/4"
        animationProps={{ transition: { delay: 1 } }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="flex items-center mb-8 md:mb-12"
          variants={titleItemVariants}
        >
          <motion.h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-400 to-indigo-400 uppercase tracking-tight">
            My Tech Arsenal
          </motion.h2>
          <motion.div
            className="ml-4 md:ml-6 h-1.5 flex-grow bg-gradient-to-r from-sky-500/70 to-indigo-500/70 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.4)]"
            variants={lineGrowVariants}
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-slate-300 mb-16 md:mb-20 max-w-3xl"
          variants={titleItemVariants}
        >
          Here&apos;s a glimpse of the technologies and tools I leverage to
          build robust and innovative solutions:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: catIndex * 0.1,
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              <motion.h3
                className="text-2xl font-semibold text-sky-300 mb-6 pb-2 border-b-2 border-sky-800/70"
                variants={categoryTitleVariants}
              >
                {category.title}
              </motion.h3>
              <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                {" "}
                {category.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center text-center group cursor-pointer"
                    title={tech.name}
                    variants={techIconVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.15,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 8,
                      },
                    }}
                    animate={{
                      y: [0, -3, 0, 2, 0],
                      transition: {
                        y: {
                          duration: 3 + Math.random() * 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: Math.random() * 1,
                        },
                      },
                    }}
                  >
                    <motion.div
                      className="p-4 rounded-xl bg-slate-800/60 group-hover:bg-sky-700/40 
                                 shadow-lg group-hover:shadow-sky-500/30 transition-all duration-300 ease-out
                                 border border-slate-700 group-hover:border-sky-600"
                    >
                      {tech.icon}
                    </motion.div>
                    <span className="mt-2.5 text-xs tracking-wide text-slate-400 group-hover:text-sky-200 transition-colors duration-300 font-medium">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Technologies;
