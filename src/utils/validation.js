/**
 * Validation utilities for dashboard data
 */

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Validate that a string is not empty after trimming
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is a non-empty string
 */
export const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validate application data
 * @param {Object} application - Application object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateApplication = (application) => {
  const errors = [];

  // Check if application is an object
  if (!application || typeof application !== 'object') {
    errors.push('Application must be an object');
    return { isValid: false, errors };
  }

  // Check required fields
  if (!isNonEmptyString(application.name)) {
    errors.push('Application name is required');
  }

  if (!isNonEmptyString(application.url)) {
    errors.push('Application URL is required');
  } else if (!isValidUrl(application.url.trim())) {
    errors.push('Application URL must be a valid HTTP or HTTPS URL');
  }

  // Check optional fields
  if (application.description !== undefined && typeof application.description !== 'string') {
    errors.push('Application description must be a string');
  }

  if (application.icon !== undefined && typeof application.icon !== 'string') {
    errors.push('Application icon must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize application data
 * @param {Object} application - Application object to sanitize
 * @returns {Object} Sanitized application object
 */
export const sanitizeApplication = (application) => {
  return {
    name: application.name ? application.name.trim() : '',
    url: application.url ? application.url.trim() : '',
    description: application.description ? application.description.trim() : '',
    icon: application.icon ? application.icon.trim() : '',
  };
};

/**
 * Validate news article data
 * @param {Object} article - News article object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateNewsArticle = (article) => {
  const errors = [];

  // Check if article is an object
  if (!article || typeof article !== 'object') {
    errors.push('Article must be an object');
    return { isValid: false, errors };
  }

  // Check required fields
  if (!isNonEmptyString(article.title)) {
    errors.push('Article title is required');
  }

  if (!isNonEmptyString(article.summary)) {
    errors.push('Article summary is required');
  }

  if (!isNonEmptyString(article.source)) {
    errors.push('Article source is required');
  }

  if (!isNonEmptyString(article.url)) {
    errors.push('Article URL is required');
  } else if (!isValidUrl(article.url.trim())) {
    errors.push('Article URL must be a valid HTTP or HTTPS URL');
  }

  if (!article.publishedAt || !(article.publishedAt instanceof Date) || isNaN(article.publishedAt.getTime())) {
    errors.push('Article published date is required and must be a valid Date');
  }

  // Check optional fields
  if (article.imageUrl !== undefined && typeof article.imageUrl !== 'string') {
    errors.push('Article image URL must be a string');
  } else if (article.imageUrl && !isValidUrl(article.imageUrl.trim())) {
    errors.push('Article image URL must be a valid HTTP or HTTPS URL');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize news article data
 * @param {Object} article - News article object to sanitize
 * @returns {Object} Sanitized news article object
 */
export const sanitizeNewsArticle = (article) => {
  return {
    title: article.title ? article.title.trim() : '',
    summary: article.summary ? article.summary.trim() : '',
    source: article.source ? article.source.trim() : '',
    url: article.url ? article.url.trim() : '',
    publishedAt: article.publishedAt instanceof Date ? article.publishedAt : new Date(),
    imageUrl: article.imageUrl ? article.imageUrl.trim() : '',
  };
};