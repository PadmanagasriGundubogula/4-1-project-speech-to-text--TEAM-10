import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 font-bold text-sm mb-4 border border-pink-100"
                    >
                        Account Settings
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2"
                    >
                        Your <span className="text-gradient">Profile</span>
                    </motion.h1>
                    <p className="text-gray-500 font-sans text-lg">Manage your personal information and preferences.</p>
                </header>

                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 border-r border-gray-100 hidden md:block space-y-2">
                        {['Basic Info', 'Security', 'Notifications', 'Billing'].map((tab, i) => (
                            <button key={i} className={`w-full text-left px-4 py-3 rounded-xl font-bold font-display transition-all ${i === 0 ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="md:col-span-3 space-y-8">
                        <motion.section
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <User size={20} className="text-purple-600" /> Basic Information
                            </h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Username</label>
                                        <div className="glass-input bg-gray-50/50 flex items-center">{user?.username || 'Guest'}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Full Name</label>
                                        <input type="text" className="glass-input" placeholder="Jane Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Email Address</label>
                                    <div className="glass-input bg-gray-50/50 flex items-center">{user?.email || 'user@example.com'}</div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Shield size={20} className="text-pink-600" /> Password & Security
                            </h3>
                            <div className="space-y-6">
                                <button className="btn-secondary !w-auto">Change Password</button>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm">Two-Factor Authentication</h4>
                                        <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <div className="flex justify-end pt-4">
                            <button className="btn-primary">
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
