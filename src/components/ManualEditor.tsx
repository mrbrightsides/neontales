import React, { useState, useMemo } from 'react';
import { PenTool, X, Save, Lightbulb, Book, Rocket, Link, Sparkles, Clock, Hash, Trophy, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, LANGUAGES, AGE_GROUPS } from '../constants';
import { Language, AgeGroup, StoryCategory, Story } from '../types';

interface ManualEditorProps {
  onSave: (story: Story) => void;
  onCancel: () => void;
}

const ManualEditor: React.FC<ManualEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<StoryCategory>('Fairy Tale');
  const [language, setLanguage] = useState<Language>('id');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('6-8');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);
  const progress = Math.min((charCount / 20000) * 100, 100);

  const handleSave = () => {
    if (!title || !content) return;

    const newStory: Story = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      ageGroup,
      language,
      createdAt: Date.now(),
      isFavorite: false,
    };

    onSave(newStory);
  };

  const tips = [
    { id: 'opening', title: 'Pembuka Cerita', icon: Lightbulb, content: 'Butuh inspirasi? Mulailah dengan mengenalkan tokoh utama dan keinginannya!' },
    { id: 'structure', title: 'Struktur Cerita (Panduan)', icon: Book, content: 'Ikuti panduan: Awal (Pengenalan), Tengah (Masalah), dan Akhir (Penyelesaian).' },
    { id: 'sentences', title: 'Kalimat Pembuka', icon: Rocket, content: 'Mulai dengan: "Di sebuah kerajaan yang sangat jauh...", "Dahulu kala ada seekor...", atau "Pernahkah kamu membayangkan..."' },
    { id: 'links', title: 'Kata Penghubung', icon: Link, content: 'Gunakan kata: "Kemudian", "Setelah itu", "Tiba-tiba", atau "Akhirnya" untuk menyambung cerita.' },
    { id: 'ideas', title: 'Ide Kata-Kata', icon: Sparkles, content: 'Gunakan kata sifat yang menarik: "Berkilauan", "Misterius", "Raksasa", atau "Keajaiban".' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl mx-auto p-4 md:p-8 rounded-3xl border border-white/10 bg-[#1e1436]/80 backdrop-blur-2xl shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400">
            <PenTool size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Buat Cerita Sendiri</h2>
            <p className="text-white/60 text-sm">Tulis dongeng versimu sendiri! 🌟</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 text-white/40 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Main Tips Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
        <div className="text-yellow-400">
          <Lightbulb size={24} />
        </div>
        <p className="text-white/80 text-sm font-medium">
          <span className="font-bold">Tips:</span> Tulis cerita dengan imajinasimu! Siapa tahu kamu akan jadi penulis novel hebat di masa depan! 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Inputs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white text-sm font-bold flex items-center gap-2">
                📄 Judul Cerita <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Contoh: Petualangan Adek ke Hutan Ajaib"
              />
              <div className="text-right text-[10px] text-white/40">{title.length}/100 karakter</div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-bold flex items-center gap-2">
                ✍️ Nama Penulis (Opsional)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Nama kamu (misal: Zahra)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-bold flex items-center gap-2">
                📚 Kategori Cerita
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StoryCategory)}
                className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white cursor-pointer outline-none focus:ring-2 focus:ring-pink-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.icon} {c.idLabel}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-bold flex items-center gap-2">
                🌐 Bahasa
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-[#2a1d4a] border border-white/10 rounded-xl px-4 py-3 text-white cursor-pointer outline-none focus:ring-2 focus:ring-pink-500"
              >
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value}>{l.icon} {l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Age Group Section */}
          <div className="space-y-4">
            <label className="text-white text-sm font-bold flex items-center gap-2">
              👶 Untuk Usia
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AGE_GROUPS.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAgeGroup(a.value)}
                  className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-1 items-center
                    ${ageGroup === a.value 
                      ? 'bg-green-500/10 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <span className="text-2xl">👶</span>
                  <span className="text-white font-bold text-sm">{a.idLabel.split(' ')[0]} {a.idLabel.split(' ')[1]}</span>
                  <span className="text-white/40 text-[10px] text-center">{a.idLabel.split('(')[1]?.replace(')', '') || a.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Writing Area */}
          <div className="space-y-4">
            <label className="text-white text-sm font-bold flex items-center gap-2">
              ✨ Tulis Cerita Kamu <span className="text-red-400">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 20000))}
              placeholder="Tulis cerita kamu di sini... Mulai dengan 'Suatu hari...' atau 'Di sebuah kerajaan jauh...'"
              rows={15}
              className="w-full bg-[#0f0a1c] border border-white/10 rounded-2xl p-6 text-white text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!title || !content}
              className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={20} />
              Simpan Cerita
            </button>
            <button
              onClick={onCancel}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <X size={20} />
              Batal
            </button>
          </div>
        </div>

        {/* Sidebar / Progress */}
        <div className="space-y-6">
          <div className="bg-[#2a1d4a]/50 p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white/60">
                <span className="flex items-center gap-1"><PenTool size={12} /> Progress Menulis</span>
                <span>{charCount.toLocaleString()} / 20,000 kata</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                />
              </div>
              <p className="text-center text-[10px] text-white/40 uppercase tracking-widest">{progress.toFixed(1)}% Selesai</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-[#1e1436] p-4 rounded-xl border border-white/5 flex flex-col items-center gap-1">
                <Clock size={20} className="text-cyan-400" />
                <span className="text-xl font-black text-white">{readingTime}</span>
                <span className="text-[10px] text-white/40 uppercase">menit baca</span>
              </div>
              <div className="bg-[#1e1436] p-4 rounded-xl border border-white/5 flex flex-col items-center gap-1">
                <Hash size={20} className="text-purple-400" />
                <span className="text-xl font-black text-white">{charCount}</span>
                <span className="text-[10px] text-white/40 uppercase">karakter</span>
              </div>
              <div className="bg-[#1e1436] p-4 rounded-xl border border-white/5 flex flex-col items-center gap-1">
                <Trophy size={20} className="text-yellow-400" />
                <span className="text-xl font-black text-white">50</span>
                <span className="text-[10px] text-white/40 uppercase">lagi</span>
              </div>
            </div>
          </div>

          {/* Quick Tips List */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
              ✨ Inspirasi Penulisan
            </h3>
            {tips.map((tip) => (
              <div key={tip.id} className="group">
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <tip.icon size={18} className="text-purple-400" />
                    <span className="text-xs font-bold text-white/80">{tip.title}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-white/20 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {expandedTip === tip.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 text-[11px] text-white/60 leading-relaxed bg-white/5 border-x border-b border-white/10 rounded-b-xl -mt-2">
                        {tip.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-green-400 text-xs flex items-center justify-center gap-2">
          💚 Ingat: Tidak ada cerita yang salah! Biarkan imajinasimu mengalir bebas! 🌈
        </p>
      </div>
    </motion.div>
  );
};

export default ManualEditor;
