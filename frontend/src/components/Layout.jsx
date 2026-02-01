import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout() {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 relative overflow-hidden bg-white">
            {/* Ambient Background Blobs - Softer for Light Theme */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse-slow"></div>
                <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-pink-100/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-pulse-slow delay-1000"></div>
                <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-50/40 rounded-full mix-blend-multiply filter blur-[150px] opacity-60 animate-pulse-slow delay-2000"></div>
            </div>

            <Navbar />

            <main className="flex-1 flex flex-col relative z-10 w-full overflow-x-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex-1 flex flex-col"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
