import { describe, it, expect } from 'vitest';
import {
  parseRSSItem,
  parseNewsAPIItem,
  parseGenericNewsItem,
  parseNewsItems,
} from '../newsParser.js';

describe('News Parser Utilities', () => {
  describe('parseRSSItem', () => {
    it('should parse a complete RSS item', () => {
      const rssItem = {
        title: 'RSS Article Title',
        description: 'RSS article description',
        link: 'https://example.com/rss-article',
        pubDate: '2023-01-01T12:00:00Z',
        source: 'RSS Source',
        enclosure: { url: 'https://example.com/image.jpg' },
      };

      const result = parseRSSItem(rssItem);

      expect(result).toEqual({
        title: 'RSS Article Title',
        summary: 'RSS article description',
        source: 'RSS Source',
        url: 'https://example.com/rss-article',
        publishedAt: new Date('2023-01-01T12:00:00Z'),
        imageUrl: 'https://example.com/image.jpg',
      });
    });

    it('should handle RSS item with summary instead of description', () => {
      const rssItem = {
        title: 'RSS Article Title',
        summary: 'RSS article summary',
        link: 'https://example.com/rss-article',
        pubDate: '2023-01-01T12:00:00Z',
      };

      const result = parseRSSItem(rssItem);

      expect(result.summary).toBe('RSS article summary');
    });

    it('should handle RSS item with missing fields', () => {
      const rssItem = {
        title: 'RSS Article Title',
      };

      const result = parseRSSItem(rssItem);

      expect(result).toEqual({
        title: 'RSS Article Title',
        summary: '',
        source: 'RSS Feed',
        url: '',
        publishedAt: expect.any(Date),
        imageUrl: '',
      });
    });

    it('should handle RSS item with image field instead of enclosure', () => {
      const rssItem = {
        title: 'RSS Article Title',
        description: 'RSS article description',
        link: 'https://example.com/rss-article',
        image: 'https://example.com/image.jpg',
      };

      const result = parseRSSItem(rssItem);

      expect(result.imageUrl).toBe('https://example.com/image.jpg');
    });
  });

  describe('parseNewsAPIItem', () => {
    it('should parse a complete News API item', () => {
      const apiItem = {
        title: 'News API Article Title',
        description: 'News API article description',
        url: 'https://example.com/news-article',
        publishedAt: '2023-01-01T12:00:00Z',
        source: { name: 'News API Source' },
        urlToImage: 'https://example.com/image.jpg',
      };

      const result = parseNewsAPIItem(apiItem);

      expect(result).toEqual({
        title: 'News API Article Title',
        summary: 'News API article description',
        source: 'News API Source',
        url: 'https://example.com/news-article',
        publishedAt: new Date('2023-01-01T12:00:00Z'),
        imageUrl: 'https://example.com/image.jpg',
      });
    });

    it('should handle News API item with content instead of description', () => {
      const apiItem = {
        title: 'News API Article Title',
        content: 'News API article content',
        url: 'https://example.com/news-article',
      };

      const result = parseNewsAPIItem(apiItem);

      expect(result.summary).toBe('News API article content');
    });

    it('should handle News API item with string source', () => {
      const apiItem = {
        title: 'News API Article Title',
        description: 'News API article description',
        url: 'https://example.com/news-article',
        source: 'String Source',
      };

      const result = parseNewsAPIItem(apiItem);

      expect(result.source).toBe('String Source');
    });

    it('should handle News API item with missing fields', () => {
      const apiItem = {
        title: 'News API Article Title',
      };

      const result = parseNewsAPIItem(apiItem);

      expect(result).toEqual({
        title: 'News API Article Title',
        summary: '',
        source: 'News API',
        url: '',
        publishedAt: expect.any(Date),
        imageUrl: '',
      });
    });
  });

  describe('parseGenericNewsItem', () => {
    it('should parse a generic news item with all fields', () => {
      const item = {
        title: 'Generic Article Title',
        summary: 'Generic article summary',
        source: 'Generic Source',
        url: 'https://example.com/generic-article',
        publishedAt: '2023-01-01T12:00:00Z',
        imageUrl: 'https://example.com/image.jpg',
      };

      const result = parseGenericNewsItem(item);

      expect(result).toEqual({
        title: 'Generic Article Title',
        summary: 'Generic article summary',
        source: 'Generic Source',
        url: 'https://example.com/generic-article',
        publishedAt: new Date('2023-01-01T12:00:00Z'),
        imageUrl: 'https://example.com/image.jpg',
      });
    });

    it('should handle alternative field names', () => {
      const item = {
        headline: 'Alternative Headline',
        excerpt: 'Alternative excerpt',
        publisher: 'Alternative Publisher',
        link: 'https://example.com/alternative-article',
        date: '2023-01-01T12:00:00Z',
        thumbnail: 'https://example.com/thumbnail.jpg',
      };

      const result = parseGenericNewsItem(item);

      expect(result).toEqual({
        title: 'Alternative Headline',
        summary: 'Alternative excerpt',
        source: 'Alternative Publisher',
        url: 'https://example.com/alternative-article',
        publishedAt: new Date('2023-01-01T12:00:00Z'),
        imageUrl: 'https://example.com/thumbnail.jpg',
      });
    });

    it('should use default source when not provided', () => {
      const item = {
        title: 'Generic Article Title',
        summary: 'Generic article summary',
        url: 'https://example.com/generic-article',
      };

      const result = parseGenericNewsItem(item, 'Custom Default');

      expect(result.source).toBe('Custom Default');
    });

    it('should handle invalid dates gracefully', () => {
      const item = {
        title: 'Generic Article Title',
        summary: 'Generic article summary',
        url: 'https://example.com/generic-article',
        publishedAt: 'invalid-date',
      };

      const result = parseGenericNewsItem(item);

      expect(result.publishedAt).toBeInstanceOf(Date);
      expect(result.publishedAt.getTime()).toBeCloseTo(Date.now(), -2); // Within 100ms
    });

    it('should handle nested source objects', () => {
      const item = {
        title: 'Generic Article Title',
        summary: 'Generic article summary',
        url: 'https://example.com/generic-article',
        source: { name: 'Nested Source Name' },
      };

      const result = parseGenericNewsItem(item);

      expect(result.source).toBe('Nested Source Name');
    });
  });

  describe('parseNewsItems', () => {
    it('should parse multiple RSS items', () => {
      const items = [
        {
          title: 'RSS Article 1',
          description: 'RSS description 1',
          link: 'https://example.com/rss-1',
        },
        {
          title: 'RSS Article 2',
          description: 'RSS description 2',
          link: 'https://example.com/rss-2',
        },
      ];

      const result = parseNewsItems(items, 'rss');

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('RSS Article 1');
      expect(result[1].title).toBe('RSS Article 2');
    });

    it('should parse multiple News API items', () => {
      const items = [
        {
          title: 'News API Article 1',
          description: 'News API description 1',
          url: 'https://example.com/news-1',
        },
        {
          title: 'News API Article 2',
          description: 'News API description 2',
          url: 'https://example.com/news-2',
        },
      ];

      const result = parseNewsItems(items, 'newsapi');

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('News API Article 1');
      expect(result[1].title).toBe('News API Article 2');
    });

    it('should filter out items without title or URL', () => {
      const items = [
        {
          title: 'Valid Article',
          summary: 'Valid summary',
          url: 'https://example.com/valid',
        },
        {
          summary: 'No title',
          url: 'https://example.com/no-title',
        },
        {
          title: 'No URL',
          summary: 'No URL summary',
        },
        {
          title: '',
          summary: 'Empty title',
          url: 'https://example.com/empty-title',
        },
      ];

      const result = parseNewsItems(items, 'generic');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Valid Article');
    });

    it('should handle non-array input', () => {
      const result = parseNewsItems(null);
      expect(result).toEqual([]);

      const result2 = parseNewsItems(undefined);
      expect(result2).toEqual([]);

      const result3 = parseNewsItems('not-an-array');
      expect(result3).toEqual([]);
    });

    it('should use generic parser for unknown format', () => {
      const items = [
        {
          title: 'Unknown Format Article',
          summary: 'Unknown format summary',
          url: 'https://example.com/unknown',
        },
      ];

      const result = parseNewsItems(items, 'unknown-format');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Unknown Format Article');
    });

    it('should pass default source to generic parser', () => {
      const items = [
        {
          title: 'Generic Article',
          summary: 'Generic summary',
          url: 'https://example.com/generic',
        },
      ];

      const result = parseNewsItems(items, 'generic', 'Custom Source');

      expect(result[0].source).toBe('Custom Source');
    });
  });
});