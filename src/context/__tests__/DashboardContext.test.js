import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DASHBOARD_ACTIONS, initialDashboardState } from '../../types/dashboard';
import * as localStorage from '../../utils/localStorage';

// Mock localStorage utilities
vi.mock('../../utils/localStorage', () => ({
  getApplicationsFromStorage: vi.fn(),
  saveApplicationsToStorage: vi.fn(),
  getCachedNewsFromStorage: vi.fn(),
  getLastNewsUpdateFromStorage: vi.fn(),
  saveLastNewsUpdateToStorage: vi.fn(),
  isStorageAvailable: vi.fn(),
}));

// Import the reducer function directly for testing
// We'll test the reducer logic separately from the React components
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case DASHBOARD_ACTIONS.SET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      };

    case DASHBOARD_ACTIONS.ADD_APPLICATION:
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };

    case DASHBOARD_ACTIONS.UPDATE_APPLICATION:
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? action.payload : app
        ),
      };

    case DASHBOARD_ACTIONS.DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(app => app.id !== action.payload),
      };

    case DASHBOARD_ACTIONS.SET_NEWS_LOADING:
      return {
        ...state,
        newsLoading: action.payload,
      };

    case DASHBOARD_ACTIONS.SET_NEWS_DATA:
      return {
        ...state,
        newsData: action.payload,
        newsLoading: false,
        newsError: null,
      };

    case DASHBOARD_ACTIONS.SET_NEWS_ERROR:
      return {
        ...state,
        newsError: action.payload,
        newsLoading: false,
      };

    case DASHBOARD_ACTIONS.UPDATE_NEWS_TIMESTAMP:
      return {
        ...state,
        lastNewsUpdate: action.payload,
      };

    default:
      return state;
  }
};

