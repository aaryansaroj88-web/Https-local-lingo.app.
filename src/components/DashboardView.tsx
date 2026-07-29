import React from 'react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_BADGES, Badge } from '../types';
import { 
  Award, 
  Flame, 
  TrendingUp, 
  CheckCircle, 
  Compass, 
  Languages, 
  BookOpen, 
  Brain, 
  Trophy,
  Lock,
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';

const STREAK_SPARKS = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
  delay: Math.random() * 1.5,
  duration: Math.random() * 1.2 + 0.8, // 0.8s to 2s
  drift: Math.random() * 24 - 12, // -12px to 12px
}));

const STREAK_POP_PARTICLES = Array.from({ length: 14 }).map((_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const velocity = Math.random() * 35 + 25; // pixels to travel
  return {
    id: i,
    x: Math.cos(angle) * velocity,
    y: Math.sin(angle) * velocity,
    size: Math.random() * 4 + 2.5,
  };
});

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    user, 
    leaderboard,
    remindersEnabled,
    reminderTime,
    setReminderTime,
    toggleReminders,
    sendTestNotification,
    notificationPermission,
    requestNotificationPermission,
    selectedLanguage,
    dailyGoalMinutes,
    dailyPracticeMinutes,
    updateDailyGoal,
    addPracticeTime
  } = useApp();

  // --- STREAK COUNTER POP ANIMATION TRIGGER ---
  const [prevStreak, setPrevStreak] = React.useState<number>(profile?.dailyStreak || 0);
  const [triggerStreakPop, setTriggerStreakPop] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (profile) {
      if (profile.dailyStreak > prevStreak) {
        setTriggerStreakPop(true);
        const timer = setTimeout(() => setTriggerStreakPop(false), 1500);
        setPrevStreak(profile.dailyStreak);
        return () => clearTimeout(timer);
      } else if (profile.dailyStreak !== prevStreak) {
        setPrevStreak(profile.dailyStreak);
      }
    }
  }, [profile?.dailyStreak, prevStreak]);

  // --- SHARE PROGRESS & BADGES FEATURE ---
  const [activeShareBadge, setActiveShareBadge] = React.useState<Badge | null>(null);
  const [isSharingOverall, setIsSharingOverall] = React.useState<boolean>(false);
  const [customMessage, setCustomMessage] = React.useState<string>('');
  const [simulatingPlatform, setSimulatingPlatform] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isSharedSuccess, setIsSharedSuccess] = React.useState<boolean>(false);

  const handleOpenBadgeShare = (badge: Badge) => {
    setActiveShareBadge(badge);
    setIsSharingOverall(false);
    setCustomMessage(`I just unlocked the '${badge.title}' badge on LingoLocal! 🏆 "${badge.description}" Practice professional course modules with structured lessons, pronunciation audio, and a Gemini AI conversation tutor! 🚀`);
    setSimulatingPlatform(null);
    setIsCopied(false);
    setIsSharedSuccess(false);
  };

  const handleOpenOverallShare = () => {
    setActiveShareBadge(null);
    setIsSharingOverall(true);
    setCustomMessage(`I'm practicing local dialect courses on LingoLocal! 📚 I have earned ${profile?.xp || 0} XP and a ${profile?.dailyStreak || 0}-day study streak! Join my learning journey! 🚀`);
    setSimulatingPlatform(null);
    setIsCopied(false);
    setIsSharedSuccess(false);
  };

  const handleSimulateShare = (platform: string) => {
    setSimulatingPlatform(platform);
    setIsCopied(false);
    setIsSharedSuccess(false);

    if (platform === 'copy') {
      navigator.clipboard.writeText(customMessage).then(() => {
        setSimulatingPlatform(null);
        setIsSharedSuccess(true);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }).catch(err => {
        console.error("Failed to copy:", err);
        setSimulatingPlatform(null);
        setIsSharedSuccess(true);
      });
    } else {
      setTimeout(() => {
        setSimulatingPlatform(null);
        setIsSharedSuccess(true);
      }, 1200);
    }
  };

  if (!profile || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-xl font-bold text-gray-900">Please sign in to view your dashboard.</h3>
      </div>
    );
  }

  const [dismissedPrompt, setDismissedPrompt] = React.useState(() => {
    return localStorage.getItem('reminder_prompt_dismissed') === 'true';
  });

  const handleDismissPrompt = () => {
    localStorage.setItem('reminder_prompt_dismissed', 'true');
    setDismissedPrompt(true);
  };

  const handleEnableRemindersFromPrompt = async () => {
    await requestNotificationPermission();
    handleDismissPrompt();
  };

  // Level progression calculations
  const currentLevelXp = (profile.level - 1) * (profile.level - 1) * 100;
  const nextLevelXp = (profile.level) * (profile.level) * 100;
  const levelXpDiff = nextLevelXp - currentLevelXp;
  const userProgressXp = profile.xp - currentLevelXp;
  const progressPercent = Math.min(100, Math.max(0, (userProgressXp / levelXpDiff) * 100));

  // Daily goal circular progress ring calculations
  const goalPercentage = Math.min(100, Math.round((dailyPracticeMinutes / dailyGoalMinutes) * 100));
  const isGoalAchieved = dailyPracticeMinutes >= dailyGoalMinutes;
  const ringSize = 120;
  const ringStrokeWidth = 8;
  const ringRadius = (ringSize - ringStrokeWidth) / 2;
  const ringCircumference = ringRadius * 2 * Math.PI;
  const ringStrokeDashoffset = ringCircumference - (goalPercentage / 100) * ringCircumference;

  // Dynamically resolve icon from string
  const renderBadgeIcon = (iconName: string, colorClass: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || Award;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Daily Reminders Opt-in Banner */}
      {!remindersEnabled && !dismissedPrompt && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 overflow-hidden"
        >
          <div className="relative rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <Bell className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
                  <span>Enable Daily Reminders!</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 tracking-wide uppercase">
                    New Feature
                  </span>
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Want to master <strong className="text-gray-900 capitalize">{selectedLanguage}</strong> faster? Receive friendly daily nudges at your preferred hour and keep your <strong className="text-orange-600">{profile.dailyStreak}-day streak</strong> burning!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-start md:self-center">
              <button
                onClick={handleEnableRemindersFromPrompt}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-md shadow-emerald-600/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Enable Reminders
              </button>
              <button
                onClick={handleDismissPrompt}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 px-5 py-3 text-sm font-bold text-gray-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Welcome Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome back, {profile.username}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track your progress, view achievements, and check the daily leaderboards.</p>
      </div>

      {/* Grid Layout: User Stats & Progress */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left 2 Columns: Profile & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Summary & Level Up Progress bar */}
          <div className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-gray-50 dark:border-slate-800">
              {/* User Identity Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-emerald-500 shadow-md">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-2xl">
                        {profile.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-[10px] font-black text-white border-2 border-white dark:border-slate-900 shadow">
                    Lvl {profile.level}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">{profile.username}</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-400 font-semibold">{user.email}</p>
                  <button
                    onClick={handleOpenOverallShare}
                    className="mt-1.5 flex items-center space-x-1 px-2.5 py-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100/80 rounded-lg transition-all cursor-pointer shadow-sm border border-emerald-100 dark:border-emerald-800/40"
                    title="Share Overall Progress Milestone"
                  >
                    <LucideIcons.Share2 className="h-3 w-3" />
                    <span>Share Progress</span>
                  </button>
                </div>
              </div>

              {/* Numerical Counters */}
              <div className="flex items-center space-x-6 sm:space-x-8">
                <div className="text-center">
                  <span className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider block">XP Earned</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">{profile.xp}</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Streak</span>
                  <div className="relative flex items-center justify-center space-x-1.5 mt-0.5">
                    {/* Flame graphics container */}
                    <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
                      {/* Flame Glow Layer */}
                      <motion.div
                        className="absolute h-8 w-8 rounded-full bg-orange-500/25 blur-lg"
                        animate={{
                          scale: triggerStreakPop ? [1, 2, 1] : [1, 1.25, 1],
                          opacity: triggerStreakPop ? [0.6, 0.9, 0.6] : [0.5, 0.7, 0.5],
                        }}
                        transition={{
                          duration: triggerStreakPop ? 1.2 : 2,
                          repeat: triggerStreakPop ? 0 : Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Outer Flame shape */}
                      <motion.div
                        className="absolute bottom-1.5 w-5 h-7 bg-gradient-to-t from-red-600 via-orange-500 to-amber-400 rounded-b-full rounded-tl-full rounded-tr-[40%] origin-bottom"
                        style={{ rotate: "45deg" }}
                        animate={triggerStreakPop ? {
                          scale: [1, 1.6, 1],
                          rotate: ["45deg", "30deg", "60deg", "45deg"],
                          skewX: [-10, 10, -5, 5, 0],
                        } : {
                          scaleY: [1, 1.15, 0.95, 1.1, 1],
                          scaleX: [1, 0.95, 1.05, 0.98, 1],
                          skewX: [-4, 4, -3, 3, 0],
                        }}
                        transition={triggerStreakPop ? {
                          duration: 1.2,
                          ease: "easeOut",
                        } : {
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Middle Flame Shape */}
                      <motion.div
                        className="absolute bottom-1.5 w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-300 rounded-b-full rounded-tl-full rounded-tr-[35%] origin-bottom z-10"
                        style={{ rotate: "45deg" }}
                        animate={triggerStreakPop ? {
                          scale: [1, 1.5, 1],
                          rotate: ["45deg", "25deg", "55deg", "45deg"],
                        } : {
                          scaleY: [1, 1.2, 0.9, 1.15, 1],
                          scaleX: [1, 0.9, 1.1, 0.95, 1],
                          skewX: [3, -3, 2, -2, 0],
                        }}
                        transition={triggerStreakPop ? {
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.05,
                        } : {
                          duration: 1.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.1,
                        }}
                      />

                      {/* Inner Flame Core */}
                      <motion.div
                        className="absolute bottom-2 w-2 h-3.5 bg-white rounded-b-full rounded-tl-full rounded-tr-[30%] origin-bottom z-20"
                        style={{ rotate: "45deg" }}
                        animate={triggerStreakPop ? {
                          scale: [1, 1.4, 1],
                        } : {
                          scaleY: [1, 1.25, 0.85, 1.1, 1],
                          scaleX: [1, 0.85, 1.15, 0.9, 1],
                        }}
                        transition={triggerStreakPop ? {
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.1,
                        } : {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />

                      {/* Continuous Sparks */}
                      {STREAK_SPARKS.map((spark) => (
                        <motion.div
                          key={spark.id}
                          className="absolute bg-amber-300 rounded-full z-10"
                          style={{
                            width: spark.size,
                            height: spark.size,
                            left: '50%',
                            bottom: '20%',
                          }}
                          animate={{
                            y: [-5, -35],
                            x: [0, spark.drift],
                            opacity: [0, 0.9, 0],
                            scale: [1, 1.3, 0.4],
                          }}
                          transition={{
                            duration: spark.duration,
                            repeat: Infinity,
                            delay: spark.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}

                      {/* Explosive Pop Sparks */}
                      <AnimatePresence>
                        {triggerStreakPop && (
                          <>
                            {STREAK_POP_PARTICLES.map((p) => (
                              <motion.div
                                key={`pop-${p.id}`}
                                className="absolute bg-gradient-to-tr from-amber-400 to-red-500 rounded-full shadow-lg shadow-orange-500/50 z-30"
                                style={{
                                  width: p.size,
                                  height: p.size,
                                  left: '50%',
                                  top: '40%',
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                  x: p.x,
                                  y: p.y,
                                  opacity: 0,
                                  scale: 0.2,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.span 
                      className="text-2xl font-black block text-orange-600 tracking-tight"
                      animate={triggerStreakPop ? {
                        scale: [1, 1.4, 0.95, 1.15, 1],
                        rotate: [0, -7, 7, -5, 0],
                        color: ["#ea580c", "#f97316", "#f59e0b", "#f97316", "#ea580c"]
                      } : {}}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      {profile.dailyStreak} d
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* XP ProgressBar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                <span>Level {profile.level}</span>
                <span>Level {profile.level + 1}</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-gray-100 overflow-hidden relative">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-bold text-gray-400">
                  {userProgressXp} / {levelXpDiff} XP in current level
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {Math.round(progressPercent)}% completed
                </span>
              </div>
            </div>
          </div>

          {/* Badges Cabinet */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Award className="h-5.5 w-5.5 text-emerald-500" />
              <span>Earned Achievements</span>
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {AVAILABLE_BADGES.map((badge) => {
                const isEarned = profile.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all ${
                      isEarned 
                        ? 'border-gray-100 bg-white shadow-sm hover:shadow-md' 
                        : 'border-gray-50 bg-gray-50/50'
                    }`}
                  >
                    {/* Badge Circular Emblem */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner mb-4 transition-all ${
                      isEarned 
                        ? `bg-gradient-to-tr ${badge.color} scale-105 shadow-md` 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isEarned ? (
                        renderBadgeIcon(badge.icon, badge.color)
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    <h4 className={`text-sm font-bold leading-tight ${isEarned ? 'text-gray-900' : 'text-gray-400'}`}>
                      {badge.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                      {badge.description}
                    </p>

                    {isEarned && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBadgeShare(badge);
                        }}
                        className="mt-3.5 flex items-center justify-center space-x-1 px-2.5 py-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl cursor-pointer shadow-sm shadow-emerald-50/30 border border-emerald-100/50"
                        title={`Share ${badge.title} Achievement`}
                      >
                        <LucideIcons.Share2 className="h-3 w-3" />
                        <span>Share Badge</span>
                      </button>
                    )}

                    {isEarned && (
                      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 shadow" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Milestones Progress Tracker */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                <span>Unlockable Milestone Progress</span>
              </h4>
              
              <div className="space-y-4">
                {/* Milestone 1: 10 Lessons Completed */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">Milestone 1</span>
                    <h5 className="text-sm font-bold text-gray-900 mt-1">Decathlete (10 Lessons Completed)</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Complete structured lessons in Marathi, Hindi, or English to unlock this badge.</p>
                  </div>
                  <div className="sm:w-48 w-full shrink-0 space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-gray-500">
                      <span>{profile.completedLessons?.length || 0} / 10 lessons</span>
                      <span>{Math.round(Math.min(100, ((profile.completedLessons?.length || 0) / 10) * 100))}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, ((profile.completedLessons?.length || 0) / 10) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Milestone 2: Fluency Level 1 (Level 3) */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">Milestone 2</span>
                    <h5 className="text-sm font-bold text-gray-900 mt-1">Fluency Level 1 (Reach Level 3)</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Earn XP by practicing word cards, answering perfect quizzes, or speaking in practice cards.</p>
                  </div>
                  <div className="sm:w-48 w-full shrink-0 space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-gray-500">
                      <span>Level {profile.level} / 3</span>
                      <span>{Math.round(Math.min(100, (profile.level / 3) * 100))}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (profile.level / 3) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Milestone 3: 3-Day Streak */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">Milestone 3</span>
                    <h5 className="text-sm font-bold text-gray-900 mt-1">Day Tripper (3-Day Streak)</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Keep your daily learning streak alive by practicing every day.</p>
                  </div>
                  <div className="sm:w-48 w-full shrink-0 space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-gray-500">
                      <span>{profile.dailyStreak || 0} / 3 days</span>
                      <span>{Math.round(Math.min(100, ((profile.dailyStreak || 0) / 3) * 100))}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, ((profile.dailyStreak || 0) / 3) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Leaderboard / Competitive Rail */}
        <div className="space-y-8">
          {/* Daily Learning Goal & Progress Ring Card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-emerald-500" />
                <span>Daily Learning Goal</span>
              </h3>
              {isGoalAchieved && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 tracking-wide uppercase animate-bounce">
                  Achieved! 🎉
                </span>
              )}
            </div>

            {/* Circular Progress Ring & Stats */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
                <svg
                  width={ringSize}
                  height={ringSize}
                  className="transform -rotate-90"
                >
                  {/* Background Circle */}
                  <circle
                    stroke="#f3f4f6"
                    fill="transparent"
                    strokeWidth={ringStrokeWidth}
                    r={ringRadius}
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                  />
                  {/* Foreground Animated Circle */}
                  <motion.circle
                    stroke={isGoalAchieved ? '#10b981' : '#34d399'}
                    fill="transparent"
                    strokeWidth={ringStrokeWidth}
                    strokeDasharray={ringCircumference}
                    initial={{ strokeDashoffset: ringCircumference }}
                    animate={{ strokeDashoffset: ringStrokeDashoffset }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    strokeLinecap="round"
                    r={ringRadius}
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                  />
                </svg>

                {/* Inner label */}
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-gray-900">
                    {goalPercentage}%
                  </span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wide">
                    completed
                  </span>
                </div>
              </div>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-sm font-extrabold text-gray-800">
                  {dailyPracticeMinutes} / {dailyGoalMinutes} minutes practiced today
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {isGoalAchieved 
                    ? "Incredible job! You've met your daily learning goal." 
                    : `Practice for ${dailyGoalMinutes - dailyPracticeMinutes} more mins to hit your daily goal!`
                  }
                </p>
              </div>
            </div>

            {/* Configurable selector (5, 15, 30 minutes) */}
            <div className="space-y-2">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                Adjust Daily Goal
              </span>
              <div className="flex justify-around bg-gray-50 p-1 rounded-2xl border border-gray-100">
                {[5, 15, 30].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => updateDailyGoal(mins)}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                      dailyGoalMinutes === mins
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Practice logging buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-50">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                Quick Log / Practice Simulator
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => addPracticeTime(1)}
                  className="flex-1 py-2 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/20 text-gray-700 hover:text-emerald-600 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  +1 min
                </button>
                <button
                  onClick={() => addPracticeTime(5)}
                  className="flex-1 py-2 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/20 text-gray-700 hover:text-emerald-600 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  +5 min
                </button>
                <button
                  onClick={() => addPracticeTime(10)}
                  className="flex-1 py-2 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/20 text-gray-700 hover:text-emerald-600 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  +10 min
                </button>
                <button
                  onClick={() => addPracticeTime(-dailyPracticeMinutes)}
                  className="px-3 py-2 border border-red-100 hover:border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer"
                  title="Reset today's progress"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Daily Learning Reminders Settings Card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h3 className="text-lg font-black text-gray-900 flex items-center space-x-2">
                <Bell className="h-5 w-5 text-emerald-500" />
                <span>Daily Reminders</span>
              </h3>
              
              {/* Toggle Switch */}
              <button
                onClick={() => toggleReminders(!remindersEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  remindersEnabled ? 'bg-emerald-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    remindersEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {remindersEnabled ? (
              <div className="space-y-4">
                {/* Reminder Settings Active State */}
                <div className="rounded-2xl bg-emerald-50/40 border border-emerald-100/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Selected Language</span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full capitalize">
                      {selectedLanguage}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Reminder Hour</span>
                    
                    {/* Select Time Dropdown */}
                    <select
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="06:00">06:00 AM (Early Bird)</option>
                      <option value="08:00">08:00 AM (Morning Study)</option>
                      <option value="10:00">10:00 AM (Late Morning)</option>
                      <option value="12:00">12:00 PM (Lunch Break)</option>
                      <option value="15:00">03:00 PM (Afternoon Dip)</option>
                      <option value="18:00">06:00 PM (Commute / Evening)</option>
                      <option value="20:00">08:00 PM (After Dinner)</option>
                      <option value="22:00">10:00 PM (Before Bed)</option>
                    </select>
                  </div>
                </div>

                {/* Display Current Browser Permission Info */}
                <div className="flex items-start space-x-2 text-xs text-gray-500">
                  {notificationPermission === 'granted' ? (
                    <>
                      <div className="h-4 w-4 shrink-0 text-emerald-500 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p>Standard browser notifications are fully active and configured.</p>
                    </>
                  ) : notificationPermission === 'denied' ? (
                    <>
                      <div className="h-4 w-4 shrink-0 text-amber-500 flex items-center justify-center mt-0.5">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <p>
                        Notifications are blocked by your browser. Please allow them in your browser settings to receive real push alerts.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="h-4.5 w-4.5 shrink-0 text-gray-400 flex items-center justify-center animate-pulse mt-0.5">
                        <Bell className="h-4 w-4" />
                      </div>
                      <p className="flex-1">
                        Notifications permission not requested yet. Click the test button to authorize or trigger a simulation.
                      </p>
                    </>
                  )}
                </div>

                {/* Send Test Notification Button */}
                <button
                  onClick={sendTestNotification}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-black text-xs py-3.5 px-4 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Bell className="h-4 w-4 shrink-0" />
                  <span>Send Test Notification</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-gray-400">Daily learning notifications are currently turned off.</p>
                <button
                  onClick={() => toggleReminders(true)}
                  className="mt-3 inline-flex items-center space-x-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-2 px-3.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Enable Reminders</span>
                </button>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Trophy className="h-5.5 w-5.5 text-yellow-500" />
              <span>Leaderboard (Top 10)</span>
            </h3>

            <div className="space-y-3.5">
              {leaderboard.slice(0, 10).map((entry, idx) => {
                const isCurrentUser = entry.uid === user.uid;
                
                // Medal style indicators
                let rankEmblem = 'text-gray-400 font-bold bg-gray-50';
                if (idx === 0) rankEmblem = 'bg-yellow-500 text-white';
                if (idx === 1) rankEmblem = 'bg-gray-300 text-gray-800';
                if (idx === 2) rankEmblem = 'bg-orange-400 text-white';

                return (
                  <div
                    key={entry.uid}
                    className={`flex items-center justify-between rounded-2xl p-3.5 border transition-all ${
                      isCurrentUser 
                        ? 'border-emerald-200 bg-emerald-50/30 font-bold' 
                        : 'border-gray-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Rank badge */}
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-inner ${rankEmblem}`}>
                        {idx + 1}
                      </span>

                      {/* Display name */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 tracking-tight">
                          {entry.username} {isCurrentUser && <span className="text-[10px] text-emerald-600 font-extrabold">(You)</span>}
                        </h4>
                        <div className="flex items-center space-x-1.5 text-[9px] text-gray-400 font-semibold mt-0.5">
                          <span>{entry.selectedLanguage}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Flame className="h-3 w-3 fill-current text-orange-500 mr-0.5" />
                            {entry.dailyStreak} streak
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-gray-900">{entry.xp} XP</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold">Level {entry.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- RECENT ACHIEVEMENT / PROGRESS SHARING MODAL --- */}
      <AnimatePresence>
        {(activeShareBadge || isSharingOverall) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveShareBadge(null);
                setIsSharingOverall(false);
              }}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Left Side: Dynamic Visual Card Preview */}
              <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-950 text-white flex flex-col justify-between relative overflow-hidden min-h-[320px] md:min-h-auto">
                {/* Decorative glowing background gradients */}
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-500/15 blur-3xl" />

                {/* Card Header branding */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="h-6 w-6 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-xs text-white">L</div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">LingoLocal</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Achievement Unlocked
                  </span>
                </div>

                {/* Card Main: Enlarged Badge or Milestone Graphic */}
                <div className="relative my-6 flex flex-col items-center text-center">
                  {activeShareBadge ? (
                    <>
                      {/* Big Glowing Badge Icon */}
                      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr ${activeShareBadge.color} shadow-lg shadow-emerald-500/20 mb-4 ring-4 ring-white/10 animate-bounce`}>
                        {renderBadgeIcon(activeShareBadge.icon, activeShareBadge.color)}
                      </div>
                      <h4 className="text-lg font-black tracking-tight text-white mb-1.5">{activeShareBadge.title}</h4>
                      <p className="text-xs text-gray-300 px-4 leading-relaxed max-w-[240px]">{activeShareBadge.description}</p>
                    </>
                  ) : (
                    <>
                      {/* Big Learning Progress Graphic */}
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20 mb-4 ring-4 ring-white/10 relative">
                        <TrendingUp className="h-10 w-10 text-white" />
                        <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-400 animate-pulse" />
                      </div>
                      <h4 className="text-lg font-black tracking-tight text-white mb-1.5">Learning Milestones</h4>
                      <div className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-xl py-1.5 px-3.5 text-xs font-bold text-emerald-300">
                        <div className="text-center">
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Level</span>
                          <span>{profile.level}</span>
                        </div>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <div className="text-center">
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider block">XP</span>
                          <span>{profile.xp}</span>
                        </div>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <div className="text-center flex items-center justify-center flex-col">
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Streak</span>
                          <span className="flex items-center text-orange-400">
                            <Flame className="h-3.5 w-3.5 fill-current mr-0.5" />
                            {profile.dailyStreak}d
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Footer: User Tag */}
                <div className="relative border-t border-white/10 pt-3.5 flex items-center space-x-2.5">
                  <div className="h-9 w-9 overflow-hidden rounded-xl bg-white/10 border border-white/20">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="h-full w-full object-cover animate-fade-in" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-500 text-white font-extrabold text-sm">
                        {profile.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-black tracking-tight block text-white">{profile.username}</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Language Explorer</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Share Configuration */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Title & Close */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Share to Socials</h3>
                    <button
                      onClick={() => {
                        setActiveShareBadge(null);
                        setIsSharingOverall(false);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                    >
                      <LucideIcons.X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Message editor */}
                  <div className="space-y-1.5 mb-6">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                      Customize message
                    </label>
                    <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200/80 bg-gray-50/50 p-3.5 text-xs text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none h-24"
                      placeholder="Add a comment..."
                    />
                  </div>

                  {/* Platform List */}
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                      Select Platform
                    </span>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* X (Twitter) */}
                      <button
                        disabled={simulatingPlatform !== null}
                        onClick={() => handleSimulateShare('X')}
                        className="flex items-center space-x-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 p-3 text-left transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-lg bg-black text-white flex items-center justify-center font-extrabold text-[10px]">𝕏</div>
                        <span className="text-xs font-bold text-gray-800">X / Twitter</span>
                      </button>

                      {/* LinkedIn */}
                      <button
                        disabled={simulatingPlatform !== null}
                        onClick={() => handleSimulateShare('LinkedIn')}
                        className="flex items-center space-x-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 p-3 text-left transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-lg bg-[#0077b5] text-white flex items-center justify-center font-extrabold text-[10px]">in</div>
                        <span className="text-xs font-bold text-gray-800">LinkedIn</span>
                      </button>

                      {/* WhatsApp */}
                      <button
                        disabled={simulatingPlatform !== null}
                        onClick={() => handleSimulateShare('WhatsApp')}
                        className="flex items-center space-x-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 p-3 text-left transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-lg bg-[#25d366] text-white flex items-center justify-center font-bold text-xs">💬</div>
                        <span className="text-xs font-bold text-gray-800">WhatsApp</span>
                      </button>

                      {/* Facebook */}
                      <button
                        disabled={simulatingPlatform !== null}
                        onClick={() => handleSimulateShare('Facebook')}
                        className="flex items-center space-x-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 p-3 text-left transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-lg bg-[#1877f2] text-white flex items-center justify-center font-extrabold text-xs">f</div>
                        <span className="text-xs font-bold text-gray-800">Facebook</span>
                      </button>
                    </div>

                    {/* Copy Link to clipboard */}
                    <button
                      disabled={simulatingPlatform !== null}
                      onClick={() => handleSimulateShare('copy')}
                      className="w-full mt-2 flex items-center justify-center space-x-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 p-3 transition-colors active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <LucideIcons.Check className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-black text-emerald-700">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <LucideIcons.Copy className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-700">Copy shareable link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulated sharing feedback banner */}
                <div className="mt-6 pt-4 border-t border-gray-50">
                  {simulatingPlatform && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-center space-x-3 text-emerald-800">
                      <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="text-xs font-bold">Simulating post connection to {simulatingPlatform}...</span>
                    </div>
                  )}

                  {isSharedSuccess && !simulatingPlatform && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 text-center"
                    >
                      <div className="flex items-center justify-center space-x-1 text-emerald-700 mb-0.5">
                        <LucideIcons.CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                        <span className="text-xs font-black">Success! Milestone Shared!</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 leading-relaxed">
                        Your achievement card and text message were posted to the chosen stream.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
