import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, QuizQuestion } from '../types';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Award, 
  HelpCircle, 
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizViewProps {
  lesson: Lesson;
  onClose: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ lesson, onClose }) => {
  const { completeLesson } = useApp();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const activeQuestion: QuizQuestion = lesson.quiz[questionIndex];

  // Synthesize game sounds (Ding and Buzz) using Web Audio API
  const playSound = (type: 'correct' | 'incorrect' | 'finish') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === 'correct') {
        // High pitched pleasant double beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'incorrect') {
        // Low pitched dull buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'finish') {
        // Happy arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
      }
    } catch (e) {
      console.warn("AudioContext synthesis failed/unsupported:", e);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedOption === activeQuestion.correctOption;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = async () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (questionIndex < lesson.quiz.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      playSound('finish');
      
      // Calculate rewards
      const isPerfect = score + (selectedOption === activeQuestion.correctOption ? 1 : 0) === lesson.quiz.length;
      await completeLesson(lesson.id, isPerfect);
    }
  };

  // Pre-calculate isCurrentCorrect for rendering
  const isCurrentCorrect = selectedOption === activeQuestion?.correctOption;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          // ================= ACTIVE QUIZ BOX =================
          <motion.div
            key="quiz-body"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl"
          >
            {/* Header progress info */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onClose}
                className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quit Quiz</span>
              </button>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Question {questionIndex + 1} of {lesson.quiz.length}
              </span>
            </div>

            {/* Quiz progress line */}
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-8">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((questionIndex) / lesson.quiz.length) * 100}%` }}
              />
            </div>

            {/* Question Label */}
            <div className="flex items-start space-x-3 mb-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <HelpCircle className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-snug">
                {activeQuestion.question}
              </h3>
            </div>

            {/* MCQ Options list */}
            <div className="space-y-3.5">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                
                // Styling logic based on states
                let btnStyle = 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50';
                let indicatorStyle = 'border-gray-200 text-gray-400';
                
                if (isSelected) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/25';
                  indicatorStyle = 'border-emerald-500 bg-emerald-500 text-white';
                }
                
                if (isAnswered) {
                  if (idx === activeQuestion.correctOption) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800';
                    indicatorStyle = 'border-emerald-500 bg-emerald-500 text-white';
                  } else if (isSelected && !isCurrentCorrect) {
                    btnStyle = 'border-red-300 bg-red-50 text-red-800';
                    indicatorStyle = 'border-red-500 bg-red-500 text-white';
                  } else {
                    btnStyle = 'border-gray-100 bg-white opacity-40';
                    indicatorStyle = 'border-gray-200 text-gray-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx)}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 p-4.5 text-left font-semibold text-gray-700 transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 text-xs font-black transition-all ${indicatorStyle}`}>
                        {idx + 1}
                      </span>
                      <span className="text-base font-bold">{option}</span>
                    </div>

                    {isAnswered && idx === activeQuestion.correctOption && (
                      <CheckCircle className="h-5.5 w-5.5 text-emerald-600 fill-emerald-50" />
                    )}
                    {isAnswered && isSelected && !isCurrentCorrect && (
                      <XCircle className="h-5.5 w-5.5 text-red-500 fill-red-50" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submission / Controller Bar */}
            <div className="border-t border-gray-50 mt-8 pt-6 flex justify-end">
              {!isAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all ${
                    selectedOption === null 
                      ? 'bg-gray-200 shadow-none cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100 active:scale-95'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-600 active:scale-95 transition-all"
                >
                  <span>{questionIndex < lesson.quiz.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          // ================= REWARD / COMPLETION MODAL SCREEN =================
          <motion.div
            key="reward-body"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-100"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-100 mb-6">
              <Award className="h-10 w-10" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Quiz Completed!
            </h2>
            <p className="text-gray-500 mt-2">
              Outstanding effort! You completed the quiz for **{lesson.title}**.
            </p>

            {/* Score box */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 my-8 max-w-sm mx-auto">
              <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">Your Accuracy</span>
              <h1 className="text-5xl font-black text-gray-800 tracking-tight mt-1">
                {Math.round((score / lesson.quiz.length) * 100)}%
              </h1>
              <p className="text-xs text-gray-500 mt-2 font-semibold">
                Answered {score} out of {lesson.quiz.length} correctly.
              </p>
            </div>

            {/* Rewards cards display */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4 text-center">
                <span className="text-2xl">⚡</span>
                <h4 className="font-extrabold text-emerald-800 text-lg mt-1">+{score * 10} XP</h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5">Base Reward</p>
              </div>

              {score === lesson.quiz.length ? (
                <div className="bg-orange-50/60 border border-orange-100/50 rounded-2xl p-4 text-center">
                  <span className="text-2xl">🔥</span>
                  <h4 className="font-extrabold text-orange-800 text-lg mt-1">+20 XP</h4>
                  <p className="text-[10px] font-bold text-orange-600 uppercase mt-0.5">Perfect Bonus</p>
                </div>
              ) : (
                <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 text-center">
                  <span className="text-2xl">👍</span>
                  <h4 className="font-extrabold text-blue-800 text-base mt-1">Great Job</h4>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">Bonus Goal</p>
                </div>
              )}
            </div>

            {/* Badges notification helper if perfect */}
            {score === lesson.quiz.length && (
              <div className="flex items-center space-x-2.5 justify-center bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-2xl p-3.5 mb-8 text-xs font-bold max-w-sm mx-auto animate-bounce">
                <Flame className="h-5 w-5 text-yellow-600 fill-yellow-500 shrink-0" />
                <span>Unlocked 'Flawless Finish' Badge!</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full max-w-sm rounded-xl bg-emerald-500 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:shadow-emerald-300 transition-all active:scale-95"
            >
              Back to Lessons
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
