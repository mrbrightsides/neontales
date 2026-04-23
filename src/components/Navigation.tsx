import React from 'react';
import { BookOpen, Trophy, UserPlus, Library, MessageSquare, Mic, PenTool, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const items = [
    { id: 'chat', label: 'Chat AI Agent', icon: MessageSquare, color: 'text-indigo-400' },
    { id: 'home', label: 'Magic Generator', icon: Star, color: 'text-pink-400' },
    { id: 'library', label: 'Koleksi Cerita', icon: Library, color: 'text-purple-400' },
    { id: 'editor', label: 'Buat Cerita Sendiri', icon: PenTool, color: 'text-pink-400' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, color: 'text-yellow-400' },
    { id: 'characters', label: 'Buat Karakter', icon: UserPlus, color: 'text-cyan-400' },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 p-4 mt-4">
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewChange(item.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md transition-all
            ${currentView === item.id 
              ? 'bg-white/20 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
              : 'bg-white/5 hover:bg-white/10'}`}
        >
          <item.icon size={18} className={item.color} />
          <span className="text-sm font-medium text-white/90">{item.label}</span>
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;
