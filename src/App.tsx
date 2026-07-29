import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavBar } from './components/NavBar';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { QuizView } from './components/QuizView';
import { DashboardView } from './components/DashboardView';
import { AITutorView } from './components/AITutorView';
import { AdminView } from './components/AdminView';
import { LoginView } from './components/LoginView';
import { Lesson } from './types';
import { Compass, Flame, ArrowRight, ShieldAlert, BookOpen, Bell, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { 
    user, 
    loading, 
    loginAnonymously,
    showSimulatedNotification,
    setShowSimulatedNotification,
    simulatedNotificationText 
  } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeQuizLesson, setActiveQuizLesson] = useState<Lesson | null>(null);

  // Loading state with a custom animated spinner
  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50 text-emerald-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-xl shadow-emerald-100"
        >
          <Compass className="h-8 w-8 animate-pulse" />
        </motion.div>
        <span className="mt-4 text-sm font-extrabold text-gray-500 tracking-wide animate-pulse">
          Synchronizing with cloud academy...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 transition-colors duration-200">
      {/* Dynamic Header */}
      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Container */}
      <main className="pb-16">
        <AnimatePresence mode="wait">
          {activeQuizLesson ? (
            <QuizView 
              key="quiz"
              lesson={activeQuizLesson} 
              onClose={() => setActiveQuizLesson(null)} 
            />
          ) : (
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {currentTab === 'home' && (
                <HomeView setCurrentTab={setCurrentTab} />
              )}

              {currentTab === 'login' && (
                <LoginView onSuccessNavigate={(tab) => setCurrentTab(tab)} />
              )}
              
              {/* Authenticated routes */}
              {user ? (
                <>
                  {currentTab === 'lessons' && (
                    <LessonsView onStartQuiz={(lesson) => setActiveQuizLesson(lesson)} />
                  )}
                  {currentTab === 'dashboard' && (
                    <DashboardView />
                  )}
                  {currentTab === 'tutor' && (
                    <AITutorView />
                  )}
                  {currentTab === 'admin' && (
                    <AdminView />
                  )}
                </>
              ) : (
                currentTab !== 'home' && currentTab !== 'login' && (
                  <div className="mx-auto max-w-md px-4 py-20 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 mb-6 border border-emerald-100 dark:border-emerald-800/40">
                      <ShieldAlert className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Session Required</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                      Please sign in to your learner account or create a new account to access learning modules, chat with the AI Tutor, and track your streaks.
                    </p>
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setCurrentTab('login')}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Sign In or Register to Access Lessons</span>
                      </button>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer / Credits */}
      <footer className="w-full border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <span>&copy; 2026 LingoLocal. All rights reserved.</span>
            <span className="h-4 w-px bg-gray-200 dark:bg-slate-800 hidden sm:inline" />
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 uppercase tracking-wider">v1.0.0 Stable</span>
          </div>
          <span className="flex items-center space-x-1">
            <span>This website is hosted by</span>
            <a 
              href="https://github.com/aaryansaroj88" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors underline decoration-emerald-200 dark:decoration-emerald-800 hover:decoration-emerald-400"
            >
              Aaryan Saroj
            </a>
          </span>
        </div>
      </footer>

      {/* Simulated Browser Notification Toast */}
      <AnimatePresence>
        {showSimulatedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-4 right-4 z-[9999] w-full max-w-sm rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-100 dark:border-slate-800 p-4 shadow-2xl backdrop-blur-md flex items-start space-x-3.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 shadow-inner">
              <Bell className="h-5 w-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">LingoNudge System</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">SIMULATED</span>
              </div>
              <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5">{simulatedNotificationText.title}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">{simulatedNotificationText.body}</p>
            </div>
            <button 
              onClick={() => setShowSimulatedNotification(false)}
              className="shrink-0 p-1 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
