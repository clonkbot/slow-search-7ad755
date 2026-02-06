import { useState, useEffect, useCallback } from 'react';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

const mockResults: SearchResult[] = [
  {
    title: "The Ultimate Guide to Deep Research",
    url: "https://deepknowledge.io/research-guide",
    snippet: "Discover comprehensive methodologies for conducting thorough research that goes beyond surface-level findings...",
    source: "deepknowledge.io"
  },
  {
    title: "Understanding Complex Topics Made Simple",
    url: "https://learnmore.edu/complex-topics",
    snippet: "Break down intricate subjects into digestible pieces with our expert-curated explanations and examples...",
    source: "learnmore.edu"
  },
  {
    title: "Expert Insights & Analysis Hub",
    url: "https://insighthub.com/analysis",
    snippet: "Access premium analysis from industry experts who take the time to understand every angle of the topic...",
    source: "insighthub.com"
  },
  {
    title: "Comprehensive Knowledge Database",
    url: "https://knowledgebase.org/comprehensive",
    snippet: "Our curated database contains meticulously verified information spanning thousands of subjects...",
    source: "knowledgebase.org"
  },
  {
    title: "In-Depth Topic Explorer",
    url: "https://topicexplorer.net/depth",
    snippet: "Explore topics with unprecedented depth. Quality takes time, and our results prove it's worth the wait...",
    source: "topicexplorer.net"
  }
];

function App() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeLeft(15);
    setResults([]);
    setShowResults(false);
    setHasSearched(true);
  }, [query]);

  useEffect(() => {
    if (!isSearching) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSearching(false);
          setResults(mockResults);
          setTimeout(() => setShowResults(true), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSearching]);

  const progress = ((15 - timeLeft) / 15) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative flex flex-col">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-start px-4 py-8 md:py-16">
        {/* Logo & Title */}
        <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${hasSearched && !isSearching ? 'scale-75 md:scale-90' : ''}`}>
          <div className="relative inline-block">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400">
                SLOW
              </span>
              <span className="text-white/90">SEARCH</span>
            </h1>
            <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full -z-10" />
          </div>
          <p className="font-mono text-xs md:text-sm text-cyan-400/60 mt-3 tracking-[0.3em] uppercase">
            Quality takes time
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity" />
            <div className="relative bg-[#12121a] rounded-2xl p-1.5">
              <div className="flex items-center gap-2 md:gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isSearching && handleSearch()}
                  placeholder="What do you seek?"
                  disabled={isSearching}
                  className="flex-1 bg-transparent px-4 md:px-6 py-4 md:py-5 font-mono text-base md:text-lg text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                  className="px-5 md:px-8 py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-display font-bold text-sm md:text-base tracking-wider rounded-xl hover:from-cyan-400 hover:to-amber-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        {isSearching && (
          <div className="w-full max-w-2xl mb-8 animate-fadeIn">
            <div className="relative bg-[#12121a]/80 rounded-2xl p-6 md:p-8 border border-cyan-500/20 overflow-hidden">
              {/* Progress bar background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="relative z-10 text-center">
                <div className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400 animate-pulse">
                    {timeLeft.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="font-mono text-xs md:text-sm text-cyan-400/70 tracking-[0.2em] uppercase">
                  Seconds remaining
                </div>

                {/* Animated dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400"
                      style={{
                        animation: 'bounce 1s ease-in-out infinite',
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Status messages */}
                <div className="font-mono text-xs text-white/40 mt-6 h-5">
                  {timeLeft > 12 && "Initializing deep search protocols..."}
                  {timeLeft <= 12 && timeLeft > 9 && "Scanning knowledge databases..."}
                  {timeLeft <= 9 && timeLeft > 6 && "Cross-referencing sources..."}
                  {timeLeft <= 6 && timeLeft > 3 && "Analyzing relevance scores..."}
                  {timeLeft <= 3 && "Compiling premium results..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && results.length > 0 && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="font-mono text-xs text-cyan-400/60 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Found {results.length} high-quality results for "{query}"
            </div>

            {results.map((result, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: 'slideUp 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-[#12121a]/90 rounded-xl p-4 md:p-6 border border-white/5 hover:border-cyan-500/30 transition-colors">
                  <div className="font-mono text-[10px] md:text-xs text-cyan-400/50 mb-2 truncate">
                    {result.source}
                  </div>
                  <h3 className="font-display text-base md:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                    {result.title}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">
                    {result.snippet}
                  </p>
                </div>
              </div>
            ))}

            {/* Search again prompt */}
            <div className="text-center pt-6 md:pt-8">
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setHasSearched(false);
                  setShowResults(false);
                }}
                className="font-mono text-xs text-white/30 hover:text-cyan-400 transition-colors underline underline-offset-4"
              >
                Start a new search
              </button>
            </div>
          </div>
        )}

        {/* Initial state hint */}
        {!hasSearched && (
          <div className="text-center mt-8 animate-fadeIn">
            <div className="font-mono text-xs text-white/20 max-w-md mx-auto leading-relaxed px-4">
              Unlike instant search engines, SlowSearch takes 15 seconds to deliver
              <span className="text-cyan-400/40"> thoughtfully curated </span>
              results. Good things come to those who wait.
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 md:py-6 text-center">
        <p className="font-mono text-[10px] md:text-xs text-white/20">
          Requested by <span className="text-cyan-400/40">@stringer_kade</span> · Built by <span className="text-amber-400/40">@clonkbot</span>
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
