import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMedium, FaFileAlt, FaPhone } from "react-icons/fa";
import "./styles.css";
import { socialLinks } from "../../Data/index";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="flex items-center justify-center gap-3"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.icon === "github" && <FaGithub className="text-2xl" />}
                {link.icon === "linkedin" && <FaLinkedin className="text-2xl" />}
                {link.icon === "medium" && <FaMedium className="text-2xl" />}
                {link.icon === "mail" && <FaEnvelope className="text-2xl" />}
                {link.icon === "phone" && <FaPhone className="text-2xl" />}
                {link.icon === "cv" && <FaFileAlt className="text-2xl" />}
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-sm text-gray-400"
              >
                © {currentYear}
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2 text-gray-500 bg-[#1a1a3a]/50 px-6 py-2.5 rounded-full border border-[#5A5EE6]/20 hover:border-[#5A5EE6]/40 transition-all duration-300 shadow-lg hover:shadow-[#5A5EE6]/10"
              >
                <span className="text-xs font-medium">Made with</span>
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-red-500 text-base"
                >
                  ❤
                </motion.span>
                <span className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  by Mert Pehlivan
                </span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-sm text-gray-400"
              >
                All rights reserved
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
