/**
 * Simple verification script to test our implementations
 * This can be run in the browser console to verify functionality
 */

import { 
  getFromStorage, 
  setToStorage, 
  validateApplication, 
  isValidUrl,
  STORAGE_KEYS 
} from './index.js';

/**
 * Run verification tests
 */
export const runVerification = () => {
  console.log('🔍 Running dashboard utilities verification...');

  // Test URL validation
  console.log('✅ URL Validation Tests:');
  console.log('  Valid HTTPS URL:', isValidUrl('https://example.com')); // should be true
  console.log('  Valid HTTP URL:', isValidUrl('http://example.com')); // should be true
  console.log('  Invalid URL:', isValidUrl('not-a-url')); // should be false
  console.log('  Empty URL:', isValidUrl('')); // should be false

  // Test application validation
  console.log('✅ Application Validation Tests:');
  const validApp = { name: 'Test App', url: 'https://example.com' };
  const invalidApp = { name: '', url: 'invalid' };
  
  const validResult = validateApplication(validApp);
  const invalidResult = validateApplication(invalidApp);
  
  console.log('  Valid app validation:', validResult.isValid); // should be true
  console.log('  Invalid app validation:', invalidResult.isValid); // should be false
  console.log('  Invalid app errors:', invalidResult.errors);

  // Test localStorage operations
  console.log('✅ LocalStorage Tests:');
  const testData = { test: 'data', timestamp: new Date() };
  
  try {
    const setResult = setToStorage('test-key', testData);
    console.log('  Set to storage:', setResult); // should be true
    
    const getData = getFromStorage('test-key', null);
    console.log('  Get from storage:', getData !== null); // should be true
    
    console.log('  Storage keys available:', Object.keys(STORAGE_KEYS));
  } catch (error) {
    console.error('  Storage test failed:', error);
  }

  console.log('🎉 Verification complete!');
};

// Auto-run if in development
if (process.env.NODE_ENV === 'development') {
  // Delay to ensure DOM is ready
  setTimeout(runVerification, 1000);
}