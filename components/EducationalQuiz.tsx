import React, { useState, useRef } from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, Star, Sparkles, Volume2, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  badgeName: string;
  badgeIcon: string;
  badgeColor: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Math in the Meadow",
    badgeName: "Berry Counter Badge",
    badgeIcon: "🍓",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    text: "If Big Bear Djugs has 3 sweet strawberries and Mila gives him 2 more, how many strawberries does Djugs have in total?",
    options: ["4 strawberries", "5 strawberries", "6 strawberries", "3 strawberries"],
    correctIndex: 1,
    explanation: "Excellent! 3 + 2 makes 5. Breaking big problems into small pieces makes math super easy and fun!"
  },
  {
    id: 2,
    category: "Reading by the River",
    badgeName: "Word Explorer Badge",
    badgeIcon: "📖",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    text: "Which letters are missing to spell the rushing water's name: R _ V _ R?",
    options: ["I and E (R-I-V-E-R)", "A and O (R-A-V-O-R)", "E and I (R-E-V-I-R)", "U and Y (R-U-V-Y-R)"],
    correctIndex: 0,
    explanation: "Hooray! R-I-V-E-R spells River. Reading signs in nature helps us follow clues on our forest maps!"
  },
  {
    id: 3,
    category: "Science in the Forest Lab",
    badgeName: "Science Sprout Badge",
    badgeIcon: "🌱",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    text: "What are the two main things that a tiny seed needs to grow into a big, strong plant?",
    options: ["Soda and cookies", "Sunlight and water", "Toys and games", "Moonlight and cold wind"],
    correctIndex: 1,
    explanation: "Spot on! Warm sunlight and fresh water help the seed grow leaves and roots through science magic!"
  },
  {
    id: 4,
    category: "The Forest Storm Rescue",
    badgeName: "Forest Hero Badge",
    badgeIcon: "🛡️",
    badgeColor: "bg-amber-100 text-amber-850 border-amber-300",
    text: "How did Big Bear Djugs safely save the baby birds' nest during the windy forest storm?",
    options: ["By using math to judge the distance and climbing a strong branch", "By blowing the storm away with his breath", "By asking the clouds to turn into pillows", "By throwing acorns at the tree"],
    correctIndex: 0,
    explanation: "Incredible! Djugs used math and science to find the safest, strongest branch to catch the falling nest just in time!"
  }
];

// Happy melodies for correct and incorrect sounds
const PITCH_CORRECT = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6 chime
const PITCH_INCORRECT = [293.66, 220.00]; // D4 - A3 sad drop

