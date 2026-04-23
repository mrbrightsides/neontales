import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Volume2, VolumeX, SkipBack, Info, Bookmark, BookmarkCheck, Star, Sparkles, ChevronRight, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from '../types';

interface StoryDisplayProps {
  story: Story;
  onBack: () => void;
  onSave?: (story: Story) => void;
  onRate?: (storyId: string, rating: number) => void;
  onChoice?: (choice: string) => void;
  isSaved?: boolean;
  isContinuing?: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ 
  story, 
  onBack, 
  onSave, 
  onRate,
  onChoice,
  isSaved,
  isContinuing 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [hasSaved, setHasSaved] = useState(isSaved);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Split content into words for highlighting
  const words = useMemo(() => {
    return story.content.split(/\s+/);
  }, [story.content]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSave = () => {
    if (onSave && !hasSaved) {
      onSave(story);
      setHasSaved(true);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
    } else {
      const utterance = new SpeechSynthesisUtterance(story.content);
      utterance.lang = story.language === 'id' ? 'id-ID' : 'en-US';
      utterance.rate = speechRate;
      utteranceRef.current = utterance;
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          // Find which word index this character offset refers to
          const charIndex = event.charIndex;
          const textBefore = story.content.substring(0, charIndex);
          const wordCountBefore = textBefore.split(/\s+/).filter(Boolean).length;
          setCurrentWordIndex(wordCountBefore);
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentWordIndex(-1);
      };
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        setIsSpeaking(false);
        setCurrentWordIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-8"
    >
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <SkipBack size={18} />
          Back
        </button>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Rating */}
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate?.(story.id, star)}
                className="transition-transform hover:scale-125"
              >
                <Star
                  size={16}
                  className={star <= (story.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
                />
              </button>
            ))}
          </div>

          {onSave && (
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border
                ${hasSaved 
                  ? 'bg-green-500/20 border-green-500/40 text-green-400 cursor-default' 
                  : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/30'}`}
            >
              {hasSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              <span className="text-xs font-bold">{hasSaved ? 'Tersimpan' : 'Simpan'}</span>
            </button>
          )}

          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
            <span className="text-[10px] text-white/40 uppercase font-bold">Speed</span>
            <select
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="bg-transparent text-white text-xs outline-none cursor-pointer"
            >
              {[0.5, 0.8, 1, 1.2, 1.5].map(v => (
                <option key={v} value={v} className="bg-indigo-950">{v}x</option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleSpeech}
            className={`p-3 rounded-full transition-all ${
              isSpeaking ? 'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-white/10 hover:bg-white/20'
            } text-white`}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="space-y-8">
        {/* Illustration */}
        {story.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group"
          >
            <img 
              src={story.imageUrl} 
              alt={story.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-[10px] text-white/60 font-medium tracking-widest uppercase flex items-center gap-2">
                <ImageIcon size={12} /> AI Generated Illustration
              </span>
            </div>
          </motion.div>
        )}

        <div className="text-center space-y-2">
          <p className="text-purple-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <Sparkles size={12} /> {story.category} • {story.ageGroup} Years <Sparkles size={12} />
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {story.title}
          </h1>
        </div>

        {/* Highlighted text container */}
        <div className="prose prose-invert max-w-none">
          <div className="text-white/80 text-xl md:text-2xl leading-relaxed text-justify space-x-1">
            {story.content.split('\n').map((para, pIdx) => (
              para.trim() && (
                <div key={pIdx} className="mb-6">
                   {para.split(/\s+/).map((word, wIdx) => {
                     // Calculate absolute index
                     const absIdx = story.content.split('\n').slice(0, pIdx).join(' ').split(/\s+/).filter(Boolean).length + wIdx;
                     const isHighlighted = absIdx === currentWordIndex;
                     
                     return (
                       <span 
                         key={wIdx} 
                         className={`inline-block transition-all duration-150 py-0.5 px-1 rounded
                           ${isHighlighted 
                             ? 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.6)] scale-110 font-bold' 
                             : ''}`}
                       >
                         {word}
                       </span>
                     );
                   })}
                </div>
              )
            ))}
          </div>
        </div>

        {/* CYOA Choices */}
        {story.choices && story.choices.length > 0 && !isContinuing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8 border-t border-white/10 space-y-4"
          >
            <h3 className="text-white font-black text-lg flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={20} />
              Apa yang harus dilakukan selanjutnya?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => onChoice?.(choice)}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-white text-left hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-sm md:text-base font-medium">{choice}</span>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {isContinuing && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-white/40 text-sm animate-pulse">Menghitung takdir baru...</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-white/40 text-[10px]">
        <div className="flex items-center gap-1">
          <Info size={12} />
          <span>Smart Highlighting Active</span>
        </div>
        <span>•</span>
        <span>{new Date(story.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
};

export default StoryDisplay;
