import { motion } from 'framer-motion';
import { Activity, Users, Database, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Transcriptions', value: '12,842', icon: <Database />, trend: '+12%', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Active Sessions', value: '42', icon: <Activity />, trend: '+5%', color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'User Growth', value: '1,204', icon: <Users />, trend: '+18%', color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm mb-4 border border-purple-100"
                    >
                        Overview Console
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2"
                    >
                        System <span className="text-gradient">Dashboard</span>
                    </motion.h1>
                    <p className="text-gray-500 font-sans text-lg">Real-time performance metrics and usage statistics.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 group hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300`}>
                                    {stat.icon}
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold font-sans">
                                    <TrendingUp size={14} /> {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1 font-display">{stat.label}</h3>
                            <div className="text-3xl font-display font-bold text-gray-900">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="glass-card p-10 overflow-hidden relative"
                >
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Performance Trend</h3>
                                <p className="text-gray-500 font-sans">Processing efficiency over the last 30 days.</p>
                            </div>
                            <button className="btn-secondary !py-2 !px-4 !text-sm">
                                View Full Report <ArrowUpRight size={16} />
                            </button>
                        </div>

                        {/* Placeholder for a chart */}
                        <div className="h-64 w-full bg-gray-50/50 rounded-3xl border border-gray-100 flex items-center justify-center border-dashed border-2">
                            <span className="text-gray-400 font-medium font-sans italic">Data visualization module ready for integration</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
