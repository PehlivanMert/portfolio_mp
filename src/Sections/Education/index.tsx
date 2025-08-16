import { motion } from "framer-motion";
import { educationData, certificatesData } from "../../Data";
import { FaGraduationCap, FaCertificate, FaCode, FaUniversity, FaLaptopCode, FaAward } from "react-icons/fa";
import { SiUdemy, SiLinkedin } from "react-icons/si";
import { MdSchool } from "react-icons/md";
import { useState } from "react";
import circleScatterHaikeiCertificates from "../../Assets/wallpapers/circle-scatter-haikei-certificates.svg";
import { useStaggerAnimation } from "../../hooks/useScrollAnimation";

const Education = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const categories = [
        { id: "all", name: "All" },
        { id: "education", name: "Education" },
        { id: "certificates", name: "Certificates" }
    ];

    const getEducationIcon = (organization: string) => {
        switch (organization.toLowerCase()) {
            case "patika.dev":
                return <FaCode className="w-6 h-6 text-blue-400" />;
            case "patika.dev - getir":
                return <FaCode className="w-6 h-6 text-blue-400" />;
            case "rise in":
                return <FaLaptopCode className="w-6 h-6 text-purple-400" />;
            case "anadolu üniversitesi":
                return <FaUniversity className="w-6 h-6 text-green-400" />;
            case "balıkesir üniversitesi":
                return <MdSchool className="w-6 h-6 text-yellow-400" />;
            default:
                return <FaGraduationCap className="w-6 h-6 text-blue-400" />;
        }
    };

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const getCertificateIcon = (organization: string) => {
        switch (organization.toLowerCase()) {
            case "udemy":
                return <SiUdemy className="w-6 h-6 text-purple-400" />;
            case "linkedin":
                return <SiLinkedin className="w-6 h-6 text-blue-400" />;
            case "kodluyoruz":
                return <FaCode className="w-6 h-6 text-red-400" />;
            case "osd - otomotiv sanayii derneği":
                return <FaAward className="w-6 h-6 text-yellow-400" />;
            case "rise in":
                return <FaLaptopCode className="w-6 h-6 text-purple-400" />;
            case "patika.dev":
                return <FaCode className="w-6 h-6 text-blue-400" />;
            case "patika.dev - getir":
                return <FaCode className="w-6 h-6 text-blue-400" />;
            default:
                return <FaCertificate className="w-6 h-6 text-blue-400" />;
        }
    };

    // Education için stagger
    const { ref: educationRef, isVisible: educationVisible, getItemVariants: getEducationVariants } = useStaggerAnimation(educationData.length, {
        direction: 'up',
        distance: 30,
        duration: 0.6,
        baseDelay: 0.1
    });
    // Certificates için stagger
    const { ref: certificatesRef, isVisible: certificatesVisible, getItemVariants: getCertificatesVariants } = useStaggerAnimation(certificatesData.length, {
        direction: 'up',
        distance: 25,
        duration: 0.5,
        baseDelay: 0.08
    });

    const renderContent = () => {
        switch (activeCategory) {
            case "education":
                return (
                    <div ref={educationRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        {educationData.map((education, index) => (
                            <motion.div
                                key={education.id}
                                variants={getEducationVariants(index)}
                                initial="hidden"
                                animate={educationVisible ? "visible" : "hidden"}
                                className="bg-[#23234a]/80 rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        {getEducationIcon(education.organization)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{education.title}</h4>
                                        <p className="text-gray-300 mb-2">{education.organization}</p>
                                        <p className="text-gray-400 text-sm mb-3">{education.date}</p>
                                        
                                        {/* Kısa açıklama - her zaman görünür */}
                                        <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                                            {expandedItems.has(education.id.toString()) 
                                                ? education.description 
                                                : education.description.length > 100 
                                                    ? `${education.description.substring(0, 100)}...` 
                                                    : education.description
                                            }
                                        </p>
                                        
                                        {/* Skills ve Certificate - sadece genişletildiğinde görünür */}
                                        {(expandedItems.has(education.id.toString()) || education.description.length <= 100) && (
                                            <>
                                                {education.skills && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {education.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {education.certificate && (
                                                    <a
                                                        href={education.certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        View Certificate
                                                    </a>
                                                )}
                                            </>
                                        )}
                                        
                                        {/* Toggle butonu - sadece uzun açıklamalar için */}
                                        {education.description.length > 100 && (
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => toggleExpanded(education.id.toString())}
                                                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                                >
                                                    {expandedItems.has(education.id.toString()) ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );
            case "certificates":
                return (
                    <div ref={certificatesRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        {certificatesData.map((certificate, index) => (
                            <motion.div
                                key={certificate.id}
                                variants={getCertificatesVariants(index)}
                                initial="hidden"
                                animate={certificatesVisible ? "visible" : "hidden"}
                                className="bg-[#23234a]/80 rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        {getCertificateIcon(certificate.organization)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{certificate.title}</h4>
                                        <p className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-2">{certificate.organization}</p>
                                        <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{certificate.date}</p>
                                        
                                        {/* Skills, Certificate ID ve Certificate Link - sadece genişletildiğinde görünür */}
                                        {expandedItems.has(certificate.id.toString()) && (
                                            <>
                                                {certificate.skills && (
                                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                                        {certificate.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {certificate.certificateId && (
                                                    <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                                                        Certificate ID: {certificate.certificateId}
                                                    </p>
                                                )}
                                                {certificate.certificate && (
                                                    <a
                                                        href={certificate.certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-2 sm:mt-3 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                                    >
                                                        View Certificate
                                                    </a>
                                                )}
                                            </>
                                        )}
                                        
                                        {/* Toggle butonu - her zaman görünür */}
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => toggleExpanded(certificate.id.toString())}
                                                className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                            >
                                                {expandedItems.has(certificate.id.toString()) ? 'Show Less' : 'Show More'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );
            default:
                return (
                    <>
                        <div className="mb-16">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
                            >
                                <FaGraduationCap className="text-blue-400" />
                                Education
                            </motion.h3>
                            <div ref={educationRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                {educationData.map((education, index) => (
                                    <motion.div
                                        key={education.id}
                                        variants={getEducationVariants(index)}
                                        initial="hidden"
                                        animate={educationVisible ? "visible" : "hidden"}
                                        className="bg-[#23234a]/80 rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                {getEducationIcon(education.organization)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{education.title}</h4>
                                                <p className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-2">{education.organization}</p>
                                                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{education.date}</p>
                                                
                                                {/* Kısa açıklama - her zaman görünür */}
                                                <p className="text-gray-300 text-sm mb-3">
                                                    {expandedItems.has(education.id.toString()) 
                                                        ? education.description 
                                                        : education.description.length > 100 
                                                            ? `${education.description.substring(0, 100)}...` 
                                                            : education.description
                                                    }
                                                </p>
                                                
                                                {/* Skills ve Certificate - sadece genişletildiğinde görünür */}
                                                {(expandedItems.has(education.id.toString()) || education.description.length <= 100) && (
                                                    <>
                                                        {education.skills && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {education.skills.map((skill, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {education.certificate && (
                                                            <a
                                                                href={education.certificate}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors"
                                                            >
                                                                View Certificate
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                                
                                                {/* Toggle butonu - sadece uzun açıklamalar için */}
                                                {education.description.length > 100 && (
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            onClick={() => toggleExpanded(education.id.toString())}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                                        >
                                                            {expandedItems.has(education.id.toString()) ? 'Show Less' : 'Show More'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-white mb-8 flex items-center gap-2"
                            >
                                <FaCertificate className="text-blue-400" />
                                Certifications
                            </motion.h3>
                            <div ref={certificatesRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                {certificatesData.map((certificate, index) => (
                                    <motion.div
                                        key={certificate.id}
                                        variants={getCertificatesVariants(index)}
                                        initial="hidden"
                                        animate={certificatesVisible ? "visible" : "hidden"}
                                        className="bg-[#23234a]/80 rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                {getCertificateIcon(certificate.organization)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{certificate.title}</h4>
                                                <p className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-2">{certificate.organization}</p>
                                                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{certificate.date}</p>
                                                
                                                {/* Skills, Certificate ID ve Certificate Link - sadece genişletildiğinde görünür */}
                                                {expandedItems.has(certificate.id.toString()) && (
                                                    <>
                                                        {certificate.skills && (
                                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                                {certificate.skills.map((skill, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {certificate.certificateId && (
                                                            <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                                                                Certificate ID: {certificate.certificateId}
                                                            </p>
                                                        )}
                                                        {certificate.certificate && (
                                                            <a
                                                                href={certificate.certificate}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-block mt-2 sm:mt-3 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                                            >
                                                                View Certificate
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                                
                                                {/* Toggle butonu - her zaman görünür */}
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => toggleExpanded(certificate.id.toString())}
                                                        className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                                    >
                                                        {expandedItems.has(certificate.id.toString()) ? 'Show Less' : 'Show More'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <section id="education" className="py-24 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
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
                    Education & Certifications
                </motion.h2>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
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

                {renderContent()}
            </div>
            <div className='border-t border-white/10 w-full my-0' />
            <img
                src={circleScatterHaikeiCertificates}
                alt="circle scatter background"
                className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-0 opacity-20"
                style={{ objectFit: 'cover', filter: 'blur(8px)', mixBlendMode: 'lighten' }}
            />
        </section>
    );
};

export default Education; 