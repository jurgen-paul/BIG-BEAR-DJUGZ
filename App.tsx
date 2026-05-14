/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {EditVideoPage} from './components/EditVideoPage';
import {ErrorModal} from './components/ErrorModal';
import {SavingProgressPage} from './components/SavingProgressPage';
import {VideoGrid} from './components/VideoGrid';
import {VideoPlayer} from './components/VideoPlayer';
import {MOCK_VIDEOS} from './constants';
import {Video} from './types';
import {Trees, BookOpen, GraduationCap, Star} from 'lucide-react';

import {GeneratedVideo, GoogleGenAI} from '@google/genai';

const VEO3_MODEL_NAME = 'veo-3.1-fast-generate-preview';

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// ---

function bloblToBase64(blob: Blob) {
  return new Promise<string>(async (resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      resolve(url.split(',')[1]);
    };
    reader.readAsDataURL(blob);
  });
}

// ---

async function generateVideoFromText(
  prompt: string,
  numberOfVideos = 1,
): Promise<string[]> {
  let operation = await ai.models.generateVideos({
    model: VEO3_MODEL_NAME,
    prompt,
    config: {
      numberOfVideos,
      aspectRatio: '16:9',
    },
  });

  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log('...Generating...');
    operation = await ai.operations.getVideosOperation({operation});
  }

  if (operation?.response) {
    const videos = operation.response?.generatedVideos;
    if (videos === undefined || videos.length === 0) {
      throw new Error('No videos generated');
    }

    return await Promise.all(
      videos.map(async (generatedVideo: GeneratedVideo) => {
        const url = decodeURIComponent(generatedVideo.video.uri);
        const res = await fetch(`${url}&key=${process.env.API_KEY}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch video: ${res.status} ${res.statusText}`,
          );
        }
        const blob = await res.blob();
        return bloblToBase64(blob);
      }),
    );
  } else {
    throw new Error('No videos generated');
  }
  return [];
}

/**
 * Story Outline Component
 */
const StoryOutline: React.FC = () => {
  return (
    <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-amber-400" />
        <h2 className="text-2xl font-bold text-white">Big Bear Djugs: The Friendly Bear Learns & Teaches</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-emerald-100/80">
        <div>
          <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" /> The Mission
          </h3>
          <p>
            Join Big Bear Djugs, a gentle grizzly with a huge heart and even bigger curiosity. 
            When he discovers the magic of learning, he realizes that knowledge is meant to be shared!
          </p>
        </div>
        <div>
          <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Educational Adventure
          </h3>
          <p>
            From counting berries in the meadow to reading maps by the river and exploring science in the lab, 
            every scene is a lesson in teamwork, kindness, and bravery.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-emerald-800/30">
        <p className="text-center font-medium text-amber-400 animate-pulse italic">
          "Learning is fun. Everyone can teach something. Be curious every day."
        </p>
      </div>
    </div>
  );
};

/**
 * Main component for the Big Bear Djugs Interactive Adventure.
 */
export const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [generationError, setGenerationError] = useState<string[] | null>(null);

  const handlePlayVideo = (video: Video) => {
    setPlayingVideo(video);
  };

  const handleClosePlayer = () => {
    setPlayingVideo(null);
  };

  const handleStartEdit = (video: Video) => {
    setPlayingVideo(null); // Close player
    setEditingVideo(video); // Open edit page
  };

  const handleCancelEdit = () => {
    setEditingVideo(null); // Close edit page, return to grid
  };

  const handleSaveEdit = async (originalVideo: Video) => {
    setEditingVideo(null);
    setIsSaving(true);
    setGenerationError(null);

    try {
      const promptText = originalVideo.description;
      console.log('Generating video...', promptText);
      const videoObjects = await generateVideoFromText(promptText);

      if (!videoObjects || videoObjects.length === 0) {
        throw new Error('Video generation returned no data.');
      }

      console.log('Generated video data received.');

      const mimeType = 'video/mp4';
      const videoSrc = videoObjects[0];
      const src = `data:${mimeType};base64,${videoSrc}`;

      const newVideo: Video = {
        id: self.crypto.randomUUID(),
        title: `Your Version of "${originalVideo.title}"`,
        description: originalVideo.description,
        videoUrl: src,
      };

      setVideos((currentVideos) => [newVideo, ...currentVideos]);
      setPlayingVideo(newVideo); // Go to the new video
    } catch (error) {
      console.error('Video generation failed:', error);
      setGenerationError([
        'Veo 3 is only available on the Paid Tier.',
        'Please select your Cloud Project to get started',
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return <SavingProgressPage />;
  }

  return (
    <div className="min-h-screen bg-[#0d1a0d] text-emerald-50 font-sans">
      {editingVideo ? (
        <EditVideoPage
          video={editingVideo}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="mx-auto max-w-[1080px]">
          <header className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-900/50 rounded-full mb-6">
              <Trees className="w-12 h-12 text-amber-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-emerald-400 via-amber-200 to-emerald-400 text-transparent bg-clip-text mb-4 drop-shadow-sm">
              Big Bear Djugs
            </h1>
            <p className="text-emerald-300/80 mt-2 text-xl max-w-2xl mx-auto font-medium">
              Interactive Educational Adventure
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <span className="px-3 py-1 bg-emerald-900/60 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest border border-emerald-800/50">
                Learning Adventure
              </span>
              <span className="px-3 py-1 bg-emerald-900/60 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest border border-emerald-800/50">
                Ages 5-10
              </span>
            </div>
          </header>
          
          <main className="px-4 md:px-8 pb-16">
            <StoryOutline />
            
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px flex-1 bg-emerald-800/30"></div>
              <h2 className="text-lg font-bold text-emerald-400 uppercase tracking-tighter">Explore the Scenes</h2>
              <div className="h-px flex-1 bg-emerald-800/30"></div>
            </div>

            <VideoGrid videos={videos} onPlayVideo={handlePlayVideo} />
          </main>

          <footer className="py-12 border-t border-emerald-900/50 text-center">
            <p className="text-emerald-700 text-sm">
              © 2026 Big Bear Djugs. All rights research & development.
            </p>
          </footer>
        </div>
      )}

      {playingVideo && (
        <VideoPlayer
          video={playingVideo}
          onClose={handleClosePlayer}
          onEdit={handleStartEdit}
        />
      )}

      {generationError && (
        <ErrorModal
          message={generationError}
          onClose={() => setGenerationError(null)}
          onSelectKey={async () => await window.aistudio?.openSelectKey()}
        />
      )}
    </div>
  );
};
