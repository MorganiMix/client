import React from "react";
import { HiPlus } from "react-icons/hi";

const AddApplicationCard = ({ onAdd, className = "" }) => {
  const handleClick = () => {
    onAdd();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative group cursor-pointer bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center justify-center min-h-[200px] ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Add new application"
    >
      <HiPlus className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
      <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium mt-2 transition-colors duration-200">
        Add Application
      </p>
    </div>
  );
};

export default AddApplicationCard;