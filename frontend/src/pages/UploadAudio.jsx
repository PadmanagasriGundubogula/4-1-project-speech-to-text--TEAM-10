import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mic, Upload, FileAudio, Square, Trash2, CheckCircle, AlertCircle, Copy, Loader2 } from 'lucide-react';

export default function UploadAudio() {
    const { api } = useAuth();
    const [history, setHistory] = useState([]);
    const [transcription, setTranscription] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [recording, setRecording] = useState(false);
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('info'); // info, success, error
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/history');
            setHistory(res.data);
        } catch (e) {
            console.error("Failed to fetch history");
        }
    };

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await processFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await processFile(e.dataTransfer.files[0]);
        }
    };

    const processFile = async (file) => {
        setStatus("Processing...");
        setStatusType("info");
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/upload', formData);
            setTranscription(res.data.text);
            setQuestions(res.data.questions || []);
            setStatus("Transcription Complete!");
            setStatusType("success");
            fetchHistory();
        } catch (e) {
            setStatus(e.response?.data?.text || e.message);
            setStatusType("error");
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            let chunks = [];

            recorder.ondataavailable = e => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                const file = new File([blob], "recording.wav", { type: "audio/wav" });
                processFile(file);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setRecording(true);
            setStatus("Recording in progress...");
            setStatusType("info");
        } catch (e) {
            setStatus("Microphone access denied or error: " + e.message);
            setStatusType("error");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const copyToClipboard = () => {
        if (transcription) {
            navigator.clipboard.writeText(transcription);
            setStatus("Copied to clipboard!");
            setStatusType("success");
            setTimeout(() => setStatus(""), 2000);
        }
    };

    const deleteHistoryItem = async (id, event) => {
        event.stopPropagation(); // Prevent clicking delete from selecting the item
        try {
            await api.delete(`/history/${id}`);
            fetchHistory(); // Refresh the list
            setStatus("Item deleted");
            setStatusType("success");
            setTimeout(() => setStatus(""), 2000);
        } catch (e) {
            setStatus("Failed to delete");
            setStatusType("error");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
            {/* Sidebar (History) */}
            <aside className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-sm">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold flex items-center gap-2 text-gray-800">
                        <FileAudio className="text-blue-600" size={20} /> History
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-500">{history.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {history.map((item) => (
                        <div key={item.id}
                            className="group p-4 bg-white rounded-xl hover:bg-blue-50 cursor-pointer transition border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md relative"
                        >
                            <div onClick={() => setTranscription(item.text)}>
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-semibold truncate text-gray-800 w-3/4">{item.filename}</p>
                                    <span className="text-[10px] text-gray-400 font-medium">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">{item.text.substring(0, 60)}...</p>
                            </div>
                            <button
                                onClick={(e) => deleteHistoryItem(item.id, e)}
                                className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition bg-red-50 hover:bg-red-100 rounded-lg text-red-500 hover:text-red-600"
                                title="Delete"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    {history.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                            <FileAudio size={32} className="mb-2 opacity-50" />
                            <p className="text-sm">No history yet.</p>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 flex flex-col overflow-y-auto w-full">
                <div className="max-w-5xl mx-auto w-full flex flex-col h-full">

                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transcription Studio</h1>
                            <p className="text-gray-500 mt-1">Upload audio or record voice to generate text instantly.</p>
                        </div>

                        {status && (
                            <div className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 animate-fade-in shadow-sm
                                ${statusType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                                    statusType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                                        'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}>
                                {statusType === 'success' ? <CheckCircle size={16} /> :
                                    statusType === 'error' ? <AlertCircle size={16} /> :
                                        <Loader2 size={16} className="animate-spin" />}
                                {status}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
                        {/* Input Area */}
                        <div className="flex flex-col gap-6">
                            <div
                                className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-200 ease-in-out cursor-pointer relative bg-white
                                    ${dragActive
                                        ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-lg'
                                        : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                                <div className="p-4 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition">
                                    <Upload className={`w-10 h-10 text-blue-600 ${dragActive ? 'animate-bounce' : ''}`} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload Audio File</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Drag & drop or click to browse<br />(MP3, WAV, M4A supported)</p>
                            </div>

                            <div className="flex items-center gap-4 px-2">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">OR RECORD</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>

                            <button
                                onClick={recording ? stopRecording : startRecording}
                                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 ${recording
                                    ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-200'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                                    }`}
                            >
                                {recording
                                    ? <><Square size={24} fill="currentColor" /> Stop Recording</>
                                    : <><Mic size={24} /> Start Recording</>
                                }
                            </button>
                        </div>

                        {/* Output Area */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full max-h-[600px]">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <FileAudio className="text-indigo-500" size={18} /> Transcription Result
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={copyToClipboard}
                                        disabled={!transcription}
                                        className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-blue-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Copy to Clipboard"
                                    >
                                        <Copy size={18} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTranscription(null);
                                            setQuestions([]);
                                        }}
                                        disabled={!transcription}
                                        className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-red-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Clear"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto bg-white">
                                {transcription ? (
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{transcription}</p>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                        <FileAudio size={48} className="mb-4 opacity-20" />
                                        <p>Transcription will appear here...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Questions Section - Full Width Below */}
                    {questions.length > 0 && (
                        <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Relevant Questions
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {questions.map((question, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 hover:border-purple-300 transition group cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </span>
                                            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition">
                                                {question}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
