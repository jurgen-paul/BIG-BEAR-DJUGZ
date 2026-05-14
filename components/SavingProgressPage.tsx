/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {Loader2, Trees} from 'lucide-react';

/**
 * A fullscreen overlay that displays a loading animation and text indicating that
 * a video remix is being created.
 */
export const SavingProgressPage: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-[#0d1a0d] flex flex-col items-center justify-center z-50 animate-fade-in"
      aria-live="polite"
      aria-busy="true">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <Trees className="w-24 h-24 text-emerald-400 relative z-10 animate-bounce" />
      </div>
      
      <div className="flex items-center gap-3 text-amber-400 mb-4">
        <Loader2 className="w-6 h-6 animate-spin" />
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Growing your Scene...
        </h2>
      </div>
      
      <p className="text-emerald-300 text-lg max-w-md text-center px-6 leading-relaxed">
        The Friendly Bear is working hard with Mila to bring your version of the forest to life. Please wait a moment!
      </p>
      
      <div className="mt-12 w-64 h-2 bg-emerald-900/50 rounded-full overflow-hidden border border-emerald-800/30">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-1/3 animate-[progress_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};
