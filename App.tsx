import React, { useState, useMemo } from 'react';
import { TOOLS_DATA } from './data';
import { Category, Tool } from './types';
import ToolCard from './components/ToolCard';
import Modal from './components/Modal';
import Matchmaker from './components/Matchmaker';

const CATEGORIES: Category[] = ['Wszystkie', 'Wideo', 'Grafika', 'Dev', 'Produktywność', 'Audio'];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering Logic
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory = activeCategory === 'Wszystkie' || tool.categories.includes(activeCategory);
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Standard cleanup after animation would happen in Modal component logic usually
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                N
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">Nexus<span className="text-indigo-500">.AI</span></span>
            </div>
            <div className="hidden md:block">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">Zgłoś narzędzie</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                Baza wiedzy 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                Odkryj potęgę <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">sztucznej inteligencji</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
                Wyselekcjonowana lista najlepszych narzędzi AI, które przyspieszą Twoją pracę 10x. 
                Bez spamu, tylko sprawdzone rozwiązania.
            </p>
        </div>

        {/* Matchmaker Wizard */}
        <Matchmaker onSelectCategory={setActiveCategory} />

        {/* Filter Bar */}
        <div className="sticky top-20 z-30 mb-8 p-2 rounded-2xl glass-panel flex flex-col md:flex-row gap-4 justify-between items-center transition-all duration-300">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0 px-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            activeCategory === cat 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                            : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="Szukaj (np. wideo, logo)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
            </div>
        </div>

        {/* Bento Grid */}
        {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
            {filteredTools.map((tool) => (
                <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    onClick={handleToolClick} 
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <div className="text-4xl mb-4">👻</div>
                <h3 className="text-xl font-bold text-white mb-2">Nic nie znaleziono</h3>
                <p className="text-slate-400">Spróbuj zmienić kategorię lub wpisać inne zapytanie.</p>
                <button 
                    onClick={() => {setActiveCategory('Wszystkie'); setSearchQuery('');}}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                >
                    Wyczyść filtry
                </button>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
                Nexus AI Directory © 2025. Created by Senior Full-Stack Dev.
            </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal 
        tool={selectedTool} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

    </div>
  );
}

export default App;