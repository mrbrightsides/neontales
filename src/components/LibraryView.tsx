import React from 'react';
import { Bookmark, Trash2, BookOpen, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Story } from '../types';

interface LibraryViewProps {
  stories: Story[];
  onRead: (story: Story) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ stories, onRead, onDelete, onToggleFavorite }) => {
  const averageRating = stories.length > 0 
    ? (stories.reduce((acc, s) => acc + (s.rating || 0), 0) / stories.filter(s => s.rating).length || 0).toFixed(1)
    : 0;

  if (stories.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
          <BookOpen size={40} className="text-white/20" />
        </div>
        <h3 className="text-xl font-bold text-white/60">Belum ada koleksi cerita.</h3>
        <p className="text-white/40">Mulailah membuat cerita pertamamu di generator!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-white font-bold">Koleksi Cerita</h2>
          <p className="text-white/40 text-xs">{stories.length} Cerita Tersimpan</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400 font-bold">
            <Star size={16} fill="currentColor" />
            <span>{averageRating}</span>
          </div>
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Rating Rata-rata</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <motion.div
          key={story.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => onRead(story)}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold uppercase tracking-wider">
              {story.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(story.id);
                }}
                className={`transition-colors ${story.isFavorite ? 'text-yellow-400' : 'text-white/20 hover:text-white'}`}
              >
                <Star size={18} fill={story.isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(story.id);
                }}
                className="text-white/20 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
            {story.title}
          </h3>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase">
              <span>{story.ageGroup} Years</span>
              <span>•</span>
              <span>{story.language === 'id' ? 'Indonesia' : 'English'}</span>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-0.5 ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={10}
                  className={star <= (story.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

export default LibraryView;
