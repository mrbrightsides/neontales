export type Language = 'id' | 'en';
export type AgeGroup = '3-5' | '6-8' | '9-12';
export type StoryCategory = 'Folklore' | 'Myth' | 'Legend' | 'Fable' | 'Fairy Tale' | 'Adventure' | 'Parable' | 'Humor' | 'Education';
export type StoryLength = 'short' | 'medium' | 'long';

export interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  appearance: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  category: StoryCategory;
  ageGroup: AgeGroup;
  language: Language;
  createdAt: number;
  isFavorite: boolean;
  characterId?: string;
  rating?: number;
  imageUrl?: string;
  choices?: string[];
  parentStoryId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  condition: string;
}

export interface UserStats {
  totalStoriesRead: number;
  totalStoriesGenerated: number;
  currentStreak: number;
  lastReadDate?: string;
  unlockedAchievements: string[];
}
