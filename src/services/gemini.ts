import { GoogleGenAI } from '@google/genai';
import { StoryCategory, AgeGroup, StoryLength, Language, Character, Story } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const geminiService = {
  generateStory: async (
    category: StoryCategory,
    ageGroup: AgeGroup,
    language: Language,
    length: StoryLength,
    character?: Character
  ) => {
    const prompt = `
      Write a children's story for the following profile:
      - Category: ${category}
      - Target Age Group: ${ageGroup} (3-12 years old)
      - Language: ${language === 'id' ? 'Indonesian' : 'English'}
      - Preferred Length: ${length}
      ${character ? `- Main Character: ${character.name}, described as ${character.description} with a ${character.personality} personality.` : ''}

      Rules:
      1. Make it engaging, educational, and fun.
      2. Use age-appropriate vocabulary.
      3. The theme should be vibrant and imaginative.
      4. Return the response strictly in JSON format without any markdown blocks:
         {
           "title": "Title of the story",
           "content": "Full story content with paragraph breaks",
           "summary": "Short 1-sentence summary",
           "choices": ["Choice 1", "Choice 2", "Choice 3"]
         }
      5. At the end of the narrative, provide 3 "Choose Your Own Adventure" paths for the reader.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const text = response.text;
      if (!text) throw new Error('No response from AI');
      
      // Clean up potential markdown blocks if the model ignored the instruction
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned) as { title: string; content: string; summary: string; choices?: string[] };
    } catch (error) {
      console.error('Error generating story:', error);
      throw error;
    }
  },

  chat: async (history: { role: 'user' | 'model'; parts: { text: string }[] }[]) => {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history,
      config: {
        systemInstruction: "You are a friendly storyteller AI for kids called Gemini from Neon Tales. You love talking about stories, characters, and adventures. Always be immersive and never include placeholder text like 'Read more' or 'Loading...'. Your goal is to engage children in short, magical conversations.",
      }
    });

    try {
      const lastMessage = history[history.length - 1].parts[0].text;
      const result = await chat.sendMessage({ message: lastMessage });
      return result.text;
    } catch (error) {
      console.error('Error in chat:', error);
      throw error;
    }
  },

  continueStory: async (previousStory: Story, choice: string) => {
    const prompt = `
      Continue the story titled "${previousStory.title}".
      The reader chose: "${choice}".
      
      Continue the adventure for a child aged ${previousStory.ageGroup}.
      
      Rules:
      1. Engaging, educational, and fun.
      2. Strictly JSON output:
         {
           "content": "The next part of the story...",
           "choices": ["Next Choice A", "Next Choice B", "Next Choice C"]
         }
      3. If the story should conclude, provide an empty array for "choices".
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const text = response.text;
      if (!text) throw new Error('No response from AI');
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned) as { content: string; choices?: string[] };
    } catch (error) {
      console.error('Error continuing story:', error);
      throw error;
    }
  }
};