export const EducationalQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]); // list of badgeNames
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const playSoundEffect = (isCorrect: boolean) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = isCorrect ? PITCH_CORRECT : PITCH_INCORRECT;
      notes.forEach((freq, index) => {
        const timeOffset = index * 0.12;
        const duration = isCorrect ? 0.3 : 0.4;
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = isCorrect ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

        gainNode.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + timeOffset + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + duration);
      });
    } catch (e) {
      console.warn("Audio Context sound effect blocked or failed:", e);
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedOptionIdx === null || hasSubmitted) return;

    setHasSubmitted(true);
    const isCorrect = selectedOptionIdx === currentQuestion.correctIndex;
    playSoundEffect(isCorrect);

    if (isCorrect && !earnedBadges.includes(currentQuestion.badgeName)) {
      setEarnedBadges((prev) => [...prev, currentQuestion.badgeName]);
    }
  };

  const handleNext = () => {
    setSelectedOptionIdx(null);
    setHasSubmitted(false);
    setCurrentQuestionIdx((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasSubmitted(false);
    setEarnedBadges([]);
  };

  return (
    <div id="educational-quiz-container" className="bg-gradient-to-br from-emerald-50/95 via-yellow-50/90 to-amber-50/95 border-2 border-emerald-300 rounded-3xl p-6 md:p-10 mb-12 shadow-xl text-emerald-950">
      
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-200/60 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-200/50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Forest Quiz Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-emerald-900 tracking-tight">
            📖 Djugs' Learning Quest
          </h2>
          <p className="text-emerald-800/80 text-sm mt-1">
            Test your knowledge about the forest adventures and earn beautiful badges!
          </p>
        </div>

        {/* Dynamic score tracker / total badges earned */}
        <div className="flex items-center gap-2 bg-white/80 px-4 py-2.5 rounded-2xl border border-emerald-200/60 shadow-sm">
          <Award className="w-5 h-5 text-amber-500 animate-bounce" />
          <span className="font-display font-bold text-emerald-950">
            Badges: {earnedBadges.length} / {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Quiz Area */}
        <div className="lg:col-span-2 bg-white/90 rounded-2xl p-6 border border-emerald-200/40 shadow-sm flex flex-col justify-between">
          <div>
            {/* Category and Question Number Indicator */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-200/30">
                {currentQuestion.category}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800/60">
                Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-xl md:text-2xl font-display font-semibold text-emerald-900 mb-6 leading-snug">
              {currentQuestion.text}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let optionStyle = "bg-emerald-50/40 border-emerald-200/60 hover:bg-emerald-50/80 text-emerald-900";
                
                if (selectedOptionIdx === idx) {
                  optionStyle = "bg-amber-100 border-amber-400 ring-2 ring-amber-300 text-amber-950 font-semibold";
                }

                if (hasSubmitted) {
                  if (idx === currentQuestion.correctIndex) {
                    optionStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300";
                  } else if (selectedOptionIdx === idx) {
                    optionStyle = "bg-red-100 border-red-300 text-red-950 ring-2 ring-red-200";
                  } else {
                    optionStyle = "bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${optionStyle}`}
                  >
                    <span className="text-base font-medium">{option}</span>
                    <span className="text-xs font-bold font-mono opacity-50 bg-black/5 px-2 py-1 rounded">
                      Option {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons and Explanations */}
          <div className="mt-8 pt-6 border-t border-emerald-100">
            {hasSubmitted ? (
              <div className="space-y-4 animate-fade-in">
                {/* Result Message */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200/40">
                  {selectedOptionIdx === currentQuestion.correctIndex ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold font-display text-emerald-900">
                      {selectedOptionIdx === currentQuestion.correctIndex 
                        ? "Hurrah! You got it right!" 
                        : "Oh, almost there! Let's read the tip:"}
                    </h4>
                    <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                {/* Next button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-display font-bold px-6 py-3 rounded-2xl transition-all shadow-md hover:shadow-amber-200 border-b-4 border-amber-600 active:border-b-0 active:translate-y-0.5"
                  >
                    {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? "Repeat Quest" : "Next Question"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-xs text-emerald-800/60 font-medium italic">
                  Select your best answer to earn the {currentQuestion.badgeName}!
                </p>
                <button
                  disabled={selectedOptionIdx === null}
                  onClick={handleSubmit}
                  className={`font-display font-bold px-6 py-3 rounded-2xl transition-all shadow-md ${
                    selectedOptionIdx === null
                      ? 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-emerald-200 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-0.5'
                  }`}
                >
                  Verify Answer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Forest Badge showcase board */}
        <div className="bg-emerald-900/10 rounded-2xl p-6 border border-emerald-800/20 shadow-inner flex flex-col justify-between text-center relative overflow-hidden">
          <div>
            <h3 className="text-lg font-bold font-display text-emerald-900 mb-1 flex items-center justify-center gap-1.5">
              <Award className="w-5 h-5 text-amber-500" />
              Your Showcase Board
            </h3>
            <p className="text-xs text-emerald-800/60 mb-6">
              Every correct answer pins a badge to your display!
            </p>

            {/* Badges Display Showcase */}
            <div className="grid grid-cols-2 gap-4">
              {QUIZ_QUESTIONS.map((q) => {
                const isEarned = earnedBadges.includes(q.badgeName);
                return (
                  <div
                    key={q.id}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      isEarned 
                        ? `${q.badgeColor} scale-100 shadow-md` 
                        : 'bg-emerald-950/5 border-emerald-950/10 opacity-30 grayscale'
                    }`}
                  >
                    <span className="text-3xl mb-1.5 filter drop-shadow">
                      {q.badgeIcon}
                    </span>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {isEarned ? q.badgeName : "Locked"}
                    </span>
                    {isEarned && (
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1 flex items-center gap-0.5 animate-pulse">
                        <Star className="w-2.5 h-2.5 fill-current" /> Earned
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-950/10 flex justify-between items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-emerald-800/50 uppercase tracking-widest block">Progress</span>
              <span className="text-sm font-bold font-mono">
                {Math.round((earnedBadges.length / QUIZ_QUESTIONS.length) * 100)}% Complete
              </span>
            </div>
            
            <button
              onClick={handleResetQuiz}
              title="Reset all badges and scores to try again"
              className="p-2 text-emerald-800/60 hover:text-emerald-900 hover:bg-emerald-950/5 rounded-lg transition-all border border-emerald-950/10 flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-center items-center gap-2 text-xs text-emerald-800/60 font-semibold bg-emerald-100/50 w-fit mx-auto px-4 py-2 rounded-full border border-emerald-200/50">
        <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>Chimes sound effects are gentle sine and triangle waves. Safe for kids' play.</span>
      </div>

    </div>
  );
};
