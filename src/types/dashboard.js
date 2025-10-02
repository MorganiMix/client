/**
 * Application model interface
 * @typedef {Object} Application
 * @property {string} id - Unique identifier for the application
 * @property {string} name - Display name of the application
 * @property {string} url - URL to navigate to when clicked
 * @property {string} [icon] - Optional icon URL or icon identifier
 * @property {string} [description] - Optional description of the application
 * @property {Date} createdAt - Timestamp when application was created
 * @property {Date} updatedAt - Timestamp when application was last updated
 */

/**
 * News article model interface
 * @typedef {Object} NewsArticle
 * @property {string} id - Unique identifier for the news article
 * @property {string} title - Title of the news article
 * @property {string} summary - Brief summary or excerpt of the article
 * @property {string} source - Source publication or website
 * @property {Date} publishedAt - Publication timestamp
 * @property {string} url - URL to the full article
 * @property {string} [imageUrl] - Optional image URL for the article
 */

/**
 * Dashboard state model interface
 * @typedef {Object} DashboardState
 * @property {Application[]} applications - Array of user applications
 * @property {NewsArticle[]} newsData - Array of news articles
 * @property {boolean} newsLoading - Loading state for news data
 * @property {string|null} newsError - Error message for news loading failures
 * @property {Date|null} lastNewsUpdate - Timestamp of last news update
 */

/**
 * Dashboard action types for reducer
 */
export const DASHBOARD_ACTIONS = {
  // Application actions
  ADD_APPLICATION: 'ADD_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  DELETE_APPLICATION: 'DELETE_APPLICATION',
  SET_APPLICATIONS: 'SET_APPLICATIONS',
  
  // News actions
  SET_NEWS_LOADING: 'SET_NEWS_LOADING',
  SET_NEWS_DATA: 'SET_NEWS_DATA',
  SET_NEWS_ERROR: 'SET_NEWS_ERROR',
  UPDATE_NEWS_TIMESTAMP: 'UPDATE_NEWS_TIMESTAMP',
};

/**
 * Initial dashboard state
 * @type {DashboardState}
 */
export const initialDashboardState = {
  applications: [],
  newsData: [],
  newsLoading: false,
  newsError: null,
  lastNewsUpdate: null,
};

/**
 * Create a new Application object with default values
 * @param {Object} data - Application data
 * @param {string} data.name - Application name
 * @param {string} data.url - Application URL
 * @param {string} [data.icon] - Optional icon URL
 * @param {string} [data.description] - Optional description
 * @returns {Application} New application object
 */
export const createApplication = (data) => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    name: data.name,
    url: data.url,
    icon: data.icon || '',
    description: data.description || '',
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Update an existing Application object
 * @param {Application} application - Existing application
 * @param {Object} updates - Updates to apply
 * @returns {Application} Updated application object
 */
export const updateApplication = (application, updates) => {
  return {
    ...application,
    ...updates,
    updatedAt: new Date(),
  };
};

/**
 * Create a new NewsArticle object
 * @param {Object} data - News article data
 * @param {string} data.title - Article title
 * @param {string} data.summary - Article summary
 * @param {string} data.source - Article source
 * @param {string} data.url - Article URL
 * @param {Date} data.publishedAt - Publication date
 * @param {string} [data.imageUrl] - Optional image URL
 * @returns {NewsArticle} New news article object
 */
export const createNewsArticle = (data) => {
  return {
    id: crypto.randomUUID(),
    title: data.title,
    summary: data.summary,
    source: data.source,
    url: data.url,
    publishedAt: data.publishedAt,
    imageUrl: data.imageUrl || '',
  };
};