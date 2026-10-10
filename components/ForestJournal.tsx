import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Search, 
  Filter, 
  Calendar, 
  Check, 
  Copy, 
  Lightbulb, 
  Bookmark, 
  Trees 
} from 'lucide-react';
import { MOCK_VIDEOS } from '../constants';

export interface JournalEntry {
  id: string;
  sceneId: string;
  sceneTitle: string;
  reflection: string;
  lessonLearned?: string;
  stamp: string;
  stampLabel: string;
  createdAt: string;
  updatedAt?: string;
}

const STAMPS = [
  { icon: '🌿', label: 'Nature Wonder' },
  { icon: '🍓', label: 'Berry Curious' },
  { icon: '🔬', label: 'Little Scientist' },
  { icon: '📖', label: 'Word Explorer' },
  { icon: '🛡️', label: 'Brave Helper' },
  { icon: '⭐', label: 'Forest Star' },
  { icon: '🎵', label: 'Song of Friendship' }
];

const REFLECTION_PROMPTS = [
  "What is the most exciting thing Djugs learned today?",
  "How did solving a problem together help the forest friends?",
  "What question would you ask Professor Pine or Mila?",
  "What kind deed did you notice in this scene?"
];

const INITIAL_STARTER_ENTRIES: JournalEntry[] = [
  {
    id: 'starter-1',
    sceneId: '1',
    sceneTitle: 'Scene 1: The Mysterious Glowing Book',
    reflection: 'I noticed that Big Bear Djugs was curious rather than scared when he found the glowing book. It made me realize that trying new books opens up wonderful secrets in our world!',
    lessonLearned: 'Curiosity is the start of every adventure.',
    stamp: '📖',
    stampLabel: 'Word Explorer',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'starter-2',
    sceneId: '2',
    sceneTitle: 'Scene 3: Math in the Meadow',
    reflection: 'Counting berries in groups of 5 made it so much quicker for Djugs and the rabbits! Breaking big tasks into smaller piles makes math feel like a friendly game.',
    lessonLearned: 'Grouping numbers helps solve big challenges.',
    stamp: '🍓',
    stampLabel: 'Berry Curious',
    createdAt: new Date().toISOString()
  }
];

const LOCAL_STORAGE_KEY = 'big_bear_djugs_forest_journal_entries';

