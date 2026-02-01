import { motion } from 'framer-motion';
import { Settings, ShieldAlert, Cpu, Server, HardDrive, RefreshCcw } from 'lucide-react';

export default function Admin() {
    const healthMetrics = [
        { label: 'CPU Usage', value: '14%', icon: <Cpu />, color: 'text-purple-600', level: 14 },
        { label: 'Memory', value: '2.4GB / 8GB', icon: <Server />, color: 'text-pink-600', level: 30 },
        { label: 'Storage', value: '1.2TB / 4TB', icon: <HardDrive />, color: 'text-blue-600', level: 25 },
    ];

    return (
        <div className="pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-4 border border-red-100"
                        >
                            Restricted Access
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2"
                        >
                            Admin <span className="text-gradient">Control</span>
                        </motion.h1>
                        <p className="text-gray-500 font-sans text-lg">System-wide monitoring and infrastructure management.</p>
                    </div>
                    <button className="btn-secondary !bg-purple-600 !text-white !border-none hover:!bg-purple-700 transition-all flex items-center gap-2">
                        <RefreshCcw size={18} /> Restart Backend
                    </button>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {healthMetrics.map((m, i) => (
                        <div key={i} className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-gray-50 ${m.color}`}>
                                    {m.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 font-display">{m.label}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-sans font-bold">
                                    <span className="text-gray-400">Total Usage</span>
                                    <span className="text-gray-900">{m.value}</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.level}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                                    ></motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <ShieldAlert size={20} className="text-red-600" /> Recent Security Alerts
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/50 border border-gray-100 flex items-center gap-4 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                    <span className="font-sans text-gray-500">Failed login attempt detected from 192.168.1.{i + 10}</span>
                                    <span className="ml-auto text-xs font-bold text-gray-400 uppercase">2m ago</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Settings size={20} className="text-purple-600" /> Global Settings
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                <span className="font-bold text-gray-800 text-sm">Maintenance Mode</span>
                                <div className="w-12 h-6 bg-gray-200 rounded-full cursor-pointer"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                <span className="font-bold text-gray-800 text-sm">Allow Public Registrations</span>
                                <div className="w-12 h-6 bg-purple-600 rounded-full cursor-pointer relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
