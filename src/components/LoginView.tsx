import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Key, 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  ShieldAlert, 
  Award,
  Flame,
  UserPlus,
  LogIn,
  Sliders,
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginViewProps {
  onSuccessNavigate?: (tab: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSuccessNavigate }) => {
  const { 
    user, 
    profile, 
    isAdmin, 
    setIsAdmin, 
    loginAnonymously, 
    loginWithEmail, 
    registerWithEmail, 
    loginAsAdmin, 
    logout,
    selectedLanguage,
    updateProfileLanguage 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'admin'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [targetLang, setTargetLang] = useState('marathi');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLearnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both email and password.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      await loginWithEmail(email.trim(), password);
      setSuccessMsg('Successfully logged in!');
      setTimeout(() => {
        if (onSuccessNavigate) onSuccessNavigate('dashboard');
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !username.trim()) {
      setErrorMsg('Please complete all required registration fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      await registerWithEmail(email.trim(), password, username.trim(), targetLang);
      setSuccessMsg('Account created successfully! Welcome to LingoLocal.');
      setTimeout(() => {
        if (onSuccessNavigate) onSuccessNavigate('lessons');
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const targetAdminEmail = email.trim() || 'aaryansaroj88@gmail.com';

    try {
      await loginAsAdmin(targetAdminEmail, adminPasscode.trim());
      setSuccessMsg('Super Administrator privileges activated for aaryansaroj88@gmail.com!');
      setTimeout(() => {
        if (onSuccessNavigate) onSuccessNavigate('admin');
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Access Denied: Only aaryansaroj88@gmail.com is authorized as Administrator.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuperAdminDirectLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginAsAdmin('aaryansaroj88@gmail.com');
      setSuccessMsg('Authenticated as Site Owner & Super Admin (aaryansaroj88@gmail.com)!');
      setTimeout(() => {
        if (onSuccessNavigate) onSuccessNavigate('admin');
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate Super Admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickGuest = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginAnonymously();
      setSuccessMsg('Guest Learner session initialized!');
      setTimeout(() => {
        if (onSuccessNavigate) onSuccessNavigate('lessons');
      }, 600);
    } catch (err: any) {
      setErrorMsg('Unable to start guest session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-100 dark:shadow-none mb-4">
          <Compass className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight sm:text-4xl">
          LingoLocal <span className="text-emerald-500 dark:text-emerald-400">Account Portal</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
          Sign in to track your learning progress, unlock regional badges, and master local languages.
        </p>
      </div>

      {/* If Already Logged In */}
      {user && (
        <div className="mb-10 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white text-xl font-black shadow-md">
                    {profile?.username ? profile.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                {isAdmin && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow" title="Administrator">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile?.username || user.displayName || 'Learner'}</h3>
                  {isAdmin ? (
                    <span className="inline-flex items-center space-x-1 rounded-full bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 text-xs font-black text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>ADMINISTRATOR</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      <span>ACTIVE LEARNER</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{user.email || 'Guest Account (Local Session)'}</p>
                <div className="flex items-center space-x-3 mt-2 text-xs font-semibold text-gray-600 dark:text-slate-300">
                  <span className="flex items-center text-amber-600 dark:text-amber-400">
                    <Award className="h-3.5 w-3.5 mr-1" />
                    {profile?.xp || 0} XP
                  </span>
                  <span>•</span>
                  <span className="flex items-center text-orange-600 dark:text-orange-400">
                    <Flame className="h-3.5 w-3.5 mr-1" />
                    {profile?.dailyStreak || 0} Day Streak
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onSuccessNavigate && (
                <button
                  onClick={() => onSuccessNavigate('lessons')}
                  className="inline-flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer"
                >
                  <span>Go to Lessons</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={logout}
                className="inline-flex items-center space-x-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 px-3.5 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Mode Toggle */}
      <div className="mx-auto max-w-xl">
        <div className="flex rounded-2xl bg-gray-100 dark:bg-slate-800 p-1.5 mb-6">
          <button
            onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
              mode === 'login' 
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="h-4 w-4" />
            <span>Learner Sign In</span>
          </button>

          <button
            onClick={() => { setMode('register'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
              mode === 'register' 
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>New Account</span>
          </button>
        </div>

        {/* Feedback Banners */}
        {errorMsg && (
          <div className="mb-6 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-4 text-xs font-bold text-red-700 dark:text-red-300 flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode Forms */}
        <AnimatePresence mode="wait">
          
          {/* Mode 1: Learner Sign In */}
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Welcome Back!</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">Enter your registered learner credentials to log in.</p>

              <form onSubmit={handleLearnerLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="learner@example.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="animate-pulse">Verifying Learner Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* Mode 2: Register New Account */}
          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Create Free Learner Account</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">Join thousands learning Marathi, Hindi, English, and regional dialects.</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Full Name / Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g., Aaryan Saroj"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Target Language Course</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                  >
                    <option value="marathi">Marathi (मराठी)</option>
                    <option value="hindi">Hindi (हिंदी)</option>
                    <option value="english">English (Eng)</option>
                    <option value="gujarati">Gujarati (ગુજરાતી)</option>
                    <option value="marwadi">Marwadi (मारवाड़ी)</option>
                    <option value="tamil">Tamil (தமிழ்)</option>
                    <option value="sanskrit">Sanskrit (संस्कृत)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="animate-pulse">Creating Account...</span>
                  ) : (
                    <>
                      <span>Register & Start Learning</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};
