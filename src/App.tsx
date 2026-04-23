/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Stars, Zap } from 'lucide-react';
import NeonBackground from './components/NeonBackground';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import StoryDisplay from './components/StoryDisplay';
import ManualEditor from './components/ManualEditor';
import ChatAgent from './components/ChatAgent';
import LibraryView from './components/LibraryView';
import AchievementsView from './components/AchievementsView';
import CharacterCreator from './components/CharacterCreator';
import { storage } from './services/storage';
import { geminiService } from './services/gemini';
import { Story, Character, UserStats, Language, AgeGroup, StoryCategory, StoryLength } from './types';
import { ACHIEVEMENTS } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [stories, setStories] = useState<Story[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [stats, setStats] = useState<UserStats>(storage.getStats());
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Load initial data
  useEffect(() => {
    setStories(storage.getStories());
    setCharacters(storage.getCharacters());
    checkDailyStreak();
  }, []);

  const checkDailyStreak = () => {
    const today = new Date().toDateString();
    if (stats.lastReadDate === today) return;

    let newStreak = stats.currentStreak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (stats.lastReadDate === yesterday.toDateString()) {
      newStreak += 1;
    } else if (stats.lastReadDate) {
      newStreak = 1;
    }

    const updated = storage.updateStats({ currentStreak: newStreak, lastReadDate: today });
    setStats(updated);
    checkAchievements(updated);
  };

  const checkAchievements = (currentStats: UserStats) => {
    const newlyUnlocked: string[] = [];
    
    ACHIEVEMENTS.forEach(ach => {
      if (currentStats.unlockedAchievements.includes(ach.id)) return;

      const [type, value] = ach.condition.split('_');
      const val = parseInt(value);

      if (type === 'generate') {
        if (currentStats.totalStoriesGenerated >= val) newlyUnlocked.push(ach.id);
      } else if (type === 'streak') {
        if (currentStats.currentStreak >= val) newlyUnlocked.push(ach.id);
      } else if (type === 'lang') {
        // Simple check for bilingual
        const langs = new Set(stories.map(s => s.language));
        if (langs.size >= val) newlyUnlocked.push(ach.id);
      } else if (type === 'create' && value === 'char') {
        if (characters.length > 0) newlyUnlocked.push(ach.id);
      }
    });

    if (newlyUnlocked.length > 0) {
      const updated = storage.updateStats({ 
        unlockedAchievements: [...currentStats.unlockedAchievements, ...newlyUnlocked] 
      });
      setStats(updated);
    }
  };

  const handleGenerateStory = async (config: {
    language: Language;
    ageGroup: AgeGroup;
    category: StoryCategory;
    length: StoryLength;
  }) => {
    setIsGenerating(true);
    try {
      // Pick a random character if available
      const randomChar = characters.length > 0 ? characters[Math.floor(Math.random() * characters.length)] : undefined;
      
      const generated = await geminiService.generateStory(
        config.category,
        config.ageGroup,
        config.language,
        config.length,
        randomChar
      );

      const newStory: Story = {
        id: crypto.randomUUID(),
        title: generated.title,
        content: generated.content,
        category: config.category,
        ageGroup: config.ageGroup,
        language: config.language,
        createdAt: Date.now(),
        isFavorite: false,
        characterId: randomChar?.id,
        choices: generated.choices,
        imageUrl: `https://loremflickr.com/800/600/${config.category.toLowerCase().replace(/\s+/g, ',')},${config.ageGroup}years,fantasy,magic,illustration`,
      };

      // Just set as active and viewable, don't persist yet to library view
      // Actually, to make it viewable in reader we need it as activeStory
      setActiveStory(newStory);
      setCurrentView('reader');

      // Update stats for generation but maybe not the library count yet?
      // Lets keep generation stats separate from saved stories count if possible
      // But achievements usually depend on total created.
    } catch (err) {
      alert('Maaf, ada masalah saat menciptakan sihir cerita. Coba lagi ya!');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveStory = (story: Story) => {
    // Check if already in list to avoid duplicates
    if (stories.find(s => s.id === story.id)) return;

    storage.saveStory(story);
    setStories(prev => [story, ...prev]);
    
    const updatedStats = storage.updateStats({ 
      totalStoriesGenerated: stats.totalStoriesGenerated + 1 
    });
    setStats(updatedStats);
    checkAchievements(updatedStats);
  };

  const handleSaveManualStory = (story: Story) => {
    storage.saveStory(story);
    setStories(prev => [story, ...prev]);
    
    const updatedStats = storage.updateStats({ 
      totalStoriesGenerated: stats.totalStoriesGenerated + 1 
    });
    setStats(updatedStats);
    checkAchievements(updatedStats);

    setActiveStory(story);
    setCurrentView('reader');
  };

  const handleRateStory = (storyId: string, rating: number) => {
    const updatedStories = stories.map(s => 
      s.id === storyId ? { ...s, rating } : s
    );
    setStories(updatedStories);
    storage.saveStories(updatedStories);
    
    // Also update active story if it's the one being rated
    if (activeStory && activeStory.id === storyId) {
      setActiveStory({ ...activeStory, rating });
    }
  };

  const [isContinuing, setIsContinuing] = useState(false);

  const handleChoice = async (choice: string) => {
    if (!activeStory) return;

    setIsContinuing(true);
    try {
      const continuation = await geminiService.continueStory(activeStory, choice);
      
      const updatedStory: Story = {
        ...activeStory,
        content: activeStory.content + "\n\n" + continuation.content,
        choices: continuation.choices,
        // Keep same metadata
      };

      // If it's already saved, update it in storage too
      if (stories.some(s => s.id === activeStory.id)) {
        const updatedStories = stories.map(s => 
          s.id === activeStory.id ? updatedStory : s
        );
        setStories(updatedStories);
        storage.saveStories(updatedStories);
      }

      setActiveStory(updatedStory);
    } catch (error) {
      console.error(error);
      alert('Maaf, sihir tujuannya terputus. Coba lagi ya!');
    } finally {
      setIsContinuing(false);
    }
  };

  const handleSaveCharacter = (char: Character) => {
    storage.saveCharacter(char);
    setCharacters(prev => [...prev, char]);
    
    const updatedStats = storage.updateStats({}); // Trigger check
    checkAchievements({ ...stats, unlockedAchievements: stats.unlockedAchievements });
    setCurrentView('generator');
  };

  const handleToggleFavorite = (id: string) => {
    const story = stories.find(s => s.id === id);
    if (story) {
      storage.updateStory(id, { isFavorite: !story.isFavorite });
      setStories(storage.getStories());
    }
  };

  const handleDeleteStory = (id: string) => {
    if (confirm('Hapus cerita ini dari koleksimu?')) {
      storage.deleteStory(id);
      setStories(storage.getStories());
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-purple-500/30">
      <NeonBackground />
      
      {/* Header Section */}
      <header className="pt-12 pb-6 px-4 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-20 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            NEON TALES
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-xl md:text-2xl font-bold text-yellow-400 flex items-center justify-center gap-2">
            <Sparkles size={20} />
            Cerita Magical untuk Anak-Anak
            <Sparkles size={20} />
          </h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base leading-relaxed">
            AI storyteller yang menciptakan dongeng, cerita rakyat, dan petualangan seru 
            dengan suara yang bisa kamu dengar!
          </p>
        </motion.div>

        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <div key="home">
              <HomeView 
                onGenerate={handleGenerateStory} 
                isLoading={isGenerating} 
                hasStories={stories.length > 0} 
              />
              
              {/* Quick Stats / Streak Indicator */}
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl">
                    <Zap className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Streak</p>
                    <p className="text-xl font-black text-white">{stats.currentStreak} Hari</p>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Stars className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Stories</p>
                    <p className="text-xl font-black text-white">{stats.totalStoriesGenerated}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'chat' ? (
            <div key="chat">
              <ChatAgent />
            </div>
          ) : currentView === 'editor' ? (
            <div key="editor">
              <ManualEditor onSave={handleSaveManualStory} onCancel={() => setCurrentView('library')} />
            </div>
          ) : currentView === 'library' ? (
            <div key="library">
              <LibraryView 
                stories={stories} 
                onRead={(s) => { setActiveStory(s); setCurrentView('reader'); }}
                onDelete={handleDeleteStory}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ) : currentView === 'achievements' ? (
            <div key="achievements">
              <AchievementsView unlockedIds={stats.unlockedAchievements} />
            </div>
          ) : currentView === 'characters' ? (
            <div key="characters">
              <CharacterCreator onSave={handleSaveCharacter} existingCharacters={characters} />
            </div>
          ) : currentView === 'reader' && activeStory ? (
            <div key="reader">
              <StoryDisplay 
                story={activeStory} 
                onBack={() => setCurrentView('library')} 
                onSave={handleSaveStory}
                onRate={handleRateStory}
                onChoice={handleChoice}
                isSaved={stories.some(s => s.id === activeStory.id)}
                isContinuing={isContinuing}
              />
            </div>
          ) : (
             <div key="fallback" className="text-center py-20 text-white/40">
               Something went wrong. Let's go home.
               <button onClick={() => setCurrentView('home')} className="block mt-4 text-purple-400 underline mx-auto">Home</button>
             </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center pointer-events-none">
        <p className="text-[10px] text-white/20 font-medium tracking-widest uppercase">
          Powered by Gemini AI • Made with Love for Kids
        </p>
      </footer>
    </div>
  );
}
