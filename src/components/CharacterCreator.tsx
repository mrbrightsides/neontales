import React, { useState } from 'react';
import { UserPlus, Sparkles, Smile, Shield, Brain, Zap, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Character } from '../types';
import { PERSONALITIES } from '../constants';

interface CharacterCreatorProps {
  onSave: (char: Character) => void;
  existingCharacters: Character[];
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onSave, existingCharacters }) => {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState(PERSONALITIES[0]);
  const [description, setDescription] = useState('');
  const [appearance, setAppearance] = useState('');

  const handleSave = () => {
    if (!name || !description) return;
    
    onSave({
      id: crypto.randomUUID(),
      name,
      personality,
      description,
      appearance,
    });

    setName('');
    setDescription('');
    setAppearance('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
      {/* List Existing */}
      {existingCharacters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400" />
            Your Characters
          </h3>
          <div className="flex flex-wrap gap-4">
            {existingCharacters.map((char) => (
              <div key={char.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {char.name[0]}
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{char.name}</p>
                  <p className="text-white/40 text-[10px]">{char.personality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
            <UserPlus className="text-cyan-400" />
            Buat Karakter Magical
          </h2>
          <p className="text-white/40 mt-2 italic">Desain hero ceritamu sendiri!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Nama Hero:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Bimo si Kancil Pintar"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Sifat Utama:</label>
              <select
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              >
                {PERSONALITIES.map((p) => (
                  <option key={p} value={p} className="bg-indigo-950">{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Siapa dia? (Deskripsi Singkat):</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Deskripsikan kekuatan atau petualangan hero ini..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!name || !description}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Wand2 size={24} />
          Ubah Jadi Karakter!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CharacterCreator;
