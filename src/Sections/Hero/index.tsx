import { motion } from "framer-motion";
import { FaJava, FaDatabase, FaServer, FaDocker, FaAws } from "react-icons/fa";
import { SiSpringboot, SiKubernetes, SiElasticsearch, SiQuarkus, SiApachekafka } from "react-icons/si";
import { BsBox } from "react-icons/bs";
import layeredWavesHero from "../../Assets/wallpapers/layered-waves-haikei-hero.svg";

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.2,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.4 + i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const name = "Mert Pehlivan";

  const skills = [
    { icon: FaJava, name: "Java", color: "text-purple-400" },
    { icon: SiSpringboot, name: "Spring Boot", color: "text-green-400" },
    { icon: FaDatabase, name: "Database", color: "text-pink-400" },
    { icon: FaServer, name: "Backend", color: "text-purple-400" },
    { icon: FaDocker, name: "Docker", color: "text-pink-400" },
    { icon: SiKubernetes, name: "Kubernetes", color: "text-purple-400" },
    { icon: FaAws, name: "AWS", color: "text-pink-400" },
    { icon: SiApachekafka, name: "Kafka", color: "text-purple-400" },
    { icon: SiElasticsearch, name: "Elasticsearch", color: "text-purple-400" },
    { icon: SiQuarkus, name: "Quarkus", color: "text-pink-400" },
    { icon: BsBox, name: "Micronaut", color: "text-purple-400" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-30"
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
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-4 text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text"
            variants={textVariants}
            custom={0}
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl text-white"
            variants={textVariants}
            custom={1}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-block"
            >
              Java
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="inline-block text-purple-400"
            >
              Backend
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="inline-block"
            >
              Developer
            </motion.span>
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              variants={skillVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex flex-col items-center space-y-2"
            >
              <skill.icon className={`text-5xl ${skill.color}`} />
              <span className="text-gray-300">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-gray-400 max-w-2xl mx-auto mt-8 text-center"
        >
          Passionate about building robust and scalable applications with Java. Specializing in backend development, database management, and system architecture.
        </motion.p>
      </div>
      {/* Alt arka plan SVG */}
      <img
        src={layeredWavesHero}
        alt="waves background"
        className="absolute bottom-8 left-0 w-full pointer-events-none select-none z-0 opacity-20"
        style={{ objectFit: 'cover', filter: 'blur(8px)', mixBlendMode: 'lighten' }}
      />
    </section>
  );
};

export default Hero;
