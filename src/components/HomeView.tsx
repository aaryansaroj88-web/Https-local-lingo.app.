import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Award, MessageSquare, Flame, Shield, ArrowRight, Languages, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { CourseSelectionGrid } from './CourseSelectionGrid';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab }) => {
  const { user, loginAnonymously } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const features = [
    {
      title: 'Interactive Lessons',
      desc: 'Learn Alphabets, build rich Vocabulary, and understand complex Grammar rules using our colorful bite-sized flashcards.',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600 border-green-100'
    },
    {
      title: 'Voice Pronunciation',
      desc: 'Listen to native vocal accents in real-time. Practice pronouncing local sounds accurately using HTML5 synthesis.',
      icon: Languages,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Gemini AI Language Tutor',
      desc: 'Practice conversing in Marathi, Hindi, or English. Get instant friendly feedback, translations, and explanations.',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      title: 'Bite-sized Quizzes',
      desc: 'Test your retention with instant MCQ quizzes. Score 100% to earn the Flawless Finish golden badge!',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  return (
    <motion.div 
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-8 lg:py-16">
        <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-100 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/40 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
            <Flame className="h-4 w-4 fill-emerald-500 text-emerald-500" />
            <span>Engaging, Interactive, & FREE</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Learn Local Languages <span className="text-emerald-500 dark:text-emerald-400">Effortlessly</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
            Master foundational grammar, local dialects, and high-utility vocabulary with bite-sized lessons, native audio pronunciations, interactive flashcard drills, and personal AI guidance.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            {user ? (
              <button
                onClick={() => setCurrentTab('lessons')}
                className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-600 transition-all active:scale-95 cursor-pointer"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('login')}
                className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-600 transition-all active:scale-95 cursor-pointer"
              >
                <span>Get Started (Sign In)</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('features-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-base font-semibold text-gray-600 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Hero Visual Mockup */}
        <motion.div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center" variants={itemVariants}>
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800/80 border border-emerald-100 dark:border-slate-700 p-8 shadow-xl">
            {/* Duolingo style stats layout card preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Daily Quest</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">2 / 3 completed</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-emerald-500" />
              </div>
              
              {/* Mini card */}
              <div className="flex items-center space-x-4 rounded-2xl border border-white dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-500 font-bold text-xl">
                  🔥
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">3 Day Streak!</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Keep it up, you are doing great!</p>
                </div>
              </div>

              {/* Lesson preview card */}
              <div className="rounded-2xl border border-white dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-md bg-green-50 dark:bg-green-950/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:text-green-400">Vocabulary</span>
                    <h3 className="mt-2 font-bold text-gray-900 dark:text-white text-base">Essential Greetings</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Learn to say Hello and Thank you</p>
                  </div>
                  <span className="text-2xl">👋</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Start Lesson</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Course Selection Cards Grid */}
      <div className="py-12 border-t border-gray-100 dark:border-slate-800">
        <CourseSelectionGrid onNavigateToLessons={() => setCurrentTab('lessons')} />
      </div>

      {/* Features Grid */}
      <div id="features-section" className="py-16 border-t border-gray-100 dark:border-slate-800 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-slate-400">
            Built using gamified education methodologies. Practice lessons, compete on leaderboards, earn golden reward badges, and speak directly with AI.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="flex flex-col items-start rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${feat.color} dark:bg-slate-800 dark:border-slate-700`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{feat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-slate-400">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
