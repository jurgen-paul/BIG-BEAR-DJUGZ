import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Star, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  TrendingUp, 
  Trophy, 
  Flame, 
  Check, 
  RotateCcw,
  Info,
  ChevronRight,
  Gift,
  Crown,
  Backpack,
  Printer,
  Volume2,
  Heart
} from 'lucide-react';

export interface ForestBadge {
  id: string;
  name: string;
  category: 'Math' | 'Reading' | 'Science' | 'Life Skills' | 'Art & Nature' | 'Astronomy';
  icon: string;
  description: string;
  questTask: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
  };
  totalLevels: number;
  currentLevel: number; // 0 (locked) to totalLevels (mastered)
  unlockedAt?: string;
  points: number;
}

export interface ForestReward {
  id: string;
  title: string;
  type: 'Trophy' | 'Gear' | 'Accessory' | 'Certificate' | 'Treat';
  icon: string;
  description: string;
  requiredXP: number;
  isUnlocked: boolean;
  isEquipped?: boolean;
  perk: string;
}

export const INITIAL_FOREST_BADGES: ForestBadge[] = [
  {
    id: 'badge-berry-counter',
    name: 'Berry Counter Badge',
    category: 'Math',
    icon: '🍓',
    description: 'Master count grouping and basic additions while sharing sweet meadow berries.',
    questTask: 'Solve addition problems with Djugs & Mila in the meadow.',
    colorTheme: {
      bg: 'from-rose-50 to-red-100/70',
      border: 'border-red-300',
      text: 'text-red-950',
      accent: 'bg-red-500 text-white',
      badgeBg: 'bg-red-100 text-red-700 border-red-300'
    },
    totalLevels: 3,
    currentLevel: 2,
    unlockedAt: '2026-08-28',
    points: 150
  },
  {
    id: 'badge-word-explorer',
    name: 'Word Explorer Badge',
    category: 'Reading',
    icon: '📖',
    description: 'Decode nature signs, spell river terms, and follow written trail clues.',
    questTask: 'Find missing vowels and read river stones.',
    colorTheme: {
      bg: 'from-sky-50 to-blue-100/70',
      border: 'border-blue-300',
      text: 'text-blue-950',
      accent: 'bg-blue-600 text-white',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    totalLevels: 3,
    currentLevel: 3,
    unlockedAt: '2026-08-29',
    points: 200
  },
  {
    id: 'badge-science-sprout',
    name: 'Science Sprout Badge',
    category: 'Science',
    icon: '🌱',
    description: 'Discover plant photosynthesis, seed germination, and acorn chemistry with Professor Pine.',
    questTask: 'Identify sun and water needs for young sprouts in the lab.',
    colorTheme: {
      bg: 'from-emerald-50 to-green-100/70',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      accent: 'bg-emerald-600 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-300'
    },
    totalLevels: 3,
    currentLevel: 1,
    unlockedAt: '2026-08-30',
    points: 100
  },
  {
    id: 'badge-forest-hero',
    name: 'Forest Hero Badge',
    category: 'Life Skills',
    icon: '🛡️',
    description: 'Exhibit bravery, quick thinking, and caring actions during forest weather emergencies.',
    questTask: 'Safely stabilize the windy bird nest rescue.',
    colorTheme: {
      bg: 'from-amber-50 to-yellow-100/70',
      border: 'border-amber-300',
      text: 'text-amber-950',
      accent: 'bg-amber-600 text-white',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    totalLevels: 3,
    currentLevel: 2,
    unlockedAt: '2026-08-31',
    points: 175
  },
  {
    id: 'badge-melody-maker',
    name: 'Forest Harmony Badge',
    category: 'Art & Nature',
    icon: '🎵',
    description: 'Sing and memorize the rhyming verses of the Big Bear Djugs Friendship Song.',
    questTask: 'Sing along with Djugs and the forest choir.',
    colorTheme: {
      bg: 'from-purple-50 to-indigo-100/70',
      border: 'border-purple-300',
      text: 'text-purple-950',
      accent: 'bg-purple-600 text-white',
      badgeBg: 'bg-purple-100 text-purple-700 border-purple-300'
    },
    totalLevels: 3,
    currentLevel: 3,
    unlockedAt: '2026-08-25',
    points: 200
  },
  {
    id: 'badge-trailblazer',
    name: 'Star Trailblazer',
    category: 'Life Skills',
    icon: '🧭',
    description: 'Navigate forest landmarks by reading map coordinates and moss indicators.',
    questTask: 'Complete all exploration scenes in the Great Woods.',
    colorTheme: {
      bg: 'from-teal-50 to-cyan-100/70',
      border: 'border-teal-300',
      text: 'text-teal-950',
      accent: 'bg-teal-600 text-white',
      badgeBg: 'bg-teal-100 text-teal-700 border-teal-300'
    },
    totalLevels: 3,
    currentLevel: 1,
    unlockedAt: '2026-08-31',
    points: 75
  },
  {
    id: 'badge-math-wizard',
    name: 'Meadow Math Wizard',
    category: 'Math',
    icon: '🧮',
    description: 'Solve multiplication and grouping puzzles with groups of 2, 5, and 10.',
    questTask: 'Count 4 baskets of 5 blackberries in under 30 seconds.',
    colorTheme: {
      bg: 'from-orange-50 to-amber-100/70',
      border: 'border-orange-300',
      text: 'text-orange-950',
      accent: 'bg-orange-600 text-white',
      badgeBg: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    totalLevels: 3,
    currentLevel: 2,
    unlockedAt: '2026-08-29',
    points: 150
  },
  {
    id: 'badge-starlight-navigator',
    name: 'Starlight Navigator',
    category: 'Astronomy',
    icon: '✨',
    description: 'Identify the North Star (Polaris), Ursa Major, and track crescent moon phases.',
    questTask: 'Spot the Great Bear constellation over the pine trees.',
    colorTheme: {
      bg: 'from-indigo-50 to-blue-100/70',
      border: 'border-indigo-300',
      text: 'text-indigo-950',
      accent: 'bg-indigo-600 text-white',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    totalLevels: 3,
    currentLevel: 2,
    unlockedAt: '2026-08-30',
    points: 150
  },
  {
    id: 'badge-river-poet',
    name: 'River Scribe & Poet',
    category: 'Reading',
    icon: '📜',
    description: 'Write nature rhymes, identify syllables, and compose songs with Djugs.',
    questTask: 'Compose a four-line forest poem about friendly bears.',
    colorTheme: {
      bg: 'from-cyan-50 to-sky-100/70',
      border: 'border-cyan-300',
      text: 'text-cyan-950',
      accent: 'bg-cyan-600 text-white',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300'
    },
    totalLevels: 3,
    currentLevel: 1,
    unlockedAt: '2026-08-31',
    points: 75
  },
  {
    id: 'badge-kindness-ambassador',
    name: 'Kindness Ambassador',
    category: 'Life Skills',
    icon: '💖',
    description: 'Share forest treats, listen actively, and encourage timid forest animals.',
    questTask: 'Cheer up little Tiko the squirrel when his acorns rolled away.',
    colorTheme: {
      bg: 'from-pink-50 to-rose-100/70',
      border: 'border-pink-300',
      text: 'text-pink-950',
      accent: 'bg-pink-600 text-white',
      badgeBg: 'bg-pink-100 text-pink-800 border-pink-300'
    },
    totalLevels: 3,
    currentLevel: 3,
    unlockedAt: '2026-08-27',
    points: 200
  },
  {
    id: 'badge-wetland-ecologist',
    name: 'Wetland Ecologist',
    category: 'Science',
    icon: '🐸',
    description: 'Explore tadpole metamorphosis, water lily ecosystems, and dragonfly habitats.',
    questTask: 'Observe life cycles in the Great Forest Pond.',
    colorTheme: {
      bg: 'from-emerald-50 to-teal-100/70',
      border: 'border-teal-300',
      text: 'text-teal-950',
      accent: 'bg-teal-600 text-white',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-300'
    },
    totalLevels: 3,
    currentLevel: 0, // Locked
    points: 0
  },
  {
    id: 'badge-guardian-medallion',
    name: 'Forest Guardian Medallion',
    category: 'Life Skills',
    icon: '👑',
    description: 'The ultimate honor for explorers who demonstrate mastery across all forest domains.',
    questTask: 'Earn at least 500 XP and complete 3 kids courses.',
    colorTheme: {
      bg: 'from-amber-100 to-yellow-200/80',
      border: 'border-amber-400',
      text: 'text-amber-950',
      accent: 'bg-amber-600 text-white',
      badgeBg: 'bg-amber-200 text-amber-950 border-amber-400'
    },
    totalLevels: 3,
    currentLevel: 1,
    unlockedAt: '2026-08-31',
    points: 100
  }
];

export const INITIAL_FOREST_REWARDS: ForestReward[] = [
  {
    id: 'reward-honey-jar',
    title: 'Golden Honey Jar of Wisdom',
    type: 'Trophy',
    icon: '🍯',
    description: 'A magical jar of sweet clover honey bestowed by the Queen Bee for great learning curiosity.',
    requiredXP: 100,
    isUnlocked: true,
    isEquipped: true,
    perk: '+10% bonus cheerfulness during morning quizzes!'
  },
  {
    id: 'reward-crystal-glass',
    title: 'Mila’s Crystal Magnifying Glass',
    type: 'Gear',
    icon: '🔍',
    description: 'Polished river quartz lens that reveals hidden leaf veins, caterpillar patterns, and seed secrets.',
    requiredXP: 250,
    isUnlocked: true,
    isEquipped: false,
    perk: 'Unlocks secret science lab notes in the journal.'
  },
  {
    id: 'reward-oak-crown',
    title: 'Elder Oak Leaf Crown',
    type: 'Accessory',
    icon: '👑',
    description: 'Woven by Professor Pine from the highest branches of the 300-year-old Grand Oak.',
    requiredXP: 400,
    isUnlocked: true,
    isEquipped: false,
    perk: 'Djugs tips his hat whenever you enter the classroom.'
  },
  {
    id: 'reward-starlight-compass',
    title: 'Starlight Brass Compass',
    type: 'Gear',
    icon: '🧭',
    description: 'Glows in soft cyan in the dark, always aligning towards Polaris and the Great Bear constellation.',
    requiredXP: 600,
    isUnlocked: false,
    isEquipped: false,
    perk: 'Guarantees safe trail navigation in night lessons.'
  },
  {
    id: 'reward-ranger-backpack',
    title: 'Junior Ranger Expedition Backpack',
    type: 'Gear',
    icon: '🎒',
    description: 'Stitched from water-resistant pine canvas with custom loops for your magnifying glass and field notebook.',
    requiredXP: 800,
    isUnlocked: false,
    isEquipped: false,
    perk: 'Allows carrying up to 10 explorer badges at once.'
  },
  {
    id: 'reward-golden-whistle',
    title: 'Golden Whistle of Friendship',
    type: 'Trophy',
    icon: '🎵',
    description: 'Carved from cedarwood, plays a harmonious chime that calls forest birds and woodland rabbits.',
    requiredXP: 1000,
    isUnlocked: false,
    isEquipped: false,
    perk: 'Plays celebratory chime on every correct quiz answer.'
  }
];

const LOCAL_STORAGE_BADGES_KEY = 'big_bear_djugs_forest_badge_gallery_v2';
const LOCAL_STORAGE_REWARDS_KEY = 'big_bear_djugs_forest_rewards_v2';

export const BadgeGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards'>('badges');

  const [badges, setBadges] = useState<ForestBadge[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BADGES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse badge gallery state:', e);
    }
    return INITIAL_FOREST_BADGES;
  });

  const [rewards, setRewards] = useState<ForestReward[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REWARDS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse rewards state:', e);
    }
    return INITIAL_FOREST_REWARDS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBadgeModal, setActiveBadgeModal] = useState<ForestBadge | null>(null);
  const [rewardClaimSuccess, setRewardClaimSuccess] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BADGES_KEY, JSON.stringify(badges));
    } catch (e) {
      console.error('Failed to sync badge gallery to localStorage:', e);
    }
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REWARDS_KEY, JSON.stringify(rewards));
    } catch (e) {
      console.error('Failed to sync rewards to localStorage:', e);
    }
  }, [rewards]);

  const categories = ['All', 'Math', 'Reading', 'Science', 'Life Skills', 'Art & Nature', 'Astronomy'];

  // Topic mastery calculations
  const totalBadges = badges.length;
  const unlockedBadges = badges.filter(b => b.currentLevel > 0).length;
  const masteredBadges = badges.filter(b => b.currentLevel === b.totalLevels).length;
  const totalPoints = badges.reduce((sum, b) => sum + (b.points || 0), 0);
  
  const totalPossibleSteps = badges.reduce((sum, b) => sum + b.totalLevels, 0);
  const earnedSteps = badges.reduce((sum, b) => sum + b.currentLevel, 0);
  const overallMasteryPercent = Math.round((earnedSteps / totalPossibleSteps) * 100);

  const filteredBadges = selectedCategory === 'All'
    ? badges
    : badges.filter(b => b.category === selectedCategory);

  const playChimeSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Ignore audio failure
    }
  };

  const handleLevelUpBadge = (badgeId: string) => {
    playChimeSound();
    setBadges(prev => prev.map(b => {
      if (b.id === badgeId) {
        const nextLevel = Math.min(b.totalLevels, b.currentLevel + 1);
        const newPoints = nextLevel * 75;
        return {
          ...b,
          currentLevel: nextLevel,
          points: newPoints,
          unlockedAt: b.unlockedAt || new Date().toISOString().split('T')[0]
        };
      }
      return b;
    }));

    if (activeBadgeModal && activeBadgeModal.id === badgeId) {
      const nextLevel = Math.min(activeBadgeModal.totalLevels, activeBadgeModal.currentLevel + 1);
      setActiveBadgeModal({
        ...activeBadgeModal,
        currentLevel: nextLevel,
        points: nextLevel * 75,
        unlockedAt: activeBadgeModal.unlockedAt || new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleUnlockReward = (reward: ForestReward) => {
    if (totalPoints < reward.requiredXP) return;
    playChimeSound();

    setRewards(prev => prev.map(r => {
      if (r.id === reward.id) {
        return { ...r, isUnlocked: true, isEquipped: true };
      }
      return r;
    }));

    setRewardClaimSuccess(reward.title);
    setTimeout(() => setRewardClaimSuccess(null), 3000);
  };

  const handleToggleEquip = (rewardId: string) => {
    setRewards(prev => prev.map(r => {
      if (r.id === rewardId) {
        return { ...r, isEquipped: !r.isEquipped };
      }
      return r;
    }));
  };

  const handleResetGallery = () => {
    if (window.confirm('Reset your badges and rewards progress to starter defaults?')) {
      setBadges(INITIAL_FOREST_BADGES);
      setRewards(INITIAL_FOREST_REWARDS);
      setActiveBadgeModal(null);
    }
  };

  return (
    <div id="badge-gallery-section" className="bg-gradient-to-br from-emerald-50/95 via-amber-50/90 to-yellow-50/95 border-2 border-emerald-300 rounded-3xl p-6 md:p-10 mb-12 shadow-xl text-emerald-950">
      
      {/* Header & Overview */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-200/60 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-200/50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Educational Achievement & Rewards Vault</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-emerald-900 tracking-tight flex items-center gap-2">
            <span>🎖️ Forest Badges & Treasure Chest</span>
          </h2>
          <p className="text-emerald-800/80 text-sm mt-1 max-w-xl">
            Collect 12 forest badges and unlock magical trophies, explorer gear, and crowns as you gain knowledge with Big Bear Djugs.
          </p>
        </div>

        {/* Global Mastery Stats Card */}
        <div className="flex items-center gap-4 bg-white/90 px-5 py-3 rounded-2xl border border-emerald-200/70 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold border border-amber-200 shadow-inner">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700/80 font-bold uppercase">
              <span>Overall Mastery</span>
              <span className="text-emerald-900 font-mono">({overallMasteryPercent}%)</span>
            </div>
            <div className="text-lg font-bold font-display text-emerald-950">
              {masteredBadges} Mastered · {unlockedBadges}/{totalBadges} Badges
            </div>
            <div className="w-36 bg-emerald-100 h-2 rounded-full mt-1.5 overflow-hidden border border-emerald-200">
              <div 
                className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallMasteryPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reward Success Toast */}
      {rewardClaimSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 flex items-center gap-3 animate-fade-in shadow-md">
          <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
          <span className="font-bold text-sm">
            Hooray! You unlocked and equipped the <strong>{rewardClaimSuccess}</strong> in your Explorer Inventory!
          </span>
        </div>
      )}

      {/* Main Mode Toggle: Badges vs. Treasure Chest */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 bg-emerald-100/60 p-2 rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-xs transition-all ${
              activeTab === 'badges'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Forest Badges ({badges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-xs transition-all ${
              activeTab === 'rewards'
                ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-700" />
            <span>Treasure Vault & Gear ({rewards.filter(r => r.isUnlocked).length}/{rewards.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-emerald-900 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Available Explorer Balance: <strong className="text-amber-800 font-mono text-sm">{totalPoints} XP</strong></span>
        </div>
      </div>

      {activeTab === 'badges' ? (
        <>
          {/* Category Pills & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = cat === 'All' 
                  ? badges.length 
                  : badges.filter(b => b.category === cat).length;
                
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-md scale-105 ring-2 ring-emerald-400'
                        : 'bg-white/80 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-emerald-800/80 font-medium">
              Click any badge card to inspect educational objectives and level up!
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => {
              const isLocked = badge.currentLevel === 0;
              const isMastered = badge.currentLevel === badge.totalLevels;
              const progressPercent = Math.round((badge.currentLevel / badge.totalLevels) * 100);

              return (
                <div
                  key={badge.id}
                  onClick={() => setActiveBadgeModal(badge)}
                  className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${
                    isLocked 
                      ? 'from-gray-50 to-gray-100 border-gray-300/80 opacity-75' 
                      : `${badge.colorTheme.bg} ${badge.colorTheme.border}`
                  }`}
                >
                  {/* Top Row: Category tag and mastery status */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/80 border border-black/5 text-emerald-900">
                        {badge.category}
                      </span>
                      
                      {isMastered ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full shadow-sm">
                          <Star className="w-3 h-3 fill-amber-950" />
                          <span>Mastered</span>
                        </span>
                      ) : isLocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/90 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <span>Level {badge.currentLevel}/{badge.totalLevels}</span>
                        </span>
                      )}
                    </div>

                    {/* Badge Center Icon & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border-2 transition-transform duration-300 group-hover:scale-110 ${
                        isLocked 
                          ? 'bg-gray-200/80 border-gray-300 text-gray-400 grayscale' 
                          : badge.colorTheme.badgeBg
                      }`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-display text-emerald-950 group-hover:text-emerald-800 transition-colors">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-emerald-800/80 line-clamp-2 mt-0.5">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar towards topic mastery */}
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
                      <span className="text-[11px] text-emerald-800/70">Topic Mastery</span>
                      <span className="font-mono">{progressPercent}%</span>
                    </div>
                    
                    {/* Level step ticks */}
                    <div className="grid grid-cols-3 gap-1.5 h-2.5 mb-2">
                      {Array.from({ length: badge.totalLevels }).map((_, idx) => {
                        const isStepCompleted = idx < badge.currentLevel;
                        return (
                          <div
                            key={idx}
                            className={`rounded-full transition-all duration-300 ${
                              isStepCompleted
                                ? isMastered ? 'bg-amber-500' : 'bg-emerald-600'
                                : 'bg-black/10'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Footer preview */}
                    <div className="flex items-center justify-between text-[11px] text-emerald-850 mt-3 font-semibold">
                      <span>{badge.points} XP Earned</span>
                      <span className="flex items-center gap-1 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* TREASURE CHEST & GEAR VAULT */
        <div className="space-y-8 animate-fade-in">
          <div className="bg-amber-100/70 p-6 rounded-2xl border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-3xl shadow-md border-2 border-amber-500">
                👑
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-amber-950">
                  Big Bear Djugs' Explorer Armory & Trophy Vault
                </h3>
                <p className="text-xs text-amber-900 mt-1 max-w-lg">
                  Use your earned Explorer XP from completing courses and quizzes to unlock legendary forest artifacts, hats, tools, and crowns.
                </p>
              </div>
            </div>

            <div className="text-center md:text-right bg-white/80 p-4 rounded-xl border border-amber-300">
              <div className="text-xs font-bold uppercase text-amber-900">Your Lifetime XP</div>
              <div className="text-2xl font-bold font-display text-emerald-950 font-mono">{totalPoints} XP</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => {
              const canUnlock = totalPoints >= reward.requiredXP;

              return (
                <div
                  key={reward.id}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between relative shadow-sm ${
                    reward.isUnlocked
                      ? reward.isEquipped ? 'border-amber-400 bg-amber-50/40 ring-2 ring-amber-300' : 'border-emerald-300'
                      : 'border-gray-200 bg-gray-50/80 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {reward.type}
                      </span>
                      
                      {reward.isUnlocked ? (
                        reward.isEquipped ? (
                          <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Equipped</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                            In Backpack
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Requires {reward.requiredXP} XP</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border shadow-inner ${
                        reward.isUnlocked ? 'bg-amber-100 border-amber-300' : 'bg-gray-200 border-gray-300 grayscale'
                      }`}>
                        {reward.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-display text-emerald-950">
                          {reward.title}
                        </h4>
                        <p className="text-xs text-emerald-800/80 mt-0.5">
                          {reward.description}
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/60 mb-4 text-xs text-emerald-900">
                      <strong className="text-emerald-950 block font-bold mb-0.5">Special Forest Perk:</strong>
                      <span>{reward.perk}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    {reward.isUnlocked ? (
                      <button
                        onClick={() => handleToggleEquip(reward.id)}
                        className={`w-full py-2.5 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                          reward.isEquipped
                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                            : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-sm'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{reward.isEquipped ? 'Equipped on Djugs & Explorer' : 'Equip to Inventory'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnlockReward(reward)}
                        disabled={!canUnlock}
                        className={`w-full py-2.5 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                          canUnlock
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md border-b-2 border-amber-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>{canUnlock ? `Claim Reward (${reward.requiredXP} XP)` : `Need ${reward.requiredXP - totalPoints} more XP`}</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for detailed badge inspection & quest tasks */}
      {activeBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border-4 border-emerald-300 shadow-2xl relative text-emerald-950">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-2 shadow-md ${
                  activeBadgeModal.currentLevel === 0 ? 'bg-gray-200 text-gray-400 grayscale' : activeBadgeModal.colorTheme.badgeBg
                }`}>
                  {activeBadgeModal.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {activeBadgeModal.category}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-emerald-950 mt-1">
                    {activeBadgeModal.name}
                  </h3>
                  <p className="text-xs text-emerald-700/80 font-medium">
                    {activeBadgeModal.unlockedAt ? `Unlocked on ${activeBadgeModal.unlockedAt}` : 'Not yet unlocked'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveBadgeModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Description & Quest */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-sm leading-relaxed">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  Educational Objective
                </h4>
                <p className="text-emerald-900/90">{activeBadgeModal.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  Forest Quest Task
                </h4>
                <p className="text-amber-950">{activeBadgeModal.questTask}</p>
              </div>
            </div>

            {/* Level & XP Progression */}
            <div className="mb-6 bg-emerald-900/5 p-4 rounded-2xl border border-emerald-900/10">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                <span>Progress to Full Mastery</span>
                <span>Level {activeBadgeModal.currentLevel} of {activeBadgeModal.totalLevels}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 h-3 mb-2">
                {Array.from({ length: activeBadgeModal.totalLevels }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full ${
                      idx < activeBadgeModal.currentLevel 
                        ? activeBadgeModal.currentLevel === activeBadgeModal.totalLevels ? 'bg-amber-500' : 'bg-emerald-600'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-[11px] text-emerald-800/70 flex justify-between">
                <span>0 XP</span>
                <span className="font-bold text-emerald-900 font-mono">{activeBadgeModal.points} XP Earned</span>
                <span>{activeBadgeModal.totalLevels * 75} XP (Max)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => handleLevelUpBadge(activeBadgeModal.id)}
                disabled={activeBadgeModal.currentLevel >= activeBadgeModal.totalLevels}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-display font-bold text-sm transition-all ${
                  activeBadgeModal.currentLevel >= activeBadgeModal.totalLevels
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-b-4 border-emerald-800 active:border-b-0 active:translate-y-0.5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {activeBadgeModal.currentLevel === 0
                    ? 'Unlock Badge'
                    : activeBadgeModal.currentLevel >= activeBadgeModal.totalLevels
                    ? 'Fully Mastered!'
                    : 'Level Up Topic (+75 XP)'}
                </span>
              </button>

              <button
                onClick={() => setActiveBadgeModal(null)}
                className="py-3 px-5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-sm transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Footer & Reset info */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-800/70 border-t border-emerald-200/50 pt-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600" />
          <span>Badge accomplishments and XP are preserved securely in your local adventure profile.</span>
        </div>
        
        <button
          onClick={handleResetGallery}
          className="text-[11px] text-emerald-700 hover:text-emerald-900 hover:underline font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Badges & Rewards</span>
        </button>
      </div>

    </div>
  );
};
