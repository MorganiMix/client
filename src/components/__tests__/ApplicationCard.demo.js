// Demo file to test ApplicationCard component functionality
// This file demonstrates how the ApplicationCard component should be used

import { vi } from 'vitest';

// Mock application data for testing
export const mockApplications = [
  {
    id: '1',
    name: 'Gmail',
    url: 'https://gmail.com',
    icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    description: 'Email service by Google',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'https://github.com/favicon.ico',
    description: 'Code hosting platform for version control and collaboration',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '3',
    name: 'Slack',
    url: 'https://slack.com',
    icon: '', // No icon to test fallback
    description: 'Team communication and collaboration platform',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
  {
    id: '4',
    name: 'Notion',
    url: 'https://notion.so',
    icon: 'https://www.notion.so/images/favicon.ico',
    description: '', // No description to test optional rendering
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  },
];

// Mock event handlers
export const mockHandlers = {
  onEdit: vi.fn((application) => {
    console.log('Edit application:', application.name);
  }),
  onDelete: vi.fn((applicationId) => {
    console.log('Delete application with ID:', applicationId);
  }),
};

// Demo usage examples
export const demoUsageExamples = {
  // Basic usage
  basic: {
    application: mockApplications[0],
    onEdit: mockHandlers.onEdit,
    onDelete: mockHandlers.onDelete,
  },

  // With custom className
  withCustomClass: {
    application: mockApplications[1],
    onEdit: mockHandlers.onEdit,
    onDelete: mockHandlers.onDelete,
    className: 'custom-card-style',
  },

  // Application without icon (tests fallback)
  withoutIcon: {
    application: mockApplications[2],
    onEdit: mockHandlers.onEdit,
    onDelete: mockHandlers.onDelete,
  },

  // Application without description
  withoutDescription: {
    application: mockApplications[3],
    onEdit: mockHandlers.onEdit,
    onDelete: mockHandlers.onDelete,
  },
};

// Expected behaviors for testing
export const expectedBehaviors = {
  clickNavigation: {
    description: 'Should open application URL in new tab when card is clicked',
    expectedCall: 'window.open(url, "_blank", "noopener,noreferrer")',
  },
  editAction: {
    description: 'Should call onEdit with application object when edit button is clicked',
    expectedCall: 'onEdit(application)',
  },
  deleteAction: {
    description: 'Should call onDelete with application ID when delete button is clicked',
    expectedCall: 'onDelete(application.id)',
  },
  keyboardNavigation: {
    description: 'Should handle Enter and Space keys for accessibility',
    supportedKeys: ['Enter', ' '],
  },
  iconFallback: {
    description: 'Should show first letter of name when no icon is provided',
    fallbackLogic: 'name.charAt(0).toUpperCase()',
  },
};

// CSS classes that should be applied
export const expectedCSSClasses = {
  base: [
    'relative',
    'group',
    'cursor-pointer',
    'bg-white',
    'dark:bg-gray-800',
    'rounded-xl',
    'shadow-md',
    'hover:shadow-xl',
    'border',
    'border-gray-200',
    'dark:border-gray-700',
    'p-6',
    'transition-all',
    'duration-300',
    'hover:scale-105',
    'hover:-translate-y-1',
  ],
  actionButtons: [
    'action-button',
    'p-2',
    'bg-blue-500',
    'hover:bg-blue-600',
    'bg-red-500',
    'hover:bg-red-600',
    'text-white',
    'rounded-lg',
    'shadow-md',
    'transition-colors',
    'duration-200',
  ],
  responsive: [
    'dark:bg-gray-800',
    'dark:border-gray-700',
    'dark:text-white',
    'dark:text-gray-300',
    'dark:text-gray-500',
  ],
};

// Accessibility features
export const accessibilityFeatures = {
  ariaLabels: {
    card: (name) => `Open ${name} application`,
    edit: (name) => `Edit ${name} application`,
    delete: (name) => `Delete ${name} application`,
  },
  keyboardSupport: {
    role: 'button',
    tabIndex: 0,
    supportedKeys: ['Enter', ' '],
  },
  screenReader: {
    altText: (name) => `${name} icon`,
    titles: {
      edit: 'Edit application',
      delete: 'Delete application',
    },
  },
};

// Requirements mapping
export const requirementsMet = {
  '1.1': {
    description: 'Display application cards in grid layout',
    implementation: 'Component designed to work in CSS Grid layout',
  },
  '1.2': {
    description: 'Navigate to application URL on click',
    implementation: 'handleCardClick opens URL in new tab',
  },
  '1.3': {
    description: 'Provide visual feedback on hover',
    implementation: 'Hover effects with scale, shadow, and opacity changes',
  },
  '1.4': {
    description: 'Display application icon',
    implementation: 'Icon display with fallback to first letter',
  },
  '1.5': {
    description: 'Show application name and description',
    implementation: 'Name always shown, description conditionally rendered',
  },
  '4.5': {
    description: 'Responsive design with Tailwind CSS',
    implementation: 'Dark mode support and responsive classes',
  },
};

export default {
  mockApplications,
  mockHandlers,
  demoUsageExamples,
  expectedBehaviors,
  expectedCSSClasses,
  accessibilityFeatures,
  requirementsMet,
};