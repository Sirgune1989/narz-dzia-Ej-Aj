import React, { useState } from 'react';
import { Category } from '../types';

interface MatchmakerProps {
  onSelectCategory: (category: Category) => void;
}

const Matchmaker: React.FC<MatchmakerProps> = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const problems = [
    { label: "Chcę stworzyć wideo promocyjne", category: "Wideo" as Category, icon: "🎬" },
    { label: "Potrzebuję grafiki lub logo", category: "Grafika" as Category, icon: "🎨" },
    { label: "Chcę zbudować aplikację/stronę", category: "Dev" as Category, icon: "💻" },
    { label: "Muszę napisać tekst lub zrobić research", category: "Produktywność" as Category, icon: "🧠" },
    { label: "Szukam głosu lektora lub muzyki", category: "Audio" as Category, icon: "🎵" },
  ];

  return (
    <div className="w-full mb-12">
      {!isOpen ? (
        <div 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-1 cursor-pointer transform hover:scale-[1.01] transition-all shadow-lg shadow-indigo-500/20"
        >
          <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Nie wiesz czego szukasz?</h2>
              <p className="text-slate-400 text-sm">Uruchom AI Matchmaker i znajdź narzędzie w 3 sekundy.</p>
            </div>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
              ✨
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 animate-slide-up shadow-2xl shadow-indigo-900/20">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">W czym mogę Ci pomóc?</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">&times;</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {problems.map((problem, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            onSelectCategory(problem.category);
                            setIsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-indigo-600 rounded-xl transition-colors group"
                    >
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{problem.icon}</span>
                        <span className="text-xs text-center font-medium text-slate-300 group-hover:text-white">
                            {problem.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Matchmaker;
