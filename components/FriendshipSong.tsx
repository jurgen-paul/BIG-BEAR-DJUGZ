import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Square, Sparkles, Volume2, Heart } from 'lucide-react';

interface Word {
  text: string;
  time: number; // relative delay in ms from start of line
}

interface LyricLine {
  id: number;
  speaker: 'djugs' | 'mila' | 'chorus' | 'both';
  icon: string;
  words: Word[];
}

const SONG_LYRICS: LyricLine[] = [
  {
    id: 1,
    speaker: 'djugs',
    icon: '🐻',
    words: [
      { text: "I'm", time: 0 },
      { text: "a", time: 300 },
      { text: "big", time: 600 },
      { text: "bear", time: 1000 },
      { text: "with", time: 1400 },
      { text: "a", time: 1700 },
      { text: "very", time: 2000 },
      { text: "gentle", time: 2400 },
      { text: "smile!", time: 3000 }
    ]
  },
  {
    id: 2,
    speaker: 'mila',
    icon: '🎒',
    words: [
      { text: "I'm", time: 0 },
      { text: "little", time: 300 },
      { text: "Mila,", time: 700 },
      { text: "let's", time: 1100 },
      { text: "explore", time: 1500 },
      { text: "another", time: 2000 },
      { text: "mile!", time: 2600 }
    ]
  },
  {
    id: 3,
    speaker: 'chorus',
    icon: '✨',
    words: [
      { text: "Oh,", time: 0 },
      { text: "hand", time: 300 },
      { text: "in", time: 600 },
      { text: "paw", time: 900 },
      { text: "and", time: 1200 },
      { text: "friend", time: 1500 },
      { text: "to", time: 1800 },
      { text: "friend,", time: 2100 }
    ]
  },
  {
    id: 4,
    speaker: 'both',
    icon: '💖',
    words: [
      { text: "Our", time: 0 },
      { text: "happy", time: 300 },
      { text: "journey", time: 600 },
      { text: "will", time: 1000 },
      { text: "never", time: 1400 },
      { text: "ever", time: 1800 },
      { text: "end!", time: 2400 }
    ]
  }
];

// Simple happy pentatonic notes for synthesiser (frequencies)
const MELODY_FREQUENCIES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25  // C5
];

