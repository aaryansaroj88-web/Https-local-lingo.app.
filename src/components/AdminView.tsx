import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, LessonContentItem, QuizQuestion } from '../types';
import { 
  Trash2, 
  Plus, 
  ShieldAlert, 
  CheckCircle, 
  Database, 
  X, 
  ChevronDown, 
  Volume2, 
  BookOpen,
  Pencil
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export const AdminView: React.FC = () => {
  const { lessons, seedDefaultLessons, isAdmin } = useApp();
  
  // Form State
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

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-4 shadow-inner">
          <ShieldAlert className="h-9 w-9" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Administrator Access Restricted</h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
          Administrative controls and curriculum editing are strictly restricted to the designated website owner and Super Administrator: <span className="font-extrabold text-red-700 underline">aaryansaroj88@gmail.com</span>.
        </p>
        <p className="text-[11px] text-gray-400 mt-4">
          Please log in with <strong>aaryansaroj88@gmail.com</strong> or use the Super Admin Direct Sign-In on the Account Portal.
        </p>
      </div>
    );
  }

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
      
      // Reset Form fields
      handleCancelEdit();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, `lessons/${lessonId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Header and Seeds */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 text-white rounded-3xl p-8 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 mb-2">
            <span>SUPER ADMIN SITE OWNER: aaryansaroj88@gmail.com</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight">Admin Control Room</h2>
          <p className="text-slate-400 text-sm mt-1">Add custom lessons, manage the catalogs, or seed initial database files.</p>
        </div>

        <button
          onClick={seedDefaultLessons}
          className="flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow transition-all active:scale-95"
        >
          <Database className="h-4.5 w-4.5" />
          <span>Reset/Seed Default Lessons</span>
        </button>
      </div>

      {statusMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-800 text-xs font-bold shadow animate-bounce flex items-center space-x-2.5">
          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Grid Layout: Create Lesson Form and Existing List */}
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Left Column: Create Form */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Plus className={`h-5.5 w-5.5 ${editingLessonId ? 'text-amber-500' : 'text-emerald-500'}`} />
              <span>{editingLessonId ? 'Modify Existing Lesson' : 'Create New Lesson'}</span>
            </h3>
            {editingLessonId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-extrabold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Lang & Cat Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Language</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
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
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
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
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Lesson Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Household Objects"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what the user will master..."
                rows={2}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
              />
            </div>

            {/* Video Tutorial (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Video URL (Optional)</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="e.g., https://www.youtube.com/watch?v=..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Video Title (Optional)</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g., Lesson Video Tutorial"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Dynamic STUDY CARDS Builder */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-sm text-gray-900">Study Cards List</h4>
                <button
                  type="button"
                  onClick={addContentRow}
                  className="flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Card</span>
                </button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {contentItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 relative space-y-3">
                    <button
                      type="button"
                      onClick={() => removeContentRow(idx)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
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
                        className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="English Translation"
                        value={item.translatedWord}
                        onChange={(e) => handleContentChange(idx, 'translatedWord', e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Phonetic Pronunciation"
                        value={item.pronunciation}
                        onChange={(e) => handleContentChange(idx, 'pronunciation', e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Grammar/Usage Note"
                        value={item.explanation}
                        onChange={(e) => handleContentChange(idx, 'explanation', e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic QUIZ questions Builder */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-sm text-gray-900">Quiz Questions List</h4>
                <button
                  type="button"
                  onClick={addQuizRow}
                  className="flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {quizItems.map((q, qIdx) => (
                  <div key={qIdx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 relative space-y-3">
                    <button
                      type="button"
                      onClick={() => removeQuizRow(qIdx)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    
                    <span className="text-[10px] font-black uppercase text-gray-400">Question {qIdx + 1}</span>

                    <input
                      type="text"
                      placeholder="Quiz Question"
                      value={q.question}
                      onChange={(e) => handleQuizQuestionChange(qIdx, e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-xs font-semibold"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          type="text"
                          placeholder={`Option ${optIdx + 1}`}
                          value={opt}
                          onChange={(e) => handleQuizOptionChange(qIdx, optIdx, e.target.value)}
                          className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold"
                        />
                      ))}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Correct Choice</label>
                      <select
                        value={q.correctOption}
                        onChange={(e) => handleQuizCorrectChange(qIdx, parseInt(e.target.value))}
                        className="rounded-lg border border-gray-200 bg-white p-2 text-xs font-semibold w-full"
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

        {/* Right Column: Existing List */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <BookOpen className="h-5.5 w-5.5 text-emerald-500" />
            <span>Manage Existing Lessons ({lessons.length})</span>
          </h3>

          <div className="space-y-4 max-h-[850px] overflow-y-auto pr-1">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="flex items-start justify-between rounded-2xl border border-gray-100 bg-white p-4.5 shadow-inner"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[9px] font-black uppercase text-gray-500">
                      {lesson.language}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700">
                      {lesson.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mt-2 text-sm leading-tight">{lesson.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">{lesson.description}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleEditLesson(lesson)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all active:scale-90"
                    title="Edit/Modify Lesson"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-90"
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
    </div>
  );
};
