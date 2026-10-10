import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Trophy, 
  Play, 
  RotateCcw, 
  Check, 
  Lightbulb, 
  Clock, 
  Volume2, 
  Award, 
  Flame, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  Music, 
  Palette, 
  BrainCircuit, 
  X,
  Printer
} from 'lucide-react';

export interface LessonStep {
  title: string;
  concept: string;
  keyPoints: string[];
  kidTip: string;
  interactiveChallenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'Math' | 'Reading' | 'Science' | 'Life Skills' | 'Astronomy' | 'Creative Arts';
  ageRange: string;
  estimatedMinutes: number;
  icon: string;
  colorTheme: {
    gradient: string;
    badgeBg: string;
    accent: string;
    border: string;
    text: string;
  };
  rewardBadgeName: string;
  rewardBadgeIcon: string;
  xpReward: number;
  description: string;
  lessons: LessonStep[];
}

export const KIDS_COURSES: Course[] = [
  {
    id: 'course-meadow-math',
    title: 'Meadow Math & Berry Counting',
    subtitle: 'Master counting by 5s, addition tricks, and pattern discovery in the forest.',
    category: 'Math',
    ageRange: 'Ages 5-8',
    estimatedMinutes: 8,
    icon: '🍓',
    colorTheme: {
      gradient: 'from-rose-500/20 via-red-500/10 to-amber-500/10',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      accent: 'bg-rose-600 hover:bg-rose-700 text-white',
      border: 'border-rose-300',
      text: 'text-rose-950'
    },
    rewardBadgeName: 'Meadow Math Champion',
    rewardBadgeIcon: '🧮',
    xpReward: 200,
    description: 'Help Big Bear Djugs and the meadow bunnies organize sweet wild blackberries into handy groups of 5 and solve joyful nature math puzzles.',
    lessons: [
      {
        title: 'The Magic Group of 5',
        concept: 'Counting by groups is faster than counting one by one.',
        keyPoints: [
          'A single bear paw has 5 claws, and a human hand has 5 fingers!',
          'Instead of counting 1, 2, 3, 4, 5... we can bundle items into packs of 5.',
          'Skip counting goes: 5, 10, 15, 20, 25! It makes counting big baskets of berries super easy.'
        ],
        kidTip: 'Flash both hands open to instantly show 10! Two groups of 5 make 10.',
        interactiveChallenge: {
          question: 'If Djugs fills 3 small baskets with 5 berries each, how many berries does he have?',
          options: ['10 berries', '15 berries', '8 berries', '20 berries'],
          correctIndex: 1,
          explanation: 'Super work! 5 + 5 + 5 = 15 berries! Skip counting: 5, 10, 15!'
        }
      },
      {
        title: 'Sharing with Meadow Bunnies (Friendly Subtraction)',
        concept: 'Subtraction means sharing or taking away from a total pile.',
        keyPoints: [
          'When we give berries to our forest friends, our basket gets smaller, but our happiness gets bigger!',
          'If Djugs has 10 berries and gives 4 to Mila, count backward 4 steps: 9, 8, 7, 6.',
          'Checking your answer is easy: 6 remaining + 4 given away = 10 total!'
        ],
        kidTip: 'Use your fingers to fold down the ones you share with friends.',
        interactiveChallenge: {
          question: 'Djugs collects 12 sweet acorns. He gives 5 acorns to Tiko the squirrel. How many are left?',
          options: ['6 acorns', '8 acorns', '7 acorns', '5 acorns'],
          correctIndex: 2,
          explanation: 'Splendid! 12 - 5 = 7 acorns! Tiko is delighted and Djugs still has 7!'
        }
      },
      {
        title: 'Nature Shapes & Symmetry',
        concept: 'Shapes are everywhere in trees, honeycomb nests, and river stones.',
        keyPoints: [
          'Bees build honeycombs using 6-sided hexagons because they fit tightly with no gaps!',
          'A butterfly’s wings have symmetry: the left side matches the right side like a mirror.',
          'Pinecones grow in spiral patterns found in mathematics called Fibonacci spirals.'
        ],
        kidTip: 'Look closely at a leaf: the center line divides the leaf into two matching halves.',
        interactiveChallenge: {
          question: 'How many sides does a honeycomb hexagon have?',
          options: ['4 sides', '5 sides', '6 sides', '8 sides'],
          correctIndex: 2,
          explanation: 'Spot on! Hexagons have 6 equal sides. Nature is the smartest architect!'
        }
      }
    ]
  },
  {
    id: 'course-river-reading',
    title: 'River Reading & Forest Phonics',
    subtitle: 'Decode trail signs, missing vowels, and rhyme like the forest songbirds.',
    category: 'Reading',
    ageRange: 'Ages 6-9',
    estimatedMinutes: 10,
    icon: '📖',
    colorTheme: {
      gradient: 'from-sky-500/20 via-blue-500/10 to-indigo-500/10',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
      accent: 'bg-sky-600 hover:bg-sky-700 text-white',
      border: 'border-sky-300',
      text: 'text-sky-950'
    },
    rewardBadgeName: 'Trail Scribe Master',
    rewardBadgeIcon: '✍️',
    xpReward: 220,
    description: 'Learn how to sound out nature words, find hidden vowel clues on river stones, and read ancient wooden maps.',
    lessons: [
      {
        title: 'The Five Secret Vowel Keys (A, E, I, O, U)',
        concept: 'Every single English word needs at least one vowel sound to speak.',
        keyPoints: [
          'The vowels are A (Apple), E (Echo), I (Insect), O (Owl), and U (Underbrush).',
          'Vowels make words sing! Without them, consonants like "B-R" can’t make the word "BEAR".',
          'Short vowels sound crisp (like F-O-X), while long vowels say their own name (like C-A-V-E).'
        ],
        kidTip: 'Sing A-E-I-O-U to the tune of a happy chirping bird!',
        interactiveChallenge: {
          question: 'Which vowel is missing from this cozy forest home word: C _ V E ?',
          options: ['O', 'A', 'U', 'I'],
          correctIndex: 1,
          explanation: 'Hooray! C-A-V-E spells Cave! The magic letter A makes the long vowel sound!'
        }
      },
      {
        title: 'Rhyming River Stones',
        concept: 'Rhyming words share the same ending sound.',
        keyPoints: [
          'Bear rhymes with Care, Share, and Pear!',
          'Tree rhymes with Bee, Free, and Sea!',
          'Rhyming helps us remember poetry, songs, and helpful safety rules on the trail.'
        ],
        kidTip: 'Listen to the end of the word, not the beginning letters.',
        interactiveChallenge: {
          question: 'Which word rhymes with Big Bear Djugs’ friend "MILA"?',
          options: ['River', 'Vanilla', 'Rock', 'Acorn'],
          correctIndex: 1,
          explanation: 'Delightful! Mila and Vanilla have matching rhythm and ending sounds!'
        }
      },
      {
        title: 'Following Map Clues & Context Signs',
        concept: 'Using surrounding pictures and context clues helps understand unfamiliar words.',
        keyPoints: [
          'If a trail sign says "CAUTION: SLIPPERY MOSS", look at the picture of water on rocks!',
          'Break long words into smaller chunks: FOR-EST, WA-TER-FALL, SUN-LIGHT.',
          'Reading signs keeps every forest explorer safe and on the right path.'
        ],
        kidTip: 'When you see a big word, put your finger over the second half and read the first chunk first.',
        interactiveChallenge: {
          question: 'How do you break the word "BUTTERFLY" into three friendly chunks?',
          options: ['BUT - TER - FLY', 'BU - TTERF - LY', 'BUTTER - F - LY', 'B - UTTER - FLY'],
          correctIndex: 0,
          explanation: 'Fantastic! BUT-TER-FLY splits cleanly into 3 easy syllables!'
        }
      }
    ]
  },
  {
    id: 'course-oak-science',
    title: 'Oak Lab: Botany & Living Science',
    subtitle: 'Discover photosynthesis, seed journeys, and how ancient trees talk.',
    category: 'Science',
    ageRange: 'Ages 6-10',
    estimatedMinutes: 10,
    icon: '🌱',
    colorTheme: {
      gradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/10',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      border: 'border-emerald-300',
      text: 'text-emerald-950'
    },
    rewardBadgeName: 'Junior Botanist Genius',
    rewardBadgeIcon: '🔬',
    xpReward: 250,
    description: 'Step into Professor Pine’s ancient oak laboratory to experiment with soil nutrients, solar energy, and root networks.',
    lessons: [
      {
        title: 'Photosynthesis: How Plants Eat Sunshine',
        concept: 'Plants make their own sweet food using solar energy, carbon dioxide, and water.',
        keyPoints: [
          'Leaves contain chlorophyll, a special green pigment that catches rays of sunlight.',
          'Plants breathe in carbon dioxide (air that animals breathe out) and drink water through roots.',
          'They release fresh, clean oxygen for humans, bears, and birds to breathe!'
        ],
        kidTip: 'Thank a tree today for giving us fresh oxygen to run and play!',
        interactiveChallenge: {
          question: 'What wonderful gas do green plants give out for animals and humans to breathe?',
          options: ['Smoke', 'Oxygen', 'Helium', 'Steam'],
          correctIndex: 1,
          explanation: 'Brilliant! Plants produce fresh oxygen through the miracle of photosynthesis!'
        }
      },
      {
        title: 'The Great Seed Journey',
        concept: 'Seeds travel by wind, water, and helpful animals to find rich soil.',
        keyPoints: [
          'Dandelion seeds have fluffy parachutes to float on the forest breeze.',
          'Acorns are buried by squirrels like Tiko; the forgotten acorns grow into giant oak trees!',
          'Berries have tough seeds inside that travel safely through animal tummies to new meadows.'
        ],
        kidTip: 'Every giant hundred-year-old oak tree once started as a tiny acorn in the palm of a hand.',
        interactiveChallenge: {
          question: 'How do fluffy dandelion seeds travel across the meadow to start new plants?',
          options: ['They ride on bicycles', 'They float on the wind', 'They swim under rocks', 'They dig tunnels'],
          correctIndex: 1,
          explanation: 'Spot on! The wind catches their fluffy parachutes and gently carries them to sunny soil!'
        }
      },
      {
        title: 'The Wood Wide Web (Underground Tree Networks)',
        concept: 'Trees communicate and share sugar nutrients through underground fungal networks.',
        keyPoints: [
          'Beneath the forest floor, millions of tiny mushroom threads (mycelium) connect tree roots.',
          'If a mother tree has extra sugar, she sends it through the network to feed baby saplings in the shade!',
          'If pests attack one tree, it sends warning signals through the fungal network so nearby trees can protect themselves.'
        ],
        kidTip: 'A forest isn’t just individual trees—it’s a giant, caring family helping one another survive.',
        interactiveChallenge: {
          question: 'How do mother trees send nutrients to little baby saplings in deep forest shade?',
          options: ['Through underground root & mushroom networks', 'By mailing letters in pinecones', 'Using radio waves', 'By shaking their top leaves'],
          correctIndex: 0,
          explanation: 'Incredible! The "Wood Wide Web" of mycelium connects trees so they can share food and care for young saplings!'
        }
      }
    ]
  },
  {
    id: 'course-forest-safety',
    title: 'Wilderness Safety & Kindness Squad',
    subtitle: 'Calm breathing, trail navigation etiquette, and helping friends in need.',
    category: 'Life Skills',
    ageRange: 'Ages 5-10',
    estimatedMinutes: 7,
    icon: '🛡️',
    colorTheme: {
      gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/10',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      accent: 'bg-amber-600 hover:bg-amber-700 text-white',
      border: 'border-amber-300',
      text: 'text-amber-950'
    },
    rewardBadgeName: 'Guardian of the Woods',
    rewardBadgeIcon: '🌟',
    xpReward: 200,
    description: 'Learn vital life skills: staying calm during storms, packing the explorer 5-essentials, and leading with empathy and kindness.',
    lessons: [
      {
        title: 'The Big Bear Belly Breath (Calming Down)',
        concept: 'Deep belly breathing calms your heartbeat when you feel scared or overwhelmed.',
        keyPoints: [
          'Breathe in slowly through your nose for 4 counts, pretending to smell sweet wild honeysuckle.',
          'Hold for 2 counts while imagining a calm mountain lake.',
          'Breathe out slowly through your mouth like blowing a dandelion puff for 4 counts.',
          'Doing this 3 times helps your brain think clearly and bravely!'
        ],
        kidTip: 'Place your hand on your tummy—watch it rise like a sleeping bear and fall gently.',
        interactiveChallenge: {
          question: 'What is the best thing to do when you feel sudden worry or anxiety?',
          options: ['Run around in circles shouting', 'Take 3 slow, deep belly breaths to calm your mind', 'Eat 20 chocolate candies', 'Hide without telling anyone'],
          correctIndex: 1,
          explanation: 'Outstanding! Slow deep breaths deliver oxygen to your brain so you can make calm, smart choices!'
        }
      },
      {
        title: 'The 5 Essential Trail Tools',
        concept: 'Prepared explorers always carry the right gear before stepping into nature.',
        keyPoints: [
          '1. Fresh Water Bottle (Hydration is energy!)',
          '2. Whistle (Blow 3 sharp blasts if you ever need help—it carries further than shouting)',
          '3. Sun Hat & Weather Jacket',
          '4. Trail Map & Compass',
          '5. Healthy snack (Apples, nuts, or berries for fuel)'
        ],
        kidTip: 'Leave No Trace: Always pack out your snack wrappers so the forest stays pristine for animals.',
        interactiveChallenge: {
          question: 'If you ever get separated on a nature hike, what universal sound signal should you make with a whistle?',
          options: ['1 quiet peep', '3 sharp whistle blasts (Universal signal for help)', 'Play a full song', 'Throw the whistle in a pond'],
          correctIndex: 1,
          explanation: 'Perfect! Three distinct whistle blasts is the international signal that helps rangers find you swiftly!'
        }
      }
    ]
  },
  {
    id: 'course-starlight-astronomy',
    title: 'Starlight Astronomy & Night Woods',
    subtitle: 'Locate constellations, track moon phases, and meet glowing creatures.',
    category: 'Astronomy',
    ageRange: 'Ages 7-10',
    estimatedMinutes: 9,
    icon: '✨',
    colorTheme: {
      gradient: 'from-indigo-500/20 via-purple-500/10 to-blue-500/10',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      accent: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      border: 'border-indigo-300',
      text: 'text-indigo-950'
    },
    rewardBadgeName: 'Starlight Navigator',
    rewardBadgeIcon: '🔭',
    xpReward: 240,
    description: 'Explore the celestial dome above the forest canopy. Find Ursa Major (The Great Bear constellation) and explore bioluminescence.',
    lessons: [
      {
        title: 'Ursa Major: Finding the Celestial Bear',
        concept: 'Constellations are patterns of stars used for navigation and storytelling.',
        keyPoints: [
          'Ursa Major means "The Great Bear" in Latin—it looks like a giant bear walking across the northern sky!',
          'Inside the Great Bear is the famous Big Dipper shape (a soup ladle with a curved handle).',
          'The two pointer stars on the edge of the cup point straight to Polaris (The North Star), which never moves!'
        ],
        kidTip: 'If you face Polaris, you are facing True North. East is on your right, West is on your left!',
        interactiveChallenge: {
          question: 'Which star in the northern sky stays in the same place and helps travelers find North?',
          options: ['Polaris (The North Star)', 'The Sun', 'Mars', 'A shooting meteor'],
          correctIndex: 0,
          explanation: 'Bravo! Polaris sits directly over Earth’s North Pole, serving as an unmoving beacon for nighttime explorers!'
        }
      },
      {
        title: 'Bioluminescence: Nature’s Glow in the Dark',
        concept: 'Some night animals and mushrooms create their own cool, chemical light.',
        keyPoints: [
          'Fireflies mix a special substance called luciferin with oxygen to create twinkling yellow-green light.',
          'They use their glowing patterns to send coded messages to their firefly friends.',
          'Foxfire is a rare forest fungus on damp decaying wood that glows in eerie emerald green in total darkness!'
        ],
        kidTip: 'Bioluminescent light produces almost zero heat—it is 100% efficient light!',
        interactiveChallenge: {
          question: 'Why do fireflies flash their friendly glowing lights on warm summer nights?',
          options: ['To recharge their batteries', 'To communicate messages with friends', 'To boil water', 'To scare away flowers'],
          correctIndex: 1,
          explanation: 'Splendid! Fireflies use rhythmically timed flashes like Morse code to communicate with friends!'
        }
      }
    ]
  },
  {
    id: 'course-forest-music-art',
    title: 'Forest Rhythm, Music & Soundscapes',
    subtitle: 'Build pinecone percussion, learn musical beats, and paint with earth colors.',
    category: 'Creative Arts',
    ageRange: 'Ages 5-9',
    estimatedMinutes: 8,
    icon: '🎵',
    colorTheme: {
      gradient: 'from-fuchsia-500/20 via-pink-500/10 to-purple-500/10',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300',
      accent: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
      border: 'border-fuchsia-300',
      text: 'text-fuchsia-950'
    },
    rewardBadgeName: 'Symphony of the Woods',
    rewardBadgeIcon: '🥁',
    xpReward: 210,
    description: 'Learn musical rhythm patterns with Djugs’ paw taps, make natural paint from blueberries and clay, and harmonize with bird calls.',
    lessons: [
      {
        title: 'The 4/4 Forest Heartbeat Rhythm',
        concept: 'Music is built on repeating pulses called tempo and meter.',
        keyPoints: [
          'Tap your feet: 1 - 2 - 3 - 4! The first beat is the strong downbeat (like Djugs’ big step).',
          'Woodpeckers tap fast sixteenth notes on tree trunks looking for bugs.',
          'Gentle river rapids play a continuous rushing shhh-shhh rhythm that calms the forest.'
        ],
        kidTip: 'Clap on beats 2 and 4 while tapping your toe on 1 and 3!',
        interactiveChallenge: {
          question: 'How many steady beats are in a standard 4/4 musical measure?',
          options: ['2 beats', '4 beats', '10 beats', '100 beats'],
          correctIndex: 1,
          explanation: 'Spot on! A 4/4 measure has 4 steady pulses—just like 1-2-3-4!'
        }
      },
      {
        title: 'Painting with Earth’s Natural Pigments',
        concept: 'Natural colors can be gently extracted from berries, flowers, charcoal, and clay.',
        keyPoints: [
          'Crushed blueberries make rich indigo blue and purple paint.',
          'Yellow marigold petals mixed with a drop of water make vibrant sunshine yellow.',
          'Cool campfire charcoal makes bold black ink used for prehistoric cave art drawings!'
        ],
        kidTip: 'Ancient artists made rock art thousands of years ago using only ground minerals and water.',
        interactiveChallenge: {
          question: 'Which natural meadow ingredient makes beautiful deep purple-blue paint for nature sketches?',
          options: ['Crushed wild blueberries', 'Sand', 'Ice cubes', 'Pine needles'],
          correctIndex: 0,
          explanation: 'Hooray! Ripe blueberries contain deep anthocyanin pigments that make wonderful natural watercolors!'
        }
      }
    ]
  }
];

