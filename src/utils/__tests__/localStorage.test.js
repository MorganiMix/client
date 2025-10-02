import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  STORAGE_KEYS,
  getFromStorage,
  setToStorage,
  removeFromStorage,
  getApplicationsFromStorage,
  saveApplicationsToStorage,
  getCachedNewsFromStorage,
  saveNewsCacheToStorage,
  getLastNewsUpdateFromStorage,
  saveLastNewsUpdateToStorage,
  isStorageAvailable,
} from '../localStorage';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('localStorage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console.warn mock
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getFromStorage', () => {
    it('should return parsed data when item exists', () => {
      const testData = { test: 'value' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

      const result = getFromStorage('test-key');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toEqual(testData);
    });

    it('should return default value when item does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getFromStorage('test-key', 'default');

      expect(result).toBe('default');
    });

    it('should return default value when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      const result = getFromStorage('test-key', 'default');

      expect(result).toBe('default');
      expect(console.warn).toHaveBeenCalledWith(
        'Error reading from localStorage key "test-key":',
        expect.any(Error)
      );
    });

    it('should return null as default when no default provided', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getFromStorage('test-key');

      expect(result).toBeNull();
    });
  });

  describe('setToStorage', () => {
    it('should stringify and store data successfully', () => {
      const testData = { test: 'value' };

      const result = setToStorage('test-key', testData);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData)
      );
      expect(result).toBe(true);
    });

    it('should handle storage errors gracefully', () => {
      const testData = { test: 'value' };
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });

      const result = setToStorage('test-key', testData);

      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalledWith(
        'Error writing to localStorage key "test-key":',
        expect.any(Error)
      );
    });
  });

  describe('removeFromStorage', () => {
    it('should remove item successfully', () => {
      const result = removeFromStorage('test-key');

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
      expect(result).toBe(true);
    });

    it('should handle removal errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Removal failed');
      });

      const result = removeFromStorage('test-key');

      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalledWith(
        'Error removing localStorage key "test-key":',
        expect.any(Error)
      );
    });
  });

  describe('getApplicationsFromStorage', () => {
    it('should return applications with converted dates', () => {
      const mockApplications = [
        {
          id: '1',
          name: 'Test App',
          url: 'https://test.com',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-02T00:00:00.000Z',
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockApplications));

      const result = getApplicationsFromStorage();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.APPLICATIONS);
      expect(result).toHaveLength(1);
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(result[0].updatedAt).toBeInstanceOf(Date);
      expect(result[0].createdAt.toISOString()).toBe('2023-01-01T00:00:00.000Z');
      expect(result[0].updatedAt.toISOString()).toBe('2023-01-02T00:00:00.000Z');
    });

    it('should return empty array when no applications stored', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getApplicationsFromStorage();

      expect(result).toEqual([]);
    });
  });

  describe('saveApplicationsToStorage', () => {
    it('should save applications to storage', () => {
      const applications = [
        {
          id: '1',
          name: 'Test App',
          url: 'https://test.com',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
        },
      ];

      const result = saveApplicationsToStorage(applications);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.APPLICATIONS,
        JSON.stringify(applications)
      );
      expect(result).toBe(true);
    });
  });

  describe('getCachedNewsFromStorage', () => {
    it('should return news articles with converted dates', () => {
      const mockNews = [
        {
          id: '1',
          title: 'Test News',
          summary: 'Test summary',
          source: 'Test Source',
          url: 'https://news.com',
          publishedAt: '2023-01-01T12:00:00.000Z',
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockNews));

      const result = getCachedNewsFromStorage();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.NEWS_CACHE);
      expect(result).toHaveLength(1);
      expect(result[0].publishedAt).toBeInstanceOf(Date);
      expect(result[0].publishedAt.toISOString()).toBe('2023-01-01T12:00:00.000Z');
    });

    it('should return empty array when no news cached', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getCachedNewsFromStorage();

      expect(result).toEqual([]);
    });
  });

  describe('saveNewsCacheToStorage', () => {
    it('should save news data to cache', () => {
      const newsData = [
        {
          id: '1',
          title: 'Test News',
          summary: 'Test summary',
          source: 'Test Source',
          url: 'https://news.com',
          publishedAt: new Date('2023-01-01T12:00:00Z'),
        },
      ];

      const result = saveNewsCacheToStorage(newsData);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.NEWS_CACHE,
        JSON.stringify(newsData)
      );
      expect(result).toBe(true);
    });
  });

  describe('getLastNewsUpdateFromStorage', () => {
    it('should return timestamp as Date object', () => {
      const timestamp = '2023-01-01T12:00:00.000Z';
      localStorageMock.getItem.mockReturnValue(JSON.stringify(timestamp));

      const result = getLastNewsUpdateFromStorage();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.LAST_NEWS_UPDATE);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe(timestamp);
    });

    it('should return null when no timestamp stored', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getLastNewsUpdateFromStorage();

      expect(result).toBeNull();
    });
  });

  describe('saveLastNewsUpdateToStorage', () => {
    it('should save timestamp to storage', () => {
      const timestamp = new Date('2023-01-01T12:00:00Z');

      const result = saveLastNewsUpdateToStorage(timestamp);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.LAST_NEWS_UPDATE,
        JSON.stringify(timestamp)
      );
      expect(result).toBe(true);
    });
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      const result = isStorageAvailable();

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('__storage_test__', '__storage_test__');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('__storage_test__');
    });

    it('should return false when localStorage throws error', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage not available');
      });

      const result = isStorageAvailable();

      expect(result).toBe(false);
    });

    it('should return false when removeItem throws error', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Removal failed');
      });

      const result = isStorageAvailable();

      expect(result).toBe(false);
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have correct storage keys', () => {
      expect(STORAGE_KEYS.APPLICATIONS).toBe('dashboard_applications');
      expect(STORAGE_KEYS.NEWS_CACHE).toBe('dashboard_news_cache');
      expect(STORAGE_KEYS.LAST_NEWS_UPDATE).toBe('dashboard_last_news_update');
    });
  });
});