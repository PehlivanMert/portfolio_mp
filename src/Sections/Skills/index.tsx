import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools, FaCloud, FaJava, FaAws } from "react-icons/fa";
import { SiSpring, SiSpringboot, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiDocker, SiKubernetes, SiGithub, SiGitlab, SiJira, SiConfluence, SiPostman, SiSwagger, SiIntellijidea, SiEclipseide, SiVsco, SiQuarkus, SiApachekafka, SiRabbitmq, SiVim, SiLinux, SiUbuntu } from "react-icons/si";
import { BsLightbulb, BsPeople, BsChatDots, BsLightningCharge, BsCheckCircle, BsBook, BsRocketTakeoff, BsGraphUp, BsClock, BsHeart } from "react-icons/bs";
import { useState, useEffect } from "react";
import circleScatterHaikeiCertificates from "../../Assets/wallpapers/circle-scatter-haikei-certificates.svg";

const softSkills = [
    { name: "Problem Solving", icon: BsLightbulb, color: "#FFD700", description: "Analytical thinking and creative solutions" },
    { name: "Teamwork", icon: BsPeople, color: "#4A90E2", description: "Collaborative and supportive team player" },
    { name: "Communication", icon: BsChatDots, color: "#50C878", description: "Clear and effective communication" },
    { name: "Adaptability", icon: BsLightningCharge, color: "#FF6B6B", description: "Quick to learn and adapt" },
    { name: "Leadership", icon: BsCheckCircle, color: "#9370DB", description: "Taking initiative and guiding teams" },
    { name: "Time Management", icon: BsClock, color: "#FF8C00", description: "Efficient and organized" },
    { name: "Growth Mindset", icon: BsBook, color: "#FF1493", description: "Continuous learning and improvement" },
    { name: "Innovation", icon: BsRocketTakeoff, color: "#00CED1", description: "Creative and forward-thinking" },
    { name: "Analytics", icon: BsGraphUp, color: "#32CD32", description: "Data-driven decision making" },
    { name: "Empathy", icon: BsHeart, color: "#FF69B4", description: "Understanding and supporting others" }
];

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = [
        { id: "all", name: "All Skills" },
        { id: "backend", name: "Backend" },
        { id: "frontend", name: "Frontend" },
        { id: "database", name: "Database" },
        { id: "devops", name: "DevOps" },
        { id: "tools", name: "Tools" }
    ];

    const skills = [
        {
            category: "backend",
            name: "Backend Development",
            icon: <FaServer className="w-6 h-6 text-blue-400" />,
            items: [
                { name: "Java", icon: <FaJava className="w-6 h-6" style={{ color: "#007396" }} /> },
                { name: "Spring Framework", icon: <SiSpring className="w-6 h-6" style={{ color: "#6DB33F" }} /> },
                { name: "Spring Boot", icon: <SiSpringboot className="w-6 h-6" style={{ color: "#6DB33F" }} /> },
                { name: "Quarkus", icon: <SiQuarkus className="w-6 h-6" style={{ color: "#4695EB" }} /> },
                { name: "Micronaut", icon: <BsRocketTakeoff className="w-6 h-6" style={{ color: "#FF0000" }} /> },
                { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6" style={{ color: "#339933" }} /> },
                { name: "Kafka", icon: <SiApachekafka className="w-6 h-6" style={{ color: "#231F20" }} /> },
                { name: "RabbitMQ", icon: <SiRabbitmq className="w-6 h-6" style={{ color: "#FF6600" }} /> }
            ]
        },
        {
            category: "frontend",
            name: "Frontend Development",
            icon: <FaCode className="w-6 h-6 text-purple-400" />,
            items: [
                { name: "JavaScript", icon: <SiJavascript className="w-6 h-6" style={{ color: "#F7DF1E" }} /> },
                { name: "TypeScript", icon: <SiTypescript className="w-6 h-6" style={{ color: "#3178C6" }} /> },
                { name: "React", icon: <SiReact className="w-6 h-6" style={{ color: "#61DAFB" }} /> }
            ]
        },
        {
            category: "database",
            name: "Database & Cache",
            icon: <FaDatabase className="w-6 h-6 text-green-400" />,
            items: [
                { name: "MongoDB", icon: <SiMongodb className="w-6 h-6" style={{ color: "#47A248" }} /> },
                { name: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6" style={{ color: "#336791" }} /> },
                { name: "MySQL", icon: <SiMysql className="w-6 h-6" style={{ color: "#4479A1" }} /> },
                { name: "Redis", icon: <SiRedis className="w-6 h-6" style={{ color: "#DC382D" }} /> }
            ]
        },
        {
            category: "devops",
            name: "DevOps & Cloud",
            icon: <FaCloud className="w-6 h-6 text-yellow-400" />,
            items: [
                { name: "Docker", icon: <SiDocker className="w-6 h-6" style={{ color: "#2496ED" }} /> },
                { name: "Kubernetes", icon: <SiKubernetes className="w-6 h-6" style={{ color: "#326CE5" }} /> },
                { name: "AWS", icon: <FaAws className="w-6 h-6" style={{ color: "#FF9900" }} /> },
                { name: "Linux", icon: <SiLinux className="w-6 h-6" style={{ color: "#FCC624" }} /> },
                { name: "Ubuntu", icon: <SiUbuntu className="w-6 h-6" style={{ color: "#E95420" }} /> }
            ]
        },
        {
            category: "tools",
            name: "Development Tools",
            icon: <FaTools className="w-6 h-6 text-red-400" />,
            items: [
                { name: "GitHub", icon: <SiGithub className="w-6 h-6" style={{ color: "#181717" }} /> },
                { name: "GitLab", icon: <SiGitlab className="w-6 h-6" style={{ color: "#FC6D26" }} /> },
                { name: "Jira", icon: <SiJira className="w-6 h-6" style={{ color: "#0052CC" }} /> },
                { name: "Confluence", icon: <SiConfluence className="w-6 h-6" style={{ color: "#172B4D" }} /> },
                { name: "Postman", icon: <SiPostman className="w-6 h-6" style={{ color: "#FF6C37" }} /> },
                { name: "Swagger", icon: <SiSwagger className="w-6 h-6" style={{ color: "#85EA2D" }} /> },
                { name: "IntelliJ IDEA", icon: <SiIntellijidea className="w-6 h-6" style={{ color: "#000000" }} /> },
                { name: "VS Code", icon: <SiVsco className="w-6 h-6" style={{ color: "#007ACC" }} /> },
                { name: "Eclipse", icon: <SiEclipseide className="w-6 h-6" style={{ color: "#2C2255" }} /> },
                { name: "Vim", icon: <SiVim className="w-6 h-6" style={{ color: "#019733" }} /> }
            ]
        }
    ];

    const filteredSkills = activeCategory === "all"
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <section id="skills" className="min-h-screen py-20 bg-[#23234a] relative">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(18)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"
                        initial={{
                            x: Math.random() * dimensions.width,
                            y: Math.random() * dimensions.height,
                            scale: Math.random() * 0.7 + 0.3,
                        }}
                        animate={{
                            y: [0, Math.random() * dimensions.height],
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
                    Technical Skills
                </motion.h2>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full text-sm f    ont-medium transition-all duration-300 ${activeCategory === category.id
                                ? "bg-blue-500 text-white"
                                : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSkills.map((skillGroup) => (
                        <motion.div
                            key={skillGroup.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#23234a]/80 rounded-2xl p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#5A5EE6]/30">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                                    {skillGroup.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{skillGroup.name}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {skillGroup.items.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 group/item"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{item.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Soft Skills Section */}
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
                    className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-10 mt-20 tracking-wide"
                >
                    Soft Skills
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {softSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#23234a]/80 rounded-2xl p-6 shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 group"
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                                    {React.createElement(skill.icon, {
                                        className: "w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300",
                                        style: { color: skill.color }
                                    })}
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{skill.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
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

export default Skills; 