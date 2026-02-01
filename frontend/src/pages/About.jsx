import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Award, Globe, Heart } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-[calc(100vh-64px)] py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-purple-600 bg-purple-100 rounded-full"
                    >
                        Our Story
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight"
                    >
                        Transforming Audio into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Intelligence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 leading-relaxed"
                    >
                        We're on a mission to make speech accessible, searchable, and actionable for everyone. Using state-of-the-art AI, we deliver precision you can trust.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: <Zap size={24} />,
                            title: "Lightning Fast",
                            desc: "Real-time processing capabilities that keep up with your conversation.",
                            color: "text-amber-500",
                            bg: "bg-amber-100"
                        },
                        {
                            icon: <Shield size={24} />,
                            title: "Bank-Grade Security",
                            desc: "Your data is encrypted end-to-end. We value privacy above all else.",
                            color: "text-emerald-500",
                            bg: "bg-emerald-100"
                        },
                        {
                            icon: <Cpu size={24} />,
                            title: "99% Accuracy",
                            desc: "Powered by advanced neural networks that understand context and nuance.",
                            color: "text-blue-500",
                            bg: "bg-blue-100"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="glass-card p-8 rounded-3xl border border-white/60 bg-white/50 hover:bg-white/80 transition-all shadow-lg group hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Team/Stat Section */}
                <div className="glass-card rounded-[2.5rem] p-12 relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Designed for Global Impact</h2>
                            <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                                Join thousands of researchers, journalists, and developers who rely on SpeechPro daily. We're building the future of communication analysis.
                            </p>
                            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                Join Our Team
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <div className="text-4xl font-bold mb-1">10M+</div>
                                <div className="text-purple-200 text-sm">Minutes Processed</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <div className="text-4xl font-bold mb-1">50k+</div>
                                <div className="text-purple-200 text-sm">Happy Users</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <div className="text-4xl font-bold mb-1">99.9%</div>
                                <div className="text-purple-200 text-sm">Uptime</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <div className="text-4xl font-bold mb-1">24/7</div>
                                <div className="text-purple-200 text-sm">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
