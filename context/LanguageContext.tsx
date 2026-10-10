import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  TRANSLATIONS, 
  LanguageInfo, 
  Translations 
} from '../lib/translations';

export interface TranslationSettings {
  language: SupportedLanguage;
  bilingualMode: boolean;
  voiceEnabled: boolean;
  speechRate: number; // 0.85 or 1.0
  textSize: 'standard' | 'large' | 'extralarge';
  autoTranslateAiPrompts: boolean;
}

export const DEFAULT_TRANSLATION_SETTINGS: TranslationSettings = {
  language: 'en',
  bilingualMode: false,
  voiceEnabled: true,
  speechRate: 0.85, // gentle bear storytelling tempo
  textSize: 'standard',
  autoTranslateAiPrompts: true,
};

const STORAGE_KEY = 'big_bear_djugs_translation_settings_v1';

interface LanguageContextType {
  settings: TranslationSettings;
  updateSettings: (partial: Partial<TranslationSettings>) => void;
  resetSettings: () => void;
  currentLangInfo: LanguageInfo;
  translations: Translations;
  t: (key: keyof Translations, fallback?: string) => string;
  tScene: (sceneId: string, fallbackTitle: string, fallbackDesc: string) => { title: string; description: string };
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  speak: (text: string, langCodeOverride?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<TranslationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_TRANSLATION_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to read translation settings from localStorage', e);
    }
    return DEFAULT_TRANSLATION_SETTINGS;
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Save settings whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save translation settings to localStorage', e);
    }
  }, [settings]);

  const updateSettings = (partial: Partial<TranslationSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_TRANSLATION_SETTINGS);
  };

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === settings.language) || SUPPORTED_LANGUAGES[0];
  const translations = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const t = (key: keyof Translations, fallback?: string): string => {
    const val = translations[key];
    if (typeof val === 'string') {
      return val;
    }
    // Fallback to English
    const enVal = TRANSLATIONS.en[key];
    if (typeof enVal === 'string') {
      return enVal;
    }
    return fallback || String(key);
  };

  const tScene = (sceneId: string, fallbackTitle: string, fallbackDesc: string) => {
    const sceneTrans = translations.scenes?.[sceneId];
    if (sceneTrans) {
      return {
        title: sceneTrans.title || fallbackTitle,
        description: sceneTrans.description || fallbackDesc
      };
    }
    return {
      title: fallbackTitle,
      description: fallbackDesc
    };
  };

  // Text-To-Speech helper
  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = (text: string, langCodeOverride?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCodeOverride || currentLangInfo.voiceLang;
    utterance.lang = targetLang;
    utterance.rate = settings.speechRate || 0.85;
    utterance.pitch = 0.9; // Friendly warm pitch for Big Bear Djugs

    // Find suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase() || v.lang.startsWith(targetLang.slice(0, 2)));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <LanguageContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        currentLangInfo,
        translations,
        t,
        tScene,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        speak,
        stopSpeaking,
        isSpeaking
      }}
    >
      <div className={`app-root-container ${settings.textSize === 'large' ? 'text-[1.08rem]' : settings.textSize === 'extralarge' ? 'text-[1.18rem]' : ''}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
