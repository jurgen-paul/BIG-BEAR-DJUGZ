import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Volume2, 
  Check, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Type, 
  Languages, 
  MessageSquare,
  Square
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/translations';

export const TranslationSettingsModal: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    currentLangInfo,
    translations,
    t,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    speak,
    stopSpeaking,
    isSpeaking
  } = useTranslation();

  const [activeTab, setActiveTab] = useState<'language' | 'bilingual' | 'voice' | 'display' | 'ai'>('language');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  if (!isSettingsModalOpen) return null;

  const handleSelectLanguage = (code: SupportedLanguage) => {
    updateSettings({ language: code });
    triggerSavedFeedback();
  };

  const triggerSavedFeedback = () => {
    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
    }, 2000);
  };

  const handleTestVoice = (langCode: SupportedLanguage) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    if (!lang) return;

    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(lang.greeting, lang.voiceLang);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-emerald-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
      onClick={() => setIsSettingsModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="translation-settings-title"
    >
      <div 
        className="bg-[#0e2417] border border-emerald-700/60 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] text-emerald-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-emerald-800/40 bg-gradient-to-r from-emerald-900/60 to-emerald-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 rounded-2xl border border-amber-500/30 text-amber-400">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h2 id="translation-settings-title" className="text-2xl font-bold text-white font-display flex items-center gap-2">
                {t('settingsModalTitle')}
              </h2>
              <p className="text-xs text-emerald-300/80">
                {t('settingsModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setIsSettingsModalOpen(false);
            }}
            className="p-2 text-emerald-300 hover:text-white bg-emerald-900/40 hover:bg-emerald-800/60 rounded-full border border-emerald-700/40 transition-colors"
            aria-label={t('closeBtn')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-4 pt-3 pb-2 gap-1 border-b border-emerald-800/40 bg-emerald-950/40 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('language')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'language'
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>{t('tabLanguage')}</span>
          </button>

          <button
            onClick={() => setActiveTab('bilingual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'bilingual'
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('tabBilingual')}</span>
            {settings.bilingualMode && (
              <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{t('tabVoice')}</span>
          </button>

          <button
            onClick={() => setActiveTab('display')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'display'
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{t('tabDisplay')}</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-amber-500 text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('tabAiTranslate')}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">

          {/* TAB 1: LANGUAGE SELECTION */}
          {activeTab === 'language' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{t('selectLanguageHeading')}</h3>
                  <p className="text-xs text-emerald-300/80">{t('selectLanguageDesc')}</p>
                </div>
                <button
                  onClick={() => handleTestVoice(settings.language)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSpeaking 
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                      : 'bg-emerald-800/40 text-amber-400 border-amber-500/30 hover:bg-emerald-800/70'
                  }`}
                >
                  {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Stop Audio' : t('testVoiceBtn')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = settings.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-500/20 to-emerald-900/40 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                          : 'bg-emerald-900/30 border-emerald-800/40 hover:bg-emerald-800/40 hover:border-emerald-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl filter drop-shadow-sm">{lang.flag}</span>
                        {isSelected && (
                          <div className="p-1 rounded-full bg-amber-500 text-emerald-950 shadow">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                          {lang.nativeName}
                        </p>
                        <p className="text-xs text-emerald-300/70">{lang.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Spoken Greeting Card */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-900/30 border border-emerald-800/40 flex items-start gap-3">
                <span className="text-2xl mt-0.5">🐻</span>
                <div className="flex-1">
                  <p className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-1">
                    Big Bear Djugs' Forest Greeting:
                  </p>
                  <p className="text-sm text-emerald-100 italic">
                    "{currentLangInfo.greeting}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BILINGUAL EXPLORER MODE */}
          {activeTab === 'bilingual' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">{t('bilingualModeHeading')}</h3>
                <p className="text-xs text-emerald-300/80">{t('bilingualModeDesc')}</p>
              </div>

              {/* Big Switch Card */}
              <div 
                onClick={() => {
                  updateSettings({ bilingualMode: !settings.bilingualMode });
                  triggerSavedFeedback();
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  settings.bilingualMode
                    ? 'bg-amber-500/15 border-amber-400/80 shadow-lg'
                    : 'bg-emerald-900/30 border-emerald-800/40 hover:bg-emerald-800/30'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-white text-base">
                      {settings.bilingualMode ? t('bilingualEnabledStatus') : t('bilingualDisabledStatus')}
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-200/80">
                    {t('bilingualModeTip')}
                  </p>
                </div>

                {/* Animated toggle pill */}
                <div className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 cursor-pointer ${
                  settings.bilingualMode ? 'bg-amber-500 justify-end' : 'bg-emerald-950 border border-emerald-700/60 justify-start'
                }`}>
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                    settings.bilingualMode ? 'bg-emerald-950' : 'bg-emerald-400'
                  }`} />
                </div>
              </div>

              {/* Live Preview of Bilingual Card */}
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Live Preview
                  </span>
                  <span className="text-[11px] text-emerald-300/70">
                    {settings.bilingualMode ? 'Showing Dual-Language' : 'Showing Single Language'}
                  </span>
                </div>

                <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-700/30">
                  <h5 className="font-bold text-white text-base">
                    {translations.theMissionTitle}
                  </h5>
                  {settings.bilingualMode && settings.language !== 'en' && (
                    <p className="text-xs font-semibold text-amber-300/90 mb-2">
                      🇺🇸 En: The Mission
                    </p>
                  )}
                  <p className="text-xs text-emerald-100/90 leading-relaxed mt-1">
                    {translations.theMissionDesc}
                  </p>
                  {settings.bilingualMode && settings.language !== 'en' && (
                    <p className="text-xs text-emerald-300/60 italic mt-2 border-t border-emerald-800/30 pt-1.5">
                      🇺🇸 En: Join Big Bear Djugs, a gentle grizzly with a huge heart and even bigger curiosity...
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VOICE & NARRATION */}
          {activeTab === 'voice' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">{t('voiceNarrationHeading')}</h3>
                <p className="text-xs text-emerald-300/80">{t('voiceNarrationDesc')}</p>
              </div>

              {/* Active Voice Information */}
              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentLangInfo.flag}</span>
                  <div>
                    <p className="font-bold text-white text-sm">
                      {currentLangInfo.nativeName} ({currentLangInfo.name}) Voice
                    </p>
                    <p className="text-xs text-emerald-300/70">
                      Locale: <code className="bg-emerald-950/60 px-1.5 py-0.5 rounded text-amber-300">{currentLangInfo.voiceLang}</code>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleTestVoice(settings.language)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                    isSpeaking 
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-emerald-950'
                  }`}
                >
                  {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Stop' : t('testVoiceBtn')}</span>
                </button>
              </div>

              {/* Speech Pace Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  {t('speechRateLabel')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      updateSettings({ speechRate: 0.85 });
                      triggerSavedFeedback();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      settings.speechRate === 0.85
                        ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                        : 'bg-emerald-900/30 border-emerald-800/40 text-emerald-200 hover:bg-emerald-800/40'
                    }`}
                  >
                    <p className="text-sm">🐻 {t('rateGentleBear')}</p>
                    <p className="text-xs text-emerald-300/60 mt-0.5">Best for bedtime & storytelling</p>
                  </button>

                  <button
                    onClick={() => {
                      updateSettings({ speechRate: 1.0 });
                      triggerSavedFeedback();
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      settings.speechRate === 1.0
                        ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                        : 'bg-emerald-900/30 border-emerald-800/40 text-emerald-200 hover:bg-emerald-800/40'
                    }`}
                  >
                    <p className="text-sm">⚡ {t('rateStandard')}</p>
                    <p className="text-xs text-emerald-300/60 mt-0.5">Energetic day explorer pace</p>
                  </button>
                </div>
              </div>

              {/* Sample phrase test */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-300/70">Sample Practice Phrase:</p>
                  <p className="text-sm text-emerald-100 font-medium italic mt-0.5">
                    "{currentLangInfo.samplePhrase}"
                  </p>
                </div>
                <button
                  onClick={() => speak(currentLangInfo.samplePhrase, currentLangInfo.voiceLang)}
                  className="p-2 text-amber-400 hover:text-amber-300 bg-emerald-900/60 rounded-lg hover:bg-emerald-800/60 transition-colors"
                  title="Speak sample phrase"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: TEXT SIZE / READING COMFORT */}
          {activeTab === 'display' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">{t('textScaleHeading')}</h3>
                <p className="text-xs text-emerald-300/80">{t('textScaleDesc')}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    updateSettings({ textSize: 'standard' });
                    triggerSavedFeedback();
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    settings.textSize === 'standard'
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/20'
                      : 'bg-emerald-900/30 border-emerald-800/40 text-emerald-200 hover:bg-emerald-800/30'
                  }`}
                >
                  <Type className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                  <p className="text-sm font-bold">{t('scaleStandard')}</p>
                  <p className="text-[11px] text-emerald-300/60 mt-1">Default clean sizing</p>
                </button>

                <button
                  onClick={() => {
                    updateSettings({ textSize: 'large' });
                    triggerSavedFeedback();
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    settings.textSize === 'large'
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/20'
                      : 'bg-emerald-900/30 border-emerald-800/40 text-emerald-200 hover:bg-emerald-800/30'
                  }`}
                >
                  <Type className="w-8 h-8 mx-auto mb-1 text-amber-400" />
                  <p className="text-sm font-bold">{t('scaleLarge')}</p>
                  <p className="text-[11px] text-emerald-300/60 mt-1">+15% comfortable reading</p>
                </button>

                <button
                  onClick={() => {
                    updateSettings({ textSize: 'extralarge' });
                    triggerSavedFeedback();
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    settings.textSize === 'extralarge'
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/20'
                      : 'bg-emerald-900/30 border-emerald-800/40 text-emerald-200 hover:bg-emerald-800/30'
                  }`}
                >
                  <Type className="w-10 h-10 mx-auto text-amber-400" />
                  <p className="text-sm font-bold">{t('scaleExtraLarge')}</p>
                  <p className="text-[11px] text-emerald-300/60 mt-1">+30% maximum clarity</p>
                </button>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40">
                <p className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">
                  Sample Text Preview:
                </p>
                <div className={`p-3 bg-emerald-900/40 rounded-xl border border-emerald-800/30 ${
                  settings.textSize === 'large' ? 'text-lg' : settings.textSize === 'extralarge' ? 'text-xl' : 'text-sm'
                }`}>
                  <p className="font-bold text-white mb-1">
                    {translations.forestMotto}
                  </p>
                  <p className="text-emerald-200/80 text-xs">
                    Big Bear Djugs reminds every young ranger: Curiosity makes every day a grand discovery!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI STORY PROMPT TRANSLATION */}
          {activeTab === 'ai' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">{t('aiTranslateHeading')}</h3>
                <p className="text-xs text-emerald-300/80">{t('aiTranslateDesc')}</p>
              </div>

              <div 
                onClick={() => {
                  updateSettings({ autoTranslateAiPrompts: !settings.autoTranslateAiPrompts });
                  triggerSavedFeedback();
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  settings.autoTranslateAiPrompts
                    ? 'bg-amber-500/15 border-amber-400/80 shadow-lg'
                    : 'bg-emerald-900/30 border-emerald-800/40 hover:bg-emerald-800/30'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-white text-base">
                      {settings.autoTranslateAiPrompts ? 'AI Prompt Auto-Translate: ACTIVE' : 'AI Prompt Auto-Translate: OFF'}
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-200/80">
                    {t('aiTranslateTip')}
                  </p>
                </div>

                <div className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 cursor-pointer ${
                  settings.autoTranslateAiPrompts ? 'bg-amber-500 justify-end' : 'bg-emerald-950 border border-emerald-700/60 justify-start'
                }`}>
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                    settings.autoTranslateAiPrompts ? 'bg-emerald-950' : 'bg-emerald-400'
                  }`} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/40 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200/90 leading-relaxed">
                  <span className="font-bold text-amber-300">How it works: </span>
                  When remixing a video in Spanish, French, Japanese, or any language, your custom ideas will automatically be translated into optimized English prompts before reaching the Veo 3 neural network.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-emerald-800/40 bg-emerald-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetSettings();
                triggerSavedFeedback();
              }}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-amber-300 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetDefaultsBtn')}</span>
            </button>

            {showSavedNotification && (
              <span className="text-xs font-bold text-amber-400 animate-fade-in flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Check className="w-3 h-3" /> {t('settingsSavedNotice')}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              setIsSettingsModalOpen(false);
            }}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl text-xs transition-all shadow-md hover:shadow-amber-500/20 active:translate-y-0"
          >
            {t('closeSettingsBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
