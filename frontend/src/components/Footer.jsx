export default function Footer() {
    return (
        <footer className="bg-secondary border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
                <p>&copy; {new Date().getFullYear()} SpeechPro. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
