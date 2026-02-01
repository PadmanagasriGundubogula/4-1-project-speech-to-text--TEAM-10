import { motion } from 'framer-motion';
import { Mic, Cpu, Zap, Lock, Globe, FileText, Share2, Layers, Search, BarChart, Headphones, Key, ShieldCheck } from 'lucide-react';

export default function Features() {
    const features = [
        {
            category: "Core Intelligence",
            items: [
                { title: "Smart Transcription", desc: "Convert audio to text with 99% accuracy using advanced neural networks.", icon: <Mic /> },
                { title: "Contextual Summary", desc: "AI automatically condenses hour-long meetings into 5-minute actionable summaries.", icon: <FileText /> },
                { title: "Speaker Diarization", desc: "Automatically distinguish between different speakers in a conversation.", icon: <Layers /> }
            ]
        },
        {
            category: "Workflow & Speed",
            items: [
                { title: "Instant Search", desc: "Find the exact moment a topic was discussed with deep semantic search.", icon: <Search /> },
                { title: "Multi-Format Export", desc: "Export to PDF, DOCX, Notion, or plain text with one click.", icon: <Share2 /> },
                { title: "Real-time Processing", desc: "See your transcript appear live as you record or upload.", icon: <Zap /> }
            ]
        },
        {
            category: "Enterprise Security",
            items: [
                { title: "Bank-Grade Encryption", desc: "AES-256 encryption at rest and TLS 1.3 in transit.", icon: <Lock /> },
                { title: "Local Processing Option", desc: "For sensitive data, run processing without data leaving your zone.", icon: <Cpu /> },
                { title: "Global Language Support", desc: "Support for 50+ languages and regional dialects.", icon: <Globe /> }
            ]
        },
        {
            category: "Advanced Analytics",
            items: [
                { title: "Sentiment Analysis", desc: "Detect the emotional tone of the conversation over time.", icon: <BarChart /> },
                { title: "Keyword Extraction", desc: "Automatically identify main topics and recurring themes.", icon: <Key /> },
                { title: "Audio Enhancement", desc: "Remove background noise and enhance voice clarity automatically.", icon: <Headphones /> }
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">

            {/* --- MOVING ANIMATION BACKGROUND (Light Aurora Effect) --- */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_50%)] animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.05),transparent_50%)] animate-[spin_45s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm mb-6 border border-purple-100 backdrop-blur-md"
                    >
                        Vocalize AI Features
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight"
                    >
                        Powering the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Voice Intelligence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 leading-relaxed font-sans"
                    >
                        Explore the full technical specifications and capabilities of our neural audio engine.
                    </motion.p>
                </div>

                {/* Feature Grid */}
                <div className="space-y-24">
                    {features.map((section, idx) => (
                        <div key={idx}>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="text-2xl font-bold text-gray-900 mb-10 pl-6 border-l-4 border-purple-500 font-display"
                            >
                                {section.category}
                            </motion.h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {section.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        className="glass-card p-8 hover:bg-white/90 hover:border-purple-200 transition-all duration-300 group hover:-translate-y-1"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm font-sans">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
