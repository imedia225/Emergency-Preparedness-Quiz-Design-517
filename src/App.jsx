import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const questions = [
  {
    id: 1,
    title: "Which best describes your living situation?",
    options: [
      "I own my home",
      "I rent my home",
      "I live with family/roommates",
      "Other"
    ]
  },
  {
    id: 2,
    title: "With all tensions rising overseas, threats to our infrastructure, and the grid already struggling — who are you most worried about protecting if the power goes out?",
    options: [
      "Just myself — but I still want to be prepared",
      "My spouse/partner",
      "My children or elderly parents",
      "Everyone who depends on me"
    ]
  },
  {
    id: 3,
    title: "If a cyberattack or coordinated strike took down the grid in your region for a week or more — and help wasn't coming quickly — what's your plan?",
    options: [
      "I have backup power and supplies ready",
      "I'd figure something out, but it wouldn't be easy",
      "I'd have to rely on neighbors or shelters",
      "I don't have a plan — I'm hoping it never happens"
    ]
  },
  {
    id: 4,
    title: "While most people are hoping the grid holds up, others are quietly taking control of their own power. Which group do you want to be in?",
    options: [
      "Show me how to be prepared",
      "I'll take my chances with the grid"
    ]
  }
];

// Facebook Pixel Events
const firePixelEvent = (eventName, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
  console.log(`Facebook Pixel Event: ${eventName}`, data);
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);
    setSelectedOption(optionIndex);

    if (currentQuestion === 0) {
      firePixelEvent('Lead', { question_1_answered: true });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        firePixelEvent('CompleteRegistration', { quiz_completed: true });
        setShowAnalyzing(true);
        setTimeout(() => {
          setShowAnalyzing(false);
          setShowThankYou(true);
        }, 2000);
      }
    }, 500);
  };

  const handleCTAClick = () => {
    firePixelEvent('Purchase', { cta_clicked: true });
    window.location.href = '#offer';
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-8">
            <motion.div 
              className="w-16 h-16 border-4 border-gray-700 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <motion.div 
              className="absolute top-0 left-0 w-16 h-16 border-4 border-olive-500 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.h2 className="text-2xl font-bold text-white mb-4">Analyzing Your Results...</motion.h2>
          <motion.p className="text-gray-400">Please wait while we process your answers</motion.p>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-900 relative overflow-y-auto">
        <div className="min-h-[100vh] pt-20 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Results Are In – You Can Add <br/>
                <span className="text-olive-500">Unlimited Power Within 21 Days.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Here's what real preppers are doing to secure unlimited backup power in just 21 days – without generators, solar panels, or complicated installations.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800 rounded-lg p-8 mb-12 max-w-2xl mx-auto border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-olive-500 text-xl font-bold mb-6">Real User Results:</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg text-left">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-white italic text-sm">"Started with nothing... Had full backup power after 21 days."</p>
                    <p className="text-gray-400 text-xs font-bold mt-1 uppercase">– Mike, 45</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg text-left">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-white italic text-sm">"When the grid went down, we were the only house with lights on."</p>
                    <p className="text-gray-400 text-xs font-bold mt-1 uppercase">– Sarah, 38</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4 text-gray-400">
              <p>No generators. No solar panels. No waiting.</p>
              <p>Join thousands who've taken control of their power independence.</p>
            </div>
          </div>
        </div>

        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t-2 border-olive-500 p-6 shadow-2xl z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.button
              onClick={handleCTAClick}
              className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xl md:text-2xl font-bold py-5 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch The Solution Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <motion.div className="h-full bg-olive-500" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {currentQuestion === 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <p className="text-olive-500 text-lg md:text-xl font-bold mb-4 tracking-[0.2em] uppercase">
                SHOCKING BLACKOUT SURVIVAL QUIZ
              </p>
              
              <h1 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight max-w-4xl mx-auto">
                Are You Prepared When The <span className="text-olive-500">Grid Goes Dark</span> — 
                Or Will You Be <span className="text-olive-500 italic">Left Struggling To Survive?</span>
              </h1>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="space-y-4 text-center">
                  <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                    Take This 60-Second Test To Discover If You're Ready For The Next Power Outage — Before It's Too Late! 
                  </p>
                </div>
                
                <div className="space-y-4 text-lg text-gray-300">
                  <p>
                    But with all tensions rising overseas, our infrastructure under threat, and the grid already struggling — hoping for the best could be the most dangerous mistake you make.
                  </p>
                  <p className="font-bold text-white uppercase tracking-wide">
                    Take this quick quiz to see where you stand.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <p className="text-olive-500 text-xs font-bold mb-4 tracking-widest uppercase opacity-80">
                Step {currentQuestion + 1} of {questions.length}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                {questions[currentQuestion].title}
              </h2>
            </div>












            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-5 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedOption === index 
                      ? 'bg-olive-500 border-olive-500 text-white shadow-lg' 
                      : 'bg-gray-700 border-gray-600 text-gray-200 hover:border-olive-500 hover:bg-gray-600'
                  }`}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 ${selectedOption === index ? 'border-white bg-white/20' : 'border-gray-500'}`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;