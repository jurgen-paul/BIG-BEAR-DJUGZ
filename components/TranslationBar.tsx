import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  Settings, 
  Volume2, 
  BookOpen, 
  ChevronDown, 
  Check, 
  Sparkles,
  Square
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/translations';

export const TranslationBar: React.FC = () => {
  const {
    settings,
    updateSettings,
    currentLangInfo,
    t,
    setIsSettingsModalOpen,
    speak,
    stopSpeaking,
    isSpeaking
  } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    updateSettings({ language: code });
    setIsDropdownOpen(false);
  };

  const toggleBilingualMode = () => {
    updateSettings({ bilingualMode: !settings.bilingualMode });
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(currentLangInfo.greeting, currentLangInfo.voiceLang);
    }
  };

  return (
    <div className="w-full bg-[#0b170e]/80 border-b border-emerald-800/40 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-[1080px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left side: Quick Language Selector */}
        <div className="flex items-center gap-2" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800/70 border border-emerald-700/50 rounded-full text-xs font-bold text-emerald-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <span className="text-base leading-none">{currentLangInfo.flag}</span>
              <span className="font-semibold text-white">{currentLangInfo.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-emerald-300 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-56 bg-[#0c1f13] border border-emerald-700/70 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in backdrop-blur-lg"
                role="listbox"
              >
                <div className="px-3 py-1.5 border-b border-emerald-800/40 mb-1">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {t('selectLanguageHeading')}
                  </p>
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = settings.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-emerald-800/50 transition-colors text-xs ${
                        isSelected ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-emerald-100'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{lang.flag}</span>
                        <div>
                          <p className="font-semibold">{lang.nativeName}</p>
                          <p className="text-[10px] text-emerald-300/60">{lang.name}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Flag Strip (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-emerald-950/40 px-2 py-1 rounded-full border border-emerald-800/30">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => updateSettings({ language: lang.code })}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm hover:scale-125 transition-transform ${
                  settings.language === lang.code ? 'ring-2 ring-amber-400 scale-110 bg-emerald-800/60' : 'opacity-70 hover:opacity-100'
                }`}
                title={`${lang.nativeName} (${lang.name})`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {/* Right side: Bilingual Toggle & Settings Button & Voice greeting */}
        <div className="flex items-center gap-2">
          {/* Audio greeting preview button */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isSpeaking
                ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                : 'bg-emerald-900/40 text-emerald-200 border-emerald-800/50 hover:bg-emerald-800/60 hover:text-amber-300'
            }`}
            title="Hear Big Bear Djugs greeting"
          >
            {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Speaking...' : 'Djugs Voice'}</span>
          </button>

          {/* Bilingual Quick Toggle */}
          <button
            onClick={toggleBilingualMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              settings.bilingualMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
                : 'bg-emerald-950/50 text-emerald-300/80 border-emerald-800/40 hover:bg-emerald-900/40'
            }`}
            title="Toggle Dual-Language English Learning Subtitles"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings.bilingualMode ? 'Dual-Lang ON' : 'Dual-Lang'}</span>
          </button>

          {/* Translation Settings Modal Trigger */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-full text-xs transition-all shadow-md hover:shadow-amber-500/20 active:translate-y-0"
            aria-label="Open Translation Settings"
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{t('translationSettingsBtn')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
