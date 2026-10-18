/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { ambientForest, AmbientPreset, AmbientLayers, PRESET_CONFIGS } from '../lib/ambientForestAudio';

interface AmbientAudioSettings {
  volume: number;
  preset: AmbientPreset;
  layers: AmbientLayers;
}

const STORAGE_KEY = 'big_bear_djugs_ambient_audio_settings_v1';

const DEFAULT_SETTINGS: AmbientAudioSettings = {
  volume: 0.5,
  preset: 'pines',
  layers: {
    breeze: true,
    birds: true,
    brook: true,
    crickets: false
  }
};

interface AmbientAudioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  preset: AmbientPreset;
  layers: AmbientLayers;
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  togglePlay: () => Promise<void>;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setPreset: (preset: AmbientPreset) => void;
  toggleLayer: (layer: keyof AmbientLayers) => void;
  getAnalyserNode: () => AnalyserNode | null;
  duckAudio: (isDucked: boolean) => void;
}

const AmbientAudioContext = createContext<AmbientAudioContextType | undefined>(undefined);

export const AmbientAudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const previousVolumeRef = useRef<number>(0.5);

  const [settings, setSettings] = useState<AmbientAudioSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse ambient audio settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Sync initial volume and preset to engine
  useEffect(() => {
    ambientForest.setVolume(settings.volume);
    ambientForest.setPreset(settings.preset);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save ambient audio settings', e);
    }
  }, [settings]);

  const togglePlay = async () => {
    if (isPlaying) {
      ambientForest.stop();
      setIsPlaying(false);
    } else {
      const success = await ambientForest.start();
      if (success) {
        setIsPlaying(true);
        if (isMuted) {
          ambientForest.setVolume(0);
        } else {
          ambientForest.setVolume(settings.volume);
        }
      }
    }
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setSettings((prev) => ({ ...prev, volume: clamped }));
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    if (!isMuted) {
      ambientForest.setVolume(clamped);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      const restoreVol = previousVolumeRef.current > 0 ? previousVolumeRef.current : 0.5;
      ambientForest.setVolume(restoreVol);
      setSettings((prev) => ({ ...prev, volume: restoreVol }));
    } else {
      previousVolumeRef.current = settings.volume;
      setIsMuted(true);
      ambientForest.setVolume(0);
    }
  };

  const setPreset = (preset: AmbientPreset) => {
    ambientForest.setPreset(preset);
    const newLayers = PRESET_CONFIGS[preset]?.layers || settings.layers;
    setSettings((prev) => ({
      ...prev,
      preset,
      layers: { ...newLayers }
    }));
  };

  const toggleLayer = (layer: keyof AmbientLayers) => {
    const nextVal = !settings.layers[layer];
    ambientForest.setLayerActive(layer, nextVal);
    setSettings((prev) => ({
      ...prev,
      layers: {
        ...prev.layers,
        [layer]: nextVal
      }
    }));
  };

  const duckAudio = (isDucked: boolean) => {
    if (isPlaying && !isMuted) {
      ambientForest.duck(isDucked);
    }
  };

  const getAnalyserNode = () => {
    return ambientForest.getAnalyser();
  };

  return (
    <AmbientAudioContext.Provider
      value={{
        isPlaying,
        volume: settings.volume,
        isMuted,
        preset: settings.preset,
        layers: settings.layers,
        isWidgetOpen,
        setIsWidgetOpen,
        togglePlay,
        setVolume,
        toggleMute,
        setPreset,
        toggleLayer,
        getAnalyserNode,
        duckAudio
      }}
    >
      {children}
    </AmbientAudioContext.Provider>
  );
};

export const useAmbientAudio = () => {
  const context = useContext(AmbientAudioContext);
  if (!context) {
    throw new Error('useAmbientAudio must be used within an AmbientAudioProvider');
  }
  return context;
};
