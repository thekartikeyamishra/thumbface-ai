import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

/**
 * ImageUploader Component
 * Handles file selection, drag-and-drop (via label), and image previewing.
 * * @param {File} file - The currently selected file object (or null)
 * @param {string} previewUrl - The object URL for the preview image
 * @param {Function} onUpload - Callback function when a file is selected (e.target.files)
 * @param {Function} onRemove - Callback function to clear the selection
 * @param {boolean} isGenerating - Prop to disable input while AI is working
 */
export default function ImageUploader({ file, previewUrl, onUpload, onRemove, isGenerating = false }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative group hover:border-indigo-500/30 transition-all duration-300">
      
      {/* State A: No File Selected */}
      {!previewUrl ? (
        <label 
          className={`flex flex-col items-center justify-center h-56 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all duration-300
            ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {/* Icon Circle */}
          <div className="p-4 bg-slate-800 rounded-full mb-4 group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-300 shadow-lg shadow-black/20">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          
          <p className="font-semibold text-slate-300 group-hover:text-white transition-colors">
            Upload Face Photo
          </p>
          
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            Max 5MB • JPG, PNG
          </p>

          {/* Hidden Native Input */}
          <input 
            type="file" 
            className="hidden" 
            onChange={onUpload} 
            accept="image/*" 
            disabled={isGenerating}
          />
        </label>
      ) : (
        /* State B: File Selected (Preview Mode) */
        <div className="relative h-56 rounded-xl overflow-hidden bg-slate-950 group/preview shadow-inner">
          
          {/* Image Preview */}
          <img 
            src={previewUrl} 
            alt="Original Upload" 
            className="w-full h-full object-cover opacity-80 group-hover/preview:opacity-100 transition-opacity duration-500" 
          />
          
          {/* Overlay Gradient (for better text visibility if needed) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300"></div>

          {/* Status Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium border border-white/10 text-white flex items-center gap-2">
            <ImageIcon className="w-3 h-3 text-indigo-400" />
            Original
          </div>

          {/* Remove Button */}
          <button 
            onClick={onRemove}
            disabled={isGenerating}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-500/90 text-white backdrop-blur-md rounded-full transition-all duration-200 transform hover:rotate-90 disabled:opacity-0"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}