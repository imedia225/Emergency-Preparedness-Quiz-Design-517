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
    title: "With tensions rising overseas, threats to our infrastructure, and the grid already struggling — who are you most worried about protecting if the power goes out?",
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

    // Fire Facebook event after question 1
    if (currentQuestion === 0) {
      firePixelEvent('Lead', { question_1_answered: true });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Quiz completed
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
    // Redirect to offer page
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
          <motion.h2 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Analyzing Your Results...
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please wait while we process your answers
          </motion.p>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-900 relative overflow-y-auto">
        {/* Scrollable content */}
        <div className="min-h-[120vh] pt-20 pb-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Your Results Are In – You Can Add{' '}
                <span className="text-olive-500">Unlimited Power Within 21 Days.</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Here's what real preppers are doing to secure unlimited backup power in just 21 days – 
                without generators, solar panels, or complicated installations
              </p>
              
              <p className="text-lg font-semibold text-white mb-12">
                It's reliable. It's fast. And it works.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800 rounded-lg p-8 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-olive-500 text-xl font-bold mb-6">Real User Results:</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div className="text-left">
                    <p className="text-white mb-2">"Started with nothing... Had full backup power after 21 days."</p>
                    <p className="text-gray-400 text-sm">– Mike, 45</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div className="text-left">
                    <p className="text-white mb-2">"When the grid went down, we were the only house with lights on."</p>
                    <p className="text-gray-400 text-sm">– Sarah, 38</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Extra content for scrolling */}
            <div className="space-y-8 text-gray-300">
              <p>No generators. No solar panels. No waiting. Just pure reliable power.</p>
              <p>Join thousands who've taken control of their power independence.</p>
            </div>
          </div>
        </div>

        {/* Fixed CTA Modal */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t-2 border-olive-500 p-6 shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.button
              onClick={handleCTAClick}
              className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-olive-500/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch the 15-Second Method That's Giving Preppers Unlimited Power
            </motion.button>
            <p className="text-gray-400 text-sm mt-3">
              No generators. No solar panels. No waiting. Just pure reliable results.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-olive-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 pt-8">
        <div className="max-w-4xl mx-auto text-center">
          {currentQuestion === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                How to Add Unlimited Power to Your{' '}
                <span className="text-olive-500">"Survival Kit"</span> in 21 Days...
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Discover how this game-changing 15-second method is turning unprepared families into 
                power-independent survivors – fast. No generators. No solar panels. No BS. Just real backup power.
              </p>
            </motion.div>
          )}

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800 rounded-lg p-8 shadow-2xl"
          >
            <div className="mb-8">
              <p className="text-olive-500 text-sm font-semibold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {questions[currentQuestion].title}
              </h2>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedOption === index
                      ? 'bg-olive-500 border-olive-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-200 hover:border-olive-500 hover:shadow-lg hover:shadow-olive-500/25'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    <svg 
                      className="w-5 h-5 text-olive-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Testimonial for first question */}
          {currentQuestion === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-gray-800 rounded-lg p-6 max-w-lg mx-auto border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
                <div className="text-left">
                  <p className="text-white text-sm mb-1">
                    "Started with nothing... Had full backup power after 21 days."
                  </p>
                  <p className="text-gray-400 text-xs">– Mike, 45</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;