import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Updated Links: Features is a separate ROUTE, others are SECTIONS on Home
    const navLinks = [
        { name: 'Home', path: '/#home', type: 'hash' },
        { name: 'Features', path: '/features', type: 'route' },
        { name: 'About', path: '/#about', type: 'hash' },
        { name: 'Contact', path: '/#contact', type: 'hash' },
    ];

    const handleNavigation = (link) => {
        setMobileMenuOpen(false);
        if (link.type === 'hash') {
            // Check if we are already on home
            if (location.pathname !== '/' && !location.pathname.startsWith('/#')) {
                navigate('/');
                // Allow navigation to complete then scroll
                setTimeout(() => {
                    const element = document.querySelector(link.path.replace('/', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.querySelector(link.path.replace('/', ''));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(link.path);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-100/50">
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="container mx-auto flex items-center justify-between py-4"
            >
                {/* Logo - Text & Icon */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-300 shadow-sm">
                        <Sparkles size={16} fill="white" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-gray-900 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                        Vocalize
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100/50">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link)}
                            className={`text-sm font-bold font-sans transition-all duration-300 hover:text-purple-600 relative ${location.pathname === link.path ? 'text-purple-600' : 'text-gray-500'}`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Auth / Mobile Toggle */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/upload" className="hidden md:flex btn-primary !px-5 !py-2 !text-sm !rounded-xl">
                                Open Studio
                            </Link>
                            <button onClick={logout} className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider">Sign Out</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors">Log In</Link>
                            <Link to="/register" className="hidden md:flex btn-primary !px-5 !py-2 !text-sm !rounded-xl">
                                Get Started
                            </Link>
                        </div>
                    )}

                    <button className="md:hidden text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 flex flex-col gap-4 z-40 md:hidden shadow-lg"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link)}
                                className="text-lg font-display font-bold text-gray-800 py-3 border-b border-gray-50 text-left hover:text-purple-600 transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                        <Link to="/upload" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full py-4 text-center mt-2 shadow-lg">
                            Launch Studio
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}