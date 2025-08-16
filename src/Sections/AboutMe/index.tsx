import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import "./styles.css";

function AboutMe() {
  const videoRef = useRef(null);
  const videoElementRef = useRef(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement | null;
    if (!video) return;

    let isForward = true;
    let animationId: number;
    const speed = 0.033; // Original video speed (1/30 for 30fps equivalent)
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!video.duration) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Limit to 60 FPS for smoother performance
      if (currentTime - lastTime < 16.67) { // 16.67ms = ~60 FPS
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      if (isForward) {
        video.currentTime += speed;
        if (video.currentTime >= video.duration) {
          isForward = false;
        }
      } else {
        video.currentTime -= speed;
        if (video.currentTime <= 0) {
          isForward = true;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      // Reset to beginning
      video.currentTime = 0;
      isForward = true;
      
      // Start animation
      animate(0);
    };

    video.addEventListener('loadedmetadata', startAnimation);
    
    // Also restart when video becomes visible
    if (isVideoInView) {
      startAnimation();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isVideoInView]); // Add isVideoInView as dependency

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
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-8 sm:mb-10 tracking-wide"
        >
          About Me
        </motion.h2>

        {/* Video Section */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVideoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8 sm:mb-12 px-4"
        >
          {/* Video Container with responsive design */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#5A5EE6]/30 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm" style={{ aspectRatio: '16/9' }}>
            {/* Modern gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none z-10" />
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            {/* Inner glow effect */}
            <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 pointer-events-none z-5" />
            <video
              ref={videoElementRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              controls={false}
            >
              <source src="/PortfolyoVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

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
          className="text-gray-200 text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto text-center px-4"
        >
   As a dedicated Java Developer who thrives on creating software, I build scalable, high-performance solutions that make a real difference. I’m at home in every stage of the development process—from analyzing requirements and designing architecture to coding, testing, and deployment. With deep expertise in Spring Boot, microservices, and cloud platforms like AWS, I develop robust, innovative applications that stand the test of time. I’m all in on writing clean code, embracing test-driven development, and leveraging CI/CD to deliver seamless user experiences. My goal? To craft solutions that not only meet business needs but also bring value and delight to users. I love collaborating with teams, tackling tough challenges, and turning ideas into reality. With a genuine enthusiasm for technology and a drive to always do better, I bring energy and impact to every project.     </motion.p>
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
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
              className="bg-[#23234a]/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 flex flex-col items-center text-center gap-2 hover-lift"
            >
              <feature.icon className="text-blue-400 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 drop-shadow-lg" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='border-t border-white/10 w-full my-0' />
    </section>
  );
}

export default AboutMe;
