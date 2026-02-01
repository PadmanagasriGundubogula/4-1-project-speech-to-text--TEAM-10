import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Fingerprint, ScanEye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(formData.username, formData.password);
            navigate('/upload');
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-100"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 mb-6 shadow-sm border border-purple-100">
                            <ScanEye className="text-purple-600 w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500 font-sans">Sign in to access your analysis console</p>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="glass-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-widest font-display">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="glass-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full group py-4"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Verifying...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm font-sans">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link to="/register" className="text-purple-600 hover:text-purple-700 font-bold hover:underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
