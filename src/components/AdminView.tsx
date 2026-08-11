import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, LessonContentItem, QuizQuestion, UserProfile, SiteVisitorLog } from '../types';
import { 
  Trash2, 
  Plus, 
  ShieldAlert, 
  CheckCircle, 
  Database, 
  X, 
  BookOpen,
  Pencil,
  Users,
  Globe,
  Search,
  Copy,
  Check,
  BarChart3,
  Eye,
  RefreshCw,
  Clock,
  Laptop,
  Smartphone,
  Mail,
  ShieldCheck,
  Sparkles,
  Filter,
  Flame,
  Award
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export const AdminView: React.FC = () => {
  const { 
    lessons, 
    seedDefaultLessons, 
    isAdmin, 
    allRegisteredUsers, 
    siteVisitors, 
    visitorStats, 
    refreshAdminAnalytics 
  } = useApp();
  
  // Navigation tab state: 'users' | 'analytics' | 'curriculum'
  const [activeTab, setActiveTab] = useState<'users' | 'analytics' | 'curriculum'>('users');

  // User search & filtering states
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');
  const [userFilterType, setUserFilterType] = useState<'all' | 'email' | 'guest'>('all');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Lesson Form State
  const [lang, setLang] = useState<string>('marathi');
  const [category, setCategory] = useState<string>('vocabulary');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  
  // Array lists for dynamic form builders
  const [contentItems, setContentItems] = useState<LessonContentItem[]>([
    { nativeWord: '', translatedWord: '', pronunciation: '', explanation: '' }
  ]);
  const [quizItems, setQuizItems] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], correctOption: 0 }
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isRefreshingAnalytics, setIsRefreshingAnalytics] = useState<boolean>(false);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-4 shadow-inner">
          <ShieldAlert className="h-9 w-9" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Administrator Access Restricted</h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
          Administrative controls, user analytics, and curriculum editing are strictly restricted to the designated website owner and Super Administrator: <span className="font-extrabold text-red-700 underline">aaryansaroj88@gmail.com</span>.
        </p>
        <p className="text-[11px] text-gray-400 mt-4">
          Please log in with <strong>aaryansaroj88@gmail.com</strong> or use the Super Admin Direct Sign-In on the Account Portal.
        </p>
      </div>
    );
  }

  // Copy email helper
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  // Refresh analytics handler
  const handleRefreshAnalytics = async () => {
    setIsRefreshingAnalytics(true);
    await refreshAdminAnalytics();
    setTimeout(() => setIsRefreshingAnalytics(false), 600);
  };

  // Filtered registered users
  const filteredUsers = allRegisteredUsers.filter(u => {
    const matchesSearch = 
      (u.username && u.username.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
      (u.selectedLanguage && u.selectedLanguage.toLowerCase().includes(userSearchTerm.toLowerCase()));

    const isEmailUser = Boolean(u.email && u.email.includes('@'));
    if (userFilterType === 'email' && !isEmailUser) return false;
    if (userFilterType === 'guest' && isEmailUser) return false;

    return matchesSearch;
  });

  // Content Dynamic Array Handlers
  const addContentRow = () => {
    setContentItems(prev => [...prev, { nativeWord: '', translatedWord: '', pronunciation: '', explanation: '' }]);
  };
  const removeContentRow = (idx: number) => {
    if (contentItems.length === 1) return;
    setContentItems(prev => prev.filter((_, i) => i !== idx));
  };
  const handleContentChange = (idx: number, field: keyof LessonContentItem, val: string) => {
    setContentItems(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  // Quiz Dynamic Array Handlers
  const addQuizRow = () => {
    setQuizItems(prev => [...prev, { question: '', options: ['', '', '', ''], correctOption: 0 }]);
  };
  const removeQuizRow = (idx: number) => {
    if (quizItems.length === 1) return;
    setQuizItems(prev => prev.filter((_, i) => i !== idx));
  };
  const handleQuizQuestionChange = (idx: number, val: string) => {
    setQuizItems(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], question: val };
      return copy;
    });
  };
  const handleQuizOptionChange = (qIdx: number, optIdx: number, val: string) => {
    setQuizItems(prev => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options];
      opts[optIdx] = val;
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };
  const handleQuizCorrectChange = (qIdx: number, val: number) => {
    setQuizItems(prev => {
      const copy = [...prev];
      copy[qIdx] = { ...copy[qIdx], correctOption: val };
      return copy;
    });
  };

  // Delete Lesson
  const handleDeleteLesson = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson from Firestore?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'lessons', id));
      setStatusMsg("Lesson deleted successfully!");
      if (editingLessonId === id) {
        handleCancelEdit();
      }
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, `lessons/${id}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setLang(lesson.language);
    setCategory(lesson.category);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setDifficulty(lesson.difficulty);
    setContentItems(lesson.content && lesson.content.length > 0 ? lesson.content : [{ nativeWord: '', translatedWord: '', pronunciation: '', explanation: '' }]);
    setQuizItems(lesson.quiz && lesson.quiz.length > 0 ? lesson.quiz : [{ question: '', options: ['', '', '', ''], correctOption: 0 }]);
    setVideoUrl(lesson.videoUrl || '');
    setVideoTitle(lesson.videoTitle || '');
    setStatusMsg(null);
  };

  const handleCancelEdit = () => {
    setEditingLessonId(null);
    setLang('marathi');
    setCategory('vocabulary');
    setTitle('');
    setDescription('');
    setDifficulty('beginner');
    setContentItems([{ nativeWord: '', translatedWord: '', pronunciation: '', explanation: '' }]);
    setQuizItems([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);
    setVideoUrl('');
    setVideoTitle('');
    setStatusMsg(null);
  };

  // Submit Lesson Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    const lessonId = editingLessonId || `${lang}_${category}_${Date.now()}`;
    const newLesson: Lesson = {
      id: lessonId,
      language: lang,
      category,
      title: title.trim(),
      description: description.trim(),
      content: contentItems.map(item => ({
        nativeWord: item.nativeWord.trim(),
        translatedWord: item.translatedWord.trim(),
        pronunciation: item.pronunciation.trim(),
        explanation: item.explanation.trim()
      })),
      quiz: quizItems.map(item => ({
        question: item.question.trim(),
        options: item.options.map(o => o.trim()),
        correctOption: item.correctOption
      })),
      difficulty,
      createdAt: new Date().toISOString()
    };

    if (videoUrl.trim()) {
      newLesson.videoUrl = videoUrl.trim();
    }
    if (videoTitle.trim()) {
      newLesson.videoTitle = videoTitle.trim();
    }

    try {
      await setDoc(doc(db, 'lessons', lessonId), newLesson);
      if (editingLessonId) {
        setStatusMsg("Lesson successfully updated in Firestore!");
      } else {
        setStatusMsg("New Lesson successfully published to Firestore!");
      }
      
      handleCancelEdit();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, `lessons/${lessonId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Super Admin Control Room Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 mb-3">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>SUPER ADMIN SITE OWNER: aaryansaroj88@gmail.com</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white">Admin Control Room</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Monitor registered user accounts, track real-time website visitor traffic, and manage language learning lessons.
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={handleRefreshAnalytics}
            disabled={isRefreshingAnalytics}
            className="flex items-center space-x-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 text-emerald-400 ${isRefreshingAnalytics ? 'animate-spin' : ''}`} />
            <span>Refresh Analytics</span>
          </button>

          <button
            onClick={seedDefaultLessons}
            className="flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-95 cursor-pointer"
          >
            <Database className="h-4 w-4" />
            <span>Seed Default Lessons</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center border-b border-gray-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Users className="h-4.5 w-4.5" />
          <span>Registered Users Directory</span>
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
            {allRegisteredUsers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="h-4.5 w-4.5" />
          <span>Website Visitors & Traffic</span>
          <span className="rounded-full bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[11px] font-extrabold text-blue-700 dark:text-blue-300">
            {visitorStats.totalVisits} Visits
          </span>
        </button>

        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'curriculum'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4.5 w-4.5" />
          <span>Curriculum & Lessons</span>
          <span className="rounded-full bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 text-[11px] font-extrabold text-purple-700 dark:text-purple-300">
            {lessons.length}
          </span>
        </button>
      </div>

      {statusMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50 p-4 text-emerald-800 dark:text-emerald-200 text-xs font-bold shadow-sm flex items-center space-x-2.5">
          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* TAB 1: REGISTERED USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          
          {/* User Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Total Accounts</span>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {allRegisteredUsers.length}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Users registered on platform</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Email Verified Users</span>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {allRegisteredUsers.filter(u => u.email && u.email.includes('@')).length}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Accounts signed in via email</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Active Today</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
                  <Flame className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {allRegisteredUsers.filter(u => u.lastActiveDate && u.lastActiveDate.startsWith(new Date().toISOString().slice(0, 10))).length || 1}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Learners active in last 24h</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Total XP Earned</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {allRegisteredUsers.reduce((acc, curr) => acc + (curr.xp || 0), 0)}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Combined learning XP</p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search user by email, name or language..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-4 py-2 text-xs font-bold text-gray-800 dark:text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-400 shrink-0" />
              <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setUserFilterType('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userFilterType === 'all' 
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-slate-400'
                  }`}
                >
                  All ({allRegisteredUsers.length})
                </button>
                <button
                  onClick={() => setUserFilterType('email')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userFilterType === 'email' 
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-slate-400'
                  }`}
                >
                  With Email ({allRegisteredUsers.filter(u => u.email && u.email.includes('@')).length})
                </button>
                <button
                  onClick={() => setUserFilterType('guest')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userFilterType === 'guest' 
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-slate-400'
                  }`}
                >
                  Guests ({allRegisteredUsers.filter(u => !u.email || !u.email.includes('@')).length})
                </button>
              </div>
            </div>
          </div>

          {/* User Directory Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-emerald-500" />
                  <span>Registered Users & Email Directory</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Complete list of users, email addresses, learning progress and active streaks.
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400">
                Showing {filteredUsers.length} of {allRegisteredUsers.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800/60 text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
                    <th className="py-3.5 px-6">User Name</th>
                    <th className="py-3.5 px-6">Email Address</th>
                    <th className="py-3.5 px-6">Target Language</th>
                    <th className="py-3.5 px-6">Level & XP</th>
                    <th className="py-3.5 px-6">Streak / Lessons</th>
                    <th className="py-3.5 px-6">Last Active</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-xs">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400">
                        No registered users match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const userEmail = u.email || (u.uid === 'admin_aaryansaroj88' ? 'aaryansaroj88@gmail.com' : 'Guest Account');
                      const isSuperAdmin = userEmail.toLowerCase().trim() === 'aaryansaroj88@gmail.com';

                      return (
                        <tr key={u.uid} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          
                          {/* User Name */}
                          <td className="py-4 px-6 font-bold text-gray-900 dark:text-slate-100">
                            <div className="flex items-center space-x-3">
                              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                                {u.username ? u.username.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <div className="font-bold flex items-center space-x-1.5">
                                  <span>{u.username || 'Learner'}</span>
                                  {isSuperAdmin && (
                                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                      Owner
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono">UID: {u.uid.slice(0, 10)}...</span>
                              </div>
                            </div>
                          </td>

                          {/* Email Address */}
                          <td className="py-4 px-6 font-semibold">
                            {userEmail.includes('@') ? (
                              <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                                <Mail className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                <span className="font-mono text-xs font-extrabold">{userEmail}</span>
                                <button
                                  onClick={() => handleCopyEmail(userEmail)}
                                  className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded hover:bg-emerald-200/50 transition-colors cursor-pointer"
                                  title="Copy email address"
                                >
                                  {copiedEmail === userEmail ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-[11px] bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                Guest Session (No Email)
                              </span>
                            )}
                          </td>

                          {/* Target Language */}
                          <td className="py-4 px-6">
                            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900/40">
                              {u.selectedLanguage || 'Marathi'}
                            </span>
                          </td>

                          {/* Level & XP */}
                          <td className="py-4 px-6">
                            <div className="font-black text-gray-900 dark:text-white">Lvl {u.level || 1}</div>
                            <div className="text-[10px] text-emerald-600 font-bold">{u.xp || 0} XP</div>
                          </td>

                          {/* Streak / Lessons */}
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400 font-bold">
                              <Flame className="h-3.5 w-3.5 shrink-0" />
                              <span>{u.dailyStreak || 0} Days</span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {u.completedLessons?.length || 0} Lessons done
                            </div>
                          </td>

                          {/* Last Active */}
                          <td className="py-4 px-6 text-gray-500 dark:text-slate-400 text-[11px]">
                            {u.lastActiveDate ? new Date(u.lastActiveDate).toLocaleString() : 'Recently'}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            {userEmail.includes('@') && (
                              <button
                                onClick={() => handleCopyEmail(userEmail)}
                                className="inline-flex items-center space-x-1 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                              >
                                {copiedEmail === userEmail ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>Copy Email</span>
                                  </>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEBSITE VISITORS & TRAFFIC ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Traffic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Total Website Visits</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {visitorStats.totalVisits}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Cumulative page hits</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Unique Visitors</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {visitorStats.uniqueVisitors}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Distinct devices/sessions</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Visitors Active Today</span>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {visitorStats.activeTodayCount}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Visited website today</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Registered vs Guests</span>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {visitorStats.registeredUsersCount} / {visitorStats.guestVisitorsCount}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Logged-in vs Guest ratio</p>
            </div>
          </div>

          {/* Visitor Traffic Log Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span>Real-Time Visitor Log & Traffic Analytics</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Track individual visitor sessions, devices, and repeat visits.
                </p>
              </div>

              <button
                onClick={handleRefreshAnalytics}
                className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshingAnalytics ? 'animate-spin' : ''}`} />
                <span>Refresh Log</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800/60 text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
                    <th className="py-3.5 px-6">Session ID / User</th>
                    <th className="py-3.5 px-6">Account Email</th>
                    <th className="py-3.5 px-6">Device & Browser</th>
                    <th className="py-3.5 px-6">Total Visits</th>
                    <th className="py-3.5 px-6">First Visit</th>
                    <th className="py-3.5 px-6">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-xs">
                  {siteVisitors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400">
                        No visitor logs captured yet.
                      </td>
                    </tr>
                  ) : (
                    siteVisitors.map((v) => {
                      const isMobile = v.deviceType?.toLowerCase() === 'mobile';

                      return (
                        <tr key={v.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          
                          {/* Session ID / User */}
                          <td className="py-4 px-6 font-bold text-gray-900 dark:text-slate-100">
                            <div className="flex items-center space-x-2.5">
                              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300">
                                {isMobile ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                              </div>
                              <div>
                                <div className="font-bold text-xs">
                                  {v.username || (v.userEmail ? v.userEmail.split('@')[0] : 'Anonymous Visitor')}
                                </div>
                                <div className="text-[10px] font-mono text-gray-400">ID: {v.id.slice(0, 16)}...</div>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-4 px-6">
                            {v.userEmail ? (
                              <span className="font-mono text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                                {v.userEmail}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic text-[11px]">Guest Visitor</span>
                            )}
                          </td>

                          {/* Device & Browser */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-gray-800 dark:text-slate-200">{v.deviceType || 'Desktop'}</div>
                            <div className="text-[10px] text-gray-400">{v.browser || 'Chrome'}</div>
                          </td>

                          {/* Visit Count */}
                          <td className="py-4 px-6">
                            <span className="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-purple-100 dark:border-purple-900/40">
                              {v.visitCount || 1} Visits
                            </span>
                          </td>

                          {/* First Visit */}
                          <td className="py-4 px-6 text-gray-500 dark:text-slate-400 text-[11px]">
                            {v.firstVisitedAt ? new Date(v.firstVisitedAt).toLocaleString() : 'N/A'}
                          </td>

                          {/* Last Visit */}
                          <td className="py-4 px-6 text-gray-500 dark:text-slate-400 text-[11px]">
                            {v.lastVisitedAt ? new Date(v.lastVisitedAt).toLocaleString() : 'Just now'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CURRICULUM & LESSON MANAGER */}
      {activeTab === 'curriculum' && (
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Left Column: Create / Edit Form */}
          <div className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Plus className={`h-5.5 w-5.5 ${editingLessonId ? 'text-amber-500' : 'text-emerald-500'}`} />
                <span>{editingLessonId ? 'Modify Existing Lesson' : 'Create New Lesson'}</span>
              </h3>
              {editingLessonId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs font-extrabold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Lang & Cat Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Language</label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  >
                    <option value="marathi">Marathi</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="marwadi">Marwadi</option>
                    <option value="tamil">Tamil</option>
                    <option value="sanskrit">Sanskrit</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  >
                    <option value="alphabets">Alphabets</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="grammar">Grammar</option>
                  </select>
                </div>
              </div>

              {/* Title & Difficulty */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Lesson Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Household Objects"
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of what the user will master..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                />
              </div>

              {/* Video Tutorial (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-slate-800 pt-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Video URL (Optional)</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="e.g., https://www.youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Video Title (Optional)</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g., Lesson Video Tutorial"
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Dynamic STUDY CARDS Builder */}
              <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Study Cards List</h4>
                  <button
                    type="button"
                    onClick={addContentRow}
                    className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Card</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {contentItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-200 dark:border-slate-700 relative space-y-3">
                      <button
                        type="button"
                        onClick={() => removeContentRow(idx)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <span className="text-[10px] font-black uppercase text-gray-400">Card {idx + 1}</span>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Word in Native script"
                          value={item.nativeWord}
                          onChange={(e) => handleContentChange(idx, 'nativeWord', e.target.value)}
                          className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100"
                        />
                        <input
                          type="text"
                          placeholder="English Translation"
                          value={item.translatedWord}
                          onChange={(e) => handleContentChange(idx, 'translatedWord', e.target.value)}
                          className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Phonetic Pronunciation"
                          value={item.pronunciation}
                          onChange={(e) => handleContentChange(idx, 'pronunciation', e.target.value)}
                          className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100"
                        />
                        <input
                          type="text"
                          placeholder="Grammar/Usage Note"
                          value={item.explanation}
                          onChange={(e) => handleContentChange(idx, 'explanation', e.target.value)}
                          className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic QUIZ questions Builder */}
              <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Quiz Questions List</h4>
                  <button
                    type="button"
                    onClick={addQuizRow}
                    className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {quizItems.map((q, qIdx) => (
                    <div key={qIdx} className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-200 dark:border-slate-700 relative space-y-3">
                      <button
                        type="button"
                        onClick={() => removeQuizRow(qIdx)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <span className="text-[10px] font-black uppercase text-gray-400">Question {qIdx + 1}</span>

                      <input
                        type="text"
                        placeholder="Quiz Question"
                        value={q.question}
                        onChange={(e) => handleQuizQuestionChange(qIdx, e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs font-semibold text-gray-800 dark:text-slate-100"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => (
                          <input
                            key={optIdx}
                            type="text"
                            placeholder={`Option ${optIdx + 1}`}
                            value={opt}
                            onChange={(e) => handleQuizOptionChange(qIdx, optIdx, e.target.value)}
                            className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100"
                          />
                        ))}
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Correct Choice</label>
                        <select
                          value={q.correctOption}
                          onChange={(e) => handleQuizCorrectChange(qIdx, parseInt(e.target.value))}
                          className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-gray-800 dark:text-slate-100 w-full"
                        >
                          <option value={0}>Option 1</option>
                          <option value={1}>Option 2</option>
                          <option value={2}>Option 3</option>
                          <option value={3}>Option 4</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-3.5 text-sm font-bold text-white shadow transition-all active:scale-95 cursor-pointer ${
                  editingLessonId 
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' 
                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                }`}
              >
                {loading 
                  ? 'Saving changes...' 
                  : editingLessonId 
                    ? 'Save & Update Lesson in Firestore' 
                    : 'Publish Lesson to Firestore'}
              </button>
            </form>
          </div>

          {/* Right Column: Existing Lessons List */}
          <div className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <BookOpen className="h-5.5 w-5.5 text-emerald-500" />
              <span>Manage Existing Lessons ({lessons.length})</span>
            </h3>

            <div className="space-y-4 max-h-[850px] overflow-y-auto pr-1">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="flex items-start justify-between rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 p-4.5 shadow-sm"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="rounded-md bg-gray-100 dark:bg-slate-700 px-2 py-0.5 text-[9px] font-black uppercase text-gray-500 dark:text-slate-300">
                        {lesson.language}
                      </span>
                      <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                        {lesson.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 mt-2 text-sm leading-tight">{lesson.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed max-w-sm">{lesson.description}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleEditLesson(lesson)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 hover:bg-amber-100 transition-all active:scale-90 cursor-pointer"
                      title="Edit/Modify Lesson"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 hover:bg-red-100 transition-all active:scale-90 cursor-pointer"
                      title="Delete Lesson"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
