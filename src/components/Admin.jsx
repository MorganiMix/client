import React from "react";

const Admin = ({ onLogout }) => {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-2xl">Admin Dashboard</h1>
        <button 
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="p-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl mb-4">System Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold">Active Users</h3>
              <p className="text-2xl">42</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-bold">Total Transactions</h3>
              <p className="text-2xl">1,337</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;