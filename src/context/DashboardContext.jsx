import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  DASHBOARD_ACTIONS, 
  initialDashboardState 
} from '../types/dashboard';
import { 
  getApplicationsFromStorage, 
  saveApplicationsToStorage,
  getCachedNewsFromStorage,
  getLastNewsUpdateFromStorage,
  saveLastNewsUpdateToStorage,
  isStorageAvailable
} from '../utils/localStorage';

/**
 * Dashboard reducer to handle state updates
 * @param {DashboardState} state - Current state
 * @param {Object} action - Action object with type and payload
 * @returns {DashboardState} New state
 */
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

// Create the context
const DashboardContext = createContext();

/**
 * Dashboard context provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  // Load initial data from localStorage on mount
  useEffect(() => {
    if (isStorageAvailable()) {
      // Load applications
      const savedApplications = getApplicationsFromStorage();
      if (savedApplications.length > 0) {
        dispatch({
          type: DASHBOARD_ACTIONS.SET_APPLICATIONS,
          payload: savedApplications,
        });
      }

      // Load cached news data
      const cachedNews = getCachedNewsFromStorage();
      if (cachedNews.length > 0) {
        dispatch({
          type: DASHBOARD_ACTIONS.SET_NEWS_DATA,
          payload: cachedNews,
        });
      }

      // Load last news update timestamp
      const lastUpdate = getLastNewsUpdateFromStorage();
      if (lastUpdate) {
        dispatch({
          type: DASHBOARD_ACTIONS.UPDATE_NEWS_TIMESTAMP,
          payload: lastUpdate,
        });
      }
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    if (state.applications.length > 0 && isStorageAvailable()) {
      saveApplicationsToStorage(state.applications);
    }
  }, [state.applications]);

  // Action creators for easier usage
  const actions = {
    // Application actions
    addApplication: (application) => {
      const newApp = {
        ...application,
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({
        type: DASHBOARD_ACTIONS.ADD_APPLICATION,
        payload: newApp,
      });
    },

    updateApplication: (application) => {
      const updatedApp = {
        ...application,
        updatedAt: new Date(),
      };
      dispatch({
        type: DASHBOARD_ACTIONS.UPDATE_APPLICATION,
        payload: updatedApp,
      });
    },

    deleteApplication: (applicationId) => {
      dispatch({
        type: DASHBOARD_ACTIONS.DELETE_APPLICATION,
        payload: applicationId,
      });
    },

    // News actions
    setNewsLoading: (loading) => {
      dispatch({
        type: DASHBOARD_ACTIONS.SET_NEWS_LOADING,
        payload: loading,
      });
    },

    setNewsData: (newsData) => {
      dispatch({
        type: DASHBOARD_ACTIONS.SET_NEWS_DATA,
        payload: newsData,
      });
      
      // Update timestamp
      const now = new Date();
      dispatch({
        type: DASHBOARD_ACTIONS.UPDATE_NEWS_TIMESTAMP,
        payload: now,
      });
      
      // Save to localStorage if available
      if (isStorageAvailable()) {
        saveLastNewsUpdateToStorage(now);
      }
    },

    setNewsError: (error) => {
      dispatch({
        type: DASHBOARD_ACTIONS.SET_NEWS_ERROR,
        payload: error,
      });
    },
  };

  const contextValue = {
    state,
    actions,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * Custom hook to use the dashboard context
 * @returns {Object} Dashboard context value with state and actions
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};