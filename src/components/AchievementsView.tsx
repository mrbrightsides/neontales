import React from 'react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS } from '../constants';
import { Lock, CheckCircle2 } from 'lucide-react';

interface AchievementsViewProps {
  unlockedIds: string[];
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ unlockedIds }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-white">Your Achievements</h2>
        <p className="text-white/40">Dapatkan lencana spesial dengan terus membaca dan berkreasi!</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
              className={`relative overflow-hidden rounded-2xl border p-4 flex flex-col items-center justify-center text-center space-y-3 transition-all aspect-square
                ${isUnlocked 
                  ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : 'bg-white/5 border-white/10 grayscale opacity-50'}`}
            >
              <span className="text-4xl">{achievement.icon}</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight mb-1">{achievement.title}</p>
                <p className="text-[10px] text-white/40 leading-tight">{achievement.description}</p>
              </div>
              
              <div className="absolute top-2 right-2">
                {isUnlocked ? (
                  <CheckCircle2 size={14} className="text-green-400" />
                ) : (
                  <Lock size={14} className="text-white/20" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsView;