export const FriendshipSong: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const stopMusic = () => {
    setIsPlaying(false);
    setCurrentLineIndex(-1);
    setCurrentWordIndex(-1);
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const playSynthesizerNote = (freq: number, duration: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Soft, sweet-sounding triangle wave for the kids' melody
      osc.type = 'triangle';
      osc.frequency.value = freq;

      // Soft volume envelope to avoid harsh popping clicks
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context playback failed or was blocked by browser policies:", e);
    }
  };

  const startSong = () => {
    stopMusic();
    setIsPlaying(true);

    let cumulativeTime = 0;

    SONG_LYRICS.forEach((line, lineIdx) => {
      // Schedule the line activation
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex(lineIdx);
        setCurrentWordIndex(-1);
      }, cumulativeTime);
      timeoutsRef.current.push(lineTimeout as any);

      // Schedule each word in the line
      line.words.forEach((word, wordIdx) => {
        const wordTime = cumulativeTime + word.time;

        const wordTimeout = setTimeout(() => {
          setCurrentWordIndex(wordIdx);
          
          // Play a happy pentatonic sound wave note matching the word's beat!
          const noteIndex = (lineIdx * 3 + wordIdx) % MELODY_FREQUENCIES.length;
          const pitch = MELODY_FREQUENCIES[noteIndex];
          playSynthesizerNote(pitch, 0.4);
        }, wordTime);
        timeoutsRef.current.push(wordTimeout as any);
      });

      // Add generous length for the full sentence
      cumulativeTime += 3800;
    });

    // Final end sequence
    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      setCurrentLineIndex(-1);
      setCurrentWordIndex(-1);
    }, cumulativeTime);
    timeoutsRef.current.push(endTimeout as any);
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div id="friendship-song-container" className="bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-emerald-50/95 border-2 border-emerald-300 rounded-3xl p-6 md:p-10 mb-12 shadow-xl relative overflow-hidden text-emerald-950">
      {/* Playful Floating Musical Notes decoration (child-friendly vector aesthetics) */}
      <div className="absolute top-4 right-8 text-emerald-800/15 pointer-events-none select-none text-right font-display text-2xl">
        𝄞 ♩ ♫ ♬
        <div className="text-sm mt-1 text-emerald-800/10">Key: C Major ♩ = 120</div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border-b border-emerald-200/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-200/50 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Interactive Children's Musicbook</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-emerald-900 tracking-tight flex items-center gap-2">
            <span>🎵 "Hand in Paw"</span>
            <span className="text-lg font-normal text-emerald-700 font-sans italic hidden sm:inline">(A Song of Friendship)</span>
          </h2>
          <p className="text-emerald-800/80 text-sm mt-1 max-w-xl">
            Press the play button to hear the magical, gentle chime melody and sing along following the bouncing words!
          </p>
        </div>

        <button
          onClick={isPlaying ? stopMusic : startSong}
          className={`flex items-center gap-2 font-display font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-md text-base tracking-wide ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white hover:shadow-red-200'
              : 'bg-amber-400 hover:bg-amber-500 text-emerald-950 hover:shadow-amber-200 hover:-translate-y-0.5 border-b-4 border-amber-600 active:border-b-0 active:translate-y-0.5'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Melody</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current animate-pulse" />
              <span>Play Chimes</span>
            </>
          )}
        </button>
      </div>

      {/* Decorative Musical Staff Line Placeholder */}
      <div className="my-6 relative h-10 w-full flex items-center select-none pointer-events-none opacity-50 bg-repeat-x bg-[linear-gradient(to_bottom,#047857_1px,transparent_1px)] bg-[size:100%_4px] border-y border-emerald-700/30">
        <span className="absolute left-4 font-display text-xl text-emerald-800 italic font-semibold">𝄞</span>
        <span className="absolute left-1/4 font-display text-lg text-emerald-800">𝅘𝅥𝅯</span>
        <span className="absolute left-1/2 font-display text-lg text-emerald-800">𝅘𝅥𝅮</span>
        <span className="absolute left-3/4 font-display text-lg text-emerald-800">𝅘𝅥𝅯</span>
        <span className="absolute right-12 font-display text-xl text-emerald-850">𝄾</span>
        <span className="absolute right-4 font-display text-xl text-emerald-850">𝄇</span>
      </div>

      {/* Interactive Song Sheets */}
      <div className="mt-6 grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {SONG_LYRICS.map((line, lineIndex) => {
          const isActiveLine = lineIndex === currentLineIndex;
          
          return (
            <div
              key={line.id}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                isActiveLine
                  ? 'bg-white border-amber-300 shadow-md ring-4 ring-amber-200/50 scale-[1.02]'
                  : 'bg-emerald-100/30 border-emerald-200/30 opacity-75'
              }`}
            >
              <div className="text-3xl bg-amber-100 p-2.5 rounded-2xl border border-amber-200/50 shadow-sm">
                {line.icon}
              </div>
              <div className="flex-1 flex flex-wrap gap-x-1.5 gap-y-1">
                {line.words.map((word, wordIndex) => {
                  const isActiveWord = isActiveLine && wordIndex === currentWordIndex;
                  return (
                    <span
                      key={wordIndex}
                      className={`text-xl md:text-2xl font-display font-medium px-1.5 py-0.5 rounded-lg transition-all duration-150 inline-block ${
                        isActiveWord
                          ? 'text-amber-700 font-bold scale-110 drop-shadow-sm bg-gradient-to-r from-amber-200 to-yellow-100'
                          : isActiveLine
                          ? 'text-emerald-900'
                          : 'text-emerald-850/60'
                      }`}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
              {isActiveLine ? (
                <div className="flex-shrink-0 animate-bounce">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                </div>
              ) : (
                <div className="text-emerald-800/20 text-xs font-mono font-bold">♪</div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-center items-center gap-2 text-xs text-emerald-800/60 font-semibold bg-emerald-100/50 w-fit mx-auto px-4 py-2 rounded-full border border-emerald-200/50">
        <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>Synthesizer chimes are soft triangle waves. Safe for kids' environments.</span>
      </div>
    </div>
  );
};
