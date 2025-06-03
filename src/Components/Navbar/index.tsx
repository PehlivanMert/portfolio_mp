import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "certificates", "contact"];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "home", label: t("home") },
    { id: "about", label: t("about-me") },
    { id: "skills", label: t("skills") },
    { id: "projects", label: t("projects") },
    { id: "certificates", label: t("certificates") },
    { id: "contact", label: t("contact") },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed top-0 left-0 right-0 z-[99] bg-gradient-to-r from-[#5A5EE6cc] via-[#23234acc] to-[#A1A4EAcc] backdrop-blur-xl shadow-2xl border-b border-white/10"
      style={{
        boxShadow: "0 8px 32px 0 rgba(90,94,230,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#home"
            className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-pink-400 hover:to-blue-400 transition-colors drop-shadow-lg"
            whileHover={{ scale: 1.12 }}
          >
            MP
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8 space-x-8">
            {links.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-2 font-semibold text-lg transition-colors duration-200 ${activeSection === item.id ? "text-blue-400" : "text-white hover:text-purple-400"}`}
                whileHover={{ y: -3, scale: 1.08 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <motion.a
              href="https://github.com/PehlivanMert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaGithub size={26} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/smertpehlivan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaLinkedin size={26} />
            </motion.a>
            <motion.a
              href="mailto:pehlivanmert@outlook.com.tr"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaEnvelope size={26} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setShow(!show)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {show ? <FaTimes size={30} /> : <FaBars size={30} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-[#5A5EE6cc] via-[#23234acc] to-[#A1A4EAcc] backdrop-blur-xl shadow-2xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-6">
                {links.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-xl font-semibold transition-colors ${activeSection === item.id ? "text-blue-400" : "text-white hover:text-purple-400"}`}
                    whileHover={{ x: 10, scale: 1.08 }}
                    onClick={() => setShow(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="flex space-x-5 pt-6 border-t border-white/10">
                  <motion.a
                    href="https://github.com/PehlivanMert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaGithub size={26} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/smertpehlivan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaLinkedin size={26} />
                  </motion.a>
                  <motion.a
                    href="mailto:pehlivanmert@outlook.com.tr"
                    className="text-white hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaEnvelope size={26} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
