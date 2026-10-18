/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Trees, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sliders, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Bird, 
  Droplets, 
  Wind, 
  Moon,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAmbientAudio } from '../context/AmbientAudioContext';
import { useTranslation } from '../context/LanguageContext';
import { AmbientPreset, PRESET_CONFIGS } from '../lib/ambientForestAudio';

export const AmbientForestAudio: React.FC = () => {
  const {
    isPlaying,
    volume,
    isMuted,
    preset,
    layers,
    isWidgetOpen,
    setIsWidgetOpen,
    togglePlay,
    setVolume,
    toggleMute,
    setPreset,
    toggleLayer,
    getAnalyserNode
  } = useAmbientAudio();

  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Real-time canvas visualizer for forest nature audio
  useEffect(() => {
    if (!isWidgetOpen) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = getAnalyserNode();
      let avgEnergy = 0;

      if (isPlaying && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        avgEnergy = (sum / bufferLength) / 255;
      }

      phase += 0.04 + avgEnergy * 0.08;

      // Draw background ambient glow
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw multiple gentle nature harmonic waves
      const waveConfigs = [
        { color: 'rgba(52, 211, 153, 0.7)', amp: 8 + avgEnergy * 24, freq: 0.02, speed: phase },
        { color: 'rgba(251, 191, 36, 0.65)', amp: 6 + avgEnergy * 18, freq: 0.028, speed: phase * 1.3 + 1.2 },
        { color: 'rgba(16, 185, 129, 0.4)', amp: 10 + avgEnergy * 15, freq: 0.015, speed: phase * 0.7 + 2.5 }
      ];

      waveConfigs.forEach((cfg) => {
        ctx.beginPath();
        ctx.strokeStyle = cfg.color;
        ctx.lineWidth = isPlaying ? 2.5 : 1.5;

        for (let x = 0; x <= width; x += 4) {
          const y = height / 2 + Math.sin(x * cfg.freq + cfg.speed) * (isPlaying ? cfg.amp : 3);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isWidgetOpen, isPlaying, getAnalyserNode]);

  const presetList: { id: AmbientPreset; labelKey: keyof typeof PRESET_CONFIGS; name: string; desc: string; icon: string }[] = [
    { id: 'pines', labelKey: 'pines', name: t('presetWhisperingPines'), desc: 'Pine breeze & sweet songbirds', icon: '🌲' },
    { id: 'birds', labelKey: 'birds', name: t('presetSongbirds'), desc: 'Warblers & cheerful meadow', icon: '🐦' },
    { id: 'brook', labelKey: 'brook', name: t('presetBabblingBrook'), desc: 'Pebble stream & fresh water', icon: '💧' },
    { id: 'twilight', labelKey: 'twilight', name: t('presetTwilightCrickets'), desc: 'Night breeze & peaceful crickets', icon: '🌙' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* 1. EXPANDED NATURE SOUNDSCAPE DOCK */}
      {isWidgetOpen ? (
        <div 
          className="w-[92vw] max-w-[420px] bg-[#09170e]/95 border-2 border-emerald-500/50 rounded-3xl shadow-2xl backdrop-blur-xl p-5 text-emerald-50 transition-all animate-fade-in text-sm"
          role="region"
          aria-label="Ambient Forest Audio Controls"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-800/60 border border-emerald-600/50 flex items-center justify-center text-amber-400 shadow-inner">
                <Trees className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
                  {t('ambientForestAudioTitle')}
                  {isPlaying && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  )}
                </h3>
                <p className="text-[11px] text-emerald-300/70">
                  {isPlaying ? t('ambientForestSoundOn') : t('ambientForestSoundOff')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsWidgetOpen(false)}
                className="p-1.5 text-emerald-400 hover:text-white hover:bg-emerald-800/60 rounded-full transition-colors"
                title="Minimize Soundscape Panel"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Nature Sound Waves Canvas */}
          <div className="my-3.5 relative rounded-2xl overflow-hidden border border-emerald-800/50 bg-[#06120b] shadow-inner">
            <canvas
              ref={canvasRef}
              width={380}
              height={56}
              className="w-full h-14 block"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-amber-300">
                {PRESET_CONFIGS[preset]?.icon} {PRESET_CONFIGS[preset]?.name}
              </span>
            </div>
            {isPlaying && (
              <div className="absolute inset-y-0 right-3 flex items-center gap-0.5 pointer-events-none">
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-1 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
              </div>
            )}
          </div>

          {/* Big Play/Pause Master Switch */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={togglePlay}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95 ${
                isPlaying
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/50'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-emerald-950 shadow-amber-900/30 font-black'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause Forest Sounds</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play Forest Sounds</span>
                </>
              )}
            </button>

            {/* Mute toggle button */}
            <button
              onClick={toggleMute}
              className={`p-3 rounded-2xl border transition-all ${
                isMuted
                  ? 'bg-red-950/60 border-red-700/60 text-red-300'
                  : 'bg-emerald-900/50 border-emerald-700/50 text-amber-300 hover:bg-emerald-800/60'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Master Volume Slider */}
          <div className="bg-emerald-950/50 border border-emerald-800/40 rounded-2xl p-3 mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                {t('ambientMasterVolume')}
              </span>
              <span className="text-amber-400 font-mono">
                {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
              aria-label="Master ambient volume"
            />
          </div>

          {/* Soundscape Presets */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                {t('ambientSoundscapePresets')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {presetList.map((p) => {
                const isActive = preset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPreset(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200/80 hover:bg-emerald-900/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>{p.icon}</span>
                      <span className="truncate">{p.name}</span>
                    </div>
                    <p className="text-[10px] text-emerald-300/60 mt-0.5 truncate">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Individual Layer Fine-Tuning */}
          <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-2xl p-3 mb-3">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Individual Nature Layers
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {/* Wind Layer */}
              <button
                onClick={() => toggleLayer('breeze')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.breeze
                    ? 'bg-emerald-800/40 border-emerald-600/50 text-white'
                    : 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400/40 line-through'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Wind className="w-3 h-3 text-emerald-400" />
                  {t('ambientLayerBreeze')}
                </span>
                <span className={`w-2 h-2 rounded-full ${layers.breeze ? 'bg-emerald-400' : 'bg-gray-600'}`} />
              </button>

              {/* Birds Layer */}
              <button
                onClick={() => toggleLayer('birds')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.birds
                    ? 'bg-emerald-800/40 border-emerald-600/50 text-white'
                    : 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400/40 line-through'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Bird className="w-3 h-3 text-amber-400" />
                  {t('ambientLayerBirds')}
                </span>
                <span className={`w-2 h-2 rounded-full ${layers.birds ? 'bg-amber-400' : 'bg-gray-600'}`} />
              </button>

              {/* Brook Layer */}
              <button
                onClick={() => toggleLayer('brook')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.brook
                    ? 'bg-emerald-800/40 border-emerald-600/50 text-white'
                    : 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400/40 line-through'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  {t('ambientLayerBrook')}
                </span>
                <span className={`w-2 h-2 rounded-full ${layers.brook ? 'bg-cyan-400' : 'bg-gray-600'}`} />
              </button>

              {/* Crickets Layer */}
              <button
                onClick={() => toggleLayer('crickets')}
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.crickets
                    ? 'bg-emerald-800/40 border-emerald-600/50 text-white'
                    : 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400/40 line-through'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Moon className="w-3 h-3 text-indigo-300" />
                  {t('ambientLayerCrickets')}
                </span>
                <span className={`w-2 h-2 rounded-full ${layers.crickets ? 'bg-indigo-400' : 'bg-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Educational Note */}
          <p className="text-[10px] text-emerald-300/60 text-center italic">
            {t('ambientAudioHelpText')}
          </p>
        </div>
      ) : (
        /* 2. COMPACT FLOATING PILL BUTTON */
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWidgetOpen(true)}
            className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-2xl transition-all duration-300 active:scale-95 ${
              isPlaying
                ? 'bg-emerald-900/90 hover:bg-emerald-800/95 border-emerald-500/70 text-white ring-2 ring-emerald-500/30 shadow-emerald-900/60'
                : 'bg-[#0a180e]/90 hover:bg-emerald-950/95 border-emerald-700/50 text-emerald-200 hover:text-white shadow-black/50'
            }`}
            title="Expand Ambient Nature Soundscape Player"
            aria-label="Forest Nature Sounds"
          >
            {/* Animated Sound Wave / Tree Icon */}
            <div className="relative">
              <span className="text-lg leading-none">{PRESET_CONFIGS[preset]?.icon || '🌲'}</span>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              )}
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>{t('ambientForestAudioBtn')}</span>
                {isPlaying && (
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
                    <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-emerald-300/70">
                {isPlaying ? `${PRESET_CONFIGS[preset]?.name}` : 'Click to Listen'}
              </span>
            </div>

            {/* Quick Play/Pause Mini Toggle */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className={`ml-1 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-emerald-700/80 hover:bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </div>

            <ChevronUp className="w-3.5 h-3.5 text-emerald-400 group-hover:text-amber-400 transition-colors hidden sm:block" />
          </button>
        </div>
      )}
    </div>
  );
};
