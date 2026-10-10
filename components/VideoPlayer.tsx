/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {Video} from '../types';
import {Sparkles, X, Volume2, Square} from 'lucide-react';
import {useTranslation} from '../context/LanguageContext';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  onEdit: (video: Video) => void;
}

/**
 * A component that renders a video player with controls, description, and edit button.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onClose,
  onEdit,
}) => {
  const {tScene, settings, t, speak, stopSpeaking, isSpeaking} = useTranslation();
  const localized = tScene(video.id, video.title, video.description);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(`${localized.title}. ${localized.description}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-emerald-950/95 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm"
      onClick={() => {
        stopSpeaking();
        onClose();
      }}
      aria-modal="true"
      role="dialog">
      <div
        className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex-shrink-0 p-4">
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="absolute top-4 right-4 text-emerald-100/70 hover:text-white z-10 p-2 rounded-full bg-emerald-950/40 hover:bg-emerald-950/60 transition-colors border border-emerald-800/50"
            aria-label={t('closeBtn')}>
            <X className="w-6 h-6" />
          </button>
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-inner order border-emerald-800/20">
            <video
              key={video.id}
              className="w-full h-full"
              src={video.videoUrl}
              controls
              autoPlay
              loop
              aria-label={localized.title}
            />
          </div>
        </div>
        <div className="flex-1 p-6 pt-2 overflow-y-auto">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-2xl font-bold text-white">{localized.title}</h2>
                <button
                  onClick={handleToggleSpeak}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                    isSpeaking 
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                      : 'bg-emerald-800/60 text-amber-400 border-amber-500/30 hover:bg-emerald-800/90'
                  }`}
                  title="Listen to Big Bear Djugs read this scene"
                >
                  {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Stop Audio' : 'Listen with Djugs'}</span>
                </button>
              </div>

              {settings.bilingualMode && settings.language !== 'en' && (
                <p className="text-xs font-semibold text-amber-300/80 mb-2">
                  🇺🇸 English Title: {video.title}
                </p>
              )}

              <p className="text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
                {localized.description}
              </p>

              {settings.bilingualMode && settings.language !== 'en' && (
                <div className="mt-3 p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 text-xs text-emerald-300/80 italic">
                  <span className="font-bold text-amber-300 not-italic block mb-1">🇺🇸 English Storyline:</span>
                  {video.description}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                stopSpeaking();
                onEdit(video);
              }}
              className="flex-shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-3 px-5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0"
              aria-label={t('remixSceneBtn')}>
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">{t('remixSceneBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
