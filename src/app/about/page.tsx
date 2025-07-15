"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  HTMLMotionProps,
  MotionValue,
  motionValue,
} from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Brain,
  Lightbulb,
  Zap,
  Award,
  Users,
  Cpu,
  Layers,
  GitFork,
  Terminal,
  Database,
  Sparkles,
} from "lucide-react";

const getRandom = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

type IconBaseProps = {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
};

interface FloatingIconCustomProps {
  icon: React.ElementType<IconBaseProps>;
  size: number;
  scrollProgress?: MotionValue<number>;
}

type FloatingIconProps = FloatingIconCustomProps &
  Omit<HTMLMotionProps<"div">, keyof FloatingIconCustomProps | "children">;

const FloatingIcon = ({
  icon: IconComponent,
  size,
  scrollProgress,
  ...restMotionProps
}: FloatingIconProps) => {
  const duration = getRandom(30, 50);
  const delay = getRandom(0, 15);

  const defaultScrollProgress = motionValue(0);
  const effectiveScrollProgress: MotionValue<number> =
    scrollProgress || defaultScrollProgress;

  const yOffset = useTransform(
    effectiveScrollProgress,
    [0, 1],
    [getRandom(-30, 30), getRandom(30, -30)]
  );

  const { className: passedClassName, ...otherPassedProps } = restMotionProps;

  return (
    <motion.div
      className={`absolute z-0 text-sky-400/15 ${passedClassName || ""}`}
      style={{ y: yOffset }}
      {...otherPassedProps}
      initial={{
        opacity: 0,
        x: getRandom(-60, 60) + "vw",
        y: getRandom(-60, 60) + "vh",
        scale: getRandom(0.3, 0.9),
      }}
      animate={{
        opacity: [0, 0.05, 0.1, 0.05, 0],
        x: `calc(${getRandom(-10, 10)}vw + ${getRandom(-70, 70)}px)`,
        rotate: getRandom(-120, 120),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      }}
    >
      <IconComponent size={size} />
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [timelineHeight, setTimelineHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (timelineContainerRef.current) {
      setTimelineHeight(timelineContainerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (timelineContainerRef.current) {
        setTimelineHeight(timelineContainerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const personalBio = [
    "I am Mehak, a B.Tech Computer Science graduate from IK Gujral Punjab Technical University (June 2025). My passion lies in crafting innovative and efficient full-stack applications. I am currently applying and expanding my skills as a Software Developer Intern at MaxTron AI, while continuously exploring new technologies to enhance my capabilities.",
    "With a strong foundation in Object-Oriented Programming, Data Structures, and Algorithms, I've gained hands-on experience with modern web technologies including React.js, Next.js, Node.js, Java, and Spring Boot. My professional experiences, including my current role and prior internships, have allowed me to contribute to impactful real-world projects, from enhancing backend SEO performance to developing comprehensive full-stack solutions with user-centric designs.",
    "I am adept at working with various tools and platforms like Git, Visual Studio, and Eclipse, and have experience with databases such as MySQL and Firebase. I thrive in collaborative environments and am eager to leverage my skills to tackle new challenges and contribute to significant digital advancements.",
  ];

  type TimelineItemData = {
    date: string;
    title: string;
    company: string;
    description: string;
    icon: React.ReactElement<IconBaseProps>;
  };

  const timelineData: TimelineItemData[] = [
    {
      date: "Dec 2024 - Present",
      title: "Software Developer Engineer",
      company: "MaxTron AI",
      description:
        "Currently focused on enhancing backend SEO performance using Next.js and ensuring smooth API integration through collaboration with frontend teams.",
      icon: <Briefcase />,
    },
    // {
    //   date: "Graduated June 2025",
    //   title: "B.Tech in Computer Science",
    //   company: "IK Gujral Punjab Technical University",
    //   description:
    //     "Successfully graduated with a specialization in software engineering, equipped with strong fundamentals in Object-Oriented Programming, Data Structures, Algorithms, and Operating Systems.",
    //   icon: <GraduationCap />,
    // },
    {
      date: "July - Nov 2024",
      title: "Full Stack Developer Intern",
      company: "Jagruti Rehabilitation Center",
      description:
        "Built full-stack applications utilizing Next.js. Optimized website SEO, achieving a 20% increase in user engagement.",
      icon: <Zap />,
    },
    {
      date: "2024",
      title: "GDSC Android Lead & Core Team",
      company: "Bizarre Coders Club",
      description:
        "Led development teams in creating real-time Android applications and actively contributed to various coding projects and club initiatives.",
      icon: <Users />,
    },
    {
      date: "July - Aug 2024",
      title: "Full Stack Developer Intern",
      company: "The Wow Diamond",
      description:
        "Developed full-stack applications with ReactJS for the frontend and Firebase for the backend, including RESTful APIs for real-time data.",
      icon: <Code2 />,
    },
    {
      date: "April - July 2024",
      title: "Full Stack Developer Intern",
      company: "The Good Game Theory",
      description:
        "Enhanced frontend applications with ReactJS, boosting user engagement by 30%. Developed robust backend APIs using NodeJS and JSON storage.",
      icon: <Lightbulb />,
    },
    {
      date: "2023",
      title: "Java Full Stack Training",
      company: "Summer Training Program",
      description:
        "Completed an intensive 3-month summer training program, culminating in the successful development of a comprehensive full-stack project.",
      icon: <Award />,
    },
  ];

  const backgroundIcons = [
    { icon: Brain as React.ElementType<IconBaseProps>, size: 28 },
    { icon: Code2 as React.ElementType<IconBaseProps>, size: 32 },
    { icon: GraduationCap as React.ElementType<IconBaseProps>, size: 26 },
    { icon: Layers as React.ElementType<IconBaseProps>, size: 30 },
    { icon: Cpu as React.ElementType<IconBaseProps>, size: 24 },
    { icon: GitFork as React.ElementType<IconBaseProps>, size: 27 },
    { icon: Terminal as React.ElementType<IconBaseProps>, size: 29 },
    { icon: Database as React.ElementType<IconBaseProps>, size: 25 },
    { icon: Sparkles as React.ElementType<IconBaseProps>, size: 22 },
  ].slice(0, typeof window !== "undefined" && window.innerWidth < 768 ? 5 : 9);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const bioParagraphVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20, skewX: -5 },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  const lineGrowVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="absolute inset-0 z-0 opacity-80">
        {backgroundIcons.map((item, index) => (
          <FloatingIcon
            key={`about-bg-icon-${index}`}
            icon={item.icon}
            size={item.size}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div className="flex items-center mb-14 md:mb-20">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 uppercase tracking-tight whitespace-nowrap"
            variants={titleVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="ml-4 md:ml-6 h-1.5 flex-grow bg-gradient-to-r from-sky-500/70 to-indigo-500/70 rounded-full"
            variants={lineGrowVariants}
          ></motion.div>
        </motion.div>

        <motion.div className="space-y-6 text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed mb-16 md:mb-24 max-w-4xl">
          {personalBio.map((paragraph, index) => (
            <motion.p key={index} variants={bioParagraphVariants}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        <motion.h3
          className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-12 md:mb-16 text-center md:text-left"
          variants={titleVariants}
        >
          My Journey & Milestones
        </motion.h3>

        <div className="relative" ref={timelineContainerRef}>
          {timelineHeight > 0 && (
            <svg
              className="absolute left-1.5 sm:left-2 md:left-2.5 top-0 h-full w-2 md:w-3"
              style={{ transform: "translateX(-50%)", zIndex: -1 }}
              aria-hidden="true"
            >
              <motion.path
                d={`M 1 0 V ${timelineHeight - 20}`}
                stroke="url(#timelineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{
                  root: timelineContainerRef,
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: Math.max(2, timelineData.length * 0.3),
                  ease: "circOut",
                }}
              />
              <defs>
                <linearGradient
                  id="timelineGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.8)" />
                  <stop offset="100%" stopColor="rgba(99, 102, 241, 0.4)" />
                </linearGradient>
              </defs>
            </svg>
          )}

          <div className="space-y-10 md:space-y-12 pl-6 sm:pl-8 md:pl-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={timelineItemVariants}
              >
                <div
                  className="absolute -left-[18px] sm:-left-5 md:-left-[22px] top-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                                bg-slate-800 border-2 border-sky-500/80 rounded-full 
                                flex items-center justify-center transition-all duration-300 
                                group-hover:bg-sky-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_3px_rgba(56,189,248,0.5)]"
                  style={{ transform: "translateX(50%)" }}
                >
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-sky-400 group-hover:bg-slate-800 rounded-full transition-colors duration-300"></div>
                </div>

                <motion.div
                  className="p-4 md:p-6 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg 
                                border border-slate-700/60 transition-all duration-300 ease-out
                                group-hover:border-sky-500/80 group-hover:shadow-2xl group-hover:shadow-sky-700/20
                                group-hover:-translate-y-1.5 transform group-hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2.5">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-300 group-hover:text-sky-200 transition-colors duration-300 mb-1 sm:mb-0">
                      {item.title}
                    </h4>
                    <span className="text-xs sm:text-sm text-slate-400 bg-slate-700/70 px-2.5 py-1 rounded-md">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-300 group-hover:text-slate-200 transition-colors duration-300 mb-2.5">
                    {item.company}
                  </p>
                  <p className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>

                  {item.icon && (
                    <motion.div
                      className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 opacity-20 group-hover:opacity-70 transition-all duration-400
                                  transform group-hover:scale-110 group-hover:rotate-[-5deg]"
                      initial={{ scale: 0.8, opacity: 0.2 }}
                      whileHover={{ scale: 1.15, rotate: -8, opacity: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        className:
                          "text-sky-500/80 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
