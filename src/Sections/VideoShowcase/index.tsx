import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { applySafariVideoFixes, isSafari, isIOSSafari, handleVideoError } from "../../utils/videoUtils";

const VideoShowcase = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Apply Safari-specific fixes
    if (isSafari() || isIOSSafari()) {
      applySafariVideoFixes(video);
    }

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
      handleVideoError(e, video);
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

    // Safari-specific: Try to load video
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section ref={ref} className="relative py-16 bg-gradient-to-b from-[#18181b] to-[#23234a] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, Math.random() * window.innerHeight],
              opacity: [0.1, 0.3, 0.1],
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-sm mx-auto"
        >
          {/* Video Container with responsive design */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#5A5EE6]/30" style={{ aspectRatio: '9/16' }}>
            {!videoError ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="metadata"
                crossOrigin="anonymous"
                className="safari-video-fixes"
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
                  <p className="text-xs text-gray-400 mt-1">Safari kullanıyorsanız sayfayı yenileyin</p>
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
      </div>
    </section>
  );
};

export default VideoShowcase;
