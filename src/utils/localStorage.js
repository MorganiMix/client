/**
 * Local storage keys for dashboard data
 */
export const STORAGE_KEYS = {
  APPLICATIONS: 'dashboard_applications',
  NEWS_CACHE: 'dashboard_news_cache',
  LAST_NEWS_UPDATE: 'dashboard_last_news_update',
};

/**
 * Safely get data from localStorage with error handling
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns {*} Parsed data or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safely set data to localStorage with error handling
 * @param {string} key - The localStorage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} Success status
 */
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - The localStorage key to remove
 * @returns {boolean} Success status
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Get applications from localStorage
 * @returns {Application[]} Array of applications
 */
export const getApplicationsFromStorage = () => {
  const applications = getFromStorage(STORAGE_KEYS.APPLICATIONS, []);
  // Convert date strings back to Date objects
  return applications.map(app => ({
    ...app,
    createdAt: new Date(app.createdAt),
    updatedAt: new Date(app.updatedAt),
  }));
};

/**
 * Save applications to localStorage
 * @param {Application[]} applications - Array of applications to save
 * @returns {boolean} Success status
 */
export const saveApplicationsToStorage = (applications) => {
  return setToStorage(STORAGE_KEYS.APPLICATIONS, applications);
};

/**
 * Get cached news data from localStorage
 * @returns {NewsArticle[]} Array of cached news articles
 */
export const getCachedNewsFromStorage = () => {
  const newsData = getFromStorage(STORAGE_KEYS.NEWS_CACHE, []);
  // Convert date strings back to Date objects
  return newsData.map(article => ({
    ...article,
    publishedAt: new Date(article.publishedAt),
  }));
};

/**
 * Save news data to localStorage cache
 * @param {NewsArticle[]} newsData - Array of news articles to cache
 * @returns {boolean} Success status
 */
export const saveNewsCacheToStorage = (newsData) => {
  return setToStorage(STORAGE_KEYS.NEWS_CACHE, newsData);
};

/**
 * Get last news update timestamp from localStorage
 * @returns {Date|null} Last update timestamp or null
 */
export const getLastNewsUpdateFromStorage = () => {
  const timestamp = getFromStorage(STORAGE_KEYS.LAST_NEWS_UPDATE, null);
  return timestamp ? new Date(timestamp) : null;
};

/**
 * Save last news update timestamp to localStorage
 * @param {Date} timestamp - Timestamp to save
 * @returns {boolean} Success status
 */
export const saveLastNewsUpdateToStorage = (timestamp) => {
  return setToStorage(STORAGE_KEYS.LAST_NEWS_UPDATE, timestamp);
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};