import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-primary text-gray-900 font-sans">
            <Navbar />
            <div className="flex-1 flex flex-col">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
