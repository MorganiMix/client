/**
 * News parsing utilities for different data sources
 */

/**
 * Parse RSS feed item to NewsArticle format
 * @param {Object} rssItem - RSS feed item
 * @returns {Object} Parsed news article data
 */
export const parseRSSItem = (rssItem) => {
  return {
    title: rssItem.title || '',
    summary: rssItem.description || rssItem.summary || '',
    source: rssItem.source || 'RSS Feed',
    url: rssItem.link || rssItem.url || '',
    publishedAt: rssItem.pubDate ? new Date(rssItem.pubDate) : new Date(),
    imageUrl: rssItem.enclosure?.url || rssItem.image || '',
  };
};

/**
 * Parse JSON news API response to NewsArticle format
 * @param {Object} apiItem - News API item
 * @returns {Object} Parsed news article data
 */
export const parseNewsAPIItem = (apiItem) => {
  return {
    title: apiItem.title || '',
    summary: apiItem.description || apiItem.content || '',
    source: apiItem.source?.name || apiItem.source || 'News API',
    url: apiItem.url || apiItem.link || '',
    publishedAt: apiItem.publishedAt ? new Date(apiItem.publishedAt) : new Date(),
    imageUrl: apiItem.urlToImage || apiItem.image || '',
  };
};

/**
 * Parse generic news data to NewsArticle format
 * @param {Object} item - Generic news item
 * @param {string} [defaultSource] - Default source name if not provided
 * @returns {Object} Parsed news article data
 */
export const parseGenericNewsItem = (item, defaultSource = 'News') => {
  // Try to extract date from various possible fields
  let publishedAt = new Date();
  if (item.publishedAt || item.pubDate || item.date || item.published) {
    const dateStr = item.publishedAt || item.pubDate || item.date || item.published;
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      publishedAt = parsedDate;
    }
  }

  return {
    title: item.title || item.headline || '',
    summary: item.summary || item.description || item.excerpt || item.content || '',
    source: item.source?.name || item.source || item.publisher || defaultSource,
    url: item.url || item.link || item.href || '',
    publishedAt,
    imageUrl: item.imageUrl || item.urlToImage || item.image || item.thumbnail || '',
  };
};

/**
 * Batch parse multiple news items
 * @param {Array} items - Array of news items
 * @param {string} format - Format type ('rss', 'newsapi', 'generic')
 * @param {string} [defaultSource] - Default source name for generic format
 * @returns {Array} Array of parsed news article data
 */
export const parseNewsItems = (items, format = 'generic', defaultSource = 'News') => {
  if (!Array.isArray(items)) {
    return [];
  }

  const parser = {
    rss: parseRSSItem,
    newsapi: parseNewsAPIItem,
    generic: (item) => parseGenericNewsItem(item, defaultSource),
  }[format] || parseGenericNewsItem;

  return items.map(parser).filter(item => item.title && item.url);
};