export interface CourseProgressEntry {
  completedLessons: number;
  isFullyCompleted: boolean;
  score: number;
  completedAt?: string;
}

const LOCAL_STORAGE_COURSES_KEY = 'big_bear_djugs_kids_courses_progress_v1';

export const KidsCourses: React.FC = () => {
  // Saved course progress: courseId -> CourseProgressEntry
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgressEntry>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load courses progress:', e);
    }
    // Default starter progress: 1 course finished
    return {
      'course-meadow-math': {
        completedLessons: 3,
        isFullyCompleted: true,
        score: 300,
        completedAt: '2026-08-30'
      },
      'course-river-reading': {
        completedLessons: 1,
        isFullyCompleted: false,
        score: 100
      }
    };
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [courseCompletionModal, setCourseCompletionModal] = useState<Course | null>(null);
  const [speakingText, setSpeakingText] = useState(false);
  const [activeTabFilter, setActiveTabFilter] = useState<string>('All');
  const [showCertificate, setShowCertificate] = useState<Course | null>(null);
  const [explorerName, setExplorerName] = useState('Little Forest Ranger');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(courseProgress));
    } catch (e) {
      console.error('Failed to persist courses progress:', e);
    }
  }, [courseProgress]);

  // Overall Statistics
  const totalCourses = KIDS_COURSES.length;
  const completedCoursesCount = Object.values(courseProgress).filter((p: CourseProgressEntry) => p.isFullyCompleted).length;
  const totalCourseXP = Object.entries(courseProgress).reduce((sum: number, [cId, p]: [string, CourseProgressEntry]) => {
    const course = KIDS_COURSES.find(c => c.id === cId);
    if (!course) return sum;
    return sum + (p.isFullyCompleted ? course.xpReward : p.completedLessons * 50);
  }, 0);

  const categories = ['All', 'Math', 'Reading', 'Science', 'Life Skills', 'Astronomy', 'Creative Arts'];

  const filteredCourses = activeTabFilter === 'All'
    ? KIDS_COURSES
    : KIDS_COURSES.filter(c => c.category === activeTabFilter);

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    // Resume at next incomplete lesson
    const progress = courseProgress[course.id];
    const resumeIndex = progress ? Math.min(progress.completedLessons, course.lessons.length - 1) : 0;
    setCurrentLessonIndex(resumeIndex);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
    setCurrentLessonIndex(0);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingText(false);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !selectedCourse) return;
    setHasSubmittedAnswer(true);

    const currentLesson = selectedCourse.lessons[currentLessonIndex];
    const isCorrect = selectedAnswer === currentLesson.interactiveChallenge.correctIndex;

    // Update progress state
    setCourseProgress(prev => {
      const prevEntry = prev[selectedCourse.id] || { completedLessons: 0, isFullyCompleted: false, score: 0 };
      const newCompleted = Math.max(prevEntry.completedLessons, currentLessonIndex + 1);
      const isCompleteNow = newCompleted >= selectedCourse.lessons.length;

      return {
        ...prev,
        [selectedCourse.id]: {
          completedLessons: newCompleted,
          isFullyCompleted: prevEntry.isFullyCompleted || isCompleteNow,
          score: prevEntry.score + (isCorrect ? 100 : 50),
          completedAt: isCompleteNow ? new Date().toISOString().split('T')[0] : prevEntry.completedAt
        }
      };
    });
  };

  const handleNextLesson = () => {
    if (!selectedCourse) return;

    if (currentLessonIndex < selectedCourse.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasSubmittedAnswer(false);
    } else {
      // Finished all lessons in course!
      setCourseCompletionModal(selectedCourse);
      handleCloseCourse();
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setHasSubmittedAnswer(false);
    }
  };

  const handleSpeakLesson = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingText) {
      window.speechSynthesis.cancel();
      setSpeakingText(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.92;
    utterance.pitch = 1.1;
    utterance.onend = () => setSpeakingText(false);
    utterance.onerror = () => setSpeakingText(false);
    setSpeakingText(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id="kids-courses-academy" className="bg-gradient-to-br from-amber-50/95 via-emerald-50/90 to-teal-50/95 border-2 border-emerald-300 rounded-3xl p-6 md:p-10 mb-12 shadow-xl text-emerald-950">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-200/60 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-200/60 text-amber-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Interactive Forest Academy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-emerald-950 tracking-tight flex items-center gap-2">
            <span>🌲 Big Bear Djugs: Kids Learning Courses</span>
          </h2>
          <p className="text-emerald-800/80 text-sm mt-1 max-w-2xl">
            Step-by-step interactive lessons with Big Bear Djugs, Mila, and Professor Pine. Master Math, Reading, Science, Life Skills, and Art to earn badges, XP, and printable Ranger diplomas!
          </p>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-4 bg-white/90 px-5 py-3.5 rounded-2xl border border-emerald-200/80 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-amber-950 font-bold shadow-sm">
            <Trophy className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="text-xs text-emerald-800/70 font-bold uppercase">
              Courses Completed
            </div>
            <div className="text-xl font-bold font-display text-emerald-950">
              {completedCoursesCount} of {totalCourses} Courses Mastered
            </div>
            <div className="text-[11px] text-amber-800 font-bold flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{totalCourseXP} Academy XP Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = activeTabFilter === cat;
            const count = cat === 'All' 
              ? KIDS_COURSES.length 
              : KIDS_COURSES.filter(c => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveTabFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md scale-105 ring-2 ring-emerald-400'
                    : 'bg-white/80 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-emerald-900 text-emerald-100' : 'bg-emerald-100 text-emerald-800'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-850">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Interactive sound & audio reading available in all lessons!</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = courseProgress[course.id] || { completedLessons: 0, isFullyCompleted: false, score: 0 };
          const progressPercent = Math.round((progress.completedLessons / course.lessons.length) * 100);

          return (
            <div
              key={course.id}
              className={`bg-white/90 rounded-2xl p-6 border-2 ${course.colorTheme.border} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden`}
            >
              {/* Top Row: Category + Age tag */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${course.colorTheme.badgeBg}`}>
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800/70 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{course.estimatedMinutes} min · {course.ageRange}</span>
                  </div>
                </div>

                {/* Course Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl border border-amber-300 shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-emerald-950 group-hover:text-emerald-800 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-emerald-800/80 line-clamp-2 mt-0.5">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-emerald-900/85 mb-4 leading-relaxed font-normal bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                  {course.description}
                </p>
              </div>

              {/* Progress & Reward Footer */}
              <div className="pt-4 border-t border-emerald-100">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
                  <span className="flex items-center gap-1 text-[11px]">
                    {progress.isFullyCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{progress.completedLessons} of {course.lessons.length} Lessons</span>
                  </span>
                  <span className="font-mono text-emerald-800">{progressPercent}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-emerald-100 h-2 rounded-full mb-3 overflow-hidden border border-emerald-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress.isFullyCompleted ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Reward Preview */}
                <div className="flex items-center justify-between mb-4 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200 text-xs">
                  <span className="text-amber-950 font-medium flex items-center gap-1.5">
                    <span className="text-base">{course.rewardBadgeIcon}</span>
                    <strong className="text-[11px] font-bold">{course.rewardBadgeName}</strong>
                  </span>
                  <span className="text-amber-900 font-bold font-mono">+{course.xpReward} XP</span>
                </div>

                {/* Course Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartCourse(course)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-display font-bold text-xs transition-all shadow-sm ${
                      progress.isFullyCompleted
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-amber-400 hover:bg-amber-500 text-emerald-950 border-b-2 border-amber-600'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{progress.isFullyCompleted ? 'Review Lessons' : progress.completedLessons > 0 ? 'Continue Lesson' : 'Start Course'}</span>
                  </button>

                  {progress.isFullyCompleted && (
                    <button
                      onClick={() => setShowCertificate(course)}
                      title="View & Print Diploma"
                      className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors border border-emerald-300"
                    >
                      <Award className="w-4 h-4 text-emerald-700" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ACTIVE LESSON MODAL / INTERACTIVE LEARNING STAGE */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border-4 border-emerald-300 shadow-2xl relative text-emerald-950 my-8">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-emerald-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl border border-amber-300">
                  {selectedCourse.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${selectedCourse.colorTheme.badgeBg}`}>
                    {selectedCourse.category} · Lesson {currentLessonIndex + 1} of {selectedCourse.lessons.length}
                  </span>
                  <h3 className="text-xl font-bold font-display text-emerald-950 mt-1">
                    {selectedCourse.lessons[currentLessonIndex].title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currentLesson = selectedCourse.lessons[currentLessonIndex];
                    const fullText = `${currentLesson.title}. ${currentLesson.concept}. Key takeaways: ${currentLesson.keyPoints.join('. ')}. Big Bear tip: ${currentLesson.kidTip}`;
                    handleSpeakLesson(fullText);
                  }}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                    speakingText 
                      ? 'bg-amber-300 text-amber-950 animate-pulse' 
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  title="Listen to lesson audio"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{speakingText ? 'Reading...' : 'Listen'}</span>
                </button>

                <button
                  onClick={handleCloseCourse}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Lesson Step Indicator */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {selectedCourse.lessons.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentLessonIndex 
                      ? 'bg-amber-500 ring-2 ring-amber-300' 
                      : idx < currentLessonIndex 
                      ? 'bg-emerald-600' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Lesson Concept & Teaching Body */}
            <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>The Big Idea</span>
                </h4>
                <p className="text-emerald-950 text-sm font-semibold">
                  {selectedCourse.lessons[currentLessonIndex].concept}
                </p>
              </div>

              {/* Key Teaching Points */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                  🌲 Forest Knowledge Points:
                </h4>
                <ul className="space-y-2.5">
                  {selectedCourse.lessons[currentLessonIndex].keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-emerald-900/90 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kid Tip Box */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <span className="font-bold text-amber-900 block mb-0.5">Djugs' Friendly Explorer Tip:</span>
                  <span>{selectedCourse.lessons[currentLessonIndex].kidTip}</span>
                </div>
              </div>

              {/* Interactive Practice Checkpoint */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-emerald-700" />
                  <span>Interactive Quick Checkpoint:</span>
                </h4>
                <p className="text-sm font-bold text-emerald-950 mb-4">
                  {selectedCourse.lessons[currentLessonIndex].interactiveChallenge.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {selectedCourse.lessons[currentLessonIndex].interactiveChallenge.options.map((option, oIdx) => {
                    const isSelected = selectedAnswer === oIdx;
                    const isCorrect = oIdx === selectedCourse.lessons[currentLessonIndex].interactiveChallenge.correctIndex;
                    
                    let btnStyle = 'bg-white border-emerald-200 text-emerald-950 hover:bg-emerald-100/50';
                    if (hasSubmittedAnswer) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-sm';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-100 text-red-950 border-red-300 line-through';
                      } else {
                        btnStyle = 'bg-gray-100 text-gray-400 border-gray-200 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-200 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-300';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={hasSubmittedAnswer}
                        onClick={() => setSelectedAnswer(oIdx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all font-medium ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Feedback */}
                {!hasSubmittedAnswer ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className={`w-full py-2.5 rounded-xl font-display font-bold text-xs transition-all shadow-sm ${
                      selectedAnswer !== null 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-b-2 border-emerald-800' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Check My Answer
                  </button>
                ) : (
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950 animate-fade-in">
                    <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{selectedCourse.lessons[currentLessonIndex].interactiveChallenge.explanation}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-emerald-100 gap-3">
              <button
                onClick={handlePrevLesson}
                disabled={currentLessonIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  currentLessonIndex === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="text-xs font-bold text-emerald-800/80">
                Lesson {currentLessonIndex + 1} of {selectedCourse.lessons.length}
              </div>

              <button
                onClick={handleNextLesson}
                disabled={!hasSubmittedAnswer}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-display font-bold transition-all shadow-sm ${
                  hasSubmittedAnswer
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-b-2 border-emerald-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                <span>{currentLessonIndex === selectedCourse.lessons.length - 1 ? 'Complete Course! 🎉' : 'Next Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* COURSE COMPLETION CELEBRATION MODAL */}
      {courseCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-amber-300 shadow-2xl text-center text-emerald-950 relative animate-scale-up">
            
            <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 border-2 border-amber-300 shadow-md">
              {courseCompletionModal.rewardBadgeIcon}
            </div>

            <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              Course Mastered!
            </span>

            <h3 className="text-2xl font-bold font-display text-emerald-950 mt-3 mb-2">
              Congratulations Explorer!
            </h3>
            <p className="text-xs text-emerald-800/80 mb-6">
              You successfully mastered <strong className="text-emerald-950">{courseCompletionModal.title}</strong> and earned <strong className="text-amber-800">+{courseCompletionModal.xpReward} XP</strong>!
            </p>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-6 text-left flex items-center gap-3">
              <div className="text-3xl">{courseCompletionModal.rewardBadgeIcon}</div>
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase">New Badge Unlocked</div>
                <div className="text-sm font-bold text-emerald-950">{courseCompletionModal.rewardBadgeName}</div>
                <div className="text-[11px] text-emerald-700">Added to your Forest Badge Gallery & Inventory</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const c = courseCompletionModal;
                  setCourseCompletionModal(null);
                  setShowCertificate(c);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-emerald-950 font-display font-bold text-xs shadow-md border-b-2 border-amber-600 transition-all flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>View Diploma</span>
              </button>

              <button
                onClick={() => setCourseCompletionModal(null)}
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs transition-colors"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PRINTABLE DIPLOMA / CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-xl w-full border-8 border-double border-amber-400 shadow-2xl text-emerald-950 my-6 relative">
            
            <button
              onClick={() => setShowCertificate(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* Certificate Border Frame */}
            <div className="text-center border-4 border-emerald-800/20 p-6 rounded-2xl bg-amber-50/30">
              <div className="text-3xl mb-2">🌲 📜 🎖️</div>
              
              <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1">
                Big Bear Djugs Forest Academy
              </div>
              <h2 className="text-3xl font-bold font-display text-emerald-950 mb-1">
                Certificate of Forest Mastery
              </h2>
              <p className="text-xs text-emerald-700/80 italic mb-4">
                This honor certifies that
              </p>

              {/* Editable Kid Name */}
              <div className="inline-block border-b-2 border-emerald-800 pb-1 px-4 mb-4">
                <input
                  type="text"
                  value={explorerName}
                  onChange={(e) => setExplorerName(e.target.value)}
                  placeholder="Enter Explorer Name"
                  className="text-xl font-bold font-display text-emerald-950 text-center bg-transparent focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <p className="text-xs text-emerald-900 max-w-md mx-auto leading-relaxed mb-6">
                Has enthusiastically completed all educational lessons and practical challenges in:
                <br />
                <strong className="text-sm text-emerald-950 font-bold block mt-1">
                  {showCertificate.title} ({showCertificate.category})
                </strong>
              </p>

              {/* Signatures & Seal */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-emerald-200/60 text-xs">
                <div className="text-center">
                  <div className="font-display font-bold text-amber-800 text-sm">🐾 Big Bear Djugs</div>
                  <div className="text-[10px] text-emerald-700">Friendly Forest Mentor</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-emerald-800 text-sm">🦉 Professor Pine</div>
                  <div className="text-[10px] text-emerald-700">Head of Forest Botany</div>
                </div>
              </div>
            </div>

            {/* Print Action */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-emerald-950 font-display font-bold text-xs shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertificate(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
