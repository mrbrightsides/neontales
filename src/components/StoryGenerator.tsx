import React, { useState } from 'react';
import { BookOpen, Wand2, Globe, Baby, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { LANGUAGES, AGE_GROUPS, CATEGORIES, STORY_LENGTHS } from '../constants';
import { Language, AgeGroup, StoryCategory, StoryLength } from '../types';

interface GeneratorProps {
  onGenerate: (config: {
    language: Language;
    ageGroup: AgeGroup;
    category: StoryCategory;
    length: StoryLength;
  }) => void;
  isLoading: boolean;
}

const StoryGenerator: React.FC<GeneratorProps> = ({ onGenerate, isLoading }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('6-8');
  const [category, setCategory] = useState<StoryCategory>('Fairy Tale');
  const [length, setLength] = useState<StoryLength>('medium');

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <Wand2 className="text-pink-400" />
          Neon Tales Generator
          <Wand2 className="text-pink-400" />
        </h2>
        <p className="text-white/60 text-[11px] md:text-sm">
          Pilih kategori cerita yang kamu inginkan, lalu biarkan AI menciptakan cerita magical untukmu!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-wider">
            <Globe size={14} className="text-blue-400" />
            Bahasa:
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.icon} {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-wider">
            <Baby size={14} className="text-yellow-400" />
            Usia Anak:
          </label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
          >
            {AGE_GROUPS.map((a) => (
              <option key={a.value} value={a.value}>
                👶 {language === 'id' ? a.idLabel : a.enLabel}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-wider">
            <BookOpen size={14} className="text-green-400" />
            Kategori Cerita:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {language === 'id' ? c.idLabel : c.enLabel}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-wider">
            <Clock size={14} className="text-cyan-400" />
            Panjang Cerita:
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value as StoryLength)}
            className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
          >
            {STORY_LENGTHS.map((s) => (
              <option key={s.value} value={s.value}>
                {language === 'id' ? s.idLabel : s.enLabel} {s.range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        onClick={() => onGenerate({ language, ageGroup, category, length })}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating magic...
          </div>
        ) : (
          <>
            <Wand2 size={24} />
            Buat Cerita Baru!
          </>
        )}
      </motion.button>
      
      <p className="text-center text-white/30 text-[10px] italic flex items-center justify-center gap-1">
        🤖 Dipersembahkan oleh AI yang penuh kreativitas
      </p>
    </div>
  );
};

export default StoryGenerator;
