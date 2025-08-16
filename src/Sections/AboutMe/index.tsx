import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./styles.css";

function AboutMe() {
  const videoRef = useRef(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement | null;
    if (!video) return;

    const handleLoadStart = () => {
      console.log('Video loading started');
      setVideoError(false);
    };

    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
      setIsVideoLoaded(false);
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      setIsVideoLoaded(true);
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    let isForward = true;
    let animationId: number;
    const speed = 0.033; // Original video speed (1/30 for 30fps equivalent)
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!video.duration || videoError) {
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
      if (videoError) return;
      
      // Reset to beginning
      video.currentTime = 0;
      isForward = true;
      
      // Start animation
      animate(0);
    };

    video.addEventListener('loadedmetadata', startAnimation);
    
    // Also restart when video becomes visible
    if (isVideoInView && !videoError) {
      startAnimation();
    }

    // Safari-specific: Try to load video
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isVideoInView, videoError]); // Add videoError as dependency

  const features = [
    {
      icon: FaCode,
      title: "Clean Code",
      description: "Writing maintainable, readable, and efficient code that follows best practices and design patterns."
    },
    {
      icon: FaServer,
      title: "Backend Development",
      description: "Building robust, scalable server-side applications with modern frameworks and technologies."
    },
    {
      icon: FaDatabase,
      title: "Database Design",
      description: "Designing and optimizing database schemas for performance and data integrity."
    },
    {
      icon: FaCloud,
      title: "Cloud Solutions",
      description: "Deploying and managing applications in cloud environments with containerization and orchestration."
    }
  ];

  const { ref: containerRef, isVisible, getItemVariants } = useStaggerAnimation(features.length, {
    direction: 'up',
    distance: 30,
    duration: 0.7,
    baseDelay: 0.1
  });

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
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
        <motion.div
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 tracking-wide">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video Section - First on mobile, left on desktop */}
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ 
              delay: 0.4, 
              type: "spring", 
              stiffness: 100,
              damping: 20,
              ease: "easeOut"
            }}
            className="order-1 lg:order-1"
          >
            {/* Video Container with responsive design */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#5A5EE6]/30 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm min-h-[200px] sm:min-h-[250px]" style={{ aspectRatio: '16/9' }}>
              {/* Modern gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none z-10" />
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
              {/* Inner glow effect */}
              <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 pointer-events-none z-5" />
              
              {!videoError ? (
                <video
                  ref={videoElementRef}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  controls={false}
                  preload="metadata"
                  crossOrigin="anonymous"
                  style={{ 
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {/* WebM format (better compression, modern browsers) */}
                  <source src="/PortfolyoVideo.webm" type="video/webm; codecs=vp9,opus" />
                  {/* MP4 format (Safari and older browsers) */}
                  <source src="/PortfolyoVideo.mp4" type="video/mp4; codecs=avc1.42E01E, mp4a.40.2" />
                  <source src="/PortfolyoVideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-sm">Video yüklenemedi</p>
                  </div>
                </div>
              )}
              
              {/* Loading indicator */}
              {!isVideoLoaded && !videoError && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              
              {/* Overlay gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Section - Second on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ 
              delay: 0.6, 
              type: "spring", 
              stiffness: 100,
              damping: 20,
              ease: "easeOut"
            }}
            className="order-2 lg:order-2"
          >
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              As a dedicated Java Developer who thrives on creating software, I build scalable, high-performance solutions that make a real difference. I'm at home in every stage of the development process—from analyzing requirements and designing architecture to coding, testing, and deployment. With deep expertise in Spring Boot, microservices, and cloud platforms like AWS, I develop robust, innovative applications that stand the test of time. I'm all in on writing clean code, embracing test-driven development, and leveraging CI/CD to deliver seamless user experiences. My goal? To craft solutions that not only meet business needs but also bring value and delight to users. I love collaborating with teams, tackling tough challenges, and turning ideas into reality. With a genuine enthusiasm for technology and a drive to always do better, I bring energy and impact to every project.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
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
              className="bg-[#23234a]/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 flex flex-col items-center text-center gap-2 hover-lift"
            >
              <feature.icon className="text-blue-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 drop-shadow-lg" />
              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 tracking-wide">{feature.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='border-t border-white/10 w-full my-0' />
    </section>
  );
}

export default AboutMe;
