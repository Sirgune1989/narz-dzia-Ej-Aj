import React, { useEffect, useState } from 'react';
import { Tool } from '../types';

interface ModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ tool, isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  if (!tool) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        {/* Header Image/Pattern */}
        <div className="h-32 bg-gradient-to-r from-indigo-900 to-slate-900 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
            >
                &times;
            </button>
            <div className="absolute -bottom-8 left-8">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-4 border-slate-900">
                    {tool.icon}
                </div>
            </div>
        </div>

        <div className="pt-12 pb-8 px-8">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white">{tool.name}</h2>
                    <div className="flex gap-2 mt-1">
                        {tool.categories.map(cat => (
                            <span key={cat} className="text-indigo-400 text-sm font-medium uppercase tracking-wide px-2 py-0.5 rounded-md bg-indigo-500/10">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${tool.pricing === 'Free' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-slate-600 text-slate-300 bg-slate-800'}`}>
                        {tool.pricing}
                    </span>
                    <div className="mt-2 flex items-center text-yellow-400 text-sm">
                        <span className="mr-1">★</span> {tool.rating}/10
                    </div>
                </div>
            </div>

            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {tool.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-slate-400 text-xs font-bold uppercase mb-2">Jak zacząć (Quick Start)</h4>
                    <p className="text-slate-300 text-sm">{tool.tutorialStep}</p>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-slate-400 text-xs font-bold uppercase mb-2">Najlepsze zastosowanie</h4>
                    <div className="flex flex-wrap gap-2">
                        {tool.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-md border border-indigo-500/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <a 
                href={tool.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.7)]"
            >
                Otwórz {tool.name}
            </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;