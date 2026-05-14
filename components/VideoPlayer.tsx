/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {Video} from '../types';
import {Sparkles, X} from 'lucide-react';

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
  return (
    <div
      className="fixed inset-0 bg-emerald-950/95 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog">
      <div
        className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex-shrink-0 p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-100/70 hover:text-white z-10 p-2 rounded-full bg-emerald-950/40 hover:bg-emerald-950/60 transition-colors border border-emerald-800/50"
            aria-label="Close video player">
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
              aria-label={video.title}
            />
          </div>
        </div>
        <div className="flex-1 p-6 pt-2 overflow-y-auto">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
               <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
               <p className="text-emerald-100/80 leading-relaxed whitespace-pre-wrap">
                {video.description}
               </p>
            </div>
            <button
              onClick={() => onEdit(video)}
              className="flex-shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-3 px-5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Remix this scene">
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">Remix Scene</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
