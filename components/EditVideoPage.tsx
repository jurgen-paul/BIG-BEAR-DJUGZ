/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {Video} from '../types';
import {Sparkles, ArrowLeft} from 'lucide-react';

interface EditVideoPageProps {
  video: Video;
  onSave: (updatedVideo: Video) => void;
  onCancel: () => void;
}

/**
 * A page that allows the user to edit the description of a video.
 * It provides input field for the description and buttons to save or cancel the changes.
 */
export const EditVideoPage: React.FC<EditVideoPageProps> = ({
  video,
  onSave,
  onCancel,
}) => {
  const [description, setDescription] = useState(video.description);

  const handleSave = () => {
    onSave({...video, description});
  };

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-emerald-50 font-sans flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-3xl bg-emerald-900/40 border border-emerald-800/50 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
        <header className="mb-8">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">Back to Scenes</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
            Remix this Scene
          </h1>
          <p className="text-emerald-300/70">Modify the story prompt to create your own unique version of this educational moment.</p>
        </header>

        <main>
          <div className="mb-8 p-4 bg-emerald-950/50 rounded-xl border border-emerald-800/30">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">Original Scene Preview</h3>
            <div className="flex gap-4">
              <video className="w-32 h-20 object-cover rounded-lg shadow-lg border border-emerald-800/50" src={video.videoUrl} muted />
              <div className="flex-1">
                <p className="text-sm text-emerald-100/90 font-medium line-clamp-2">{video.title}</p>
                <p className="text-xs text-emerald-400 mt-1 italic">"Use your imagination to change the forest's destiny!"</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-emerald-300 uppercase tracking-widest mb-3">
              Your Story Prompt
            </label>
            <textarea
              id="description"
              rows={8}
              className="w-full bg-emerald-950/80 border border-emerald-800/50 rounded-xl p-4 text-emerald-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none shadow-inner"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label={`Edit description for the video`}
              placeholder="What happens next in the forest?"
            />
          </div>
        </main>

        <footer className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-xl bg-emerald-800/30 hover:bg-emerald-800/50 text-emerald-100 font-bold transition-all border border-emerald-800/50">
            Keep Original
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Scene
          </button>
        </footer>
      </div>
    </div>
  );
};
