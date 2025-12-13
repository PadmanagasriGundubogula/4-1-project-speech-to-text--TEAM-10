import { Link } from 'react-router-dom';
import { Mic, FileAudio, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-60"></div>
            <h1 className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                Speech to Text, Instantly.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                Transform your audio files into accurate text transcriptions in seconds.
                Powered by advanced speech recognition technology.
            </p>

            <div className="flex gap-4 mb-16">
                <Link
                    to="/register"
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                    Get Started Free
                </Link>
                <Link
                    to="/login"
                    className="px-8 py-3 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition border border-gray-200"
                >
                    Login
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
                <FeatureCard
                    icon={<Mic className="w-8 h-8 text-blue-500" />}
                    title="High Accuracy"
                    description="Advanced algorithms ensure precise transcription of your audio content."
                />
                <FeatureCard
                    icon={<Zap className="w-8 h-8 text-yellow-500" />}
                    title="Lightning Fast"
                    description="Get your results in seconds, not minutes. Optimized for speed."
                />
                <FeatureCard
                    icon={<FileAudio className="w-8 h-8 text-purple-500" />}
                    title="Multiple Formats"
                    description="Support for various audio formats ensuring flexibility for your needs."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="mb-4 inline-block p-3 bg-gray-50 rounded-xl">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