export const ForestJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse forest journal from localStorage:', e);
    }
    return INITIAL_STARTER_ENTRIES;
  });

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(MOCK_VIDEOS[0]?.id || '1');
  const [reflectionText, setReflectionText] = useState('');
  const [lessonText, setLessonText] = useState('');
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0]);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [sceneFilter, setSceneFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save forest journal entries to localStorage:', e);
    }
  }, [entries]);

  const handleOpenNewEntry = (prompt?: string) => {
    setEditingEntryId(null);
    setReflectionText(prompt ? `${prompt}\n` : '');
    setLessonText('');
    setSelectedSceneId(MOCK_VIDEOS[0]?.id || '1');
    setSelectedStamp(STAMPS[0]);
    setIsFormOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setSelectedSceneId(entry.sceneId);
    setReflectionText(entry.reflection);
    setLessonText(entry.lessonLearned || '');
    const foundStamp = STAMPS.find(s => s.icon === entry.stamp) || STAMPS[0];
    setSelectedStamp(foundStamp);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingEntryId(null);
    setReflectionText('');
    setLessonText('');
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    const matchedScene = MOCK_VIDEOS.find(v => v.id === selectedSceneId);
    const sceneTitle = matchedScene ? matchedScene.title : 'General Forest Reflection';

    if (editingEntryId) {
      // Update existing
      setEntries(prev => prev.map(entry => {
        if (entry.id === editingEntryId) {
          return {
            ...entry,
            sceneId: selectedSceneId,
            sceneTitle,
            reflection: reflectionText.trim(),
            lessonLearned: lessonText.trim() || undefined,
            stamp: selectedStamp.icon,
            stampLabel: selectedStamp.label,
            updatedAt: new Date().toISOString()
          };
        }
        return entry;
      }));
    } else {
      // Create new
      const newEntry: JournalEntry = {
        id: `entry-${Date.now()}`,
        sceneId: selectedSceneId,
        sceneTitle,
        reflection: reflectionText.trim(),
        lessonLearned: lessonText.trim() || undefined,
        stamp: selectedStamp.icon,
        stampLabel: selectedStamp.label,
        createdAt: new Date().toISOString()
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
    handleCancelForm();
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to remove this journal entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleCopyEntry = (entry: JournalEntry) => {
    const textToCopy = `📖 Forest Journal Entry: ${entry.sceneTitle}\nDate: ${new Date(entry.createdAt).toLocaleDateString()}\nStamp: ${entry.stamp} ${entry.stampLabel}\n\nReflection:\n${entry.reflection}${entry.lessonLearned ? `\n\nForest Lesson: ${entry.lessonLearned}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesScene = sceneFilter === 'all' || entry.sceneId === sceneFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      entry.reflection.toLowerCase().includes(searchLower) ||
      entry.sceneTitle.toLowerCase().includes(searchLower) ||
      (entry.lessonLearned && entry.lessonLearned.toLowerCase().includes(searchLower)) ||
      entry.stampLabel.toLowerCase().includes(searchLower);

    return matchesScene && matchesSearch;
  });

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div id="forest-journal-container" className="bg-gradient-to-br from-emerald-50/95 via-yellow-50/90 to-amber-50/95 border-2 border-emerald-300 rounded-3xl p-6 md:p-10 mb-12 shadow-xl text-emerald-950">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-200/60 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-200/50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reflective Learning Log</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-emerald-900 tracking-tight flex items-center gap-2">
            <span>🌲 Explorer's Forest Journal</span>
          </h2>
          <p className="text-emerald-800/80 text-sm mt-1 max-w-xl">
            Record your notes, observations, and key takeaways from each educational scene. Your thoughts stay safely saved in your explorer diary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenNewEntry()}
            className="flex items-center gap-2 font-display font-bold px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-emerald-950 shadow-md hover:shadow-amber-200 transition-all border-b-4 border-amber-600 active:border-b-0 active:translate-y-0.5 text-sm"
          >
            <Plus className="w-4 h-4 text-emerald-950 font-bold" />
            <span>New Reflection</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccessMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-fade-in shadow-sm">
          <Check className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-sm">Reflection saved in your Forest Journal!</span>
        </div>
      )}

      {/* Entry Creation / Edit Drawer or Card */}
      {isFormOpen && (
        <form 
          onSubmit={handleSaveEntry}
          className="mb-8 bg-white/95 rounded-2xl p-6 md:p-8 border-2 border-amber-300 shadow-lg animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4 mb-6">
            <h3 className="text-xl font-bold font-display text-emerald-900 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-amber-600" />
              <span>{editingEntryId ? 'Edit Journal Entry' : 'Write a Forest Reflection'}</span>
            </h3>
            <button
              type="button"
              onClick={handleCancelForm}
              className="p-1.5 text-emerald-800/50 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Scene Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-850 mb-2">
                Select Scene Explored
              </label>
              <select
                value={selectedSceneId}
                onChange={(e) => setSelectedSceneId(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {MOCK_VIDEOS.map(video => (
                  <option key={video.id} value={video.id}>
                    {video.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Stamp / Explorer Badge Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-850 mb-2">
                Choose Explorer Stamp
              </label>
              <div className="flex flex-wrap gap-2">
                {STAMPS.map(stamp => {
                  const isSelected = selectedStamp.icon === stamp.icon;
                  return (
                    <button
                      key={stamp.label}
                      type="button"
                      onClick={() => setSelectedStamp(stamp)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-amber-200 border-amber-400 text-amber-950 font-bold shadow-sm scale-105 ring-2 ring-amber-300/60'
                          : 'bg-white border-emerald-200/80 text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      <span className="text-base">{stamp.icon}</span>
                      <span>{stamp.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Prompts to inspire */}
          {!editingEntryId && (
            <div className="mb-4 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-850 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Need an idea? Click a starter thought:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {REFLECTION_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setReflectionText(prev => prev ? `${prev}\n${prompt} ` : `${prompt} `);
                    }}
                    className="text-[11px] bg-white text-emerald-900 hover:bg-amber-100/70 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reflection Notes Textarea */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-850 mb-2">
              Your Observations & Reflection <span className="text-amber-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="What did you discover with Djugs and Mila? How was math, science, or reading used to solve the challenge?"
              className="w-full bg-emerald-50/30 border border-emerald-200 rounded-xl p-4 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-800/40"
            />
          </div>

          {/* Key Lesson Learned */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-850 mb-2">
              Forest Lesson or Takeaway <span className="text-emerald-700/50 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={lessonText}
              onChange={(e) => setLessonText(e.target.value)}
              placeholder="e.g., Teamwork and patience make big challenges small."
              className="w-full bg-emerald-50/30 border border-emerald-200 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-800/40"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-100">
            <button
              type="button"
              onClick={handleCancelForm}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-emerald-200 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-0.5 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>{editingEntryId ? 'Update Reflection' : 'Save in Journal'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white/70 p-4 rounded-2xl border border-emerald-200/50 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes or lessons..."
            className="w-full bg-emerald-50/50 border border-emerald-200/80 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-300 placeholder:text-emerald-800/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scene filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <select
            value={sceneFilter}
            onChange={(e) => setSceneFilter(e.target.value)}
            className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl px-3 py-2 text-xs font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-300 w-full sm:w-auto"
          >
            <option value="all">All Scenes ({entries.length})</option>
            {MOCK_VIDEOS.map(video => {
              const count = entries.filter(e => e.sceneId === video.id).length;
              return (
                <option key={video.id} value={video.id}>
                  {video.title.split(':')[0]} ({count})
                </option>
              );
            })}
          </select>
        </div>

      </div>

      {/* Journal Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white/80 rounded-2xl p-10 text-center border border-emerald-200/60 shadow-sm">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-700">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold font-display text-emerald-900 mb-1">
            {searchQuery || sceneFilter !== 'all' ? 'No Matching Reflections' : 'Your Journal Is Empty'}
          </h3>
          <p className="text-emerald-800/70 text-xs max-w-md mx-auto mb-6">
            {searchQuery || sceneFilter !== 'all' 
              ? 'Try changing your search terms or filter to see your saved thoughts.'
              : 'Start your forest diary by adding reflections on the math, science, or reading lessons Djugs and Mila experienced.'}
          </p>
          <button
            onClick={() => handleOpenNewEntry()}
            className="inline-flex items-center gap-2 font-display font-bold px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write First Reflection</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white/90 rounded-2xl p-6 border-2 border-emerald-200/70 hover:border-amber-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Strip with stamp */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                      <span>{entry.stamp}</span>
                      <span>{entry.stampLabel}</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800/60 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-display text-emerald-950">
                    {entry.sceneTitle}
                  </h4>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-1 opacity-90 sm:opacity-40 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopyEntry(entry)}
                    title="Copy reflection to clipboard"
                    className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    {copiedId === entry.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditEntry(entry)}
                    title="Edit reflection"
                    className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    title="Delete entry"
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reflection Body */}
              <div className="my-2 text-sm text-emerald-900/90 leading-relaxed font-normal bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                <p className="whitespace-pre-line">{entry.reflection}</p>
              </div>

              {/* Lesson Learned Badge if present */}
              {entry.lessonLearned && (
                <div className="mt-4 pt-3 border-t border-emerald-100 flex items-start gap-2 text-xs text-amber-900 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-850">Forest Lesson:</span> {entry.lessonLearned}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom info banner */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-800/70 border-t border-emerald-200/50 pt-4">
        <div className="flex items-center gap-2">
          <Trees className="w-4 h-4 text-emerald-600" />
          <span>Entries are saved locally in your browser's storage ({entries.length} reflections logged).</span>
        </div>
        
        {entries.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Reset journal back to default starter entries?')) {
                setEntries(INITIAL_STARTER_ENTRIES);
              }
            }}
            className="text-[11px] text-emerald-700 hover:text-emerald-900 hover:underline font-semibold"
          >
            Reset to Starter Notes
          </button>
        )}
      </div>

    </div>
  );
};
