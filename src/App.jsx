import React, { useState, useEffect, useCallback } from 'react';
import './styles/main.scss';
import NewsCard from './components/NewsCard';

// ─────────────────────────────────────────────────────────────
// CONFIGURATION — Replace with your free key from newsapi.org
// ─────────────────────────────────────────────────────────────
const API_KEY = '';

const CATEGORIES = ['All', 'Tech', 'Science', 'Business', 'World', 'Sports', 'Health'];

// Maps our category names to NewsAPI 'category' param values
const CAT_MAP = {
  Tech: 'technology',
  Science: 'science',
  Business: 'business',
  World: 'world',
  Sports: 'sports',
  Health: 'health',
};

// Fallback mock data shown when no API key is set
const MOCK_ARTICLES = [
  { title: 'OpenAI releases new reasoning model surpassing GPT-4 benchmarks', description: 'The latest model demonstrates significant improvements in coding, math, and logical reasoning tasks.', source: { name: 'TechCrunch' }, url: '#', publishedAt: new Date(Date.now() - 7200000).toISOString(), cat: 'Tech' },
  { title: 'Webb Telescope captures sharpest image of a black hole accretion disk', description: 'Scientists call the new imagery a breakthrough in understanding the physics of extreme gravity.', source: { name: 'Nature' }, url: '#', publishedAt: new Date(Date.now() - 14400000).toISOString(), cat: 'Science' },
  { title: 'Indian startup ecosystem raises record $12B in first half of 2026', description: 'Fintech and deep tech sectors led the surge, with Bengaluru and Delhi NCR dominating deal flow.', source: { name: 'Economic Times' }, url: '#', publishedAt: new Date(Date.now() - 18000000).toISOString(), cat: 'Business' },
  { title: 'G20 nations agree on landmark digital tax framework', description: 'The agreement covers multinational tech companies and sets a 15% minimum corporate tax floor globally.', source: { name: 'Reuters' }, url: '#', publishedAt: new Date(Date.now() - 21600000).toISOString(), cat: 'World' },
  { title: 'India clinch Test series against England in dramatic final over finish', description: 'A last-ball six sealed an unlikely victory, completing a historic 3-1 series win.', source: { name: 'ESPN Cricinfo' }, url: '#', publishedAt: new Date(Date.now() - 28800000).toISOString(), cat: 'Sports' },
  { title: 'New mRNA vaccine candidate shows 94% efficacy against drug-resistant TB', description: 'Phase 3 trial results published in the Lancet mark a potential turning point in global tuberculosis control.', source: { name: 'Lancet' }, url: '#', publishedAt: new Date(Date.now() - 36000000).toISOString(), cat: 'Health' },
  { title: 'React 20 ships with built-in state management and server components', description: 'The major release removes the need for Redux in most applications and brings automatic code splitting.', source: { name: 'Vercel Blog' }, url: '#', publishedAt: new Date(Date.now() - 86400000).toISOString(), cat: 'Tech' },
  { title: 'Fusion reactor in South Korea sustains plasma for 1,000 seconds', description: 'KSTAR breaks its own world record, bringing commercially viable fusion power closer to reality.', source: { name: 'Science Magazine' }, url: '#', publishedAt: new Date(Date.now() - 90000000).toISOString(), cat: 'Science' },
  { title: 'RBI cuts repo rate for third consecutive time amid growth push', description: 'The 25 basis point cut brings the benchmark rate to 5.75%, the lowest since 2021.', source: { name: 'Mint' }, url: '#', publishedAt: new Date(Date.now() - 93600000).toISOString(), cat: 'Business' },
];

export default function App() {
  const [articles, setArticles]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [activecat, setActivecat] = useState('All');
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(false);
  const [dark, setDark]           = useState(false);
  const [usingMock, setUsingMock] = useState(false);

  // Apply dark class to body
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  // Fetch news
 const fetchNews = useCallback(async (cat) => {
  setLoading(true);
  try {
    const topic = cat === 'All' ? 'breaking-news' : CAT_MAP[cat];
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=${topic}&lang=en&max=12&apikey=${API_KEY}`
    );
    const data = await res.json();
    const tagged = (data.articles || []).map(a => ({ ...a, cat: cat === 'All' ? 'World' : cat }));
    setArticles(tagged);
  } catch (err) {
    setUsingMock(true);
    setArticles(MOCK_ARTICLES);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => { fetchNews(activecat); }, [activecat, fetchNews]);

  // Filter by search
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      articles.filter(a =>
        !q || a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q)
      )
    );
  }, [articles, search]);

  const sources = new Set(filtered.map(a => a.source?.name)).size;
  const cats    = new Set(filtered.map(a => a.cat)).size;

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="header">
        <div>
          <div className="logo">News<span>Nest</span></div>
          <div className="tagline">Stay informed. Stay ahead.</div>
        </div>
        <button className="theme-btn" onClick={() => setDark(d => !d)}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* API Key Banner */}
      {usingMock && (
        <div className="api-banner">
          <strong>📌 Demo Mode — showing sample data.</strong> To load live news:
          <ol style={{ marginTop: 6, paddingLeft: 18 }}>
            <li>Get a free API key from <a href="https://newsapi.org" target="_blank" rel="noreferrer">newsapi.org</a></li>
            <li>Open <code>src/App.jsx</code> and replace <code>YOUR_NEWSAPI_KEY_HERE</code> with your key</li>
          </ol>
        </div>
      )}

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="num">{filtered.length}</div>
          <div className="lbl">Articles</div>
        </div>
        <div className="stat-card">
          <div className="num">{cats}</div>
          <div className="lbl">Categories</div>
        </div>
        <div className="stat-card">
          <div className="num">{sources}</div>
          <div className="lbl">Sources</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search headlines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="cat-row">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`cat-pill ${activecat === c ? 'active' : ''}`}
            onClick={() => { setActivecat(c); setSearch(''); }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Fetching latest news…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🔍</span>
          No articles found for "{search}"
        </div>
      ) : (
        <div className="news-grid">
          {filtered.map((article, i) => (
            <NewsCard key={i} article={article} category={article.cat || activecat || 'World'} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>Built with React.js + SASS + NewsAPI &nbsp;·&nbsp; NewsNest © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
