import React from 'react';

const EMOJIS = {
  Tech: '🤖', Science: '🔭', Business: '📈',
  World: '🌍', Sports: '🏅', Health: '💊',
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NewsCard({ article, category }) {
  const emoji = EMOJIS[category] || '📰';
  const time = article.publishedAt ? timeAgo(article.publishedAt) : 'Just now';

  return (
    <div className="article-card">
      {article.urlToImage ? (
        <img
          className="card-thumb"
          src={article.urlToImage}
          alt={article.title}
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : (
        <div className="card-thumb">{emoji}</div>
      )}

      <div className="card-body">
        <div className="card-meta">
          <span className={`badge badge-${category.toLowerCase()}`}>{category}</span>
          <span className="time">⏱ {time}</span>
        </div>
        <div className="card-title">{article.title}</div>
        <div className="card-desc">{article.description || 'No description available.'}</div>
      </div>

      <div className="card-footer">
        <span className="source">📰 {article.source?.name || 'Unknown'}</span>
        <a
          className="read-link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
