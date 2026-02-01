import { motion } from 'framer-motion';
import { Database, Server, Shield, Code, Cpu, Wifi } from 'lucide-react';

export default function DataSheet() {
    const specs = [
        { label: "Audio Sampling Rate", value: "16kHz / 44.1kHz / 48kHz" },
        { label: "Supported Input Formats", value: "WAV, MP3, FLAC, OGG, WEBM, M4A" },
        { label: "Transcription Accuracy", value: "99.2% (English), 95%+ (Global Languages)" },
        { label: "Latency (Real-time)", value: "< 200ms per chunk" },
        { label: "Encryption Standard", value: "AES-256 (At Rest), TLS 1.3 (In Transit)" },
        { label: "Max File Size", value: "500MB per upload" },
        { label: "Speaker Detection", value: "Up to 10 unique speakers per session" },
        { label: "API Rate Limit", value: "1000 requests/min (Enterprise Tier)" },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            {/* --- MOVING ANIMATION BACKGROUND (Light Aurora Effect) --- */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_50%)] animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.05),transparent_50%)] animate-[spin_45s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm mb-6 border border-purple-100 backdrop-blur-md"
                    >
                        Technical Specifications
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight"
                    >
                        Vocalize <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Data Sheet</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="glass-card overflow-hidden shadow-2xl"
                >
                    <div className="p-8 border-b border-gray-100 flex items-center gap-4 bg-white/50">
                        <Database className="text-purple-600" size={32} />
                        <div>
                            <h2 className="text-xl font-bold font-display text-gray-900">System Architecture v2.0</h2>
                            <p className="text-gray-500 text-sm">Last updated: Dec 20, 2025</p>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {specs.map((spec, i) => (
                            <div key={i} className="grid md:grid-cols-2 p-6 hover:bg-purple-50/50 transition-colors">
                                <span className="font-bold text-gray-700 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                    {spec.label}
                                </span>
                                <span className="font-mono text-purple-600 md:text-right mt-2 md:mt-0 font-semibold">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gray-50/50 text-center border-t border-gray-100">
                        <p className="text-gray-500 text-sm mb-4 font-sans">Want full API documentation?</p>
                        <button className="text-purple-600 font-bold border-b-2 border-purple-500 hover:text-purple-700 transition-colors">Download Full PDF Report</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
