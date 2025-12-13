export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 max-w-xl mx-auto w-full min-h-[calc(100vh-64px)]">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-500 mb-10 text-center">We'd love to hear from you. Send us a message below.</p>

            <div className="bg-white w-full p-8 rounded-2xl border border-gray-100 shadow-xl">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition h-32 resize-none" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
