import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, UserPlus, Fingerprint, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-100"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 mb-6 shadow-sm border border-purple-100">
                            <ShieldCheck className="text-purple-600 w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500 font-sans">Join Vocalize.ai for advanced audio analysis</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 p-3 mb-6 flex items-center gap-3 text-sm rounded-lg"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="glass-input"
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full mt-2 py-4 group"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Fingerprint size={20} className="group-hover:rotate-12 transition-transform" /> Sign Up Free
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm font-sans">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
