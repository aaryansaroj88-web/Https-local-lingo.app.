import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, getCourseLabel } from '../types';
import { 
  Send, 
  Trash2, 
  Volume2, 
  Sparkles, 
  Bot, 
  User as UserIcon,
  HelpCircle,
  MessageSquareCode,
  Globe,
  Youtube,
  ExternalLink,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const query = `${text} ${getCourseLabel(lang)} pronunciation tutorial`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

export const AITutorView: React.FC = () => {
  const { selectedLanguage, profile } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Load an initial welcoming message depending on the language
  useEffect(() => {
    let initialGreeting = '';
    let greetingTranslation = '';
    let greetingPronunciation = '';
    let greetingExplanation = '';

    if (selectedLanguage === 'marathi') {
      initialGreeting = 'नमस्कार! मी तुमचा मराठी शिक्षक आहे. आपण आज कशाबद्दल बोलूया?';
      greetingPronunciation = 'Namaskar! Mee tumcha Marathi shikshak aahe. Aapna aaj kashabaddal boluya?';
      greetingTranslation = 'Hello! I am your Marathi teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! I will guide you with native words. Type anything and let\'s chat!';
    } else if (selectedLanguage === 'hindi') {
      initialGreeting = 'नमस्ते! मैं आपका हिंदी शिक्षक हूँ। आज हम किस बारे में बात करें?';
      greetingPronunciation = 'Namaste! Main aapka Hindi shikshak hoon. Aaj hum kis baare mein baat karein?';
      greetingTranslation = 'Hello! I am your Hindi teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! Ask me for any word, correct your sentences, or just talk casually.';
    } else if (selectedLanguage === 'gujarati') {
      initialGreeting = 'નમસ્તે! હું તમારો ગુજરાતી શિક્ષક છું. આપણે આજે શેના વિશે વાત કરીશું?';
      greetingPronunciation = 'Namaste! Hun tamaro Gujarati shikshak chhun. Aapne aaje shena vishe vaat karishu?';
      greetingTranslation = 'Hello! I am your Gujarati teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! I will guide you with Gujarati vocabulary, grammar, and expressions. Let\'s chat!';
    } else if (selectedLanguage === 'marwadi') {
      initialGreeting = 'राम राम सा! मैं थारो मारवाड़ी शिक्षक हूँ। आज आपां कांई बात करां?';
      greetingPronunciation = 'Ram Ram sa! Main tharo Marwadi shikshak hoon. Aaj aapan kaai baat karaan?';
      greetingTranslation = 'Hello! I am your Marwadi teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! Ask me any word, practice Marwadi phrases, and let\'s explore this beautiful language.';
    } else if (selectedLanguage === 'tamil') {
      initialGreeting = 'வணக்கம்! நான் உங்கள் தமிழ் ஆசிரியர். இன்று நாம் எதைப்பற்றி பேசுவோம்?';
      greetingPronunciation = 'Vanakkam! Naan ungal Tamil aasiriyar. Indru naam edhaippatri pesuvom?';
      greetingTranslation = 'Hello! I am your Tamil teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! Let\'s practice conversing in Tamil, building vocabulary, and understanding Tamil letters.';
    } else if (selectedLanguage === 'sanskrit') {
      initialGreeting = 'नमो नमः! अहं भवतः संस्कृतशिक्षकः अस्मि। अद्य वयं किमधिकृत्य सम्भाषणं कुर्मः?';
      greetingPronunciation = 'Namo namah! Aham bhavatah Samskritashikshakah asmi. Adya vayam kimadhikritya sambhashanam kurmah?';
      greetingTranslation = 'Hello! I am your Sanskrit teacher. What shall we talk about today?';
      greetingExplanation = 'Welcome! Let us learn and speak the language of the sages (देववाणी). Ask me anything in Sanskrit!';
    } else {
      initialGreeting = 'Hello! I am your English language tutor. How can I help you practice your English today?';
      greetingPronunciation = 'Hello! I am your English language tutor. How can I help you practice your English today?';
      greetingTranslation = 'Hello! I am your English language tutor. How can I help you practice your English today?';
      greetingExplanation = 'Welcome! I will help you correct your pronunciation, build helping verbs, and expand your vocabulary.';
    }

    setMessages([
      {
        id: 'initial_greet',
        role: 'model',
        text: initialGreeting,
        pronunciation: greetingPronunciation,
        translation: greetingTranslation,
        explanation: greetingExplanation
      }
    ]);
    setErrorText(null);
  }, [selectedLanguage]);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // TTS Pronunciation helper
  const playPronunciation = (text: string, rate: number = 0.85) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
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
    
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setIsSending(true);
    setErrorText(null);

    // Append User Message to list
    const newMsgId = `user_${Date.now()}`;
    const userMessageObj: ChatMessage = {
      id: newMsgId,
      role: 'user',
      text: userMsg
    };
    
    setMessages(prev => [...prev, userMessageObj]);

    // Build history for context (keep last 6 turns)
    const history = messages.slice(-6).map(m => ({
      role: m.role,
      text: m.text
    }));

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          language: selectedLanguage,
          history
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server responded with an error');
      }

      const tutorResponse = await response.json();

      setMessages(prev => [
        ...prev,
        {
          id: `tutor_${Date.now()}`,
          role: 'model',
          text: tutorResponse.reply || 'Sorry, I couldn\'t formulate an answer.',
          pronunciation: tutorResponse.pronunciation,
          translation: tutorResponse.translation,
          explanation: tutorResponse.explanation
        }
      ]);
    } catch (err: any) {
      console.error("AI Tutor response error:", err);
      setErrorText(err.message || 'An unexpected error occurred while contacting your AI Tutor.');
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = () => {
    setMessages(prev => prev.slice(0, 1)); // Reset back to initial welcoming message
    setErrorText(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col justify-between">
      
      {/* Header Info Banner */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-4 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shadow-sm border border-purple-100 dark:border-purple-800/40">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-tight">
              Gemini AI Tutor
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-400 font-semibold mt-0.5">
              Conversing in {getCourseLabel(selectedLanguage)}
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-gray-100 dark:border-slate-700 cursor-pointer"
          title="Reset Conversation"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Message History Scroller */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5 py-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3.5 max-w-[85%] ${
                  isBot ? 'mr-auto text-left' : 'ml-auto flex-row-reverse space-x-reverse text-right'
                }`}
              >
                {/* Avatar */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-sm ${
                  isBot 
                    ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-800/40 text-purple-600 dark:text-purple-400' 
                    : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {isBot ? <Bot className="h-4.5 w-4.5" /> : <UserIcon className="h-4.5 w-4.5" />}
                </div>

                {/* Bubble Container */}
                <div className="space-y-1.5">
                  <div className={`rounded-2xl px-4.5 py-3 border shadow-sm ${
                    isBot 
                      ? 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-900 dark:text-slate-100' 
                      : 'bg-emerald-500 border-emerald-500 text-white font-semibold'
                  }`}>
                    {/* Main text */}
                    <p className="text-base leading-relaxed tracking-wide">{msg.text}</p>
                  </div>

                  {/* Render phonetic helpers for Bot Responses */}
                  {isBot && (msg.pronunciation || msg.translation || msg.explanation) && (
                    <motion.div 
                      className="bg-gray-50/80 dark:bg-slate-900/80 border border-gray-100/60 dark:border-slate-800 rounded-2xl p-4 space-y-3.5 max-w-md shadow-inner text-xs text-gray-600 dark:text-slate-300 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {/* Audio speak & Phonetics */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100/40 pb-2">
                        {msg.pronunciation ? (
                          <span className="font-mono text-purple-600 font-bold leading-relaxed">
                            "{msg.pronunciation}"
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold text-gray-400">Audio & Tools</span>
                        )}

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => playPronunciation(msg.text, 0.65)}
                            className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 text-[10px] font-bold"
                            title="Slow Audio"
                          >
                            Slow
                          </button>
                          <button
                            onClick={() => playPronunciation(msg.text, 0.9)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all active:scale-90 shadow-sm"
                            title="Speak Response"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Direct External Web Connect Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={getGoogleTranslateUrl(msg.text, selectedLanguage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          <Globe className="h-3 w-3 text-blue-500" />
                          <span>Google Translate</span>
                          <ExternalLink className="h-2.5 w-2.5 text-blue-400" />
                        </a>

                        <a
                          href={getYouTubeSearchUrl(msg.text, selectedLanguage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 rounded-lg bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700 hover:bg-red-100 transition-colors"
                        >
                          <Youtube className="h-3 w-3 text-red-500 fill-current" />
                          <span>YouTube Pronunciation</span>
                          <ExternalLink className="h-2.5 w-2.5 text-red-400" />
                        </a>
                      </div>

                      {/* Translation block */}
                      {msg.translation && (
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 block mb-0.5">Translation</span>
                          <p className="font-semibold text-gray-800 text-xs">{msg.translation}</p>
                        </div>
                      )}

                      {/* Explanation Block */}
                      {msg.explanation && (
                        <div className="bg-white rounded-xl p-3 border border-gray-50">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-500 block mb-1">Tutor Insights</span>
                          <p className="text-gray-500 text-[11px] leading-relaxed">{msg.explanation}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isSending && (
            <motion.div 
              className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-2xl p-4.5 max-w-xs text-xs font-semibold text-gray-500 mr-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Bot className="h-4 w-4 text-purple-500 animate-bounce" />
              <span>Gemini is correcting pronunciation & writing reply...</span>
            </motion.div>
          )}

          {/* Error notice */}
          {errorText && (
            <div className="bg-red-50 text-red-800 border border-red-100 rounded-2xl p-4 text-xs font-bold shadow-md max-w-md mx-auto flex items-start space-x-2.5">
              <Bot className="h-5 w-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className="font-bold">Tutor Offline</h4>
                <p className="text-red-600 font-normal mt-1">{errorText}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
        <div ref={chatBottomRef} />
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleSend} className="flex items-center space-x-2 mt-4 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Type message or sentence in ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}...`}
          disabled={isSending}
          className="flex-1 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 text-sm font-medium text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none shadow-sm transition-all hover:border-purple-200 dark:hover:border-purple-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-950"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isSending}
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-all ${
            inputValue.trim() && !isSending
              ? 'bg-purple-500 shadow-purple-100 dark:shadow-none hover:bg-purple-600 active:scale-95 cursor-pointer'
              : 'bg-gray-100 dark:bg-slate-800 shadow-none text-gray-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          <Send className="h-5.5 w-5.5" />
        </button>
      </form>
    </div>
  );
};
