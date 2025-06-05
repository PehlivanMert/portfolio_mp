import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaCode, FaProjectDiagram, FaDatabase, FaServer } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import layeredWavesHero from "../../Assets/wallpapers/layered-waves-haikei-hero.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    'rgba(0, 136, 254, 0.8)',   // Mavi
    'rgba(0, 196, 159, 0.8)',   // Yeşil
    'rgba(255, 187, 40, 0.8)',  // Sarı
    'rgba(255, 128, 66, 0.8)',  // Turuncu
    'rgba(136, 132, 216, 0.8)', // Mor
];

const GITHUB_USERNAME = "PehlivanMert";

interface GitHubStats {
    totalProjects: number;
    totalLinesOfCode: number;
    languageBreakdown: {
        name: string;
        value: number;
    }[];
}

const Statistics = () => {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                if (!token) {
                    throw new Error("GitHub token not found in environment variables");
                }

                // Önce kullanıcı bilgilerini kontrol edelim
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'portfolio-mp'
                    }
                });

                if (!userResponse.ok) {
                    const errorData = await userResponse.json();
                    throw new Error(`GitHub API Error: ${errorData.message || 'Failed to fetch user data'}`);
                }

                // Repoları getir
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'portfolio-mp'
                    }
                });

                if (!reposResponse.ok) {
                    const errorData = await reposResponse.json();
                    throw new Error(`GitHub API Error: ${errorData.message || 'Failed to fetch repositories'}`);
                }

                const repos = await reposResponse.json();
                const languageStats = new Map<string, number>();

                // Her repo için dil bilgilerini getir
                for (const repo of repos) {
                    if (repo.fork) continue; // Fork edilmiş repoları atla

                    const langResponse = await fetch(repo.languages_url, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'portfolio-mp'
                        }
                    });

                    if (!langResponse.ok) continue;

                    const languages = await langResponse.json();
                    Object.entries(languages).forEach(([lang, bytes]: [string, any]) => {
                        languageStats.set(lang, (languageStats.get(lang) || 0) + bytes);
                    });
                }

                const totalLinesOfCode = Array.from(languageStats.values()).reduce((a, b) => a + b, 0);
                const languageBreakdown = Array.from(languageStats.entries())
                    .map(([name, value]) => ({
                        name: name.trim(),
                        value: Math.round((value / totalLinesOfCode) * 100),
                    }))
                    .sort((a, b) => b.value - a.value);

                setStats({
                    totalProjects: repos.filter((repo: any) => !repo.fork).length,
                    totalLinesOfCode,
                    languageBreakdown,
                });
            } catch (err) {
                console.error('GitHub API Error:', err);
                setError(err instanceof Error ? err.message : "An error occurred while fetching GitHub data");
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubStats();
    }, []);

    const chartData = {
        labels: stats?.languageBreakdown.map(lang => lang.name) || [],
        datasets: [
            {
                data: stats?.languageBreakdown.map(lang => lang.value) || [],
                backgroundColor: COLORS,
                borderColor: COLORS.map(color => color.replace('0.8', '1')),
                borderWidth: 2,
                hoverOffset: 15,
                borderRadius: 5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 52, 96, 0.95)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                callbacks: {
                    title: () => '',
                    label: function (context: any) {
                        return `${context.label} ${context.raw}%`;
                    }
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl max-w-2xl text-center p-4">
                    <p className="mb-4">Error: {error}</p>
                    <p className="text-sm text-gray-400">
                        Please check your GitHub token and make sure it has the necessary permissions.
                        Required permissions: repo, read:user
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section id="statistics" className="min-h-screen py-20 bg-[#23234a] relative">
            <img
                src={layeredWavesHero}
                alt="layered waves background"
                className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-0 opacity-20"
                style={{ objectFit: 'cover', filter: 'blur(8px)', mixBlendMode: 'lighten' }}
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Statistics & Highlights</h2>
                    <p className="text-gray-400">A glimpse into my coding journey and achievements</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-[#23234a]/80 p-6 rounded-lg shadow-lg border border-[#5A5EE6]/30"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <FaCode className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">
                            <CountUp end={stats?.totalLinesOfCode || 0} duration={2.5} separator="," />
                        </h3>
                        <p className="text-gray-400 text-center">Lines of Code</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[#23234a]/80 p-6 rounded-lg shadow-lg border border-[#5A5EE6]/30"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <FaProjectDiagram className="text-4xl text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">
                            <CountUp end={stats?.totalProjects || 0} duration={2.5} />
                        </h3>
                        <p className="text-gray-400 text-center">Total Projects</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#23234a]/80 p-6 rounded-lg shadow-lg border border-[#5A5EE6]/30"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <FaDatabase className="text-4xl text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">5+</h3>
                        <p className="text-gray-400 text-center">Databases Mastered</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[#23234a]/80 p-6 rounded-lg shadow-lg border border-[#5A5EE6]/30"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <FaServer className="text-4xl text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">10+</h3>
                        <p className="text-gray-400 text-center">APIs Developed</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-[#23234a]/80 p-8 rounded-lg shadow-lg border border-[#5A5EE6]/30"
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-8">Language Distribution</h3>
                    <div className="h-[400px] relative">
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {stats?.languageBreakdown.map((entry, index) => (
                                <motion.div
                                    key={entry.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f3460]/80 border border-[#5A5EE6]/30 hover:bg-[#0f3460] transition-all duration-300 cursor-pointer group"
                                >
                                    <div
                                        className="w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
                                        {entry.name}
                                    </span>
                                    <span className="text-sm font-bold text-purple-400">
                                        {entry.value}%
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Statistics; 