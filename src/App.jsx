import React, { useState } from "react";
import { Navbar, Welcome, Footer, Services, Transactions, Login, Admin } from "./components";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (currentPage === "admin") {
    if (!isLoggedIn) {
      return <Login onLogin={setIsLoggedIn} />;
    }
    return <Admin onLogout={() => { setIsLoggedIn(false); setCurrentPage("home"); }} />;
  }

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar onAdminClick={() => setCurrentPage("admin")} />
      </div>
      <Services />
      <Footer />
    </div>
  );
};
/*<Navbar />
<Welcome />
<Services />
<Transactions />
<Footer />
*/

export default App;