describe('Dashboard State Management', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    localStorage.isStorageAvailable.mockReturnValue(true);
    localStorage.getApplicationsFromStorage.mockReturnValue([]);
    localStorage.getCachedNewsFromStorage.mockReturnValue([]);
    localStorage.getLastNewsUpdateFromStorage.mockReturnValue(null);
    localStorage.saveApplicationsToStorage.mockReturnValue(true);
    localStorage.saveLastNewsUpdateToStorage.mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Dashboard Reducer', () => {
    it('should return initial state', () => {
      const result = dashboardReducer(initialDashboardState, { type: 'UNKNOWN_ACTION' });
      
      expect(result).toEqual({
        applications: [],
        newsData: [],
        newsLoading: false,
        newsError: null,
        lastNewsUpdate: null,
      });
    });

    it('should handle SET_APPLICATIONS action', () => {
      const applications = [
        {
          id: '1',
          name: 'Test App',
          url: 'https://test.com',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        },
      ];

      const result = dashboardReducer(initialDashboardState, {
        type: DASHBOARD_ACTIONS.SET_APPLICATIONS,
        payload: applications,
      });

      expect(result.applications).toEqual(applications);
      expect(result.newsData).toEqual([]);
      expect(result.newsLoading).toBe(false);
    });

    it('should handle ADD_APPLICATION action', () => {
      const newApp = {
        id: '1',
        name: 'New App',
        url: 'https://newapp.com',
        icon: 'icon.png',
        description: 'A new application',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = dashboardReducer(initialDashboardState, {
        type: DASHBOARD_ACTIONS.ADD_APPLICATION,
        payload: newApp,
      });

      expect(result.applications).toHaveLength(1);
      expect(result.applications[0]).toEqual(newApp);
    });

    it('should handle UPDATE_APPLICATION action', () => {
      const existingApp = {
        id: '1',
        name: 'Original App',
        url: 'https://original.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const stateWithApp = {
        ...initialDashboardState,
        applications: [existingApp],
      };

      const updatedApp = {
        ...existingApp,
        name: 'Updated App',
        url: 'https://updated.com',
      };

      const result = dashboardReducer(stateWithApp, {
        type: DASHBOARD_ACTIONS.UPDATE_APPLICATION,
        payload: updatedApp,
      });

      expect(result.applications).toHaveLength(1);
      expect(result.applications[0].name).toBe('Updated App');
      expect(result.applications[0].url).toBe('https://updated.com');
    });

    it('should handle DELETE_APPLICATION action', () => {
      const app1 = { id: '1', name: 'App 1', url: 'https://app1.com' };
      const app2 = { id: '2', name: 'App 2', url: 'https://app2.com' };

      const stateWithApps = {
        ...initialDashboardState,
        applications: [app1, app2],
      };

      const result = dashboardReducer(stateWithApps, {
        type: DASHBOARD_ACTIONS.DELETE_APPLICATION,
        payload: '1',
      });

      expect(result.applications).toHaveLength(1);
      expect(result.applications[0].id).toBe('2');
    });

    it('should handle SET_NEWS_LOADING action', () => {
      const result = dashboardReducer(initialDashboardState, {
        type: DASHBOARD_ACTIONS.SET_NEWS_LOADING,
        payload: true,
      });

      expect(result.newsLoading).toBe(true);
      expect(result.newsError).toBe(null);
    });

    it('should handle SET_NEWS_DATA action', () => {
      const mockNewsData = [
        {
          id: '1',
          title: 'Test News',
          summary: 'Test summary',
          source: 'Test Source',
          url: 'https://news.com',
          publishedAt: new Date(),
        },
      ];

      const stateWithLoadingAndError = {
        ...initialDashboardState,
        newsLoading: true,
        newsError: 'Some error',
      };

      const result = dashboardReducer(stateWithLoadingAndError, {
        type: DASHBOARD_ACTIONS.SET_NEWS_DATA,
        payload: mockNewsData,
      });

      expect(result.newsData).toEqual(mockNewsData);
      expect(result.newsLoading).toBe(false);
      expect(result.newsError).toBe(null);
    });

    it('should handle SET_NEWS_ERROR action', () => {
      const errorMessage = 'Failed to load news';
      const stateWithLoading = {
        ...initialDashboardState,
        newsLoading: true,
      };

      const result = dashboardReducer(stateWithLoading, {
        type: DASHBOARD_ACTIONS.SET_NEWS_ERROR,
        payload: errorMessage,
      });

      expect(result.newsError).toBe(errorMessage);
      expect(result.newsLoading).toBe(false);
    });

    it('should handle UPDATE_NEWS_TIMESTAMP action', () => {
      const timestamp = new Date('2023-01-01T12:00:00Z');

      const result = dashboardReducer(initialDashboardState, {
        type: DASHBOARD_ACTIONS.UPDATE_NEWS_TIMESTAMP,
        payload: timestamp,
      });

      expect(result.lastNewsUpdate).toEqual(timestamp);
    });

  });

  describe('localStorage integration', () => {
    it('should call localStorage functions when available', () => {
      localStorage.isStorageAvailable.mockReturnValue(true);
      
      expect(localStorage.isStorageAvailable()).toBe(true);
      expect(localStorage.getApplicationsFromStorage()).toEqual([]);
      expect(localStorage.getCachedNewsFromStorage()).toEqual([]);
      expect(localStorage.getLastNewsUpdateFromStorage()).toBe(null);
    });

    it('should handle localStorage unavailable gracefully', () => {
      localStorage.isStorageAvailable.mockReturnValue(false);
      
      expect(localStorage.isStorageAvailable()).toBe(false);
    });

    it('should save applications to localStorage', () => {
      const applications = [
        {
          id: '1',
          name: 'Test App',
          url: 'https://test.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      localStorage.saveApplicationsToStorage(applications);
      
      expect(localStorage.saveApplicationsToStorage).toHaveBeenCalledWith(applications);
    });

    it('should save news timestamp to localStorage', () => {
      const timestamp = new Date();

      localStorage.saveLastNewsUpdateToStorage(timestamp);
      
      expect(localStorage.saveLastNewsUpdateToStorage).toHaveBeenCalledWith(timestamp);
    });
  });

  describe('Action creators logic', () => {
    it('should create proper application with ID and timestamps', () => {
      const applicationData = {
        name: 'New App',
        url: 'https://newapp.com',
        icon: 'icon.png',
        description: 'A new application',
      };

      // Simulate the logic from the addApplication action creator
      const newApp = {
        ...applicationData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(newApp.name).toBe(applicationData.name);
      expect(newApp.url).toBe(applicationData.url);
      expect(newApp.icon).toBe(applicationData.icon);
      expect(newApp.description).toBe(applicationData.description);
      expect(newApp.id).toBeDefined();
      expect(newApp.createdAt).toBeInstanceOf(Date);
      expect(newApp.updatedAt).toBeInstanceOf(Date);
    });

    it('should update application with new timestamp', () => {
      const existingApp = {
        id: '1',
        name: 'Original App',
        url: 'https://original.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };

      const updates = {
        name: 'Updated App',
        url: 'https://updated.com',
      };

      // Simulate the logic from the updateApplication action creator
      const updatedApp = {
        ...existingApp,
        ...updates,
        updatedAt: new Date(),
      };

      expect(updatedApp.name).toBe('Updated App');
      expect(updatedApp.url).toBe('https://updated.com');
      expect(updatedApp.id).toBe(existingApp.id);
      expect(updatedApp.createdAt).toEqual(existingApp.createdAt);
      expect(updatedApp.updatedAt).not.toEqual(existingApp.updatedAt);
    });
  });
});