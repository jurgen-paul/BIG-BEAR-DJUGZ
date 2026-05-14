/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {Video} from '../types';
import {Play} from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

/**
 * A component that renders a video card with a thumbnail, title, and play button.
 */
export const VideoCard: React.FC<VideoCardProps> = ({video, onPlay}) => {
  return (
    <button
      type="button"
      className="group w-full text-left bg-emerald-900/40 border border-emerald-800/30 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-900/50 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1a0d]"
      onClick={() => onPlay(video)}
      aria-label={`Play video: ${video.title}`}>
      <div className="relative">
        <video
          className="w-full h-48 object-cover pointer-events-none"
          src={video.videoUrl}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"></video>
        <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 transform duration-300">
            <div className="bg-amber-500 p-4 rounded-full shadow-2xl">
               <Play className="w-8 h-8 text-black fill-current" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="text-lg font-bold text-emerald-50 truncate"
          title={video.title}>
          {video.title}
        </h3>
        <p className="text-emerald-400 text-xs mt-1 uppercase tracking-wider font-semibold">Educational Scene</p>
      </div>
    </button>
  );
};
