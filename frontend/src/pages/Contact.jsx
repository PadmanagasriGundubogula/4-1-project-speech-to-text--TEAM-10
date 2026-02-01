import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, HelpCircle, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', topic: 'General Inquiry', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Trigger Confetti Celebration (Free Entry Visual)
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#9333ea', '#db2777', '#2563eb']
        });
    };

    return (
        <div className="min-h-screen pt-28 pb-12 px-6 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-100"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm mb-6 border border-purple-100"
                    >
                        Get in Touch
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight"
                    >
                        We'd love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">hear from you.</span>
                    </motion.h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-sans leading-relaxed">
                        Whether you have a question about features, pricing, or need a demo, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-purple-600">
                                    <MessageSquare size={24} />
                                </div>
                                Chat with us
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="glass-card p-6 border-white/40 hover:border-purple-200 transition-all duration-300 cursor-pointer group bg-white/60">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-sm mb-4">
                                        <Mail size={20} />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email Support</h4>
                                    <p className="text-sm text-gray-500 mb-4 font-sans">Typical reply: 2 hours</p>
                                    <p className="text-purple-600 font-bold font-sans">support@vocalize.ai</p>
                                </div>

                                <div className="glass-card p-6 border-white/40 hover:border-pink-200 transition-all duration-300 cursor-pointer group bg-white/60">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-sm mb-4">
                                        <Phone size={20} />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">Phone Support</h4>
                                    <p className="text-sm text-gray-500 mb-4 font-sans">Mon-Fri: 8am - 5pm</p>
                                    <p className="text-pink-600 font-bold font-sans">+1 (888) SPEECH-AI</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-purple-600">
                                    <HelpCircle size={24} />
                                </div>
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { q: "What file formats do you support?", a: "We support MP3, WAV, M4A, OGG, and FLAC audio files up to 500MB. Video transcription (MP4) is also available." },
                                    { q: "Is my data secure?", a: "Yes. All uploads are encrypted with AES-256 at rest and TLS 1.3 in transit. We value your privacy and data sovereignty." }
                                ].map((faq, i) => (
                                    <details key={i} className="group glass-card border-white/40 open:bg-white open:shadow-xl transition-all duration-500 overflow-hidden">
                                        <summary className="flex justify-between items-center font-bold font-display cursor-pointer list-none p-6 text-gray-800 hover:text-purple-600 transition-colors">
                                            <span>{faq.q}</span>
                                            <span className="transition-transform duration-300 group-open:rotate-180 text-purple-400">
                                                <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <p className="text-gray-500 px-6 pb-6 leading-relaxed text-sm font-sans animate-in fade-in slide-in-from-top-2 duration-300">
                                            {faq.a}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                        className="glass-card p-8 md:p-12 relative overflow-hidden flex flex-col justify-center border-white/60 shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>

                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative z-10 text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-sm animate-bounce-slow">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Message Sent!</h2>
                                    <p className="text-gray-500 font-sans text-lg">Thank you for reaching out. Our team will get back to you within 2 hours.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-10 btn-secondary mx-auto"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">First Name</label>
                                            <input required type="text" className="glass-input" placeholder="Jane" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Last Name</label>
                                            <input required type="text" className="glass-input" placeholder="Smith" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Email Address</label>
                                        <input required type="email" className="glass-input" placeholder="jane@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Message Topic</label>
                                        <div className="relative">
                                            <select className="glass-input appearance-none cursor-pointer pr-10" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })}>
                                                <option>General Inquiry</option>
                                                <option>Technical Support</option>
                                                <option>Billing & Enterprise</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Message</label>
                                        <textarea required className="glass-input min-h-[150px] resize-none" placeholder="Tell us how we can help..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                                    </div>

                                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full group py-4">
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
