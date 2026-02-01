import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Mail, Cpu, Globe, Shield, Layers, Zap, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- NEURAL WAVE VISUAL ---
const NeuralWave = () => {
    return (
        <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center gap-2">
                {[...Array(9)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                        className={`w-4 rounded-full bg-gradient-to-t from-cyan-400 via-violet-400 to-fuchsia-400 opacity-90 shadow-[0_0_20px_rgba(139,92,246,0.5)]`}
                        style={{ height: '40%' }}
                    />
                ))}
            </div>
            {/* Glow Background */}
            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
        </div>
    );
};

export default function Home() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleHomeSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#9333ea', '#db2777', '#2563eb']
        });
    };

    return (
        <div className="relative w-full overflow-hidden">

            {/* --- HERO SECTION --- */}
            <section id="home" className="relative pt-48 pb-12 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50 text-purple-600 font-bold font-sans text-xs tracking-widest uppercase mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            AI Audio Engine V13
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-7xl font-display font-bold text-gray-900 leading-[1.1] mb-8"
                        >
                            Voice Intelligence,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Reimagined.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-gray-500 font-sans leading-relaxed max-w-lg mb-10"
                        >
                            The advanced platform that turns your conversations into structured, searchable assets. Secure, fast, and beautifully designed.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/features" className="btn-primary">
                                Explore Features <ArrowRight size={18} />
                            </Link>
                            <Link to="/datasheet" className="btn-secondary">
                                View Data Sheet <Cpu size={18} />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="lg:ml-auto">
                        <NeuralWave />
                    </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-75"></div>
            </section>

            {/* --- ABOUT US SECTION --- */}
            <section id="about" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-[2rem] rotate-3 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                            alt="Team meeting"
                            className="relative rounded-[2rem] shadow-2xl border border-white/60 hover:scale-[1.01] transition-all duration-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl font-display font-bold mb-6 text-gray-900 border-l-4 border-purple-500 pl-6">About Vocalize</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6 font-sans">
                            We are a team of researchers, engineers, and designers obsessed with human communication. Our mission is to make every conversation valuable, searchable, and actionable.
                        </p>
                        <ul className="space-y-4 font-sans">
                            {[
                                "Founded by AI researchers from Stanford.",
                                "Trusted by 10,000+ teams worldwide.",
                                "Privacy-first architecture by design."
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle size={20} className="text-emerald-500" /> {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-24 bg-gray-50/50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">Get in Touch</h2>
                    <p className="text-gray-500 mb-12">Have a question? We'd love to hear from you.</p>

                    <div className="glass-card p-8 md:p-12 text-left relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Message Received!</h3>
                                    <p className="text-gray-500 font-sans">We've received your request and will follow up shortly.</p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-8 text-purple-600 font-bold text-sm hover:underline font-sans cursor-pointer">Send another one</button>
                                </motion.div>
                            ) : (
                                <form key="form" onSubmit={handleHomeSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 font-display">Name</label>
                                            <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 font-display">Email</label>
                                            <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 font-display">Message</label>
                                        <textarea required className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none h-32 resize-none" placeholder="How can we help?"></textarea>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                                        {isSubmitting ? "Sending..." : <>Send Message <Send size={18} /></>}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

        </div>
    );
}
