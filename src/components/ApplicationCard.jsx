import React from "react";
import { HiPencil, HiTrash, HiExternalLink } from "react-icons/hi";

const ApplicationCard = (props) => {
  const { application, onEdit, onDelete, className = "" } = props;
  const { name, url, icon, description } = application;

  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('.action-button')) {
      return;
    }
    
    // Open URL in new tab for security
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(application);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(application.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  const renderIcon = () => {
    if (icon) {
      return (
        <img
          src={icon}
          alt={`${name} icon`}
          className="w-12 h-12 object-contain rounded-lg"
          onError={(e) => {
            // Fallback to text icon if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    
    // Fallback icon using first letter of name
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div
      className={`
        relative group cursor-pointer
        bg-white dark:bg-gray-800 
        rounded-xl shadow-md hover:shadow-xl
        border border-gray-200 dark:border-gray-700
        p-6 transition-all duration-300
        hover:scale-105 hover:-translate-y-1
        ${className}
      `}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${name} application`}
    >
      {/* Action buttons - visible on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        <button
          className="action-button p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200"
          onClick={handleEditClick}
          aria-label={`Edit ${name} application`}
          title="Edit application"
        >
          <HiPencil className="w-4 h-4" />
        </button>
        <button
          className="action-button p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors duration-200"
          onClick={handleDeleteClick}
          aria-label={`Delete ${name} application`}
          title="Delete application"
        >
          <HiTrash className="w-4 h-4" />
        </button>
      </div>

      {/* Application icon */}
      <div className="flex justify-center mb-4">
        {renderIcon()}
        {/* Hidden fallback for failed image loads */}
        <div 
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white font-bold text-xl"
          style={{ display: 'none' }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Application name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2 truncate">
        {name}
      </h3>

      {/* Application description */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center line-clamp-2 mb-3">
          {description}
        </p>
      )}

      {/* External link indicator */}
      <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <HiExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Hover overlay for better visual feedback */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ApplicationCard;