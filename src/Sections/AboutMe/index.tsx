import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import "./styles.css";

function AboutMe() {
  const features = [
    {
      icon: FaCode,
      title: "Clean Code",
      description: "Writing maintainable and scalable code following best practices and design patterns."
    },
    {
      icon: FaServer,
      title: "Backend Development",
      description: "Building robust and efficient server-side applications with Java and Spring Boot."
    },
    {
      icon: FaDatabase,
      title: "Database Design",
      description: "Designing and optimizing database schemas for optimal performance and scalability."
    },
    {
      icon: FaCloud,
      title: "Cloud Solutions",
      description: "Deploying and managing applications in cloud environments using AWS and Docker."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-10 tracking-wide"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="text-gray-200 text-lg mb-16 max-w-2xl mx-auto text-center"
        >
          I am a passionate Java Developer with expertise in building scalable and efficient applications. With a strong foundation in Spring Boot, microservices architecture, and cloud technologies, I strive to create robust solutions that solve real-world problems.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.06, rotate: [0, 2, -2, 0] }}
              className="bg-[#23234a]/80 rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 flex flex-col items-center text-center gap-2"
            >
              <feature.icon className="text-blue-400 text-5xl mb-4 drop-shadow-lg" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{feature.title}</h3>
              <p className="text-gray-300 text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='border-t border-white/10 w-full my-0' />
    </section>
  );
}

export default AboutMe;
