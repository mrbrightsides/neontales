import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/gemini';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const ChatAgent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Halo! Aku AI Storyteller dari Neon Tales! Ayo ngobrol tentang cerita seru! Mau cerita tentang apa hari ini? 🌟',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.concat(userMsg).map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await geminiService.chat(history);

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        text: 'Aduh, sepertinya sihirku lagi macet. Bisa coba tanya lagi?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#1e1436]/80 backdrop-blur-2xl shadow-2xl flex flex-col h-[70vh] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Chat <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">AI Agent</span>
          </h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 space-y-2 relative ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg rounded-tr-none'
                    : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {m.role === 'model' ? (
                    <span className="text-[10px] uppercase font-black text-purple-400 flex items-center gap-1">
                      <Bot size={12} /> Gemini
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-black text-indigo-300 flex items-center gap-1">
                      <User size={12} /> Kamu
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base leading-relaxed">{m.text}</p>
                <p className="text-[10px] text-white/40 text-right">{m.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/5 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesanmu di sini..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-purple-600 rounded-xl text-white shadow-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </motion.button>
        </div>

        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 flex items-center gap-2">
          <Lightbulb size={14} className="text-yellow-400 flex-shrink-0" />
          <p className="text-[10px] md:text-xs text-white/60">
            <span className="font-bold">Tips:</span> Tanya tentang cerita favorit, minta rekomendasi, atau ngobrol tentang karakter seru!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatAgent;
