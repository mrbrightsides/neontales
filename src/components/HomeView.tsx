import React from 'react';
import { Book, Globe, Baby, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import StoryGenerator from './StoryGenerator';
import { Language, AgeGroup, StoryCategory, StoryLength } from '../types';

interface HomeViewProps {
  onGenerate: (config: {
    language: Language;
    ageGroup: AgeGroup;
    category: StoryCategory;
    length: StoryLength;
  }) => void;
  isLoading: boolean;
  hasStories: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ onGenerate, isLoading, hasStories }) => {
  return (
    <div className="space-y-12">
      {/* Generator Section */}
      <StoryGenerator onGenerate={onGenerate} isLoading={isLoading} />

      {/* Empty State Banner (from screenshot) */}
      {!hasStories ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl mx-auto p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-4"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <Book size={40} className="text-white/20" />
          </div>
          <h3 className="text-2xl font-bold text-white/60">Belum ada cerita yang dibuat</h3>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Pilih kategori cerita dan klik "Buat Cerita Baru" untuk memulai!
          </p>
        </motion.div>
      ) : (
        <div className="text-center">
            <p className="text-white/40 text-sm">Lihat koleksi ceritamu di menu "Koleksi Cerita"</p>
        </div>
      )}

      {/* Features Grid (from screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Bilingual', icon: Globe, color: 'text-blue-400' },
          { title: 'Age Filter', icon: Baby, color: 'text-yellow-400' },
          { title: 'Achievements', icon: Trophy, color: 'text-orange-400' },
          { title: '9 Kategori Cerita', icon: Sparkles, color: 'text-pink-400' },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors"
          >
            <feature.icon size={32} className={feature.color} />
            <h4 className="text-sm font-black text-white/80 uppercase tracking-widest">{feature.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
