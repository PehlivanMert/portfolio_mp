import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import GitHubCalendar from "react-github-calendar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { FaCode, FaProjectDiagram, FaDatabase, FaServer } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
                        name,
                        value: Math.round((value / totalLinesOfCode) * 100),
                    }))
                    .sort((a, b) => b.value - a.value); // En çok kullanılan dilleri başa al

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
        <section id="statistics" className="min-h-screen py-20 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
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
                        className="bg-[#0f3460] p-6 rounded-lg shadow-lg"
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
                        className="bg-[#0f3460] p-6 rounded-lg shadow-lg"
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
                        className="bg-[#0f3460] p-6 rounded-lg shadow-lg"
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
                        className="bg-[#0f3460] p-6 rounded-lg shadow-lg"
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
                    className="bg-[#0f3460] p-8 rounded-lg shadow-lg"
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-8">Language Distribution</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.languageBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => {
                                        if (percent < 0.05) return ''; // %5'ten küçük değerleri gösterme
                                        return `${name} ${(percent * 100).toFixed(0)}%`;
                                    }}
                                >
                                    {stats?.languageBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                                    contentStyle={{
                                        backgroundColor: 'rgba(15, 52, 96, 0.9)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {stats?.languageBreakdown.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f3460] border border-[#5A5EE6]/30">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-sm text-white">{entry.name} ({entry.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Statistics; 