import React from "react";
import { DashboardProvider } from "../context/DashboardContext";
import ApplicationGrid from "./ApplicationGrid";
import NewsSection from "./NewsSection";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Personal Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Quick access to your applications and latest news
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications Section - Takes up 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Applications
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                    Add Application
                  </button>
                </div>
                <ApplicationGrid />
              </div>
            </div>

            {/* News Section - Takes up 1/3 on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Latest News
                </h2>
                <NewsSection />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;