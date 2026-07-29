import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ArrowRight, Sparkles, BookOpen, Globe2, Compass, Layers, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseInfo {
  id: string;
  name: string;
  nativeName: string;
  category: 'indian' | 'international' | 'classical';
  description: string;
  modulesCount: number;
  level: string;
  accentColor: string;
  badgeBg: string;
  flagEmoji: string;
  popular?: boolean;
}

export const COURSE_CATALOG: CourseInfo[] = [
  {
    id: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    category: 'indian',
    description: 'Master regional Marathi grammar, native vocabulary, and daily conversational phrases.',
    modulesCount: 12,
    level: 'Beginner to Advanced',
    accentColor: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
    flagEmoji: '🚩',
    popular: true,
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    category: 'indian',
    description: 'Learn national Devanagari script, greetings, grammar structure, and essential vocab.',
    modulesCount: 15,
    level: 'All Levels',
    accentColor: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
    flagEmoji: '🇮🇳',
    popular: true,
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    category: 'international',
    description: 'Enhance global communication skills, business phrasing, and grammar proficiency.',
    modulesCount: 18,
    level: 'Intermediate',
    accentColor: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    flagEmoji: '🌐',
    popular: true,
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    category: 'indian',
    description: 'Discover Gujarat’s vibrant culture, business terms, and essential conversational grammar.',
    modulesCount: 10,
    level: 'Beginner to Intermediate',
    accentColor: 'from-purple-500 to-violet-600',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
    flagEmoji: '🪁',
  },
  {
    id: 'marwadi',
    name: 'Marwadi',
    nativeName: 'मारवाड़ी',
    category: 'indian',
    description: 'Explore traditional Rajasthani folk phrases, local dialects, and family greetings.',
    modulesCount: 8,
    level: 'Beginner',
    accentColor: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
    flagEmoji: '🏰',
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    category: 'indian',
    description: 'Learn one of the world’s oldest classical languages with native pronunciation & script.',
    modulesCount: 12,
    level: 'Beginner to Intermediate',
    accentColor: 'from-teal-500 to-cyan-600',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300',
    flagEmoji: '🏛️',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    category: 'indian',
    description: 'Study the sweet, melodious Italian of the East with interactive flashcards & quizzes.',
    modulesCount: 10,
    level: 'Beginner',
    accentColor: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300',
    flagEmoji: '🎶',
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    category: 'classical',
    description: 'Explore classical mantras, ancient grammar logic, and foundational root vocabulary.',
    modulesCount: 9,
    level: 'Foundational',
    accentColor: 'from-orange-500 to-amber-600',
    badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300',
    flagEmoji: '🕉️',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    category: 'international',
    description: 'Practice European romance phrasing, conversational greetings, and phonetics.',
    modulesCount: 14,
    level: 'Beginner to Intermediate',
    accentColor: 'from-indigo-500 to-sky-600',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300',
    flagEmoji: '🇫🇷',
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    category: 'international',
    description: 'Master compound nouns, structured grammar rules, and business phrases.',
    modulesCount: 12,
    level: 'Beginner',
    accentColor: 'from-yellow-500 to-amber-600',
    badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300',
    flagEmoji: '🇩🇪',
  },
];

interface CourseSelectionGridProps {
  onNavigateToLessons?: () => void;
  title?: string;
  subtitle?: string;
}

export const CourseSelectionGrid: React.FC<CourseSelectionGridProps> = ({
  onNavigateToLessons,
  title = "Explore Language Courses",
  subtitle = "Choose your target language to personalize your interactive flashcards, quizzes, and AI tutor sessions."
}) => {
  const { selectedLanguage, updateProfileLanguage } = useApp();
  const [filter, setFilter] = useState<'all' | 'indian' | 'international' | 'classical'>('all');

  const filteredCourses = COURSE_CATALOG.filter(course => {
    if (filter === 'all') return true;
    return course.category === filter;
  });

  const handleSelectCourse = (courseId: string) => {
    updateProfileLanguage(courseId);
    if (onNavigateToLessons) {
      onNavigateToLessons();
    }
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/40 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>Interactive Learning Pathways</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-2xl mt-1">
            {subtitle}
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-gray-200/60 dark:border-slate-700/60 shrink-0">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'indian', label: 'Indian Regional' },
            { id: 'international', label: 'Global' },
            { id: 'classical', label: 'Classical' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => {
          const isSelected = selectedLanguage.toLowerCase() === course.id.toLowerCase();

          return (
            <motion.div
              key={course.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all shadow-sm hover:shadow-md cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-emerald-100/50 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
              }`}
              onClick={() => handleSelectCourse(course.id)}
            >
              {/* Popular / Active Badge Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{course.flagEmoji}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${course.badgeBg}`}>
                    {course.nativeName}
                  </span>
                </div>

                {isSelected ? (
                  <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>ACTIVE</span>
                  </span>
                ) : course.popular ? (
                  <span className="inline-flex items-center space-x-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 px-2 py-0.5 text-[10px] font-bold">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span>Popular</span>
                  </span>
                ) : null}
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{course.name}</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-slate-400 line-clamp-3">
                  {course.description}
                </p>
              </div>

              {/* Course Meta Info */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold">
                  <span className="flex items-center space-x-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{course.modulesCount} Modules</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Selection Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCourse(course.id);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                      : 'bg-gray-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-gray-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-gray-200/80 dark:border-slate-700/80'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span>Continue Learning</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Select Course</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
