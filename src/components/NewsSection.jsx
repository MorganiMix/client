import React, { useState, useEffect } from "react";
import { HiExternalLink, HiRefresh } from "react-icons/hi";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock news data for demo purposes
  const mockNews = [
    {
      id: '1',
      title: 'React 18 Features You Should Know',
      summary: 'Explore the latest features in React 18 including concurrent rendering and automatic batching.',
      source: 'React Blog',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      url: 'https://react.dev/blog',
      imageUrl: '',
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      summary: 'Trends and technologies shaping the future of web development in 2024.',
      source: 'Tech News',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      url: 'https://example.com/news/2',
      imageUrl: '',
    },
    {
      id: '3',
      title: 'JavaScript Performance Tips',
      summary: 'Essential tips to optimize your JavaScript code for better performance.',
      source: 'Dev Community',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      url: 'https://example.com/news/3',
      imageUrl: '',
    },
    {
      id: '4',
      title: 'CSS Grid vs Flexbox in 2024',
      summary: 'When to use CSS Grid and when to use Flexbox for modern layouts.',
      source: 'CSS Tricks',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      url: 'https://example.com/news/4',
      imageUrl: '',
    },
  ];

  useEffect(() => {
    // Simulate loading news data
    setLoading(true);
    setTimeout(() => {
      setNewsData(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // Simulate refresh
    setTimeout(() => {
      setNewsData(mockNews);
      setLoading(false);
    }, 1000);
  };

  const handleArticleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 dark:text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Failed to load news
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Unable to fetch the latest news articles.
        </p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <HiRefresh className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          title="Refresh news"
        >
          <HiRefresh className="w-5 h-5" />
        </button>
      </div>

      {/* News Articles */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {newsData.map((article) => (
          <article
            key={article.id}
            className="group cursor-pointer p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            onClick={() => handleArticleClick(article.url)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{article.source}</span>
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                </div>
              </div>
              <HiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-1" />
            </div>
          </article>
        ))}
      </div>

      {newsData.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No news available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for the latest updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;