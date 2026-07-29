export interface UserProfile {
  uid: string;
  username: string;
  selectedLanguage: string; // 'marathi' | 'hindi' | 'english'
  xp: number;
  level: number;
  badges: string[]; // e.g. ['alphabet_master', 'vocab_king', 'grammar_guru', 'streak_3', 'streak_7', 'quiz_perfect']
  dailyStreak: number;
  lastActiveDate: string; // ISO string
  completedLessons: string[]; // array of lesson document IDs
  createdAt: string; // ISO string
}

export interface UserPrivateInfo {
  email: string;
  isAdmin: boolean;
}

export interface LessonContentItem {
  nativeWord: string;
  translatedWord: string;
  pronunciation: string;
  explanation: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number; // index of the correct option (0-based)
}

export interface Lesson {
  id: string; // document ID or generated ID
  language: string; // 'marathi' | 'hindi' | 'english'
  category: string; // 'alphabets' | 'vocabulary' | 'grammar'
  title: string;
  description: string;
  content: LessonContentItem[];
  quiz: QuizQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  videoUrl?: string;
  videoTitle?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  pronunciation?: string;
  translation?: string;
  explanation?: string;
}

export interface LeaderboardEntry {
  uid: string;
  username: string;
  xp: number;
  level: number;
  badgesCount: number;
  selectedLanguage: string;
  dailyStreak: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // CSS color classes
}

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first lesson!',
    icon: 'Compass',
    color: 'from-blue-400 to-indigo-500 text-white'
  },
  {
    id: 'alphabet_master',
    title: 'Alphabet Master',
    description: 'Complete any Alphabet lesson.',
    icon: 'Languages',
    color: 'from-green-400 to-emerald-500 text-white'
  },
  {
    id: 'vocab_king',
    title: 'Vocab King',
    description: 'Complete any Vocabulary lesson.',
    icon: 'BookOpen',
    color: 'from-yellow-400 to-amber-500 text-white'
  },
  {
    id: 'grammar_guru',
    title: 'Grammar Guru',
    description: 'Complete any Grammar lesson.',
    icon: 'Brain',
    color: 'from-purple-400 to-violet-500 text-white'
  },
  {
    id: 'quiz_perfect',
    title: 'Flawless Finish',
    description: 'Score 100% on any lesson quiz.',
    icon: 'Award',
    color: 'from-pink-400 to-rose-500 text-white'
  },
  {
    id: 'streak_3',
    title: 'Day Tripper',
    description: 'Achieve a 3-day learning streak.',
    icon: 'Flame',
    color: 'from-orange-400 to-red-500 text-white'
  },
  {
    id: 'lessons_10',
    title: 'Decathlete',
    description: 'Complete 10 language lessons.',
    icon: 'Trophy',
    color: 'from-cyan-400 to-blue-500 text-white'
  },
  {
    id: 'fluency_1',
    title: 'Fluency Level 1',
    description: 'Unlock Fluency Level 1 by reaching Level 3.',
    icon: 'Sparkles',
    color: 'from-amber-400 to-orange-500 text-white'
  }
];

export function getCourseLabel(lang: string): string {
  switch (lang?.toLowerCase()) {
    case 'marathi':
      return 'Marathi (मराठी)';
    case 'hindi':
      return 'Hindi (हिंदी)';
    case 'english':
      return 'English';
    case 'gujarati':
      return 'Gujarati (ગુજરાતી)';
    case 'marwadi':
      return 'Marwadi (मारवाड़ी)';
    case 'tamil':
      return 'Tamil (தமிழ்)';
    case 'telugu':
      return 'Telugu (తెలుగు)';
    case 'kannada':
      return 'Kannada (ಕನ್ನಡ)';
    case 'bengali':
      return 'Bengali (বাংলা)';
    case 'punjabi':
      return 'Punjabi (ਪੰਜਾਬੀ)';
    case 'malayalam':
      return 'Malayalam (മലയാളം)';
    case 'sanskrit':
      return 'Sanskrit (संस्कृत)';
    case 'spanish':
      return 'Spanish (Español)';
    case 'french':
      return 'French (Français)';
    case 'german':
      return 'German (Deutsch)';
    default:
      return lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : 'Marathi';
  }
}

