import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import "./styles.css";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";
import waveHaikeiProjects from "../../Assets/wallpapers/wave-haikei-projects.svg";
import { projectsData } from "../../Data/index";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  const { ref: projectsRef, isVisible, getItemVariants } = useStaggerAnimation(filteredProjects.length, {
    direction: 'up',
    distance: 30,
    duration: 0.7,
    baseDelay: 0.1
  });

  // filteredProjects değiştiğinde animasyonları yeniden tetikle
  useEffect(() => {
    if (projectsRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Animasyonları yeniden tetikle
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(projectsRef.current);
      return () => observer.disconnect();
    }
  }, [filteredProjects.length]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "microservices", name: "Microservices" },
    { id: "monolithic", name: "Monolithic" },
    { id: "web app", name: "Web Apps" }
  ];

  const openModal = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
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
          Projects
        </motion.h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div ref={projectsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={getItemVariants(index)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-[#23234a]/80 rounded-2xl overflow-hidden shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 flex flex-col h-full hover-lift"
            >
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm md:text-base"
                  >
                    <FaGithub className="text-xs sm:text-sm md:text-base" />
                    <span>GitHub</span>
                  </a>
                  {project.webapp && project.webapp !== project.github && (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <FaExternalLinkAlt className="text-xs sm:text-sm md:text-base" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                <div className="flex-1" />
                <div className="flex justify-end items-end mt-3 sm:mt-4 md:mt-6">
                  <button
                    onClick={() => openModal(project)}
                    className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    <FaBookOpen className="text-xs sm:text-sm md:text-lg group-hover:scale-110 transition-transform duration-200" />
                    <span>Detail</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Modal */}
        {showModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4">
            <div className="bg-[#23234a] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative border border-[#5A5EE6]/30 animate-fade-in">
              <div className="p-3 sm:p-6 lg:p-8">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl sm:text-2xl font-bold z-10 bg-[#23234a]/80 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 pr-8 sm:pr-12">{selectedProject.title}</h2>
                <div className="prose prose-invert max-w-none text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  <ReactMarkdown>{selectedProject.details}</ReactMarkdown>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  {selectedProject.webapp && selectedProject.webapp !== selectedProject.github && (
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                {selectedProject.title === "Redis Cache Example" ? (
                  <div className="flex justify-end mt-4 sm:mt-8">
                    <a
                      href="https://github.com/PehlivanMert/redis-cache/blob/main/Readme.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-readme-btn flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-full text-sm sm:text-base font-medium shadow-lg transition-all duration-300 relative overflow-hidden"
                    >
                      <FaBookOpen />
                      <span>GitHub README</span>
                      <span className="github-readme-glow" />
                    </a>
                  </div>
                ) : (
                  <div className="flex justify-end mt-4 sm:mt-8">
                    <a
                      href={selectedProject.github.replace(/(\.git)?$/, '/blob/main/README.md')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-readme-btn flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-full text-sm sm:text-base font-medium shadow-lg transition-all duration-300 relative overflow-hidden"
                    >
                      <FaBookOpen />
                      <span>GitHub README</span>
                      <span className="github-readme-glow" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='border-t border-white/10 w-full my-0' />
      {/* Alt arka plan SVG */}
      <img
        src={waveHaikeiProjects}
        alt="projects waves background"
        className="absolute bottom-8 left-0 w-full pointer-events-none select-none z-0 opacity-20"
        style={{ objectFit: 'cover', filter: 'blur(8px)', mixBlendMode: 'lighten' }}
      />
    </section>
  );
};

export default Projects;
