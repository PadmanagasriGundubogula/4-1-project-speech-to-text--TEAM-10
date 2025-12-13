import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mic, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-blue-600 transition">
                        <Mic className="text-blue-600" />
                        SpeechPro
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <Link to="/" className="hover:text-gray-900 transition">Home</Link>
                        <Link to="/dashboard" className="hover:text-gray-900 transition">Upload Audio</Link>
                        <Link to="/about" className="hover:text-gray-900 transition">About</Link>
                        <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-gray-700 text-sm">
                                    <User size={16} />
                                    <span>{user.username}</span>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                                Log In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
