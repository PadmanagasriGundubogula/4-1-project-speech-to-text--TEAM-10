import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const navigate = useNavigate();

    // Updated navigation links with consistent types
    const navLinks = [
        { name: 'Home', path: '/', type: 'route' },
        { name: 'Features', path: '/features', type: 'route' },
        { name: 'About', path: '/#about', type: 'hash' },
        { name: 'Contact', path: '/#contact', type: 'hash' },
    ];

    const handleNavigation = (link) => {
        if (link.type === 'hash') {
            // For hash links (About, Contact)
            if (window.location.pathname !== '/') {
                // If not on home page, navigate to home first
                navigate('/');
                // Wait for navigation, then scroll
                setTimeout(() => {
                    const element = document.querySelector(link.path.replace('/', ''));
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // If already on home page, just scroll
                const element = document.querySelector(link.path.replace('/', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            // For route links (Home, Features)
            if (link.path === '/' && window.location.pathname === '/') {
                // If clicking Home while already on home page, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Otherwise navigate to the route
                navigate(link.path);
            }
        }
    };

    return (
        <footer className="border-t border-gray-100 bg-white/60 backdrop-blur-md pt-16 pb-8 relative overflow-hidden">
            {/* Soft Background Gradient Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 shadow-md transform group-hover:rotate-12 transition-transform duration-300">
                                <Sparkles className="h-4 w-4 text-white" fill="white" />
                            </div>
                            <span className="font-display font-bold text-2xl text-gray-900 tracking-tight">
                                Vocalize<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">.ai</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed mb-6 max-w-sm font-sans">
                            Empowering the world with advanced audio intelligence.
                            Secure, fast, and accurate transcription for everyone.
                        </p>
                        
                        {/* Email Section */}
                        <div className="flex items-center gap-3 mb-8 text-gray-500">
                            <Mail size={18} />
                            <a href="mailto:admin@gmail.com" className="hover:text-purple-600 transition-colors font-medium">
                                admin@gmail.com
                            </a>
                        </div>
                        
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold font-display text-gray-900 mb-6">Navigation</h4>
                        <ul className="space-y-3 font-sans">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleNavigation(link)}
                                        className="text-gray-500 hover:text-purple-600 transition-colors cursor-pointer text-left"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold font-display text-gray-900 mb-6">Contact</h4>
                        <div className="space-y-4 font-sans">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="text-gray-400 mt-0.5" />
                                <a href="mailto:admin@gmail.com" className="text-gray-500 hover:text-purple-600 transition-colors">
                                    admin@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400 font-sans">
                    <p>© 2025 Vocalize Intelligence. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}