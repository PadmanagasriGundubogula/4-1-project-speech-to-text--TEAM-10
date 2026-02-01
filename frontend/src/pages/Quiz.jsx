import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

export default function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions = [] } = location.state || {};

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (questions.length === 0) {
            navigate('/upload');
        }
    }, [questions, navigate]);

    const handleOptionSelect = (optionIndex) => {
        if (showResults) return;
        const newSelected = [...selectedOptions];
        newSelected[currentStep] = optionIndex;
        setSelectedOptions(newSelected);
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateScore();
        }
    };

    const calculateScore = () => {
        let total = 0;
        questions.forEach((q, i) => {
            if (selectedOptions[i] === q.answer) {
                total++;
            }
        });
        setScore(total);
        setShowResults(true);
    };

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentStep];

    return (
        <div className="min-h-screen pt-28 pb-12 px-6 relative overflow-hidden bg-gray-50/50">
            {/* Background Decorations */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-200/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-purple-600 font-bold text-sm mb-4"
                    >
                        <Sparkles size={16} /> Audio Comprehension Quiz
                    </motion.div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 leading-tight">Test Your Knowledge</h1>
                    <p className="text-gray-500 mt-2 font-sans">Let's see how much you remembered from the audio.</p>
                </div>

                {/* Progress Bar (Segment Bathtub) */}
                <div className="mb-10 flex gap-2 h-2">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-500 ${showResults
                                ? (selectedOptions[i] === questions[i].answer ? 'bg-emerald-500' : 'bg-red-500')
                                : (i === currentStep ? 'bg-purple-600' : i < currentStep ? 'bg-purple-300' : 'bg-gray-200')
                                }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 md:p-12"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 font-bold text-xl">
                                    {currentStep + 1}
                                </div>
                                <h2 className="text-xl md:text-2xl font-display font-bold text-gray-800 leading-snug">
                                    {currentQuestion?.question || "No question available"}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {currentQuestion?.options ? currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
                                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${selectedOptions[currentStep] === idx
                                            ? 'border-purple-500 bg-purple-50/50 shadow-md'
                                            : 'border-gray-100 bg-white hover:border-purple-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className={`font-sans font-medium text-lg ${selectedOptions[currentStep] === idx ? 'text-purple-700' : 'text-gray-600'}`}>
                                            {option}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedOptions[currentStep] === idx
                                            ? 'border-purple-500 bg-purple-500 text-white'
                                            : 'border-gray-200 group-hover:border-purple-300'
                                            }`}>
                                            {selectedOptions[currentStep] === idx && <CheckCircle2 size={14} />}
                                        </div>
                                    </button>
                                )) : (
                                    <p className="text-center text-gray-400 py-10">Options not available. Please try again.</p>
                                )}
                            </div>

                            <div className="mt-12 flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-400 font-sans tracking-wide uppercase">
                                    Question {currentStep + 1} of {questions.length}
                                </span>
                                {currentStep === questions.length - 1 ? (
                                    <button
                                        onClick={calculateScore}
                                        disabled={selectedOptions[currentStep] === null}
                                        className={`px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-xl ${selectedOptions[currentStep] !== null
                                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-emerald-500/20'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Submit Quiz
                                        <CheckCircle2 size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextStep}
                                        disabled={selectedOptions[currentStep] === null}
                                        className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg ${selectedOptions[currentStep] !== null
                                            ? 'bg-gray-900 text-white hover:bg-purple-600 hover:scale-105 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Next Question
                                        <ArrowRight size={18} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/30">
                                <Award size={48} className="text-white" />
                            </div>

                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                            <p className="text-gray-500 mb-8 font-sans">Here's how you performed:</p>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
                                    <div className="text-4xl font-display font-bold text-emerald-600 mb-1">{score}/{questions.length}</div>
                                    <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Total Score</div>
                                </div>
                                <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100">
                                    <div className="text-4xl font-display font-bold text-purple-600 mb-1">{Math.round((score / questions.length) * 100)}%</div>
                                    <div className="text-sm font-bold text-purple-600 uppercase tracking-wider">Accuracy</div>
                                </div>
                            </div>

                            <div className="space-y-4 text-left mb-12">
                                <h3 className="font-display font-bold text-gray-900 px-2">Review Answers</h3>
                                {questions.map((q, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border ${selectedOptions[i] === q.answer ? 'bg-emerald-50/30 border-emerald-100' : 'bg-red-50/30 border-red-100'}`}>
                                        <div className="flex items-start gap-3">
                                            {selectedOptions[i] === q.answer ? <CheckCircle2 size={18} className="text-emerald-500 mt-1" /> : <XCircle size={18} className="text-red-500 mt-1" />}
                                            <div>
                                                <p className="font-bold text-gray-800 mb-1">{q.question}</p>
                                                <p className="text-sm text-gray-600">
                                                    Your Answer: <span className={selectedOptions[i] === q.answer ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>{q.options[selectedOptions[i]]}</span>
                                                </p>
                                                {selectedOptions[i] !== q.answer && (
                                                    <p className="text-sm text-emerald-600 mt-1 font-medium">Correct: {q.options[q.answer]}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/upload')}
                                    className="px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                >
                                    Back to Upload
                                </button>
                                <button
                                    onClick={() => {
                                        setShowResults(false);
                                        setCurrentStep(0);
                                        setSelectedOptions(new Array(questions.length).fill(null));
                                    }}
                                    className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={18} /> Retake Quiz
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
