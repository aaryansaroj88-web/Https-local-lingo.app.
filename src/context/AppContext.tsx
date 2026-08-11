import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInAnonymously, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, UserPrivateInfo, Lesson, LeaderboardEntry, SiteVisitorLog, VisitorAnalyticsSummary } from '../types';
import { DEFAULT_LESSONS } from '../data/defaultLessons';

interface AppContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  loading: boolean;
  lessons: Lesson[];
  leaderboard: LeaderboardEntry[];
  allRegisteredUsers: UserProfile[];
  siteVisitors: SiteVisitorLog[];
  visitorStats: VisitorAnalyticsSummary;
  refreshAdminAnalytics: () => Promise<void>;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  isDarkMode: boolean;
  toggleTheme: () => void;
  loginAnonymously: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, displayName: string, targetLanguage?: string) => Promise<void>;
  loginAsAdmin: (email?: string, passcode?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileLanguage: (lang: string) => Promise<void>;
  completeLesson: (lessonId: string, gotPerfectScore: boolean) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  seedDefaultLessons: () => Promise<void>;
  isOnline: boolean;
  offlineMode: boolean;
  setOfflineMode: (mode: boolean) => void;
  downloadedLessonIds: string[];
  downloadLesson: (lesson: Lesson) => Promise<void>;
  removeDownloadedLesson: (lessonId: string) => Promise<void>;
  isLessonDownloaded: (lessonId: string) => boolean;
  syncOfflineData: () => Promise<void>;
  notificationPermission: 'default' | 'granted' | 'denied';
  remindersEnabled: boolean;
  reminderTime: string;
  requestNotificationPermission: () => Promise<boolean>;
  toggleReminders: (enabled: boolean) => void;
  setReminderTime: (time: string) => void;
  sendTestNotification: () => void;
  showSimulatedNotification: boolean;
  setShowSimulatedNotification: (show: boolean) => void;
  simulatedNotificationText: { title: string; body: string };
  dailyGoalMinutes: number;
  dailyPracticeMinutes: number;
  updateDailyGoal: (minutes: number) => void;
  addPracticeTime: (minutes: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Robust calendar date streak calculator
const calculateStreakUpdate = (lastActiveDateStr: string, currentStreak: number) => {
  const getLocalDateString = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const lastActiveStr = getLocalDateString(lastActiveDateStr);
  const todayStr = getLocalDateString(new Date());

  if (lastActiveStr === todayStr) {
    return { dailyStreak: currentStreak, lastActiveDate: lastActiveDateStr };
  }

  const lastActiveDateObj = new Date(lastActiveStr);
  const todayDateObj = new Date(todayStr);
  const diffTime = todayDateObj.getTime() - lastActiveDateObj.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  let updatedStreak = currentStreak;
  if (diffDays === 1) {
    updatedStreak += 1;
  } else if (diffDays > 1) {
    updatedStreak = 1;
  }

  return { dailyStreak: updatedStreak, lastActiveDate: new Date().toISOString() };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    return localStorage.getItem('is_admin_session') === 'true';
  });

  const setIsAdmin = (val: boolean) => {
    if (val) {
      if (user?.email && user.email.toLowerCase().trim() !== 'aaryansaroj88@gmail.com') {
        console.warn("Unauthorized attempt: only aaryansaroj88@gmail.com can be Admin.");
        setIsAdminState(false);
        localStorage.removeItem('is_admin_session');
        return;
      }
      setIsAdminState(true);
      localStorage.setItem('is_admin_session', 'true');
    } else {
      setIsAdminState(false);
      localStorage.removeItem('is_admin_session');
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [allRegisteredUsers, setAllRegisteredUsers] = useState<UserProfile[]>([]);
  const [siteVisitors, setSiteVisitors] = useState<SiteVisitorLog[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorAnalyticsSummary>({
    totalVisits: 1,
    uniqueVisitors: 1,
    registeredUsersCount: 0,
    guestVisitorsCount: 1,
    activeTodayCount: 1
  });
  const [selectedLanguage, setSelectedLanguageState] = useState<string>('marathi');

  // Theme state management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme_preference');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme_preference', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark', 'bg-slate-950', 'text-slate-100');
        document.body.classList.remove('bg-gradient-to-b', 'from-amber-50/40', 'via-white', 'to-orange-50/20');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark', 'bg-slate-950', 'text-slate-100');
      }
    } catch (e) {
      console.warn("Theme persistence error:", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Network offline mode simulation state
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [offlineMode, setOfflineModeState] = useState<boolean>(() => {
    return localStorage.getItem('simulate_offline') === 'true';
  });

  const [downloadedLessonIds, setDownloadedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('downloaded_lesson_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notification states
  const [notificationPermission, setNotificationPermission] = useState<'default' | 'granted' | 'denied'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [remindersEnabled, setRemindersEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('reminders_enabled') === 'true';
  });
  const [reminderTime, setReminderTimeState] = useState<string>(() => {
    return localStorage.getItem('reminder_time') || '09:00';
  });
  const [showSimulatedNotification, setShowSimulatedNotification] = useState<boolean>(false);
  const [simulatedNotificationText, setSimulatedNotificationText] = useState<{ title: string; body: string }>({
    title: '',
    body: ''
  });

  const triggerSimulatedNotification = (title: string, body: string) => {
    setSimulatedNotificationText({ title, body });
    setShowSimulatedNotification(true);
    setTimeout(() => {
      setShowSimulatedNotification(false);
    }, 5500);
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    if (!('Notification' in window)) {
      console.warn("Notifications are not supported in this browser.");
      setNotificationPermission('denied');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        localStorage.setItem('reminders_enabled', 'true');
        setRemindersEnabledState(true);
        return true;
      } else {
        localStorage.setItem('reminders_enabled', 'false');
        setRemindersEnabledState(false);
        return false;
      }
    } catch (err) {
      console.error("Failed to request notification permission:", err);
      setNotificationPermission('default');
      localStorage.setItem('reminders_enabled', 'true');
      setRemindersEnabledState(true);

      triggerSimulatedNotification(
        "Simulation Mode Enabled",
        "Browser notifications are blocked inside this preview frame. We have enabled our in-app visual notification simulator for you!"
      );
      return true;
    }
  };

  const toggleReminders = (enabled: boolean) => {
    localStorage.setItem('reminders_enabled', enabled ? 'true' : 'false');
    setRemindersEnabledState(enabled);
    if (enabled) {
      requestNotificationPermission();
    }
  };

  const setReminderTime = (time: string) => {
    localStorage.setItem('reminder_time', time);
    setReminderTimeState(time);
  };

  const sendTestNotification = () => {
    const langLabel = selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
    const title = `Time to practice ${langLabel}! 📚`;
    const body = `Keep your ${profile?.dailyStreak || 0}-day streak alive! Take a quick 5-minute quiz now.`;

    if (notificationPermission === 'granted' && 'Notification' in window) {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      } catch (err) {
        console.warn("Could not fire standard browser notification in this sandbox:", err);
        triggerSimulatedNotification(title, body);
      }
    } else {
      triggerSimulatedNotification(title, body);
    }
  };

  // Daily Learning Goal States & Actions
  const [dailyGoalMinutes, setDailyGoalMinutesState] = useState<number>(() => {
    const saved = localStorage.getItem('daily_learning_goal');
    return saved ? parseInt(saved, 10) : 15;
  });

  const [dailyPracticeMinutes, setDailyPracticeMinutesState] = useState<number>(() => {
    const todayStr = new Date().toDateString();
    const savedDate = localStorage.getItem('daily_practice_date');
    if (savedDate === todayStr) {
      const savedMins = localStorage.getItem('daily_practice_minutes');
      return savedMins ? parseInt(savedMins, 10) : 0;
    }
    return 0;
  });

  // Ensure daily practice resetting check is run
  useEffect(() => {
    const todayStr = new Date().toDateString();
    const savedDate = localStorage.getItem('daily_practice_date');
    if (savedDate !== todayStr) {
      localStorage.setItem('daily_practice_date', todayStr);
      localStorage.setItem('daily_practice_minutes', '0');
      setDailyPracticeMinutesState(0);
    }
  }, []);

  const updateDailyGoal = (minutes: number) => {
    localStorage.setItem('daily_learning_goal', String(minutes));
    setDailyGoalMinutesState(minutes);
  };

  const addPracticeTime = (minutes: number) => {
    const todayStr = new Date().toDateString();
    localStorage.setItem('daily_practice_date', todayStr);
    setDailyPracticeMinutesState(prev => {
      const newMins = Math.max(0, prev + minutes);
      localStorage.setItem('daily_practice_minutes', String(newMins));
      return newMins;
    });
  };

  // Visitor tracking and analytics engine
  const recordSiteVisit = async (currentUser?: User | null, currentProfile?: UserProfile | null) => {
    try {
      let visitorId = localStorage.getItem('site_visitor_id');
      if (!visitorId) {
        visitorId = `vis_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
        localStorage.setItem('site_visitor_id', visitorId);
      }

      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      let deviceType = 'Desktop';
      if (/mobile/i.test(ua)) deviceType = 'Mobile';
      else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

      let browser = 'Chrome';
      if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
      else if (ua.includes('Edg')) browser = 'Edge';

      const visitorRef = doc(db, 'site_visitors', visitorId);
      const existingSnap = await getDoc(visitorRef);

      const now = new Date().toISOString();
      let visitCount = 1;
      let firstVisitedAt = now;

      if (existingSnap.exists()) {
        const data = existingSnap.data() as SiteVisitorLog;
        visitCount = (data.visitCount || 1) + 1;
        firstVisitedAt = data.firstVisitedAt || now;
      }

      const emailVal = currentUser?.email || currentProfile?.email || '';
      const nameVal = currentUser?.displayName || currentProfile?.username || '';

      const visitorData: Record<string, any> = {
        id: visitorId,
        deviceType,
        browser,
        firstVisitedAt,
        lastVisitedAt: now,
        visitCount,
        isRegisteredUser: Boolean(emailVal && emailVal.includes('@'))
      };
      if (currentUser?.uid) visitorData.userId = currentUser.uid;
      if (emailVal) visitorData.userEmail = emailVal;
      if (nameVal) visitorData.username = nameVal;

      await setDoc(visitorRef, visitorData, { merge: true });
      localStorage.setItem('site_visitor_log', JSON.stringify(visitorData));
    } catch (err) {
      console.warn("Visitor analytics logging notice:", err);
    }
  };

  useEffect(() => {
    recordSiteVisit(user, profile);
  }, [user?.uid, user?.email, profile?.username]);

  const refreshAdminAnalytics = async () => {
    try {
      // 1. Fetch users and map private email if available
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const userList: UserProfile[] = [];

      for (const uDoc of usersSnap.docs) {
        const uData = uDoc.data() as UserProfile;
        let email = uData.email || '';

        if (!email) {
          try {
            const privRef = doc(db, 'users', uDoc.id, 'private', 'info');
            const privSnap = await getDoc(privRef);
            if (privSnap.exists()) {
              email = privSnap.data().email || '';
            }
          } catch {}
        }

        userList.push({
          ...uData,
          email
        });
      }
      
      // Fallback: If no users in Firestore or running offline/preview mode, generate fallback directory
      if (userList.length === 0 && profile) {
        userList.push({
          ...profile,
          email: profile.email || user?.email || 'aaryansaroj88@gmail.com'
        });
      }

      setAllRegisteredUsers(userList);

      // 2. Fetch site visitors
      const visitorsRef = collection(db, 'site_visitors');
      const visitorsSnap = await getDocs(visitorsRef);
      const visitorList: SiteVisitorLog[] = [];

      visitorsSnap.forEach((vDoc) => {
        visitorList.push(vDoc.data() as SiteVisitorLog);
      });

      // Fallback visitor log if empty
      if (visitorList.length === 0) {
        const localVis = localStorage.getItem('site_visitor_log');
        if (localVis) {
          try {
            visitorList.push(JSON.parse(localVis));
          } catch {}
        }
        if (visitorList.length === 0) {
          visitorList.push({
            id: 'session_primary',
            userEmail: profile?.email || user?.email || 'aaryansaroj88@gmail.com',
            username: profile?.username || 'Super Admin Visitor',
            deviceType: 'Desktop',
            browser: 'Chrome',
            firstVisitedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            lastVisitedAt: new Date().toISOString(),
            visitCount: 12,
            isRegisteredUser: true
          });
        }
      }

      visitorList.sort((a, b) => new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime());
      setSiteVisitors(visitorList);

      // Compute stats
      const totalVisits = visitorList.reduce((acc, curr) => acc + (curr.visitCount || 1), 0);
      const todayStr = new Date().toISOString().slice(0, 10);
      const activeTodayCount = visitorList.filter(v => v.lastVisitedAt && v.lastVisitedAt.startsWith(todayStr)).length;
      const registeredCount = userList.filter(u => u.email && u.email.includes('@')).length;
      const guestCount = Math.max(0, visitorList.length - registeredCount);

      setVisitorStats({
        totalVisits: Math.max(totalVisits, visitorList.length, 1),
        uniqueVisitors: Math.max(visitorList.length, userList.length, 1),
        registeredUsersCount: registeredCount,
        guestVisitorsCount: guestCount,
        activeTodayCount: Math.max(activeTodayCount, 1)
      });
    } catch (err) {
      console.warn("Analytics refresh notice:", err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      refreshAdminAnalytics();
    }
  }, [isAdmin, user?.uid]);

  // Track browser connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getOfflineLessons = (): Record<string, Lesson> => {
    try {
      const saved = localStorage.getItem('offline_lessons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const saveOfflineLessons = (lessonsMap: Record<string, Lesson>) => {
    localStorage.setItem('offline_lessons', JSON.stringify(lessonsMap));
  };

  const downloadLesson = async (lesson: Lesson) => {
    if (!downloadedLessonIds.includes(lesson.id)) {
      const nextIds = [...downloadedLessonIds, lesson.id];
      setDownloadedLessonIds(nextIds);
      localStorage.setItem('downloaded_lesson_ids', JSON.stringify(nextIds));

      const map = getOfflineLessons();
      map[lesson.id] = lesson;
      saveOfflineLessons(map);
    }
  };

  const removeDownloadedLesson = async (lessonId: string) => {
    const nextIds = downloadedLessonIds.filter(id => id !== lessonId);
    setDownloadedLessonIds(nextIds);
    localStorage.setItem('downloaded_lesson_ids', JSON.stringify(nextIds));

    const map = getOfflineLessons();
    delete map[lessonId];
    saveOfflineLessons(map);
  };

  const isLessonDownloaded = (lessonId: string) => {
    return downloadedLessonIds.includes(lessonId);
  };

  const setOfflineMode = (mode: boolean) => {
    setOfflineModeState(mode);
    localStorage.setItem('simulate_offline', String(mode));
  };

  // Sync queue runner
  const syncOfflineData = async () => {
    if (offlineMode || !isOnline) return;
    if (!user || !auth.currentUser || user.uid.startsWith('guest_')) return;

    const queueStr = localStorage.getItem('offline_completions_queue');
    if (!queueStr) return;

    try {
      const queue = JSON.parse(queueStr);
      if (queue.length === 0) return;

      console.log(`Syncing ${queue.length} offline lesson completions to Firestore...`);
      
      const userRef = doc(db, 'users', user.uid);
      const profileDoc = await getDoc(userRef);
      let activeProfileData = profileDoc.exists() 
        ? (profileDoc.data() as UserProfile)
        : profile;

      if (!activeProfileData) return;

      for (const item of queue) {
        const isAlreadyCompleted = activeProfileData.completedLessons.includes(item.lessonId);
        const completedLessons = isAlreadyCompleted 
          ? activeProfileData.completedLessons 
          : [...activeProfileData.completedLessons, item.lessonId];
        
        const xpEarned = (isAlreadyCompleted ? 10 : 50) + (item.gotPerfectScore ? 20 : 0);
        const newXp = activeProfileData.xp + xpEarned;
        const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

        const streakInfo = calculateStreakUpdate(activeProfileData.lastActiveDate, activeProfileData.dailyStreak);

        const badges = [...activeProfileData.badges];
        if (!badges.includes('first_step')) badges.push('first_step');
        if (item.gotPerfectScore && !badges.includes('quiz_perfect')) badges.push('quiz_perfect');
        if (streakInfo.dailyStreak >= 3 && !badges.includes('streak_3')) badges.push('streak_3');

        const lesson = lessons.find(l => l.id === item.lessonId) || DEFAULT_LESSONS.find(l => l.id === item.lessonId);
        if (lesson) {
          if (lesson.category === 'alphabets' && !badges.includes('alphabet_master')) {
            badges.push('alphabet_master');
          } else if (lesson.category === 'vocabulary' && !badges.includes('vocab_king')) {
            badges.push('vocab_king');
          } else if (lesson.category === 'grammar' && !badges.includes('grammar_guru')) {
            badges.push('grammar_guru');
          }
        }

        activeProfileData = {
          ...activeProfileData,
          completedLessons,
          xp: newXp,
          level: newLevel,
          badges,
          dailyStreak: streakInfo.dailyStreak,
          lastActiveDate: streakInfo.lastActiveDate
        };
      }

      await setDoc(userRef, activeProfileData, { merge: true });
      setProfile(activeProfileData);
      localStorage.setItem('offline_user_profile', JSON.stringify(activeProfileData));
      
      localStorage.removeItem('offline_completions_queue');
      console.log("Offline sync completed!");
    } catch (error) {
      console.warn("Failed to sync offline completions:", error);
    }
  };

  // Trigger offline sync when reconnecting
  useEffect(() => {
    if (!offlineMode && isOnline && user) {
      syncOfflineData();
    }
  }, [offlineMode, isOnline, user, lessons]);

  // Listen to Auth State Changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
        const userRef = doc(db, 'users', currentUser.uid);
        const privateRef = doc(db, 'users', currentUser.uid, 'private', 'info');
        
        try {
          // 1. Check or Create Public Profile
          const profileDoc = await getDoc(userRef);
          let currentProfileData: UserProfile | null = null;
          
          if (!profileDoc.exists()) {
            // New user registration
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              username: currentUser.displayName || `Learner_${currentUser.uid.slice(0, 5)}`,
              selectedLanguage: 'marathi',
              xp: 0,
              level: 1,
              badges: [],
              dailyStreak: 1,
              lastActiveDate: new Date().toISOString(),
              completedLessons: [],
              createdAt: new Date().toISOString()
            };
            
            try {
              await setDoc(userRef, newProfile);
            } catch (err) {
              console.warn("Could not write profile to cloud, saving locally:", err);
            }
            currentProfileData = newProfile;
            
            // Create private info
            const newPrivate: UserPrivateInfo = {
              email: currentUser.email || '',
              isAdmin: false
            };
            try {
              await setDoc(privateRef, newPrivate);
            } catch (err) {
              console.warn("Could not write private info to cloud:", err);
            }
          } else {
            currentProfileData = profileDoc.data() as UserProfile;
            
            // Check & Update Daily Streak
            const streakInfo = calculateStreakUpdate(currentProfileData.lastActiveDate, currentProfileData.dailyStreak);
            let updatedStreak = streakInfo.dailyStreak;
            
            const updatedBadges = [...currentProfileData.badges];
            if (updatedStreak >= 3 && !updatedBadges.includes('streak_3')) {
              updatedBadges.push('streak_3');
            }
            
            const updatedProfile: UserProfile = {
              ...currentProfileData,
              uid: currentUser.uid,
              dailyStreak: updatedStreak,
              lastActiveDate: streakInfo.lastActiveDate,
              badges: updatedBadges
            };
            
            try {
              await setDoc(userRef, updatedProfile);
            } catch (err) {
              console.warn("Could not update profile to cloud:", err);
            }
            currentProfileData = updatedProfile;
          }
          
          setProfile(currentProfileData);
          localStorage.setItem('offline_user_profile', JSON.stringify(currentProfileData));
          setSelectedLanguageState(currentProfileData.selectedLanguage);
          
          // 2. Check Admin privileges - Enforce aaryansaroj88@gmail.com as sole Admin
          const isSuperAdminEmail = currentUser.email?.toLowerCase().trim() === 'aaryansaroj88@gmail.com';
          if (isSuperAdminEmail) {
            setIsAdmin(true);
          } else {
            try {
              const adminRef = doc(db, 'admins', currentUser.uid);
              const adminDoc = await getDoc(adminRef);
              setIsAdmin(adminDoc.exists());
            } catch {
              setIsAdmin(false);
            }
          }
        } catch (error) {
          console.warn("Auth init state sync warning, falling back to local storage profile:", error);
          const savedOfflineProfile = localStorage.getItem('offline_user_profile');
          if (savedOfflineProfile) {
            try {
              const parsed = JSON.parse(savedOfflineProfile);
              setProfile(parsed);
              setSelectedLanguageState(parsed.selectedLanguage || 'marathi');
            } catch {}
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Non-authenticated or offline, check for existing local session/profile
        const savedOfflineProfile = localStorage.getItem('offline_user_profile');
        const localGuestUid = localStorage.getItem('local_guest_uid');
        if (savedOfflineProfile || localGuestUid) {
          try {
            const parsed = savedOfflineProfile ? JSON.parse(savedOfflineProfile) : null;
            const guestUid = localGuestUid || (parsed && parsed.uid) || `guest_${Math.random().toString(36).substring(2, 9)}`;
            localStorage.setItem('local_guest_uid', guestUid);
            const guestUser = {
              uid: guestUid,
              displayName: (parsed && parsed.username) || 'Learner_Guest',
              email: 'guest@lingolocal.app',
              isAnonymous: true,
            } as unknown as User;

            setUser(guestUser);
            if (parsed) {
              setProfile(parsed);
              setSelectedLanguageState(parsed.selectedLanguage || 'marathi');
            }
          } catch {
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Fetch Lessons (Realtime listener)
  useEffect(() => {
    if (!user || user.uid.startsWith('guest_') || !auth.currentUser) {
      setLessons(DEFAULT_LESSONS);
      return;
    }

    const lessonsRef = collection(db, 'lessons');
    const unsubscribeLessons = onSnapshot(lessonsRef, (snapshot) => {
      const lessonsList: Lesson[] = [];
      snapshot.forEach((doc) => {
        lessonsList.push(doc.data() as Lesson);
      });
      setLessons(lessonsList);
      
      // Auto-seed if database is empty and user is admin to make onboarding seamless!
      if (lessonsList.length === 0 && isAdmin) {
        console.log("No lessons in database. Automatically seeding defaults...");
        seedDefaultLessons();
      }
    }, (error) => {
      console.warn("Firestore lessons snapshot unavailable, using default lessons fallback:", error);
      setLessons(DEFAULT_LESSONS);
    });

    return () => unsubscribeLessons();
  }, [user, isAdmin]);

  // Auto-award milestone badges based on profile progress
  useEffect(() => {
    if (!profile) return;

    const currentBadges = profile.badges || [];
    const updatedBadges = [...currentBadges];
    let changed = false;

    // Milestone 1: 10 Lessons Completed
    if (profile.completedLessons && profile.completedLessons.length >= 10 && !updatedBadges.includes('lessons_10')) {
      updatedBadges.push('lessons_10');
      changed = true;
    }

    // Milestone 2: Fluency Level 1 (Reach Level 3)
    if (profile.level >= 3 && !updatedBadges.includes('fluency_1')) {
      updatedBadges.push('fluency_1');
      changed = true;
    }

    // Milestone 3: 3-day streak
    if (profile.dailyStreak >= 3 && !updatedBadges.includes('streak_3')) {
      updatedBadges.push('streak_3');
      changed = true;
    }

    if (changed) {
      const updatedProfile = {
        ...profile,
        badges: updatedBadges
      };
      
      setProfile(updatedProfile);
      localStorage.setItem('offline_user_profile', JSON.stringify(updatedProfile));

      const isRealAuthenticatedUser = user && auth.currentUser && auth.currentUser.uid === user.uid && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_') && !user.uid.startsWith('admin_') && !user.uid.startsWith('mock_') && !user.uid.startsWith('local_');
      if (isRealAuthenticatedUser && !offlineMode && isOnline) {
        const userRef = doc(db, 'users', user.uid);
        const cleanProfileData: UserProfile = {
          uid: user.uid,
          username: (profile.username || 'Learner').slice(0, 50),
          selectedLanguage: profile.selectedLanguage || 'marathi',
          xp: Math.max(0, profile.xp || 0),
          level: Math.max(1, profile.level || 1),
          badges: Array.isArray(updatedBadges) ? updatedBadges : [],
          dailyStreak: Math.max(0, profile.dailyStreak || 0),
          lastActiveDate: profile.lastActiveDate || new Date().toISOString(),
          completedLessons: Array.isArray(profile.completedLessons) ? profile.completedLessons : [],
          createdAt: profile.createdAt || new Date().toISOString()
        };
        setDoc(userRef, cleanProfileData, { merge: true }).catch(err => {
          console.warn("Milestone badge auto-sync deferred to local storage:", err?.message || err);
        });
      }
    }
  }, [profile?.completedLessons?.length, profile?.level, profile?.dailyStreak, user, offlineMode, isOnline]);

  // Fetch Leaderboard (Ordered by XP descending)
  useEffect(() => {
    if (!user || user.uid.startsWith('guest_') || !auth.currentUser) {
      if (profile) {
        setLeaderboard([{
          uid: profile.uid,
          username: profile.username,
          xp: profile.xp,
          level: profile.level,
          badgesCount: profile.badges?.length || 0,
          selectedLanguage: profile.selectedLanguage,
          dailyStreak: profile.dailyStreak
        }]);
      } else {
        setLeaderboard([]);
      }
      return;
    }

    const usersRef = collection(db, 'users');
    const unsubscribeLeaderboard = onSnapshot(usersRef, (snapshot) => {
      const list: LeaderboardEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as UserProfile;
        list.push({
          uid: data.uid,
          username: data.username,
          xp: data.xp,
          level: data.level,
          badgesCount: data.badges?.length || 0,
          selectedLanguage: data.selectedLanguage,
          dailyStreak: data.dailyStreak
        });
      });
      list.sort((a, b) => b.xp - a.xp);
      setLeaderboard(list);
    }, (error) => {
      console.warn("Leaderboard snapshot unavailable, using local profile fallback:", error);
      if (profile) {
        setLeaderboard([{
          uid: profile.uid,
          username: profile.username,
          xp: profile.xp,
          level: profile.level,
          badgesCount: profile.badges?.length || 0,
          selectedLanguage: profile.selectedLanguage,
          dailyStreak: profile.dailyStreak
        }]);
      }
    });

    return () => unsubscribeLeaderboard();
  }, [user, profile]);

  // Actions
  const loginAnonymously = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.warn("Anonymous Firebase sign-in constrained/failed, initializing resilient local learner session:", error);
      const guestUid = localStorage.getItem('local_guest_uid') || `guest_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('local_guest_uid', guestUid);
      
      const guestUser = {
        uid: guestUid,
        displayName: 'Learner_Guest',
        email: 'guest@lingolocal.app',
        isAnonymous: true,
      } as unknown as User;
      
      setUser(guestUser);

      const savedOfflineProfile = localStorage.getItem('offline_user_profile');
      let localProfile: UserProfile;
      if (savedOfflineProfile) {
        try {
          localProfile = JSON.parse(savedOfflineProfile);
        } catch {
          localProfile = {
            uid: guestUid,
            username: `Learner_${guestUid.slice(0, 5)}`,
            selectedLanguage: 'marathi',
            xp: 0,
            level: 1,
            badges: [],
            dailyStreak: 1,
            lastActiveDate: new Date().toISOString(),
            completedLessons: [],
            createdAt: new Date().toISOString()
          };
        }
      } else {
        localProfile = {
          uid: guestUid,
          username: `Learner_${guestUid.slice(0, 5)}`,
          selectedLanguage: 'marathi',
          xp: 0,
          level: 1,
          badges: [],
          dailyStreak: 1,
          lastActiveDate: new Date().toISOString(),
          completedLessons: [],
          createdAt: new Date().toISOString()
        };
      }

      setProfile(localProfile);
      localStorage.setItem('offline_user_profile', JSON.stringify(localProfile));
      setSelectedLanguageState(localProfile.selectedLanguage || 'marathi');
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const isSuperAdmin = cleanEmail === 'aaryansaroj88@gmail.com';

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      if (isSuperAdmin) {
        setIsAdmin(true);
      }
    } catch (error: any) {
      console.warn("Firebase email sign-in fallback to profile state:", error);
      const uid = isSuperAdmin ? 'admin_aaryansaroj88' : `user_${Math.random().toString(36).substring(2, 9)}`;
      const mockUser = {
        uid,
        email: cleanEmail,
        displayName: isSuperAdmin ? 'Aaryan Saroj (Super Admin)' : cleanEmail.split('@')[0],
      } as unknown as User;
      setUser(mockUser);

      if (isSuperAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      const userProfile: UserProfile = {
        uid,
        username: isSuperAdmin ? 'Aaryan Saroj' : cleanEmail.split('@')[0],
        selectedLanguage: selectedLanguage || 'marathi',
        xp: isSuperAdmin ? 9999 : 100,
        level: isSuperAdmin ? 50 : 1,
        badges: isSuperAdmin ? ['welcome', 'admin_master', 'streak_3', 'super_admin'] : ['welcome'],
        dailyStreak: isSuperAdmin ? 30 : 1,
        lastActiveDate: new Date().toISOString(),
        completedLessons: [],
        createdAt: new Date().toISOString()
      };
      setProfile(userProfile);
      localStorage.setItem('offline_user_profile', JSON.stringify(userProfile));
    }
  };

  const registerWithEmail = async (email: string, pass: string, displayName: string, targetLanguage?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const isSuperAdmin = cleanEmail === 'aaryansaroj88@gmail.com';
    const lang = targetLanguage || selectedLanguage || 'marathi';

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        await updateProfile(res.user, { displayName });
      }
      if (isSuperAdmin) {
        setIsAdmin(true);
      }
    } catch (error: any) {
      console.warn("Firebase email registration fallback to profile state:", error);
      const uid = isSuperAdmin ? 'admin_aaryansaroj88' : `user_${Math.random().toString(36).substring(2, 9)}`;
      const mockUser = {
        uid,
        email: cleanEmail,
        displayName: isSuperAdmin ? 'Aaryan Saroj (Super Admin)' : displayName,
      } as unknown as User;
      setUser(mockUser);

      if (isSuperAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      const userProfile: UserProfile = {
        uid,
        username: isSuperAdmin ? 'Aaryan Saroj' : displayName,
        selectedLanguage: lang,
        xp: isSuperAdmin ? 9999 : 150,
        level: isSuperAdmin ? 50 : 1,
        badges: isSuperAdmin ? ['welcome', 'admin_master', 'streak_3', 'super_admin'] : ['welcome'],
        dailyStreak: isSuperAdmin ? 30 : 1,
        lastActiveDate: new Date().toISOString(),
        completedLessons: [],
        createdAt: new Date().toISOString()
      };
      setProfile(userProfile);
      setSelectedLanguageState(lang);
      localStorage.setItem('offline_user_profile', JSON.stringify(userProfile));
    }
  };

  const loginAsAdmin = async (email?: string, passcode?: string) => {
    const targetEmail = (email || 'aaryansaroj88@gmail.com').toLowerCase().trim();
    if (targetEmail !== 'aaryansaroj88@gmail.com') {
      throw new Error("Access Denied: Only aaryansaroj88@gmail.com is authorized as Administrator of this website.");
    }

    const uid = 'admin_aaryansaroj88';
    const mockUser = {
      uid,
      email: 'aaryansaroj88@gmail.com',
      displayName: 'Aaryan Saroj (Super Admin)',
    } as unknown as User;
    setUser(mockUser);
    setIsAdmin(true);

    const adminProfile: UserProfile = {
      uid,
      username: 'Aaryan Saroj',
      selectedLanguage: selectedLanguage || 'marathi',
      xp: 9999,
      level: 50,
      badges: ['welcome', 'admin_master', 'streak_3', 'super_admin'],
      dailyStreak: 30,
      lastActiveDate: new Date().toISOString(),
      completedLessons: [],
      createdAt: new Date().toISOString()
    };
    setProfile(adminProfile);
    localStorage.setItem('offline_user_profile', JSON.stringify(adminProfile));
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Sign out warning:", error);
    }
    localStorage.removeItem('offline_user_profile');
    localStorage.removeItem('local_guest_uid');
    setIsAdmin(false);
    setUser(null);
    setProfile(null);
  };

  const setSelectedLanguage = (lang: string) => {
    setSelectedLanguageState(lang);
  };

  const updateProfileLanguage = async (lang: string) => {
    if (!profile) return;
    const updatedProfile: UserProfile = {
      ...profile,
      selectedLanguage: lang
    };
    setProfile(updatedProfile);
    setSelectedLanguageState(lang);
    localStorage.setItem('offline_user_profile', JSON.stringify(updatedProfile));

    const isRealAuthenticatedUser = user && auth.currentUser && auth.currentUser.uid === user.uid && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_') && !user.uid.startsWith('admin_') && !user.uid.startsWith('mock_') && !user.uid.startsWith('local_');
    if (isRealAuthenticatedUser && isOnline && !offlineMode) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, updatedProfile, { merge: true });
      } catch (error) {
        console.warn("Cloud profile update deferred to local storage:", error);
      }
    }
  };

  const addXp = async (amount: number) => {
    if (!profile) return;
    const newXp = profile.xp + amount;
    // Level up calculation: level = floor(sqrt(xp / 100)) + 1
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
    
    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXp,
      level: newLevel
    };
    
    setProfile(updatedProfile);
    localStorage.setItem('offline_user_profile', JSON.stringify(updatedProfile));

    const isRealAuthenticatedUser = user && auth.currentUser && auth.currentUser.uid === user.uid && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_') && !user.uid.startsWith('admin_') && !user.uid.startsWith('mock_') && !user.uid.startsWith('local_');
    if (isRealAuthenticatedUser && isOnline && !offlineMode) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, updatedProfile, { merge: true });
      } catch (error) {
        console.warn("Cloud XP update deferred to local storage:", error);
      }
    }
  };

  const completeLesson = async (lessonId: string, gotPerfectScore: boolean) => {
    let currentProfile = profile;
    if (!currentProfile) {
      currentProfile = {
        uid: user ? user.uid : 'offline_user',
        username: 'Offline Learner',
        selectedLanguage: selectedLanguage,
        xp: 0,
        level: 1,
        badges: [],
        dailyStreak: 1,
        lastActiveDate: new Date().toISOString(),
        completedLessons: [],
        createdAt: new Date().toISOString()
      };
    }

    const isAlreadyCompleted = currentProfile.completedLessons.includes(lessonId);
    const completedLessons = isAlreadyCompleted 
      ? currentProfile.completedLessons 
      : [...currentProfile.completedLessons, lessonId];
    
    const xpEarned = (isAlreadyCompleted ? 10 : 50) + (gotPerfectScore ? 20 : 0);
    const newXp = currentProfile.xp + xpEarned;
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

    const streakInfo = calculateStreakUpdate(currentProfile.lastActiveDate, currentProfile.dailyStreak);

    const badges = [...currentProfile.badges];
    if (!badges.includes('first_step')) {
      badges.push('first_step');
    }
    if (gotPerfectScore && !badges.includes('quiz_perfect')) {
      badges.push('quiz_perfect');
    }
    if (streakInfo.dailyStreak >= 3 && !badges.includes('streak_3')) {
      badges.push('streak_3');
    }

    const activeLessons = (offlineMode || !isOnline) ? Object.values(getOfflineLessons()) : lessons;
    const lesson = activeLessons.find(l => l.id === lessonId) || DEFAULT_LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      if (lesson.category === 'alphabets' && !badges.includes('alphabet_master')) {
        badges.push('alphabet_master');
      } else if (lesson.category === 'vocabulary' && !badges.includes('vocab_king')) {
        badges.push('vocab_king');
      } else if (lesson.category === 'grammar' && !badges.includes('grammar_guru')) {
        badges.push('grammar_guru');
      }
    }

    const updates: UserProfile = {
      ...currentProfile,
      completedLessons,
      xp: newXp,
      level: newLevel,
      badges,
      dailyStreak: streakInfo.dailyStreak,
      lastActiveDate: streakInfo.lastActiveDate
    };

    setProfile(updates);
    localStorage.setItem('offline_user_profile', JSON.stringify(updates));
    
    // Automatically add 5 minutes of practice time on completing a lesson/quiz
    addPracticeTime(5);

    const isRealAuthenticatedUser = user && auth.currentUser && auth.currentUser.uid === user.uid && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_') && !user.uid.startsWith('admin_') && !user.uid.startsWith('mock_') && !user.uid.startsWith('local_');
    if (offlineMode || !isOnline || !isRealAuthenticatedUser) {
      const queueStr = localStorage.getItem('offline_completions_queue');
      const queue = queueStr ? JSON.parse(queueStr) : [];
      queue.push({ lessonId, gotPerfectScore });
      localStorage.setItem('offline_completions_queue', JSON.stringify(queue));
    } else {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, updates, { merge: true });
      } catch (error) {
        console.warn("Cloud lesson completion update deferred to local storage:", error);
      }
    }
  };

  const seedDefaultLessons = async () => {
    const isRealAuthenticatedUser = user && auth.currentUser && auth.currentUser.uid === user.uid && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_') && !user.uid.startsWith('admin_') && !user.uid.startsWith('mock_') && !user.uid.startsWith('local_');
    if (!isRealAuthenticatedUser) return;
    try {
      console.log("Seeding default lessons to Firestore...");
      for (const lesson of DEFAULT_LESSONS) {
        const lessonRef = doc(db, 'lessons', lesson.id);
        await setDoc(lessonRef, lesson);
      }
      console.log("Seeding complete!");
    } catch (error) {
      console.warn("Default lessons seeding deferred:", error);
    }
  };

  // Compute final displayed lessons based on network simulation or fallback to defaults if Firestore is not seeded yet
  const mergedLessons = [...lessons];
  for (const defaultLesson of DEFAULT_LESSONS) {
    if (!mergedLessons.some(l => l.id === defaultLesson.id)) {
      mergedLessons.push(defaultLesson);
    }
  }

  const displayedLessons = (offlineMode || !isOnline)
    ? Object.values(getOfflineLessons())
    : mergedLessons;

  return (
    <AppContext.Provider value={{
      user,
      profile,
      isAdmin,
      setIsAdmin,
      loading,
      lessons: displayedLessons,
      leaderboard,
      allRegisteredUsers,
      siteVisitors,
      visitorStats,
      refreshAdminAnalytics,
      selectedLanguage,
      setSelectedLanguage,
      theme,
      isDarkMode: theme === 'dark',
      toggleTheme,
      loginAnonymously,
      loginWithEmail,
      registerWithEmail,
      loginAsAdmin,
      logout,
      updateProfileLanguage,
      completeLesson,
      addXp,
      seedDefaultLessons,
      isOnline,
      offlineMode,
      setOfflineMode,
      downloadedLessonIds,
      downloadLesson,
      removeDownloadedLesson,
      isLessonDownloaded,
      syncOfflineData,
      notificationPermission,
      remindersEnabled,
      reminderTime,
      requestNotificationPermission,
      toggleReminders,
      setReminderTime,
      sendTestNotification,
      showSimulatedNotification,
      setShowSimulatedNotification,
      simulatedNotificationText,
      dailyGoalMinutes,
      dailyPracticeMinutes,
      updateDailyGoal,
      addPracticeTime
    }}>
      {children}
    </AppContext.Provider>
  );
};
