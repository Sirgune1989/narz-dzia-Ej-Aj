import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div 
      onClick={() => onClick(tool)}
      className="group relative h-full flex flex-col justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] overflow-hidden"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl text-2xl shadow-inner group-hover:bg-slate-700 transition-colors">
            {tool.icon}
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
             {tool.isNew && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                New
              </span>
            )}
            {tool.isHot && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-400/10 rounded-full border border-orange-400/20">
                Hot
              </span>
            )}
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 rounded-full">
              {tool.categories[0]}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {tool.tagline}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
        <div className="flex gap-2">
            {tool.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-slate-500">#{tag}</span>
            ))}
        </div>
        <span className="text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          Więcej &rarr;
        </span>
      </div>
    </div>
  );
};

export default ToolCard;