import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, LessonContentItem, QuizQuestion, getCourseLabel } from '../types';
import { 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Languages, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  ChevronRight,
  Info,
  CloudDownload,
  Trash2,
  WifiOff,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  HelpCircle,
  Check,
  XCircle,
  Flame,
  Search,
  SlidersHorizontal,
  Filter,
  X,
  Youtube,
  Video,
  ExternalLink,
  Globe,
  Gauge,
  Download,
  Zap,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseSelectionGrid } from './CourseSelectionGrid';

const getYouTubeEmbedUrl = (url?: string): string => {
  if (!url) return '';
  try {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const parts = url.split('?')[1];
      const urlParams = new URLSearchParams(parts);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url || '';
  }
};

const getGoogleTranslateUrl = (text: string, lang: string): string => {
  let langCode = 'mr';
  if (lang === 'hindi') langCode = 'hi';
  else if (lang === 'english') langCode = 'en';
  else if (lang === 'gujarati') langCode = 'gu';
  else if (lang === 'marwadi') langCode = 'hi';
  else if (lang === 'tamil') langCode = 'ta';
  else if (lang === 'telugu') langCode = 'te';
  else if (lang === 'kannada') langCode = 'kn';
  else if (lang === 'bengali') langCode = 'bn';
  else if (lang === 'punjabi') langCode = 'pa';
  else if (lang === 'malayalam') langCode = 'ml';
  else if (lang === 'sanskrit') langCode = 'sa';
  else if (lang === 'spanish') langCode = 'es';
  else if (lang === 'french') langCode = 'fr';
  else if (lang === 'german') langCode = 'de';

  return `https://translate.google.com/?sl=${langCode}&tl=en&text=${encodeURIComponent(text)}&op=translate`;
};

