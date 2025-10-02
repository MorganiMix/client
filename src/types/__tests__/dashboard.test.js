import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createApplication,
  updateApplication,
  createNewsArticle,
  DASHBOARD_ACTIONS,
  initialDashboardState,
} from '../dashboard.js';

// Mock crypto.randomUUID for consistent testing
const mockUUID = 'test-uuid-123';
const mockRandomUUID = vi.fn(() => mockUUID);

// Set up crypto mock
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: mockRandomUUID,
  },
  writable: true,
});

describe('Dashboard Models', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRandomUUID.mockReturnValue(mockUUID);
  });

  describe('createApplication', () => {
    it('should create a new application with required fields', () => {
      const data = {
        name: 'Test App',
        url: 'https://example.com',
      };

      const result = createApplication(data);

      expect(result).toEqual({
        id: mockUUID,
        name: 'Test App',
        url: 'https://example.com',
        icon: '',
        description: '',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(result.createdAt).toEqual(result.updatedAt);
    });

    it('should create a new application with all fields', () => {
      const data = {
        name: 'Test App',
        url: 'https://example.com',
        icon: 'https://example.com/icon.png',
        description: 'A test application',
      };

      const result = createApplication(data);

      expect(result).toEqual({
        id: mockUUID,
        name: 'Test App',
        url: 'https://example.com',
        icon: 'https://example.com/icon.png',
        description: 'A test application',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should generate unique IDs for different applications', () => {
      const mockUUIDs = ['uuid-1', 'uuid-2'];
      let callCount = 0;
      mockRandomUUID.mockImplementation(() => mockUUIDs[callCount++]);

      const data1 = { name: 'App 1', url: 'https://example1.com' };
      const data2 = { name: 'App 2', url: 'https://example2.com' };

      const result1 = createApplication(data1);
      const result2 = createApplication(data2);

      expect(result1.id).toBe('uuid-1');
      expect(result2.id).toBe('uuid-2');
    });
  });

  describe('updateApplication', () => {
    it('should update application fields and timestamp', () => {
      const originalDate = new Date('2023-01-01');
      const originalApp = {
        id: 'test-id',
        name: 'Original App',
        url: 'https://original.com',
        icon: '',
        description: '',
        createdAt: originalDate,
        updatedAt: originalDate,
      };

      const updates = {
        name: 'Updated App',
        description: 'Updated description',
      };

      const result = updateApplication(originalApp, updates);

      expect(result).toEqual({
        id: 'test-id',
        name: 'Updated App',
        url: 'https://original.com',
        icon: '',
        description: 'Updated description',
        createdAt: originalDate,
        updatedAt: expect.any(Date),
      });
      expect(result.updatedAt.getTime()).toBeGreaterThan(originalDate.getTime());
    });

    it('should not modify the original application object', () => {
      const originalApp = {
        id: 'test-id',
        name: 'Original App',
        url: 'https://original.com',
        icon: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updates = { name: 'Updated App' };
      const result = updateApplication(originalApp, updates);

      expect(originalApp.name).toBe('Original App');
      expect(result.name).toBe('Updated App');
      expect(result).not.toBe(originalApp);
    });
  });

  describe('createNewsArticle', () => {
    it('should create a new news article with required fields', () => {
      const publishedDate = new Date('2023-01-01');
      const data = {
        title: 'Test Article',
        summary: 'This is a test article',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: publishedDate,
      };

      const result = createNewsArticle(data);

      expect(result).toEqual({
        id: mockUUID,
        title: 'Test Article',
        summary: 'This is a test article',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: publishedDate,
        imageUrl: '',
      });
    });

    it('should create a new news article with all fields', () => {
      const publishedDate = new Date('2023-01-01');
      const data = {
        title: 'Test Article',
        summary: 'This is a test article',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: publishedDate,
        imageUrl: 'https://example.com/image.jpg',
      };

      const result = createNewsArticle(data);

      expect(result).toEqual({
        id: mockUUID,
        title: 'Test Article',
        summary: 'This is a test article',
        source: 'Test Source',
        url: 'https://example.com/article',
        publishedAt: publishedDate,
        imageUrl: 'https://example.com/image.jpg',
      });
    });
  });

  describe('DASHBOARD_ACTIONS', () => {
    it('should have all required action types', () => {
      expect(DASHBOARD_ACTIONS).toEqual({
        ADD_APPLICATION: 'ADD_APPLICATION',
        UPDATE_APPLICATION: 'UPDATE_APPLICATION',
        DELETE_APPLICATION: 'DELETE_APPLICATION',
        SET_APPLICATIONS: 'SET_APPLICATIONS',
        SET_NEWS_LOADING: 'SET_NEWS_LOADING',
        SET_NEWS_DATA: 'SET_NEWS_DATA',
        SET_NEWS_ERROR: 'SET_NEWS_ERROR',
        UPDATE_NEWS_TIMESTAMP: 'UPDATE_NEWS_TIMESTAMP',
      });
    });
  });

  describe('initialDashboardState', () => {
    it('should have correct initial state structure', () => {
      expect(initialDashboardState).toEqual({
        applications: [],
        newsData: [],
        newsLoading: false,
        newsError: null,
        lastNewsUpdate: null,
      });
    });
  });
});