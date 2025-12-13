export default function About() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 tracking-tight">
                About SpeechPro
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto">
                Transforming the way you interact with audio.
                Whether you're transcribing meetings, lectures, or personal notes,
                SpeechPro provides accurate, secure, and fast results powered by advanced speech recognition technology.
            </p>
            <div className="grid md:grid-cols-2 gap-8 w-full text-left">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Transcription</h3>
                    <p className="text-gray-500 leading-relaxed">Get your audio converted to text in seconds using our optimized processing engine.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">History Tracking</h3>
                    <p className="text-gray-500 leading-relaxed">Access your past transcriptions anytime, anywhere. Securely stored for your convenience.</p>
                </div>
            </div>
        </div>
    );
}
