import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
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

  const { ref: containerRef, isVisible, getItemVariants } = useStaggerAnimation(features.length, {
    direction: 'up',
    distance: 40,
    duration: 0.8,
    baseDelay: 0.15
  });

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
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 120,
            damping: 20,
            ease: "easeOut"
          }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-10 tracking-wide"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ 
            delay: 0.4, 
            type: "spring", 
            stiffness: 120,
            damping: 20,
            ease: "easeOut"
          }}
          className="text-gray-200 text-lg mb-16 max-w-2xl mx-auto text-center"
        >
          I am a passionate Java Developer with a proven track record in designing, developing, and deploying scalable and efficient software solutions. My expertise spans the entire software development lifecycle, from requirements analysis and architectural design to implementation, testing, and deployment. I have a strong foundation in Spring Boot, microservices architecture, and cloud technologies such as AWS, which enables me to build robust, maintainable, and high-performance applications. I am committed to following best practices in clean code, test-driven development, and continuous integration/continuous deployment (CI/CD). My goal is to deliver innovative solutions that not only meet business needs but also provide a seamless and reliable user experience. I thrive in collaborative environments and enjoy tackling complex challenges that drive real-world impact.
        </motion.p>
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={getItemVariants(index)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover={{ 
                scale: 1.06, 
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.3 }
              }}
              className="bg-[#23234a]/80 rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 flex flex-col items-center text-center gap-2 hover-lift"
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
