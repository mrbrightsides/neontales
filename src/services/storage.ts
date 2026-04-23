import { Story, Character, UserStats } from '../types';

const STORAGE_KEYS = {
  STORIES: 'neon_tales_stories',
  CHARACTERS: 'neon_tales_characters',
  STATS: 'neon_tales_stats',
};

export const storage = {
  getStories: (): Story[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STORIES);
    return data ? JSON.parse(data) : [];
  },
  saveStory: (story: Story) => {
    const stories = storage.getStories();
    stories.unshift(story);
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },
  saveStories: (stories: Story[]) => {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },
  updateStory: (id: string, updates: Partial<Story>) => {
    const stories = storage.getStories();
    const index = stories.findIndex(s => s.id === id);
    if (index !== -1) {
      stories[index] = { ...stories[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    }
  },
  deleteStory: (id: string) => {
    const stories = storage.getStories();
    const filtered = stories.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(filtered));
  },

  getCharacters: (): Character[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHARACTERS);
    return data ? JSON.parse(data) : [];
  },
  saveCharacter: (char: Character) => {
    const chars = storage.getCharacters();
    chars.push(char);
    localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(chars));
  },
  updateCharacter: (id: string, updates: Partial<Character>) => {
    const chars = storage.getCharacters();
    const index = chars.findIndex(c => c.id === id);
    if (index !== -1) {
      chars[index] = { ...chars[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(chars));
    }
  },

  getStats: (): UserStats => {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : {
      totalStoriesRead: 0,
      totalStoriesGenerated: 0,
      currentStreak: 0,
      unlockedAchievements: [],
    };
  },
  updateStats: (updates: Partial<UserStats>) => {
    const stats = storage.getStats();
    const newStats = { ...stats, ...updates };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    return newStats;
  },
};
