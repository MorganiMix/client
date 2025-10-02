import React, { useState } from "react";
import { Navbar, Welcome, Footer, Services, Transactions, Login, Admin, Dashboard } from "./components";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard"); // Changed default to dashboard
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigation toggle component
  const NavigationToggle = () => (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === "dashboard"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentPage("home")}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === "home"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Crypto Site
        </button>
        <button
          onClick={() => setCurrentPage("admin")}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === "admin"
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Admin
        </button>
      </div>
    </div>
  );

  if (currentPage === "admin") {
    if (!isLoggedIn) {
      return (
        <>
          <NavigationToggle />
          <Login onLogin={setIsLoggedIn} />
        </>
      );
    }
    return (
      <>
        <NavigationToggle />
        <Admin onLogout={() => { setIsLoggedIn(false); setCurrentPage("dashboard"); }} />
      </>
    );
  }

  if (currentPage === "dashboard") {
    return (
      <>
        <NavigationToggle />
        <Dashboard />
      </>
    );
  }

  // Original crypto website
  return (
    <>
      <NavigationToggle />
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar onAdminClick={() => setCurrentPage("admin")} />
        </div>
        <Services />
        <Footer />
      </div>
    </>
  );
};
/*<Navbar />
<Welcome />
<Services />
<Transactions />
<Footer />
*/

export default App;
