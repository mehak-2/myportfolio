"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Mail, MessageSquare, User, Send } from "lucide-react";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const test = "Let's Connect";

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      console.error(
        "EmailJS Error: Missing environment variables. Ensure they are set in .env.local and the server was restarted."
      );
      setError(true);
      setIsSubmitting(false);
      return;
    }

    if (!form.current) {
      console.error("EmailJS Error: Form reference is not available.");
      setError(true);
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      (result) => {
        console.log("EmailJS Success:", result.text);
        setSuccess(true);
        if (form.current) form.current.reset();
        setIsSubmitting(false);
        setTimeout(() => setSuccess(false), 5000);
      },
      (errorResult) => {
        console.error("EmailJS Error:", errorResult.text, errorResult);
        setError(true);
        setIsSubmitting(false);
        setTimeout(() => setError(false), 5000);
      }
    );
  };

  const pageVariants = {
    initial: { opacity: 0, y: "-100vh" },
    animate: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.7, ease: "circOut" },
    },
    exit: {
      opacity: 0,
      y: "100vh",
      transition: { duration: 0.5, ease: "circIn" },
    },
  };

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const titleLetterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const lineGrowVariants = {
    hidden: { scaleX: 0, originX: 0.5 },
    visible: {
      scaleX: 1,
      originX: 0.5,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 },
    },
  };

  const formContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4,
        staggerChildren: 0.15,
      },
    },
  };

  const formElementVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-sky-600/10 rounded-full blur-[100px] animate-pulse-slow opacity-50 -z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-indigo-600/10 rounded-full blur-[80px] animate-pulse-slower opacity-40 -z-0"></div>

      <div className="relative z-10 w-full  flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center text-center lg:text-left py-8 lg:py-0">
          <motion.div
            className="mb-6 lg:mb-8"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 mb-3">
              {test.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={titleLetterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="h-1 w-2/3 lg:w-full max-w-xs mx-auto lg:mx-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
              variants={lineGrowVariants}
            />
          </motion.div>
          <motion.p
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.6 },
            }}
          >
            Have a project in mind or just want to say hi? Fill out the form...
          </motion.p>
        </div>

        <motion.form
          onSubmit={sendEmail}
          ref={form}
          className="w-full lg:w-3/5 bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl shadow-sky-900/30 p-6 sm:p-8 md:p-10 flex flex-col gap-6 border border-slate-700/50"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={formElementVariants}>
            <label
              htmlFor="user_message_field"
              className="block text-sm font-medium text-sky-300 mb-1.5"
            >
              Dear, Mehak{" "}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <textarea
                id="user_message_field"
                rows={5}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 py-2.5 pr-3 pl-10 
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 resize-none"
                name="user_message"
                placeholder="Write your message here..."
                required
                aria-label="Your message to Mehak"
              />
            </div>
          </motion.div>

          <motion.div variants={formElementVariants}>
            <label
              htmlFor="user_email_input"
              className="block text-sm font-medium text-sky-300 mb-1.5"
            >
              My email address is
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <input
                id="user_email_input"
                name="user_email"
                type="email"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 py-2.5 pr-3 pl-10 
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                placeholder="your.email@example.com"
                required
                aria-label="Your email address"
              />
            </div>
          </motion.div>

          <motion.div variants={formElementVariants}>
            <label
              htmlFor="user_name_input"
              className="block text-sm font-medium text-sky-300 mb-1.5"
            >
              Regards,{" "}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <input
                id="user_name_input"
                name="user_name"
                type="text"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 py-2.5 pr-3 pl-10
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                placeholder="Your Name"
                aria-label="Your Name"
              />
            </div>
          </motion.div>

          <motion.div variants={formElementVariants} className="mt-2">
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 transition-all duration-300 ease-in-out
                         disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 5px 15px rgba(0, 180, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>

          <div className="h-6 mt-1 text-center">
            {" "}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-400"
              >
                Message sent successfully!
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                Oops! Something went wrong. Please try again.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
      <motion.footer
        className="absolute bottom-4 text-center w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }}
      ></motion.footer>
    </motion.div>
  );
};

export default ContactPage;
