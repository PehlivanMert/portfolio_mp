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

// Katkı seviyeleri için type tanımı
type ContributionLevel = 'NONE' | 'LOW' | 'MEDIUM_LOW' | 'MEDIUM_HIGH' | 'HIGH';

interface GitHubStats {
    totalProjects: number;
    totalLinesOfCode: number;
    languageBreakdown: {
        name: string;
        value: number;
    }[];
    contributions: {
        total: number;
        data: {
            date: string;
            count: number;
            level: ContributionLevel;
        }[];
    };
}

// GitHub katkı seviyelerine göre renkler
const CONTRIBUTION_COLORS: Record<ContributionLevel, string> = {
    NONE: '#161b22',
    LOW: '#0e4429',
    MEDIUM_LOW: '#006d32',
    MEDIUM_HIGH: '#26a641',
    HIGH: '#39d353'
};

// Haftanın günleri - Sunday'den başlayacak şekilde
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Aylar
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Contribution {
    date: string;
    count: number;
    level: ContributionLevel;
}

interface GitHubContributionResponse {
    total: number;
    year: number;
    contributions: {
        date: string;
        count: number;
    }[];
}

const Statistics = () => {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [allContributions, setAllContributions] = useState<GitHubContributionResponse | null>(null);

    // Tüm katkıları bir kere al ve sakla
    useEffect(() => {
        const fetchAllContributions = async () => {
            try {
                const contributionResponse = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'portfolio-mp'
                        }
                    }
                );

                if (!contributionResponse.ok) {
                    throw new Error(`Failed to fetch contributions: ${await contributionResponse.text()}`);
                }

                const data = await contributionResponse.json();
                setAllContributions(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An error occurred while fetching contributions");
            }
        };

        fetchAllContributions();
    }, []);

    // Seçilen yıla göre katkıları filtrele
    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                if (!token) {
                    throw new Error("GitHub token not found in environment variables");
                }

                // Kullanıcı bilgilerini al
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'portfolio-mp'
                    }
                });

                if (!userResponse.ok) {
                    throw new Error(`GitHub API Error: ${await userResponse.text()}`);
                }

                // Repoları al
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'portfolio-mp'
                    }
                });

                if (!reposResponse.ok) {
                    throw new Error(`GitHub API Error: ${await reposResponse.text()}`);
                }

                const repos = await reposResponse.json();
                const languageStats = new Map<string, number>();

                // Her repo için dil bilgilerini al
                for (const repo of repos) {
                    if (repo.fork) continue;

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

                // Seçilen yıl için katkıları filtrele
                if (allContributions) {
                    const yearContributions = allContributions.contributions.filter(contribution => {
                        const contributionDate = new Date(contribution.date);
                        return contributionDate.getFullYear() === selectedYear;
                    });

                    // Tüm günleri oluştur ve katkıları eşleştir
                    const allDays = new Map<string, { count: number; level: ContributionLevel }>();
                    const startDate = new Date(selectedYear, 0, 1);
                    const endDate = new Date(selectedYear, 11, 31);

                    // Önce tüm günleri oluştur
                    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0];
                        allDays.set(dateStr, { count: 0, level: 'NONE' });
                    }

                    // Sonra katkıları ekle
                    yearContributions.forEach(contribution => {
                        allDays.set(contribution.date, {
                            count: contribution.count,
                            level: (contribution.count === 0 ? 'NONE' :
                                contribution.count <= 3 ? 'LOW' :
                                    contribution.count <= 6 ? 'MEDIUM_LOW' :
                                        contribution.count <= 9 ? 'MEDIUM_HIGH' : 'HIGH') as ContributionLevel
                        });
                    });

                    // Map'i array'e çevir ve sırala
                    const sortedContributions = Array.from(allDays.entries())
                        .map(([date, data]) => ({
                            date,
                            count: data.count,
                            level: data.level
                        }))
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    setStats({
                        totalProjects: repos.filter((repo: any) => !repo.fork).length,
                        totalLinesOfCode,
                        languageBreakdown,
                        contributions: {
                            total: sortedContributions.reduce((sum, c) => sum + c.count, 0),
                            data: sortedContributions
                        }
                    });
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred while fetching GitHub data");
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubStats();
    }, [selectedYear, allContributions]);

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
                    className="bg-[#23234a]/80 p-8 rounded-lg shadow-lg border border-[#5A5EE6]/30 mb-16"
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-gradient-to-br from-[#23234a] to-[#1a1a3a] p-8 rounded-2xl shadow-2xl border border-[#5A5EE6]/30 mt-32"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Contribution Graph
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                {stats?.contributions.total} contributions in {selectedYear}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedYear(selectedYear - 1)}
                                disabled={selectedYear <= 2020}
                                className={`p-2 rounded-full transition-all duration-300 ${selectedYear <= 2020
                                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="text-xl font-bold text-white bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-2 rounded-full border border-blue-500/20 shadow-lg">
                                {selectedYear}
                            </span>
                            <button
                                onClick={() => setSelectedYear(selectedYear + 1)}
                                disabled={selectedYear >= new Date().getFullYear()}
                                className={`p-2 rounded-full transition-all duration-300 ${selectedYear >= new Date().getFullYear()
                                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Katkı grafiği */}
                    <div className="w-full">
                        <div className="grid grid-cols-[auto_1fr] gap-6">
                            {/* Gün isimleri - Dikey */}
                            <div className="grid grid-rows-7 gap-2 pt-8">
                                {DAYS_OF_WEEK.map(day => (
                                    <div key={day} className="text-xs text-gray-400 h-3 font-medium flex items-center justify-end pr-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Ana içerik alanı */}
                            <div className="w-full">
                                {/* Aylar - Yatay */}
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-2 mb-3">
                                    {MONTHS.map((month, index) => {
                                        const startDate = new Date(selectedYear, index, 1);
                                        const startOfYear = new Date(selectedYear, 0, 1);
                                        const diffTime = Math.abs(startDate.getTime() - startOfYear.getTime());
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        const firstWeekOfMonth = Math.floor(diffDays / 7);

                                        return (
                                            <div
                                                key={month}
                                                className="text-xs text-gray-400 text-center font-medium"
                                                style={{
                                                    gridColumn: `${firstWeekOfMonth + 1} / span 4`
                                                }}
                                            >
                                                {month}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Katkı kutuları - Grid */}
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-2">
                                    {(() => {
                                        const days: { date: Date; contribution?: Contribution }[] = [];

                                        // Yılın başlangıç tarihi
                                        const startDate = new Date(selectedYear, 0, 1);
                                        // Yılın bitiş tarihi
                                        const endDate = new Date(selectedYear, 11, 31);

                                        // İlk günün haftanın hangi günü olduğunu bul (1 = Monday)
                                        const firstDayOfWeek = startDate.getDay() || 7; // 0 (Sunday) ise 7 yap
                                        const adjustedFirstDay = firstDayOfWeek - 1; // Monday'den başlamak için

                                        // İlk haftanın başına kadar boş günler ekle
                                        for (let i = 0; i < adjustedFirstDay; i++) {
                                            const emptyDate = new Date(startDate);
                                            emptyDate.setDate(emptyDate.getDate() - (adjustedFirstDay - i));
                                            days.push({ date: emptyDate });
                                        }

                                        // Yılın tüm günlerini ekle
                                        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                                            const dateStr = d.toISOString().split('T')[0];
                                            const contribution = stats?.contributions.data.find(c => c.date === dateStr);
                                            days.push({
                                                date: new Date(d),
                                                contribution: contribution ? {
                                                    date: contribution.date,
                                                    count: contribution.count,
                                                    level: contribution.level
                                                } : undefined
                                            });
                                        }

                                        // Son haftayı tamamla
                                        const lastDayOfWeek = endDate.getDay() || 7; // 0 (Sunday) ise 7 yap
                                        const remainingDays = 7 - lastDayOfWeek;
                                        if (remainingDays > 0) {
                                            for (let i = 0; i < remainingDays; i++) {
                                                const emptyDate = new Date(endDate);
                                                emptyDate.setDate(emptyDate.getDate() + (i + 1));
                                                days.push({ date: emptyDate });
                                            }
                                        }

                                        // Günleri haftalara böl
                                        const weeks = [];
                                        for (let i = 0; i < days.length; i += 7) {
                                            weeks.push(days.slice(i, i + 7));
                                        }

                                        return weeks.map((week, weekIndex) => (
                                            <div key={weekIndex} className="grid grid-rows-7 gap-2">
                                                {week.map((day, dayIndex) => {
                                                    // Tarihi düzelt (UTC offset'i düzeltmek için)
                                                    const localDate = new Date(day.date);
                                                    localDate.setHours(12, 0, 0, 0); // Saati 12:00:00 yap

                                                    return (
                                                        <div
                                                            key={`${weekIndex}-${dayIndex}`}
                                                            className="relative group h-3 flex items-center justify-center"
                                                        >
                                                            <div
                                                                className="w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer"
                                                                style={{
                                                                    backgroundColor: day.contribution
                                                                        ? CONTRIBUTION_COLORS[day.contribution.level]
                                                                        : CONTRIBUTION_COLORS.NONE
                                                                }}
                                                            />
                                                            {day.contribution && day.contribution.count > 0 && (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                        {day.contribution.count}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 shadow-lg border border-gray-700/50 backdrop-blur-sm pointer-events-none">
                                                                <div className="font-medium mb-1">
                                                                    {day.contribution
                                                                        ? new Date(day.contribution.date).toLocaleDateString('en-US', {
                                                                            weekday: 'long',
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })
                                                                        : localDate.toLocaleDateString('en-US', {
                                                                            weekday: 'long',
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })}
                                                                </div>
                                                                <div className="text-blue-400">
                                                                    {day.contribution
                                                                        ? `${day.contribution.count} contribution${day.contribution.count !== 1 ? 's' : ''}`
                                                                        : 'No contributions'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Katkı seviyeleri açıklaması */}
                    <div className="flex justify-end items-center gap-2 mt-6">
                        <span className="text-xs text-gray-400 font-medium">Less</span>
                        {Object.entries(CONTRIBUTION_COLORS).map(([level, color], index) => (
                            <div key={level} className="flex items-center gap-1">
                                <div
                                    className="w-3 h-3 rounded-sm transition-transform duration-300 hover:scale-110"
                                    style={{ backgroundColor: color }}
                                />
                                {index < Object.keys(CONTRIBUTION_COLORS).length - 1 && (
                                    <span className="text-gray-600">•</span>
                                )}
                            </div>
                        ))}
                        <span className="text-xs text-gray-400 font-medium">More</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Statistics; 