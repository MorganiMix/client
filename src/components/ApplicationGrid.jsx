import React from "react";
import { useDashboard } from "../context/DashboardContext";
import ApplicationCard from "./ApplicationCard";
import AddApplicationCard from "./AddApplicationCard";
import { HiPlus } from "react-icons/hi";

const ApplicationGrid = ({ loading = false }) => {
  const { state, actions } = useDashboard();
  const { applications } = state;

  // Mock applications for demo purposes
  const demoApplications = [
    {
      id: '1',
      name: 'Gmail',
      url: 'https://gmail.com',
      icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
      description: 'Email service by Google',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'https://github.com/favicon.ico',
      description: 'Code hosting platform',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Slack',
      url: 'https://slack.com',
      icon: '',
      description: 'Team communication platform',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Notion',
      url: 'https://notion.so',
      icon: 'https://www.notion.so/images/favicon.ico',
      description: 'All-in-one workspace',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Use demo applications if no applications are stored
  const displayApplications = applications.length > 0 ? applications : demoApplications;

  const handleEdit = (application) => {
    console.log('Edit application:', application);
    // TODO: Open edit modal
  };

  const handleDelete = (applicationId) => {
    console.log('Delete application:', applicationId);
    actions.deleteApplication(applicationId);
  };

  const handleAddNew = () => {
    console.log('Add new application');
    // TODO: Open add modal
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Loading skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 min-h-[200px] animate-pulse"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-32 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Applications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        
        {/* Add New Application Card */}
        <AddApplicationCard onAdd={handleAddNew} />
      </div>

      {/* Empty State */}
      {displayApplications.length === 0 && (
        <div className="text-center py-12">
          <HiPlus className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No applications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started by adding your first application to the dashboard.
          </p>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Add Your First Application
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationGrid;