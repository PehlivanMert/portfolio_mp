import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaFilePdf, FaMedium } from "react-icons/fa";
import "./styles.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setShow(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "statistics", "education", "blog", "contact"];
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
    { id: "about", label: "About Me" },
    { id: "skills", label: "Technical Skills" },
    { id: "projects", label: "Projects" },
    { id: "statistics", label: "Statistics & Highlights" },
    { id: "education", label: "Education & Certifications" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string, isMobile: boolean = false) => {
    e.preventDefault();
    if (isMobile) {
      setShow(false);
      setTimeout(() => {
        const yOffset = -80;
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 350);
    } else {
      const yOffset = -80;
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="navbar"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <motion.a
            href="#"
            className="logo"
            whileHover={{ scale: 1.12 }}
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            MP
          </motion.a>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <div className="desktop-menu-links">
              {links.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleNavClick(e, item.id, false)}
                  className={`desktop-menu-link ${activeSection === item.id ? 'active' : ''}`}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <motion.a
              href="https://github.com/PehlivanMert"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaGithub size={26} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/smertpehlivan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaLinkedin size={26} />
            </motion.a>
            <motion.a
              href="mailto:pehlivanmert@outlook.com.tr"
              className="social-icon"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
            >
              <FaEnvelope size={26} />
            </motion.a>
            <motion.a
              href="https://pehlivanmert.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #00ab6c" }}
            >
              <FaMedium size={26} />
            </motion.a>
            <motion.a
              href="/Mert Pehlivan Cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.25, boxShadow: "0 0 16px #FF5252" }}
            >
              <FaFilePdf size={26} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <motion.button
              onClick={() => setShow(!show)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {show ? <FaTimes size={30} /> : <FaBars size={30} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mobile-menu ${show ? 'active' : ''}`}
          >
            <div className="mobile-menu-content">
              <div className="mobile-menu-links">
                {links.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={e => handleNavClick(e, item.id, true)}
                    className={`mobile-menu-link ${activeSection === item.id ? 'active' : ''}`}
                    whileHover={{ x: 10, scale: 1.08 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="mobile-social-icons">
                  <motion.a
                    href="https://github.com/PehlivanMert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaGithub size={26} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/smertpehlivan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaLinkedin size={26} />
                  </motion.a>
                  <motion.a
                    href="mailto:pehlivanmert@outlook.com.tr"
                    className="social-icon"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #6C63FF" }}
                  >
                    <FaEnvelope size={26} />
                  </motion.a>
                  <motion.a
                    href="https://pehlivanmert.medium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #00ab6c" }}
                  >
                    <FaMedium size={26} />
                  </motion.a>
                  <motion.a
                    href="/Mert Pehlivan Cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.25, boxShadow: "0 0 16px #FF5252" }}
                  >
                    <FaFilePdf size={26} />
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
