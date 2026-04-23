import { StoryCategory, AgeGroup, StoryLength, Language } from './types';

export const CATEGORIES: { value: StoryCategory; idLabel: string; enLabel: string; icon: string }[] = [
  { value: 'Fairy Tale', idLabel: 'Dongeng & Fairy Tales', enLabel: 'Fairy Tales', icon: '✨' },
  { value: 'Fable', idLabel: 'Cerita Fabel (Hewan)', enLabel: 'Animal Fables', icon: '🐾' },
  { value: 'Folklore', idLabel: 'Cerita Rakyat Nusantara', enLabel: 'Folklore', icon: '🌐' },
  { value: 'Adventure', idLabel: 'Petualangan Seru', enLabel: 'Adventure', icon: '🗺️' },
  { value: 'Education', idLabel: 'Cerita Edukasi', enLabel: 'Educational', icon: '📖' },
  { value: 'Humor', idLabel: 'Cerita Lucu', enLabel: 'Funny Stories', icon: '✨' },
  { value: 'Myth', idLabel: 'Mitos & Cerita Dewa', enLabel: 'Mythology', icon: '⚡' },
  { value: 'Legend', idLabel: 'Legenda & Saga Pahlawan', enLabel: 'Legends', icon: '👑' },
  { value: 'Parable', idLabel: 'Parabel & Hikayat Bijak', enLabel: 'Parables', icon: '🤍' },
];

export const AGE_GROUPS: { value: AgeGroup; idLabel: string; enLabel: string; description: string }[] = [
  { value: '3-5', idLabel: '3-5 Tahun (PAUD/TK)', enLabel: '3-5 Years', description: 'Simple words, lots of action' },
  { value: '6-8', idLabel: '6-8 Tahun (SD Kecil)', enLabel: '6-8 Years', description: 'Medium complexity, some dialogue' },
  { value: '9-12', idLabel: '9-12 Tahun (SD Besar)', enLabel: '9-12 Years', description: 'Complex themes, deeper vocabulary' },
];

export const STORY_LENGTHS: { value: StoryLength; idLabel: string; enLabel: string; range: string }[] = [
  { value: 'short', idLabel: 'Singkat (2-3 menit)', enLabel: 'Short', range: '200-300 words' },
  { value: 'medium', idLabel: 'Sedang (4-6 menit)', enLabel: 'Medium', range: '400-600 words' },
  { value: 'long', idLabel: 'Panjang (7-10 menit)', enLabel: 'Long', range: '800-1000 words' },
];

export const LANGUAGES: { value: Language; label: string; icon: string }[] = [
  { value: 'id', label: 'Bahasa Indonesia', icon: '🇮🇩' },
  { value: 'en', label: 'English', icon: '🇺🇸' },
];

export const PERSONALITIES = [
  'Kind', 'Brave', 'Smart', 'Funny', 'Curious', 'Shy', 'Creative', 'Adventurous'
];

export const ACHIEVEMENTS = [
  { id: 'first_story', title: 'First Story', description: 'Generate your very first story!', icon: '📖', condition: 'generate_1' },
  { id: 'explorer', title: 'Story Explorer', description: 'Generate 5 stories', icon: '🏔️', condition: 'generate_5' },
  { id: 'master', title: 'Story Master', description: 'Generate 20 stories', icon: '🧙', condition: 'generate_20' },
  { id: 'bilingual_newbie', title: 'Bilingual Newbie', description: 'Read stories in 2 different languages', icon: '🌍', condition: 'lang_2' },
  { id: 'streak_3', title: '3-Day Streak', description: 'Read for 3 days in a row!', icon: '🔥', condition: 'streak_3' },
  { id: 'character_creator', title: 'Character Creator', description: 'Create your first custom character', icon: '🎭', condition: 'create_char' },
];