const getYouTubeSearchUrl = (text: string, lang: string): string => {
  const query = `${text} ${getCourseLabel(lang)} pronunciation lesson tutorial`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

interface LessonsViewProps {
  onStartQuiz: (lesson: Lesson) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ onStartQuiz }) => {
  const { 
    lessons, 
    profile, 
    selectedLanguage,
    isOnline,
    offlineMode,
    setOfflineMode,
    downloadLesson,
    removeDownloadedLesson,
    isLessonDownloaded,
    addPracticeTime
  } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);
  const [showCourseSelector, setShowCourseSelector] = useState<boolean>(false);

  // --- SPEAKING PRACTICE SPEECH API INTEGRATION STATES ---
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Initialize Speech Recognition instance checking
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const isSpeechSupported = !!SpeechRecognition;

  // Reset speech practicing whenever the active card index changes
  React.useEffect(() => {
    setIsListening(false);
    setSpokenTranscript('');
    setAccuracyScore(null);
    setSpeechError(null);
    if (recognitionInstance) {
      try {
        recognitionInstance.abort();
      } catch (e) {}
    }
  }, [cardIndex, selectedLesson?.id]);

  // Clean-up speech listener on unmount
  React.useEffect(() => {
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.abort();
        } catch (e) {}
      }
    };
  }, [recognitionInstance]);

  React.useEffect(() => {
    setShowVideoPlayer(false);
  }, [selectedLesson?.id]);

  // Pronunciation similarity percentage matching
  const calculateSimilarity = (str1: string, str2: string): number => {
    const clean = (s: string) => s.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()।?]/g, "").trim();
    const s1 = clean(str1);
    const s2 = clean(str2);
    if (!s1 || !s2) return 0;
    if (s1 === s2) return 100;

    // Character overlapping metric
    let matches = 0;
    const set2 = new Set(s2.split(''));
    for (const char of s1) {
      if (set2.has(char)) {
        matches++;
      }
    }
    const overlapScore = Math.round((matches / Math.max(s1.length, s2.length)) * 100);

    // Levenshtein distance metric
    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }
    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    const levScore = Math.round(((maxLength - distance) / maxLength) * 100);

    return Math.max(levScore, overlapScore);
  };

  const startListening = () => {
    if (!isSpeechSupported) {
      setSpeechError('Speech recognition is not supported in this browser. Try Google Chrome.');
      return;
    }

    setSpeechError(null);
    setSpokenTranscript('');
    setAccuracyScore(null);

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Select correct language locale code based on user settings
      let langCode = 'en-US';
      if (selectedLanguage === 'hindi') langCode = 'hi-IN';
      else if (selectedLanguage === 'marathi') langCode = 'mr-IN';
      else if (selectedLanguage === 'gujarati') langCode = 'gu-IN';
      else if (selectedLanguage === 'tamil') langCode = 'ta-IN';
      else if (selectedLanguage === 'telugu') langCode = 'te-IN';
      else if (selectedLanguage === 'kannada') langCode = 'kn-IN';
      else if (selectedLanguage === 'bengali') langCode = 'bn-IN';
      else if (selectedLanguage === 'punjabi') langCode = 'pa-IN';
      else if (selectedLanguage === 'malayalam') langCode = 'ml-IN';
      else if (selectedLanguage === 'sanskrit') langCode = 'sa-IN';
      else if (selectedLanguage === 'marwadi') langCode = 'hi-IN';
      else if (selectedLanguage === 'spanish') langCode = 'es-ES';
      else if (selectedLanguage === 'french') langCode = 'fr-FR';
      else if (selectedLanguage === 'german') langCode = 'de-DE';

      recognition.lang = langCode;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission blocked. Click the lock icon in your browser address bar to allow.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please speak clearly into your mic.');
        } else {
          setSpeechError(`Failed to recognize speech: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenTranscript(transcript);

        if (selectedLesson && selectedLesson.content[cardIndex]) {
          const targetWord = selectedLesson.content[cardIndex].nativeWord;
          const score = calculateSimilarity(transcript, targetWord);
          setAccuracyScore(score);

          // Reward 1 minute of learning time if accuracy is above 50%
          if (score >= 50) {
            addPracticeTime(1);
          }
        }
      };

      recognition.start();
      setRecognitionInstance(recognition);
    } catch (e: any) {
      console.error(e);
      setSpeechError('Could not start microphone connection. Ensure permission is granted.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const simulateSpeech = (level: 'perfect' | 'good' | 'poor') => {
    setSpeechError(null);
    setIsListening(true);

    setTimeout(() => {
      setIsListening(false);
      if (!selectedLesson || !selectedLesson.content[cardIndex]) return;

      const targetWord = selectedLesson.content[cardIndex].nativeWord;
      let mockTranscript = '';
      let mockScore = 100;

      if (level === 'perfect') {
        mockTranscript = targetWord;
        mockScore = 100;
      } else if (level === 'good') {
        mockTranscript = targetWord + " " + (selectedLanguage === 'tamil' ? 'வண' : 'जी');
        mockScore = 75;
      } else {
        mockTranscript = selectedLanguage === 'english' ? 'wrong attempt' : 'अलग शब्द';
        mockScore = 22;
      }

      setSpokenTranscript(mockTranscript);
      setAccuracyScore(mockScore);

      if (mockScore >= 50) {
        addPracticeTime(1);
      }
    }, 1000);
  };

  // Filter lessons based on language, category, difficulty, and search query
  const filteredLessons = lessons.filter(l => {
    const langMatch = l.language === selectedLanguage;
    const catMatch = activeCategory === 'all' || l.category === activeCategory;
    const difficultyMatch = selectedDifficulty === 'all' || l.difficulty === selectedDifficulty;
    
    // Search query matching: title, difficulty, language, description, and keywords
    const query = searchQuery.trim().toLowerCase();
    let queryMatch = true;
    if (query) {
      const titleMatch = l.title.toLowerCase().includes(query);
      const diffMatch = l.difficulty.toLowerCase().includes(query);
      const langMatchWord = l.language.toLowerCase().includes(query);
      const descMatch = l.description.toLowerCase().includes(query);
      const catMatchWord = l.category.toLowerCase().includes(query);
      
      // Check if any specific content item matches for deep search
      const contentMatch = l.content.some(item => 
        item.nativeWord.toLowerCase().includes(query) || 
        item.translatedWord.toLowerCase().includes(query) ||
        item.explanation.toLowerCase().includes(query)
      );

      queryMatch = titleMatch || diffMatch || langMatchWord || descMatch || catMatchWord || contentMatch;
    }

    return langMatch && catMatch && difficultyMatch && queryMatch;
  });

  // Generate a full Subject Master Quiz (10+ Questions) for currently selected language
  const startLanguageMasterQuiz = () => {
    const languageLessons = lessons.filter(l => l.language === selectedLanguage);
    let allQuizQuestions: QuizQuestion[] = [];
    languageLessons.forEach(l => {
      if (l.quiz && Array.isArray(l.quiz)) {
        allQuizQuestions = [...allQuizQuestions, ...l.quiz];
      }
    });

    if (allQuizQuestions.length === 0) return;

    const masterQuizLesson: Lesson = {
      id: `master_quiz_${selectedLanguage}_${Date.now()}`,
      language: selectedLanguage,
      category: 'grammar',
      title: `${getCourseLabel(selectedLanguage)} 10-Question Master Quiz`,
      description: `Comprehensive 10+ question practice quiz covering grammar, vocabulary, and phonetics in ${getCourseLabel(selectedLanguage)}.`,
      difficulty: 'intermediate',
      createdAt: new Date().toISOString(),
      content: [],
      quiz: allQuizQuestions
    };

    onStartQuiz(masterQuizLesson);
  };

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'alphabets', label: 'Alphabets', icon: Languages },
    { id: 'vocabulary', label: 'Vocabulary', icon: Brain },
    { id: 'grammar', label: 'Grammar', icon: BookOpen }
  ];

  // TTS Pronunciation handler
  const playPronunciation = (text: string, customSpeed?: number) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    // Stop current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select accurate local voices based on language
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (selectedLanguage === 'marathi') {
      selectedVoice = voices.find(v => v.lang.startsWith('mr') || v.lang.startsWith('mr-IN')) 
        || voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('hi-IN'));
    } else if (selectedLanguage === 'hindi') {
      selectedVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('hi-IN'));
    } else if (selectedLanguage === 'gujarati') {
      selectedVoice = voices.find(v => v.lang.startsWith('gu') || v.lang.startsWith('gu-IN'))
        || voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('hi-IN'));
    } else if (selectedLanguage === 'marwadi') {
      selectedVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('hi-IN'));
    } else if (selectedLanguage === 'tamil') {
      selectedVoice = voices.find(v => v.lang.startsWith('ta') || v.lang.startsWith('ta-IN'));
    } else if (selectedLanguage === 'telugu') {
      selectedVoice = voices.find(v => v.lang.startsWith('te') || v.lang.startsWith('te-IN'));
    } else if (selectedLanguage === 'kannada') {
      selectedVoice = voices.find(v => v.lang.startsWith('kn') || v.lang.startsWith('kn-IN'));
    } else if (selectedLanguage === 'bengali') {
      selectedVoice = voices.find(v => v.lang.startsWith('bn') || v.lang.startsWith('bn-IN'));
    } else if (selectedLanguage === 'punjabi') {
      selectedVoice = voices.find(v => v.lang.startsWith('pa') || v.lang.startsWith('pa-IN'));
    } else if (selectedLanguage === 'malayalam') {
      selectedVoice = voices.find(v => v.lang.startsWith('ml') || v.lang.startsWith('ml-IN'));
    } else if (selectedLanguage === 'sanskrit') {
      selectedVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('hi-IN'));
    } else if (selectedLanguage === 'spanish') {
      selectedVoice = voices.find(v => v.lang.startsWith('es') || v.lang.startsWith('es-ES'));
    } else if (selectedLanguage === 'french') {
      selectedVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.startsWith('fr-FR'));
    } else if (selectedLanguage === 'german') {
      selectedVoice = voices.find(v => v.lang.startsWith('de') || v.lang.startsWith('de-DE'));
    } else {
      selectedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = customSpeed || playbackSpeed || 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const currentCategoryLabel = categories.find(c => c.id === activeCategory)?.label || 'Lessons';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Offline Mode / Simulation Alert Banner */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 shadow-sm">
        <div className="flex items-start space-x-3">
          <WifiOff className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm tracking-tight">Offline & Online Practice Mode</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mt-0.5">
              {(offlineMode || !isOnline)
                ? 'Currently in offline mode. Showing downloaded modules. Progress is saved locally and will auto-sync to Firestore when reconnected.'
                : 'Connected to Cloud database. You can save lessons offline to practice anywhere without internet.'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 shrink-0">
          {!(offlineMode || !isOnline) && filteredLessons.length > 0 && (
            <button
              onClick={() => {
                filteredLessons.forEach(l => downloadLesson(l));
              }}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Save all current course lessons for offline practice"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Save All Offline</span>
            </button>
          )}

          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-all active:scale-95 shadow-sm ${
              (offlineMode || !isOnline)
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-200'
            }`}
          >
            {(offlineMode || !isOnline) ? 'Go Online & Sync' : 'Simulate Offline'}
          </button>
        </div>
      </div>

      {!selectedLesson ? (
        // ================= LESSONS SELECTOR SCREEN =================
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Current Active Course</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
                {getCourseLabel(selectedLanguage)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Select a module below or switch to another language course.</p>
            </div>

            <button
              onClick={() => setShowCourseSelector(!showCourseSelector)}
              className="inline-flex items-center space-x-2 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-5 py-3 text-xs font-extrabold text-emerald-800 dark:text-emerald-300 transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{showCourseSelector ? 'Hide Course Cards' : 'Browse All Language Courses'}</span>
            </button>
          </div>

          {/* Course Selection Cards Drawer */}
          {showCourseSelector && (
            <div className="mb-8 p-6 rounded-3xl border border-emerald-100 dark:border-slate-800 bg-emerald-50/30 dark:bg-slate-900/80 shadow-md">
              <CourseSelectionGrid 
                onNavigateToLessons={() => setShowCourseSelector(false)} 
                title="Course Catalog"
                subtitle="Select any language card below to switch your active course instantly."
              />
            </div>
          )}

          {/* Search and Filters Dashboard Row */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-5 md:p-6 mb-8 shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search input container */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 transition-colors ${isSearchFocused ? 'text-emerald-500' : 'text-gray-400 dark:text-slate-500'}`} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Filter modules by title, level, or language keywords..."
                  className="w-full pl-11 pr-10 py-3.5 bg-gray-50/50 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700 rounded-2xl text-sm font-medium text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>

              {/* Difficulty selection pills */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 mr-1 flex items-center space-x-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-gray-400" />
                  <span>Difficulty:</span>
                </span>
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => {
                  const isSelected = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer border ${
                        isSelected
                          ? diff === 'beginner'
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100'
                            : diff === 'intermediate'
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-100'
                            : diff === 'advanced'
                            ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-100'
                            : 'bg-gray-800 text-white border-gray-800 shadow-md shadow-gray-200'
                          : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {diff === 'all' ? 'All Levels' : diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language and Topic Keywords Helper Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 mr-1 flex items-center space-x-1.5">
                <Filter className="h-3.5 w-3.5 text-gray-400" />
                <span>Quick Keywords:</span>
              </span>
              {[
                { label: 'Marathi', value: 'marathi' },
                { label: 'Hindi', value: 'hindi' },
                { label: 'English', value: 'english' },
                { label: 'Grammar', value: 'grammar' },
                { label: 'Vocabulary', value: 'vocabulary' },
                { label: 'Vowels/Consonants', value: 'alphabet' },
                { label: 'Phrases', value: 'phrase' },
              ].map((kw) => {
                const isActive = searchQuery.toLowerCase().includes(kw.value);
                return (
                  <button
                    key={kw.label}
                    onClick={() => {
                      if (isActive) {
                        setSearchQuery('');
                      } else {
                        setSearchQuery(kw.value);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border-transparent'
                    }`}
                  >
                    #{kw.label}
                  </button>
                );
              })}
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('all');
                  }}
                  className="text-xs font-extrabold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/60 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Subject Master Quiz Action Banner */}
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white">
                <Zap className="h-6 w-6 text-yellow-200 fill-yellow-200" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-yellow-100 mb-1">
                  <Award className="h-3.5 w-3.5 text-yellow-200" />
                  <span>Subject Master Test • 10+ Questions</span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {getCourseLabel(selectedLanguage)} 10-Question Master Quiz
                </h3>
                <p className="text-xs text-amber-100/90 mt-1 max-w-xl">
                  Test your complete mastery across all lessons with a 10+ question practice quiz for {getCourseLabel(selectedLanguage)}!
                </p>
              </div>
            </div>

            <button
              onClick={startLanguageMasterQuiz}
              className="inline-flex items-center space-x-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-extrabold px-6 py-3.5 text-xs shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <span>Take Full 10-Question Quiz</span>
              <ArrowRight className="h-4 w-4 text-amber-600" />
            </button>
          </div>

          {/* Lessons Grid list */}
          {filteredLessons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => {
                const isCompleted = profile?.completedLessons.includes(lesson.id);
                const isDownloaded = isLessonDownloaded(lesson.id);
                return (
                  <motion.div
                    key={lesson.id}
                    layoutId={`lesson-card-${lesson.id}`}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setCardIndex(0);
                    }}
                    className={`flex flex-col justify-between cursor-pointer rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                      isDownloaded 
                        ? 'border-teal-200 bg-gradient-to-b from-teal-50/20 to-white shadow-teal-50/40' 
                        : 'border-gray-100 bg-white'
                    }`}
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      {/* Top tags */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          lesson.difficulty === 'beginner' 
                            ? 'bg-green-50 text-green-700' 
                            : lesson.difficulty === 'intermediate' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {lesson.difficulty}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {isCompleted && (
                            <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="h-4 w-4 fill-emerald-100" />
                              <span>Done</span>
                            </span>
                          )}

                          {isDownloaded ? (
                            <div className="flex items-center space-x-1.5">
                              <span className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded-lg">
                                <Check className="h-3 w-3 text-teal-600 inline-block mr-0.5" />
                                <span>Saved Offline</span>
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeDownloadedLesson(lesson.id);
                                }}
                                className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove offline files"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            !(offlineMode || !isOnline) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadLesson(lesson);
                                }}
                                className="inline-flex items-center space-x-1 text-[10px] font-bold text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50/60 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                                title="Save to offline deck"
                              >
                                <CloudDownload className="h-3.5 w-3.5" />
                                <span>Save</span>
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Lesson title */}
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    {/* Bottom start trigger */}
                    <div className="border-t border-gray-50 mt-6 pt-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">
                        {lesson.content.length} study cards
                      </span>
                      <div className="flex items-center space-x-1.5 text-sm font-bold text-emerald-600">
                        <span>{isCompleted ? 'Review' : 'Start'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center rounded-3xl border border-dashed border-gray-200 bg-white py-16 px-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 mb-4 animate-pulse">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No lessons matched your filters</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                No modules matching {searchQuery ? `"${searchQuery}"` : "your criteria"} were found under category <span className="font-extrabold text-emerald-600">"{categories.find(c => c.id === activeCategory)?.label}"</span> and difficulty level <span className="font-extrabold text-indigo-600">"{selectedDifficulty}"</span>.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('all');
                  setActiveCategory('all');
                }}
                className="mt-5 inline-flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-100 cursor-pointer"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        // ================= ACTIVE STUDY DECK SLIDES SCREEN =================
        <div className="max-w-3xl mx-auto">
          {/* Header / Nav-Back */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center space-x-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Selection</span>
            </button>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Study Deck: {selectedLesson.category}
            </span>
          </div>

          {/* Video Lesson banner/embed */}
          {selectedLesson.videoUrl && (
            <div className="mb-6 rounded-3xl overflow-hidden border border-red-100/80 bg-gradient-to-r from-red-50/50 to-orange-50/50 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-200">
                    <Youtube className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">
                      {selectedLesson.videoTitle || "Video Lesson Tutorial"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">
                      Watch an immersive video tutorial to master this lesson.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowVideoPlayer(!showVideoPlayer)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm ${
                    showVideoPlayer
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-100'
                      : 'bg-white text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300'
                  }`}
                >
                  <Video className="h-4 w-4" />
                  <span>{showVideoPlayer ? 'Hide Video' : 'Watch Video'}</span>
                </button>
              </div>

              {/* Embedded Iframe Container */}
              {showVideoPlayer && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-black shadow-inner aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedLesson.videoUrl)}
                    title={selectedLesson.videoTitle || "Lesson Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
              <span>Card progress</span>
              <span>{cardIndex + 1} of {selectedLesson.content.length}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((cardIndex + 1) / selectedLesson.content.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Learning Flashcard (Animate Slide Transitions) */}
          <div className="relative min-h-[380px] w-full rounded-3xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/40 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={cardIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Native Word Display & Audio / Web Tools Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-gray-100 pb-4">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Learn Word
                    </span>

                    {/* Speed Controls & Audio Playback */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 text-[11px] font-bold text-gray-600">
                        <Gauge className="h-3.5 w-3.5 ml-1 text-gray-400" />
                        <button
                          onClick={() => setPlaybackSpeed(0.65)}
                          className={`px-1.5 py-0.5 rounded-lg transition-colors ${playbackSpeed === 0.65 ? 'bg-emerald-600 text-white font-extrabold' : 'hover:bg-gray-200'}`}
                        >
                          Slow
                        </button>
                        <button
                          onClick={() => setPlaybackSpeed(0.85)}
                          className={`px-1.5 py-0.5 rounded-lg transition-colors ${playbackSpeed === 0.85 ? 'bg-emerald-600 text-white font-extrabold' : 'hover:bg-gray-200'}`}
                        >
                          1.0x
                        </button>
                        <button
                          onClick={() => setPlaybackSpeed(1.15)}
                          className={`px-1.5 py-0.5 rounded-lg transition-colors ${playbackSpeed === 1.15 ? 'bg-emerald-600 text-white font-extrabold' : 'hover:bg-gray-200'}`}
                        >
                          Fast
                        </button>
                      </div>

                      <button
                        onClick={() => playPronunciation(selectedLesson.content[cardIndex].nativeWord)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-200 cursor-pointer"
                        title="Listen Audio Pronunciation"
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center my-6">
                    <h1 className="text-5xl font-black tracking-tight text-gray-900 md:text-6xl">
                      {selectedLesson.content[cardIndex].nativeWord}
                    </h1>
                    
                    {/* Phonetic Pronunciation */}
                    <p className="text-sm font-mono text-emerald-600 mt-3 bg-emerald-50/50 inline-block px-3 py-1 rounded-lg font-bold">
                      "{selectedLesson.content[cardIndex].pronunciation}"
                    </p>

                    {/* Direct External Integration Actions (Google Translate & YouTube Search) */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <a
                        href={getGoogleTranslateUrl(selectedLesson.content[cardIndex].nativeWord, selectedLanguage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 rounded-xl bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-extrabold text-blue-700 hover:bg-blue-100 transition-colors shadow-sm"
                      >
                        <Globe className="h-3.5 w-3.5 text-blue-600" />
                        <span>Google Translate</span>
                        <ExternalLink className="h-3 w-3 text-blue-400" />
                      </a>

                      <a
                        href={getYouTubeSearchUrl(selectedLesson.content[cardIndex].nativeWord, selectedLanguage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 rounded-xl bg-red-50 border border-red-100 px-3 py-1.5 text-xs font-extrabold text-red-700 hover:bg-red-100 transition-colors shadow-sm"
                      >
                        <Youtube className="h-3.5 w-3.5 text-red-600 fill-current" />
                        <span>YouTube Tutorial</span>
                        <ExternalLink className="h-3 w-3 text-red-400" />
                      </a>
                    </div>

                    {/* Translation */}
                    <div className="mt-8 border-t border-gray-50 pt-6">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-1">
                        English Translation
                      </span>
                      <p className="text-2xl font-bold text-gray-800">
                        {selectedLesson.content[cardIndex].translatedWord}
                      </p>
                    </div>

                    {/* Speaking Practice Widget */}
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-3">
                        Microphone Pronunciation Practice
                      </span>
                      
                      <div className="flex flex-col items-center justify-center space-y-4 bg-emerald-50/10 rounded-2xl p-4 border border-emerald-500/10">
                        {/* Audio Wave / Microphone Status */}
                        <div className="flex items-center justify-center space-x-3 w-full">
                          {isListening ? (
                            <div className="flex items-center space-x-2">
                              {/* Glowing pulse ring */}
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                              <span className="text-xs font-black text-red-600 uppercase tracking-widest animate-pulse">
                                Listening... Speak now!
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-gray-400">
                              Tap the mic button and read: "{selectedLesson.content[cardIndex].nativeWord}"
                            </span>
                          )}
                        </div>

                        {/* Mic Controls and Status */}
                        <div className="flex items-center justify-center space-x-4">
                          {isListening ? (
                            <button
                              onClick={stopListening}
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-100 animate-pulse active:scale-95 transition-all cursor-pointer"
                              title="Stop Recording"
                            >
                              <MicOff className="h-6 w-6" />
                            </button>
                          ) : (
                            <button
                              onClick={startListening}
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-200 cursor-pointer"
                              title="Start Speaking"
                            >
                              <Mic className="h-6 w-6" />
                            </button>
                          )}
                          
                          {/* Play standard pronunciation side-by-side to compare */}
                          <button
                            onClick={() => playPronunciation(selectedLesson.content[cardIndex].nativeWord)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
                            title="Listen to Target Pronunciation"
                          >
                            <Volume2 className="h-4.5 w-4.5" />
                          </button>
                        </div>

                        {/* Speech recognition errors */}
                        {speechError && (
                          <p className="text-xs text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 text-center">
                            {speechError}
                          </p>
                        )}

                        {/* Spoken output and accuracy rating feedback */}
                        {accuracyScore !== null && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full space-y-3 pt-2"
                          >
                            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">You Said:</span>
                              <p className="text-lg font-extrabold text-gray-800 mt-0.5">
                                "{spokenTranscript || '...'}"
                              </p>
                            </div>

                            {/* Accuracy Meter Visual Ring / Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-black text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Sparkles className="h-3 w-3 text-amber-500" />
                                  <span>Pronunciation Match Accuracy</span>
                                </span>
                                <span className={
                                  accuracyScore >= 90 ? 'text-emerald-600' :
                                  accuracyScore >= 70 ? 'text-teal-600' :
                                  accuracyScore >= 50 ? 'text-amber-600' : 'text-red-500'
                                }>
                                  {accuracyScore}%
                                </span>
                              </div>
                              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${accuracyScore}%` }}
                                  className={`h-full rounded-full ${
                                    accuracyScore >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                                    accuracyScore >= 70 ? 'bg-gradient-to-r from-teal-400 to-emerald-400' :
                                    accuracyScore >= 50 ? 'bg-gradient-to-r from-amber-400 to-yellow-400' : 'bg-gradient-to-r from-red-400 to-rose-400'
                                  }`}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                              </div>
                            </div>

                            {/* Reward & Feedback Context */}
                            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-extrabold ${
                              accuracyScore >= 90 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                                : accuracyScore >= 70 
                                ? 'bg-teal-50 border-teal-100 text-teal-800'
                                : accuracyScore >= 50 
                                ? 'bg-amber-50 border-amber-100 text-amber-800'
                                : 'bg-red-50 border-red-100 text-red-800'
                            }`}>
                              <div className="flex items-center space-x-2">
                                {accuracyScore >= 90 ? (
                                  <span className="text-base">🏆</span>
                                ) : accuracyScore >= 70 ? (
                                  <span className="text-base">🌟</span>
                                ) : accuracyScore >= 50 ? (
                                  <span className="text-base">👍</span>
                                ) : (
                                  <span className="text-base">🔄</span>
                                )}
                                <span>
                                  {accuracyScore >= 90 ? 'Flawless Pronunciation! Excellent!' :
                                   accuracyScore >= 70 ? 'Fantastic! Very close to native sound!' :
                                   accuracyScore >= 50 ? 'Good try! Keep practicing to refine.' :
                                   'Did not match. Try to speak slowly and clearly.'}
                                </span>
                              </div>
                              {accuracyScore >= 50 && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-black animate-pulse">
                                  +1 MIN GOAL ⚡
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Interactive Simulation suite in page for absolute resilience */}
                        <div className="pt-2 border-t border-gray-100/60 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-[10px] text-gray-400 font-extrabold flex items-center space-x-1">
                              <HelpCircle className="h-3 w-3" />
                              <span>Practice Simulator Fallback:</span>
                            </span>
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => simulateSpeech('perfect')}
                                className="px-2.5 py-1 text-[9px] font-black bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-100 transition-colors cursor-pointer"
                              >
                                Perfect 💯
                              </button>
                              <button
                                onClick={() => simulateSpeech('good')}
                                className="px-2.5 py-1 text-[9px] font-black bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg border border-teal-100 transition-colors cursor-pointer"
                              >
                                Near Match ⭐
                              </button>
                              <button
                                onClick={() => simulateSpeech('poor')}
                                className="px-2.5 py-1 text-[9px] font-black bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg border border-rose-100 transition-colors cursor-pointer"
                              >
                                Incorrect ❌
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation Context */}
                <div className="mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-start space-x-3 text-left">
                  <Info className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm">Grammar Note / Context</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {selectedLesson.content[cardIndex].explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flashcard Slider Controls */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={() => setCardIndex(prev => Math.max(0, prev - 1))}
              disabled={cardIndex === 0}
              className={`flex-1 flex items-center justify-center space-x-2 rounded-xl px-5 py-3 text-sm font-semibold border border-gray-200 transition-all ${
                cardIndex === 0 
                  ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 active:scale-95'
              }`}
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              <span>Previous</span>
            </button>

            {cardIndex < selectedLesson.content.length - 1 ? (
              <button
                onClick={() => setCardIndex(prev => prev + 1)}
                className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 shadow-md shadow-emerald-100 transition-all active:scale-95"
              >
                <span>Next Word</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            ) : (
              <button
                onClick={() => onStartQuiz(selectedLesson)}
                className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-100 transition-all active:scale-95"
              >
                <span>Take Lesson Quiz</span>
                <CheckCircle2 className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
