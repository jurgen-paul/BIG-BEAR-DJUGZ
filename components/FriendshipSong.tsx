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
    <div id="friendship-song-container" className="bg-gradient-to-br from-emerald-950/40 to-amber-950/20 border border-emerald-800/40 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden">
      {/* Decorative foliage shadows and music elements */}
      <div className="absolute top-0 right-0 p-8 text-emerald-800/20 pointer-events-none">
        <Music className="w-32 h-32 rotate-12" />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Nursery Rhyme</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
            🎵 "Hand in Paw" (The Friendship Song)
          </h2>
          <p className="text-emerald-300/80 text-sm mt-1">
            Press play to hear the sweet chime melody and sing along with Djugs & Mila!
          </p>
        </div>

        <button
          onClick={isPlaying ? stopMusic : startSong}
          className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white hover:shadow-red-500/20'
              : 'bg-amber-500 hover:bg-amber-600 text-emerald-950 hover:shadow-amber-500/20 hover:-translate-y-0.5'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Song</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Play Interactive Chime</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Song Sheets */}
      <div className="mt-8 grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {SONG_LYRICS.map((line, lineIndex) => {
          const isActiveLine = lineIndex === currentLineIndex;
          
          return (
            <div
              key={line.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                isActiveLine
                  ? 'bg-emerald-900/60 border border-amber-500/40 shadow-inner'
                  : 'bg-emerald-950/20 border border-transparent opacity-60'
              }`}
            >
              <div className="text-2xl bg-emerald-950/50 p-2.5 rounded-full border border-emerald-800/30">
                {line.icon}
              </div>
              <div className="flex-1 flex flex-wrap gap-[0.35rem]">
                {line.words.map((word, wordIndex) => {
                  const isActiveWord = isActiveLine && wordIndex === currentWordIndex;
                  return (
                    <span
                      key={wordIndex}
                      className={`text-lg md:text-xl font-medium px-1 rounded transition-all duration-150 inline-block ${
                        isActiveWord
                          ? 'text-amber-300 font-bold scale-110 drop-shadow-md bg-amber-500/10'
                          : isActiveLine
                          ? 'text-emerald-100'
                          : 'text-emerald-200/50'
                      }`}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
              {isActiveLine && (
                <div className="flex-shrink-0 animate-bounce">
                  <Heart className="w-5 h-5 text-amber-400 fill-current" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-center items-center gap-2 text-xs text-emerald-500/60 font-medium">
        <Volume2 className="w-3.5 h-3.5" />
        <span>Nursery synth uses clean triangle oscillators. Safe for little ears.</span>
      </div>
    </div>
  );
};
