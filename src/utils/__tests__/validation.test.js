import { describe, it, expect } from 'vitest';
import {
  isValidUrl,
  isNonEmptyString,
  validateApplication,
  sanitizeApplication,
  validateNewsArticle,
  sanitizeNewsArticle,
} from '../validation.js';

describe('URL Validation', () => {
  describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('http://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
    });

    it('should return true for valid HTTPS URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl(null)).toBe(false);
      expect(isValidUrl(undefined)).toBe(false);
      expect(isValidUrl(123)).toBe(false);
    });
  });
});

describe('Utility Functions', () => {
  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString('  hello  ')).toBe(true);
    });

    it('should return false for empty or whitespace strings', () => {
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString('   ')).toBe(false);
      expect(isNonEmptyString('\t\n')).toBe(false);
    });

    it('should return false for non-strings', () => {
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString(123)).toBe(false);
      expect(isNonEmptyString({})).toBe(false);
    });
  });
});

describe('Application Validation', () => {
  describe('validateApplication', () => {
    it('should validate a complete valid application', () => {
      const application = {
        name: 'Test App',
        url: 'https://example.com',
        description: 'A test application',
        icon: 'https://example.com/icon.png',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate a minimal valid application', () => {
      const application = {
        name: 'Test App',
        url: 'https://example.com',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject application without name', () => {
      const application = {
        url: 'https://example.com',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application name is required');
    });

    it('should reject application with empty name', () => {
      const application = {
        name: '   ',
        url: 'https://example.com',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application name is required');
    });

    it('should reject application without URL', () => {
      const application = {
        name: 'Test App',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application URL is required');
    });

    it('should reject application with invalid URL', () => {
      const application = {
        name: 'Test App',
        url: 'not-a-url',
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application URL must be a valid HTTP or HTTPS URL');
    });

    it('should reject application with non-string description', () => {
      const application = {
        name: 'Test App',
        url: 'https://example.com',
        description: 123,
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application description must be a string');
    });

    it('should reject application with non-string icon', () => {
      const application = {
        name: 'Test App',
        url: 'https://example.com',
        icon: 123,
      };

      const result = validateApplication(application);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Application icon must be a string');
    });

    it('should reject non-object application', () => {
      const result1 = validateApplication(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Application must be an object');

      const result2 = validateApplication('not an object');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Application must be an object');
    });
  });

  describe('sanitizeApplication', () => {
    it('should trim whitespace from all fields', () => {
      const application = {
        name: '  Test App  ',
        url: '  https://example.com  ',
        description: '  A test application  ',
        icon: '  https://example.com/icon.png  ',
      };

      const result = sanitizeApplication(application);
      expect(result.name).toBe('Test App');
      expect(result.url).toBe('https://example.com');
      expect(result.description).toBe('A test application');
      expect(result.icon).toBe('https://example.com/icon.png');
    });

    it('should handle missing fields', () => {
      const application = {
        name: 'Test App',
        url: 'https://example.com',
      };

      const result = sanitizeApplication(application);
      expect(result.name).toBe('Test App');
      expect(result.url).toBe('https://example.com');
      expect(result.description).toBe('');
      expect(result.icon).toBe('');
    });
  });
});

describe('News Article Validation', () => {
  describe('validateNewsArticle', () => {
    it('should validate a complete valid news article', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: new Date(),
        imageUrl: 'https://example.com/image.jpg',
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate a minimal valid news article', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: new Date(),
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject article without title', () => {
      const article = {
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: new Date(),
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article title is required');
    });

    it('should reject article without summary', () => {
      const article = {
        title: 'Test Article',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: new Date(),
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article summary is required');
    });

    it('should reject article without source', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        url: 'https://example.com/article',
        publishedAt: new Date(),
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article source is required');
    });

    it('should reject article with invalid URL', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'not-a-url',
        publishedAt: new Date(),
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article URL must be a valid HTTP or HTTPS URL');
    });

    it('should reject article with invalid published date', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: 'not-a-date',
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article published date is required and must be a valid Date');
    });

    it('should reject article with invalid image URL', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: new Date(),
        imageUrl: 'not-a-url',
      };

      const result = validateNewsArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Article image URL must be a valid HTTP or HTTPS URL');
    });

    it('should reject non-object article', () => {
      const result1 = validateNewsArticle(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Article must be an object');

      const result2 = validateNewsArticle('not an object');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Article must be an object');
    });
  });

  describe('sanitizeNewsArticle', () => {
    it('should trim whitespace from string fields', () => {
      const article = {
        title: '  Test Article  ',
        summary: '  This is a test article summary  ',
        source: '  Test Source  ',
        url: '  https://example.com/article  ',
        publishedAt: new Date(),
        imageUrl: '  https://example.com/image.jpg  ',
      };

      const result = sanitizeNewsArticle(article);
      expect(result.title).toBe('Test Article');
      expect(result.summary).toBe('This is a test article summary');
      expect(result.source).toBe('Test Source');
      expect(result.url).toBe('https://example.com/article');
      expect(result.imageUrl).toBe('https://example.com/image.jpg');
    });

    it('should handle missing fields', () => {
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
      };

      const result = sanitizeNewsArticle(article);
      expect(result.title).toBe('Test Article');
      expect(result.summary).toBe('This is a test article summary');
      expect(result.source).toBe('Test Source');
      expect(result.url).toBe('https://example.com/article');
      expect(result.imageUrl).toBe('');
      expect(result.publishedAt).toBeInstanceOf(Date);
    });

    it('should preserve valid Date objects', () => {
      const testDate = new Date('2023-01-01');
      const article = {
        title: 'Test Article',
        summary: 'This is a test article summary',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: testDate,
      };

      const result = sanitizeNewsArticle(article);
      expect(result.publishedAt).toBe(testDate);
    });
  });
});