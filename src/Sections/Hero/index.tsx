import { motion } from "framer-motion";
import { FaJava, FaDatabase, FaServer, FaCode, FaDocker, FaAws } from "react-icons/fa";
import { SiSpringboot, SiKubernetes, SiElasticsearch, SiQuarkus } from "react-icons/si";
import { BsBox } from "react-icons/bs";
import layeredWavesHero from "../../Assets/wallpapers/layered-waves-haikei-hero.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Mert Pehlivan
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300">
            Java Developer
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaJava className="text-5xl text-blue-400" />
            <span className="text-gray-300">Java</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <SiSpringboot className="text-5xl text-green-400" />
            <span className="text-gray-300">Spring Boot</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaDatabase className="text-5xl text-purple-400" />
            <span className="text-gray-300">Database</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaServer className="text-5xl text-pink-400" />
            <span className="text-gray-300">Backend</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaDocker className="text-5xl text-blue-300" />
            <span className="text-gray-300">Docker</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <SiKubernetes className="text-5xl text-blue-500" />
            <span className="text-gray-300">Kubernetes</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaAws className="text-5xl text-yellow-400" />
            <span className="text-gray-300">AWS</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <SiElasticsearch className="text-5xl text-orange-400" />
            <span className="text-gray-300">Elasticsearch</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <SiQuarkus className="text-5xl text-red-400" />
            <span className="text-gray-300">Quarkus</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <BsBox className="text-5xl text-pink-400" />
            <span className="text-gray-300">Micronaut</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center space-y-2">
            <FaCode className="text-5xl text-blue-400" />
            <span className="text-gray-300">Development</span>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
